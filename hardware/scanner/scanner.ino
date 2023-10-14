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

void setup(){
  Serial.begin(115200);
  pinMode(lys, OUTPUT); 
  QR.begin(9600, SERIAL_8N1, 26, 27); // Definimos el puerto serial del QR
}

void getScannData() {
  if (QR.available()) { // Ser om det er data i bufferet 
    qrData = "";  
    digitalWrite(lys, HIGH); 
    while (QR.available()) {
      char input = QR.read(); // Leser et char fra bufferet
      qrData += input; 
      delay(5);               
    }
    Serial.println(qrData);
  }
  digitalWrite(lys, LOW);
  delay(5); 
}

void loop(){
  getScannData();
}