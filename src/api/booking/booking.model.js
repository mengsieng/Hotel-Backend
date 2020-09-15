const { Model } = require('objection');

const tableNames = require('../../constants/table.names');
const { Room } = require('../room/room.model')

class BookingStatus extends Model {
    static get tableName() {
        return tableNames.bookingStatus;
    }
    static get idColumn() {
        return 'id';
    }
}

class Booking extends Model {
    static get tableName() {
        return tableNames.booking;
    }
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        return {
            status: {
                relation: Model.HasOneRelation,
                modelClass: BookingStatus,
                join: {
                    from: 'booking.booking_status_id',
                    to: 'bookingStatus.id',
                },
            },
            room: {
                relation: Model.HasOneRelation,
                modelClass: Room,
                join: {
                    from: 'booking.room_id',
                    to: 'room.id'
                },
            },
        };
    }
}

module.exports = Booking;