require('dotenv').config()

module.exports = {

  development: {
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

};
