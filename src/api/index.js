const router = require('express').Router();
const room = require('./room/room.route');
const roomType = require('./room_type/room.type.route');
const auth = require('./auth/auth.route');
const booking = require('./booking/booking.route');

const jwtChecker = require('../util/bearer.token.checker')

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome braber'
    });
})

router.use('/auth', auth);
router.use('/roomType', jwtChecker.checkToken, roomType);
router.use('/room', jwtChecker.checkToken, room);
router.use('/booking', jwtChecker.checkToken, booking);

module.exports = router;