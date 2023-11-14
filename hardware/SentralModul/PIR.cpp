/**
 *   Koden initialiserer PIR sensoren og aktiverer den.
 *
 *   @file       PIR.cpp
 *   @author     Dider
 */

#include "PIR.h"
#define RELAY_PIN 18

/* PIR intervall */
bool startTimer = false;
bool motion = false;
unsigned long lastTrigger = 0;

/**
 *  Initialiserer PIR-sensor
 */
void PIR::initPIR() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
}

/**
 *   Aktiverer (om mulig) PIR-sensor
 *
 *   @param unsigned long currentTime - nåværende tid
 *   @param bool incomingPirSensor - boolsk verdi for PIR-sensor
 */
void PIR::activatePIR(unsigned long currentTime, bool incomingPirSensor) {
  if (incomingPirSensor) {
    startTimer = true;
    lastTrigger = millis(); // Starter/restarter timer
    digitalWrite(RELAY_PIN, HIGH);

    if (digitalRead(RELAY_PIN) && !motion)
      motion = true;
  }

  // Slår av LED om tida har passert den innsatte tida
  if (startTimer && (currentTime - lastTrigger > (TIME_SECONDS * 1000))) {
    startTimer = false;
    motion = false;
    digitalWrite(RELAY_PIN, LOW);
  }
}