# point-tracker

[Try demo online](https://clinth.github.io/ixfx-demos/data/point-tracker/).

Use [Trackers.points](https://clinth.github.io/ixfx/functions/Trackers.points.html) to monitor the speed of a single pointer. See the _points-tracker_ demo for tracking multi-touch.

Whenever a `pointerdown` happens, we reset the tracker. When `pointermove` events happen, the data is fed to the tracker. The tracker returns some information - how does this new point compare to the initial point, the last point and so on. We save some of this information into the state (`relative`).

In `update()`, we interpolate to the new speed value (if available). The speed information comes via `state.relative`. Once folded-in, we clear out `relative`, ready for the result of the next calculation. 

`update()` gets called in a loop. It decays the current speed value. This is useful since we're only computing values on the basis of `pointermove`. Obviously if there is no movement, there's no `pointermove` event, thus we don't get to properly recalculate speed. By simply decaying `state.speed`, we can let the speed value decay over time.

`use()` shows `state.speed` in a DIV, nothing interesting.

See also:
* [Trackers.points](https://clinth.github.io/ixfx/functions/Trackers.points.html)

## Things to try

* Tweak the sample size of the tracker and see how averaging changes
* Use something other than speed
* Try using `fromInitial` instead of `fromLast`
  