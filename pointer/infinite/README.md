# infinite

Based on /starters/thing, 'infinite'  demonstrates decoupling of thing state with the sketch state, having its own update logic and visual expression.

In this case, it's a shape that grows with pointer movement, shrinking of its own accord.

An extension of the 'move' sketch, this shows using the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) in order to acheive infinite pointer movement.

Things to try:
* Have the thing slowly drift down the screen, the speed determined by mass
* Using another input, calculate an 'updraft' value which pushes element up
* Make the element draggable, updating the `position` property