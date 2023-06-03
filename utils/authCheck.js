import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { Token } from '../models/token.js';
import dotenv from 'dotenv';

dotenv.config();

const authCheck = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        if(!accessToken) {
            return res.status(404).json({message: 'Пользователь не авторизован'})
        };

        const { id } = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
        
        const user = await User.findOne({where: { id }});

        if(!user){
            return res.status(404).json({message: 'Пользователя не существует'})
        };

        const token = await Token.findOne({where: { UserId: user.dataValues.id }});

        if(!token){
            return res.status(404).json({message: 'Пользователь не авторизован'})
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(404).json({message: 'Пользователь не авторизован'});
    }
};

export default authCheck;