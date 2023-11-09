#ifndef OLED_H
#define OLED_H

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "Sensor.h"

// // OLED-skjerm og sensorer
const int SCREEN_WIDTH = 128; // OLED display width, in pixels
const int SCREEN_HEIGHT = 64; // OLED display height, in pixels
const int BME280_STATE = 1;
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