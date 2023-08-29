# thing

Demonstrates decoupling of thing state with the sketch state, having its own update logic and visual expression.

There is a `script.js` as usual, but most of the Thing-specific logic is in `thing.js`. There's also a `util.js` for a utility function.

## index.html

We have an empty DIV that is used to represent the thing:

```html
<div id="thing"></div>
```

Some basic styling is used in the HTML file as well.

## script.js

We have settings as usual, where `thingId` matches an id of an element in HTML.

```js
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  thingId: `thing`,
  hueChange: 0.05,
  movementDecay: 0.1
});
```

A State type is defined. In this demo, we have two 'ambient' state things we want to model: the hue of the page and a 'movement' scalar. Movement will be used to gather the intensity of pointer movement. The state also holds the Thing.

The Thing is defined as:
```js
position: Points.Point
surprise: number
elementId: string
hue: number
```

State is initialised, creating a new thing via `Thing.create`.

```js
/** @type {State}*/
let state = Object.freeze({
  thing: Thing.create(settings.thingId),
  hue: 0,
  movement: 0
});
```

In `setup`, we listen for `pointermove` events on the document, accumulating it into `state.movement`. There is a loop that runs that updates the Thing and its visuals.

An `update` function runs continuously, updating `state.hue` and `state.movement`. In this case, hue shifts gradually and the movement value decays to zero over time.

## thing.js

Here we define our Thing. It has a position, a scalar for 'surprise' (which is used to change the opacity of the element), its HTML element id, and its hue.

```js
/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {number} surprise
 * @property {string} elementId
 * @property {number} hue
 */
```

In thing.js we have `create`, `update` and `use` functions.

`create` returns a new Thing, and is called from script.js during initialisation.

`update` synthesizes a new Thing based on an input Thing and the ambient state from script.js. In this case, we:
* interpolate the Thing's hue to track the ambient hue (meaning it lag behind a bit behind the page hue)
* if there's any movement, add that to the 'surprise' value
* decay the 'surprise' amount
* sanity check all the values before returning a new Thing

In script.js, the result of calling `update` is used to set `state.thing`.

`use` updates the visuals of the Thing based on its state.
