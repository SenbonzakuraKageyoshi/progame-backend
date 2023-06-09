import Router from 'express';
import userController from '../controllers/userController.js'
import authCheck from '../utils/authCheck.js';
import checkAdmin from '../utils/adminCheck.js';

const router = Router();

router.get('/get-me', authCheck, userController.getMe);
router.post('/create', authCheck, checkAdmin, userController.createUser);
router.post('/technicial-register-admin-account', userController.createUserTechnicialController);
router.get('/get-users', authCheck, checkAdmin, userController.getUsers);
router.get('/get-user', authCheck, checkAdmin, userController.getUser);
router.post('/edit-user', authCheck, checkAdmin, userController.editUser);
router.post('/remove-user', authCheck, checkAdmin, userController.removeUser);

export default router;