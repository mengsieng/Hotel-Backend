const router = require('express').Router();

const Booking = require('./booking.model');

router.get('/listAll', async (req, res, next) => {
    res.json({ message: 'Hello love' });
});

router.post('/createBooking', async (req, res, next) => {
    let date = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '').split(' ', 1)[0];
    let dateTime = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
    const { booking_date, } = req.body;
    try {
        res.send(date);
    } catch (e) {
        next(e);
    }
});

module.exports = router;