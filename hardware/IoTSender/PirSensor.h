#include <esp_now.h>
#include <WiFi.h>

const int motionSensor = 18;
unsigned long currentMillis = 0;
unsigned long prevMillis = 0;
bool startTimer = false;
bool motion = false;
bool pirSensorState = false;
