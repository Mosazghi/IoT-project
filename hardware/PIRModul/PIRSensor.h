#ifndef PIRSENSOR_H
#define PIRSENSOR_H
#include <WiFi.h>
#include <esp_now.h>

/**
 *   Konstanter og variabler for PIR-sensoren
 */
const int motionSensor = 18;
unsigned long currentMillis = 0;
unsigned long prevMillis = 0;
bool startTimer = false;
bool motion = false;
bool pirSensorState = false;

#endif