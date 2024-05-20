import jwt from 'jsonwebtoken';

const generateAuthToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5d',
    });
};

export default generateAuthToken;