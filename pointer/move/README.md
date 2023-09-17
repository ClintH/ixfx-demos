# move

Based on /starters/thing, 'move'  demonstrates decoupling of thing state with the sketch state, having its own update logic and visual expression.

In this case, it's a shape that grows with pointer movement, shrinking of its own accord.

Things to try:
* Have the thing slowly drift down the screen, the speed determined by mass
* Using another input, calculate an 'updraft' value which pushes element up
* Make the element draggable, updating the `position` property
* What if there were many Things, all responding in their own way? Eg perhaps each one has a 'strength', assigned randomly when created. This in turn might moderate how state values are folded in