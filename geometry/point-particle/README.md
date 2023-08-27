# point-particle

Demonstrate a few basic principles of particle animation. Particles are spawned with each animation loop, and slowly decay. In this example, the age of the particle make the particle fade out in opacity and size. 

All particles are drawn on each loop. This allows us to animate each particle independently. The more particles, the more time will be spent updating and drawing, so if it runs slow, make them age faster, or spawn less per loop.

To help catch programming mistakes, a type is defined, _Particle_. Each particle has a few simple properties, and all are defined on a relative scale of 0..1

```js
/**
 * @typedef Particle
 * @property {number} x
 * @property {number} y
 * @property {number} age
 * @property {number} weight
 * @property {number} intensity
 */
``` 

In the `state` variable, we keep track of the pointer and the particles:

```js
let state = Object.freeze({
  /** @type {Particle[]} */
  particles: [],
  pointer: { x: 0, y: 0 },
  /** @type {boolean} */
  pointerDown: false,
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  }
});
```

Note how the type hints are supplied when declaring _particles_ and _pointerDown_. This helps us to avoid mistakes of assigning the wrong data to them.

There is a main loop, `update()`, which does the following:

1. Ages all particles, removing those that are deemed too old
2. Spawn new particles (based on state of pointer)
3. Apply movement to particles
4. Draw particles

Steps 1-3 draw on values in the settings object, determining how quickly particles age, how many to spawn with each loop etc. Some 'tuning by ear' is needed to balance these values, experiment yourself! :)

When moving particles on the x-axis, we use ixfx's `jitter` function with a gaussian distribution. This tapers off positive/negative jitter so it is less likely.

Canvas composite operations are used to make for some more interesting effects when particles are drawn and when the background is cleared. There's a purposeful trail left behind.