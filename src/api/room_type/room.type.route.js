const router = require('express').Router();
const yup = require('yup');

const { RoomType, Images } = require('./room.type.model');

let schema = yup.object().shape({
    type: yup.string().required(),
    price: yup.number().required(),
    bed: yup.number().required(),
    description: yup.string().required()
});

router.post('/create', async (req, res, next) => {
    const { type, price, bed, description, images } = req.body
    try {
        await schema.validate(req.body, {
            abortEarly: false,
        });
        const existRoomtype = await RoomType.query().findOne({ type }).first();
        if (existRoomtype) {
            res.json({ massage: 'This type already exisiting', statusCode: 2, });
        } else {
            const data = await RoomType.query().insertGraph({ type, price, bed, description, images });
            res.status(200).json({ data });
        }
    } catch (e) {
        next(e);
    }
});

router.get('/listAll', async (req, res, next) => {
    const { max, offset } = req.query
    try {
        console.log(max);
        let data;
        if (max && offset) {
            data = await RoomType.query().withGraphJoined('images')
                .limit(max)
                .offset((offset - 1) * max);
        } else {
            data = await RoomType.query().withGraphJoined('images');
        }
        res.status(200).json({ data });
    } catch (e) {
        next(e);
    }
});

router.patch('/update', async (req, res, next) => {
    const id = req.query.id;
    const { type, price, bed, description, images } = req.body;
    try {
        const found = await RoomType.query().findById(id).first();
        if (!found) {
            res.status(200).json({ message: 'Not Found', statusCode: 2, });
        } else {
            await schema.validate(req.body, {
                abortEarly: false,
            });
            const existed = await RoomType.query().select('type')
                .where('roomType.id', '!=', found.id,)
                .where('roomType.type', '=', type).first();
            if (existed) {
                res.json({ massage: 'This type already exisiting', statusCode: 2, });
            } else {
                const data = await RoomType.query().upsertGraph({ id, type, price, bed, description, images });
                res.status(200).json({ data });

            }
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/delete', async (req, res, next) => {
    const id = req.query.id;
    const roomType_id = id;
    try {
        const found = await RoomType.query().findById(id).first();
        if (!found) {
            res.status(200).json({ message: 'Not Found', statusCode: 3 });
        } else {
            const data = await RoomType.query().deleteById({ id });
            const images = await Images.query().delete().where({ roomType_id })
            res.status(200).json({ data, images });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;