# led pwm

This shows how to receive data from a microcontroller, sent as JSON.

Setup
1. Wire up a LED according to the diagram found under `arduino` (by default the in-build LED is used)
2. Load the provided Arduino sketch on to your microcontroller
3. Make sure the pin number corresponds to the LED
4. Upload to your microcontroller

In this demo, a relative value of 0..1 is sent to the microcontroller which is then mapped to 0..255 PWM, changing LED brightness.

Things to try:
* Rather than directly controlling the LED, use a sent value as a modulator, for example affecting how much the LED responds to some other sensor value.
* Send a more complicated data to the Arduino, for example to control two LEDs. You'll have to mess a bit with the Arduino code and pay attention to the size of the data

See also
* joystick: receiving JSON from a microcontroller