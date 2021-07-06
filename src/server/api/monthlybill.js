import express from "express";
import { getConnection, operation } from "../util/connection";
import { extractDBQueryParam } from "../util/extractor";
const monthlyBillRouter = express.Router();
const sendResponse = (res, code, status, output) => {
  res.status(code);
  res.send({
    status: status,
    output,
  });
};
monthlyBillRouter.post("/savebill", function (req, res) {
  let queryObject = extractDBQueryParam(req);
  let query = `insert into monthlybill (${queryObject.keys.join(",")}) values ("${queryObject.values.join('","')}")`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("monthlyBillRouter");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});

monthlyBillRouter.get("/all", function (req, res) {
  //let queryObject = extractDBQueryParam(req);
  let query = `select * from monthlybill`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else
      operation(query, connection, (error, results, fields) => {
        console.log("Get all Monthly Bills");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
  });
});
monthlyBillRouter.get("/active", function (req, res) {
  //let queryObject = extractDBQueryParam(req);
  let query = `select * from monthlybill where isActive = 1;`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else
      operation(query, connection, (error, results, fields) => {
        console.log("Get all Monthly Bills");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
  });
});

monthlyBillRouter.delete("/delete/:id", function (req, res) {
  let query = `delete from monthlybill where billId=  ${req.params.id};`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) {
      sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    } else {
      operation(query, connection, (error, results, fields) => {
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});
monthlyBillRouter.post("/archive/:id", function (req, res) {
  let query = `update monthlybill set isActive = 0 where billId=  ${req.params.id};`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) {
      sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    } else {
      operation(query, connection, (error, results, fields) => {
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});

export default monthlyBillRouter;
