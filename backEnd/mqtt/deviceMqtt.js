var mqtt = require('./../config/mqtt');
mqtt.subscribe('iotix/#');
var DeviceController = require('./../controllers/DeviceController');
var HistoryController = require('./../controllers/HistoryController');

mqtt.on("message", function (topic, payload) {
    var msg = [payload].join();
    //    console.log('Topic: '+topic);
    //    console.log('Mensagem: '+msg);
    var topics = topic.split('/');
    //    console.log(topics);
    //    console.log(msg);
    try {
        var json = JSON.parse(msg);
        //console.log("deviceMqtt :");
        //        console.log(json);
        if (topics[2] === "out") {
            var hardware_id = json.hardware_id;
            if (json.cmd == 'updateDB') {
                DeviceController.getClassHardware(hardware_id, function (hardwareClass) {
                    if (json.data.cmd === 'relay') {
                        if (hardwareClass === 'atuador_padrao') {
                            DeviceController.updateAtuadorStateSave(json.hardware_id, json.data.arg[0]);
                            if (json.data != null) {
                                HistoryController.create('atuador_padrao', json.hardware_id, json.data.arg[0]);
                            }

                        }
                    } else {
                        if (json.data.cmd === 'dimmer') {
                            if (hardwareClass === 'atuador_analogico') {
                                DeviceController.updateAtuadorValSave(json.hardware_id, json.data.arg[0]);
                            }
                        } else {
                            if (json.data.cmd === 'currentValue') {
                                //console.log(json.data);
                                DeviceController.updateAtuadorCurrentSave(json.hardware_id, json.data.arg[0]);
                                HistoryController.create('current', json.hardware_id, json.data.arg[0]);
                            } else {
                                if (hardwareClass === 'sensor_ambiente') {
                                    DeviceController.updateSensorAmbienteSave(json.hardware_id, json.data);
                                    if (json.data != null) {
                                        HistoryController.create('sensor_ambiente', json.hardware_id, json.data);
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                if (json.cmd == 'ping') {
                    DeviceController.connectDevice(json.hardware_id);
                }
            }
        }

    } catch (e) {
        console.log('erro1');
        // console.log(e);
    }
    ;
});

//{"hardware_id":"dev0002","data":{"temperature":"25","humidity":"30","fire":"true","presence":"true"}}
