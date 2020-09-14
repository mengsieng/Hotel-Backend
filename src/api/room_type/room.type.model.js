const { Model } = require('objection')
const tableNames = require('../../constants/table.names')

class Images extends Model {
    static get tableName() {
        return tableNames.images;
    }
    static get idColumn() {
        return 'id';
    }
}

class RoomType extends Model {
    static get tableName() {
        return tableNames.roomtype;
    }
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        return {
            images: {
                relation: Model.HasManyRelation,
                modelClass: Images,
                join: {
                    from: 'roomType.id',
                    to: 'images.roomType_id'
                }
            }
        }
    }
}

module.exports = { RoomType, Images };