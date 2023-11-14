/**
 *   Denne koden får tak i PIR-sensor data og sender det til ESP-NOW mottakeren.
 *
 *   @file       PIRModul.ino
 *   @author     Didier Mupenda
 */

#include "EspNOW.h"
#include "PirSensor.h"

void IRAM_ATTR detectsMovement() { myData.sendingPirSensor = true; }

void setup() {
  Serial.begin(115200);
  pinMode(motionSensor, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);

  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  /** Når ESPnow er initialisert, registrerer vi for sende-callback funksjon
   * (CB) for å få status på sendte pakker
   */
  esp_now_register_send_cb(OnDataSent);

  // Registrerer 'peer'
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;

  // Legger til 'peer'
  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Feilet med å legge til 'peer'");
    return;
  }
}

void loop() {
  currentMillis = millis();
  esp_err_t result;

  if (currentMillis - prevMillis > 200) {
    myData.sendingPirSensor = digitalRead(motionSensor);
    prevMillis = currentMillis;

    // Sende melding til mottaker
    esp_err_t result =
        esp_now_send(broadcastAddress, (uint8_t *)&myData, sizeof(myData));
    if (result == ESP_OK) {
      Serial.println("Sent med suksess!");
    } else {
      Serial.println("Error med sending av data!");
    }
  }
}
