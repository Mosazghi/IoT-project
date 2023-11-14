/**
 *   Koden omskriver dataen til JSON format og sender det til MQTT brokeren.
 *
 *   @file JsonIOT.cpp
 *   @authors Abdirahman og Mosazghi
 */

#include "JsonIOT.h"
#include "stdlib_noniso.h"

/**
 *   Sender dato og data til MQTT brokeren i Json format
 *
 *   @param data float (sensor data som skal sendes)
 *   @param client Refreanse overført til PubSubClient client i main (MQTT
 * klient)
 *   @param topic const char* (MQTT topic)
 *   @param time struct tm (datoen til dataen)
 */
void sendJson(float data[], struct tm time, PubSubClient &client,
              const char *topic) {

  // Får tak i tiden
  if (!getLocalTime(&time)) {
    Serial.println("Feilet å hente tid!");
    return;
  }
  // Konverterer float til string
  char temperatureString[8];
  char humidityString[8];
  char co2valString[8];
  char pressureString[8];
  char wattsString[8];

  dtostrf(data[0], 1, 2, temperatureString);
  dtostrf(data[1], 1, 2, humidityString);
  dtostrf(data[2], 1, 2, co2valString);
  dtostrf(data[3], 1, 2, pressureString);
  dtostrf(data[4], 1, 2, wattsString);

  // Lager et JSON dokument
  StaticJsonDocument<200> doc;

  // Setter opp JSON dokumentet og legger til dato
  char timeBuffer[32];
  strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%dT%H:%M:%S", &time);
  doc["timestamp"] = timeBuffer;

  // Lager et JSON objekt og legger til sensor data
  JsonObject sensorJson = doc.createNestedObject("data");
  sensorJson["temperature"] = temperatureString;
  sensorJson["humidity"] = humidityString;
  sensorJson["co2"] = co2valString;
  sensorJson["pressure"] = temperatureString;
  sensorJson["watts"] = wattsString;

  // Serialiserer JSON dokumentet
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  // Sender JSON dokumentet til MQTT brokeren
  client.publish(topic, jsonBuffer);
}