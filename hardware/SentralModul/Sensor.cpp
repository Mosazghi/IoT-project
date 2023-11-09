#include "Sensor.h"

Adafruit_BME280 bme;
Adafruit_SGP30 sgp;

void SENSOR::initSensor() {
    if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
    }

    if (!sgp.begin()){
        Serial.println("Sensor not found :(");
        while (1);
    }

    if (!sgp.IAQinit()) {
        Serial.println("SGP30 initialization failed");
        while (1);
    }
    
    sgp.setIAQBaseline(0x8F25, 0x86C0); // Kalibreringsverdier (hentet fra eksempel)
}

void SENSOR::checkMeasurement() {
    if (!sgp.IAQmeasure()) {
        Serial.println("Measurement failed");
        return;
    }
}