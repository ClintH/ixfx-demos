# drag

Demonstrates draggable things. Each thing has an associated HTML element, by default a DIV.

[Try it online](https://clinth.github.io/ixfx-demos/pointer/drag/)

When a _pointerdown_ happens on the thing's element, this initiates the drag. The thing's `dragging` property is set to true, and we record the cursor position where drag has started. As _pointermove_ happens (anywhere), we calculate the x,y offset from the current cursor to where drag started. This offset is added to the thing's starting position to calculate its current position.

This approach to dragging is a good trade-off in terms of implementation complexity and robustness. Fancier approaches might allow for cancelling drags, dragging based on selection state, clamping a drag by some boundary, etc.

As another layer to the demo, as dragging happens, the 'agitation' value for the thing increases, according to its mass. Sort of like winding up a tension. When dragging stops, this decays down to zero. It's visually represented by rotating the element.