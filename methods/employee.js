const db = require("../database");

class Employee {
   //   constructor(employee){
   //    this.employee = employee;
   //   }

     viewAllEmployees() {
     //Select employee.id,employee.first_name,employee.last_name,role.title,department.name AS 'Department',role.salary FROM employee, role, department;
      //Select employee.id,employee.first_name,employee.last_name,role.title,department.name AS 'Department',role.salary FROM employee, role, department WHERE role_id = employee.role_id AND role.id = employee.role_id;
      const sql = `SELECT employee.id, 
         employee.first_name, 
         employee.last_name, 
         role.title, 
      department.name AS 'department', 
         role.salary
      FROM employee, role, department 
      WHERE department.id = role.department_id 
      AND role.id = employee.role_id
      ORDER BY employee.id ASC`;

         return db.query(sql, async (err, response) => {
            
            if(err) throw err;
               console.table(response);
               return "success";
         });

     }
     addEmployee(role,fname,lname,emanager) {
      console.log("add employee");
      const sql = `INSERT INTO employee (employee.role_id,employee.first_name, employee.last_name, employee.manager_id)
      VALUES(?,?,?,?);`;
     }
     updateEmployeeRole(role_id){
      const sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
      db.query(sql, async (err, response) => {
         if(err) throw err;
         console.table(response);
      });
     }
     viewAllRoles(){
      const sql = `SELECT * FROM role`;
      db.query(sql, async (err, response) => {

         if(err) throw err;
         console.table(response);
       
        
      });
     }
     addRole(title,salary,department){
     
      const sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?);  `;
      db.query(sql, async (err, response) => {
         if(err) throw err;
         console.table(response);
      });
   }

     viewAllDepartments(){
      let sql = `SELECT name from department`;
         db.query(sql, async (err, response) => {
            if(err) throw err;
            console.table(response);
         });
     };
     addDepartment(department){
         let sql = `INSERT department(name)VALUES(?)`;
         db.query(sql, async (err, response) => {
            if(err) throw err;
            console.table(response);
         });
      };
     getAllDepartments(){
        let sql = `SELECT department.id,department.name FROM department;`;
        return db.query(sql, async (err, response) => {
            if(err) throw err;
            
            return console.log(response);;
         });
     }
     quit(){
        //process.exit();
        process.exit();
     }

     query(sql){
      return db.query(sql, async (err, response) => {
          
        return process.app.employeePrompt();
      });

     }
}
module.exports = Employee;