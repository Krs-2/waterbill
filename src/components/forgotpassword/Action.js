import axios from "axios";
import { API } from "../../const";
import { show_notification_error, show_notification_success } from "../notification/Actions";
import {
  FORGOT_PASSWORD_USER_ERROR,
  FORGOT_PASSWORD_USER_SUCCESS,
  USER_EXIST_ERROR,
  USER_EXIST_REQUEST,
  USER_EXIST_SUCCESS,
} from "./Types";
import AXIOS_ from "../../axios";

export const checkUserDetails = (obj) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_EXIST_REQUEST });
    AXIOS_(`${API}/user/get/${obj.phoneNumber}/${obj.email}`, "get")
      .then((response) => {
        if (response.data.output.length) {
          dispatch(show_notification_success(USER_EXIST_SUCCESS));
          dispatch({ type: USER_EXIST_SUCCESS, payload: response.data.output[0] });
        } else {
          dispatch({ type: USER_EXIST_ERROR });
          dispatch(show_notification_error(USER_EXIST_ERROR));
        }
      })
      .catch(() => {
        console.log("error");
        dispatch(show_notification_error(USER_EXIST_ERROR));
        dispatch({ type: USER_EXIST_ERROR });
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
export const saveNewPassword = (payload) => {
  return (dispatch, getState) => {
    AXIOS_(`${API}/user/resetpassword/${payload.userId}`, "post", { payload })
      .then((response) => {
        if (response.status == 200) {
          dispatch(show_notification_success(FORGOT_PASSWORD_USER_SUCCESS));
          dispatch({ type: FORGOT_PASSWORD_USER_SUCCESS });
        } else {
          dispatch({ type: FORGOT_PASSWORD_USER_ERROR });
          dispatch(show_notification_error(FORGOT_PASSWORD_USER_ERROR));
        }
      })
      .catch(() => {
        console.log("error");
        dispatch(show_notification_error(FORGOT_PASSWORD_USER_ERROR));
        dispatch({ type: FORGOT_PASSWORD_USER_ERROR });
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
