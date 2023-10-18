#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include "Adafruit_SGP30.h"

#include "PIR_Sensor.h"
#include "OLED_Screen.h"

Adafruit_BME280 bme;
Adafruit_SGP30 sgp;

const long interval = 3;
unsigned long prevMillis = 0;
unsigned long currentMillis = 0;
const int BME280_STATE = 1;
const int SG90_STATE = 2;

int currentState = BME280_STATE;  // Start med å vise temperatur og fuktighet

void setup() {
  Serial.begin(115200);

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  
  bool status = bme.begin(0x76);  
  if (!status) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }

  if (! sgp.begin()){
    Serial.println("Sensor not found :(");
    while (1);
  }

  if (! sgp.IAQmeasure()){
    Serial.println("Measurement failed");
    return;
  }

  /* SETUP for PIR-sensor */
  // Setter PIR detektor sensor til mode INPUT_PULLUP
  pinMode(motionSensor, INPUT_PULLUP);
  // Innebygd Arduino funksjon for å avbryte og endre funskjonen.
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);

  display.clearDisplay();
  display.setTextColor(WHITE);

}


void loop() {

     /*PIR-sensor*/
  currentTime = millis();

  if((digitalRead(led) == HIGH) && (motion == false)) {
    Serial.println("\tBevegelse detektert -> LYS PÅ...\n");
    motion = true;
  }
  // Slår av LED om tida har passert den innsatte tida
  if(startTimer && (currentTime - lastTrigger > (timeSeconds*1000))) {
    Serial.println("\tIngen bevegelse detektert -> LYS AV...\n");
    digitalWrite(led, LOW);
    startTimer = false;
    motion = false;
  }
  /*Serial monitor*/
  Serial.println("\tROOM 100: ");
  Serial.print("\t\tTemperatur = ");
  Serial.print(bme.readTemperature());
  Serial.println("°C");
  Serial.print("\t\tFuktighet = ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");
  Serial.print("\t\teCO2-nivå = ");
  //Serial.print(sgp.eCO2);
  Serial.print(sgp.eCO2); Serial.println(" ppm");
  Serial.print("\t\tTrykknivå = ");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(" hPa");
  Serial.println("------------------------------------------------------------");

    /* OLED-skjermvisning basert på tidsintervall */
    if (currentTime - prevMillis >= (interval * 1000)) {
        prevMillis = currentTime;

        display.clearDisplay();

        if (currentState == BME280_STATE) {
            displayTemp();
            displayHumid();
        } else if (currentState == CO2_PRESSURE_STATE) {
            displayCO2();
            displayPressure();
        }
        display.display();
        // Bytt til neste tilstand
        currentState = (currentState == BME280_STATE) ? SG90_STATE : BME280_STATE;
    }
}

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