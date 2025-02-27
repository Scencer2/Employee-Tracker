import pool from '../db/connection.js';

export const getAllRoles = async () => {
  const res = await pool.query('SELECT * FROM role');
  return res.rows;
};

export const addRole = async (title, salary, departmentId) => {
  const res = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
  return res.rows[0];
};
