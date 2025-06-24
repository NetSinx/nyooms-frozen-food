import { pool } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class Product {
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      categoryId: row.category_id,
      image: row.image,
      stock: row.stock,
      createdAt: row.created_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name
      } : null
    }));
  }

  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      categoryId: row.category_id,
      image: row.image,
      stock: row.stock,
      createdAt: row.created_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name
      } : null
    };
  }

  static async create(productData) {
    const id = uuidv4();
    const { name, description, price, categoryId, image, stock } = productData;
    
    await pool.execute(
      'INSERT INTO products (id, name, description, price, category_id, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, description, price, categoryId, image, stock]
    );
    
    return this.findById(id);
  }

  static async update(id, productData) {
    const { name, description, price, categoryId, image, stock } = productData;
    
    await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image = ?, stock = ? WHERE id = ?',
      [name, description, price, categoryId, image, stock, id]
    );
    
    return this.findById(id);
  }

  static async delete(id) {
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  static async updateStock(id, quantity) {
    await pool.execute(
      'UPDATE products SET stock = stock - ? WHERE id = ?',
      [quantity, id]
    );
  }
}