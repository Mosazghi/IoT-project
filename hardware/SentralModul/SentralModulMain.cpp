/**
 * Programkode til sentralmodul.
 * Inneholder: OLED, BME280, SGP30, PIR-sensor, ESP-NOW, MQTT
 * 
 * @file   SentralModulMain.cpp
 * @author Mosazghi, Abdirahman, Didier. 
*/

// Biblioteker
#include <Arduino.h>
#include "MqttIOT.h"
#include "JsonIOT.h"
#include "time.h"
#include "Esp32Mottaker.h"
#include "Komponenter.h"

long lastMsg = 0; 
const int INTERVAL = 5000; // 5 sekunders interval for sensoravlesning og sending 

// Dato konfigurasjon 
const char* ntp = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 0;
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
  //mqttInit();
  configTime(gmtOffset_sec, daylightOffset_sec, ntp);

  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);
  
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
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
    // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  sgp.setIAQBaseline(0x8F25, 0x86C0); // Kalibreringsverdier (hentet fra eksempel)
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info
  esp_now_register_recv_cb(OnDataRecv);
  display.clearDisplay();
  display.setTextColor(WHITE);
}


void loop() {
  if (!client.connected()) {
    mqttReconnect();
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
  if (currentTime - prevMillis >= (interval * 1000)) {
    prevMillis = currentTime;

    display.clearDisplay();

    if (currentState == BME280_STATE) {
        displayTemp();
        displayHumid();
    } else if (currentState == SG90_STATE) {
        displayCO2();
        displayPressure();
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