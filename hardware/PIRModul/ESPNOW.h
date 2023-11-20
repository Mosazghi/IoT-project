#ifndef ESPNOW_H
#define ESPNOW_H

// Mottakerens MAC-adresse
uint8_t broadcastAddress[] = {0x40, 0xF5, 0x20, 0x70, 0x19, 0x30};

/**
 *   Datastruct for meldinger sendt ved hjelp av ESP-NOW
 */
typedef struct struct_message {
  String stateMessage;
  bool sendingPirSensor;
  // int sendingButtonState;
} struct_message;

// Lager en struct_message kalt myData
struct_message myData;
esp_now_peer_info_t peerInfo;

/**
 *   Sender data til mottakeren når den er motatt
 */
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Data sent" : "Data feilet!");
}

#endif