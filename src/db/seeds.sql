INSERT INTO department (name) VALUES
('Sales'),
('HR'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Salesperson', 60000, 1),
('HR Manager', 70000, 2),
('HR assistant', 45000, 2),
('Director of Marketing', 110000, 3),
('Marketing Analyst', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 2, 1),
('Kunal', 'Singh',4, 3),
('Malia','Brown', 6, NULL),
('Sarah', 'Lourd', 5, 6); 