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
#include "const.h"

/* Skjerm tidsintervall */
unsigned long prevTime = 0;
unsigned long currentTime = 0;
unsigned long lastTrigger = 0;

long lastMsg = 0; 
bool startTimer = false;
bool motion = false;


int currentState = BME280_STATE;  // Start med å vise temperatur og fuktighet


// Dato konfigurasjon 
struct tm dato;

// Sensor målinger
float temperature = 0;
float humidity = 0;
float pressure = 0;
float c02 = 0;

float sensorValues[4]; // Array for sensorverdier

int measureCounter = 0; // Teller variabel for å få gjennomsnittlig måling

void setup() {
  Serial.begin(115200);

  MQTT::mqttInit();
  OLED::initDisplay();
  ESPNOW::initEspNow();
  
  configTime(gmtOffset_sec, daylightOffset_sec, ntp);
  WiFi.mode(WIFI_STA);
  
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);
}


void loop() {
  if (!client.connected()) {
    MQTT::mqttReconnect();
  }
  client.loop();

  if (!sgp.IAQmeasure()) {
    Serial.println("Measurement failed");
    return;
  }

  currentTime = millis();
  if(incomingPirSensor){
      startTimer = true;
      lastTrigger = millis(); // Starter/restarter timer
    digitalWrite(relayPin, HIGH);

    if(digitalRead(relayPin == HIGH) && (motion == false)){
      Serial.println("\tBevegelse detektert -> LYS PÅ...\n");
      motion = true;
    }
  } 
  // Slår av LED om tida har passert den innsatte tida
  if(startTimer && (currentTime - lastTrigger > (timeSeconds*1000))) {
    Serial.println("\tIngen bevegelse detektert -> LYS AV...\n");
    startTimer = false;
    motion = false;
    digitalWrite(relayPin, LOW);
  }

      /* OLED-skjermvisning basert på tidsintervall */
  if (currentTime - prevTime >= (interval * 1000)) {
   prevTime = currentTime;

    display.clearDisplay();

    if (currentState == BME280_STATE) {
        OLED::displayTemp();
        OLED::displayHumid();
    } else if (currentState == SG90_STATE) {
        OLED::displayCO2();
        OLED::displayPressure();
    }
    display.display();
    // Bytt til neste tilstand
    currentState = (currentState == BME280_STATE) ? SG90_STATE : BME280_STATE;
  }
  
  /* MQTT */
  long now = millis();
  if (now - lastMsg > 5000) { 
    lastMsg = now;
    
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
      
      sendJson(sensorValues, dato, client, "sensor"); // send to MQTT broker
    }
      
    measureCounter++;

    sensorValues[0] += temperature;
    sensorValues[1] += humidity;
    sensorValues[2] += c02;
    sensorValues[3] += pressure;
  }
}