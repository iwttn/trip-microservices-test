import { Router } from 'express';
import TripRoutes from './trips/trip.route'

const router = Router();

router.use('/trips', TripRoutes)

export default router;