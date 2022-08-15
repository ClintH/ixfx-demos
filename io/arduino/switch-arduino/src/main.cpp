/*
  A sketch that dynamically sends the current state of a switch 
  to a JS application over Web Serial and JSON.
  
  See 'Tact Switch Wiring Guide.svg' for how to wire
  up a basic switch.

  This code assumes you have version 16.19.1 of ArduinoJson.
  It should work with most 6.x versions, but that is guaranteed. 

  Based on Love Lagerkvist's joystick example.
*/

#include <ArduinoJson.h>

const byte SWITCH_PIN = 3;

// Current state of switch
bool switchState = 0;

// Only sends data over serial when this variable is true
bool hasChanged = false;

void setup() {
    pinMode(SWITCH_PIN, INPUT_PULLUP);

    Serial.begin(9600); 
    while (!Serial) continue;
}

void readData() {
    // If pin is HIGH, switch is being pressed
    int sw = digitalRead(SWITCH_PIN) == HIGH;

    // Are the new readings different than last?
    bool changed = false;
    if (sw != switchState) changed = true;

    // If anything has changed, assign new values
    // and flip the 'hasChanged' flag
    if (changed) {
      switchState = sw;
      hasChanged = true;
    }
}

void writeJSONToSerial() {
    // Make sure you use the online tool to re-calculate
    // number of bytes if additional fields are added
    // https://arduinojson.org/v6/assistant/#/step1
    StaticJsonDocument<8> json;

    json["sw"] = switchState;

    serializeJson(json, Serial);
    Serial.println();
    Serial.flush();
    hasChanged = false;
}

void loop() {
    readData();
    if (hasChanged) writeJSONToSerial();

    //delay(2000);
}
