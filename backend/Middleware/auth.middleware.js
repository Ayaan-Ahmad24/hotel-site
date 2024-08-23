const jwt = require('jsonwebtoken');

// Middleware to verify token and authenticate user
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: "Access Denied, No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid Token" });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();  // If user is admin, proceed
    } else {
        res.status(403).json({ success: false, message: "Access Denied, Admins Only" });
    }
};

module.exports = { authenticateToken, isAdmin };
