import express from "express";
import { getConnection, operation, getConnection_, operation_ } from "../util/connection";
import { extractDBQueryParam, extractDBQueryParamforUpdate, extractDBQueryParamforRetrieve } from "../util/extractor";
const userRouter = express.Router();

const sendResponse = (res, code, status, output) => {
  res.status(code);
  res.send({
    status: status,
    output,
  });
};
userRouter.post("/register", function (req, res) {
  let queryObject = extractDBQueryParam(req);
  let query = `insert into users (${queryObject.keys.join(",")}) values ("${queryObject.values.join('","')}")`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("userRouter");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});
userRouter.post("/resetpassword/:id", function (req, res) {
  let queryObject = extractDBQueryParamforUpdate(req, ["userId"]);
  // ${req.params.id};`;
  let query = `update users set ${queryObject} where  userId= ${req.params.id}`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("user Router");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});
userRouter.post("/editProfile/:id", function (req, res) {
  let queryObject = extractDBQueryParamforUpdate(req, ["userId", "picture"]);
  // ${req.params.id};`;
  let query = `update users set ${queryObject} where  userId= ${req.params.id}`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else {
      operation(query, connection, (error, results, fields) => {
        console.log("user Router");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
    }
  });
});

userRouter.post("/login", function (req, res) {
  let queryObject = extractDBQueryParamforRetrieve(req);
  let query = `select * from users where  ${queryObject}`;

  // getConnection((error, connection) => {
  //   if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
  //   else
  //     operation(query, connection, (error, results, fields) => {
  //       console.log("Get all Monthly Bills");
  //       if (error) {
  //         sendResponse(res, 400, "ERROR", error && error.sqlMessage);
  //       } else {
  //         sendResponse(res, 200, "SUCCESS", results);
  //       }
  //     });
  // });
  getConnection_()
    .then((connection) => {
      return operation_(query, connection);
    })
    .then((results) => {
      console.log(results);
      sendResponse(res, 200, "SUCCESS", results);
    })
    .catch(function (error) {
      console.log(error);
      sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    });
});

userRouter.get("/all", function (req, res) {
  let query = `select * from users`;
  getConnection_()
    .then((connection) => {
      return operation_(query, connection);
    })
    .then((results) => {
      console.log(results);
      sendResponse(res, 200, "SUCCESS", results);
    })
    .catch(function (error) {
      console.log(error);
      sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    });
});

userRouter.get("/isExist/:email", function (req, res) {
  let query = `select * from users where email='${req.params.email}'`;
  console.log(query);
  // getConnection((error, connection) => {
  //   if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
  //   else
  //     operation(query, connection, (error, results, fields) => {
  //       console.log("Get all Monthly Bills");
  //       if (error) {
  //         sendResponse(res, 400, "ERROR", error && error.sqlMessage);
  //       } else {
  //         sendResponse(res, 200, "SUCCESS", results);
  //       }
  //     });
  // });
  getConnection_()
    .then((connection) => {
      return operation_(query, connection);
    })
    .then((results) => {
      console.log(results);
      sendResponse(res, 200, "SUCCESS", results);
    })
    .catch(function (error) {
      console.log(error);
      sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    });
});

userRouter.get("/get/:id/:email", function (req, res) {
  //let queryObject = extractDBQueryParam(req);
  let query = `select * from users where phoneNumber = ${req.params.id} AND email=${req.params.email}`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else
      operation(query, connection, (error, results, fields) => {
        console.log("get user");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
  });
});

userRouter.get("/:id", function (req, res) {
  //let queryObject = extractDBQueryParam(req);
  let query = `select * from users where phoneNumber = ${req.params.id}`;
  console.log(query);
  getConnection((error, connection) => {
    if (error) sendResponse(res, 400, "ERROR", error && error.sqlMessage);
    else
      operation(query, connection, (error, results, fields) => {
        console.log("get user");
        if (error) {
          sendResponse(res, 400, "ERROR", error && error.sqlMessage);
        } else {
          sendResponse(res, 200, "SUCCESS", results);
        }
      });
  });
});

export default userRouter;
