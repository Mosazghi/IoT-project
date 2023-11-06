import * as mqtt from "mqtt";
// Connect to MongoDB

// Set up MQTT client
const client = mqtt.connect("mqtt://127.0.0.1:1884", {clientId: "webServer"}); // Replace with your MQTT broker URL

client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe("qr"); // Subscribe to the /qr topic
    client.subscribe("sensor"); // Subscribe to the /qr topic
});

export default client;