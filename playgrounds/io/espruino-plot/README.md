# espruino-plot

Shows data received from an Espruino in a graphical plot and text logger.

## Getting started

1. Power your Espruino device, ensure Bluetooth is enabled on your computer
2. Click 'Connect' in top-right corner
3. Click 'Send' (or CTRL+ENTER) to send code

For reference: <a target="_blank" href="https://www.espruino.com/Puck.js">Puck.js</a>

## Sending data

The Espruino code needs to send back a stringified JSON object with the data to plot. Each field of the object becomes a data series in the plot. Use `Bluetooth.println` for sending the data.

<pre>
// Puck.accel returns an object
Bluetooth.println(JSON.stringify( Puck.accel() } ));

// Puck.light returns a number, so we need to wrap in an object
Bluetooth.println(JSON.stringify( { light: Puck.light() } ));
</pre>

You probably want to repeatedly send data via `Bluetooth.println`:

<pre>
// Send light level every second
setInterval(() => {
  let v = { light: Puck.light() };
  Bluetooth.println(JSON.stringify(v));
}, 1000);
</pre>

## Examples

Send acceleration/gyro readings
<pre>
Puck.accelOn(12.5);
Puck.on('accel', (a) => {
  Bluetooth.println(JSON.stringify(a));
});
</pre>

Send just the gyro's `x` value:
<pre>
Puck.accelOn(12.5);
Puck.on('accel', (a) => {
  let v = {x: a.gyro.x };
  Bluetooth.println(JSON.stringify(v));
});
</pre>

# Good to know

* Code is sent with a suffix so that the Espruino resets itself if the Bluetooth connection is lost. This helps to save battery, but it also means you need to save your code snippet somewhere if you want to keep it.
* It doesn't handle importing any modules `required` by the code.
* Use the official Espruino IDE for better code editing, saving source code to files etc. This is for quick tinkering.