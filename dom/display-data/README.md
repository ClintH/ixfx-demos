# display-data

Demonstrates using [`Dom.DataDisplay`](https://clinth.github.io/ixfx/classes/Dom.DataDisplay.html) to display state.

In the settings, we create the object:
```js
const settings = Object.freeze({
  // Use _false_ for light mode, _true_ for dark
  dataDisplay: new Dom.DataDisplay(false)
});
```

This will add some HTML to your page.

When you want its output to be updated, call `dataDisplay.update`. In this case, we modify the `saveState` function to update every time the state changes

```js
function saveState (s) {
  // Usual state updating
  state = Object.freeze({
    ...state,
    ...s
  });

  // Now update data
  settings.dataDisplay.update(state);
}
```

Read more:
* [Dom.DataDisplay](https://clinth.github.io/ixfx/classes/Dom.DataDisplay.html)

