import "./style.scss";
import React, { Component, useEffect, useRef, useState } from "react";
import Login from "../login/Login";
import Avatar from "@material-ui/core/Avatar";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Modal from "../modal/Modal";
import { Link, useHistory, useLocation } from "react-router-dom";
import UploadBill from "../uploadBill/UploadBill";
import UploadReading from "../uploadReading/UploadReading";
import User from "../users/User";
import VerifyBill from "../verifyBills/VerifyBill";
import PopUpMenu from "./popUpMenu";
import auth from "../../auth";
const baseRoot = document.getElementById("root");
function sample() {
  console.log("sample");
  return true;
}
function Header(props) {
  const location = useLocation();
  const toggle = useRef(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleMenuView = (e) => {
    console.log("setToggleMenu-------------------");
    setToggleMenu((prevToggleMenu) => {
      toggle.current = !prevToggleMenu;
      return !prevToggleMenu;
    });
  };
  useEffect(() => {
    baseRoot.addEventListener("click", toggler, false);
    return () => {
      baseRoot.removeEventListener("click", toggler, false);
    };
  }, []);
  const toggler = (e) => {
    console.log("aaa");
    console.log("Id", e.target.className);
    if (e.target.className != "MuiAvatar-img") {
      setToggleMenu(false);
    }
  };
  return (
    <>
      <div className="header">
        <div className="title__container">
          <h1>Suntech Society</h1>
        </div>

        {auth.isAuthenticated() ? (
          <div className="login__container">
            <Avatar className="user_avatar loggedin" alt="K" src="./assets/avatar/one.png" onClick={toggleMenuView}></Avatar>
            {toggleMenu ? <PopUpMenu togglePopUp={toggleMenuView} /> : null}
          </div>
        ) : (
          <div className="login__container">
            <Link to={{ pathname: "/profile/login", state: { background: location } }}>
              <Avatar className="user_avatar" onClick={props.openLoginWindow} />
            </Link>
          </div>
        )}

        <div className="navigation__panel">
          <Link to="/"> Recent Bills</Link>
          <Link to="/verifyBill"> verify bill</Link>
          <Link to="/uploadBill"> Upload Bill</Link>
          <Link to="/uploadReading"> Upload Reading</Link>
          <Link to="/userMgmt"> UserMgmt</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
