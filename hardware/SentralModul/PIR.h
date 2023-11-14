#ifndef PIR_H
#define PIR_H
#include <Arduino.h>

const int timeSeconds = 5;

namespace PIR {
    void initPIR(const int relayPin);
    void activatePIR(const int relayPin, unsigned long currentTime, bool incomingPirSensor);
}

#endif