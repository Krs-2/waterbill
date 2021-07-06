const initialState = {
  loading: false,
  record: {},
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, record: action.payload, loading: false };
      break;
    case "UPDATE_USER":
      const [fieldName, value] = action.payload;
      let temp = { ...state.record };
      temp[fieldName] = value;
      return {
        ...state,
        record: temp,
      };
      break;
    default:
      return state;
      break;
  }
};
export default UserReducer;
