# pose-shoulders

Based on the `starters/canvas-thing` demo.

This basic demo demonstrates:
1. Receiving pose data of one or more bodies.
2. Deriving data from raw pose data.
3. Influencing a Thing using some basic physics.

We calculate a 'tilt' value based on the left and right shoulder points. These are averaged across all poses. When calculating angle between points, we get back a value in radians. Playing with the sketch, we figured that the range of values is about -0.5 to 0.5. [`Bipolar.scale`](https://clinth.github.io/ixfx/functions/Data.Bipolar.scale.html) is used to map this range the bipolar range of -1 to 1. [`interpolate`](https://clinth.github.io/ixfx-docs/modulation/interpolate/) is used to smooth this value.

In `thing.js`, the tilt value is applied as a velocity vector to the thing.

Read more:
* [ixfx Bipolar](https://clinth.github.io/ixfx-docs/data/normalising/#bipolar-values)
* [API Bipolar](https://clinth.github.io/ixfx/modules/Data.Bipolar.html)
* [ixfx Interpolate](https://clinth.github.io/ixfx-docs/modulation/interpolate/)

Things to try:
* Using `starters/canvas-things`, adapt the techniques here for many things. The effect will be pronounced when things have random mass values.