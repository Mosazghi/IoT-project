const getMqttDetails = (req, res) => {
    res.send(
        JSON.stringify({
            mqttServer: process.env.MQTT_BROKER,
            mqttTopic: process.env.MQTT_TOPIC,
        })
    );
};

export default getMqttDetails;
