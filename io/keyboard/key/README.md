# key

Demonstrates tracking the state of arbitrary keys.

State is tracked with the following type:

```js
/**
 * @typedef KeyState
 * @property {boolean} pressed
 * @property {boolean} repeating
 * @property {number} lastPress
 * @property {number} lastRelease
 * @property {number} startPress
 */
```

i.e.:

```js
const exampleKeyState = {
  pressed: true,
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

## Things to try
* Can you make the box a toggle instead? One press turns it on, another turns it off?
* Can the length of press be used in the expression of the box?
* Can the interval between presses be used? (for example with an [interval tracker](https://clinth.github.io/ixfx-docs/data/trackers/#intervals))