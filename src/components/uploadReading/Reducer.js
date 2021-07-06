import {
  GET_CURRENT_BILL_DATA_ERROR,
  GET_CURRENT_BILL_DATA_SUCCESS,
  GET_CURRENT_BILL_DATA_REQUEST,
  R_UPDATE_FIELD,
} from "./Types";
const initialState = {
  loading: false,
  record: [],
  error: null,
};

const uploadReadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_BILL_DATA_REQUEST:
      return { ...state, loading: true };
      break;
    case GET_CURRENT_BILL_DATA_SUCCESS:
      return { ...state, loading: false, record: action.payload };
    case GET_CURRENT_BILL_DATA_ERROR:
      return { ...state, loading: false, record: [], error: action.payload };
    case R_UPDATE_FIELD:
      let [fieldName, fieldValue, id] = action.payload;
      let temp = { ...state.record };
      temp[fieldName] = fieldValue - 0;
      temp["estimatedBill"] = (temp.ratePerUnit * (parseInt(fieldValue) || 0)).toFixed(2);
      return { ...state, record: temp };
      break;
    default:
      return state;
      break;
  }
};
export default uploadReadingReducer;
