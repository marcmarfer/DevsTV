const connection = require('../db');
const { generateToken } = require('./authController'); // Importa la función generateToken del primer archivo

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

    const userId = result.insertId;
    const token = generateToken(userId);
    res.json({ token });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser
};
