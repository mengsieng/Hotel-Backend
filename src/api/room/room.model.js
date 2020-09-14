const { Model } = require('objection');

const tableNames = require('../../constants/table.names');
const { RoomType } = require('../room_type/room.type.model')

class RoomStatus extends Model {
    static get tableName() {
        return tableNames.roomStatus;
    }
    static get idColumn() {
        return 'id';
    }
}

class Room extends Model {
    static get tableName() {
        return tableNames.room;
    }
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        return {
            status: {
                relation: Model.HasOneRelation,
                modelClass: RoomStatus,
                join: {
                    from: 'room.room_status_id',
                    to: 'roomStatus.id',
                },
            },
            roomType: {
                relation: Model.HasOneRelation,
                modelClass: RoomType,
                join: {
                    from: 'room.room_type_id',
                    to: 'roomType.id'
                },
            }
        };
    }
}

module.exports = { Room, RoomStatus };