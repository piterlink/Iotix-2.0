var User = require('./../models/User');
var jwt = require("jsonwebtoken");
var passport = require('passport');
var userSocket = global.IO.of('/user');
var client = 'iotix';
var action = 'user';
module.exports = {
    find: function (req, res) {
        if (!req.params.id) {
            User.find(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
            }).populate('client');
        }
        ;
        if (req.params.id) {
            User.findOne({ _id: req.params.id }, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
            }).populate('client');
        }
    },
    findByClient: function (req, res) {
        if (req.params.id) {
            User.find({ client: req.params.id }, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
            }).populate('client');
        }
        ;
    },
    create: function (req, res) {
        var data = req.body;
        console.log(req.body);
        User.create(data, function (err, result) {
            if (!err) {
                res.status(200).json(result);
                userSocket.emit(client + 'create', result);
            } else {
                res.status(500).json(err);
                console.log(err);
            }
        });
    },
    update: function (req, res) {
        var data = req.body;
        User.findById(req.params.id, function (err, find) {
            if (!err) {
                User.findOneAndUpdate({ _id: req.params.id }, data, function (err, result) {
                    if (!err) {
                        res.status(200).json(result);
                        userSocket.emit(client + 'update', result);
                    } else {
                        var detail = err;
                        res.status(500).json(detail);
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
        User.findOne({ _id: req.params.id }, function (err, result) {
            User.remove({ _id: req.params.id }, function (err) {
                res.json(result);
                userSocket.emit(client + 'delete', result);
            });
        });
    },
    authenticate: function (req, res) {
        User.findOne({ username: req.body.username, password: req.body.password }, function (err, result) {
            if (err) {
                var detail = err;
                res.status(500).json(detail);
                console.log(detail);
            } else {
                if (result) {
                    console.log(result);
                    var token = jwt.sign({
                        name: result.name,
                        username: result.username,
                        password: result.password,
                        client: result.client._id
                    }, 'secret', { expiresIn: '1h' });

                    User.findOneAndUpdate({ username: req.body.username, password: req.body.password }, { token: token }, function (err, update) {
                        console.log(token);
                        res.json({
                            type: true,
                            token: token,
                            username: result.username,
                            client: result.client._id,
                            name: result.name

                        });
                    });

                } else {
                    res.json({
                        type: false,
                        data: "E-mail ou password incorreto"
                    });
                    console.log(req.body);
                }
            }


        }).populate('client');
    }
}