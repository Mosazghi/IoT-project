#include "JsonIOT.h"

/**
*   Sender dato og data til MQTT brokeren i Json format
* 
*   @param data - float (sensor data som skal sendes)
*   @param client - Refreanse overført til PubSubClient client i main (MQTT klient)
*   @param topic - const char* (MQTT topic)
*   @param time - struct tm (datoen til dataen)
*/
void sendJson(float data, struct tm time, PubSubClient &client, const char* topic) {
    // get the time
    if(!getLocalTime(&time)){
        Serial.println("Failed to obtain time");
        return;
    }
    Serial.println(&time, "%A, %B %d %Y %H:%M:%S");
 
    // convert the value to a char array
    char sensorString[8];
    dtostrf(data, 1, 2, sensorString);
    Serial.print("Sensor value: ");
    Serial.println(sensorString);

    // Create the JSON document
    StaticJsonDocument<200> doc;
    
    // Set the values in the document
    char timeBuffer[32];
    strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%dT%H:%M%z", &time);
    doc["timestamp"] = timeBuffer;
    doc["value"] = sensorString;

    // Serialize JSON document
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    // Print the JSON document
    Serial.println(jsonBuffer);
    Serial.println();

    client.publish(topic, jsonBuffer);
}