import jwt from 'jsonwebtoken'
import User from '../models/User.ts'
import dotenv from 'dotenv';

dotenv.config();

export const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access token missing' });
        }
        
        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.error("FATAL ERROR: ACCESS_TOKEN_SECRET is not defined in .env");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decodedUser) => {
            if (err) {
                console.error(err);
                return res.status(403).json({ message: 'Access token invalid or expired' });
            }
            const user = await User.findById(decodedUser.userId).select('-hashedPassword');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        })
    } catch (error) {
        console.error('Error when authenticating JWT in authMiddleware', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}