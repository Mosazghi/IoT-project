#ifndef ESPNOW_H
#define ESPNOW_H
#include <esp_now.h>

/* Struktur for data som skal sendes via ESP-NOW */
typedef struct struct_message {
  String stateMessage;
  bool sendingPirSensor;
} struct_message;

struct_message myData;

// Variabler for å motta data fra ESP-NOW
bool incomingPirSensor;
String incomingMessage;

namespace ESPNOW {
/**
 * Callback-funksjon for å motta data
 *
 * @param mac MAC-adressen til enheten som sendte data
 * @param incomingData data som er mottatt
 * @param len lengden på dataen som er mottatt
 */
void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
  memcpy(&myData, incomingData, sizeof(myData));
  incomingPirSensor = myData.sendingPirSensor;
  incomingMessage = myData.stateMessage;
  Serial.print("Bytes received: ");
  Serial.println(len);
}

/* Initalisere ESP-NOW */
void initEspNow() {
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  // Registrerer callback-funksjonen når data mottas over ESP-NOW
  esp_now_register_recv_cb(OnDataRecv);
}
} // namespace ESPNOW
#endif