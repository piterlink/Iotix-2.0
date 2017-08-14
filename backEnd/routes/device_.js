var Device = require('./../models/Device');
var client = require('./../config/mqtt');
module.exports = function (app, io) {
    var deviceSocket = io.of('/device');
    app.get('/device/:client/:id?', function (req, res) {
        var find = {};
        if (req.params.id) {
            find = Device.findOne({_id: req.params.id, client: req.params.client}).exec();
        }
        if (!req.params.id) {
            find = Device.find({client: req.params.client}).exec();
        }

        find
                .then(function (device) {
                    if (!device) {
                        return res.status(404)
                                .json({
                                    status: false,
                                    data: {}
                                });
                    }
                    return res.status(200)
                            .json({
                                status: true,
                                data: device
                            })
                })
                .catch(function (err) {
                    return res.status(500)
                            .json({
                                status: false,
                                data: {}
                            });
                });
    });
    app.post('/device/', function (req, res, next) {
        var DeviceData = req.body;
        var device = new Device(req.body);
        device
                .save()
                .then(function (device) {
                    if (!device) {
                        return res.status(404)
                                .json({
                                    status: false,
                                    data: {}
                                });
                    }
                    deviceSocket.emit('create', device);
                    return res.status(200).json({
                        status: true,
                        data: device
                    });
                })
                .catch(function (err) {
                    return res.status(500)
                            .json({
                                status: false,
                                data: {}
                            });
                });
        client.publish('iotix/' + DeviceData.client + '/' + DeviceData['model.serial'], JSON.stringify(DeviceData.category));
    });
    app.put('/device/:id', function (req, res, next) {
        var findById = Device.findById(req.params.id).exec();
        var update = Device.update({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            multi: false
        }).exec();
        findById
                .then(function (result) {
                    update
                            .then(function (device) {
                                if (!device) {
                                    return res.status(404)
                                            .json({
                                                status: false,
                                                data: {}
                                            });
                                }
                                deviceSocket.emit('update', {_id: req.params.id, data: req.body, result: result});
                                return res.status(200)
                                        .json({
                                            status: true,
                                            data: device,
                                        });
                            })
                            .catch(function (err) {
                                res.status(500)
                                        .json({
                                            status: false,
                                            data: {}
                                        });
                            });
                })
                .catch(function (err) {
                    res.status(500)
                            .json({
                                status: false,
                                data: {}
                            });
                });
    });
    app.delete('/device/:id/:index?', function (req, res, next) {
        var findById = Device.findById(req.params.id).exec();
        var remove = Device.remove({
            _id: req.params.id
        });
        findById
                .then(function (device) {
                    if (!device) {
                        return res.status(404)
                                .json({
                                    status: false,
                                    data: {}
                                });
                    }
                    remove.exec()
                            .then(function () {
                                var ret = {device: device, index: req.params.index};
                                deviceSocket.emit('delete', ret);
                                return res.status(200)
                                        .json({
                                            status: true,
                                            data: device
                                        });
                            }).catch(function () {
                        return res.status(500)
                                .json({
                                    status: false,
                                    data: {}
                                });
                    });
                })
                .catch(function (err) {
                    return res.status(500)
                            .json({
                                status: false,
                                data: {}
                            });
                });
    });
};

