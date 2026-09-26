import {
  all,
  call,
  put,
  takeEvery,
} from "redux-saga/effects";

import { Get, Post, Put, Delete } from "../../components/common/ApiCall";
import { API_URL } from "../../utils/Constants";

import actions from "./Actions";
import CommonActions from "../common/Actions";

const productSaga = function* () {
  yield all([
    takeEvery(actions.GET_PRODUCTS, getProducts),
    takeEvery(actions.GET_PRODUCT_BY_ID, getProductById),

    takeEvery(actions.ADD_PRODUCT, addProduct),
    takeEvery(actions.UPDATE_PRODUCT, updateProduct),
    takeEvery(actions.DELETE_PRODUCT, deleteProduct),
  ]);
};

export default productSaga;

const getProducts = function* (action) {
  try {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: true },
    });

    const result = yield call(
      Get,
      `${API_URL}/products/getall`
    );

    console.log("Get products response:", result);

    if (result?.success === true) {
      yield put({
        type: actions.GET_PRODUCTS_SUCCESS,
        payload: result,
      });
    } else {
      yield put({
        type: actions.GET_PRODUCTS_FAILURE,
        payload: result,
      });
    }
  } catch (error) {
    console.error("Get products error:", error);

    yield put({
      type: actions.GET_PRODUCTS_FAILURE,
      payload: error,
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: false },
    });
  }
};

const getProductById = function* (action) {
  try {
    const id = action.payload;

    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: true },
    });

    const result = yield call(
      Get,
      `${API_URL}/products/getById/${id}`
    );

    console.log("Get product response:", result);

    if (result?.success === true) {
      yield put({
        type: actions.GET_PRODUCT_BY_ID_SUCCESS,
        payload: result,
      });
    } else {
      yield put({
        type: actions.GET_PRODUCT_BY_ID_FAILURE,
        payload: result,
      });
    }
  } catch (error) {
    console.error("Get product error:", error);

    yield put({
      type: actions.GET_PRODUCT_BY_ID_FAILURE,
      payload: error,
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: false },
    });
  }
};

const addProduct = function* (action) {
  try {
    const payload = action.payload;

    console.log("Add product payload:", payload);

    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: true },
    });

    const result = yield call(
      Post,
      `${API_URL}/products/addProd`,
      payload
    );

    console.log("Add product response:", result);

    if (result?.success === true) {
      yield put({
        type: actions.ADD_PRODUCT_SUCCESS,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message:
            result?.message || "Product added successfully",
          type: "success",
          timeOut: 4000,
        },
      });

      // Refresh product list
      yield put({
        type: actions.GET_PRODUCTS,
      });
    } else {
      yield put({
        type: actions.ADD_PRODUCT_FAILURE,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message:
            result?.message || "Failed to add product",
          type: "error",
          timeOut: 4000,
        },
      });
    }
  } catch (error) {
    console.error("Add product error:", error);

    yield put({
      type: actions.ADD_PRODUCT_FAILURE,
      payload: error,
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: false },
    });
  }
};


const updateProduct = function* (action) {
  try {
    const { id, data } = action.payload;

    console.log("Update product ID:", id);
    console.log("Update product data:", data);

    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: true },
    });

    const result = yield call(
      Put,
      `${API_URL}/products/UpdateProd/${id}`,
      data
    );

    console.log("Update product response:", result);

    if (result?.success === true) {
      yield put({
        type: actions.UPDATE_PRODUCT_SUCCESS,
        payload: result,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message:
            result?.message || "Product updated successfully",
          type: "success",
          timeOut: 4000,
        },
      });

      yield put({
        type: actions.GET_PRODUCTS,
      });
    } else {
      yield put({
        type: actions.UPDATE_PRODUCT_FAILURE,
        payload: result,
      });
    }
  } catch (error) {
    console.error("Update product error:", error);

    yield put({
      type: actions.UPDATE_PRODUCT_FAILURE,
      payload: error,
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: false },
    });
  }
};

const deleteProduct = function* (action) {
  try {
    const id = action.payload;

    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: true },
    });

    const result = yield call(
      Delete,
      `${API_URL}/products/delete/${id}`
    );

    console.log("Delete product response:", result);

    if (result?.success === true) {
      yield put({
        type: actions.DELETE_PRODUCT_SUCCESS,
        payload: id,
      });

      yield put({
        type: CommonActions.SET_TOASTER_ALERT,
        payload: {
          alert: true,
          message:
            result?.message || "Product deleted successfully",
          type: "success",
          timeOut: 4000,
        },
      });
    } else {
      yield put({
        type: actions.DELETE_PRODUCT_FAILURE,
        payload: result,
      });
    }
  } catch (error) {
    console.error("Delete product error:", error);

    yield put({
      type: actions.DELETE_PRODUCT_FAILURE,
      payload: error,
    });
  } finally {
    yield put({
      type: CommonActions.SET_LOADER,
      payload: { open: false },
    });
  }
};