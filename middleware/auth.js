const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("No token provided");

    try {
        const decodedPayload = jwt.verify(token, 'jwtPrivateKey123');
        req.user = decodedPayload; //req.user._id
        next();
    } catch (err) {
        return res.status(400).send("Invalid token");
    }
}