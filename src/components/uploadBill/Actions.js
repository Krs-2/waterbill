import axios from "axios";
import { API } from "../../const";
import { show_notification_success, show_notification_error } from "../notification/Actions";
import { SAVE_MONTHLY_BILL_ERROR, SAVE_MONTHLY_BILL_SUCCESS, SAVE_MONTHLY_BILL_REQUEST } from "./Types";

export const saveMonthlyBillRequest = () => {
  return {
    type: SAVE_MONTHLY_BILL_REQUEST,
  };
};
export const saveMonthlyBillSuccess = (payload) => {
  return {
    type: SAVE_MONTHLY_BILL_SUCCESS,
    payload: payload,
  };
};
export const saveMonthlyBillError = (payload) => {
  return {
    type: SAVE_MONTHLY_BILL_ERROR,
    payload: payload,
  };
};

export const saveBill = (payload) => {
  return (dispatch) => {
    dispatch(saveMonthlyBillRequest());
    axios
      .post(API + "/monthlybill/savebill", { payload })
      .then(function (response) {
        if (response.status == 200) {
          dispatch(show_notification_success(SAVE_MONTHLY_BILL_SUCCESS));
          dispatch(saveMonthlyBillSuccess());
        }
      })
      .catch(function (error) {
        console.log(error);
        dispatch(saveMonthlyBillError(error));
        dispatch(show_notification_error(SAVE_MONTHLY_BILL_ERROR));
      })
      .then(() => {
        console.log("Finally");
      });
  };
};

// .post("http://localhost:5000/monthlybill/savebill", payload)
