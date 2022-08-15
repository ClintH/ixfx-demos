/*
  A sketch that dynamically sends the current state of the joystick 
  to a JS application over Web Serial and JSON.
  
  You want to have the joystick to you board see the circut diagram in:
  Wiring Guide.pdf

  This code assumes you have version 16.19.1 of ArduinoJson.
  It should work with most 6.x versions, but that is guaranteed. 

  - Love Lagerkvist, 220117, Malmö University
*/

#include <ArduinoJson.h>

const byte JOYSTICK_PIN_X = A0;
const byte JOYSTICK_PIN_Y = A2;
const byte JOYSTICK_PIN_SWITCH = 2;

int joystickX = 0;
int joystickY = 0;
bool joystickSwitch = 0;

// Only sends data over serial when this variable is true
bool hasChanged = false;

void setup() {
    pinMode(JOYSTICK_PIN_X, INPUT);
    pinMode(JOYSTICK_PIN_Y, INPUT);
    pinMode(JOYSTICK_PIN_SWITCH, INPUT_PULLUP);

    Serial.begin(9600); 
    while (!Serial) continue;
}

void updateJoystick() {
    // read the raw values from the joystick's axis
    int x = analogRead(JOYSTICK_PIN_X);
    int y = analogRead(JOYSTICK_PIN_Y);

    // The button reads 1 when not pressed and 0 when pressed
    // This is a bit confusing, so we compare it to LOW to 
    // effectively flip the bit. I.e., if the button is pressed
    // we turn a 0 into 1, or logical true.
    int sw = digitalRead(JOYSTICK_PIN_SWITCH) == LOW;

    // Are the new readings different than last?
    bool changed = false;
    if (x != joystickX) changed = true;
    if (y != joystickY) changed = true;
    if (sw != joystickSwitch) changed = true;

    // If anything has changed, assign new values
    // and flip the 'hasChanged' flag
    if (changed) {
      joystickX = x;
      joystickY = y;
      joystickSwitch = sw;
      hasChanged = true;
    }
}

void writeJSONToSerial() {
    // Make sure you use the online tool to re-calculate
    // number of bytes if additional fields are added
    // https://arduinojson.org/v6/assistant/#/step1
    
    StaticJsonDocument<56> json;

    json["x"] = joystickX;
    json["y"] = joystickY;
    json["sw"] = joystickSwitch;

    serializeJson(json, Serial);
    Serial.println();
    Serial.flush();
    hasChanged = false;
}

void loop() {
    updateJoystick();
    if (hasChanged) writeJSONToSerial();

    //delay(2000);
}
