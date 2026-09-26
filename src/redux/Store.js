import reducers from "./Reducers";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga"; // Correct import
import rootSaga from "./Sagas";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({ ...reducers });

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };