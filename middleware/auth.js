const config = require('config');
const jwt = require('jsonwebtoken');

// auth - функция промежуточной обработки
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token)
        return res.status(401).json('No token, authorizaton denied');

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        //  добавляет инфу о user из БД по токену, если такой юзер существует
        req.user = decoded;
        next();
    } catch (e) {
        res.status(403).json('Token is not valid');
    }
}

module.exports = auth;
