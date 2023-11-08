// ESP32-RECEIVER
#include <esp_now.h>
#include <WiFi.h>

// Structure example to receive data
// Must match the sender structure
typedef struct struct_message {
  String stateMessage;
  bool sendingPirSensor;
// int sendingButtonState;
} struct_message;
  // Create a struct_message called myData
  struct_message myData;

  //int incomingButton;
  bool incomingPirSensor;
  String incomingMessage;

  // callback function that will be executed when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  memcpy(&myData, incomingData, sizeof(myData));
  incomingPirSensor = myData.sendingPirSensor;
  incomingMessage = myData.stateMessage;
  Serial.print("Bytes received: ");
  Serial.println(len);
  // Serial.print("Sensor bool: ");
  // Serial.println(incomingPirSensor);
}