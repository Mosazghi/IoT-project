
#define timeSeconds 5

// Set GPIOs for LED and PIR Motion Sensor
const int relayPin = 18;
const int motionSensor = 19;

// Timer: Auxiliary variables
unsigned long now = millis();
unsigned long lastTrigger = 0;
boolean startTimer = false;
boolean motion = false;

// Checks if motion was detected, sets LED HIGH and starts a timer
void IRAM_ATTR detectsMovement() {
  digitalWrite(relayPin, LOW);
  startTimer = true;
  lastTrigger = millis();
}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);
  // PIR Motion Sensor mode INPUT_PULLUP
  pinMode(motionSensor, INPUT_PULLUP);
  // Set motionSensor pin as interrupt, assign interrupt function and set RISING mode
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);
  // Set LED to LOW
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);
}

void loop() {
  // Current time
  now = millis();
  if((digitalRead(relayPin) == LOW) && (motion == false)) {
    Serial.println("MOTION DETECTED!!!");
    motion = true;
  }
  // Turn off the LED after the number of seconds defined in the timeSeconds variable
  if(startTimer && (now - lastTrigger > (timeSeconds*1000))) {
    Serial.println("Motion stopped...");
    digitalWrite(relayPin, HIGH);
    startTimer = false;
    motion = false;
  }
}