# espruino / button

Sends button press (or release) events from the [Puck.js](https://www.espruino.com/Puck.js).

Read more:
* [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)
* [Puck.js button](https://www.espruino.com/Puck.js#button)
* [Espruino setWatch function](https://www.espruino.com/Reference#l__global_setWatch)

`scripts.trigger` as given as an example for sending data when the button is pressed. It is dynamically sent to the Puck when connected.

Here is a readable, expanded versios so you can see what's going on. It is borrowed [from the Espruino docs](https://www.espruino.com/Puck.js#button).

`scripts.trigger`:
```js
// Initialise an interrupt, calling the function
// whenever the state of `BTN` changes
setWatch(evt => {
  // Copy some values
  const state = { 
    state: evt.state,
    time: evt.time,
    lastTime: evt.lastTime
  };

  // Make a JSON string
  const json = JSON.stringify(state);

  // Send it via Bluetooth
  Bluetooth.println(json);
}, BTN, {edge:"both", debounce:50, repeat:true});

// If Bluetooth disconnects, reset the board
// so the code doesn't run any more. This saves battery.
NRF.on('disconnect', () => reset());
```

 