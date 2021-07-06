import "./style.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import { getCurrentBill, onUpdateField, saveReading } from "./Actions";
import moment from "moment";
import { UploadReading as UP } from "../../class/uploadReading";

class UploadReading extends Component {
  constructor(props) {
    super(props);
    // const e_updateField = function (field) {
    //   return function (event) {
    //     return props.c_updateField([field, event.target.value, event.target.id]);
    //   };
    // };
    this.submitReading = this.submitReading.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  updateValue(event) {
    this.props.ur_updateField(["consumedUnits", event.target.value, event.target.id]);
  }
  componentDidMount() {
    this.props.getBillData();
  }
  submitReading() {
    console.log("Test");
    const obj = new UP(this.props.record);
    obj.print();
    this.props.saveReading(obj);
  }

  render() {
    const { record, loading, sampleOwnProps } = this.props;
    return (
      <div className="upload_reading_form_container">
        {loading ? (
          <Loader />
        ) : (
          <div className="upload__reading">
            <h2>Upload Your Reading</h2>
            <div className="form__row__item">
              <label htmlFor="billId">bill Id</label>
              <input type="text" name="billId" id="billId" defaultValue={record.billId} disabled />
            </div>
            <div className="form__row__item">
              <div className="form__col_items">
                <label htmlFor="startDate">Duration</label>
              </div>
              <div className="form__col_items">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  defaultValue={moment(record.startDate).format("YYYY-MM-DD")}
                  disabled
                />
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  defaultValue={moment(record.endDate).format("YYYY-MM-DD")}
                  disabled
                />
              </div>
            </div>
            <div className="form__row__item">
              <div className="form__col_items">
                <label htmlFor="month">Month/Year</label>
              </div>
              <div className="form__col_items">
                <input type="text" name="month" id="month" defaultValue={record.month} disabled />
                <input type="text" name="year" id="year" defaultValue={record.year} disabled />
              </div>
            </div>
            <div className="form__row__item">
              <label htmlFor="totalUnits">total Unit</label>
              <input type="text" name="totalUnits" id="totalUnits" defaultValue={record.totalUnits} disabled />
            </div>
            <div className="form__row__item">
              <label htmlFor="totalBill">total Bill</label>
              <input type="text" name="totalBill" id="totalBill" defaultValue={record.totalBill} disabled />
            </div>
            <div className="form__row__item">
              <label htmlFor="ratePerUnit">per Unit Cost</label>
              <input type="text" name="ratePerUnit" id="ratePerUnit" defaultValue={record.ratePerUnit} disabled />
            </div>
            <div className="form__row__item">
              <label htmlFor="consumedUnits">consumed Units</label>
              <input
                type="number"
                name="consumedUnits"
                id={record.id}
                onChange={this.updateValue}
                defaultValue={record.consumedUnits}
              />
            </div>
            <div className="form__row__item">
              <label htmlFor="estimatedBill">estimated Bill</label>
              <input type="text" name="estimatedBill" id="estimatedBill" value={record.estimatedBill} readOnly />
            </div>
            <div className="form__row__item">
              <label htmlFor="uploadReadingPic">upload Reading Pic</label>
              <input type="file" name="uploadReadingPic" id="uploadReadingPic" defaultValue={record.uploadReadingPic || ""} />
            </div>
            <input type="button" value="Submit" onClick={this.submitReading} />
          </div>
        )}
        <div className="own__props">
          <h2>Play Area</h2>
          -- sampleOwnProps : {JSON.stringify(sampleOwnProps)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps = { a: 1 }) => {
  const { loading, error, record } = state.UploadReadingReducer;
  console.log("ownProps" + JSON.stringify(ownProps));
  return { loading, error, record, ownProps };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBillData: (id) => dispatch(getCurrentBill(id)),
    ur_updateField: (payload) => dispatch(onUpdateField(payload)),
    saveReading: (payload) => dispatch(saveReading(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadReading);
