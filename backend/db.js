// db.js
const mysql = require('mysql2');

// Cloud SQL connection parameters
// Replace the placeholders with your Cloud SQL instance connection details
const connection = mysql.createConnection({
  host: process.env.DB_HOST || '34.133.123.255',  // Use Cloud SQL Proxy connection string or public IP
  user: process.env.DB_USER || 'mohan',
  password: process.env.DB_PASSWORD || 'gupta5678',
  database: process.env.DB_NAME || 'tt'
});

connection.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = connection;
