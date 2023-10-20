#include "MqttIOT.h"
#define QR Serial1
#define TOPIC "qr"

String QRdata;

void setup() {
  Serial.begin(115200);
  QR.begin(9600, SERIAL_8N1, 26, 27); // Intialize QR scanner
  mqttInit();
}

void getQR();

void loop() {
   if (!client.connected()) {
    mqttReconnect();
  }
  client.loop();
  
  getQR();
}

void getQR() {
  if (QR.available()){
    while (QR.available()) 
    {
      char input = QR.read(); 
      // Serial.print(input);    
      QRdata += input;
      delay(5);
    }
    Serial.println(QRdata);
    client.publish(TOPIC,QRdata.c_str());
    Serial.println();
  }
  QRdata = "";
  delay(5);
}