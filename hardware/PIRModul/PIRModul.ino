// ESP32-SENDER

#include "PirSensor.h"
#include "EspNOW.h"

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
  esp_err_t result;

  if(currentMillis - prevMillis > 200){
    //myData.sendingPirSensor = (digitalRead(motionSensor) == HIGH)? true : false;
    myData.sendingPirSensor = digitalRead(motionSensor);
    prevMillis = currentMillis;
      /*PIR-sensor*/
    // Send message via ESP-NOW
    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
    if (result == ESP_OK) {
    Serial.println("Sent with success");
    // Serial.print("Status:");
    // Serial.println(myData.sendingPirSensor);
    }
    else {
      Serial.println("Error sending the data");
    }
  }
}
