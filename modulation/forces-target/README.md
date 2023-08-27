# forces-target

[Try demo online](https://clinth.github.io/ixfx-demos/modulation/forces-target/)

This sketch uses ixfx's `Forces` module to move an element to a target point (in
this case, where someone has clicked).

See also:
* [ixfx forces](https://clinth.github.io/ixfx-docs/modulation/forces/)

## Targeting

In `state`, _targetPos_ _position_ and _velocity_ are stored. The latter two are
updated in `update`. _targetPos_ is set based on pointer events.

ixfx's `Force.targetForce` is used in `update()` to compute a new position and
apply acceleration to velocity.

```js
const update = () => {
  const { target, dragForce } = settings;
  const { targetPos, position, velocity } = state;

  // Apply targetForce
  const t = Forces.apply(
    { velocity, position },
    // Push towards target
    Forces.targetForce(targetPos, target),
    dragForce,
  );

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(t.position ?? Points.Empty);

  // Set to state
  saveState({
    velocity: t.velocity ?? Points.Empty,
    position: posAfterWrap,
  });
};
```

In `use()`, a helper function is used to move the element according to the
current state.

# Things to try

- Try different dynamics with the force settings, or add new forces
- Make it follow your cursor around
