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


/* tidsintervall */
unsigned long prevTime = 0;
unsigned long currentTime = 0;

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
int measureCounter = 0; // Teller variabel for å få gjennomsnittlig måling

void showSensorValues();

void setup() {
  Serial.begin(115200);

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
  if (currentTime - prevTime > 5000) { 
    prevTime = currentTime;

    /* OLED-skjermvisning basert på tidsintervall */
    OLED::displayInIntervals();

    temperature = bme.readTemperature();   
    humidity = bme.readHumidity();
    c02 = sgp.eCO2;
    pressure = bme.readPressure();

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

void showSensorValues() {
  /*Serial monitor*/
    Serial.println("------------------------------------------------------------");
    Serial.println("\tROOM 100: ");
    Serial.print("\t\tTemperatur = ");
    Serial.print(bme.readTemperature());
    Serial.println("°C");
    Serial.print("\t\tFuktighet = ");
    Serial.print(bme.readHumidity());
    Serial.println(" %");
    Serial.print("\t\teCO2-nivå = ");
    Serial.print(sgp.eCO2);
    Serial.print(sgp.eCO2); Serial.println(" ppm");
    Serial.print("\t\tTrykknivå = ");
    Serial.print(bme.readPressure() / 100.0F);
    Serial.println(" hPa");
    Serial.println("------------------------------------------------------------");
}