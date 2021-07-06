import {
  SAVE_MONTHLY_BILL_ERROR,
  SAVE_MONTHLY_BILL_SUCCESS,
  SAVE_MONTHLY_BILL_REQUEST,
  GET_ALL_BILLS_REQUEST,
  GET_ALL_BILLS_SUCCESS,
  GET_ALL_BILLS_ERROR,
  DELETE_BILL_REQUEST,
  DELETE_BILL_SUCCESS,
} from "./Types";
const initialState = {
  loading: false,
  error: null,
  status: null,
  allBills: [],
  notification: null,
};
const UploadBillReducer = (state = initialState, action) => {
  let bills = [...state.allBills];
  switch (action.type) {
    case SAVE_MONTHLY_BILL_REQUEST:
      return { ...state, loading: true };
      break;
    case SAVE_MONTHLY_BILL_SUCCESS:
      bills.push(action.payload);
      return { ...state, status: SAVE_MONTHLY_BILL_SUCCESS, loading: false, allBills: bills };
      break;
    case SAVE_MONTHLY_BILL_ERROR:
      return { ...state, error: action.payload, loading: false };
      break;
    default:
      return state;
      break;
  }
};
export default UploadBillReducer;
