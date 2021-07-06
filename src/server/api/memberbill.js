import express from "express";
import { getConnection, operation } from "../util/connection";
import { extractDBQueryParam, extractDBQueryParamforUpdate } from "../util/extractor";
const memberBillRouter = express.Router();

const sendResponse = (res, code, status, output) => {
  res.status(code);
  res.send({
    status: status,
    output,
  });
};
memberBillRouter.get("/byId/:id", function (req, res) {
  res.status(200);
  res.send({
    status: "OK",
    data: mock,
  });
});

memberBillRouter.get("/review/bills", function (req, res) {
  let query = `SELECT * FROM memberbilldetails,monthlybill where memberbilldetails.billId = monthlybill.billId and monthlybill.isActive=1;`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("retrieve Bill fo review");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});

memberBillRouter.post("/save/correction/:id", function (req, res) {
  let queryObject = extractDBQueryParamforUpdate(req);
  // ${req.params.id};`;
  let query = `update memberbilldetails set ${queryObject} where  memberBillId= ${req.params.id}`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("saveReading");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});
memberBillRouter.post("/save/reading", function (req, res) {
  let queryObject = extractDBQueryParam(req);
  let query = `insert into memberbilldetails (${queryObject.keys.join(",")}) values ("${queryObject.values.join('","')}")`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("saveReading");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});

export default memberBillRouter;
