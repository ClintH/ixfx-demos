# espruino / led-pwm-env

Demonstrates using pulse width modulation to fade an LED on the [Puck.js](https://www.espruino.com/Puck.js) using an [envelope](https://clinth.github.io/ixfx-docs/modulation/envelope/).

[Run this demo online](https://clinth.github.io/ixfx-demos/io/espruino/led-pwm-env/)

Read more:
* [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)
* [Puck.js LED](https://www.espruino.com/Puck.js#leds)


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

* Modulate PWM over time. Rather than the [envelope](https://clinth.github.io/ixfx-docs/modulation/envelope/), try an [oscillators](https://clinth.github.io/ixfx-docs/modulation/oscillator/) or [easing function](https://clinth.github.io/ixfx-docs/modulation/easing/)
* Experiment mixing colours between the three LEDs. ixfx's [colour module](https://clinth.github.io/ixfx-docs/types/colour/#parsing) can help you parse and interpolate colours to get red, green and blue values.

## Read more

* [Espruino Pulse width modulation](https://www.espruino.com/PWM)
* [Espruino analogWrite](https://www.espruino.com/Reference#l__global_analogWrite) (for PWM)
* [Espruino digitalWrite](https://www.espruino.com/Reference#l__global_digitalWrite) (for toggling LEDs)
