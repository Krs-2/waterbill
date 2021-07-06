import "./App.scss";

import RecentBills from "./components/recentBills/RecentBills";
import UploadBill from "./components/uploadBill/UploadBill";
import UploadReading from "./components/uploadReading/UploadReading";
import VerifyBill from "./components/verifyBills/VerifyBill";
import Notification from "./components/notification/Notification";
import Person from "./Person";
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import EditUser from "./components/edituser/EditUser";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import Login from "./components/login/Login";
import Modal_ from "./components/modal/Modal_";
import Register from "./components/registeruser/Register";
import { ProtectedRoute } from "./Protected.route";
import auth from "./auth";
import { useEffect } from "react";
import UserMgmt from "./components/usermanagement/UserMgmt";

function App() {
  //const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  let history = useHistory();
  const background = location.state && location.state.background;

  const renderSwitch = (location) => {
    switch (location.pathname) {
      case "/profile/login":
        return (
          <Modal_>
            <Login />
          </Modal_>
        );
        break;
      case "/profile/edit":
        return (
          <Modal_>
            <EditUser />
          </Modal_>
        );
        break;
      case "/profile/forgotPassword":
        return (
          <Modal_>
            <ForgotPassword />
          </Modal_>
        );
        break;
      case "/profile/register":
        return (
          <Modal_>
            <Register />
          </Modal_>
        );
      default:
        return null;
        break;
    }
  };
  return (
    <>
      <div className="container__section">
        {!background && <Notification />}
        {background && <Route path="/profile/:id">{renderSwitch(location)}</Route>}

        <Switch location={background || location}>
          <ProtectedRoute path="/verifyBill" Component={VerifyBill} />
          <ProtectedRoute path="/uploadBill" Component={UploadBill} />
          <ProtectedRoute path="/uploadReading" Component={UploadReading} />
          <ProtectedRoute path="/userMgmt" Component={UserMgmt} />
          <ProtectedRoute path="/" Component={RecentBills} />
        </Switch>
      </div>
    </>
  );
}

export default App;
