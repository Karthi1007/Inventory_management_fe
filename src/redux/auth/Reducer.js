import actions from "./Actions";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
  loginSuccess: false,
  registerSuccess: false,
  logoutSuccess: false,
};

const authReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {

    case actions.USER_REGISTRATION:
      return {
        ...state,
        loading: true,
        error: null,
        registerSuccess: false,
      };

    case actions.USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true,
        error: null,
      };

    case actions.USER_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        registerSuccess: false,
        error: action.payload,
      };

    case actions.USER_LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
        loginSuccess: false,
      };

    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        error: null,
      };

    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        error: action.payload,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    case actions.SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case actions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };


    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case actions.USER_LOGOUT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        logoutSuccess: true,
        loginSuccess: false,
        error: null,
      };

    case actions.USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        logoutSuccess: false,
        error: action.payload,
      };


    case actions.CLEAR_AUTH:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;