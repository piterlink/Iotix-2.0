var UserController = require('./../controllers/UserController');

module.exports = function (app, passport) {
    app.get('/user/:id?', function (req, res) {
        UserController.find(req, res);
    });
    app.get('/user/findByClient/:id', function (req, res) {
        UserController.findByClient(req, res);
    });
    app.post('/user/', function (req, res) {
        UserController.create(req, res);
    });
    app.delete('/user/:id', function (req, res) {
        UserController.delete(req, res);
    });
    app.put('/user/:id', function (req, res) {
        UserController.update(req, res);
    });
    app.post('/authenticate/', function (req, res) {
        UserController.authenticate(req, res);
    });    
    
    app.post('/login/', passport.authenticate('bearer', {session: false}), function (req, res) {       
        res.status(200).json({
            user: req.user
        });
    });
};