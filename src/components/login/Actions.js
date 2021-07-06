import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from "./Types";
import { show_notification_success, show_notification_error, redirect_page } from "../notification/Actions";
import AXIOS_ from "../../axios";
import auth from "../../auth";
import User from "../../class/User";

export const checkLogin = (user) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    AXIOS_("/user/login", "post", { payload: user })
      // .get()
      .then((response) => {
        console.log(response);
        if (response && response.data.output && response.data.output.length > 0) {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.output[0] });
          auth.setCookie("session", `${Date.now()}`, new Date().setHours(new Date().getHours() + 1), 3600);
          auth.setCookie(
            "user",
            `${JSON.stringify(response.data.output[0])}`,
            new Date().setHours(new Date().getHours() + 1),
            3600
          );
          dispatch(show_notification_success(USER_LOGIN_SUCCESS));
          dispatch(
            redirect_page({
              pathname: "/",
              background: false,
            })
          );
        } else {
          dispatch({ type: USER_LOGIN_ERROR });
          dispatch(show_notification_error(USER_LOGIN_ERROR));
        }
      })
      .catch((error) => {
        console.log("error");
        dispatch({ type: USER_LOGIN_ERROR });
        dispatch(show_notification_error(USER_LOGIN_ERROR));
      })
      .then(() => {
        console.log("-->finally");
      });
  };
};

export const storeLoginDetails = (data, userData) => {
  const { access_token, expires_at, expires_in, login_hint } = data.tokenObj;
  return (dispatch) => {
    AXIOS_(`/user/isExist/${userData.email}`, "get")
      .then((response) => {
        if (response && response.data.output && response.data.output.length > 0) {
          auth.setCookie("session", `${access_token}`, expires_at, expires_in);
          auth.setCookie("user", `${JSON.stringify(userData.toJson())}`, expires_at, expires_in);
          dispatch(
            redirect_page({
              pathname: "/",
              background: false,
            })
          );
        } else {
          dispatch(show_notification_success("Please Complete Registration"));
          let user = new User({});
          user.email = userData.email;
          user.name = userData.name;
          user.userId = userData.googleId;
          dispatch({
            type: "REGISTER_USER_INIT",
            payload: user,
          });
          dispatch(
            redirect_page({
              pathname: "/profile/register",
              background: true,
            })
          );
        }
      })
      .catch((error) => {
        console.log("Eroor");
        dispatch({ type: USER_LOGIN_ERROR });
      });
  };
};
