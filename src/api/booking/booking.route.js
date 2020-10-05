const router = require('express').Router();
const yub = require('yup')

const Booking = require('./booking.model');
const { Room } = require('../room/room.model');

let schema = yub.object().shape({
    room_id: yub.number().required(),
    checkin_date: yub.string().required(),
})

router.post('/createBooking', async (req, res, next) => {
    let booking_date = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '').split(' ', 1)[0];
    let dateTime = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
    const { room_id, checkin_date } = req.body;
    let booking_status_id = 1;
    const user_id = req.decoded.id;
    try {
        await schema.validate(req.body, {
            abortEarly: false
        });
        const room = await Room.query()
            .withGraphJoined('status').where('room.id', '=', room_id).first();
        if (room.status.id != 1) {
            res.status(200).json({ message: 'This room is not avaliable', statusCode: 2, });
        }
        await Room.query().patch({ room_status_id: 2 })
            .where('room.id', '=', room_id);
        data = await Booking.query()
            .insert({ booking_date, room_id, booking_status_id, user_id, checkin_date });
        res.send({ data });
    } catch (e) {
        next(e);
    }
});

router.get('/listAllBooking', async (req, res, next) => {
    const user_id = req.decoded.id;
    const { max, offset } = req.query;
    try {
        const data = await Booking.query()
            .withGraphJoined('[status,room.[roomType,status]]')
            .where({ user_id }).limit(max).offset((max) * offset);
        res.json({ data });
    } catch (e) {
        next(e);
    }
});

module.exports = router;