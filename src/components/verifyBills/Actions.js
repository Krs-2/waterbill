import {
  VERIFY_BILL_DATA_ERROR,
  VERIFY_BILL_DATA_SUCCESS,
  VERIFY_BILL_DATA_REQUEST,
  UPDATE_FIELD,
  UPDATE_CONSUMED_BILL_DATA_ERROR,
  UPDATE_CONSUMED_BILL_DATA_SUCCESS,
  UPDATE_CONSUMED_BILL_DATA_REQUEST,
} from "./Types";
import { API } from "../../const";
import axios from "axios";
import { show_notification_success, show_notification_error } from "../notification/Actions";
const getAllSubmittedBillsRequest = () => {
  return {
    type: VERIFY_BILL_DATA_REQUEST,
  };
};
const getAllSubmittedBillsSuccess = (response) => {
  return {
    type: VERIFY_BILL_DATA_SUCCESS,
    payload: response,
  };
};
const getAllSubmittedBillsError = (response) => {
  return {
    type: VERIFY_BILL_DATA_ERROR,
    payload: response,
  };
};
export const updateField = (payload) => {
  return {
    type: UPDATE_FIELD,
    payload,
  };
};

export const fetchsubmittedBills = () => {
  return (dispatch) => {
    dispatch(getAllSubmittedBillsRequest());
    axios
      .get(`${API}/memberbill/review/bills`)
      .then((response) => {
        if (response.status == 200) {
          let data = response.data.output;
          data.forEach((item) => {
            item.editFlag = false;
            item.loading = false;
          });
          dispatch(getAllSubmittedBillsSuccess(data));
          dispatch(show_notification_success("GET_VERIFY_BILL_DATA_SUCCESS"));
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(show_notification_error("GET_VERIFY_BILL_DATA_ERROR"));
      });
  };
};
export const updateConsumedUnits = (item, isApproved) => {
  const input = {
    consumedUnits: item.consumedUnits,
    estimatedBill: item.estimatedBill,
    isApproved: isApproved ? 1 : 0,
  };
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_CONSUMED_BILL_DATA_REQUEST, payload: item.memberBillId });
    axios
      .post(`${API}/memberbill/save/correction/${item.memberBillId}`, { payload: input })
      .then((response) => {
        dispatch({ type: UPDATE_CONSUMED_BILL_DATA_SUCCESS, payload: item.memberBillId });
        dispatch(show_notification_success(UPDATE_CONSUMED_BILL_DATA_SUCCESS));
        console.log(response);
      })
      .catch((error) => {
        dispatch(show_notification_error(UPDATE_CONSUMED_BILL_DATA_ERROR));
        dispatch({ type: UPDATE_CONSUMED_BILL_DATA_ERROR, payload: item.memberBillId });
        console.log("error");
      });
  };
};
// export const updateConsumedUnits = (id) => {
//   return (dispatch) => {
//     dispatch({ type: UPDATE_CONSUMED_BILL_DATA_REQUEST, payload: id });
//     setTimeout(() => {
//       //api call
//       dispatch({ type: UPDATE_CONSUMED_BILL_DATA_SUCCESS, payload: id });
//     }, 1500);
//   };
// };
