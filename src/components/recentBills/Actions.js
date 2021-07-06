import axios from "axios";
import AXIOS_ from "../../axios";
import { API } from "../../const";
import { show_notification_success, show_notification_error } from "../notification/Actions";
import {
  GET_ALL_BILLS_REQUEST,
  GET_ALL_BILLS_SUCCESS,
  GET_ALL_BILLS_ERROR,
  DELETE_BILL_REQUEST,
  DELETE_BILL_SUCCESS,
  DELETE_BILL_ERROR,
  BILL_ARCHIVE_REQUEST,
  BILL_ARCHIVE_SUCCESS,
  BILL_ARCHIVE_ERROR,
} from "./Types";

export const getAllBills = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_BILLS_REQUEST });
    AXIOS_("/monthlybill/all", "get")
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          response.data.output.forEach((element) => {
            element.active = false;
          });

          dispatch({ type: GET_ALL_BILLS_SUCCESS, payload: response.data.output });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_ALL_BILLS_ERROR, payload: error });
        dispatch(show_notification_error(GET_ALL_BILLS_ERROR));
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
export const deleteBill = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_BILL_REQUEST });
    AXIOS_(`/monthlybill/delete/${id}`, "delete")
      .then((success) => {
        console.log("ID " + id);
        dispatch(show_notification_success(DELETE_BILL_SUCCESS));
        dispatch({ type: DELETE_BILL_SUCCESS, payload: id });
      })
      .catch((error) => {
        dispatch(show_notification_success(DELETE_BILL_ERROR));
        console.log(error);
      });
  };
};
export const archieveBill = (id) => {
  return (dispatch) => {
    dispatch({ type: BILL_ARCHIVE_REQUEST });
    AXIOS_(`/monthlybill/archive/${id}`, "post", null)
      .then((response) => {
        dispatch(show_notification_success(BILL_ARCHIVE_SUCCESS));
        dispatch({ type: BILL_ARCHIVE_SUCCESS, payload: id });
      })
      .catch((error) => {
        dispatch(show_notification_success(BILL_ARCHIVE_ERROR));
        console.log(error);
      })
      .then(() => {
        console.log("Finally");
      });
  };
};
// .post("http://localhost:5000/monthlybill/savebill", payload)
