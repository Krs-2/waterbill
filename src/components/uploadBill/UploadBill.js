import "./style.scss";

import React, { Component } from "react";
import Loader from "../loader/Loader";
import { connect } from "react-redux";
import { saveBill } from "./Actions";
import MonthlyBill from "../../class/monthlyBill";
import { SAVE_MONTHLY_BILL_SUCCESS } from "./Types";

class UploadBill extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      billId: null,
      startDate: null,
      endDate: null,
      year: new Date().getFullYear(),
      month: "Jan",
      totalUnits: null,
      totalBill: null,
      ratePerUnit: null,
      isActive: 1,
      billImage: null,
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    };
    this.submitReading = this.submitReading.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  resetState = () => {
    this.setState((state) => {
      return {
        billId: "",
        startDate: "",
        endDate: "",
        year: new Date().getFullYear(),
        month: "Jan",
        totalUnits: "",
        totalBill: "",
        isActive: 1,
        ratePerUnit: "",
        billImage: "",
      };
    });
  };
  submitReading() {
    //Map state to class
    let billData = new MonthlyBill(this.state);
    billData.print();
    this.props.saveBill(billData);
    this.interval = setInterval(() => {
      if (this.props.status == SAVE_MONTHLY_BILL_SUCCESS) {
        clearInterval(this.interval);
        this.resetState();
      }
    }, 700);
  }

  updateValue(event) {
    this.setState(
      (state, prop) => {
        let unitsRate = 0;
        let value = event.target.value;
        switch (event.target.name) {
          case "totalBill":
            unitsRate = event.target.value / this.state.totalUnits;
            break;
          case "totalUnits":
            unitsRate = this.state.totalBill / event.target.value;
            break;
        }
        return {
          ...state,
          [event.target.name]: event.target.value,
          ratePerUnit: isNaN(unitsRate) ? 0 : unitsRate.toFixed(2),
        };
      },
      () => {
        console.log("hook to add after state in updated");
      }
    );
  }
  render() {
    const { loading, status } = this.props;
    const months = this.state.months.map((ele) => (
      <option key={ele} value={ele}>
        {ele}
      </option>
    ));
    const years = [0, 1, 2].map((ele) => (
      <option key={ele + "ss" + 2} value={new Date().getFullYear() + ele}>
        {new Date().getFullYear() + ele}
      </option>
    ));
    return (
      <div className="upload__bill_container">
        <div className="upload__bill">
          <h2>Upload Your Bill</h2>
          <div className="form__row__item">
            <label htmlFor="billId">bill Id</label>
            <input
              type="text"
              name="billId"
              id="billId"
              placeholder="Bill Number"
              onChange={this.updateValue}
              value={this.state.billId}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="billId">start Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="startDate"
              onChange={this.updateValue}
              value={this.state.startDate}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="billId">end Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="endDate"
              onChange={this.updateValue}
              value={this.state.endDate}
            />
          </div>
          <div className="form__row__item">
            <div className="form__col_items">
              <label htmlFor="billId">Month-Year</label>
            </div>
            <div className="form__col_items">
              <select name="month" id="month" placeholder="month" onChange={this.updateValue} value={this.state.month}>
                {months}
              </select>
              <select name="year" id="year" placeholder="year" onChange={this.updateValue} value={this.state.year}>
                {years}
              </select>
            </div>
          </div>
          <div className="form__row__item">
            <label htmlFor="billId">total Units</label>
            <input
              type="number"
              name="totalUnits"
              id="totalUnits"
              placeholder="totalUnits"
              onChange={this.updateValue}
              value={this.state.totalUnits}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="billId">total Bill</label>
            <input
              type="number"
              name="totalBill"
              id="totalBill"
              placeholder="totalBill"
              onChange={this.updateValue}
              value={this.state.totalBill}
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="billId">rate Per Unit</label>
            <input
              type="number"
              name="ratePerUnit"
              id="ratePerUnit"
              placeholder="ratePerUnit"
              onChange={this.updateValue}
              defaultValue={this.state.ratePerUnit}
              readOnly
            />
          </div>
          <div className="form__row__item">
            <label htmlFor="billId">bill Image</label>
            <input
              type="file"
              name="billImage"
              id="billImage"
              placeholder="billImage"
              onChange={this.updateValue}
              value={this.state.billImage}
            />
          </div>
          <input type="button" value="Submit" onClick={this.submitReading} />
        </div>
        {loading ? <Loader /> : null}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { loading, error, status } = state.UploadBillReducer;
  console.log("2");
  return { loading, error, status };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveBill: (payload) => dispatch(saveBill(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadBill);
