const jwt = require('jsonwebtoken');
// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.student = decodedToken; // Attach the decoded student information to the request object
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid access token' });
    }
    next();
}

module.exports = { authenticateToken };