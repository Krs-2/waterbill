import "./style.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import React, { Component, useState } from "react";
import { checkLogin, storeLoginDetails } from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import GoogleUser from "../../class/googleUser";
import Loader from "../loader/Loader";

function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.LoginReducer.loading);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const responseGoogle = (response) => {
    if (response.googleId) {
      let isdpLogin = new GoogleUser(response.tokenId, response.accessToken, response.googleId, response.profileObj);
      console.log(JSON.stringify(response));
      isdpLogin.printSessionData();
      dispatch(storeLoginDetails(response, isdpLogin));
    }
    // history.push({
    //   pathname: "/profile/edit",
    //   state: { hash: "", key: "uru1z9", pathname: location.pathname, search: "", background: true },
    // });
  };
  const loginToApp = () => {
    dispatch(checkLogin({ phoneNumber, password }));
    // history.push({
    //   pathname: "/",
    //   state: { hash: "", key: "uru0z9", pathname: location.pathname, search: "", background: true },
    // });
  };
  return (
    <div className="login__container">
      <div className="login">
        <div className="form__row__item">
          <h2>Login Form</h2>
        </div>
        <div className="form__row__item">
          <label htmlFor="phoneNumber">phoneNumber</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form__row__item">
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form__row__item">
          <div className="form__col_items">
            <input type="button" value="Login" onClick={loginToApp} />
          </div>
          <div className="form__col_items">
            <GoogleLogin
              clientId="ENTER_YOUR_CLIENT_ID"
              buttonText="login With Gmail"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="form__row__item">
          <Link
            to={{
              pathname: "/profile/forgotPassword",
              state: { background: (location.state && location.state.background) || "" },
            }}
          >
            Forgot Password
          </Link>
        </div>
        <div className="form__row__item">
          <Link
            to={{
              pathname: "/profile/register",
              state: { background: (location.state && location.state.background) || "" },
            }}
          >
            Registed New
          </Link>
        </div>
      </div>
      {loading ? <Loader /> : null}
    </div>
  );
}

export default Login;
