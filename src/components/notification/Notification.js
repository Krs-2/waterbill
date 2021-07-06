import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { show_notification_reset } from "./Actions";
import "./style.scss";

export default function Notification() {
  const { type, notify, msg, redirectMe } = useSelector((state) => state.NotificationReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(
    (prevMsg, aa) => {
      setTimeout(() => {
        dispatch(show_notification_reset());
      }, 2000);
      return () => {};
    },
    [msg]
  );
  useEffect(() => {
    if (redirectMe.pathname) {
      history.push({
        pathname: redirectMe.pathname || "/",
        state: { hash: "", key: "uru0z9", pathname: location.pathname, search: "", background: redirectMe.background },
      });
    }
  }, [redirectMe]);
  return <div className="notification__bar">{notify ? <div className={`alert ${type}`}>{msg}</div> : null}</div>;
}
