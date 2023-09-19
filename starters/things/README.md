# things

An extension of the `thing` demo, but this time with multiple things.

This example doesn't really do anything. This is so it's a nice empty place to start from. To see this pattern in action, see ../dom/things.

We define the thing as:

```js
id: string
element: HTMLElement
position: Points.Point
```

In `thing.js` we have code for creating, updating and using the state of things. The main `script.js` orchestrates that, and is the place to handle interaction.