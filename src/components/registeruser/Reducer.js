import User from "../../class/User";
import { REGISTER_USER_ERROR, REGISTER_USER_INIT, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_OBJ } from "./Types";

const initialState = {
  loading: false,
  user: new User({}),
  error: "",
};
const RegisterUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: true,
      };
      break;

    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
      break;
    case REGISTER_USER_INIT:
      return { ...state, loading: false, user: action.payload };
      break;
    case UPDATE_USER_OBJ:
      let newUserObject = { ...state.user };
      const e = action.payload;
      newUserObject[e.target.name] = e.target.value;
      return {
        ...state,
        user: newUserObject,
      };
      break;

    default:
      return state;
      break;
  }
};

export default RegisterUserReducer;
