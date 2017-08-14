var mqtt = require('mqtt')
var mqttClient  = mqtt.connect('mqtt://'+SERVER);
console.log('mqtt://'+SERVER);
mqttClient.on('connect', function () {
    console.log('MQTT connect');
});
module.exports = mqttClient;