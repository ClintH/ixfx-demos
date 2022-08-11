/*
  A sketch that dynamically sets the brightness of a PWN LED
  by communication to a JS application over Web Serial and JSON.
  
  You want to have the PWM LED connected to D6 on your board, 
  see the circut diagram in: Wiring Guide.pdf

  If you don't have an LED handy, set LED_PIN to 13 to use the
  on-board LED.
  
  This code assumes you have version 6.19.1 of ArduinoJson.
  It should work with most 6.x versions, but that is guaranteed. 

  — Love Lagerkvist, 220114, Malmö Universitet
*/

#include <ArduinoJson.h>

// Initializing LED Pin
const byte LED_PIN = 6;

// Relative brightness of LED (0..1).
// Initialise at 0, value is updated by
// received JSON messages.
float LEDBrightness = 0;

void setup() {
    // Declaring the digital LED pin as output
    // For more inforamation o this, see
    // https://docs.arduino.cc/learn/microcontrollers/digital-pins
    pinMode(LED_PIN, OUTPUT);

    // Setup the serial
    Serial.begin(9600);

    // Wait for serial port to be initalised
    while (!Serial) continue;
}

void readJsonFromSerial() {
    /* Use https://arduinojson.org/v6/assistant/ to get size of buffer
       Here we assume the JSON { "brightness": {0-255} } */
    StaticJsonDocument<32> jsonInput;

    // We can read directly from Serial using ArduinoJson!
    DeserializationError jsonError = deserializeJson(jsonInput, Serial);

    if (jsonError) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(jsonError.f_str());
        return;
    }

    // deserializeJson puts the deserialized json back into the variable
    // `jsonInput`, after which we can extract values at will.
    LEDBrightness = jsonInput["brightness"];
}

void loop() {
    readJsonFromSerial();

    analogWrite(LED_PIN, LEDBrightness*255);
}
