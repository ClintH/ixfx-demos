# espruino / temperature

Read temperature every one second.

Read more:
* [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)
* [Puck.js temperature sensor](https://www.espruino.com/Puck.js#temperature)

The `scripts.poll` script is sent dynamically sent to the Puck when connected.

Here is a more readable, expanded version so you can see what's going on. It's borrowed from the Espruino docs.

`scripts.poll`:
```js
// Set a interval, which will loop at a specified rate
setInterval( () => {
  // Read sensor (returns a number)
  const temp = E.getTemperature();
  
  // Send over Bluetooth
  Bluetooth.println(temp);
}, 1000); // Interval of 1000 milliseconds

// If Bluetooth disconnects, reset the board
// so the code doesn't run any more. This saves battery.
NRF.on('disconnect', () => reset());
```

# Things to try

* [Normalise](https://clinth.github.io/ixfx-docs/data/normalising/) data to relative values
* Can you use the temperature sensor with motion sensors to detect whether the Puck is being held or not?
* Send back gyro information along with temperature to steer the visual effect instead of the pointer



 