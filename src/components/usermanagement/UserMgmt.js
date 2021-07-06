import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "./Action";
import Loader from "../loader/Loader";
import "./style.scss";

class UserMgmt extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    console.log("render called");
    const users = this.props.users;
    return (
      <div className="user__mgmt_container">
        <div className="user__flex">
          <div className="user__item">
            {users.map((item, index) => {
              return (
                <div key={index}>
                  <div className="key">{index}</div>
                  <div className="details">{JSON.stringify(item)} </div>
                </div>
              );
            })}
          </div>
          {this.props.loading ? <Loader /> : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { loading, users } = state.UserMgmtReducer;
  return { loading, users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserMgmt);
