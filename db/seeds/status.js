const tableName = require('../../src/constants/table.names')

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return await knex(tableName.bookingStatus).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName.bookingStatus).insert([
        { id: 1, status: 'BOOKING' },
        { id: 2, status: 'IN' },
        { id: 3, status: 'OUT' }
      ]);
    });
};
