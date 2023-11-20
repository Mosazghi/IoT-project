/**
 *   Henter QR-kode og sender den til MQTT-brokeren.
 *
 *   @file      QRSkanner.cpp
 *   @author    Abdirahman, Gruppe IoT prosjekt 3 Gjøvik
 */

#include "QRSkanner.h"

/**
 *   Henter QR-kode fra QR-skanneren og sender den til MQTT-brokeren
 */
void QR::getQR() {
  String QRdata;
  if (QRObj.available()) {
    while (QRObj.available()) {
      char input = QRObj.read();
      QRdata += input;
      delay(5);
    }
    sendJson(QRdata, dato, client, TOPIC);
  }
  QRdata = "";
  delay(5);
}