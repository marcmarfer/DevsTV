const connection = require('../db');
const { generateToken } = require('./authController'); // Importa la función generateToken del primer archivo

const getUserById = (req, res, next) => {
  connection.query('SELECT * FROM users WHERE id_user = ?', [req.params.id], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

const loginUser = (req, res, next) => {
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], (err, rows) => {
    if (err) return next(err);
    if (rows.length === 0) return res.sendStatus(401);

    const userId = rows[0].id_user;
    const token = generateToken(userId);
    res.json({ token });
  });
}

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

const getLastUserId = (req, res, next) => {
  connection.query('SELECT MAX(id_user) AS id_user FROM users', (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  loginUser,
  getLastUserId
};
