import "./style.scss";
import React, { Component } from "react";
import { getUserData, setInputField } from "./Actions";
import { connect } from "react-redux";

class User extends Component {
  constructor(props) {
    super(props);
  }
  onInputChange = (event) => {
    this.props.setField([event.target.name, event.target.value]);
  };
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const { record } = this.props;
    return (
      <div>
        <input type="text" name="userName" id="userName" defaultValue={record.userName} onChange={this.onInputChange} />
        <input type="text" name="password" id="password" defaultValue={record.password} />
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { loading, error, record } = state.UserReducer;
    return { loading, error, record };
  },
  (dispatch) => {
    return {
      getUsers: () => dispatch(getUserData()),
      setField: (payload) => dispatch(setInputField(payload)),
    };
  }
)(User);
