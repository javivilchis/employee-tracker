global.db =require('./database');
const inquirer = require('inquirer');
const Employee = require('./methods/employee');
var figlet = require('figlet');

const employee = new Employee();



figlet.text('Employee\nTracker.', {
     font: 'standard',
     horizontalLayout: 'default',
     verticalLayout: 'default',
     width: 60,
     whitespaceBreak: true
 }, function(err, data) {
     if (err) {
         console.log('Something went wrong...');
         console.dir(err);
         return;
     }
     console.log(data);
 });
 db.connect((error) => {
      if(error) throw error;
     employeePrompt();
 });

 const todoList = ["View All Employees","Add Employee","Update Employee Role","View All Roles", "Add Role","View All Departments", "Add Department","Quit", "View All Employees"];

const employeePrompt = () =>{ 
     inquirer
     .prompt([
          {
               name: "choices",
               type: "list",
               mesage: "What would you like to do?",
               choices: todoList,
          }
     ])
     .then((answers) => {
          //set a constant for the answers param
          const { choices } = answers;
          
          
          switch(choices){
               case 'View All Employees':
                    
                    employee.viewAllEmployees();
                    employeePrompt();
                    
                    break;
               case 'Add Employee':
                    employee.addEmployee();
                    employeePrompt();
                    break;
               case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
               case 'View All Roles':
                    employee.viewAllRoles();
                    break;
               case 'Add Role':
                    addRole();
                    break;
               case 'View All Departments':
                    employee.viewAllDepartments();
                    break;
               case 'Add Department':
                    addDepartment();
                    break;
               case 'Quit':
                    quit();
                    break;
          }
     
     })
     .catch((error) => {
          if (error.isTtyError) {
               // Prompt couldn't be rendered in the current environment
          } else {
               // Something else went wrong
          }
     });
};


const addRole = () =>{
     inquirer
     .prompt([
          {
               name: "title",
               type: "list",
               mesage: "what is the title for the role?",
               choices: [
                    "Designer",
                    "Sales Person",
                    "Sales Lead",
                    "Software Engineer", 
                    "Accountantant",
                    "Legal Team Lead", 
                    "Lawyer"
               ],
          },
          {
               name: "salary",
               type: "list",
               message : "Please Select Salary",
               choices: [
                    "65000","80000","120000","250000","190000"
               ],
          },
          {
               name: "department",
               type: "list",
               message: "please select the department",
               choices: ["Marketing","Sales", "Engineering","Finance", "Legal"],
          }
     ])
     .then((answers) => { 
          let title = answers.title;
          let salary = answers.salary;
          let dapartment = answers.department;
          switch(dapartment){
               case 1:     
                    dapartment = "Marketing";
                    break;
               case 2:
                    dapartment = "Sales";
               break;
               case 2:
                    dapartment = "Engineering";
               break;
               case 2:
                    dapartment = "Finance";
               break;
               case 2:
                    dapartment = "Legal";
               break;
          };
          employee.addRole(title,salary,department);
          employeePrompt();
     })
     .catch((error) => {
         console.log(error,"There was an error!")
     });
};
const updateEmployeeRole = () => {
     inquirer
     .prompt([
          {
               name: "employee",
               type: "list",
               choices: employee.getAllEmployees(),
          }
     ])
     .then((answers) => {
          console.log(answers.employee);
      })
     .catch((error) => {
          console.log(error,"There was an error!")
      });
};
const addDepartment = () => {
     inquirer
     .prompt([
          {
               name: "department",
               type: "input",
               mesage: "Enter your new deparment name.",
          },
     ])
     .then((answers) => {
          let department = answers.department;
          employee.addDepartment(department);
      })
     .catch((error) => {
          console.log(error,"There was an error!")
      });
};

