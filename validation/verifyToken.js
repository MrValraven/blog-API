const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.body.token;
    if(!token) {
        return res.status(401).send({message: "Acess denied"});
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({message: "Invalid auth token"});
    }
}

module.exports = authenticateToken;