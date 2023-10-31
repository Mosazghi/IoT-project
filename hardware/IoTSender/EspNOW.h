
/* 
  B8:D6:1A:43:81:84 DEVKIT -> uint8_t broadcastAddress[] = {0xB8, 0x68, 0xE7, 0x30, 0x5A, 0x14};
  E8:68:E7:30:5A:14 WROOM -> uint8_t broadcastAddress[] = {0xE8, 0x68, 0xE7, 0x30, 0x5A, 0x14}; // IKKE I BRUK
  40:F5:20:70:19:30 WROOM2 -> uint8_t broadcastAddress[] = {0x40, 0xF5, 0x20, 0x70, 0x19, 0x30};
  */
// RECEIVER MAC Address
uint8_t broadcastAddress[] = {0x40, 0xF5, 0x20, 0x70, 0x19, 0x30};
// uint8_t broadcastAddress[] = {0xE8, 0x68, 0xE7, 0x30, 0x5A, 0x14}; // IKKKE I BRUK!!

// Structure example to send data
// Must match the receiver structure
typedef struct struct_message {
  //String stateMessage;
  bool sendingPirSensor;
} struct_message;

// Create a struct_message called myData
struct_message myData;

esp_now_peer_info_t peerInfo;

// callback when data is sent
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}
