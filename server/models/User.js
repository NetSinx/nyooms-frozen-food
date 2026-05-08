import { pool } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
export class User {
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
  static async create(userData) {
    const id = uuidv4();
    const { email, password, name, role = 'customer' } = userData;
    await pool.execute(
      'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
      [id, email, password, name, role]
    );
    return { id, email, name, role };
  }
  static async updateProfile(id, name) {
    await pool.execute(
      'UPDATE users SET name = ? WHERE id = ?',
      [name, id]
    );
  }
}