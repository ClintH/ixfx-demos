# espruino / mag

Sends back a stream of magnetometer data from an Espruino [Puck.js](https://www.espruino.com/Puck.js). [Try online](https://clinth.github.io/ixfx-demos/io/espruino/mag/)

The [Espruino plotter](https://clinth.github.io/ixfx-play/io/espruino-plot/index.html) is
useful for getting a feel for the sensor data.

Read more:
- [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)
- [Puck.js mag event](https://www.espruino.com/Puck.js#magnetometer)
When script runs it sends over a snippet of code which runs on Espruino, stored in `settings.script`. Expanded, the code is below:

```js
// Enable sensor
Puck.magOn(); 
// Listen for event data
Puck.on('mag', xyz => {
  // Send a JSON version of data via Bluetooth
  // - this is how we get data back to the browser
  Bluetooth.println(JSON.stringify(accel));
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
