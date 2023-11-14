/**
 * Programkode til sentralmodul.
 * Inneholder: OLED, BME280, SGP30, PIR-sensor, SCT013-030, ESP-NOW, MQTT.
 *
 * @file   SentralModulMain.cpp
 * @author Mosazghi, Abdirahman, Didier.
 */

/* Egne og eksterne biblioteker */
#include "EspNow.h"
#include "JsonIOT.h"
#include "OLED.h"
#include "PIR.h"
#include "time.h"
#include <Arduino.h>
#define MEASURE_LEN 4

/* Diverse intervaller */
unsigned long prevTime = 0;
unsigned long currentTime = 0;
const int INTERVAL = 1000 * 3;

/* Dato konfigurasjoner */
const char *ntp = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 0;
struct tm dato;

/* Variabler for sensormålinger */
float temperature = 0;
float humidity = 0;
float pressure = 0;
float c02 = 0;
float sensorValues[MEASURE_LEN]; // Array for sensorverdier

int measureCounter = 0; // Teller variabel for å få gjennomsnittlig måling

void resetMeasuerment();

/**
 * Initalisere programmet
 */
void setup() {
  Serial.begin(115200);
  mqttInit();
  MQTT::mqttInit();
  ESPNOW::initEspNow();
  PIR::initPIR();
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

  PIR::activatePIR(currentTime, incomingPirSensor);

  currentTime = millis();

  if (currentTime - prevTime > INTERVAL) {
    prevTime = currentTime;

    OLED::displayInIntervals();

    temperature = bme.readTemperature();
    humidity = bme.readHumidity();
    c02 = sgp.eCO2;
    pressure = bme.readPressure();
    pressure /= 1000.0F;

    /**
     * Gjennomsnittlig av fem målinger av sensorene for å minske datasendinger (edge computing)
    */
    if (measureCounter == 5) {
      sensorValues[0] /= 5;
      sensorValues[1] /= 5;
      sensorValues[2] /= 5;
      sensorValues[3] /= 5;
      measureCounter = 0;

      sendJson(sensorValues, dato, client, "sensor"); // send to MQTT broker
      resetMeasuerment();
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