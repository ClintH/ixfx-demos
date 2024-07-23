# forces-accel-particles

[Try demo online](https://clinth.github.io/ixfx-demos/modulation/forces-accel-particles/)

This sketch derives acceleration from pointer movement, which in turn is applied
to the velocity of a bunch of particles.

Particles here are rendered as HTML elements rather than using the canvas.

For a simpler version, see `forces-accel`.

See also:
* [`pointTracker`](https://clinth.github.io/ixfx/functions/Trackers.points.html)
* [ixfx trackers](https://clinth.github.io/ixfx-docs/data/trackers/)
* [ixfx forces](https://clinth.github.io/ixfx-docs/modulation/forces/)

## Tracking pointer movement

A ixfx point tracker is used to average pointer movement over time.

When there is a pointer move event, and a button is being presesed, the event's
movement data is added to the tracker:

```
pointerMovement.seen({x: ev.movementX, y: ev.movementY});
```

When there is a pointer up, the average is extracted, and divided down so it's a
smaller value:

```js
const nfo = pointerMovement.lastResult;

// Divide average's x & y by 500:
const avg = Points.divide(Points.normalise(nfo.fromInitial.average), 500);
```

`avg` is then applied as an acceleration force to all the particles:

```js
const things = state.things.map((t) =>
  Forces.apply(t, Forces.accelerationForce(avg, `dampen`))
);
saveState({ things });
```

And then the tracker reset:

```
pointerMovement.reset();
```
