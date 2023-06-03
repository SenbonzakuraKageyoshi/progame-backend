import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (id) => {
    return jwt.sign({ id },  process.env.ACCESS_SECRET_KEY, {expiresIn: '15d'});
};