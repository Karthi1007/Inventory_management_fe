import { all } from "redux-saga/effects";
import authSaga from "./auth/Saga";
import commonSaga from "./common/Saga";
import productSaga from "./product/Saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    commonSaga(),
    productSaga(),
  ]);
}