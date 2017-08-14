var Device = require('./../models/Device');
var deviceSocket = global.IO.of('/device');
var mqtt = MQTT;
var client = 'iotix';
module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Device.findOne({_id: req.params.id}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            }).populate('client').populate('user').populate('category').populate('hardware');
        }
        if (!req.params.id) {
            Device.find(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            }).populate('client').populate('user').populate('category').populate('hardware');
        }
    },
    create: function (req, res) {
        var data = req.body;
        Device.create(data, function (err, result) {
            if (!err) {
                res.status(200).json(result);
                deviceSocket.emit(client + 'create', result);
            } else {
                res.status(500).json(err);
            }
        });
    },
    update: function (req, res) {
        var data = req.body;
        Device.findById(req.params.id, function (err, find) {
            if (!err) {
                Device.findOneAndUpdate({_id: req.params.id}, data, function (err, result) {
                    if (!err) {
                        res.status(200).json(result);
                        deviceSocket.emit(client + 'update', result);
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
        Device.findOne({_id: req.params.id}, function (err, result) {
            Device.remove({_id: req.params.id}, function (err) {
                res.json(result);
                deviceSocket.emit(client + 'delete', result);
            });
        });

    },
    updateState: function (req, res) {
        Device.findOne({_id: req.params.id}, function (err, result) {
            mqtt.publish('iotix/' + result.hardware_id + '/in', '{"cmd":"relay","arg":["' + req.body.state + '"]}');
        });
        res.status(200).json('{msg: ok}');
    },
    updateStateSave: function (hardware_id, state) {
        Device.findOneAndUpdate({hardware_id: hardware_id}, {"data.state": state}, function (err, result) {
            //deviceSocket.emit('update',state)
            console.log(result);
        });
    }
};