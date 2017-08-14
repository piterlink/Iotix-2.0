mongoose = require('mongoose');

var mongoDb = mongoose.connect('mongodb://'+SERVER+'/iotixDB8').connection;
// console.log(mongoDb);

mongoDb.on('connected', function(){
    console.log('MongoDB is connected');
});

mongoDb.on('error', function(){
    console.log('MongoDB error');
});