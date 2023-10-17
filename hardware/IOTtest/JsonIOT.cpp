#include "JsonIOT.h"

/**
*   Koden hentet fra: https://arduinojson.org/v6/error/no-matching-function-for-call-to-converttojson/
*   Skriver om til Json format og returnerer true hvis det lykkes
*
*   @param time - struct tm (tid)
*   @param variant - JsonVariant (json type)
*/
bool convertTmToJson(struct tm time, JsonVariant variant) {
    char buffer[32];
    strftime(buffer, sizeof(buffer), "%A, %B %d %Y %H:%M:%S", &time);
    return  variant.set(buffer);
}

/**
*   Sender dato og data til MQTT brokeren i Json format
* 
*   @param data - float (sensor data som skal sendes)
*   @param client - PubSubClient (MQTT klient)
*   @param topic - const char* (MQTT topic)
*   @param time - struct tm (datoen til dataen)
*/
void sendJson(float data, struct tm time, PubSubClient client, const char* topic) {

    // get the time
    if(!getLocalTime(&time)){
        Serial.println("Failed to obtain time");
        return;
    }

    Serial.println(&time, "%A, %B %d %Y %H:%M:%S");
    Serial.println();
    
    // convert the value to a char array
    char sensorString[8];
    dtostrf(data, 1, 2, sensorString);
    Serial.print("Sensor: ");
    Serial.println(sensorString);
    Serial.println();

    // Create the JSON document
    StaticJsonDocument<200> doc;
    
    // Set the values in the document
    char timeBuffer[32];
    strftime(timeBuffer, sizeof(timeBuffer), "%A, %B %d %Y %H:%M:%S", &time);
    doc["time"] = timeBuffer;
    doc["value"] = sensorString;

    // Serialize JSON document
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    // Print the JSON document
    Serial.println(jsonBuffer);

    //client.publish(topic, jsonBuffer);
}