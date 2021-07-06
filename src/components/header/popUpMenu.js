import React from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { Link, useHistory, useLocation } from "react-router-dom";
import auth from "../../auth";
import { GoogleLogout } from "react-google-login";

function PopUpMenu(props) {
  const location = useLocation();
  const history = useHistory();
  const logout = () => {
    auth.deleteCookie("session");
    auth.deleteCookie("user");
    props.togglePopUp();
    history.push({
      pathname: "/profile/login",
      state: { hash: "", key: "uru0z9", pathname: location.pathname, search: "", background: true },
    });
  };
  const logout_cb = (response) => {
    //remove return once we add clinet ID
    return;
    console.log(response);
    auth.deleteCookie("session");
    auth.deleteCookie("user");
    history.push({
      pathname: "/profile/login",
      state: { hash: "", key: "uru0z9", pathname: location.pathname, search: "", background: true },
    });
  };
  return (
    <div className="nav__items top">
      <div className="top__icon"></div>
      <div className="nav__item" id="editProfile" onClick={props.togglePopUp}>
        <Link to={{ pathname: "/profile/edit", state: { background: location } }}>Edit Profile</Link>
      </div>

      <div className="nav__item" id="logout">
        <GoogleLogout
          clientId="ENTER_YOU_CLIENT_ID"
          buttonText=""
          className="logout__btn_g"
          style={{ all: "unset !important" }}
          onLogoutSuccess={logout_cb}
          onFailure={logout_cb}
          children={<ExitToAppOutlinedIcon className="login__out" />}
        ></GoogleLogout>
      </div>
    </div>
  );
}

export default PopUpMenu;
/*

logout uses
  window.gapi.auth2.getAuthInstance()
  Check current User object of above

*/
