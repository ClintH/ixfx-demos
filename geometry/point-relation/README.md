# point-relation

This sketch produces similar outcomes to `pointer-math`. However, in this case, the computation and tracking of points is offloaded to `Points.relation`.

To use: Press and hold mouse button / touch and move. The relation from the start point is shown in the top-left corner.

Whenever there is a _pointerdown_ event, we first convert to relative units (via `Util.relativePos`) and then initalise a new `PointRelation` with [Points.relation](https://clinth.github.io/ixfx/functions/Geometry.Points.relation.html):

```js
// In the pointermove event handler:
const pointerRelative = Util.relativePos(event);
 
saveState({ 
  relationFromPointerDown: Points.relation(pointerRelative) 
});
```

`Point.relation` returns a function which is saved into state. We can then call this function with new coordinates, and get back some kind of relational information. In this sketch, we do this during _pointermove_

```js
const { relationFromPointerDown } = state;

const results = relationFromPointerDown(pointerRelative);
```

Read more:
* [ixfx Guide](https://clinth.github.io/ixfx-docs/types/geometry/point/)
* [Points.relation](https://clinth.github.io/ixfx/functions/Geometry.Points.relation.html)
* [PointRelationResult](https://clinth.github.io/ixfx/types/Geometry.Points.PointRelationResult.html) - describes the data returned by the relation function
* [Points API](https://clinth.github.io/ixfx/modules/Geometry.Points.html)