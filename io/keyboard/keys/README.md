# keys

Demonstrates tracking the state of arbitrary keys. If you just want to work with a single key, see the `key` demo.

State is tracked with the following type:

```js
// Whether key is being pressed
pressed: boolean
// Number of times key has been pressed
count: number
// True if key is being held
// if pressed = true and repeating = false, it means it's the key has _just_ been pressed for the first time.
repeating: boolean
// Timestamp when key was last in the pressed state
// if a key is being held, this number will match change
lastPress: number
// Timestamp when key was first pressed down 
// If a key is being held, this number doesn't change
startPress:number
// Timestamp when key was last released
lastRelease: number
```

i.e.:

```js
const exampleKeyState = {
  pressed: true,
  count: 0,
  repeating: false,
  lastPress: performance.now(),
  lastRelease: 0,
  startPress: performance.now()
}

if (exampleKeyState.pressed) ...
```

Define which keys to track in `settings`. In the example, only 'f' is tracked:

```js
const settings = Object.freeze({
  keys: [`f`],
});
```

Add `console.log(evt.key)` in the _keydown_ event handler to find out the key
code for the key you're interested in.

In `use()`, read back the state of keys you're interested in:

```js
// Get state of 'f'
const s = keyStates.get(`f`);
if (s === undefined) return; // No state for key
```

In the demo we're dumping the state of all the tracked keys, but you more likely want something like the above - to work with keys in different ways.

## Things to try
* Can you make the box a toggle instead? One press turns it on, another turns it off?
* Can the length of press be used in the expression of the box?
* Can the interval between presses be used? (for example with an [interval tracker](https://clinth.github.io/ixfx-docs/data/trackers/#intervals))