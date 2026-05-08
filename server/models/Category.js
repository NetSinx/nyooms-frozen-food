import { pool } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
export class Category {
  static async findAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM categories ORDER BY created_at DESC'
    );
    return rows;
  }
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );
    return rows[0];
  }
  static async create(categoryData) {
    const id = uuidv4();
    const { name, description } = categoryData;
    await pool.execute(
      'INSERT INTO categories (id, name, description) VALUES (?, ?, ?)',
      [id, name, description]
    );
    return { id, name, description, created_at: new Date() };
  }
  static async update(id, categoryData) {
    const { name, description } = categoryData;
    await pool.execute(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return this.findById(id);
  }
  static async delete(id) {
    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
  }
}