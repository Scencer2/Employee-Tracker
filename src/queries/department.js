import pool from '../connection.js';

export const getAllDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

export const addDepartment = async (name) => {
  const res = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
  return res.rows[0];
};