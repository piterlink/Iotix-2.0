var ClientController = require('./../controllers/ClientController');

module.exports = function (app) {
    app.get('/client/:id?', function (req, res) {
        ClientController.find(req, res);
    });
    app.post('/client/', function (req, res) {
        ClientController.create(req, res);
    });
    app.delete('/client/:id', function (req, res) {
        ClientController.delete(req, res);
    });
    app.put('/client/:id', function (req, res) {
        ClientController.update(req, res);
    });
};