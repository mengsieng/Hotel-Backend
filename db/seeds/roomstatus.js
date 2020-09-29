const tableName = require('../../src/constants/table.names')

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return await knex(tableName.roomStatus).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName.roomStatus).insert([
        { id: 1, status: 'FREE' },
        { id: 2, status: 'BOOKING' },
      ]);
    });
};
