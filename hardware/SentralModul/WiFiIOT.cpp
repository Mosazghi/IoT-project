/**
*   Kobler ESP32 til WiFi.
*
*   @file WiFiIOT.cpp
*   @author Mosazghi
*/
#include "WiFiIOT.h"

WiFiClient espClient; // Lager en WiFi-klient

/**
*   Initialiserer WiFi
*/
void wifiInit() {
  delay(10);

  Serial.println();
  Serial.print("Tilkobler til: ");
  Serial.println(SSID);

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi tilkoblet");
  Serial.println(WiFi.localIP());
}
