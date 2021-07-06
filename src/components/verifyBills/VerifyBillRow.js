import React from "react";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { useDispatch } from "react-redux";
import { updateConsumedUnits, updateField } from "./Actions";
import Loader from "../loader/Loader";

function VerifyBillRow({ item }) {
  console.log("Component re-render");
  const dispatch = useDispatch();
  const updateFieldValue = function (key) {
    return function (event) {
      return dispatch(updateField([key, event.target.id, event.target.value]));
    };
  };
  const editConsumedUnits = updateFieldValue("consumedUnits");
  const verifyBill = function (item, isApprved) {
    if (item) {
      dispatch(updateConsumedUnits(item, isApprved));
    }
    console.log("verifyBill");
  };

  const editValues = (param) => {
    dispatch(updateField(param));
  };
  return (
    <>
      {item.loading ? (
        <Loader />
      ) : (
        <>
          <div className="form__row__item form-header">
            <div className="form__col_items">
              <div>
                User Id: {item.userId} {"\t\t"}Bill Id:{item.billId}
              </div>
            </div>
            <br></br>
          </div>
          <div className="form__row__item">
            <div className="form__col_items">
              <label htmlFor="consumedUnits" className="consumed__label">
                Consumed Units
              </label>
            </div>
            <div className="form__col_items">
              <input
                type="number"
                name="consumedUnits"
                id={item.memberBillId}
                defaultValue={item.consumedUnits}
                onChange={editConsumedUnits}
                disabled={!item.editFlag}
              />
            </div>
            <div className="form__col_items">
              {!item.editFlag ? (
                <CreateOutlinedIcon
                  className="edit__consumed__units"
                  onClick={() => editValues(["editFlag", item.memberBillId])}
                />
              ) : (
                <CheckCircleOutlinedIcon
                  className="edit__consumed__units"
                  id={item.memberBillId}
                  onClick={() => verifyBill(item)}
                />
              )}
            </div>
            <div className="form__col_items">
              <DoneOutlinedIcon className="edit__consumed__units" id={item.memberBillId} onClick={() => verifyBill(item, true)} />
            </div>
          </div>

          <div className="form__row__item">
            <div className="form__col_items">
              <label htmlFor="estimatedBill" className="estimate__bill__label">
                Estimated Bill
              </label>
            </div>
            <div className="form__col_items">
              <label htmlFor="estimatedBill" className="estimate__bill__label">
                {item.estimatedBill}
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default VerifyBillRow;
