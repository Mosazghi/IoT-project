#ifndef PIR_H
#define PIR_H
#include <Arduino.h>
#define TIME_SECONDS 5
#define RELAY_PIN 18

namespace PIR {
void initPIR();
void activatePIR(unsigned long currentTime, bool incomingPirSensor);
} // namespace PIR

#endif