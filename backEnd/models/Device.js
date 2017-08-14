var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deviceSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    connection: {type: String, default: 'OFFLINE'},
    area: {type: String, required: true},
    local: {type: String, required: true},
    hardware_id: {type: String, required: true},
    hardware: {type: Schema.Types.ObjectId, ref: 'Hardware'},
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    atuador: {
        val: {type: Number, default: 0},
        state: {type: String, default: 'off'},
        current: {type: Number, default:0}
    },
    sensor_ambiente: {        
        temperature: {type: Number},
        humidity: {type: Number},
        fire: {type: Boolean},
        presence: {type: Boolean}  
    },
    group: Array,
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}

);
var device = mongoose.model('Device', deviceSchema);
module.exports = device;