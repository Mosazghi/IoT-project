/*
  Kode til ESP32-Receiver
  Inneholder
  - OLED-skjerm, LED-lys og BME280 og SG90-sensor
*/
#include <Arduino.h>
#include "MqttIOT.h"
#include "JsonIOT.h"
#include "time.h"
#include "Esp32Mottaker.h"
#include "Komponenter.h"

// millis 
long lastMsg = 0; 

// tid 
const char* ntp = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 0;
struct tm dato;

// sensor målinger
float temperature = 0;
float humidity = 0;
float pressure = 0;
float co2val = 0;
//float sensorValues[2];
float sensorValues[4];

int runder = 5;

void setup() {
  Serial.begin(115200);
  mqttInit();
  // init and get the time
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
  display.clearDisplay();
  display.setTextColor(WHITE);
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info
  esp_now_register_recv_cb(OnDataRecv);
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
    co2val = sgp.eCO2;
    pressure = bme.readPressure();

    if(runder == 5) {
      sensorValues[0] /= 5;
      sensorValues[1] /= 5;
      sensorValues[2] /= 5;
      sensorValues[3] /= 5;
      runder = 0;

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
      
    runder++;
    sensorValues[0] += temperature;
    sensorValues[1] += humidity;
    sensorValues[2] += co2val;
    sensorValues[3] += pressure;

  }
}