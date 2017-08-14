var HistoryController = require('./../controllers/HistoryController');

module.exports = function (app) {
    app.post('/history/', function (req, res) {
        HistoryController.find(req, res);
    });
    app.get('/history/count', function (req, res) {
        HistoryController.count(req, res);
    });
    // app.delete('/history/:id', function (req, res) {
    //     HistoryController.delete(req, res);
    // });
    // app.put('/history/:id', function (req, res) {
    //     HistoryController.update(req, res);
    // });
};