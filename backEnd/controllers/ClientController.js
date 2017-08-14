var Client = require('./../models/Client');
var clientSocket = global.IO.of('/client');
var client = 'iotix';
module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Client.findOne({_id: req.params.id}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            });
        }
        if (!req.params.id) {
            Client.find(function (err, result) {
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
        Client.create(data, function (err, result) {
            if (!err) {
                res.status(200).json(result);
                clientSocket.emit(client + 'create', result);
            } else {
                var detail = err;
                res.status(500).json(detail);
                console.log(detail);
            }
        });
    },
    update: function (req, res) {
        var data = req.body;
        Client.findById(req.params.id, function (err, find) {
            if (!err) {
                Client.findOneAndUpdate({_id: req.params.id}, data, function (err, result) {
                    if (!err) {
                        res.status(200).json(result);
                        clientSocket.emit('update', result);
                    } else {
                        var detail = err;
                        res.status(500).json(detail);
                        console.log(detail);
                    }
                });
            } else {
                var detail = err;
                res.status(500).json(detail);
                console.log(detail);
            }

        });
    },
    delete: function (req, res) {
        Client.findOne({_id: req.params.id}, function (err, result) {
            Client.remove({_id: req.params.id}, function (err) {
                res.json(result);
                clientSocket.emit(client + 'delete', result);
            });
        });

    }
};