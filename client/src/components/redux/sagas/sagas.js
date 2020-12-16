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

  console.log(name);
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
      console.log("error boss");
    });
  return token;
};

function* registerSaga(action) {
  const { name, email, password } = action.payload;

  try {
    const res = yield registerData(name, email, password);
    yield put({ type: type.REGISTER_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.REGISTER_FAILED });
  }
}
function* watchRegisterSaga() {
  yield takeEvery(type.REGISTER_SAGA, registerSaga);
}

export default function* rootSaga() {
  yield all([watchSetAlertSaga(), watchRemoveAlert(), watchRegisterSaga()]);
}
