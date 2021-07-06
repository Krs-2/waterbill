import {
  VERIFY_BILL_DATA_ERROR,
  VERIFY_BILL_DATA_SUCCESS,
  VERIFY_BILL_DATA_REQUEST,
  UPDATE_FIELD,
  UPDATE_CONSUMED_BILL_DATA_REQUEST,
  UPDATE_CONSUMED_BILL_DATA_SUCCESS,
} from "./Types";

const initialState = {
  loading: true,
  error: null,
  submittedRecords: [],
};

const verifyBillsReducer = (state = initialState, action) => {
  let selectedRecord = new Object();
  const submittedRecordsObj = [...state.submittedRecords];
  switch (action.type) {
    case VERIFY_BILL_DATA_REQUEST:
      return { ...state, loading: true };
    case VERIFY_BILL_DATA_SUCCESS:
      return { ...state, submittedRecords: action.payload, loading: false };
    case VERIFY_BILL_DATA_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_FIELD:
      const [field, selectedId, value] = action.payload;
      selectedRecord = submittedRecordsObj.find((item) => {
        return item.memberBillId == selectedId;
      });
      if (field == "editFlag") {
        selectedRecord[field] = selectedRecord[field] ? !selectedRecord[field] : true;
      } else {
        selectedRecord[field] = value;
        selectedRecord["estimatedBill"] = (selectedRecord.ratePerUnit * (parseInt(value) || 0)).toFixed(2);
      }
      return { ...state, submittedRecords: submittedRecordsObj };
    case UPDATE_CONSUMED_BILL_DATA_REQUEST:
      selectedRecord = submittedRecordsObj.find(({ memberBillId }) => memberBillId == action.payload - 0);
      selectedRecord["loader"] = selectedRecord["loader"] ? !selectedRecord["loader"] : true;
      return {
        ...state,
        submittedRecords: submittedRecordsObj,
      };
    case UPDATE_CONSUMED_BILL_DATA_SUCCESS:
      let selectedIndex = submittedRecordsObj.findIndex(({ memberBillId }) => memberBillId == action.payload - 0);
      submittedRecordsObj[selectedIndex].editFlag = !submittedRecordsObj[selectedIndex].editFlag;
      submittedRecordsObj[selectedIndex].loader = !submittedRecordsObj[selectedIndex].loader;
      return {
        ...state,
        submittedRecords: submittedRecordsObj,
      };
    default:
      return state;
  }
};

export default verifyBillsReducer;
