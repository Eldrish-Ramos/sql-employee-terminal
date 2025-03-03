-- Insert starter values into the departments table
INSERT INTO departments (name)
VALUES ('Engineering'), ('Marketing'), ('Networking');

--Insert starter roles into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1), ('Social Media Manager', 80000, 1), ('Network Engineer', 120000, 1);

--Insert starter Employees into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Johnson', 1, NULL), ('Bob', 'Smith', 2, NULL), ('Cindy', 'White', 3, NULL);

