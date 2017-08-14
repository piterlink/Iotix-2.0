var History = require('./../models/History');
var Device = require('./../models/Device');

var HistorySocket = global.IO.of('/history');
var deviceSocket = "";

var client = 'iotix';
module.exports = {
    find: function (req, res) {
        var data = req.body;
        console.log(data)
        var page = data.page;
        var pagesize = data.pagesize;
        History.find(function (err, result) {

            //console.log({ data: result, skip: skip, limit: limit });
            if (!err) {
                res.status(200).json({ data: result, pagesize: pagesize, page: page });
            } else {
                res.status(500).json(err);
            }
            ;
        }).skip(pagesize * (page - 1)).limit(pagesize).populate('device').sort({ created: 'desc' });
    },
    create: function (typeHardware, hardware_id, value) {
        data = {};
        Device.findOne({ hardware_id: hardware_id }, function (err, result) {
            //console.log(result);
            if (typeHardware == 'atuador_padrao') {
                var action = 'atuador_padrao';
                data = {
                    device: result._id,
                    hardware_id: result.hardware_id,
                    action: action,
                    typeHardware: typeHardware,
                    atuador: {
                        state: value,
                        val: '',
                    },
                    descriptioon: 'ALTERAÇÃO DE ESTADO',
                }

            } else {
                if (typeHardware == 'sensor_ambiente') {
                    var action = 'sensor_ambiente'
                    data = {
                        device: result._id,
                        hardware_id: result.hardware_id,
                        action: action,
                        typeHardware: typeHardware,
                        sensor_ambiente: {
                            temperature: value.temperature,
                            humidity: value.humidity,
                            fire: value.fire,
                            presence: value.presence,
                        },
                    }
                } else {
                    if (typeHardware == 'current') {
                        var action = 'current'
                        data = {
                            device: result._id,
                            hardware_id: result.hardware_id,
                            action: action,
                            typeHardware: typeHardware,
                            atuador: {
                                current: value
                            },
                        }
                    }
                }
            }

            console.log(data);

            if (data != null) {
                console.log('entrou');
                History.create(data, function (err, result) {
                    if (!err) {
                        // res.status(200).json(result);
                        HistorySocket.emit(client + 'create', result);
                    } else {
                        var detail = err;
                        // res.status(500).json(detail);                       
                    }
                });
            }
        });

    },
    count: function (req, res) {
        History.count(function (err, count) {
            console.log(count);
            res.status(200).json({ value: count })
        });
    }
}




//  Device.create(data, function (err, result) {
//             if (!err) {
//                 res.status(200).json(result);
//                 deviceSocket.emit(client + 'create', result);
//             } else {
//                 res.status(500).json(err);
//             }
//         });