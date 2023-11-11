#include "stdlib_noniso.h"
#include "JsonIOT.h"

/**
*   @brief Sender dato og data til MQTT brokeren i Json format
* 
*   @param data float (sensor data som skal sendes)
*   @param client Refreanse overført til PubSubClient client i main (MQTT klient)
*   @param topic const char* (MQTT topic)
*   @param time struct tm (datoen til dataen)
*/
void sendJson(float data[], struct tm time, PubSubClient &client, const char* topic) {
    // get the time
    if(!getLocalTime(&time)){
        Serial.println("Failed to obtain time");
        return;
    }
    Serial.println(&time, "%A, %B %d %Y %H:%M:%S");
 
    // convert the value to a char array
    char temperatureString[8];
    char humidityString[8];
    char co2valString[8];
    char pressureString[8];
    dtostrf(data[0], 1, 2, temperatureString);
    dtostrf(data[1], 1, 2, humidityString);
    dtostrf(data[2], 1, 2, co2valString);  
    dtostrf(data[3], 1, 2, pressureString); 
    
    Serial.print("Temperature: ");
    Serial.println(temperatureString);
    Serial.print("Humidity: ");
    Serial.println(humidityString);
    Serial.print("CO2-level: ");
    Serial.println(co2valString);
    Serial.print("Pressure: ");   
    Serial.println(pressureString);

    // Create the JSON document
    StaticJsonDocument<200> doc;
    
    // Set the values in the document
    char timeBuffer[32];
    strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%dT%H:%M:%S", &time);
    doc["timestamp"] = timeBuffer;

    // Create a JSON object for the "value" field
    JsonObject sensorJson = doc.createNestedObject("data");
    sensorJson["temperature"] = temperatureString;
    sensorJson["humidity"] = humidityString;
    sensorJson["co2"] = co2valString;
    sensorJson["pressure"] = temperatureString;


    // Serialize JSON document
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    // Print the JSON document
    Serial.println(jsonBuffer);
    Serial.println();

    client.publish(topic, jsonBuffer);
}