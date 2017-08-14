var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');


var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('./models/User');

var app = express();
var server = http.createServer(app);
global.IO = require('socket.io')(server);
// global.SERVER = '192.168.0.110';
global.SERVER = '192.168.0.15';
global.SERVER = 'localhost';

//Middlewares
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
//mongoose
var db = require('./config/db');


passport.use(
        new BearerStrategy(function (token, done) {
            User.findOne({
                token: token
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, {scope: 'all'});
            });
        })
        );

//Header
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
    res.header("Authorization", "*");
    next();
});
require('./mqtt/deviceMqtt');
require('./routes/device')(app);
require('./routes/user')(app,passport);
require('./routes/client')(app);
require('./routes/category')(app);
require('./routes/hardware')(app);
require('./routes/history')(app);




server.listen(3000, function () {
    console.log('Servidor Online')
});