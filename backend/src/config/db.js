import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,      // 127.0.0.1
  user: process.env.DB_USER,      // ems_user
  password: process.env.DB_PASSWORD, // Prabhumysql@#007
  database: process.env.DB_NAME,  // employee_management
  port: Number(process.env.DB_PORT) || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected!");
  }
});

export default db;
