# cursor

Basic demo which moves an element using cursor key press events.

It shows how to keep track of the state of keys via `keydown` and `keyup` events. This allows logic based on multiple keys (eg, pressing UP and LEFT at the same time) instead of processing keys individually. 

# Things to try

* Make it pick up speed the longer you continuously hold any cursor key
* Make it wrap around or stop at the edge of the viewport
* Rather than directly set the position of `thingEl`, make modify a 'target position' and interpolate towards it. (see _geometry/point-interpolate_ demo)
* Change shadow position according to direction