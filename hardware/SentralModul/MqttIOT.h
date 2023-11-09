#ifndef MqttIOT_h
#define MqttIOT_h

#include "WiFiIOT.h"
#include <Arduino.h>
#include <PubSubClient.h>

#define MQTTSERVER "10.24.103.70"

extern PubSubClient client;

namespace MQTT {
  void mqttInit();
  void mqttCallback(char *topic, byte *message, unsigned int length);
  void mqttReconnect();
}

#endif