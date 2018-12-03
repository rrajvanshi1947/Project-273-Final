var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  host: "linkedininstance.cw07bx5twhkg.us-west-1.rds.amazonaws.com",
  user: "root",
  password: "linkedin1",
  database: "linkedin"
});

pool.getConnection(function(err) {
  if (err) console.log("Connection to MySQL DB failed");
  else console.log("Connection to MySQL DB established");
});

module.exports = pool;
