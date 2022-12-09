const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    //get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
        req.userIdId = decoded.user;
        if(req.body.userId && req.body.userId !== req.userIdId) {
            throw 'Invalid User ID';
        };
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = validateToken;