import { Course } from "../models/course.js";

class courseController {
    async createCourse (req, res) {
        try {
            const { ...courseData } = req.body;

            const course = await Course.create(courseData);

            res.json({...course.dataValues});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Не удалось зарегистрировать курс, пожалуйста, попробуйте позже"});
        }
    }

    async getCourses (req, res) {
        try {
            const { role } = req.body;

            const courses = await Course.findAll();

            res.json(courses)
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Не удалось получить данные о пользователях'})
        }
    };
}

export default new courseController();