#ifndef OLED_H
#define OLED_H

#include "Sensor.h"
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

extern Adafruit_SSD1306 display;

/* OLED-skjerm konfigurasjoner */
const int SCREEN_WIDTH = 128;
const int SCREEN_HEIGHT = 64;
7

    // Hjelpevariabel for å vise data på OLED-skjermen
    const int BME280_STATE = 1;
const int SG90_STATE = 0;

namespace OLED {
void initDisplay();
void displayTemp();
void displayHumid();
void displayCO2();
void displayPressure();
void displayInIntervals();
} // namespace OLED

#endif