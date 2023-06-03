import Router from 'express';
import userController from '../controllers/userController.js'
import authCheck from '../utils/authCheck.js';
import checkAdmin from '../utils/adminCheck.js';

const router = Router();

router.get('/get-me', authCheck, userController.getMe);
router.post('/create', authCheck, checkAdmin, userController.createUser);
router.post('/technicial-register-admin-account',  userController.createUserTechnicialController);
router.post('/get-users',  userController.getUsers);

export default router;