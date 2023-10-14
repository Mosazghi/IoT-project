#include "Arduino.h"
#include "mqtt.h"
#include <WiFi.h>
#include <PubSubClient.h>

Mqtt::Mqtt(const char* server, const char* pass, const char* mqtt) {
    ssid = server;
    password = pass;
    mqtt_server = mqtt;
}

void Mqtt::connect(const char* ssid, const char* password) {
    WiFiClient espClient;
    PubSubClient client(espClient);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}

// void Mqtt::publish(String topic, String message) {
//     if (!client.connected()) {
//         reconnect();
//     }
//     client.publish(topic.c_str(), message.c_str());
// }