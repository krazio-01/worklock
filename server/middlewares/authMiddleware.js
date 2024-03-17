import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    // Check if token is provided
    if (!token)
        return res.status(401).send({ Error: "Unauthorized User" });

    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json('Error: Unauthorized User');
    }
};

export { protect };
