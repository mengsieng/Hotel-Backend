const tableNames = require('../../src/constants/table.names');
const { table } = require('../../src/db');

exports.up = async (knex) => {
    return await knex.schema.createTable(tableNames.roomStatus, (table) => {
        table.increments('id').primary();
        table.string('status', 15).notNullable();
    }).createTable(tableNames.roomtype, (table) => {
        table.increments('id').primary();
        table.string('type', 30).notNullable();
        table.string('description').notNullable();
        table.integer('bed').notNullable();
        table.float('price').notNullable();
    }).createTable(tableNames.images, (table) => {
        table.increments('id').notNullable();
        table.string('imageUrl').notNullable();
        table.integer('roomType_id').references('id').inTable(tableNames.roomtype);
    }).createTable(tableNames.room, (table) => {
        table.increments('id').notNullable();
        table.string('number', 10).notNullable();
        table.integer('room_status_id').references('id').inTable(tableNames.roomStatus);
        table.integer('room_type_id').references('id').inTable(tableNames.roomtype);
    }).createTable(tableNames.user, (table) => {
        table.increments('id').notNullable();
        table.string('username').notNullable();
        table.string('password', 127).notNullable();
        table.string('firstName', 50);
        table.string('lastName', 50);
        table.date('DOB');
        table.text('gender');
        table.string('phonenumber', 15);
        table.text('profileUrl');
    });
};

exports.down = async (knex) => {
    return knex.schema
        .dropTable(tableNames.user)
        .dropTable(tableNames.room)
        .dropTable(tableNames.images)
        .dropTable(tableNames.roomtype)
        .dropTable(tableNames.roomStatus);
};
