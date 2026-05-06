#include "MultiStepperLite.h"

/******************
  Configuration
*******************/

#define PIN_BUTTON_1          2 
#define PIN_BUTTON_2          3

#define PIN_STEPPER_ENABLE    6
#define PIN_STEPPER_DIRECTION 4
#define PIN_STEPPER_PULSE     5

#define PIN_SHOE_LEFT         7
#define PIN_SHOE_RIGHT        8

#define SERIAL_BUFFER_SIZE    256

#define STEPS_PER_REVOLUTION  6400

#define MOTOR_1               0

MultiStepperLite steppers(1);

/******************
  Setup
*******************/

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
  setupPins();
  setupSteppers();
}

void loop() {
  serialTick();

  uint32_t now = micros();
  steppers.do_tasks(now);
}

/******************
  Setup
*******************/

void setupPins() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);  

  pinMode(PIN_BUTTON_1, INPUT_PULLUP);
  pinMode(PIN_BUTTON_2, INPUT_PULLUP);

  pinMode(PIN_STEPPER_ENABLE, OUTPUT);
  pinMode(PIN_STEPPER_DIRECTION, OUTPUT);
  pinMode(PIN_STEPPER_PULSE, OUTPUT);

  pinMode(PIN_SHOE_LEFT, OUTPUT);
  pinMode(PIN_SHOE_RIGHT, OUTPUT);

  digitalWrite(PIN_SHOE_LEFT, HIGH);  
  digitalWrite(PIN_SHOE_RIGHT, HIGH);  
}

void setupSteppers() {
  digitalWrite(PIN_STEPPER_ENABLE, LOW);  
  digitalWrite(PIN_STEPPER_DIRECTION, LOW);  
  steppers.init_stepper(0, PIN_STEPPER_PULSE);
}

/******************
  Actions
*******************/

struct Action {
  char *name;
  void (*func)(void);
};

Action actions[] = {
  {"led-on", actionLedOn},
  {"led-off", actionLedOff},
  {"left-shoe-up", actionLeftShoeUp},
  {"left-shoe-down", actionLeftShoeDown},
  {"right-shoe-up", actionRightShoeUp},
  {"right-shoe-down", actionRightShoeDown},
  {"stepper", actionStepper},
  {"stepper-forward", actionStepperForward},
  {"stepper-backward", actionStepperBackward},
};

size_t actionCount = sizeof(actions) / sizeof(struct Action);

void actionLedOn(void) {
  digitalWrite(LED_BUILTIN, HIGH);
  digitalWrite(PIN_SHOE_RIGHT, LOW);
  Serial.println("led-on");
}

void actionLedOff(void) {
  digitalWrite(LED_BUILTIN, LOW);
  digitalWrite(PIN_SHOE_RIGHT, HIGH);
  Serial.println("led-off");
}

void actionLeftShoeUp() {
  digitalWrite(PIN_SHOE_LEFT, HIGH);
  Serial.println("left-shoe-up");
}

void actionLeftShoeDown(void) {
  digitalWrite(PIN_SHOE_LEFT, LOW);
  Serial.println("left-shoe-down");
}

void actionRightShoeUp(void) {
  digitalWrite(PIN_SHOE_RIGHT, HIGH);
  Serial.println("right-shoe-up");
}

void actionRightShoeDown(void) {
  digitalWrite(PIN_SHOE_RIGHT, LOW);
  Serial.println("right-shoe-down");
}

void actionStepper(void) {
  steppers.start_finite(MOTOR_1, 4000, STEPS_PER_REVOLUTION);
  Serial.println("stepper");
}

void actionStepperForward(void) {
  digitalWrite(PIN_STEPPER_DIRECTION, LOW);  
  Serial.println("stepper-forward");
}

void actionStepperBackward(void) {
  digitalWrite(PIN_STEPPER_DIRECTION, HIGH);  
  Serial.println("stepper-backward");
}

/******************
  Serial
*******************/

byte bufferIndex = 0;
char message[SERIAL_BUFFER_SIZE];
bool messageReady = false;

void serialTick() {
  while (Serial.available() > 0 && messageReady == false) {
    serialReadMessage();
  }
  if (messageReady) {
    serialParseMessage();
  }
}

void serialReadMessage() {
  char receivedChar = Serial.read();
  if (receivedChar != '\n') {
      message[bufferIndex] = receivedChar;
      bufferIndex++;
      if (bufferIndex >= SERIAL_BUFFER_SIZE) {
          Serial.println("buffer overflow!!!");
          bufferIndex = SERIAL_BUFFER_SIZE - 1;
      }
  }
  else {
      message[bufferIndex] = '\0';
      messageReady = true;
      bufferIndex = 0;
  }
}

void serialParseMessage() {
  messageReady = false;
  boolean actionFound = false;

  for(int i=0; i < actionCount && actionFound == false; i++) {
    if (strcmp(actions[i].name, message) == 0) {
      actionFound = true;
      actions[i].func();
    }
  }
  if (actionFound == false) {
    Serial.print("unsupported message: ");
    Serial.println(message);
  }
}
