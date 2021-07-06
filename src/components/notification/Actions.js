import { REDIRECT_PAGE, SHOW_NOTIFICATION_ERROR, SHOW_NOTIFICATION_RESET, SHOW_NOTIFICATION_SUCCESS } from "./Types";

export const show_notification_success = (payload) => {
  return {
    type: SHOW_NOTIFICATION_SUCCESS,
    payload,
  };
};
export const show_notification_error = (payload) => {
  return {
    type: SHOW_NOTIFICATION_ERROR,
    payload,
  };
};
export const show_notification_reset = () => {
  console.log("show_notification_reset");
  return {
    type: SHOW_NOTIFICATION_RESET,
  };
};

export const redirect_page = (payload) => {
  console.log("redirect Page");
  return {
    type: REDIRECT_PAGE,
    payload,
  };
};
