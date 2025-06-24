import { pool } from './database.js';
import bcrypt from 'bcryptjs';

const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');

    // Create categories table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id VARCHAR(36),
        image TEXT,
        stock INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);

    // Create users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        shipping_address TEXT,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create order_items table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id VARCHAR(36) PRIMARY KEY,
        order_id VARCHAR(36) NOT NULL,
        product_id VARCHAR(36) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Insert default admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await pool.execute(`
      INSERT IGNORE INTO users (id, email, password, name, role)
      VALUES ('1', 'admin@gmail.com', ?, 'Administrator', 'admin')
    `, [adminPassword]);

    // Insert default categories
    await pool.execute(`
      INSERT IGNORE INTO categories (id, name, description)
      VALUES 
        ('1', 'Kebab', 'Variasi kebab yang lezat'),
        ('2', 'Frozen Food', 'Frozen food yang premium')
    `);

    // Insert default products
    const products = [
      ['1', 'Kebab (Kebab Pisang Coklat / Kebab Pisang Coklat Keju / Kebab Pisang Lotus / Kebab Beef)', 'Kebab dengan variasi isian, bisa dengan pisang coklat, pisang coklat keju, ataupun kebab pisang lotus', 20000, '1', '/assets/images/kebab.jpg', 50],
      ['2', 'Sosis Jumbo Isi 5 pcs', 'Sosis dengan ukuran jumbo isi 5 pcs', 20000, '2', '/assets/images/sosis.jpg', 30],
      ['3', 'Nugget Ayam 500gr', 'Nugget ayam crispy, siap untuk digoreng', 30000, '2', '/assets/images/bartoz chicken nuget.jpg', 100],
      ['4', 'Ayam Fillet 1kg', 'Daging ayam fillet 1kg', 50000, '2', '/assets/images/ayam fillet.jpg', 75],
      ['5', 'Ayam Utuh Frozen', 'Ayam utuh broiler beku', 40000, '2', '/assets/images/ayam frozen.jpg', 45],
      ['6', 'Patty (Sapi / Ayam) 50gr 10 pcs', 'Patty untuk burger dengan daging sapi atau ayam isi 10 pcs', 35000, '2', '/assets/images/patty.jpg', 24],
      ['7', 'Otak Otak Ikan 500gr 25 pcs', 'Patty untuk burger dengan daging sapi atau ayam isi 10 pcs', 30000, '2', '/assets/images/otak-otak ikan.jpg', 30],
      ['8', 'Bakso Warisan 600gr', 'Patty untuk burger dengan daging sapi atau ayam isi 10 pcs', 32000, '2', '/assets/images/Bakso warisan.jpg', 24],
    ];

    for (const product of products) {
      await pool.execute(`
        INSERT IGNORE INTO products (id, name, description, price, category_id, image, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, product);
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export { initializeDatabase };