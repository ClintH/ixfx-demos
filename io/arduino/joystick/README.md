# joystick

This shows how to receive data from a microcontroller, sent as JSON.

Remember that you can't use a serial monitor or upload code whilst connected to
the microcontroller in the browser.

To disconnect the browser, reload the page.

## Setup

1. Wire up a joystick according to the diagram found under `arduino`
2. Load the provided Arduino sketch on to your microcontroller
3. Make sure the pin numbers you have used for x, y and switch correspond to the
   Arduino code
4. Upload to your microcontroller

When data is received in the Javascript side, it is converted to relative units,
where an analog value of 0 equals 0 (0%), 1023 equals 1 (100%). Thus, the
resting value of the joystick in relative units will be around
`{ x: 0.5, y: 0.5 }`.

## Things to try

- Calculate a relative range of -1 to 1 instead of 0 to 1. Thus ~511 would be 0,
  0 would be -1, and 1023 would be 1.
- Make a steerable DOM element
- Use the canvas to make a simple drawing experience
- Change the shape of the data that is sent from the microcontroller, for
  example reading a different sensor. Read the comments in the Arduino sample
  code for tips on this.

## Writing code to microcontroller

The [PlatformIO](https://platformio.org/) extension for VS Code is the
recommended way to write code to your microcontroller. If you haven't already,
[install the extension](https://platformio.org/install/ide?install=vscode).

Once installed:

1. Open 'PIO Home'. You can do so via:

- The VS Code Activity Bar (it's a alien-head sort of logo), or
- CTRL/CMD + SHIFT + P and start typing 'platformio home'.

2. Click 'Open Project', navigate to the where you have ixfx-demos downloaded,
   and then open 'ixfx-joystick' from 'io/arduino/joystick'.

3. The project will automatically fetch the necessary library, and should be
   ready to build

- Build via the tick mark button in the VS Code toolbar, or
- CTRL/CMD + SHIFT + B, or
- CTRL/CMD + SHIFT + P and start typing 'platformio build', or

Alternatively, if you want to use the Arduino IDE, copy the source from
`ixfx-joystick\src\main.cpp` into a new sketch. You will also need to install
the ArduinoJson library, version 6.xx.xx
