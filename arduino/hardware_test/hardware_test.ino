#include "MultiStepperLite.h"

// Pin Assignments
constexpr uint8_t PIN_BUTTON_1          = 2;
constexpr uint8_t PIN_BUTTON_2          = 3;
constexpr uint8_t PIN_STEPPER_ENABLE    = 6;
constexpr uint8_t PIN_STEPPER_DIRECTION = 4;
constexpr uint8_t PIN_STEPPER_PULSE     = 5;
constexpr uint8_t PIN_SHOE_LEFT         = 7;
constexpr uint8_t PIN_SHOE_RIGHT        = 8;

// Configuration
constexpr size_t  SERIAL_BUFFER_SIZE   = 128;
constexpr int32_t STEPS_PER_REVOLUTION = 6400;
constexpr uint8_t MOTOR_1              = 0;

MultiStepperLite steppers(1);

// Actions
void actionLedOn();
void actionLedOff();
void actionLeftShoeUp();
void actionLeftShoeDown();
void actionRightShoeUp();
void actionRightShoeDown();
void actionStepper();
void actionStepperForward();
void actionStepperBackward();

struct Action {
  const char *name;
  void (*func)();
};

const Action actions[] = {
  { "led-on",           actionLedOn           },
  { "led-off",          actionLedOff          },
  { "left-shoe-up",     actionLeftShoeUp      },
  { "left-shoe-down",   actionLeftShoeDown    },
  { "right-shoe-up",    actionRightShoeUp     },
  { "right-shoe-down",  actionRightShoeDown   },
  { "stepper",          actionStepper         },
  { "stepper-forward",  actionStepperForward  },
  { "stepper-backward", actionStepperBackward },
};

constexpr size_t ACTION_COUNT = sizeof(actions) / sizeof(Action);

/******************
  Core
*******************/

void setup() {
  Serial.begin(9600);
  while (!Serial) {}

  setupPins();
  setupSteppers();
}

void loop() {
  serialTick();
  steppers.do_tasks(micros());
}

/******************
  Setup
*******************/

void setupPins() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  pinMode(PIN_BUTTON_1, INPUT_PULLUP);
  pinMode(PIN_BUTTON_2, INPUT_PULLUP);

  pinMode(PIN_STEPPER_ENABLE,    OUTPUT);
  pinMode(PIN_STEPPER_DIRECTION, OUTPUT);
  pinMode(PIN_STEPPER_PULSE,     OUTPUT);

  pinMode(PIN_SHOE_LEFT,  OUTPUT);
  pinMode(PIN_SHOE_RIGHT, OUTPUT);
  digitalWrite(PIN_SHOE_LEFT,  HIGH);
  digitalWrite(PIN_SHOE_RIGHT, HIGH);
}

void setupSteppers() {
  digitalWrite(PIN_STEPPER_ENABLE,    LOW);
  digitalWrite(PIN_STEPPER_DIRECTION, LOW);
  steppers.init_stepper(MOTOR_1, PIN_STEPPER_PULSE);
}

/******************
  Action Handlers
*******************/

void actionLedOn() {
  digitalWrite(LED_BUILTIN,    HIGH);
  digitalWrite(PIN_SHOE_RIGHT, LOW);
  Serial.println("led-on");
}

void actionLedOff() {
  digitalWrite(LED_BUILTIN,    LOW);
  digitalWrite(PIN_SHOE_RIGHT, HIGH);
  Serial.println("led-off");
}

void actionLeftShoeUp() {
  digitalWrite(PIN_SHOE_LEFT, HIGH);
  Serial.println("left-shoe-up");
}

void actionLeftShoeDown() {
  digitalWrite(PIN_SHOE_LEFT, LOW);
  Serial.println("left-shoe-down");
}

void actionRightShoeUp() {
  digitalWrite(PIN_SHOE_RIGHT, HIGH);
  Serial.println("right-shoe-up");
}

void actionRightShoeDown() {
  digitalWrite(PIN_SHOE_RIGHT, LOW);
  Serial.println("right-shoe-down");
}

void actionStepper() {
  steppers.start_finite(MOTOR_1, 4000, STEPS_PER_REVOLUTION);
  Serial.println("stepper");
}

void actionStepperForward() {
  digitalWrite(PIN_STEPPER_DIRECTION, LOW);
  Serial.println("stepper-forward");
}

void actionStepperBackward() {
  digitalWrite(PIN_STEPPER_DIRECTION, HIGH);
  Serial.println("stepper-backward");
}

/******************
  Serial
*******************/

static uint8_t bufferIndex = 0;
static char    message[SERIAL_BUFFER_SIZE];
static bool    messageReady = false;

void serialTick() {
  while (Serial.available() > 0 && !messageReady) {
    serialReadMessage();
  }
  if (messageReady) {
    serialParseMessage();
  }
}

void serialReadMessage() {
  char c = Serial.read();
  if (c == '\n') {
    message[bufferIndex] = '\0';
    messageReady = true;
    bufferIndex = 0;
  } else if (bufferIndex < SERIAL_BUFFER_SIZE - 1) {
    message[bufferIndex++] = c;
  } else {
    bufferIndex = 0;
    Serial.println("buffer overflow!!!");
  }
}

void serialParseMessage() {
  messageReady = false;
  for (size_t i = 0; i < ACTION_COUNT; i++) {
    if (strcmp(actions[i].name, message) == 0) {
      actions[i].func();
      return;
    }
  }
  Serial.print("unsupported message: ");
  Serial.println(message);
}
