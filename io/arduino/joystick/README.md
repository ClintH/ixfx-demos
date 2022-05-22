# joystick

This shows how to receive data from a microcontroller, sent as JSON.

Setup
1. Wire up a joystick according to the diagram found under `arduino`
2. Load the provided Arduino sketch on to your microcontroller
3. Make sure the pin numbers you have used for x, y and switch correspond to the Arduino code
4. Upload to your microcontroller

In this demo, the x,y and switch data is merely shown in the web page. To do more interesting things with this, change the `update` function. A good first step is to convert the absolute analog reading (0-1023) to a percentage scale of 0...1. Joystick modules will vary on their actual range.

Things to try:
* Calculate a relative range of -1 to 1 instead of 0 to 1023. Thus ~511 would be 0, 0 would be -1, and 1023 would be 1.
* Make a steerable DOM element
* Use the canvas to make a simple drawing experience
* Change the shape of the data that is sent from the microcontroller, for example reading a different sensor. Read the comments in the Arduino sample code for tips on this.

See also
* led-pwm: sending JSON to a microcontroller