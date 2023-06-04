import Router from 'express';
import userRouter from './userRouter.js'
import authRouter from './authRouter.js'
import courseRouter from './courseRouter.js'
import requestRouter from './requestRouter.js'
import uploadsRouter from './uploadsRouter.js'

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/course', courseRouter);
router.use('/request', requestRouter);
router.use('/uploads', uploadsRouter);

export default router;