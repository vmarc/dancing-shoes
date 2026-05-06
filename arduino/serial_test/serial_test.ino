/*
  Serial test
*/

#define BUFFER_SIZE 256

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
  setupPins();
  Serial.println("ready");
}

void loop() {
  tick();
  delay(10);
}

/******************
  Setup
*******************/

void setupPins() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void setupStartBlink() {
  for (int i=0; i < 10; i++) {
    digitalWrite(LED_BUILTIN, HIGH);  
    delay(200);
    digitalWrite(LED_BUILTIN, LOW);  
    delay(200);
  }
}

/******************
  Serial
*******************/

static byte bufferIndex = 0;
static char message[BUFFER_SIZE];
static bool messageReady = false;

void tick() {
  while (Serial.available() > 0 && messageReady == false) {
    readMessage();
  }
  if (messageReady) {
    parseMessage();
  }
}

void readMessage() {
  char receivedChar = Serial.read();
  if (receivedChar != '\n') {
      message[bufferIndex] = receivedChar;
      bufferIndex++;
      if (bufferIndex >= BUFFER_SIZE) {
          Serial.println("buffer overflow!!!");
          bufferIndex = BUFFER_SIZE - 1;
      }
  }
  else {
      message[bufferIndex] = '\0';
      messageReady = true;
      bufferIndex = 0;
  }
}

void parseMessage() {
  messageReady = false;
  if (strcmp("led-on", message)) {
    digitalWrite(LED_BUILTIN, LOW);
  }
  else if (strcmp("led-off", message)) {
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else {
    Serial.print("unsupported message: ");
    Serial.println(message);
  }
}
