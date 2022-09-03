# thing

Demonstrates decoupling of thing state with the sketch state, having its own update logic and visual expression.

It's an empty, skeleton sketch. You can see this pattern used in:
* [canvas-things](../canvas-things/): render things as particle
* [modulation/env-osc](../../modulation/env-osc/): moving a thing based on an envelope and oscillator

'Thing' is defined as follows:

```ts
/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {number} surprise
 * @property {string} elementId
 */
```

This might look like:
```js
const t = {
  position: { x: 0.5, y: 0.5 },
  surprise: 100,
  elementId: `thatHtmlId`
};
```

`generateThing` creates an instance of Thing:

```js
function generateThing () {
  return {
    position: { x: 0.5, y:0.5 },
    elementId: `thing`,
    surprise: 0
  };
}
```

As-written, this will create a Thing with the same properties all the time. If you want to spawn multiple things, this is not useful. Rather, you want to change it to use random values, or to take arguments. For example:

```js
function generateThing (elementId) {
  return {
    position: { x: Math.random(), y: Math.random() },
    elementId,
    surprise: Math.random()
  };
}
```

The sketch's main loop does these steps:
1. Create a new thing with modified values of the existing thing (`loopThing`)
2. Save that thing (`updateState`)
3. Use state (`useState`), which in turn calls `useThing` to use the data in the updated Thing.

To compute new values of the Thing in `loopThing`, these steps are typically followed:

1. Alter properties based on external state/settings.
2. Alter properties based on the state of 'thing'
3. Apply 'intrinsic' logic of thing. Eg, that a variable will always decrease a little each loop
4. Apply sanity checks to properties, making sure they are within proper ranges
5. Return a new thing, wrapping up changed properties.

In action, those steps might look like:

1. Apply acceleration to thing based on current 'wind'
2. Apply acceleration to thing based on its mass
3. 'Age' thing
4. Ensure x,y isn't off the screen
5. Return `{ acceleration, position, age }`