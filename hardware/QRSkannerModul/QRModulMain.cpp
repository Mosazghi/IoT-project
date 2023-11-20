/**
 * Programkode for QR-skanneren modulen til prosjektet.
 *
 * @file QRModulMain.cpp
 * @author Abdirahman og Mosazghi, Gruppe IoT prosjekt 3 Gjøvik
 */

#include "MqttIOT.h"
#include "QRSkanner.h"
#include "time.h"

/* Dato konfigurasjon */
const char *ntp = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 0;
struct tm dato;

void setup() {
  Serial.begin(115200);
  QRObj.begin(9600, SERIAL_8N1, 26, 27); // Initialisere QR-skanneren
  MQTT::mqttInit();                      // Initialisere MQTT
  configTime(gmtOffset_sec, daylightOffset_sec, ntp); // Konfigurere tid
}

void loop() {
  if (!client.connected()) {
    MQTT::mqttReconnect();
  }

  client.loop(); // La MQTT kjøre
  QR::getQR();   // "Lytte" til nye QR-skans.
}
