/**
*   Denne koden henter data fra QR scanneren og skriver det til serial monitor. 
*   Koden er orignalt fra: https://github.com/kanersito16/GM65-ESP32.git 
*
*   @author Abdirahman Ahmed Yusuf 
*   @file scanner.ino
*/
#include "mqtt.h"
#define QR Serial1
#define lys 33 
String qrData;
Mqtt mqtt("abdi", "IOT12345", "sensor");

void getScannData();

void setup(){
  Serial.begin(115200);
  Serial.println("begin");
  mqtt.connect();
  pinMode(lys, OUTPUT); 
  Serial.println("setup light");
  QR.begin(9600, SERIAL_8N1, 26, 27); 
  Serial.println("QR.begin");
}

void loop(){
  getScannData();
  mqtt.subscribe("sensor");
}

void getScannData() {
  if (QR.available()) { // Ser om det er data i bufferet 
    qrData = "";  
    digitalWrite(lys, LOW);
    while (QR.available()) {
      char input = QR.read(); // Leser et char fra bufferet
      qrData += input; 
      delay(5);               
    }
    Serial.println(qrData);
    // mqtt.publish("sensor", qrData);
  }
   digitalWrite(lys, HIGH); 
  delay(5); 
}