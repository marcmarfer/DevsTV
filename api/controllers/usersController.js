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

const addUser = (req, res, next) => {
  connection.query('INSERT INTO users SET ?', req.body, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser
};
