//Library
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mung = require('express-mung')

require('dotenv').config();

const api = require('./api/index');
const middlewares = require('./middleware');
const connection = require('./db');

const app = express();

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

app.get('/', (req, res) => {
    res.json({
        message: 'Home',
    });
})

app.use(mung.json(
    function transform(body, req, res) {
        //adds mungMessage to every API response
        body.status = 1;
    }
));
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(connection);


module.exports = app;