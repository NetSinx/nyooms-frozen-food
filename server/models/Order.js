import { pool } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export class Order {
  static async create(orderData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const orderId = uuidv4();
      const { userId, items, totalAmount, shippingAddress } = orderData;
      
      // Create order
      await connection.execute(
        'INSERT INTO orders (id, user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?, ?)',
        [orderId, userId, totalAmount, shippingAddress, 'pending']
      );
      
      // Create order items and update product stock
      for (const item of items) {
        const itemId = uuidv4();
        
        // Insert order item
        await connection.execute(
          'INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
          [itemId, orderId, item.productId, item.quantity, item.price]
        );
        
        // Update product stock
        await connection.execute(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.productId]
        );
      }
      
      await connection.commit();
      return this.findById(orderId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const [orderRows] = await pool.execute(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    
    if (orderRows.length === 0) return null;
    
    const order = orderRows[0];
    
    // Get order items with product details
    const [itemRows] = await pool.execute(`
      SELECT oi.*, p.name as product_name, p.image as product_image
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id]);
    
    return {
      id: order.id,
      userId: order.user_id,
      totalAmount: parseFloat(order.total_amount),
      shippingAddress: order.shipping_address,
      status: order.status,
      createdAt: order.created_at,
      items: itemRows.map(item => ({
        productId: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: {
          name: item.product_name,
          image: item.product_image
        }
      }))
    };
  }

  static async findByUserId(userId) {
    const [orderRows] = await pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    
    const orders = [];
    
    for (const order of orderRows) {
      const [itemRows] = await pool.execute(`
        SELECT oi.*, p.name as product_name, p.image as product_image
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      
      orders.push({
        id: order.id,
        userId: order.user_id,
        totalAmount: parseFloat(order.total_amount),
        shippingAddress: order.shipping_address,
        status: order.status,
        createdAt: order.created_at,
        items: itemRows.map(item => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: parseFloat(item.price),
          product: {
            name: item.product_name,
            image: item.product_image
          }
        }))
      });
    }
    
    return orders;
  }

  static async findAll() {
    const [orderRows] = await pool.execute(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    
    const orders = [];
    
    for (const order of orderRows) {
      const [itemRows] = await pool.execute(`
        SELECT oi.*, p.name as product_name, p.image as product_image
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      
      orders.push({
        id: order.id,
        userId: order.user_id,
        totalAmount: parseFloat(order.total_amount),
        shippingAddress: order.shipping_address,
        status: order.status,
        createdAt: order.created_at,
        items: itemRows.map(item => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: parseFloat(item.price),
          product: {
            name: item.product_name,
            image: item.product_image
          }
        }))
      });
    }
    
    return orders;
  }

  static async updateStatus(id, status) {
    await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    
    return this.findById(id);
  }

  static async getStats() {
    const [categoryCount] = await pool.execute('SELECT COUNT(*) as count FROM categories');
    const [productCount] = await pool.execute('SELECT COUNT(*) as count FROM products');
    const [orderCount] = await pool.execute('SELECT COUNT(*) as count FROM orders');
    const [revenueSum] = await pool.execute('SELECT SUM(total_amount) as total FROM orders WHERE status = "completed"');
    
    return {
      totalCategories: categoryCount[0].count,
      totalProducts: productCount[0].count,
      totalOrders: orderCount[0].count,
      totalRevenue: parseFloat(revenueSum[0].total) || 0
    };
  }
}