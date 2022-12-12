require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: "localhost", // address of the server
  port: 3306, // port of the DB server (mysql), not to be confused with the express app PORT !
  user: "root",
  password: "root",
  database: "express_quests",
});

database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = database;
