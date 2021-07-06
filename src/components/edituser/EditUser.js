import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../class/User";
import Loader from "../loader/Loader";
import { getUser, UpdateUser } from "./Action";
import "./style.scss";

export default function EditUser() {
  const user = useSelector((state) => state.EditUserReducer.user);
  const [user__, setUser__] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(22));
    return () => {
      //todo
    };
  }, []);
  useEffect(() => {
    setUser__(user);
    return () => {};
  }, [user]);
  const setField = (e) => {
    setUser__({ ...user__, [e.target.name]: e.target.value });
  };
  const saveUser = () => {
    console.log("save user");
    dispatch(UpdateUser(new User(user__)));
  };
  return (
    <div className="edit__user__container">
      {false ? (
        <Loader />
      ) : (
        <div className="edit__user">
          <h2>Edit User </h2>
          <div className="form__row__item">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={user__.name} onChange={setField} />
          </div>
          <div className="form__row__item">
            <label htmlFor="name">Email</label>
            <input type="text" name="email" id="email" value={user__.email} onChange={setField} />
          </div>
          <div className="form__row__item">
            <label htmlFor="name">Phone</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={user__.phoneNumber}
              pattern="[0-9]{10}"
              required
              onChange={setField}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="isAdmin"> Are you Admin </label>
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={user__.isAdmin}
              value={user__.isAdmin}
              onChange={(e) => setUser__({ ...user__, [e.target.name]: !user__.isAdmin - 0 })}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="name">Change Password </label>
            <input type="password" id="password" name="password" value={user__.password} onChange={setField} />
          </div>
          <div className="form__row__item">
            <div className="form__col_items">
              <label htmlFor="startDate">Plot/Block Number</label>
            </div>
            <div className="form__col_items">
              <input type="text" name="plotNumber" id="plotNumber" value={user__.plotNumber} onChange={setField} />
              <input type="text" name="blockNumber" id="blockNumber" value={user__.blockNumber} onChange={setField} />
            </div>
          </div>

          <div className="form__row__item">
            <label htmlFor="uploadReadingPic"> Pic</label>
            <input type="file" name="uploadReadingPic" id="uploadReadingPic" />
          </div>

          <div className="form__row__item">
            <input type="button" value="Register Me" onClick={saveUser} />
          </div>
        </div>
      )}
    </div>
  );
}
