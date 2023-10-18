
// ESP32-RECEIVER
#include <esp_now.h>
#include <WiFi.h>

#define ledPin 26
#define timeSeconds 5

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
  unsigned long currentTime = millis();
  unsigned long lastTrigger = 0;
  bool startTimer = false;
  bool motion = false;

// callback function that will be executed when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  memcpy(&myData, incomingData, sizeof(myData));
  incomingPirSensor = myData.sendingPirSensor;
  incomingMessage = myData.stateMessage;
  // Serial.print("Bytes received: ");
  // Serial.println(len);
  Serial.print("Sensor bool: ");
  Serial.println(incomingPirSensor);
}
 
void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  
  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info
  esp_now_register_recv_cb(OnDataRecv);
}
 
void loop() {

  currentTime = millis();

  if(incomingPirSensor){
      startTimer = true;
      lastTrigger = millis(); // Starter/restarter timer
    digitalWrite(ledPin, HIGH);
    if((digitalRead(ledPin) == HIGH) && (motion == false)) {
      Serial.println("\tBevegelse detektert -> LYS PÅ...\n");
      motion = true;
    }
  } 

  // Slår av LED om tida har passert den innsatte tida
  if(startTimer && (currentTime - lastTrigger > (timeSeconds*1000))) {
    Serial.println("\tIngen bevegelse detektert -> LYS AV...\n");
    startTimer = false;
    motion = false;
    digitalWrite(ledPin, LOW);
  }
}