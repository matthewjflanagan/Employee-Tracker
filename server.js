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

// function to initialize app
function init() {
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
}).then(function (answer) {
  switch (answer.choices) {
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
      db.end();
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

// View All Departments
function viewDepts() {
  // Query database
db.query("SELECT * FROM department;",
function(err, res){
if (err) throw err

console.log(cTable.getTable(res));
init()
});
}

// View Roles
function viewRoles() {
  // presented with the job title, role id, the department that role belongs to, and the salary for that role
    // Query database
    db.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;",
    function(err, res){
   if (err) throw err
  
   console.log(cTable.getTable(res));
   init()
    })
}

// View Employees
function viewEmployees() {
  // formatted table with employee info including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  db.query(`SELECT employee.id,
  employee.first_name,
  employee.last_name,
  role.title,
  department.name AS department,
  role.salary,
  CONCAT (manager.first_name, " ", manager.last_name) AS manager
 FROM employee JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
function(err, res){
if (err) throw err

console.log(cTable.getTable(res));
init()
});
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
  .then(function(answer){
    const newName= answer.name
    const sql = `INSERT INTO department (name) VALUES(?);`
    db.query(sql,newName,
    function(err,res){
      if (err) throw err
   console.log(cTable.getTable(res));
   viewDepts()
    }
    )
  });
}

// Add Role
function addRole() {
    // query the department table to get all the info
    const sqlDept=`SELECT * FROM department;`
    db.query(sqlDept, 
      function(err,data){
        if (err) throw err;
        // console.log(data)
        var myData = data.map(({name, id})=>({name: name, value: id})) 
  // console.log(myData)
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
      choices: myData,
      name: "department",
    },
  ])
  .then(function(response){
    const titleName=response.Title
    const salaryName= response.Salary
    const departmentName=response.someName
    const parameters = [titleName, salaryName, departmentName]
    const sql=`INSERT INTO role(title, salary, department_id)
    VALUES(?, ?, ?)`;
    db.query(sql, parameters, function(err){
      if (err) throw err;
      console.log('Added ' + titleName + " to Roles!"); 
    viewRoles()
    })
    })
    })
}

// Add Employee
function addEmployee() {
  //let's grab the roles from role table
  const roleSql=`SELECT role.id, role.title FROM role`;
  db.query(roleSql, function(err, data){
    if (err) throw err; 
    // console.log(data)
    const myRole =  data.map(({id, title})=>({name: title, value: id})) 
    // console.log(myRole)
   //lets grab the manager first and last name from the employee table
  const managerSql= `SELECT * FROM employee`;
  db.query(managerSql, function(err, res){
    if (err) throw err; 
    console.log(res)
    const myManager = res.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
    console.log(myManager)

    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
       
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        
      },
     {
      type: 'list',
      name: 'role',
      message: "What is the employee's role?",
      choices: myRole
     },
     {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's manager?",
      choices: myManager
     }

    ]).then(function(response){
   const firstName = response.firstName
   const lastName = response.lastName
   const empRole = response.role
   const empManager = response.manager
   const parameter= [firstName, lastName, empRole, empManager]
   const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
   VALUES (?, ?, ?, ?)`;
   db.query(sql, parameter, function(err, res){
    if (err) throw err;
    console.log("Employee has been added!")
  // console.log(res)
    viewEmployees()
  })
  })
  })
  })
}

// Update Employee Role
function updateEmployee() {
  // lets get employee from employee table
  const empSql= `SELECT * From employee`;
  db.query(empSql, (err,res)=>{
    if (err) throw err; 
    const empUpdate= res.map(({id, first_name, last_name})=>({name: first_name +" "+ last_name, value: id}));
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: empUpdate
      }
    ]).then(function (response){
      const empName = response.name;
      //lets grab the role of that employee we want to change it too
  const roleSql= `SELECT * FROM role`;
  db.query(roleSql, (err,res)=>{
    if (err) throw err;
    const roleUpdate = res.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: roleUpdate
      }
    ]).then (function(response1){
      const empRole = response1.role;
      const parameter = [empRole, empName]
      console.log (parameter)
  const updateSql = `UPDATE employee SET role_id= ? WHERE id = ?`;
  
  db.query(updateSql, parameter, (err, res) => {
    if (err) throw err;
  console.log("Employee has been updated!");
  
  viewEmployees();
  });
  })
  })
  }
  )
  })
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

