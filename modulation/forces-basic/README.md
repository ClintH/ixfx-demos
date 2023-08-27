# forces-basic

Based on a demo by Daniel Shiffman in _The Nature of Code_.

[Try demo online](https://clinth.github.io/ixfx-demos/modulation/forces-basic/)

Overview:
* `update()` runs in a loop at animation speed. It:
 1. applies forces to each particle,
 2. ages particles
 3. removes particles deemed too old
 4. updates state with changed particles
* `use()` draws what ever is in the state. This also runs in a loop at animation speed.
* `spawn()` adds a new particle at the pointer position
* `setup()` connects events and initialises. 

See also:
* [ixfx forces](https://clinth.github.io/ixfx-docs/modulation/forces/)

## Settings

In `settings`, we have a few properties for the visuals:

```js
const settings = Object.freeze({
  maxRadius: 50,
  hue: 200,
  ...
```

The aging factor for each particle (0.99 means it will age by 1% each loop), and a rectangle defining an area of 'liquid'. When a thing hits the liquid, different forces will be applied.

```js
  ...
  aging: 0.99,
  // 'Liquid' area, in relative coordinates
  liquid: {
    width: 1,
    height: 0.5,
    x: 0,
    y: 0.5
  },
```

and the forces:

```
  ...
  // FORCES
  // Wind adds acceleration. Force is dampened by mass
  wind: Forces.accelerationForce({ x: 0.00001, y: 0 }, `dampen`),
 
  // Gravity adds acceleration. Force is magnified by mass
  gravity: Forces.accelerationForce({ x: 0, y: 0.0001 }, `multiply`),
 
  // Friction is calculated based on velocity. Force is magnified by mass
  friction: Forces.velocityForce(0.00001, `multiply`),
 
  // Flip movement velocity if we hit a wall. And dampen it by 10%
  bouncer: Forces.constrainBounce({ width: 1, height: 1 }, 0.9),
 
  // Drag 
  drag:Forces.magnitudeForce(0.1, `dampen`)
});
```

All of the forces are tuned to taste, and worth playing with.

## Types

We use a [type annotation](../../_readmes/typing.md) for the particle:

```js
/**
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Points.Point} velocity
 * @property {number} mass
 * @property {number} life
 */
```

Each particle then has vector position and velocity, along with mass and life.

## Forces

The application of forces (and aging) happens in `onTick()`. Some forces are only
applied if conditions are _true_. For example, wind is only applied if the particle
is outside of the 'liquid' area, while drag is only applied when it is in the liquid.

```js
const changedThings = things.map(t => {
  // Apply forces to `t` in order.
  let withForce = Forces.apply(t,
    gravity,
    Rects.intersectsPoint(liquid, t.position) ? Forces.nullForce : wind,
    friction,
    Rects.intersectsPoint(liquid, t.position) ? drag : Forces.nullForce,
    bouncer
  );
  return {
      ...t,
      ...withForce,
      life: t.life * aging
    };
});
...
```