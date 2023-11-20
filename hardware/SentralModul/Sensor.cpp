/**
 *   Koden initialiserer trykk, temperatur, fuktighet og CO2 sensorer.
 *
 *   @file       Sensor.cpp
 *   @author     Dider, Gruppe IoT prosjekt 3 Gjøvik
 */

#include "Sensor.h"

Adafruit_BME280 bme; // Lager et BME280 objekt
Adafruit_SGP30 sgp;  // Lager et SGP30 objekt

/**
 *   Initialiserer sensorer (trykk, temperaur, fuktighet og CO2)
 */
void SENSOR::initSensor() {
  if (!bme.begin(0x76)) {
    Serial.println("Error med BME280!");
    while (1)
      ;
  }

  if (!sgp.begin()) {
    Serial.println("Error med SGP30!");
    while (1)
      ;
  }

  if (!sgp.IAQinit()) {
    Serial.println("SGP30 init feilet!");
    while (1)
      ;
  }

  sgp.setIAQBaseline(0x8F25, 0x86C0); // Kalibreringsverdier
}

/**
 *   Sjekker målinger fra sensorer
 */
void SENSOR::checkMeasurement() {
  if (!sgp.IAQmeasure()) {
    Serial.println("Målinger feilet");
    return;
  }
}