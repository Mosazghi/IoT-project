const getMqttDetails = (req, res) => {
    res.send(
        JSON.stringify({
            mqttServer: process.env.MQTT_BROKER,
            mqttTopic1: process.env.MQTT_TOPIC1,
            mqttTopic2: process.env.MQTT_TOPIC2,
        })
    );
};

export default getMqttDetails;
