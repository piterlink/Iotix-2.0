var Device = require('./../models/Device');
var client = 'iotix';
var mqtt = require('mqtt');
var mqttConnect = 'mqtt://' + SERVER;
var deviceSocket = IO.of(client + '/device');
//var mqtt = require('./../config/mqtt');
module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Device.findOne({ _id: req.params.id }, function (err, result) {
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
    findDeviceByClient: function (req, res) {
        //console.log(req.params);
        if (req.params.client) {
            Device.find({ client: req.params.client }, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            }).populate('client').populate('user').populate('category').populate('hardware');
        } else {
            res.status(500).json(err);
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
                Device.findOneAndUpdate({ _id: req.params.id }, data, function (err, result) {
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
        Device.findOne({ _id: req.params.id }, function (err, result) {
            Device.remove({ _id: req.params.id }, function (err) {
                res.json(result);
                deviceSocket.emit(client + 'delete', result);
            });
        });

    },
    updateState: function (req, res) {
        var mqttClient = mqtt.connect(mqttConnect);
        Device.findOneAndUpdate({ _id: req.params.id }, { connection: 'AGUARDANDO', "modified": Date() }, function (err, result) {
            if (!err) {
                if (req.body.state === 'off' || req.body.state === 'on' || req.body.state === 'toggle') {
                    mqttClient.publish('iotix/' + result.hardware_id + '/in', '{"cmd":"relay","arg":["' + req.body.state + '"]}');
                    res.status(200).json('{msg: ok}');
                    deviceSocket.emit('updateAtuadorState', { state: req.body.state, result: result });
                } else {
                    mqttClient.publish('iotix/' + result.hardware_id + '/in', '{"cmd":"relay","arg":["' + result.atuador.state + '"]}');
                    res.status(200).json('{msg: ok}');
                }

            } else {
                res.status(500).json({ msg: err });
                console.log(err);
            }
        });

    },
    updateVal: function (req, res) {
        var mqttClient = mqtt.connect(mqttConnect);
        Device.findOneAndUpdate({ _id: req.params.id }, { connection: 'OFFLINE', "modified": Date() }, function (err, result) {
            console.log(result);
            if (!err) {
                mqttClient.publish('iotix/' + result.hardware_id + '/in', '{"cmd":"dimmerSet","arg":["' + req.body.val + '"]}');
                res.status(200).json('{msg: ok}');
                deviceSocket.emit('updateAtuadorVal', { val: req.body.val, result: result, connection: 'OFFLINE' });

            } else {
                res.status(500).json({ msg: err });
                console.log(err);
            }
        })
    },
    updateAtuadorStateSave: function (hardware_id, state) {
        if (state === 'off' || state === 'on' || state === 'toggle') {
            Device.findOneAndUpdate({ hardware_id: hardware_id }, { "atuador.state": state, "modified": Date(), connection: "ONLINE" }, function (err, result) {
                deviceSocket.emit('updateAtuadorState', { state: state, result: result });
                //console.log(state);
            });
        }
    },
    updateAtuadorValSave: function (hardware_id, val) {
        if (val != null) {
            Device.findOneAndUpdate({ hardware_id: hardware_id }, { "atuador.val": val, "modified": Date(), connection: "ONLINE" }, function (err, result) {
                if (!err) {
                    deviceSocket.emit('updateAtuadorVal', { val: val, result: result, connection:'ONLINE' });
                }
            })
        }

    },

    updateAtuadorCurrentSave: function (hardware_id, current) {       
        if (current != null) {
            Device.findOneAndUpdate({ hardware_id: hardware_id }, { "atuador.current": current, "modified": Date(), connection: "ONLINE" }, function (err, result) {
                if (!err) {
                    deviceSocket.emit('updateAtuadorCurrent', { current: current, result: result });
                }
            })
        }

    },


    updateSensorAmbienteSave: function (hardware_id, data) {
        var update = {
            "sensor_ambiente.temperature": parseInt(data.temperature),
            "sensor_ambiente.humidity": parseInt(data.humidity),
            "sensor_ambiente.fire": parseInt(data.fire),
            "sensor_ambiente.presence": parseInt(data.presence),
            connection: "ONLINE",
            "modified": Date()
        };
        Device.findOneAndUpdate({ hardware_id: hardware_id }, update, function (err, result) {
            if (!err) {
                deviceSocket.emit('updateSensorAmbiente', { data: data, result: result });
            }
        });
    },

    getClassHardware: function (hardware_id, cb) {
        Device.findOne({ hardware_id: hardware_id }, function (err, result) {
            if (!err) {
                //console.log(result.hardware.class);
                if (result) {
                    cb(result.hardware.class);
                } else {
                    cb(false)
                }
            } else {
                cb(err);
            }
            ;
        }).populate('hardware');
    },

    connectDevice: function (hardware_id) {
        Device.findOneAndUpdate({ hardware_id: hardware_id }, { "modified": Date(), connection: 'ONLINE' }, function (err, result) {
            deviceSocket.emit('deviceConnect', { hardware_id: hardware_id, result: result });
        })
    },

    pingByClient: function (req, res) {
        var client = mqtt.connect('mqtt://' + SERVER);
        clientId = req.params.idClient;
        Device.find({ client: clientId }, function (err, result) {
            Device.update({ client: clientId }, { connection: 'OFFLINE' }, { multi: true }, function (err, updated) {
                var itens = "";
                if (!err) {
                    result.forEach(function (item) {
                        client.publish('iotix/' + item.hardware_id + '/in', '{"cmd":"ping"}');
                        itens += item._id + " ";
                    });
                    res.status(200).json({
                        itens: itens,
                        updated: updated,
                        msg: "Alterado com Sucesso para offline"
                    })
                } else {
                    console.log(err);
                }
            })
            if (!err) {

            }
        });
    },

    ping: function (req, res) {
        var client = mqtt.connect('mqtt://' + SERVER);
        //client.subscribe('iotix/' + req.params.id + '/out');
        client.publish('iotix/' + req.params.idHardware + '/in', '{"cmd":"ping"}');

        Device.findOne({ hardware_id: req.params.idHardware }, function (err, result) {
            if (!err) {
                console.log(result);
                if (true) {
                    Device.update({ _id: result._id }, { connection: 'OFFLINE' }, function (err, update) {
                        if (!err) {
                            res.status(200).json({ msg: 'ok' })
                            console.log('Atualizado');
                        } else {
                            res.status(200).json({ msg: 'ok' })
                            console.log('Erro in DeviceController device()')
                        }
                    })
                }
            } else {
                res.status(500).json({ msg: error });
                // console.log('Erro in DeviceController device()');
                // console.log(err);
            }
        })
    }
};