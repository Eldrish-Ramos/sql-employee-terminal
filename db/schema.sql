DROP DATABASE if exists employee_db;
CREATE DATABASE employee_db;
\c employee_db;

CREATE TABLE department {
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
};

CREATE TABLE role {
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    --Consi
    department_id INTEGER NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES department(id)
}

CREATE TABLE employee {
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT PULL,
    role_id INTEGER NOT NULL
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INTEGER
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
}

