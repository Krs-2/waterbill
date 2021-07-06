import {
  FORGOT_PASSWORD_USER_ERROR,
  FORGOT_PASSWORD_USER_REQUEST,
  FORGOT_PASSWORD_USER_SUCCESS,
  USER_EXIST_ERROR,
  USER_EXIST_REQUEST,
  USER_EXIST_SUCCESS,
} from "./Types";

const initialState = {
  loading: false,
  error: "",
  user: null,
  showPasswordPanel: false,
};
const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case FORGOT_PASSWORD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        showPasswordPanel: false,
      };
      break;
    case FORGOT_PASSWORD_USER_ERROR:
      return {
        ...state,
        loading: false,
        showPasswordPanel: false,
      };
      break;
    case USER_EXIST_SUCCESS:
      return {
        ...state,
        loading: false,
        showPasswordPanel: true,
        user: action.payload,
      };
    case USER_EXIST_ERROR:
      return {
        ...state,
        loading: false,
      };
      break;
    case USER_EXIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    default:
      return state;
      break;
  }
};

export default ForgotPasswordReducer;
