const jwt = require('jsonwebtoken');
const secretKey = 'dakarreverseisrakad123';

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey);
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('Acceso denegado. Token no proporcionado.');
    }

    const jwtToken = token.substring(7);

    jwt.verify(jwtToken, secretKey, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido.');
        req.user = decoded;
        next();
    });
}

module.exports = { 
    generateToken, 
    verifyToken
};
