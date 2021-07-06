import { SHOW_NOTIFICATION_ERROR, SHOW_NOTIFICATION_SUCCESS, SHOW_NOTIFICATION_RESET, REDIRECT_PAGE } from "./Types";
const MSG_TYPE = ["error", "warning", "primary", "success"];
const initialState = {
  msg: null,
  type: null,
  notify: false,
  redirectMe: { pathname: null, background: false },
};
const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION_SUCCESS:
      return { ...state, msg: action.payload, type: MSG_TYPE[3], notify: true };
    case SHOW_NOTIFICATION_ERROR:
      return { ...state, msg: action.payload, type: MSG_TYPE[0], notify: true };
    case SHOW_NOTIFICATION_RESET:
      return { ...initialState };
    case REDIRECT_PAGE:
      return { ...state, redirectMe: action.payload };
    default:
      return state;
      break;
  }
};
export default NotificationReducer;
