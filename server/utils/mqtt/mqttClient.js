import * as mqtt from "mqtt";

// Sette opp MQTT klienten til webserveren
const client = mqtt.connect("mqtt://127.0.0.1:1883", { clientId: "webServer" }); 

client.on("connect", () => {
    client.subscribe("qr");
    client.subscribe("sensorData");
});

export default client;
