import { GET_ALL_USER_LIST_REQUEST, GET_ALL_USER_LIST_SUCCESS, GET_ALL_USER_LIST_ERROR } from "./Types";

const initialState = {
  loading: false,
  users: [],
};

const UserMgmtReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_LIST_REQUEST:
      return { ...state, loading: true };
      break;
    case GET_ALL_USER_LIST_SUCCESS:
      return { ...state, users: action.payload, loading: false };
      break;
    case GET_ALL_USER_LIST_ERROR:
      return { ...state, loading: false };
      break;
    default:
      return state;
      break;
  }
};
export default UserMgmtReducer;
