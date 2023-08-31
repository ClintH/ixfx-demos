# press

Based off `starters/thing`. Demonstrates basic usage of pointerdown/up events. 

In the script we have the settings:
```js
// How quickly to update the state of the thing
thingUpdateSpeedMs: 10,
// Id of the HTML element
thingId: `thing`
```

And the state:
```js
thing: Thing.Thing
```

'thing' is initialised to a new thing at startup, via `Thing.create()`. The script loops, calling `Thing.update()` to compute a new Thing, and setting back into state. We also call `Thing.use()` for the Thing to visually update based on the state.

Whenever there is a _pointerdown_ or _pointerup_ event on the thing element, the script computes a new Thing via `Thing.onPointerEvent()`, which is saved again to state.

One of the problems with this implementation is if:
1. There is a _pointerdown_ on the element, 
2. The pointer moves so it is outside of the element
3. There is a _pointerup_ outside of the element.

In this scenario, the Thing remains in the 'clicked' state. How might you change it so it responds to `pointerup` regardless of where?

## thing.js

`thing.js` is the home of the behaviour. It has a type defined for its state, consisting of:

```js
clicked: boolean
energy: number
position: Points.Point
elementId: string
hue: number
```

* 'clicked' keeps track of whether the thing is currently been clicked. This state is updated via `Thing.onPointerEvent`, which is called from script.js
* 'energy' is a made up number that is meant to model the life-force of the Thing. It rises while the `clicked === true`, and decays on its own accord.
* 'position' is the relative coordinate for where to place the Thing and 'elementId' is the HTML id of the Thing element. 
* 'hue' is the hue for the background colour of the Thing.

`Thing.use` reads properties of the state and update the HTML accordingly.
`Thing.update` computes a new state for the thing based on the state of script.js and its own properties. This is where we make the energy value rise or fall. It's called by script.js, the return result of this function becomes the new Thing for the sketch.

We use some separate settings in thing.js to moderate behaviour, so there's just one place to tweak it to taste.
