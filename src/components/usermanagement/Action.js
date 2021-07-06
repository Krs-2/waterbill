import AXIOS_ from "../../axios";
import { GET_ALL_USER_LIST_ERROR, GET_ALL_USER_LIST_REQUEST, GET_ALL_USER_LIST_SUCCESS } from "./Types";
import { show_notification_success, show_notification_error } from "../notification/Actions";
export const getAllUsers = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_ALL_USER_LIST_REQUEST });
    AXIOS_("/user/all")
      .then((response) => {
        console.log("Success");
        response = response.data.output;
        dispatch({ type: GET_ALL_USER_LIST_SUCCESS, payload: response });
        dispatch(show_notification_success("GET_ALL_USER_LIST_SUCCESS"));
      })
      .catch((error) => {
        console.log("Error");
        dispatch({ type: GET_ALL_USER_LIST_ERROR });
        dispatch(show_notification_error(GET_ALL_USER_LIST_ERROR));
      });
  };
};
