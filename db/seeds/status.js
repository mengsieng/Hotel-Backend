const tableName = require('../../src/constants/table.names')

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return await knex(tableName.bookingStatus).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName.bookingStatus).insert([
        { status: 'BOOKING' },
        { status: 'IN' },
        { status: 'OUT' }
      ]);
    });
};
