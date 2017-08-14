var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = Schema({
    device: { type: Schema.Types.ObjectId, ref: 'Device' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    action: { type: String },
    hardware_id: { type: String },
    atuador: {
        state: { type: String },
        val: { type: Number },
        current: { type: Number }
    },
    sensor_ambiente: {
        temperature: { type: Number },
        humidity: { type: Number },
        fire: { type: Boolean },
        presence: { type: Boolean }
    },
    typeHardware: { type: String },
    description: { type: String },
    created: { type: Date, default: Date.now }
});

var history = mongoose.model('History', HistorySchema);
module.exports = history;