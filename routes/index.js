import Router from 'express';
import userRouter from './userRouter.js'
import authRouter from './authRouter.js'
import courseRouter from './courseRouter.js'

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/course', courseRouter);

export default router;