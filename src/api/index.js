const router = require('express').Router()
const room = require('./room/room.route')

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome braber'
    })
})

router.use('/room', room)

module.exports = router