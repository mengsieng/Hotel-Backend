const { Model } = require('objection');
const knex = require('knex');

const knexConfig = require('../knexfile');

// const enviroment = process.env.NODE_ENV || 'development';
const enviroment = 'development';
// const connectionConfig = knexConfig[enviroment];

const connection = knex(
    {
        client: 'pg',
        connection: {
            port: '5432',
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        migrations: {
            directory: './db/migration'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
);

Model.knex(connection);

module.exports = connection;