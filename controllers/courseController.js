import { Course, StudentCourse } from "../models/course.js";
import { User } from "../models/user.js";

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
            const { role, id } = req.body;

            if(role === 'admin'){
                const courses = await Course.findAll();
                res.json(courses)
            }else{
                const courses = await Course.findAll({where: { status: 'Не начат' }});
                const studentCourses = await StudentCourse.findAll({ where: { UserId: id }, include: [{model: User}, {model: Course}] })

                if(id){
                    const visibleCourses = [];

                    courses.forEach((course) => {
                        if(!studentCourses.find((el) => el.CourseId === course.id && el.UserId === id)){
                            visibleCourses.push(course)
                        }
                    })

                    return res.json(visibleCourses)

                }
                
                res.json(courses)
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Не удалось получить данные о курсах'})
        }
    };

    async getMyCourses (req, res) {
        try {
            const { id } = req.body;

            const courses = await StudentCourse.findAll({ where: { UserId: id }, include: [{model: User}, {model: Course}] });

            res.json(courses);
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Не удалось получить данные о курсах'})
        }
    };

    async getCourse (req, res) {
        try {
            const { id } = req.body;

            const course = await Course.findOne({ where: { id } });

            res.json(course)
        } catch (error) {
            console.log(error)
            res.status(404).json({message: 'Не удалось получить данные о курсе'})
        }
    };

    async editCourse (req, res) {
        try {
            const { ...courseData } = req.body;

            const candidate = await Course.findOne({where: { id: courseData.id }});
    
            if(!candidate){
                return res.status(403).json({message: 'КУрса не существует'});
            }

            await Course.update({ ...courseData }, {where: { id: courseData.id }});
            
            res.json({message: 'Данные курса изменены'});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось изменить данные курса'})
        }
    };

    async createStudentCourse (req, res) {
        try {
            const { UserId, CourseId } = req.body;

            const candidate = await StudentCourse.findOne({where: { UserId, CourseId }});
    
            if(candidate){
                return res.status(403).json({message: 'Студент уже добавлен к этому курсу'});
            }

            const course = await Course.findOne({ where: { id: CourseId } })

            if(!course){
                return res.status(404).json({message: 'Курса не существует'});
            }

            if(course.dataValues.places - course.dataValues.closedPlaces === 0){
                res.json({message: 'Все места заняты'})
            }

            await StudentCourse.create({UserId, CourseId});
            await Course.update({ closedPlaces: course.dataValues.closedPlaces + 1 }, {where: { id: CourseId }});
            
            res.json({message: 'Студент добавлен к курсу'});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось добавить студента к курсу'})
        }
    };

    async removeStudentCourse (req, res) {
        try {
            const { UserId, CourseId } = req.body;

            const candidate = await StudentCourse.findOne({where: { UserId, CourseId }});
    
            if(!candidate){
                return res.status(403).json({message: 'Студента нет в этом курсе'});
            }

            const course = await Course.findOne({ where: { id: CourseId } })

            if(!course){
                return res.status(404).json({message: 'Курса не существует'});
            }

            await StudentCourse.destroy({where: { UserId, CourseId }});
            await Course.update({ closedPlaces: course.dataValues.closedPlaces - 1 }, {where: { id: CourseId }});
            
            res.json({message: 'Студент удалени из курса'});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось удалить студента из курса'})
        }
    };

    async getStudentCourse (req, res) {
        try {
            const { UserId, CourseId } = req.body;

            if(!UserId){
                const studentCourse = await StudentCourse.findAll({where: { CourseId }, include: [{model: User}, {model: Course}]});

                if(!studentCourse){
                    return res.json('undefined');
                }
                
                res.json(studentCourse);
            }else{
                const studentCourse = await StudentCourse.findAll({where: { UserId }, include: [{model: User}, {model: Course}]});

                if(!studentCourse){
                    return res.json('undefined');
                }
                
                res.json(studentCourse);
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось доабвить студента к курсу'})
        }
    };

    async removeCourse (req, res) {
        try {
            const { id } = req.body;

            const candidate = await Course.findOne({ where: { id } })

            if(!candidate){
                return res.status(404).json({message: 'Курса не существует'})
            }

            await StudentCourse.destroy({ where: { CourseId: id } });

            await Course.destroy({ where: { id } })

            res.json({message: 'Курс удален'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Не удалось удалить курс'})
        }
    };
}

export default new courseController();