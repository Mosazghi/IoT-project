/**
 *   Koden initialiserer OLED-skjermen, skriver ut data og visualiserer dem i
 * intervaller.
 *
 *   @file       OLED.cpp
 *   @author     Dider
 */

#include "OLED.h"

extern float humidity;
extern float temperature;
extern float pressure;
extern float c02;

extern Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

int state = BME280_STATE; // State for å vise data på OLED-skjermen

/**
 *   Viser temperatur på OLED-skjermen
 */
void OLED::displayTemp() {
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("Temperatur: ");
  display.setTextSize(2);
  display.setCursor(0, 10);
  display.print(String(temperature));
  display.print(" ");
  display.setTextSize(1);
  display.cp437(true);
  display.write(167); // Grade symbol
  display.setTextSize(2);
  display.print("C");
}

/**
 *   Viser fuktighet på OLED-skjermen.
 */
void OLED::displayHumid() {
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("Fuktighet: ");
  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print(String(humidity));
  display.print(" %");
  display.display();
}

/**
 *   Viser CO2-nivå på OLED-skjermen.
 */
void OLED::displayCO2() {
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("CO2-nivaa: ");
  display.setTextSize(2);
  display.setCursor(0, 10);
  display.print(String(c02));
  display.print("ppm");
  display.display();
}

/**
 *   Viser trykknivå på OLED-skjermen.
 */
void OLED::displayPressure() {
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("Trykknivaa: ");
  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print(String(pressure));
  display.print(" hPa");
  display.display();
}

/**
 *   Initialiserer OLED-skjermen.
 */
void OLED::initDisplay() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
    Serial.println(F("OLED-skjerm feilet!"));
    for (;;)
      ;
  }

  display.clearDisplay();
  display.setTextColor(WHITE);
}

/**
 * Viser data på OLED-skjermen i intervaller.
 * Sjekker hvilken state den er i og viser dataen tilhørende den staten.
 */
void OLED::displayInIntervals() {
  display.clearDisplay();

  if (state == BME280_STATE) {
    OLED::displayTemp();
    OLED::displayHumid();
    state--;
  }

  if (state == SG90_STATE) {
    OLED::displayCO2();
    OLED::displayPressure();
    state++;
  }
  display.display();
}