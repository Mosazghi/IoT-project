#include <Arduino.h>
#include <Adafruit_BME280.h>
#include <Adafruit_Sensor.h>
#include "MqttIOT.h"

long lastMsg = 0;
char msg[50];
int value = 0;

Adafruit_BME280 bme; // I2C

float temperature = 0;
float humidity = 0;

// LED Pin
void setup() {
  Serial.begin(115200);
  mqttInit();

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
    
    test();
    
    temperature = bme.readTemperature();   
    
    // Convert the value to a char array
    char tempString[8];
    dtostrf(temperature, 1, 2, tempString);
    Serial.print("Temperature: ");
    Serial.println(tempString);
    client.publish("test", tempString);

    humidity = bme.readHumidity();
    
    // Convert the value to a char array
    char humString[8];
    dtostrf(humidity, 1, 2, humString);
    Serial.print("Humidity: ");
    Serial.println(humString);
    client.publish("test", humString);
  }
}