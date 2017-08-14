var Topic = require('./../models/Topic');
var topicSocket = global.IO.of('/topic');
var client = 'iotix'

module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Topic.findOne({_id: req.params.id}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            }).populate('topic_hi');
        }
        if (!req.params.id) {
            Topic.find(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {

                    res.status(500).json(err);
                }
                ;
            }).populate('topic_hi');
        }
    },
    findTopicHi: function (req, res) {
        if (req.params.id) {
            Topic.find({topic_hi: null, _id: {'$ne': req.params.id}}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            });
        }
        if (!req.params.id) {
            Topic.find({topic_hi: null}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            });
        }
    },
    create: function (req, res) {
        var data = req.body;
        Topic.create(data, function (err, result) {
            if (!err) {
                res.status(200).json(result);
                topicSocket.emit(client + 'create', result);
            } else {
                var detail = err;
                res.status(500).json(detail);
            }
        });
    },
    update: function (req, res) {
        var data = req.body;
        Topic.findById(req.params.id, function (err, find) {
            if (!err) {
                Topic.findOneAndUpdate({_id: req.params.id}, data, function (err, result) {
                    if (!err) {
                        res.status(200).json(result);
                        topicSocket.emit(client + 'update', result);
                    } else {
                        var detail = err;
                        res.status(500).json(detail);
                    }
                });
            } else {
                var detail = err;
                res.status(500).json(detail);
            }

        });
    },
    delete: function (req, res) {
        Topic.findOne({_id: req.params.id}, function (err, result) {
            Topic.remove({_id: req.params.id}, function (err) {
                res.json(result);
                topicSocket.emit(client + 'delete', result);
            });
        });
    }
}