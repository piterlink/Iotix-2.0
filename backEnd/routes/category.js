var CategoryController = require('./../controllers/CategoryController');

module.exports = function (app) {
    app.get('/category/:id?', function (req, res) {
        CategoryController.find(req, res);
    });
    app.post('/category/', function (req, res) {
        CategoryController.create(req, res);
    });
    app.delete('/category/:id', function (req, res) {
        CategoryController.delete(req, res);
    });
    app.put('/category/:id', function (req, res) {
        CategoryController.update(req, res);
    });
};