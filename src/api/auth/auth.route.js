const router = require('express').Router();
const yup = require('yup');
const bcrypt = require('bcrypt')

const User = require('./auth.model');
const sign = require('../../lib/jwt')
const jwtChecker = require('../../util/bearer.token.checker')

let schema = yup.object().shape({
    password: yup
        .string()
        .min(8)
        .max(200)
        .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
        .matches(/[A-Z]/, 'password must contain an uppercase letter')
        .matches(/[a-z]/, 'password must contain a lowercase letter')
        .matches(/[0-9]/, 'password must contain a number')
        .required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    DOB: yup.date(),
    gender: yup.string().required(),
    phonenumber: yup.string().min(9).max(20),
    username: yup.string().required(),
});

router.post('/signUp', async (req, res, next) => {
    const { firstName, lastName, password, DOB, gender, phonenumber, username } = req.body;
    try {
        await schema.validate(req.body, {
            abortEarly: false
        })
        const existUser = await User.query().findOne({ username }).first();
        if (existUser) {
            res.json({ massage: 'This username already exisiting' });
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            data = await User.query()
                .insert({ firstName, lastName, DOB, gender, phonenumber, username, password: hashPassword });
            const payload = {
                id: data.id,
                username: data.username
            };
            delete data.password;
            const token = await sign.sign(payload);
            res.json({ token, data });
        }
    } catch (e) {
        next(e);
    }
});

router.post('/signIn', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const found = await User.query().findOne({ username }).first();
        console.log(found);
        if (found === undefined) {
            res.status(200).json({ massage: 'Wrong username or password' });
        }
        const validatePassword = await bcrypt.compare(password, found.password);
        if (!validatePassword) {
            res.json({ massage: 'Wrong username or password' });
        }
        const payload = {
            id: found.id,
            username: found.username
        };
        delete found.password;
        const token = await sign.sign(payload);
        res.json({ token, data: found });
    } catch (e) {
        next(e);
    }
});

router.get('/getUserProfile', jwtChecker.checkToken, async (req, res, next) => {
    const id = req.decoded.id;
    try {
        const data = await User.query().findById(id).first();
        delete data.password;
        res.json({ data })
    } catch (e) {
        next(e);
    }
});

router.patch('/update', jwtChecker.checkToken, async (req, res, next) => {
    const id = req.decoded.id;
    const { firstName, lastName, password, DOB, gender, phonenumber, username } = req.body;
    try {
        const data = await User.query()
            .patchAndFetchById(id, { firstName, lastName, password, DOB, gender, phonenumber, username });
        res.json({ data });
    } catch (e) {
        next(e);
    }
});

module.exports = router;