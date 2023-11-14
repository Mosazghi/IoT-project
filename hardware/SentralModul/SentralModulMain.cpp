/**
 * Programkode til sentralmodul.
 * Inneholder: OLED, BME280, SGP30, PIR-sensor, ESP-NOW, MQTT
 * 
 * @file   SentralModulMain.cpp
 * @author Mosazghi, Abdirahman, Didier. 
*/

// Biblioteker
#include <Arduino.h>
#include "JsonIOT.h"
#include "time.h"
#include "EspNow.h"
#include "OLED.h"
#include "PIR.h"
#define MEASURE_LEN 4   


/* tidsintervall */
unsigned long prevTime = 0;
unsigned long currentTime = 0;
const int INTERVAL = 1000 * 3;

// Dato konfigurasjon 
const char* ntp = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 0;
struct tm dato;

// Sensor målinger
float temperature = 0;
float humidity = 0;
float pressure = 0;
float c02 = 0;

const int relayPin = 18; // Pin
float sensorValues[4]; // Array for sensorverdier
float sensorValues[MEASURE_LEN]; // Array for sensorverdier

int measureCounter = 0; // Teller variabel for å få gjennomsnittlig måling

void showSensorValues();
void resetMeasuerment();

void setup() {
  Serial.begin(115200);
  mqttInit();
  MQTT::mqttInit();
  ESPNOW::initEspNow();
  PIR::initPIR(relayPin);
  OLED::initDisplay();
  configTime(gmtOffset_sec, daylightOffset_sec, ntp);
  WiFi.mode(WIFI_STA);
}


void loop() {
  if (!client.connected()) {
    MQTT::mqttReconnect();
  }
  client.loop();

  SENSOR::checkMeasurement();

  currentTime = millis();
  PIR::activatePIR(relayPin, currentTime, incomingPirSensor);

  /* MQTT */
  if (currentTime - prevTime > INTERVAL) { 
    prevTime = currentTime;

    /* OLED-skjermvisning basert på tidsintervall */
    OLED::displayInIntervals();

    temperature = bme.readTemperature();   
    humidity = bme.readHumidity();
    c02 = sgp.eCO2;
    pressure = bme.readPressure();
    pressure /= 1000.0F; 

    if(measureCounter == 5) {
      sensorValues[0] /= 5;
      sensorValues[1] /= 5;
      sensorValues[2] /= 5;
      sensorValues[3] /= 5;
      measureCounter = 0;
      
      showSensorValues();
      sendJson(sensorValues, dato, client, "sensor"); // send to MQTT broker
    }
      
    measureCounter++;

    sensorValues[0] += temperature;
    sensorValues[1] += humidity;
    sensorValues[2] += c02;
    sensorValues[3] += pressure;
  }
}

/**
*  Nullstiller målingene
*/
void resetMeasuerment() {
  for (int i = 0; i < MEASURE_LEN; i++) {
    sensorValues[i] = 0;
  }
}