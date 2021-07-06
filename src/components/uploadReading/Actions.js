import {
  GET_CURRENT_BILL_DATA_ERROR,
  GET_CURRENT_BILL_DATA_SUCCESS,
  GET_CURRENT_BILL_DATA_REQUEST,
  R_UPDATE_FIELD,
  SAVE_READING_REQUEST,
  SAVE_READING_SUCCESS,
  SAVE_READING_ERROR,
} from "./Types";

import axios from "axios";
import { API } from "../../const";
import { show_notification_success, show_notification_error } from "../notification/Actions";
import { SAVE_MONTHLY_BILL_REQUEST } from "../uploadBill/Types";

export const getCurrentBillRequest = () => {
  return {
    type: GET_CURRENT_BILL_DATA_REQUEST,
  };
};

export const getCurrentBillSuccess = (response) => {
  return {
    type: GET_CURRENT_BILL_DATA_SUCCESS,
    payload: response,
  };
};
export const getCurrentBillError = (response) => {
  return {
    type: GET_CURRENT_BILL_DATA_ERROR,
    payload: response,
  };
};
export const onUpdateField = (payload) => {
  return {
    type: R_UPDATE_FIELD,
    payload,
  };
};
export const saveReading = (payload) => {
  return (dispatch) => {
    dispatch({ type: SAVE_READING_REQUEST });
    axios
      .post(`${API}/memberbill/save/reading`, { payload })
      .then((response) => {
        console.log(response);
        dispatch(show_notification_success(SAVE_READING_SUCCESS));
      })
      .catch((error) => {
        console.log("error");
        dispatch(show_notification_error(SAVE_READING_ERROR));
      });
  };
};

export const getCurrentBill = () => {
  console.log("id param ");
  return (dispatch) => {
    dispatch(getCurrentBillRequest());
    axios
      .get(`${API}/monthlybill/active`)
      .then((response) => {
        console.log("response" + response);
        if (response.status == 200) {
          let temp = response.data.output && response.data.output[0];
          temp["consumedUnits"] = 0;
          temp["estimatedBill"] = 0;
          dispatch(getCurrentBillSuccess(temp));
          dispatch(show_notification_success(GET_CURRENT_BILL_DATA_SUCCESS));
        }
      })
      .catch((error) => {
        dispatch(getCurrentBillError(error));
        dispatch(show_notification_error(GET_CURRENT_BILL_DATA_ERROR));
        console.log("Error");
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
