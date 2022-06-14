# canvas-things

This starter is useful for particle-type effects. Each 'thing' is updated and drawn separately.

The loop is:
1. Update each thing
2. Clear the canvas
3. Draw each thing

In the demo, each thing consists of an x,y coordinate, scale and a string message. For particle-type effects, it's  common for things to have a coordinate which is updated and used as a basis for drawing, but it's entirely up to you.

You will experience performance issues as the number of things you're updating & drawing increase. Make sure it's not possible for items to be continually being added without a limit, or some logic for deletion.

## Adding things

`addThing` can be called to add a thing, eg:

```
addThing({scale: Math.random(), x: Math.random(), y: Math.random(), msg: `Apple`});
```

In this demo, things are added if the total number of things is under `settings.max`. 

Other approaches might be:
* Add a fixed number of things in `setup()`
* Add a thing based on pointer click
* Add every animation loop, eg to leave a trail of particles following a cursor
* Add at a particular duration
* Add every now and then in animation loop (eg `if (Math.random() > 0.5) addThing(...)`)
  
## Deleting things

Various logics can be applied to delete things:

* Delete when a moving thing falls off the screen
* Delete when a thing gets too old
* Delete the last thing if we have too many things

You can use `deleteThing` to delete something by reference, or `deleteOlderThan` shows how to delete based on age.

In the end, `state.things` is just an array, so you can work with it however.

## Updating things

Every animation loop, `updateThing` is called for each thing. In the demo, this just increments the position. But this is where you put your update logic for how the thing should evolve on its own.

```js
const updateThing = (t) => {
  // Drift thing across screen (using relative coordinates)
  t.x += 0.01;
  if (t.x > 1) t.x = 0;

  t.y += 0.001;
  if (t.y > 1) t.y = 0;
};
```

## Drawing things

Every animation loop `drawThing` is called.

```js
const drawThing = (ctx, t) => {
  // Your drawing logic...
};
```

As shown in this demo, you might want to use `ctx.translate` to temporarily set the origin of the canvas to be the thing's x & y.

## Typing

The example use JSDoc to type the thing at the top of the sketch as:

```
@typedef {{x:number, y:number, scale:number, msg:string, created:number}} Thing
```

It should be pretty straightforward: we're declaring four number fields and one string field. That means a valid thing might look like:
```
const t = {scale: 0.1, x: 0.5, y: 0.5, msg: `hello`, created: Date.now() };
```

But an invalid thing might be:

```
const t = {scale: 0.1, x: true, y: 0.5, msg: 10 };
```

It would be invalid because `x` is supposed to be a number, and `msg` is supposed to be a string.


Setting this up is useful because you can reference 'Thing' elsewhere in comments and your code editor should be smart enough to give you hints or let you know if you're making mistakes.