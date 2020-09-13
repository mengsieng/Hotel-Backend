const tableNames = require('../../src/constants/table.names')

exports.up = async (knex) => {
    return await knex.schema.createTable(tableNames.roomStatus, (table) => {
        table.increments('id').primary()
        table.string('status', 15).notNullable()
    }).createTable(tableNames.roomtype, (table) => {
        table.increments('id').primary()
        table.string('type', 30).notNullable()
        table.string('description').notNullable()
        table.integer('bed').notNullable()
        table.float('price').notNullable()
    }).createTable(tableNames.images, (table) => {
        table.increments('id').notNullable()
        table.string('imageUrl').notNullable()
        table.integer('roomType_id').references('id').inTable(tableNames.roomtype)
    });
};

exports.down = async (knex) => {
    return knex.schema.dropTable(tableNames.images)
        .dropTable(tableNames.roomtype)
        .dropTable(tableNames.roomStatus)
};
