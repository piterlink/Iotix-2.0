var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({
    name: {type: String, required: true},
    description: {type: String},
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}

);
var category = mongoose.model('Category', categorySchema);
module.exports = category;