#include <Arduino.h>
#include <Adafruit_BME280.h>
#include <Adafruit_Sensor.h>
#include "MqttIOT.h"
#include "JsonIOT.h"
#include "time.h"

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
float sensorValues[2];

Adafruit_BME280 bme; // I2C


// LED Pin
void setup() {
  Serial.begin(115200);
  mqttInit();

  // init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntp);

  if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
}

void loop() {
  if (!client.connected()) {
    mqttReconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 5000) { 
    lastMsg = now;
    
    temperature = bme.readTemperature();   
    humidity = bme.readHumidity();
    sensorValues[0] = temperature;
    sensorValues[1] = humidity;

    sendJson(sensorValues, dato, client, "test"); // send to MQTT broker
  }
}