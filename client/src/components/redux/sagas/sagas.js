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

  let tokenData = fetch("/api/auth", {
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
  const fetchData = fetch("/api/profile", {
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
    yield put({ type: type.CREATE_PROFILE_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.CREATE_PROFILE_FAILED });
  }
}
function* watchCreateProfileSaga() {
  yield takeEvery(type.CREATE_PROFILE_SAGA, createProfileSaga);
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
  ]);
}
