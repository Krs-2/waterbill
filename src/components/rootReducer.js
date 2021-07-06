import { combineReducers } from "redux";
import verifyBillsReducer from "./verifyBills/Reducer";
import UploadReadingReducer from "./uploadReading/Reducer";
import UserReducer from "./users/Reducer";
import UploadBillReducer from "./uploadBill/Reducer";
import NotificationReducer from "./notification/Reducer";
import EditUserReducer from "./edituser/Reducer";
import ForgotPasswordReducer from "./forgotpassword/Reducer";
import RecentBillsReducer from "./recentBills/Reducer";
import LoginReducer from "./login/Reducer";
import RegisterUserReducer from "./registeruser/Reducer";
import UserMgmtReducer from "./usermanagement/Reducer";
const rootReducer = combineReducers({
  verifyBillsReducer,
  UploadReadingReducer,
  ForgotPasswordReducer,
  UserReducer,
  UploadBillReducer,
  NotificationReducer,
  EditUserReducer,
  RecentBillsReducer,
  LoginReducer,
  RegisterUserReducer,
  UserMgmtReducer,
});
export default rootReducer;
