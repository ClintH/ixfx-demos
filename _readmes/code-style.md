# Code style

All the sketches roughly follow a pattern of a HTML and JS file: `index.html` and `script.js`. The JS files are organised into main chunks: `imports`, `settings`, `state`, `use` and `setup`.

Before discussing the structure of the sketches, it's worth first introducing [immutability](#immutability) and [destructuring](#destructuring).

## Immutability

The demos mostly strive for _immutability_ of data. Normally when we want to change a property of an object, we assign it directly:

```js
myObj.value = myObj.value * 2;
```

The object is said to _mutate_, since its internal properties are changing, but the `myObj` reference stays the same. If you're not careful this can be confusing, since a change at once place seems to change other variables.

```
let myObj = { value: 5 };
let a = myObj;
let b = myObj;
b.value = 10;
```

In the above case, `b.value` will be 10, and this is pretty obvious with a glance to the code. However it's not obvious - especially so when code starts getting complex - that `a.value` and `myObj.value` are _also_ 5, even though we don't seem to update them.

This is because `myObj`, `a` and `b` are all the same object - a common identity. A naive reading of the code may give you to think there are three objects (`myObj`, `a` and `b`) but there's really only one, with all three variables pointing at the same thing: `a === b === myObj`.

Mutability has typically been considered useful because you don't have to copy data around the place - as long as you have a reference to an object, you have the latest data. But it does have its drawbacks, more than the readability issue discussed above.

With _immutabilility_, when we change an object we also change its identity, by creating a new object with the [spread syntax](#spread-syntax) and using that instead.

```js
const myObj = { value: 5 };
const a = { ...myObj };
const b = { ...myObj, value: 10 };
```

Now we have three separate objects with final values of:

```js
myObj.value;  // 5
a.value;      // 5
b.value;      // 10
```


### Freeze for safety

Even though an object is declared as `const`, there's nothing to stop us changing its properties. We could still write `myObj.value = 10`. The only thing `const` prevents is re-assignmnent:

```js
const myObj = { value: 10 };
myObj = { value: 5 };       // Error
```

To maintain immutability, whenever an object is created, run it through [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze). This will throw an error if you try to change an object, and an editor like VS Code will give you very helpful edit-time warnings too.

With freezing, our code looks like:

```js
const myObj = Object.freeze({ value: 5 });
const a = Object.freeze({ ...myObj, value: 10 };
const b = Object.freeze({ ...myObj });
```

It can be rather ugly to have to use freeze all the time. It's best used for objects that are shared amongst parts of your code, where there is the risk of changing by mistake. In the demos, the key shared objects _state_ and _settings_ are frozen.

If you're making an object within a function and it doesn't get returned, it's probably wouldn't be worth the visual clutter of freezing it.

Note that there are challenges with freezing complex objects and arrays. While it's not a perfect solution, it does cover most cases.

### Spread syntax

We use the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to copy values from one object to another. That's the `...` part you see in the snippets. 

Properties are assigned in order. In the assignment of `b` below, we set `value: 10`, but _next_ we overwrite with whatever `myObj` contains. Since `myObj` contains `value`, it overwrites 10 to be 5.

```js
const myObj = { value: 5 };
const a = { ...myObj, value: 10 }; // a.value = 10
const b = { value: 10, ...myObj }; // b.value = 5
```

### `Object.assign()`

If you don't have the spread syntax available (eg. on Espruino) you may be able to use [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):

```js
const myObj = { value: 5 };
const a = Object.assign({}, myObj, { value: 10 });
// Same as: const a = { ...myObj, value: 10 }
```

With `Object.assign`, the first parameter is the _target_, the object we want to copy things to. In this case we need a new object, so `{}` is provided. After that, list all the objects in order you want to copy. In the above example, first `myObj` is used, then the `{ value: 10 }` anonymous object.

### Copying immutable objects

To copy immutable objects, you can just skip assigning properties:

```js
const myObj = { value: 5 };
const myObj2 = { ...myObj };
```

### Comparing immutable objects

A gotcha with immutability is that objects can't be compared using the usual equality operator (`===`). 

```js
const a = { value: 5 };
const b = { value: 5 };
a === b; // false - different objects even though values are the same
```

Instead, you need to compare by values.

```js
// Returns _true_ if 'value' property is
// the same on both x and y
const isEqual (x, y) => x.value === y.value;

isEqual(a, b); // True!
```

## Destructuring

The usual way of accesing properties on an object is with _dot notation_. That is, `someVariable.someProperty`, refers to `someProperty` on a variable declared as `someVariable`. Since objects can be nested, you just keep adding dots to go deeper into the object, eg: `person.address.street.number` might return the street number of a person.

But here's a simple case of accessing a property one level deep:

```js
const settings = Object.freeze({ colour: `red`, size: 20 });

const something = () => {
  console.log(settings.colour);
}
```

Because it can be too wordy to have to write `object.property` all the time, you might assign it to a variable:

```js
const something = () => {
  const colour = settings.colour;
  console.log(colour);
}
```

However if you have many properties you want to pull out, you end up with lines and lines of boring assignments. An alternative is to use [_destructuring_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```js
const something = () => {
  const { colour } = settings;
  console.log(colour);
}
```

When you destructure, you are essentially pulling out and declaring whichever properties you want from a source object. Multiple properties can be used just by listing them with a comma:

```js
const { colour, size } = settings;
```

Which is the same as writing:
```js
const colour = settings.colour;
const size = settings.size;
```

Note how in the destructured version, we only have to write the name of the property once. This a general principle of good programming: DRY (Don't Repeat  Yourself).

You can also use `let` when destructuring:

```js
let { colour } = settings;
```

Destructuring is also a great way of using arrays in a more code-readable way. In the below case, we have an array of two values, and we know that the first should be the _x_ and second _y_. Without destructuring, we'd do the usual thing of assigning values to named variables, so they are more meaningful:

```js
const pointer = [10, 20];

const something = (point) => {
  const x = point[0];
  const y = point[1];
}

something(pointer);
```

With destructuring, this can be done in one line:

```js
const pointer = [10, 20];

const something = (point) => {
  const [x, y] = point;
}

something(pointer);
```

## Imports

Imports are at the top of the file are all the import statements which draw in libraries as needed.

```js
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Random from "../../ixfx/random.js"
```

When importing from your local file system (as in the second line above), you may need to adjust the pathing depending on where your sketch is located.

## `settings`

A constant which declares all the settings for the sketch which do not change at runtime.

```js
const settings = Object.freeze({
  updateSpeedMs: 1000,
  remote: new Remote()
});
```

It's useful to have all these parameters that need tweaking in one centralised spot and properly named. Another benefit is you'll get some level of type-checking and warnings if you try to use a setting that does not exist. We want it to be [immutable](#immutability), so the whole thing is wrapped in `Object.freeze()`.

In the sketches, [destructuring](#destructuring) is used to pull out settings where needed:

```js
const blah = () => {
  const { radius, colour } = settings;
  ...
}
```

## `state`

State is a variable that changes identity as values change, thus is declared with `let`.

```js
let state = Object.freeze({
  /** @type number */
  magicNumber: 0
});
```

Following the principle of [immutability](#immutability), it is frozen, preventing something like `state.magicNumber = 10`.

To change state, [`saveState`](#savestate) is provided as a helper function. Alternatively, state can be updated with the [spread syntax](#spread-syntax):

```js
state =  { ...state, clicks: state.clicks + 1 };
```

In this line, we copy existing properties of `state`, and overwrite with a new value for `clicks`.

You'll also note a [type annotation](./_readmes/typing.md) for `magicNumber`. This tells your editor that this property should be a number type. Without this annotation, your editor will believe that `magicNumber` can only ever be 0.


## `saveState()`

`updateSsaveStatetate()` applies and validates a change to `state`. Having a central place where `state` is updated means you can do 'sanity checks' to ensure `state` stays how the rest of your code expects.

Update state takes in whatever properties you want to modify:

```js
saveState({ clicks: state.clicks + 1 });
```

It makes for readable and safe code.

If you're interested, below is the implementation of `saveState`. Note the use of type annotation and `Object.freeze` for an improved editing experience. But otherwise, it's essentially just the spread syntax described earlier.

```js
/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
```

## `use()`

In the sketches, the convention is that `use()` makes use of whatever is in the state. It might be to pan audio, draw on the canvas, update the HTML of an element or whatever. In the case of animation, it's typical then for `use()` to be called at a high rate using `window.requestAnimationFrame` or similar. 

The key here is that updating the state and using the state are two separated. This gives some advantages:
* Updating/using can be desynchronised. Eg using state at a high rate while animating the canvas, while updating state at the rate that which events happen
* The flow of the sketch becomes clearer. When & where data is being ingested & processed, and when & where it's used.
* Where possible, computations are done once and assigned to state rather than being recomputed for each update
* Testing and debugging is easier because fake data can be put into the state and `use()` won't need to be changed

Code within `use()` should ideally:
* Never modify the state
* Only access `state` and `settings`
* Avoid computation. Rather, it _consumes_ computed results stored in `state`.

# `setup()`

Another convention used in the sketches is a function called `setup()` runs a single time when the sketch loads. It is usually used for wiring up events and initialising a main loop if necessary.

For example:

```js
const setup = () => {
  const { updateSpeedMs, remote } = settings;
  
  // Assign a new random number every `updateSpeedMs`
  setInterval(() => {
    saveState({
      magicNumber: Math.random()
    });
    use();
  }, updateSpeedMs);
}

setup(); // Call it
```


## All together

Putting all these bits together, we have a sketch that looks something like:

```js
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  updateSpeedMs: 1000,
  remote: new Remote()
});

let state = Object.freeze({
  /** @type number */
  magicNumber: 0
});

const use = () => {
  const { magicNumber } = state;

  // Broadcast magic number
  r.broadcast({ magicNumber }); 
}

const setup = () => {
  const { updateSpeedMs, remote } = settings;
  
  // Assign a new random number every `updateSpeedMs`
  setInterval(() => {
    saveState({
      magicNumber: Math.random()
    });
    use();
  }, updateSpeedMs);
}

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
```


## Type annotations

You'll note the use of [type annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) throughout the sketches. This is a lightweight way to give hints to your code editor so it in turn can give helpful warnings and better inline documentation. These comments can be deleted, and they have no role during the running of code.

See [typing.md](./_readmes/typing.md) to read more.
