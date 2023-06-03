import Router from 'express';
import courseController from '../controllers/courseController.js'
import authCheck from '../utils/authCheck.js';
import checkAdmin from '../utils/adminCheck.js';

const router = Router();

router.post('/create', authCheck, checkAdmin, courseController.createCourse);
router.post('/get-courses', authCheck, courseController.getCourses);

export default router;