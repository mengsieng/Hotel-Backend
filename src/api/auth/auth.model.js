const { Model } = require('objection')
const tableNames = require('../../constants/table.names')

class User extends Model {
    static get tableName() {
        return tableNames.user;
    }
    static get idColumn() {
        return 'id';
    }
}

module.exports = User;