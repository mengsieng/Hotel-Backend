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
        } else {
            const data = await Room.query().insert({ number, room_type_id, room_status_id: 1 });
            res.json(data);
        }
    } catch (e) {
        next(e);
    }
});

router.get('/listAll', async (req, res, next) => {
    const room_type_id = req.query.room_type_id;
    const room_status_id = req.query.room_status_id;
    console.log(room_type_id);
    try {
        var data;
        if (!room_type_id && !room_status_id) {
            data = await Room.query()
                .withGraphJoined('[roomType,status]');
        } else if (!room_type_id) {
            data = await Room.query()
                .withGraphJoined('[roomType,status]')
                .where('room_status_id', '=', room_status_id);
        } else if (!room_status_id) {
            data = await Room.query()
                .withGraphJoined('[roomType,status]')
                .where('room_type_id', '=', room_type_id);
        } else {
            data = await Room.query()
                .withGraphJoined('[roomType,status]')
                .where('room_type_id', '=', room_type_id)
                .where('room_status_id', '=', room_status_id);
        }
        res.json({ data })
    } catch (e) {
        next(e);
    }
});

router.delete('/delete', async (req, res, next) => {
    const id = req.query.id;
    try {
        const data = await Room.query().deleteById(id);
        if (data === 1) {
            res.json({ message: 'Delete sucessfully' })
        } else {
            res.json({ message: 'Not Found' })
        }
    } catch (e) {
        next(e);
    }
});

router.patch('/update', async (req, res, next) => {
    const id = req.query.id;
    const { number, room_type_id } = req.body;
    try {
        const found = await Room.query().findById(id).first();
        if (!found) {
            res.status(200).json({ message: 'Not Found', statusCode: 3 });
        } else {
            await schema.validate(req.body, {
                abortEarly: false
            });
            const existed = await Room.query()
                .where('room.id', '!=', found.id)
                .where('room.number', number).first();

            if (existed) {
                res.json({ massage: 'This number already exisiting', statusCode: 2 });
            } else {
                const data = await Room.query().upsertGraph({ id, number, room_type_id });
                res.json({ data });
            }
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;