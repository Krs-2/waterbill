var data = { userName: "abc", password: "asdfsdaf" };

export const getUserData = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: "GET_USERS", payload: data });
    }, 0);
  };
};
export const setInputField = (data) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};
