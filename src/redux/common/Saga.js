import { all, call, put, takeEvery } from "redux-saga/effects";
import { Get, Post } from "../../components/common/ApiCall";
import { API_URL } from "../../utils/Constants";
import actions from "./Actions";

const rootSaga = function* () {
  yield all([
    // takeEvery(actions.USER_REGISTRATION, userRegistration),
    // takeEvery(actions.USER_LOGIN, userLogin),
  ]);
};

export default rootSaga;

// const userRegistration = function* (action) {
//     const payload = action.payload;
//   try {
//     const result = yield Post(`${API_URL}/auth/register`, payload)
//     console.log("Register response:", result);

//     if ([200, 201, 202].includes(result.statusCode)) {
//       yield put({type: actions.SET_AUTHENTICATION, payload: true,});

//     yield put({
//   type: actions.SET_TOASTER_ALERT,
//   payload: {
//     alert: true,
//     message: "User registered successfully",
//     type: "success",
//     timeOut: 4000,
//   },
// });
//     } else {
//       yield put({
//         type: actions.USER_REGISTRATION_FAILURE,
//         payload: result,
//       });
//     }
//   } catch (err) {
//     console.error("Register error:", err);

//   }
// };
