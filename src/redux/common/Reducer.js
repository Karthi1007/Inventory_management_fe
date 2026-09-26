import actions from "./Actions";

const initialState = {
    loader: { open: false },
    toastAlert: { alert: false, message: "", type: "", timeOut: 4000, },
}

const commonReducer = (state = initialState, action) => {
switch (action.type) {
    case actions.SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    case actions.SET_TOASTER_ALERT:
      return {
        ...state,
        toastAlert: action.payload,
      };


    default:
      return state;
  }
};

export default commonReducer;