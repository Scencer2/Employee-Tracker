import pool from '../db/connection.js';

export const getAllEmployees = async () => {
  const res = await pool.query(
  `SELECT 
      e.id,
      e.first_name,
      e.last_name,
      r.title AS role,
      d.name AS department,
      r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY e.id;`
  );
  return res.rows;
  
};

export const addEmployee = async (firstName, lastName, roleId, managerId) => {
  const res = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
  return res.rows[0];
};


