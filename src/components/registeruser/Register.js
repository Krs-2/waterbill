import moment from "moment";
import Loader from "../loader/Loader";
import "./style.scss";
import React, { useState } from "react";
import User from "../../class/User";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./Action";

function Register() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.RegisterUserReducer.user);
  const setField = (e) => {
    dispatch({ type: "UPDATE_USER_OBJ", payload: e });
  };
  const registerMe = () => {
    let obj = new User(user);
    dispatch(registerUser(obj));
    console.log("test");
  };
  return (
    <div className="register__user__container">
      {false ? (
        <Loader />
      ) : (
        <div className="register__user">
          <h2>Register here </h2>
          <div className="form__row__item">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={user.name} onChange={setField} />
          </div>
          <div className="form__row__item">
            <label htmlFor="name">Email</label>
            <input type="text" name="email" id="email" value={user.email} onChange={setField} />
          </div>
          <div className="form__row__item">
            <label htmlFor="name">Phone</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="997099709970"
              pattern="[0-9]{10}"
              required
              onChange={setField}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="isAdmin"> Are you Admin </label>
            <input type="checkbox" id="isAdmin" name="isAdmin" onChange={setField} />
          </div>
          <div className="form__row__item">
            <label htmlFor="name"> Password </label>
            <input type="password" id="password" name="password" onChange={setField} />
          </div>
          <div className="form__row__item">
            <div className="form__col_items">
              <label htmlFor="startDate">Plot/Block Number</label>
            </div>
            <div className="form__col_items">
              <input type="text" name="plotNumber" id="plotNumber" value={user.plotNumber} onChange={setField} />
              <input type="text" name="blockNumber" id="blockNumber" value={user.blockNumber} onChange={setField} />
            </div>
          </div>

          <div className="form__row__item">
            <label htmlFor="uploadReadingPic"> Pic</label>
            <input type="file" name="uploadReadingPic" id="uploadReadingPic" value={user.picture} />
          </div>

          <div className="form__row__item">
            <input type="button" value="Register Me" onClick={registerMe} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Register;
