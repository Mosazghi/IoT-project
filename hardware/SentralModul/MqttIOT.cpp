/**
 *   Koden kobler opp ESP32 til MQTT-brokeren
 *
 *   @file       MqttIOT.cpp
 *   @author     Mosazghi
 */

#include "MqttIOT.h"

PubSubClient client(espClient); // MQTT-klient

/**
 *   Kobler pånytt til MQTT-brokeren (hvis vi mister forbindelsen)
 */
void MQTT::mqttReconnect() {
  while (!client.connected()) {
    Serial.print("Tilkobler til MQTT broker...");
    if (client.connect("Sentralmodul")) {
      Serial.println("Tilkoblet!");
    } else {
      Serial.print("feilet!, rc=");
      Serial.print(client.state());
      Serial.println(" Prøver igjen om 5 sekunder");
      delay(5000);
    }
  }
}

/**
 *   Initialiserer MQTT
 */
void MQTT::mqttInit() {
  wifiInit();
  client.setServer(MQTTSERVER, 1883);
}