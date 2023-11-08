#ifndef QRSKANNER_H
#define QRSKANNER_H
#include "JsonIOT.h"
#define QRObj Serial1
#define TOPIC "qr"

extern struct tm dato;
extern String QRdata;
extern PubSubClient client;

namespace QR {
  void getQR();
}

#endif