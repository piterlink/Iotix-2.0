var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    cpf: {type: String, required: true},
    birth: {type: String, required: true},
    address: {
        cep: {type: String, default: ''},
        street: {type: String, default: ''},
        number: {type: String, default: ''},
        complement: {type: String, default: ''},
        district: {type: String, default: ''},
        city: {type: String, default: ''},
        state: {type: String, default: ''},
        country: {type: String, default: ''}
    },
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}

);
var user = mongoose.model('User', UserSchema);
module.exports = user;