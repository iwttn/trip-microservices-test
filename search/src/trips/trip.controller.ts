import { Request, Response } from 'express';
import tripService from './trip.service';
import { Trip } from './trip';

async function getAllTrips(_ : any, res : Response) {
    try {
        const response  = await tripService.getAllTrips();
        return res.status(200).json({ "status" : 200, "data" : response });
    } catch (err : any) {
        return res.status(500).json({ "status" : 500, "message" : err.message })
    }
}

async function getTripByPreference(req : Request, res : Response) {
    try {
        const trip = new Trip(req.query.origin, req.query.destiny);
        const response  = await tripService.getTripByPreference(trip);

        if(response.length <= 0) return res.status(200).json({ "status" : 200, "message" : "No se encontraron viajes." });

        return res.status(200).json({ "status" : 200, "data" : response });
    } catch (err : any) {
        return res.status(500).json({ "status" : 500, "message" : err.message })
    }
}

export default {
    getAllTrips,
    getTripByPreference
}