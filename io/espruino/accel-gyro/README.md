# espruino / accel-gyro

Sends back a stream of acceleration & gyro data from
[Puck.js](https://www.espruino.com/Puck.js). [Try online](https://clinth.github.io/ixfx-demos/io/espruino/accel-gyro/)

The [Espruino plotter](https://clinth.github.io/ixfx-play/io/espruino-plot/index.html) is
useful for getting a feel for the sensor data.

Read more:
- [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)
- [Puck.js accel/gyro sensor](https://www.espruino.com/Puck.js#accelerometer-gyro)
- [Puck.js accelOn event](https://www.espruino.com/Reference#l_Puck_accelOn)

`scripts.poll` & `scripts.stream` as given as two examples for either polling
data and sending it at a slow rate, or streaming it. These scripts are
dynamically sent to the Puck when connected.

Here are more readable, expanded versions so you can see what's going on. They
are borrowed from the Espruino docs.

`scripts.poll`:

```js
// Set a interval, which will loop at a specified rate
setInterval(() => {
  // Read sensor
  const accel = Puck.accel();

  // Make JSON string out of data
  const json = JSON.stringify(accel);

  // Send over Bluetooth
  Bluetooth.println(json);
}, 1000); // Interval of 1000 milliseconds

// If Bluetooth disconnects, reset the board
// so the code doesn't run any more. This saves battery.
NRF.on("disconnect", () => reset());
```

`scripts.stream`:

```js
// Set resolution for accelerometer
// See Espruino docs for info on this
// and other magic numbers
Puck.accelOn(12.5);

// Handle `accel` event
Puck.on("accel", (accel) => {
  // Make JSON string out of data
  const json = JSON.stringify(accel);

  // Send over Bluetooth
  Bluetooth.println(json);
});

// If Bluetooth disconnects, reset the board
// so the code doesn't run any more. This saves battery.
NRF.on("disconnect", () => reset());
```

# Things to try

- [Normalise](https://clinth.github.io/ixfx-docs/data/normalising/) data to
  relative values
- [Average](https://clinth.github.io/ixfx-docs/data/averaging/) data to smooth
  out jitter
