# espruino / led

Demonstrates toggling LEDs, blinking LEDs and using pulse width modulation to fade LEDs on the [Puck.js](https://www.espruino.com/Puck.js).

Read more:
* [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)
* [Puck.js LED](https://www.espruino.com/Puck.js#leds)



## Toggling LEDs

Use Espruino's [digitalWrite](https://www.espruino.com/Reference#l__global_digitalWrite) function to toggle a LED on or off.

The Espruino code is:
```js
// Turn LED1 on (could also use LED2 or LED3)
digitalWrite(LED1, 1);

// Turn LED1 off
digitalWrite(LED1, 0);
```

To send this via ixfx, this script uses a function:

```js
const setLed = (pinName, on) => {
  const { puck } = state;
  if (!puck) return;
 
  const js = `digitalWrite(${pinName}, ${on ? `1` : `0`})\n`;
  puck.write(js);
};

// Turn LED1 on (could also use LED2 or LED3)
setLed(`LED1`, true);

// Turn LED1 off
setLed(`LED1`, false);
```

## Blinking LEDs

Blinking is nothing more than turning on and off at specified rates. Blinking can be done on the Espruino itself or from the browser. Running the code on the microcontroller is more performant, but perhaps less flexible.

[See the Espruino tutorial](https://www.espruino.com/Flashing+Lights) for some different approaches for blinking.

A simple example of code to run on the Espruino, blinking at a rate of 500ms:

```js
let led1State = false;
function toggle1() {
  led1State = !led1State;
  digitalWrite(LED1, led1State);
}
setInterval(toggle1, 500);
```

In the sample sketch, the blinking is instead steered from the browser, using a loop to turn it on and off.

## Pulse width modulation

[Pulse width modulation](https://www.espruino.com/PWM) toggles a digital pin on and off so fast it can be perceived as being a higher or lower intensity. When used with an LED, this effectively changes the brightness of an LED.

In Espruino, [analogWrite](https://www.espruino.com/Reference#l__global_analogWrite) is way of doing so. The pulse width modulation amount is a value given in 0..1, where 0 is off and 1 is fully on. 0.5 then equates to 50% intensity.

Espruino code:
```js
// 50% pulse width modulation
analogWrite(LED1, 0.5);
```

In the example sketch, a helper function (`setLedPwm`) is used to send this code to the Espruino.

With LEDs, the perceived brightness does not necessarily correspond linearly to the pulse-width moduation amount. In certain ranges or lighting conditions, changes PWM amount can seem to have no apparent effect.

Because LEDs are so intense, using the silicon cover of the Puck.js, a piece of paper or something translucent is useful for physically 'scaling' the output.

## Things to try

### On the Espruino

* Integrate with the button, allowing each LED to be turned on in turn, and then turning them all off.
* Control LED brightness (via PWM) according to the gyroscope value
* Make a blink function that takes a 'speed' parameter.

### With the browser too

* Modulate PWM over time. Ixfx's [envelopes](https://clinth.github.io/ixfx-docs/modulation/envelope/) and [oscillators](https://clinth.github.io/ixfx-docs/modulation/oscillator/) would be useful
* Experiment mixing colours between the three LEDs. ixfx's [colour module](https://clinth.github.io/ixfx-docs/types/colour/#parsing) can help you parse and interpolate colours to get red, green and blue values.

## Read more

* [Espruino Pulse width modulation](https://www.espruino.com/PWM)
* [Espruino analogWrite](https://www.espruino.com/Reference#l__global_analogWrite) (for PWM)
* [Espruino digitalWrite](https://www.espruino.com/Reference#l__global_digitalWrite) (for toggling LEDs)
