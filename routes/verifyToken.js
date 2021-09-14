const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send("Acess denied");
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid auth token");
    }
}

module.exports = authenticateToken;