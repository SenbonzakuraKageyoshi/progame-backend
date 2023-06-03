import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const checkAdmin = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        if(!accessToken) {
            return res.status(404).json({message: 'Пользователь не авторизован'})
        };

        const { id } = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
        
        const user = await User.findOne({where: { id }});

        if(user.dataValues.role === 'admin'){
            next();
        }else{
            return res.status(400).json({message: 'У вас нет прав для этого действия'})
        }

    } catch (error) {
        res.status(404).json({message: 'Пользователь не авторизован'});
    }
};

export default checkAdmin;