var mysql = require("mysql2");
var dbConfig = require("../config/connection");

var pool = mysql.createPool(dbConfig.dbConnection);

function _getConnection(callback) {
  pool.getConnection(function (err, connection) {
    callback(err, connection);
  });
}
function _getConnection_() {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) reject(err);
      resolve(connection);
    });
  });
}
function _operation(q, connection, callback) {
  connection.query(q, function (error, results, fields) {
    connection.release();
    callback(error, results, fields);
  });
}
function _operation_(q, connection) {
  return new Promise(function (resolve, reject) {
    connection.query(q, function (error, results, fields) {
      connection.release();
      if (error) reject(error);
      resolve(results, fields);
    });
  });
}

module.exports = {
  getConnection: _getConnection,
  getConnection_: _getConnection_,
  operation: _operation,
  operation_: _operation_,
};
