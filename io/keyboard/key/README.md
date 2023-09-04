# key

Demonstrates tracking the state of a key. Look at the `keys` demo if you want to keep track of several keys.

The settings of the sketch looks like:
```
// Key to monitor
key: `f`,

// Function to update HTML element
info: Util.textContent(`#info`),

// How often to update visuals based on state
updateIntervalMs: 100
```

State is tracked with the following type:

```js
pressed: boolean
repeating: boolean
lastPress: number
lastRelease: number
startPress:number
```

`keydown` and `keyup` events are used to update the state. This allows us to track whether a key is being pressed, and when its state was changed.

A loop runs, calling `use()` to update the visual status based on the current state.

## Things to try
* Can you make the box a toggle instead? One press turns it on, another turns it off?
* Can the length of press be used in the expression of the box?
* Can the interval between presses be used? (for example with an [interval tracker](https://clinth.github.io/ixfx-docs/data/trackers/#intervals))