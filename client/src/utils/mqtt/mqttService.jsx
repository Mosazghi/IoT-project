import * as mqtt from "mqtt/dist/mqtt.min";

/**
 * MQTTService class
 * @param {string} host - MQTT broker (IP adresse)
 * @param {object} messageCallbacks - Tilbakekallingsfunksjoner for MQTT-meldinger
 *
 */
export class MQTTService {
    constructor(host, messageCallbacks) {
        this.mqttClient = null;
        this.host = host;
        this.messageCallbacks = messageCallbacks;
    }

    connect() {
        this.mqttClient = mqtt.connect(this.host, { clientId: "WebApp" });

        this.mqttClient.on("error", (err) => {
            console.log(err);
            this.mqttClient.end();
            if (this.messageCallbacks && this.messageCallbacks.onError) this.messageCallbacks.onError(err);
        });

        this.mqttClient.on("connect", () => {
            console.log(`MQTT client connected`);
            if (this.messageCallbacks && this.messageCallbacks.onConnect) {
                this.messageCallbacks.onConnect("Connected");
            }
        });

        this.mqttClient.on("message", (topic, message) => {
            if (this.messageCallbacks && this.messageCallbacks.onMessage) {
                this.messageCallbacks.onMessage(topic, message);
            }
        });

        this.mqttClient.on("close", () => {
            console.log(`MQTT klient lukket`);
            if (this.messageCallbacks && this.messageCallbacks.onClose) this.messageCallbacks.onClose();
        });
    }

    end() {
        this.mqttClient.end();
    }

    publish(topic, message) {
        this.mqttClient.publish(topic, message);
    }

    subscribe(topic, options) {
        this.mqttClient.subscribe(topic, options);
    }
}
