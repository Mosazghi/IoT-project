#ifndef JSONIOT_H
#define JSONIOT_H

#include <ArduinoJson.h>
#include "MqttIOT.h"

void sendJson(float data[], struct tm time, PubSubClient &client, const char* topic);

#endif