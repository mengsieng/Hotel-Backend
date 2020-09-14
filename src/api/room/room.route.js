const router = require('express').Router();
const yup = require('yup');

const { Room } = require('./room.model');

let schema = yup.object().shape({
    number: yup.string().required(),
    room_type_id: yup.number().required(),
});

router.post('/create', async (req, res, next) => {
    const { number, room_type_id } = req.body;
    try {
        await schema.validate(req.body, {
            abortEarly: false
        })
        const existRoom = await Room.query().findOne({ number }).first();
        if (existRoom) {
            res.json({ massage: 'This number already exisiting', statusCode: 2 });
        }
        const data = await Room.query().insert({ number, room_type_id, room_status_id: 1 });
        res.json(data);
    } catch (e) {
        next(e);
    }
});

module.exports = router;