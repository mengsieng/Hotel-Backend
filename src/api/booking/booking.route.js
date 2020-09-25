const router = require('express').Router();

const Booking = require('./booking.model');
const { Room } = require('../room/room.model');

router.get('/listAll', async (req, res, next) => {
    res.json({ message: 'Hello love' });
});

router.post('/createBooking', async (req, res, next) => {
    let booking_date = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '').split(' ', 1)[0];
    let dateTime = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
    const { room_id } = req.body;
    let booking_status_id = 1;
    const user_id = req.decoded.id;
    try {
        const room = await Room.query()
            .withGraphJoined('status').where('room.id', '=', room_id).first();
        if (room.status.id != 1) {
            res.status(200).json({ message: 'This room is not avaliable', statusCode: 2, });
        }
        await Room.query().patch({ room_status_id: 2 })
            .where('room.id', '=', room_id);
        data = await Booking.query()
            .insert({ booking_date, room_id, booking_status_id, user_id });
        res.send({ data });
    } catch (e) {
        next(e);
    }
});

router.get('/listAllBooking', async (req, res, next) => {
    const user_id = req.decoded.id;
    try {
        const data = await Booking.query()
            .withGraphJoined('[status,room.[roomType,status]]')
            .where({ user_id });
        res.json({ data });
    } catch (e) {
        next(e);
    }
});

module.exports = router;