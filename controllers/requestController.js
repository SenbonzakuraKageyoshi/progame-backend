import { Request } from "../models/request.js";

class requestController {
    async createRequest (req, res) {
        try {
            const { UserId = null, CourseId = null, text, telephone, email, authorName } = req.body;
            console.log(req.body)
            await Request.create({ UserId, CourseId, text, telephone, email, authorName })

            res.json({message: 'Заявка отправлена'})
        } catch (error) {
            // console.log(error)
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
    
    async editRequestStatus (req, res) {
        try {
            const { id, status } = req.body;

            const candidate = Request.findOne({ where: { id } });

            if(!candidate){
                return res.status(404).json({message: 'Заявки не существует'});
            }

            if(candidate && candidate.status === 'Отклонена' || candidate.status === 'Принята'){
                return res.status(403).json({message: 'Статус заявки уже указан'});
            }
            
            await Request.update({ status }, {where: { id }});
            
            res.json({message: 'Статус заявки изменен'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось изменить статус заявки'})
        }
    };
    
    async removeRequest (req, res) {
        try {
            const { id } = req.body;

            const candidate = Request.findOne({ where: { id } });

            if(!candidate){
                return res.status(404).json({message: 'Заявки не существует'});
            }

            await Request.destroy({ where: { id } });

            res.json({message: 'Заявка удалена'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось удалить заявку'})
        }
    }
}


export default new requestController();