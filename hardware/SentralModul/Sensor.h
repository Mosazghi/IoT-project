#ifndef SENSOR_H
#define SENSOR_H

#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include "Adafruit_SGP30.h"

extern Adafruit_BME280 bme;
extern Adafruit_SGP30 sgp;

namespace SENSOR {
    void initSensor();
}
#endif