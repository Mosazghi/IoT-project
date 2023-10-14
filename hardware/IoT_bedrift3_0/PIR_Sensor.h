
// Innsatt tid(sekunder) fra bruker på hvor lenge lyset skal være på
#define timeSeconds 5

// Setter GPIOs pinner for LED og PIR Motion Sensor
const int led = 18;
const int motionSensor = 19;

unsigned long currentTime = millis();
unsigned long lastTrigger = 0;
boolean startTimer = false;
boolean motion = false;

void IRAM_ATTR detectsMovement() {
  digitalWrite(led, HIGH);
  startTimer = true;
  lastTrigger = millis(); // Starter/restarter timer
}