# point-angle-avg

Demonstrates averaging a computed value over a time horizon. In this case, we calculate the angle of movement continuously, and report the average.

Calculating the average angle can be a challenge because of the cross over between 360/0. This demo doesn't handle this case, so when moving to the right on the horizontal, it will fail wildly.

Guides
* [Points guide](https://clinth.github.io/ixfx-docs/types/geometry/point/)
* [Trackers guide](https://clinth.github.io/ixfx-docs/data/trackers/)

APIs
* [Data.pointTracker](https://clinth.github.io/ixfx/functions/Trackers.points.html)
* [Data.numberTracker](https://clinth.github.io/ixfx/functions/Trackers.number.html)
* [Geometry.Points](https://clinth.github.io/ixfx/modules/Geometry.Points.html)