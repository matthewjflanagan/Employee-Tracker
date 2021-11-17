const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO: Create a function to initialize app
function init() {
  console.log("hit")
  inquirer.prompt(  {
    type: 'list',
    message: 'Would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles', 
      'View All Employees', 
      'Add a Department', 
      'Add a Role', 
      'Add an Employee', 
      'Update an Employee Role', 
      'Quit'
    ],
    name: 'choices',
}).then(answer => {
  var choice = answer.choice;
  switch (choice) {
    case 'View All Departments':
      viewDepts();
      break;
    case 'View All Roles':
      viewRoles();
      break;
    case 'View All Employees':
      viewEmployees();
      break;
    case 'Add a Department':
      addDept();
      break;
    case 'Add a Role':
      addRole();
      break;
    case 'Add an Employee':
      addEmployee();
      break;
    case 'Update an Employee Role':
      updateEmployee();
      break;
    case 'Quit' :
      process.exit();
      default:
      break;
  }
});
}

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'codeiscool',
    database: 'employee'
  },
init()
);

// // Query database using COUNT() and GROUP BY
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//   console.log(results);
// });

// // Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//   console.log(results);
// });

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//   });
  
//   // Default response for any other request (Not Found)
//   app.use((req, res) => {
//     res.status(404).end();
//   });

// View All Departments
function viewDepts() {
  // presented with a formatted table showing department names and department ids
}

// View Roles
function viewRoles() {
  // presented with the job title, role id, the department that role belongs to, and the salary for that role
}

// View Employees
function viewEmployees() {
  // formatted table with employee info including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
}

// Add Department
function addDept() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter the name of the department',
      name: "name",
    },
  ])
  .then((answer) => {
    var choice = answer.choice;
    // add department to database
  });
}

// Add Role
function addRole() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter the name of the new role',
      name: "name",
    },
    {
      type: 'input',
      message: 'Please enter the salary of the new role',
      name: "salary",
    },
    {
      type: 'list',
      message: 'Please select which department the new role with be in',
      choices: [

      ],
      name: "department",
    },
  ])
  .then((answer) => {
    var choice = answer.choice;
    // add role to database
  });
}

// Add Employee
function addEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter the first name of the new employee',
      name: "first_name",
    },
    {
      type: 'input',
      message: 'Please enter the last name of the new employee',
      name: "last_name",
    },
    {
      type: 'list',
      message: 'Please select the role of the new employee',
      choices: [

      ],
      name: "role",
    },
    {
      type: 'list',
      message: 'Please select the manager of the new employee',
      choices: [
        
      ],
      name: "manager",
    },
  ])
  .then((answer) => {
    var choice = answer.choice;
    // add employee to database
  });
  }

// Update Employee Role
function updateEmployee() {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Which Employee Profile would you like to update?',
      choices: [
  
      ],
      name: "choice",
    },
  ])
  .then((answer) => {
    var choice = answer.choice;
    // provide roles that can be applied to employee
  });
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

