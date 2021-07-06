import "./style.scss";

import React, { Component } from "react";
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <i>All Rights Reserved @Abc 2021</i>
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  return;
  {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    abc: () => dispatch(test),
  };
};
export default connect(null, null)(Footer);
