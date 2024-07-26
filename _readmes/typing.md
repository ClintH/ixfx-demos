# Type annotations

Contents:
- [Type annotations](#type-annotations)
- [Annotating a function](#annotating-a-function)
- [Defining a type](#defining-a-type)
- [Type assertions](#type-assertions)
- [Disabling](#disabling)
- [Importing types](#importing-types)

You'll note the use of [type annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) throughout the sketches. This is a lightweight way to give hints to your code editor so it in turn can give helpful warnings and better inline documentation. These comments can be deleted, and they have no role during the running of code.

Type annotations allow you to gain some of the advantages of [TypeScript](https://www.typescriptlang.org) (the contemporary best practice), without introducing additional build steps and complexity. The price paid is some clutter in the source code.

# Annotating a function

The most common use of annotations in this code base is to hint what types are expected for function parameters.

Let's say we have a function that sets the HTML for an element:

```js
const setHtml = (el, msg) => {
  if (!el) return;
  el.innerHTML = msg;
}
``` 

To call our function, we could write:
```js
setHtml(document.getElementById(`test`), `hello`);
``` 

When coding or reusing others code, it's easy to get parameters mismatched. What parameters does `setHtml` need again? What order? Is it OK if some are left out? etc.

Type annotations can help with this.

To add an annotation in VS Code, position your cursor in the line above the declaration, start typing `/**` and hit TAB. It fill out a template annotation:

```js
/**
 * @param {*} el 
 * @param {*} msg 
 */
const setHtml = (el, msg) => {
...
}
```

What we want to do then is fill in the correct types where there are currently `*`.

```js
/**
 * @param {HTMLElement} el 
 * @param {string} msg 
 */
const setHtml = (el, msg) => {
...
}
```

The basic types are: 'string', 'number', 'boolean' and 'object'. 'any' can be used to essentially say the type can be anything. 'null' and 'undefined' are for those values. Arrays can be hinted by adding square brackets, such as `string[]`.

In the above example, we're using the type `HTMLElement`. There are predefined types for most things you'll interact with - you can pick up the name for these as you code and see them in hints and warnings from VS Code.

Now our line that calls `setHtml`..

```js
setHtml(document.getElementById(`test`), `hello`);
```

...will give a warning, because `document.getElementById()` can return `null` if the element is not found. This warning can seem annoying if you know for sure the element is there, but again will likely save your bacon in other cases where you've mistyped the id of an element or forgot to include it in your HTML.

Since our `setHtml` function handles `el` being `null`, we need to hint the additional type option using the pipe operator `|`.

```js
/**
 * @param {HTMLElement|null} el 
 * @param {string} msg 
 */
const setHtml = (el, msg) => {
  if (!msg) return; // Exit out if we get null/undefined
...
}
```

This hints that `msg` can be of type `HTMLElement` _or_ a value of null. Now we can call the code without warning, indeed our `setHtml` handles null properly.


# Defining a type

An example of a type is:

```js
/**
 * @typedef {{
 *  name: string
 *  age: number
 *  hatColour?: string
 * }} Person
```

Here, we define a type named _Person_, along with some associated properties. The basic syntax inside of the {{ }} block is: 
```
property: type
```

So our _Person_ has a `name` property which is a string, `age` which is a number and `hatColour` which is a string. Note the `?` at the end. This means the property is optional. A valid `Person` object might have that property, or it may be undefined.

To express that a variable is of a type you can use this syntax:
```js
/** @type Person */
const p = { name `Sally`, age: 31, hatColour: `red` }
```

Now your editor will give you warnings if you miss a required property or use the wrong types. This is super helpful.

Another common way of using types is to specify them as function parameters as we saw earlier

```js
/**
 * Greet people
 * @param {Person} p
 */
function greet(p) {
  console.log(`Hello, ${p.name}!`);
}
```


# Type assertions

For cases where we can't hint the type with other means, we can _assert_ the type.

Let's say we want to change the value of an INPUT element. If we use `document.getElementById`, the return value will be `null` or `Element`. We can (and should!) handle the case of the value being `null`:

```js
const el = document.getElementById(`slider`);
if (!el) return;
```

But if we try to use the `value` property of HTML INPUT elements, VS Code will give us a waning, because it has no way of knowing that the element is in fact of type 'HTMLInputElement'. As far as it knows it could be any kind of Element.

```js
const el = document.getElementById(`slider`);
if (!el) return;
el.value = 100; // <-- this will generate a warning
```

To solve this, we can type `el`:

```js
/** @type {HTMLInputElement|null} */
const el = document.getElementById(`slider`);
if (!el) return;
el.value = 100; // Now it is ok
```

It's also possible to do inline assertions, which is handy in cases where variables are not being declared. The syntax is a bit ugly, but basically we use the same `/** @type {...} */` syntax, and also wrap the statement in parenthesis:

```js
/** @type {HTMLInputElement} */(el).value = `10`;
```

In most places, the curly braces `{ }` can be omitted for simpler syntax. The following two lines are the same.

```js
/** @type {number} */
/** @type number */
```

# Disabling

To disable all this magic, add these lines to the top of your source:

```js
/* eslint-disable */
// @ts-nocheck
```

You could also edit your project settings and ensure that `"js/ts.implicitProjectConfig.checkJs": false`.

# Importing types

Visual Studio Code is smart enough to find and use type definitions from imported libraries, such as ixfx, even when it's not explicit.

In the example below, `envelope` is correctly typed, so as we write the code
the editor can give us hints of what the values are.

```js
import { adsr } from '../../ixfx/modulation.js';
const envelope = adsr();
```

It may be necessary to [manually import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#other) when you are referring to them in a type annotation. In the below example, we import ixfx's `Point` type
```js
/** 
 * @typedef {{
 * position: import('../../ixfx/geometry.js').Point
 * }} Thing
 */

/**
 * @param {Thing} p
 */
function blah(p) {
  // Editor knows p.x and p.y exist and are numbers
  // This helps us to catch mistakes like: p.x = `hello`
} 
```
