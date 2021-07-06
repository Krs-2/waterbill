import {
  GET_ALL_BILLS_REQUEST,
  GET_ALL_BILLS_SUCCESS,
  GET_ALL_BILLS_ERROR,
  DELETE_BILL_REQUEST,
  DELETE_BILL_SUCCESS,
  BILL_ARCHIVE_REQUEST,
  BILL_ARCHIVE_SUCCESS,
} from "./Types";
const initialState = {
  loading: false,
  error: null,
  status: null,
  allBills: [],
  notification: null,
};
const RecentBillsReducer = (state = initialState, action) => {
  let bills = [...state.allBills];
  switch (action.type) {
    case GET_ALL_BILLS_REQUEST:
    case BILL_ARCHIVE_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_BILLS_SUCCESS:
      return { ...state, allBills: action.payload, loading: false };
    case GET_ALL_BILLS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case DELETE_BILL_REQUEST:
      return state;
    case DELETE_BILL_SUCCESS:
      bills = bills.filter((bill, index, list) => bill.billId !== action.payload);
      return { ...state, allBills: bills };
      break;
    case BILL_ARCHIVE_SUCCESS:
      bills.forEach((bill) => {
        if (bill.billId == action.payload) {
          bill.isActive = false;
          return;
        }
      });
      return { ...state, loading: true, allBills: bills };
    default:
      return state;
      break;
  }
};
export default RecentBillsReducer;
