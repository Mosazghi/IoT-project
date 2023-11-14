#ifndef JSONIOT_H
#define JSONIOT_H

#include "MqttIOT.h"
#include <ArduinoJson.h>

void sendJson(float data[], struct tm time, PubSubClient &client,
              const char *topic);

#endif