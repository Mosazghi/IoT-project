#ifndef WiFiIOT_h
#define WiFiIOT_h

#include "secrets.h"
#include <Arduino.h>
#include <WiFi.h>

extern WiFiClient espClient;

void wifiInit();

#endif