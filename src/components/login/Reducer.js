import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "./Types";

const initialState = {
  user: null,
  loading: false,
  error: null,
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
      break;
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
      break;
    case USER_LOGIN_ERROR:
      return { ...state, loading: false };

      break;
    default:
      return state;
      break;
  }
};

export default LoginReducer;
