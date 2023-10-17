import * as mqtt from "mqtt/dist/mqtt.min";

export class MQTTService {
    constructor(host, messageCallbacks) {
        this.mqttClient = null;
        this.host = host;
        this.messageCallbacks = messageCallbacks;
    }

    connect() {
        this.mqttClient = mqtt.connect("ws://10.24.103.178:9001", { clientId: "WebApp" });

        // MQTT Callback for 'error' event
        this.mqttClient.on("error", (err) => {
            console.log(err);
            this.mqttClient.end();
            if (this.messageCallbacks && this.messageCallbacks.onError) this.messageCallbacks.onError(err);
        });

        // MQTT Callback for 'connect' event
        this.mqttClient.on("connect", () => {
            console.log(`MQTT client connected`);
            if (this.messageCallbacks && this.messageCallbacks.onConnect) {
                this.messageCallbacks.onConnect("Connected");
            }
        });

        // Call the message callback function when message arrived
        this.mqttClient.on("message", (topic, message) => {
            if (this.messageCallbacks && this.messageCallbacks.onMessage) {
                this.messageCallbacks.onMessage(topic, message);
            }
        });

        this.mqttClient.on("close", () => {
            console.log(`MQTT client disconnected`);
            if (this.messageCallbacks && this.messageCallbacks.onClose) this.messageCallbacks.onClose();
        });
    }

    end() {
        this.client.end();
    }

    // Publish MQTT Message
    publish(topic, message) {
        this.mqttClient.publish(topic, message);
    }

    // Subscribe to MQTT Message
    subscribe(topic, options) {
        this.mqttClient.subscribe(topic, options);
    }
}
