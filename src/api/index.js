const router = require('express').Router();
const room = require('./room/room.route');
const roomType = require('./room_type/room.type.route');
const auth = require('./auth/auth.route')

const jwtChecker = require('../util/bearer.token.checker')

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome braber'
    });
})

router.use('/room', room);
router.use('/roomType', jwtChecker.checkToken, roomType)
router.use('/auth', auth)

module.exports = router;