import Router from 'express';
import authController from '../controllers/authController.js'
import authCheck from '../utils/authCheck.js';

const router = Router();

router.post('/login', authController.login);
router.post('/logout', authCheck, authController.logout);

export default router;