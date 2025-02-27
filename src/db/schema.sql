DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS department CASCADE;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

