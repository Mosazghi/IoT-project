#ifndef JSONIOT_H
#define JSONIOT_H

#include <ArduinoJson.h>
#include "MqttIOT.h"


bool convertTmToJson(struct tm time, JsonVariant jsonVariant);
void sendJson(float data, struct tm time, PubSubClient client, const char* topic);

#endif