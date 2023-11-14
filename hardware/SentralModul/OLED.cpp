/**
*   Koden initialiserer OLED-skjermen, skriver ut data og visualiserer dem i intervaller.
*
*   @file       OLED.cpp
*   @author     Dider
*/

#include "OLED.h"

extern Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1); // OLED-skjerm
int state = BME280_STATE; // State for å vise data på OLED-skjermen

/**
* Viser temperatur på OLED-skjermen.
* @param bme.readTemperature() - Temperaturverdien fra BME280-sensoren
*/
void OLED::displayTemp(){
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

/**
*   Viser fuktighet på OLED-skjermen.
*   @param bme.readHumidity() - Fuktighetsverdien fra BME280-sensoren
*/
void OLED::displayHumid(){
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("Fuktighet: ");
  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print(String(bme.readHumidity()));
  display.print(" %"); 
  display.display();
}

/**
*   Viser CO2-nivå på OLED-skjermen.
*   @param sgp.eCO2 - CO2-verdien fra SGP30-sensoren
*/
void OLED::displayCO2(){
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("CO2-nivaa: ");
  display.setTextSize(2);
  display.setCursor(0, 10);
  display.print(String(sgp.eCO2));
  display.print("ppm"); 
  display.display();
}

/**
*   Viser trykknivå på OLED-skjermen.
*   @param bme.readPressure() - Trykknivået fra BME280-sensoren
*/
void OLED::displayPressure(){
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("Trykknivaa: ");
  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print(String(int(bme.readPressure())));
  display.print(" hPa"); 
  display.display();
}

/**
*   Initialiserer OLED-skjermen.
*/
void OLED::initDisplay() {
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
  Serial.println(F("SSD1306 allocation failed"));
  for(;;);
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