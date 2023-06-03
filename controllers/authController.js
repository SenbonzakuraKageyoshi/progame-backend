import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Token } from '../models/token.js';
import { generateToken } from '../utils/generateToken.js';

class authController {
    async login (req, res) {
        try {
            const { email, telephone, password } = req.body;
    
            const user = await User.findOne({where: { email, telephone }});
    
            if(!user){
                return res.status(404).json({message: 'Неверный логин, телефон, или пароль'});
            };
    
            const isValidPass = await bcrypt.compare(password, user.dataValues.passwordHash);
    
            if(!isValidPass){
                return res.status(404).json({message: 'Неверный логин, телефон, или пароль'});
            };
    
            const accessToken = generateToken(String(user.dataValues.id));
            
            const token = await Token.findOne({where: {UserId: user.dataValues.id}});

            if(token){
                await Token.update({accessToken: accessToken}, {where: {UserId: user.dataValues.id}});

                return res.json({...user.dataValues, accessToken});
            }else{
                await Token.create({accessToken, UserId: user.dataValues.id});

                return res.json({...user.dataValues, accessToken});
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Не удалось авторизоваться"}); 
        };
    };
}

export default new authController()