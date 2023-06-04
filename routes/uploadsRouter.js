import Router from 'express';
import uploadsController from '../controllers/uploadsController.js'
import authCheck from '../utils/authCheck.js';
import checkAdmin from '../utils/adminCheck.js';

const router = Router();

router.post('/shedule-upload', authCheck, checkAdmin, uploadsController.sheduleUpload);

export default router;