import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { getAllBills, deleteBill, archieveBill } from "../recentBills/Actions";
import "./style.scss";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

function RecentBills(props) {
  // const allBills = useSelector((state) => {
  //   const all = state.RecentBillsReducer.allBills;
  //   console.log(all);
  //   console.log("1" + all);
  //   return all;
  // });
  const allBills = useSelector((state) => state.RecentBillsReducer.allBills);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("1");
    dispatch(getAllBills());
    return () => {
      //cleanup;
    };
  }, []);
  const deleteBills = (item) => {
    console.log("editBiils" + JSON.stringify(item));
    dispatch(deleteBill(item.billId));
  };
  const archiveBill = (item) => {
    console.log("editBiils" + JSON.stringify(item));
    dispatch(archieveBill(item.billId));
  };
  return (
    <div className="recent__bills__container">
      {allBills.map((item, index) => {
        return (
          <div className={`recent__bills__item ${item.isActive ? "active" : ""}`}>
            <DeleteOutlinedIcon className="edit__consumed__units" onClick={() => deleteBills(item)} />
            <div className="recent__bills__row">Bill Id : {item.billId}</div>
            <div className="recent__bills__row">
              Month/Year :{item.month}/{item.year}
            </div>
            <div className="recent__bills__row">
              Bill Duration {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
            </div>
            <div className="recent__bills__row">Total Units : {item.totalUnits}</div>
            <div className="recent__bills__row">Total Bill :{item.totalBill} </div>
            <div className="recent__bills__row">Rate per unit : {item.ratePerUnit}</div>
            <div className="recent__bills__row">
              {item.isActive ? <ArchiveOutlinedIcon className="archieve__item" onClick={() => archiveBill(item)} /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default RecentBills;
