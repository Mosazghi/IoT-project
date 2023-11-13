#ifndef OLED_H
#define OLED_H

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "Sensor.h"

// // OLED-skjerm og sensorer
const int SCREEN_WIDTH = 128; // OLED-skjermens bredde i piksler
const int SCREEN_HEIGHT = 64; // OLED-skjermens høyde i piksler
const int BME280_STATE = 1; // Hjelpevariabel for å vise data på OLED-skjermen
const int SG90_STATE = 0;
extern Adafruit_SSD1306 display;

namespace OLED {
  void initDisplay();
  void displayTemp();
  void displayHumid();
  void displayCO2();
  void displayPressure();
  void displayInIntervals();
}

#endif