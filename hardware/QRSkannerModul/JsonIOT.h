#ifndef JSONIOT_H
#define JSONIOT_H

#include "MqttIOT.h"
#include <ArduinoJson.h>

void sendJson(String data, struct tm time, PubSubClient &client, const char *topic);

#endif