// ESP32-SENDER

// B8:D6:1A:43:81:84 DEVKIT uint8_t broadcastAddress[] = {0xB8, 0x68, 0xE7, 0x30, 0x5A, 0x14};
// E8:68:E7:30:5A:14 WROOM uint8_t broadcastAddress[] = {0xE8, 0x68, 0xE7, 0x30, 0x5A, 0x14};
#include <esp_now.h>
#include <WiFi.h>

#include "PIR_Sensor.h"

#define buttonPin 12

// Setter GPIOs pinner for LED og PIR Motion Sensor
const int motionSensor = 18;

//int buttonState = 0;
unsigned long currentMillis = 0;
unsigned long prevMillis = 0;
unsigned long currentMillis2 = 0;
unsigned long prevMillis2 = 0;

bool startTimer = false;
bool motion = false;
bool pirSensorState = false;


// REPLACE WITH YOUR RECEIVER MAC Address
uint8_t broadcastAddress[] = {0xE8, 0x68, 0xE7, 0x30, 0x5A, 0x14};
//uint8_t broadcastAddress[] = {0xB8, 0x68, 0xE7, 0x30, 0x5A, 0x14};


// Structure example to send data
// Must match the receiver structure
typedef struct struct_message {
  String stateMessage;
  bool sendingPirSensor;
  // int sendingButtonState;
} struct_message;

// Create a struct_message called myData
struct_message myData;

esp_now_peer_info_t peerInfo;

// callback when data is sent
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}

void IRAM_ATTR detectsMovement() {
  myData.sendingPirSensor = true;
}
 
void setup() {
  // Init Serial Monitor
  Serial.begin(115200);

  pinMode(motionSensor, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
 
  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Once ESPNow is successfully Init, we will register for Send CB to
  // get the status of Trasnmitted packet
  esp_now_register_send_cb(OnDataSent);
  
  // Register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;  
  peerInfo.encrypt = false;
  
  // Add peer        
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }
}
 
void loop() {
  // Set values to send
  currentMillis = millis();
  currentMillis2 = millis();
  esp_err_t result;

  if(currentMillis - prevMillis > 2000){
    //myData.sendingPirSensor = (digitalRead(motionSensor) == HIGH)? true : false;
    myData.sendingPirSensor = digitalRead(motionSensor);
      /*PIR-sensor*/
    // Send message via ESP-NOW
    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
    prevMillis = currentMillis;
    if (result == ESP_OK) {
    Serial.println("Sent with success");
    Serial.print("Status:");
    Serial.println(myData.sendingPirSensor);
    }
    else {
      Serial.println("Error sending the data");
    }
  }
}
