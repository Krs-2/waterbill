import { ThreeSixty } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUserDetails, saveNewPassword } from "./Action";
import Loader from "../loader/Loader";
import "./style.scss";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      email: "",
      password: "",
    };
  }
  setField = (e) => {
    this.setState((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  checkUserDetails = (e) => {
    console.log(e);
    this.props.checkUserDetails(this.state);
  };
  saveNewPassword = (e) => {
    this.props.saveNewPassword({ password: this.state.password, userId: this.props.user.userId });
    setTimeout(() => {
      this.setState(() => ({
        phoneNumber: "",
        email: "",
        password: "",
      }));
    }, 2000);
  };
  render() {
    return (
      <>
        <div className="forgot__password__container">
          <div className="forgot__password">
            <h2> forgot Password User </h2>
            <div className="form__row__item">
              <label htmlFor="name">Phone Number</label>
              <input type="text" name="phoneNumber" id="phoneNumber" value={this.state.phoneNumber} onChange={this.setField} />
            </div>
            <div className="form__row__item">
              <label htmlFor="name">Email</label>
              <input type="text" name="email" id="email" value={this.state.email} onChange={this.setField} />
            </div>
            {this.props.showPasswordPanel ? (
              <div className="form__row__item">
                <label htmlFor="name">New Password</label>
                <input type="text" name="password" id="password" value={this.state.password} onChange={this.setField} />
              </div>
            ) : null}
            {this.props.showPasswordPanel ? (
              <div className="form__row__item">
                <input type="button" value="Update Password" onClick={this.saveNewPassword} />
              </div>
            ) : (
              <div className="form__row__item">
                <input type="button" value="CheckUser" onClick={this.checkUserDetails} />
              </div>
            )}
          </div>
          {this.props.loading ? <Loader /> : null}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { loading, error, user, showPasswordPanel } = state.ForgotPasswordReducer;
  return {
    loading,
    error,
    user,
    showPasswordPanel,
  };
};
const mapDispatchToProps = (dispatch, getState) => {
  return { checkUserDetails: (obj) => dispatch(checkUserDetails(obj)), saveNewPassword: (obj) => dispatch(saveNewPassword(obj)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
