#ifndef CONST_H
#define CONST_H

// PIR-Sensor
const long interval = 3;

const int BME280_STATE = 1;
const int SG90_STATE = 2;

// dato konfigurasjon
const char* ntp = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 0;

const int INTERVAL = 5000; // 5 sekunders interval for sensoravlesning og sending 

// relay pin
const int relayPin = 18;

const int timeSeconds = 5;
#endif