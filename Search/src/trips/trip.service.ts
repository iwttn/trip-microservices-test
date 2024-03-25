import { RowDataPacket } from 'mysql2';
import { conn } from '../../config/db';
import { Trip } from './trip'

async function getAllTrips() {
    try {
        const response = await conn.query<RowDataPacket[]>('CALL get_available_trips();');
        return response[0][0];
    } catch (err) {
        throw new Error("Error in internal server");
    }
};

async function getTripByPreference(paramsTrip : Trip) {
    try {
        const response = await conn.query<RowDataPacket[]>('CALL get_trip_by_preference(?, ?);', Object.values(paramsTrip));
        return response[0][0];
    } catch (err) {
        throw new Error("Error in internal server");
    }
};

export default {
    getAllTrips,
    getTripByPreference
}