import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'

// Secret key used to sign the JWT (use a secure method to store this key)
const JWT_SECRET = 'secretkey123';

const authenticateToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token. Please log in again.' });
        }
        req.user = decoded; // Attach decoded user information to the request object
        next();
    });
};

const authenticateTokenSub = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.status(401).json({
            message: "Access Denied. Please login to continue.",
        });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach the user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token. Please login again.",
        });
    }
};

const extractAdminStatus = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const isAdmin = decoded.isAdmin || false;
        console.log(decoded); // Extract isAdmin field from decoded token
        return isAdmin;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false; // Default to false if there's an error or isAdmin is not present
    }
};


export {authenticateToken,extractAdminStatus,authenticateTokenSub};
