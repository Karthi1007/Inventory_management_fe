import { all, call, put, takeEvery } from "redux-saga/effects";

import { Get, Post } from "../../components/common/ApiCall";
import { API_URL } from "../../utils/Constants";

import actions from "./Actions";
import CommonActions from "../common/Actions";

const rootSaga = function* () {
  yield all([
    takeEvery(actions.USER_REGISTRATION, userRegistration),
    takeEvery(actions.USER_LOGIN, userLogin),
    takeEvery(actions.USER_LOGOUT, userLogout),
  ]);
};

const userRegistration = function* (action) {
  try {
    const payload = action.payload;

    console.log(
      "Register payload:",
      payload
    );

    yield put({
      type: CommonActions.SET_LOADER,
      payload: {
        open: true,
      },
    });

    const result = yield call(
      Post,
      `${API_URL}/auth/register`,
      payload
    );

    console.log(
      "Register response:",
      result
    );

    if (result?.success === true) {

      yield put({
        type: actions.USER_REGISTRATION_SUCCESS,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message:
            result?.message ||
            "Registration successful",
          type: "success",
          timeOut: 4000,
        },
      });

    } else {

      yield put({
        type: actions.USER_REGISTRATION_FAILURE,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message:
            result?.message ||
            "Registration failed",
          type: "error",
          timeOut: 4000,
        },
      });
    }

  } catch (error) {

    console.error(
      "Register error:",
      error
    );

    yield put({
      type: actions.USER_REGISTRATION_FAILURE,
      payload: error,
    });

    yield put({
      type: CommonActions.SET_TOASTER_ALERT,
      payload: {
        alert: true,
        message:
          error?.message ||
          "Registration failed",
        type: "error",
        timeOut: 4000,
      },
    });

  } finally {

    yield put({
      type: CommonActions.SET_LOADER,
      payload: {
        open: false,
      },
    });
  }
};

const userLogin = function* (action) {
  try {
    const payload = action.payload;

    console.log("Login payload:", payload);

    yield put({
      type: CommonActions.SET_LOADER,
      payload: {
        open: true,
      },
    });

    const result = yield call(
      Post,
      `${API_URL}/auth/login`,
      payload
    );

    console.log("Login response:", result);

    if (result?.success === true) {
      const user = result?.data?.user;
      const token = result?.data?.token;
       localStorage.setItem("token", token);
       localStorage.setItem("user", JSON.stringify(user));
      // Save authentication state
      yield put({
        type: actions.SET_AUTHENTICATION,
        payload: true,
      });

      // Save JWT token
      yield put({
        type: actions.SET_TOKEN,
        payload: token,
      });

      // Save user
      yield put({
        type: actions.SET_USER,
        payload: user,
      });

      // Login success
      yield put({
        type: actions.USER_LOGIN_SUCCESS,
        payload: result,
      });

      // Toast
      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message: result?.message || "Login successful",
          type: "success",
          timeOut: 4000,
        },
      });
    } else {
      yield put({
        type: actions.USER_LOGIN_FAILURE,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message: result?.message || "Login failed",
          type: "error",
          timeOut: 4000,
        },
      });
    }
  } catch (error) {
    console.error("Login error:", error);

    yield put({
      type: actions.USER_LOGIN_FAILURE,
      payload: error,
    });

    yield put({
      type: CommonActions.SET_TOASTER_ALERT,
      payload: {
        alert: true,
        message: error?.message || "Login failed",
        type: "error",
        timeOut: 4000,
      },
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: {
        open: false,
      },
    });
  }
};

// ==========================================
// LOGOUT
// ==========================================

const userLogout = function* () {
  try {
    console.log("Logout started");

    yield put({
      type: CommonActions.SET_LOADER,
      payload: {
        open: true,
      },
    });

    const result = yield call(
      Post,
      `${API_URL}/auth/logout`
    );

    console.log("Logout response:", result);

    if (result?.success === true) {
      // Clear authentication
      yield put({
        type: actions.SET_AUTHENTICATION,
        payload: false,
      });

      // Clear token
      yield put({
        type: actions.SET_TOKEN,
        payload: null,
      });

      // Clear user
      yield put({
        type: actions.SET_USER,
        payload: null,
      });

      // Logout success
      yield put({
        type: actions.USER_LOGOUT_SUCCESS,
        payload: result,
      });

      // Toast
      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message: result?.message || "Logout successful",
          type: "success",
          timeOut: 4000,
        },
      });
    } else {
      yield put({
        type: actions.USER_LOGOUT_FAILURE,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message: result?.message || "Logout failed",
          type: "error",
          timeOut: 4000,
        },
      });
    }
  } catch (error) {
    console.error("Logout error:", error);

    yield put({
      type: actions.USER_LOGOUT_FAILURE,
      payload: error,
    });

    yield put({
      type: CommonActions.SET_TOASTER_ALERT,
      payload: {
        alert: true,
        message: error?.message || "Logout failed",
        type: "error",
        timeOut: 4000,
      },
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: {
        open: false,
      },
    });
  }
};


export default rootSaga;