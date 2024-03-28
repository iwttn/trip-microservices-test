import { Router} from 'express';
import PaymentRouter from './payment.route.js'

const router = Router();

router.use('/payment', PaymentRouter);

export default router;