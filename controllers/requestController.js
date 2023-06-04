import { Request } from "../models/request.js";

class requestController {
    async createRequest (req, res) {
        try {
            const { UserId = null, CourseId = null, text, telephone, email } = req.body;

            await Request.create({ UserId, CourseId, text, telephone, email })

            res.json({message: 'Заявка отправлена'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось отправить заявку'})
        }


    };

    async getRequests (req, res) {
        try {
            const { role, id } = req.body;

            if(role === 'admin'){
                const requests = await Request.findAll();

                res.json(requests)
            }else{
                const requests = await Request.findAll({ where: { UserId: id } });

                res.json(requests)
            }
        } catch (error) {
            console.log(error) 
            res.status(500).json({message: 'Не удалось получит заявки'})
        }
    };
}


export default new requestController();