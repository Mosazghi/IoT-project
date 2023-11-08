#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include "Adafruit_SGP30.h"

#define ledPin 18
#define timeSeconds 5
// OLED-skjerm og sensorer
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
Adafruit_BME280 bme;
Adafruit_SGP30 sgp;


// PIR-Sensor
const long interval = 3;
unsigned long prevMillis = 0;
unsigned long currentMillis = 0;
const int BME280_STATE = 1;
const int SG90_STATE = 2;

unsigned long currentTime = 0;
unsigned long lastTrigger = 0;
bool startTimer = false;
bool motion = false;

int currentState = BME280_STATE;  // Start med å vise temperatur og fuktighet


void displayTemp(){
  display.setTextSize(1);
  display.setCursor(0,0);
  display.print("Temperatur: ");
  display.setTextSize(2);
  display.setCursor(0,10);
  display.print(String(bme.readTemperature()));
  display.print(" ");
  display.setTextSize(1);
  display.cp437(true);
  display.write(167); //Grade symbol
  display.setTextSize(2);
  display.print("C");
}

void displayHumid(){
  // display fuktighet
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("Fuktighet: ");
  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print(String(bme.readHumidity()));
  display.print(" %"); 
  display.display();
}

void displayCO2(){
  // display CO2-nivå
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("CO2-nivaa: ");
  display.setTextSize(2);
  display.setCursor(0, 10);
  display.print(String(sgp.eCO2));
  display.print("ppm"); 
  display.display();
}

void displayPressure(){
    // display trykknivå
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("Trykknivaa: ");
  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print(String(int(bme.readPressure())));
  display.print(" hPa"); 
  display.display();
}