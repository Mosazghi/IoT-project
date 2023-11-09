#ifndef ESPNOW_H
#define ESPNOW_H

// ESP32-RECEIVER
#include <esp_now.h>

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

namespace ESPNOW{
    // callback function that will be executed when data is received
  void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
    memcpy(&myData, incomingData, sizeof(myData));
    incomingPirSensor = myData.sendingPirSensor;
    incomingMessage = myData.stateMessage;
    Serial.print("Bytes received: ");
    Serial.println(len);
  }

  void initEspNow() {
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info
  esp_now_register_recv_cb(OnDataRecv);
  }
}
#endif