#include "MqttIOT.h"

PubSubClient client(espClient);   // MQTT-klient

/**
*   Mottar melding fra MQTT-brokeren
*
*   @param  topic - the subscribed to topic
*   @param  message - the message sent from the broker
*   @param  length - the length of the message
*/
void MQTT::mqttCallback(char *topic, byte *message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;

  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();
}

/**
*   Kobler pånytt til MQTT-brokeren
*/
void MQTT::mqttReconnect() {
  // Loop intill vi er koblet til
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Prøver å koble til
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Subscribe til topic
      client.subscribe("test");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void MQTT::mqttInit() {
  wifiInit();
  client.setServer(MQTTSERVER, 1883);
  client.setCallback(mqttCallback);
}