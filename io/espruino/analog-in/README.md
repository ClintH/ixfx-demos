# espruino / analog in

Sends back a stream of analog input from a 
[Pico](http://www.espruino.com/Pico).

- [Try demos online](https://clinth.github.io/ixfx-demos/io/)
- [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)

Read more:

- [ixfx Espruino module](https://clinth.github.io/ixfx/modules/Io.Espruino.html)


`scripts.poll` & `scripts.stream` as given as two examples for either polling
data on-demand, or streaming it back continuously. In `settings.script`, we can easily switch between which of those scripts is loaded when we first connect to the Pico.

Here are more readable, expanded versions so you can see what's going on.

`scripts.poll`:

```js
// This code runs on the Espruino
function sampleData() {
  const data = [analogRead(A0), analogRead(A3), analogRead(A5)];
  USB.println(JSON.stringify(data));
}
```

With this version, we define a function that sends a JSONified array of analog values. Which pins to read is up to you, this demo uses A0, A3 and A5. At some other point, we'd need to write to the Espruino, calling `sampleData()`.

In this demo, we do so when the 'Request data' button is clicked:

```js
document.getElementById(`btnRequest`)?.addEventListener(`click`, () => {
  const { espruino } = state;
  espruino?.write(`sampleData()\n`);
});
```

The other example is `scripts.stream`:

```js
// This code runs on the Espruino
function sampleData() {
  const data = [analogRead(A0), analogRead(A3), analogRead(A5)];
  USB.println(JSON.stringify(data));
}
setInterval(sampleData, 2000);
```

The streaming example is essentially the same as polling, but we use `setInterval` to re-run the function every 2 seconds. A benefit of pushing data from the Espruino is that we don't have to keep requesting it. This cuts down on the amount of data being passed back and forth.

An even smarter approach would be to track values on the Espruino and only send data back over USB when necessary. For example, send the data only when a certain threshold is reached, or doing averaging on the Espruino before sending back.

# Things to try

- [Normalise](https://clinth.github.io/ixfx-docs/data/normalising/) data to
  relative values
- [Average](https://clinth.github.io/ixfx-docs/data/averaging/) data to smooth
  out jitter
