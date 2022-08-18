# Code style

## Structure of sketches

All the sketches roughly follow a pattern of a HTML and JS file: `index.html` and `script.js`.

The JS files are organised into main chunks:
* imports: at the top of the file are all the import statements which draw in libraries as needed
* settings: a constant which declares all the settings for the sketch which *do not* change at runtime
  * It's useful to have all these parameters that need tweaking in one centralised spot and properly named
  * Another benefit is you'll get some level of type-checking and warnings if you try to use a setting that does not exist
  * The properties of `settings` should never be changed. Using `Object.freeze()` can enforce that, as shown below.
* state: a variable which changes identity as values change. 
  * Eg, instead of `state.x = 'foo'`, most code will use `state = { ...state, x: 'foo' }`. Note how we don't change (or _mutate_) `state`, but rather define a whole new state which is assigned to `state`. This it the principle of _immutability_.
* updateState(): applies and validates a change to `state`
  * Having a central place where `state` is updated means you can do 'sanity checks' to ensure `state` stays how the rest of your code expects.
* useState(): uses the values in `state` to make some kind of expression, eg drawing to the canvas or updating the DOM
  * When doing animation, `useState()` will likely be called in a tightly-running loop. Otherwise, `useState()` could be called at the end of `updateState()`.
  * Note how the using of state and updating can be decoupled. This is useful when state is being updated at some tempo (eg when an event happens) - but we want to use the state at a different tempo (eg animation)
* setup(): a function that runs when the sketch first loads. Usually wiring up events and initialising a main loop if necessary.

In practice, it looks a bit like this:

```js
import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  updateSpeedMs: 1000,
  remote: new Remote()
});

let state = Object.freeze({
  magicNumber: 0
});

const useState = () => {
  const { magicNumber } = state;

  // Broadcast magic number
  r.broadcast({ magicNumber }); 
}

const setup = () => {
  const { updateSpeedMs, remote } = settings;
  
  // Assign a new random number every `updateSpeedMs`
  setInterval(() => {
    updateState({
      magicNumber: Math.random()
    });
    useState();
  }, updateSpeedMs);
}

function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
```

Note that `updateState` is declared as a function rather than the arrow assignment syntax (`const updateState = () = { ...}`) seen elsewhere. Functions declared using the arrow syntax are only available to code that appears after the definition. If we were to use the arrow syntax, the `updateState` function would have to appear high up in our file, cluttering the more interesting stuff. Thus it's declared via the `function` keyword, so we can throw it at the end of the file.

## Type annotations

You'll note the use of [type annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) throughout the sketches. This is a lightweight way to give hints to your code editor so it in turn can give helpful warnings and better inline documentation. These comments can be deleted, and they have no role during the running of code.

See [TYPING.md](./TYPING.md) to read more.
