import Router from 'express';
import requestController from '../controllers/requestController.js'
import authCheck from '../utils/authCheck.js';
import checkAdmin from '../utils/adminCheck.js';

const router = Router();

router.post('/create', requestController.createRequest);
router.post('/get-requests', authCheck, requestController.getRequests);
router.post('/edit-request', authCheck, checkAdmin, requestController.editRequestStatus);
router.post('/remove-request', authCheck, checkAdmin, requestController.removeRequest);

export default router;