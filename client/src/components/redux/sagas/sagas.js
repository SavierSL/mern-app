import { all, put, takeEvery, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import * as type from "../actions/types";

//setAlert
function* setAlertSaga(action) {
  const id = uuidv4();
  yield put({ type: type.SET_ALERT, payload: { id, ...action.payload } });
}

function* watchSetAlertSaga() {
  yield takeEvery(type.SET_ALERT_SAGA, setAlertSaga);
}

//removeAlert
function* removeAlert() {
  yield put({ type: type.REMOVE_ALERT });
}

function* watchRemoveAlert() {
  yield takeEvery(type.REMOVE_ALERT_SAGA, removeAlert);
}

//register

const registerData = async (name, email, password) => {
  // const bodyToSend = JSON.stringify({ name, email, password });
  // console.log(bodyToSend);
  // const config = {
  //   header: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // try {
  //   const res = await axios.post("/api/users", bodyToSend, config);
  //   console.log(res);
  //   return res;
  // } catch (e) {
  //   return e;
  // }
  const body = { name, email, password };

  const token = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return token;
};

function* registerSaga(action) {
  const { name, email, password } = action.payload;

  try {
    const res = yield registerData(name, email, password);
    if (res.hasOwnProperty("errors")) {
      return yield put({ type: type.REGISTER_FAILED, payload: res });
    }
    yield put({ type: type.REGISTER_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.REGISTER_FAILED });
  }
}
function* watchRegisterSaga() {
  yield takeEvery(type.REGISTER_SAGA, registerSaga);
}
//REMOVE ALERT EMAIL
function* removeEmailAlertSaga() {
  yield put({ type: type.REMOVE_EMAIL_ALERT });
}
function* watchRemoveEmailAlertSaga() {
  yield takeEvery(type.REMOVE_EMAIL_ALERT_SAGA, removeEmailAlertSaga);
}

//Log In
const logInData = async (email, password) => {
  const body = { email, password };
  console.log(body);
  const token = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json();

      return data;
    })
    .catch((error) => {
      throw error;
    });
  return token;
};

function* logInSaga(action) {
  const { email, password } = action.payload;

  try {
    const res = yield logInData(email, password);
    if (res.hasOwnProperty("errors")) {
      return yield put({ type: type.LOG_IN_FAILED, payload: res });
    }
    yield put({ type: type.LOG_IN_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.LOG_IN_FAILED, payload: error });
  }
}
function* watchLogInSaga() {
  yield takeEvery(type.LOG_IN_SAGA, logInSaga);
}

//LOG OUT
function* logOutSaga() {
  yield put({ type: type.LOG_OUT });
}

function* watchLogOutSaga() {
  yield takeEvery(type.LOG_OUT_SAGA, logOutSaga);
}

//GET USER
const getUser = async (token) => {
  console.log(token);

  let tokenData = await fetch("/api/auth", {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return tokenData;
};

function* getUserSaga(action) {
  try {
    const res = yield getUser(action.payload);
    yield put({ type: type.GET_USER, payload: res });
  } catch (error) {
    throw error;
  }
}
function* watchGetUserSaga() {
  yield takeEvery(type.GET_USER_SAGA, getUserSaga);
}

//createProfile
const createProfile = async (profileData, token) => {
  const fetchData = await fetch("/api/profile", {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-type": "application/json",
    },
    body: JSON.stringify(profileData),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
  return fetchData;
};
function* createProfileSaga(action) {
  const { payload } = action;
  const { profileData } = action.payload;
  const { twitter, facebook, linkedin, youtube } = profileData;
  const data = {
    ...profileData,
    social: {
      twitter,
      facebook,
      linkedin,
      youtube,
    },
  };
  try {
    const res = yield createProfile(data, payload.token);
    if (res.hasOwnProperty("errors")) {
      return yield put({ type: type.CREATE_PROFILE_FAILED, payload: res });
    }
    yield put({ type: type.CREATE_PROFILE_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.CREATE_PROFILE_FAILED });
  }
}
function* watchCreateProfileSaga() {
  yield takeEvery(type.CREATE_PROFILE_SAGA, createProfileSaga);
}

//profileAlert
function* removeCreateProfileAlertSaga() {
  yield put({ type: type.REMOVE_CREATE_PROFILE_ALERT });
}
function* watchRemoveCreateProfileAlertSaga() {
  yield takeEvery(
    type.REMOVE_CREATE_PROFILE_ALERT_SAGA,
    removeCreateProfileAlertSaga
  );
}

//Get profileByID
const getProfileById = async (token) => {
  const profileData = await fetch(`/api/profile/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();

      return data;
    })
    .catch((e) => {
      throw e;
    });
  return profileData;
};
function* getProfileByIdSaga(action) {
  const { payload } = action;
  try {
    const res = yield getProfileById(payload);
    yield put({ type: type.GET_PROFILE, payload: res });
  } catch (error) {
    yield put({ type: type.GET_PROFILE, payload: error });
  }
}
function* watchGetProfileByIdSaga() {
  yield takeEvery(type.GET_PROFILE_SAGA, getProfileByIdSaga);
}

//Add education
const updateEducation = async (token, educationData) => {
  const profileData = await fetch("api/profile/education", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(educationData),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
  return profileData;
};
function* addEducationSaga(action) {
  const { payload } = action;
  const { token, educationData } = payload;
  try {
    const res = yield updateEducation(token, educationData);
    if (res.hasOwnProperty("errors")) {
      return yield put({ type: type.SEND_EDUCATION_DATA_FAILED, payload: res });
    }
    yield put({ type: type.SEND_EDUCATION_DATA_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.SEND_EDUCATION_DATA_FAILED, payload: error });
  }
}
function* watchAddEducationSaga() {
  yield takeEvery(type.SEND_EDUCATION_DATA_SAGA, addEducationSaga);
}

//Delete Education
const deleteEducData = async (token, id) => {
  console.log(id);
  console.log(token);
  const toDelete = await fetch(`api/profile/education/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
  return toDelete;
};
function* deleteEducationSaga(action) {
  const { id, token } = action.payload;
  try {
    const res = yield deleteEducData(token, id);
    yield put({ type: type.DELETE_EDUCATION_DATA, payload: res });
  } catch (error) {
    throw error;
  }
}
function* watchDeleteEducationSaga() {
  yield takeEvery(type.DELETE_EDUCATION_DATA_SAGA, deleteEducationSaga);
}

//remove Education Alert
function* removeEducationAlertSaga() {
  yield put({ type: type.REMOVE_EDUCATION_ALERT });
}
function* watchRemoveEducationAlertSaga() {
  yield takeEvery(type.REMOVE_EDUCATION_ALERT_SAGA, removeEducationAlertSaga);
}

//Add experience
const sendExperienceData = async (token, experienceData) => {
  const experienceDataRes = await fetch("api/profile/experience", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(experienceData),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });

  return experienceDataRes;
};
function* addExperienceSaga(action) {
  const { token, experienceData } = action.payload;
  try {
    const res = yield sendExperienceData(token, experienceData);
    if (res.hasOwnProperty("errors")) {
      return yield put({
        type: type.SEND_EXPERIENCE_DATA_FAILED,
        payload: res,
      });
    }
    yield put({ type: type.SEND_EXPERIENCE_DATA_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.SEND_EXPERIENCE_DATA_FAILED, payload: error });
  }
}
function* wacthExperienceSaga() {
  yield takeEvery(type.SEND_EXPERIENCE_DATA_SAGA, addExperienceSaga);
}
//Delete Experience
const deleteExpData = async (token, id) => {
  console.log(token);
  const toDelete = await fetch(`api/profile/experience/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
  return toDelete;
};
function* deleteExperienceSaga(action) {
  const { id, token } = action.payload;
  try {
    const res = yield deleteExpData(token, id);
    yield put({ type: type.DELETE_EXPERIENCE_DATA, payload: res });
  } catch (error) {
    throw error;
  }
}
function* watchDeleteExperienceSaga() {
  yield takeEvery(type.DELETE_EXPERIENCE_DATA_SAGA, deleteExperienceSaga);
}

export default function* rootSaga() {
  yield all([
    watchSetAlertSaga(),
    watchRemoveAlert(),
    watchRegisterSaga(),
    watchLogInSaga(),
    watchLogOutSaga(),
    watchRemoveEmailAlertSaga(),
    watchGetUserSaga(),
    watchCreateProfileSaga(),
    watchRemoveCreateProfileAlertSaga(),
    watchGetProfileByIdSaga(),
    watchAddEducationSaga(),
    watchDeleteEducationSaga(),
    watchRemoveEducationAlertSaga(),
    wacthExperienceSaga(),
    watchDeleteExperienceSaga(),
  ]);
}
