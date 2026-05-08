import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import { initializeDatabase } from './config/init-database.js';

dotenv.config();

const runMigration = async () => {
  console.log('Memulai inisialisasi database...');
  try {
    await testConnection();
    await initializeDatabase();
    console.log('Database berhasil diinisialisasi untuk Vercel!');
    process.exit(0);
  } catch (error) {
    console.error('Gagal menginisialisasi database:', error);
    process.exit(1);
  }
};

runMigration();