const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
    message: 'Would you like to add another Team Member?',
    choices: ['view all departments', 'Intern', 'No, the team is complete'],
    name: 'choices',
}).then(answers => {
     console.log(answers);
     // fs.writeFile('ans')
    // writeToFile('PROFESSIONAL-README-GENERATOR.md', answers)
  })
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
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  