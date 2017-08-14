var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    name: {type: String},
    url: {type: String},
    description: {type: String},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
});

var client = mongoose.model('Client', ClientSchema);
module.exports = client;