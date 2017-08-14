var HardwareController = require('./../controllers/HardwareController');

module.exports = function (app) {
    app.get('/hardware/:id?', function (req, res) {
        HardwareController.find(req, res);
    });
    app.post('/hardware/', function (req, res) {
        HardwareController.create(req, res);
    });
    app.delete('/hardware/:id', function (req, res) {
        HardwareController.delete(req, res);
    });
    app.put('/hardware/:id', function (req, res) {
        HardwareController.update(req, res);
    });
};