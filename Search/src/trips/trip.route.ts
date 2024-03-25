import { Router } from 'express';
import tripController from './trip.controller'

const router = Router();

router
    .route('/')
    .get(tripController.getAllTrips)

router
    .route('/bypreference')
    .get(tripController.getTripByPreference)

export default router;