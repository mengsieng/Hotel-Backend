const tableNames = require('../../src/constants/table.names');

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
        table.integer('room_status_id').references('id').inTable(tableNames.roomStatus).notNullable();
        table.integer('room_type_id').references('id').inTable(tableNames.roomtype).notNullable();
    }).createTable(tableNames.user, (table) => {
        table.increments('id').notNullable();
        table.string('username').notNullable();
        table.string('password', 127).notNullable();
        table.string('firstName', 50).notNullable();
        table.string('lastName', 50).notNullable();
        table.date('DOB').notNullable();
        table.text('gender').notNullable();
        table.string('phonenumber', 15).notNullable();
        table.text('profileUrl');
    }).createTable(tableNames.bookingStatus, (table) => {
        table.increments('id').notNullable();
        table.string('status').notNullable();
    }).createTable(tableNames.booking, (table) => {
        table.increments('id').notNullable();
        table.date('booking_date').notNullable();
        table.timestamp('checkin_date');
        table.timestamp('checkout_date');
        table.integer('booking_status_id').references('id').inTable(tableNames.bookingStatus);
        table.integer('room_id').references('id').inTable(tableNames.room);
    });
};

exports.down = async (knex) => {
    return knex.schema
        .dropTable(tableNames.booking)
        .dropTable(tableNames.bookingStatus)
        .dropTable(tableNames.user)
        .dropTable(tableNames.room)
        .dropTable(tableNames.images)
        .dropTable(tableNames.roomtype)
        .dropTable(tableNames.roomStatus);
};
