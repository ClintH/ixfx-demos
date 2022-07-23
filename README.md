# ixfx-demos
 
* [Demos can be run online](https://clinth.github.io/ixfx-demos/)
* [Source code on GitHub](https://github.com/clinth/ixfx-demos/)
* If you find a bug in a demo, please [report it](https://github.com/ClintH/ixfx-demos/issues).

Read more about ixfx:

* [Documentation](https://clinth.github.io/ixfx-docs/)
* [ixfx repository](https://github.com/clinth/ixfx/) 
* [API documentation](https://clinth.github.io/ixfx/)

# Getting started

## Editing and running online

* [Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos) - requires GitHub login
* [Glitch](https://glitch.com/edit/#!/ixfx-demos) - Editing experience not the best

## Editing and running locally

You can get up and running from a ZIP file, or cloning the repository. It's recommended to use [Visual Studio Code](https://code.visualstudio.com) to edit code. All the sketches are set for editing and running code offline - it includes a recent build of the ixfx library.

### ZIP

1. [Download a ZIP of this repository](https://github.com/ClintH/ixfx-demos/archive/refs/heads/main.zip)
2. Unpack it to a place where you can work on the files
  
### Clone

Using `git` or the Github app, clone this repository to a folder. This gives you a local copy of the source, and can be easily updated if the repository changes.

## Running

### Live-Server (VS Code extension)

1. Open up the provided VS Code workspace (`ixfx-demos.code-workspace`)
2. If you have the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension installed, start it (via the `Go Live` button in the VS Code toolbar, for example)
3. Test that the demos work from your local copy

Each sketch is contained in its own folder. Once you're ready to modify, duplicate the folder so you always have the original to go back to if you need. Along your way, make new copies of the sketch folder to keep snapshots of your work.

### browser-sync (Node.js)

If you have Node.js installed, open the VS Code terminal and install:

```
npm install
```

And then to boot up a server, run 

```
npm start
```

This will open a browser at `http://127.0.0.13000`

# Good to know

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

let state = {
  magicNumber: 0
};

const updateState = (newState) => {
  state = Object.freeze({
    ...state,
    ...newState
  });
  useState();
}

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
  }, updateSpeedMs);

}
```



## Type annotations

## Paths

If you move the folder within the directory structure, you may need to modify the HTML and JS files to correct the pathing.

Consider `easing-tick`, which is contained in `modulation`:

```
+ dom
+ flow
+ modulation
 + easing-tick
 + easing-timer
 + env-decay
 index.html
+ ixfx
+ easing-tick
index.html
base.css
```

`modulation\easing-tick\script.js` has the line:

```
import {Easings} from '../../ixfx/modulation.js';
```

`../` means "one directory up". We need two because we have to go up from `easing-tick` and then `modulation` in order to get to the `ixfx` directory.

If `easing-tick` was instead located in the root directory:

```
+ dom
+ flow
+ modulation
+ ixfx
+ easing-tick
index.html
base.css
```

We'd have to change the import to:

```
import {Easings} from '../ixfx/modulation.js';
```

Because now we only have to go "up" from `easing-tick` in order to reach `ixfx`. 
