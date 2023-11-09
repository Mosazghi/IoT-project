#include "PIR.h"

/* PIR intervall */
bool startTimer = false;
bool motion = false;
unsigned long lastTrigger = 0;

void PIR::initPIR(const int relayPin) {
    pinMode(relayPin, OUTPUT);
    digitalWrite(relayPin, LOW);
}

void PIR::activatePIR(const int relayPin, unsigned long currentTime, bool incomingPirSensor) {
    if(incomingPirSensor){
        startTimer = true;
        lastTrigger = millis(); // Starter/restarter timer
        digitalWrite(relayPin, HIGH);

    if(digitalRead(relayPin == HIGH) && (motion == false)){
        Serial.println("\tBevegelse detektert -> LYS PÅ...\n");
        motion = true;
    }
  } 
  // Slår av LED om tida har passert den innsatte tida
  if(startTimer && (currentTime - lastTrigger > (timeSeconds*1000))) {
    Serial.println("\tIngen bevegelse detektert -> LYS AV...\n");
    startTimer = false;
    motion = false;
    digitalWrite(relayPin, LOW);
  }
}