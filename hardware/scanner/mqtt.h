#ifndef MQTT_H
#define MQTT_H

#include "Arduino.h"

class Mqtt {
    private:    
        const char* ssid;
        const char* password;
        const char* mqtt_server;
    public:
        Mqtt(const char* ssid, const char* password, const char* mqtt_server);
        void connect(const char* ssid, const char* password);
        // void publish(String topic, String message);
        // void subscribe(String topic);
        // void callback(char* topic, byte* payload, unsigned int length);
        // void reconnect();
};

#endif