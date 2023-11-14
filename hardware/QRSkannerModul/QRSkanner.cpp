#include "QRSkanner.h"

/**
*   Henter QR-kode fra QR-skanneren og sender den til MQTT-brokeren
*/
void QR::getQR() {
  String QRdata;
  if (QRObj.available()){
    while (QRObj.available()) {
      char input = QRObj.read();  
      QRdata += input;
      delay(5);
    }
    Serial.println(QRdata);
    sendJson(QRdata, dato, client, TOPIC);
    Serial.println();
  }
  QRdata = "";
  delay(5);
}