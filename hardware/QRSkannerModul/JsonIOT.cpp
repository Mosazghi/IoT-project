/**
*   Koden omskriver dataen til JSON format og sender det til MQTT brokeren.
* 
*   @file JsonIOT.cpp
*   @authors Abdirahman og Mosazghi
*/
#include "JsonIOT.h"
#include "stdlib_noniso.h"

/**
 *   @brief Sender dato og data til MQTT brokeren i Json format
 *
 *   @param data float (sensor data som skal sendes)
 *   @param client Refreanse overført til PubSubClient client i main (MQTT * klient)
 *   @param topic const char* (MQTT topic)
 *   @param time struct tm (datoen til dataen)
 */
void sendJson(String data, struct tm time, PubSubClient &client, const char *topic) {
  // Får tak i tiden
  if (!getLocalTime(&time)) {
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println(&time, "%A, %B %d %Y %H:%M:%S");

  // Skriver ut QR-data
  Serial.print("qr-data: ");
  Serial.println(data);

  // Lager et JSON dokument
  StaticJsonDocument<200> doc;

  // skriver om til tiden til char på timestamp format 
  char timeBuffer[32];
  strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%dT%H:%M:%S", &time);

  // Setter inn QR-data og timestamp i JSON dokumentet
  doc["codeData"] = data;
  doc["timestamp"] = timeBuffer;

  // Serialiserer JSON dokumentet
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  // Skriver ut hvordan JSON dokumentet ser ut
  Serial.println(jsonBuffer);
  Serial.println();

  // Sender JSON dokumentet til MQTT brokeren
  client.publish(topic, jsonBuffer);
}