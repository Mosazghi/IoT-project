/**
*   Kobler ESP32 til WiFi.
*
*   @file WiFiIOT.cpp
*   @author Mosazghi
*/
#include "WiFiIOT.h"

WiFiClient espClient; // WiFi-klient

/**
*   Initialiserer WiFi
*/
void wifiInit() {
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
