# mirror

## data

Basic 'data mirror' of a slider value to colour saturation

## data-speed

Still a 'data mirror', but using a derived value from slider (speed).

[clamp](https://clinth.github.io/ixfx/functions/Numbers.clamp.html) is used to ensure calculated speed stays within 0..1 range.

## data-speed-dynamics

A 'dynamics mirror' in which the speed of the expression changes is based on the speed of input. Move the slider slowly and it will take longer to reach the target value. Move the slider fast and it will get there quicker.

Here we have to de-couple input and output. A continuous loop runs that calculates the current value not on the slider, but in the result of an [interpolation](https://clinth.github.io/ixfx/functions/Numbers.interpolate.html).

## Read more
* [Numbers.clamp](https://clinth.github.io/ixfx/functions/Numbers.clamp.html)
* [interpolate](https://clinth.github.io/ixfx/functions/Numbers.interpolate.html)