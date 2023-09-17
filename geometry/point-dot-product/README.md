# point-dot-product

We can use the _dot product_ to measure whether how similar two vectors are. It helps us to answer, for example, is this object moving in a similar angle to this other object?

In this example we calculate movement using a _pointermove_ event. Any moves less than two units in x or y are ignored. From that, a vector is calculated. This yields, for example `{ x: 1, y: 0 }` for eastward movement, or `{ x: -1, y: -1 }` for north-west movement.

From this vector the dot product is calculated, comparing against a northward vector (`{ x: 0, y: -1 }`).

The result is a single number:
* 1 meaning the two vectors are identical,
* -1 is when the vectors are opposite,
* 0 being the vectors are perpendicular
* All other values being some degree of closeness. Negative values mean it's in an opposite direction.

* Try making different movements to see the resulting dot product.
* Change `settings.compareTo` to different vector
 
Read more:
* [Dot Product (mathinsight.com)](https://mathinsight.org/dot_product)
* [Wikipedia](https://en.wikipedia.org/wiki/Dot_product)

APIs
* [Points.dotProduct](https://clinth.github.io/ixfx/functions/Geometry.Points.dotProduct.html)
* [Geometry.Points](https://clinth.github.io/ixfx/modules/Geometry.Points.html)
* [MouseEvent (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)