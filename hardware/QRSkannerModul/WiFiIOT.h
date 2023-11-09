#ifndef WiFiIOT_h
#define WiFiIOT_h

#include <WiFi.h>
#include <Arduino.h>
#include "secrets.h"

extern WiFiClient espClient;


void wifiInit();

#endif