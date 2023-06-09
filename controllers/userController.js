import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from '../models/token.js';
import dotenv from 'dotenv';
import { Course, StudentCourse } from '../models/course.js';

dotenv.config();

class userController {
    async createUser (req, res) {
        try {
            const { ...userdata } = req.body;
    
            const candidate1 = await User.findOne({where: { email: userdata.email }});
            const candidate2 = await User.findOne({where: { telephone: userdata.telephone }});
    
            if(candidate1 || candidate2){
                return res.status(403).json({message: 'Пользователь с такими данными уже существует'});
            };
    
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(userdata.password, salt);
    
            const user = await User.create({...userdata, passwordHash: passwordHash, role: userdata.role});
            
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

            const findedToken = await Token.findOne({where: { accessToken }});

            if(!findedToken){
                return res.status(404).json({message: 'Пользователь не авторизаован'})
            }
    
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
            const { type } = req.query;
            console.log(req.query)
            const users = await User.findAll({where: { role: type }});

            res.json(users)
        } catch (error) {
            console.log(error)
            res.json({message: 'Не удалось получить данные о пользоватклях'})
        }
    };

    async getUser (req, res) {
        try {
            const { id } = req.query;

            const user = await User.findOne({where: { id }});

            res.json(user)
        } catch (error) {
            console.log(error);
            res.json({message: 'Не удалось получить данные о пользователе'})
        }
    };

    async editUser (req, res) {
        try {
            const { ...userdata } = req.body;

            const candidate1 = await User.findOne({where: { email: userdata.email }});
            const candidate2 = await User.findOne({where: { telephone: userdata.telephone }});
    
            if(candidate1 && candidate1.id !== userdata.id && candidate1.role === userdata.role){
                return res.status(403).json({message: 'Пользователь с такими данными уже существует'});
            }else if(candidate2 && candidate2.id !== userdata.id && candidate1.role === userdata.role){
                return res.status(403).json({message: 'Пользователь с такими данными уже существует'});
            }

            await User.update({ ...userdata }, {where: { id: userdata.id }});
            
            res.json({message: 'Данные пользователя изменены'});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось изменить данные о пользователе'})
        }
    };

    async removeUser (req, res) {
        try {
            const { id } = req.body;

            const candidate = User.findOne({ where: { id } });

            if(!candidate){
                return res.status(404).json({message: 'Пользователя не существует'})
            }
            
            const token = await Token.findOne({ where: { UserId: id } })

            if(token){
                await Token.destroy({ where: { UserId: id } })
            }

            const studentCourses = await StudentCourse.findAll({where: { UserId: id }});

            if(studentCourses){
                studentCourses.forEach(async (el) => {
                    const course = await Course.findOne({where: { id: el.dataValues.CourseId }})
                    await Course.update({ closedPlaces: course.dataValues.closedPlaces - 1 }, {where: { id: el.dataValues.CourseId }});
                })

                await StudentCourse.destroy({where: { UserId: id }});
            }
            
            await User.destroy({ where: { id } });

            res.json({message: 'Пользователь удален'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось удалить пользователя'})
        }
    };
}

export default new userController();