var TopicController = require('./../controllers/TopicController');

module.exports = function (app) {
    app.get('/topic/:id?', function (req, res) {
        TopicController.find(req, res);
    });
    app.get('/topicHi/:id?', function (req, res) {
        TopicController.findTopicHi(req, res);
    });
    app.post('/topic/', function (req, res) {
        TopicController.create(req, res);
    });
    app.delete('/topic/:id', function (req, res) {
        TopicController.delete(req, res);
    });
    app.put('/topic/:id', function (req, res) {
        TopicController.update(req, res);
    });
};