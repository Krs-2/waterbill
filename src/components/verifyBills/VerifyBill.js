import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { updateField, fetchsubmittedBills, updateConsumedUnits } from "./Actions";
import "./style.scss";
import VerifyBillRow from "./VerifyBillRow";

class VerifyBill extends Component {
  constructor(props) {
    super(props);
    //this.state = {};
    // const updateFieldValue = function (key) {
    //   return function (event) {
    //     return props.updateField([key, event.target.id, event.target.value]);
    //   };
    // };
    // this.editConsumedUnits = updateFieldValue("consumedUnits");
    // this.editConsumedUnits = function (event) {
    //   return props.updateField("consumedUnits", event.target.value);
    // };
    // this.editConsumedUnits = (event) => ({ props.updateField("consumedUnits", event.target.value)})
    //this.editConsumedUnits = this.editConsumedUnits.bind(this);
  }
  // editConsumedUnits(event) {
  //   this.props.props.updateField(["consumedUnits", event.target.id, event.target.value]);
  // }
  componentDidMount() {
    this.props.getAllSubmittedBills();
    console.log("didMount");
  }
  // saveverifyBill = function (event) {
  //   const id = event.currentTarget.id;
  //   if (id) {
  //     this.props.updateConsumedUnits(id);
  //   }
  //   console.log("verifyBill");
  // };
  // editValues = (param) => {
  //   this.props.updateField(param);
  // };
  render() {
    console.log("-->");
    const { loading, error, submittedRecords } = this.props;
    return (
      <div className="verify__Bill__container">
        {loading ? <Loader /> : null}
        <div className="verify_bill">
          {submittedRecords.map((item, index) => {
            return <VerifyBillRow item={item} key={index} />;
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("Verif Bil");
  const { loading, error, submittedRecords } = state.verifyBillsReducer;
  return { loading, error, submittedRecords };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllSubmittedBills: () => dispatch(fetchsubmittedBills()),
    // updateField: (payload) => dispatch(updateField(payload)),
    // updateConsumedUnits: (id) => dispatch(updateConsumedUnits(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyBill);
