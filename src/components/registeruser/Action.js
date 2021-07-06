import axios from "axios";
import { API } from "../../const";

import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./Types";
import { show_notification_success, show_notification_error, redirect_page } from "../notification/Actions";
import auth from "../../auth";
export const registerUser = (payload) => {
  return (dispatch, getState) => {
    axios
      .post(`${API}/user/register`, { payload })
      .then((response) => {
        console.log(response);
        dispatch(show_notification_success(REGISTER_USER_SUCCESS));
        auth.setCookie("session", `${Date.now()}`, new Date().setHours(new Date().getHours() + 1), 3600);
        auth.setCookie("user", `${JSON.stringify(payload)}`, new Date().setHours(new Date().getHours() + 1), 3600);
        dispatch(
          redirect_page({
            pathname: "/",
            background: false,
          })
        );
      })
      .catch(() => {
        console.log("error");
        dispatch(show_notification_error(REGISTER_USER_ERROR));
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
