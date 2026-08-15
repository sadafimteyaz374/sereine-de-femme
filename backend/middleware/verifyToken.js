const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Apna secret key yahan dalein
        req.user = decoded; // Isse req.user mil jayega controller ko
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid token" });
    }
};

module.exports = verifyToken;