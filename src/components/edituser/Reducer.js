import {
  EDIT_USER_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  GET_EDIT_USER_ERROR,
  GET_EDIT_USER_SUCCESS,
  GET_EDIT_USER_REQUEST,
} from "./Types";

const initialState = {
  loading: false,
  user: {},
  error: "",
};
const EditUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EDIT_USER_REQUEST:
      return { ...state, loading: true };
      break;
    case GET_EDIT_USER_ERROR:
      return { ...state, loading: false, user: {} };
      break;
    case GET_EDIT_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
      break;

    case EDIT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        user: {},
      };
      break;

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
      break;

    case EDIT_USER_ERROR:
      return {
        ...state,
        user: {},
        loading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default EditUserReducer;
