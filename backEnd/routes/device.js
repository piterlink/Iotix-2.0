var DeviceController = require('./../controllers/DeviceController');

module.exports = function (app) {
    app.get('/device/:id?', function (req, res) {
        DeviceController.find(req, res);
    });
    app.post('/device/', function (req, res) {
        DeviceController.create(req, res);
    });
    app.delete('/device/:id', function (req, res) {
        DeviceController.delete(req, res);
    });
    app.put('/device/:id', function (req, res) {
        DeviceController.update(req, res);
    });
    app.post('/device/updateState/:id', function (req, res) {
        DeviceController.updateState(req, res);
    });
    app.post('/device/updateVal/:id', function (req, res) {
        DeviceController.updateVal(req, res);
    });
    app.get('/device/pingByClient/:idClient', function (req, res) {
        DeviceController.pingByClient(req, res);
    });
    app.get('/device/ping/:idHardware', function (req, res) {
        DeviceController.ping(req, res);
    });
    app.get('/device/findDeviceByClient/:client', function (req, res) {
        DeviceController.findDeviceByClient(req, res);
    });

};