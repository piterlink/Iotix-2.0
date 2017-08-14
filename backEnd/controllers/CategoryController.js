var Category = require('./../models/Category');
var topicSocket = global.IO.of('/category');
var client = 'iotix'

module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Category.findOne({_id: req.params.id}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                };
            }).populate('client');
        }
        if (!req.params.id) {
            Category.find(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
            }).populate('client');
        }
    },
    create: function (req, res) {
        var data = req.body;
        Category.create(data, function (err, result) {
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
        Category.findById(req.params.id, function (err, find) {
            if (!err) {
                Category.findOneAndUpdate({_id: req.params.id}, data, function (err, result) {
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
        Category.findOne({_id: req.params.id}, function (err, result) {
            Category.remove({_id: req.params.id}, function (err) {
                res.json(result);
                topicSocket.emit(client + 'delete', result);
            });
        });
    }
}