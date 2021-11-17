-- Queries

--   WHEN I choose to view all departments
--     SELECT *


--   WHEN I choose to view all roles
--   SELECT * FROM role JOIN department


--   WHEN I choose to view all employees (hard)
--   SELECT attributes FROM employee JOIN role JOIN department LEFT JOIN Employee
--       rename EMPLOYEE e1 and EMPLOYEE e2
--       select attributes e1.first_name, e1.last_name
--       get manager name from e2


--   WHEN I choose to add a department
--     INSERT

--   WHEN I choose to add a role (slightly hard)
--     SELECT all the departments
--       whichever dept you select from list, grab the ID
--       INSERT INTO ROLE title, salary, dept_id


--   WHEN I choose to add an employee
--     SELECT all the roles
--       get role_id
--     SELECT all the employees
--       get id of employee you want to be manager
--     INSERT INTO employee first, last, role_id, manager_id


--   WHEN I choose to update an employee role
--     SELECT all the employees
--       pick which id you're going to update
--     SELECT all roles
--       pick which role_id you're going to update

--     UPDATE query