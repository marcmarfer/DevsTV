const connection = require('../db');

const getUserById = (req, res, next) => {
  connection.query('SELECT * FROM users WHERE id_user = ?', [req.params.id], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

const getAllUsers = (req, res, next) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

module.exports = {
  getAllUsers,
  getUserById
};
