INSERT INTO department (name)
VALUES ("Department Sales"),
       ("Department Accounting"),
       ("Department Customer Service"),
       ("Department Corporate");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 20000.00, 1),
       ("Sales", 10000.00, 1),
       ("SalesC", 15000.00, 1),
       ("SalesD", 5000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sales", "Guy", 1, null),
       ("Sales", "NewGuy", 2, 1),
       ("SalesC", "Veteran", 3, 1),
       ("SalesD", "Intern", 4, 1);

