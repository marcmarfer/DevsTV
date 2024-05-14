const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'devs_tv'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
