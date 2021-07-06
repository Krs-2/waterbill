import axios from "axios";
import { API } from "../../const";
import { show_notification_error, show_notification_success } from "../notification/Actions";

import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  GET_EDIT_USER_ERROR,
  GET_EDIT_USER_SUCCESS,
  GET_EDIT_USER_REQUEST,
} from "./Types";

export const getUser = (phoneNumber) => {
  return (dispatch) => {
    axios
      .get(`${API}/user/${phoneNumber}`)
      .then((response) => {
        console.log(response);
        dispatch(show_notification_success(GET_EDIT_USER_SUCCESS));
        dispatch({ type: GET_EDIT_USER_SUCCESS, payload: response.data.output[0] });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_EDIT_USER_ERROR });
        dispatch(show_notification_error(GET_EDIT_USER_ERROR));
      });
  };
};

export const UpdateUser = (payload) => {
  return (dispatch, getState) => {
    axios
      .post(`${API}/user/editProfile/${payload.userId}`, { payload })
      .then((response) => {
        console.log(response);
        dispatch(show_notification_success(EDIT_USER_SUCCESS));
      })
      .catch(() => {
        console.log("error");
        dispatch(show_notification_error(EDIT_USER_ERROR));
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
