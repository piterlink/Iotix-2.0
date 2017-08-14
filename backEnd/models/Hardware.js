var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hardwareSchema = Schema({
    name: {type: String, default: '', required: true},
    sinal: {type: String, default: '', required: true},
    class: {type: String, default: '', required: true},
    min: {type: Number, default: 0},
    max: {type: Number, default: 100},
    unit: {type: String, default: '%'},
    img: {type: String, default: 'img0'},
    description: {type: String, default: ''},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}

);
var hardware = mongoose.model('Hardware', hardwareSchema);
module.exports = hardware;