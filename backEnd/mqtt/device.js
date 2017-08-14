var client = require('./../config/mqtt');
var Device = require('./../models/Device');
module.exports = function (io) {
    var deviceSocket = io.of('/device');
    client.on('connect', function () {
        client.subscribe('iotix/#', function (err, data) {
            client.on("message", function (topic, payload) {
                var msg = [payload].join();
                console.log(topic);
                console.log(msg);
                try {
                    json = JSON.parse(msg);
                    var id = json.arg['_id'];
                    var data = json.arg['data'];

                    var findById = Device.findById(id).exec();
                    var update = Device.update({
                        _id: id
                    }, {
                            $set: data
                        }, {
                            multi: false
                        }).exec();
                    findById
                        .then(function (result) {
                            update
                                .then(function (device) {
                                    if (!device) {
                                        console.log('404');
                                    }
                                    deviceSocket.emit('update', { _id: id, data: data, result: result });
                                })
                                .catch(function (err) {
                                    console.log('500');
                                });
                        })
                        .catch(function (err) {
                            res.status(500)
                                .json({
                                    status: false,
                                    data: {}
                                });
                        });
                } catch (err) {
                    console.log('Error: ' + err);
                }

            })
        })
    });
};
//{"cmd": "UPDATE","arg": {  "_id": "57f2239280a41c2218ebd35c", "data":{"data.val": 90,"data.state":"LIGADO"} }}