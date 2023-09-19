# things

An extension of the `thing` demo, but this time with multiple things.

We define the thing as:

```js
id:string
element: HTMLElement
position: Points.Point
surprise: number
size: number
movement: number
hue:number
```

Note that as we move the cursor around, different Things respond. Each follows the shifting background hue at its own pace.

Key differences: index.html
* Thing elements are created dynamically, so the `<div id="thing"></div>` is removed and CSS altered a little


Key differences: script.js
* `state` is an array of Things, rather than a single thing
* During `setup` we create a fixed set of things. This creates HTML elements as well.
* We want to respond to movement according to the size and position of thing. Now the movement amount is passed to `Thing.onMovement`

Key differences: thing.js
* Thing type has a `size` field, randomly set so there is some variation
* The Thing type has a `movement` field so we can track it per-Thing. This decays over time, and is folded into the `surprise` field (which is expressed as opacity)
* `Thing.onMovement` takes in a thing, a movement amount and set of element ids that cursor is over. It uses this to compute new thing state