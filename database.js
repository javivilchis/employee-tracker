const mysql = require('mysql2');
const db = mysql.createConnection(
     {
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'employees_db'
     },
     //console.log(`Connected to the employee_db database.`)
);

   module.exports = db;