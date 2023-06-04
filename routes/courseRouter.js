import Router from 'express';
import courseController from '../controllers/courseController.js'
import authCheck from '../utils/authCheck.js';
import checkAdmin from '../utils/adminCheck.js';

const router = Router();

router.post('/create', authCheck, checkAdmin, courseController.createCourse);
router.post('/get-courses', authCheck, courseController.getCourses);
router.post('/get-my-courses', authCheck, courseController.getMyCourses);
router.post('/get-course', authCheck, courseController.getCourse);
router.post('/edit-course', authCheck, checkAdmin, courseController.editCourse);
router.post('/add-student', authCheck, checkAdmin, courseController.createStudentCourse);
router.post('/remove-student', authCheck, checkAdmin, courseController.removeStudentCourse);
router.post('/get-student-course', authCheck, courseController.getStudentCourse);
router.post('/remove-course', authCheck, courseController.removeCourse);

export default router;