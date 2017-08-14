var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({    
    name: {type: String, required:true},
    description:{type: String},
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    type: {type: String, required:true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}

);
var category = mongoose.model('Topic', categorySchema);
module.exports = category;