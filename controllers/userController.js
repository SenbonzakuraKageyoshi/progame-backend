import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from '../models/token.js';
import dotenv from 'dotenv';

dotenv.config();

class userController {
    async createUser (req, res) {
        try {
            const { ...userdata } = req.body;
    
            const candidate = await User.findOne({where: { email: userdata.email, telephone: userdata.telephone }});
    
            if(candidate){
                return res.status(403).json({message: 'Пользователь с такими данными уже существует'});
            };
    
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(userdata.password, salt);
    
            const user = await User.create({...userdata, passwordHash: passwordHash, role});
            
            res.json({...user.dataValues});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Не удалось зарегистрировать аккаунт, пожалуйста, попробуйте позже"}); 
        }
    };

    async createUserTechnicialController (req, res) {
        try {
            const { ...userdata } = req.body;
    
            const candidate = await User.findOne({where: { email: userdata.email, telephone: userdata.telephone }});
    
            if(candidate){
                return res.status(403).json({message: 'Пользователь с такими данными уже существует'});
            };
    
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(userdata.password, salt);
    
            const user = await User.create({...userdata, passwordHash: passwordHash, role: 'admin'});
            
            res.json({...user.dataValues});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Не удалось зарегистрировать аккаунт, пожалуйста, попробуйте позже"}); 
        }
    };

    async getMe (req, res) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
    
            if(!accessToken) {
                return res.status(404).json({message: 'Пользователь не найден'})
            };
    
            const { id } = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
            
            const user = await User.findOne({where: { id }});
    
            if(!user){
                return res.status(404).json({message: 'Пользователь не найден'})
            };
    
            const token = await Token.findOne({where: { UserId: id}});
    
            if(!token){
                return res.status(404).json({message: 'Пользователь не авторизован'})
            }
    
            res.json({...user.dataValues, accessToken: token.dataValues.accessToken});
        } catch (error) {
            console.log(error)
            res.status(404).json({message: "Не удалось получить данные о пользователе, пожалуйста, попробуйте позже"}); 
        };
    };

    async getUsers (req, res) {
        try {
            const { type } = req.body;

            const users = await User.findAll({where: { role: type }});

            res.json(users)
        } catch (error) {
            console.log(error)
            res.json({message: 'Не удалось получить данные о пользоватклях'})
        }
    };
}

export default new userController();