INSERT INTO department (name)
VALUES ("Sales Department"),
       ("Accounting Department"),
       ("Customer Service Department"),
       ("IT Department");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 20000.00, 1),
       ("Inside Sales", 15000.00, 1),
       ("Outside Sales", 18000.00, 1),
       ("Sales Intern", 5000.00, 1),
       ("Accounting Manager", 18000.00, 2),
       ("Accountant", 15000.00, 2),
       ("Customer Service Manager", 25000.00, 3),
       ("Customer Service", 14000.00, 3),
       ("IT Manager", 50000.00, 4),
       ("IT", 30000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Smo", 1, null),
       ("Ed", "Lasso", 2, 1),
       ("Susie", "Q", 3, 1),
       ("Chad", "Ochocinco", 4, 1),
       ("Bob", "Blob", 5, null),
       ("Karen", "Johnson", 6, 5),
       ("Kelly", "Dickerson", 7, null),
       ("James", "Patrick", 8, 7),
       ("Matt", "Bada", 9, null),
       ("Jack", "Bing", 10, 9);

