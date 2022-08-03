# Type annotations

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

Since our `setHtml` function handles `el` being `null`, we need to hint that using the pipe operator `|`.

```js
/**
 * @param {HTMLElement|null} el 
 * @param {string} msg 
 */
const setHtml = (el, msg) => {
...
}
```

Now our calling code has no warnings, because even though we may pass in a null, we've hinted that `setHtml` can handle that just fine.

# Defining a type

An example of a type is:

```js
/**
 * @typedef PressureForceState
 * @property {number} [webkitForce]
 * @property {number} normalised
 * @property {number} [pointerPressure]
 */
``` 

Here, we define a type named _PressureForceState_, along with some associated properties. The type for each property is enclosed in the curly brackets, followed by the name of the property. If the property is optional, the name is enclosed in square brackets. 

This type would then match data like:

```js
const f = {
  normalised: 1
};

const ff = {
  webkitForce: 2,
  normalised: 0.5
}
``` 

## Typed declarations

To take advantage of the type, we need annotate our variable declaration with the intended type:

```js
/** @type {PressureForceState} */
const f = {
  normalised: 1
};
```

Now the editor will know what is expected of the variable `f`, and will give you warnings if you try to assign or access properties that don't exist or are the wrong type. This catches a lot of common mistakes while programing.

Eg, now we'd get a warning if we tried to assign a string to the property `normalised`:

```js
/** @type {PressureForceState} */
const f = {
  normalised: `100`
};
```

## Type assertions

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

It's also possible to do inline assertions, which is handy in cases where variables are not being declared. The syntax is a bit ugly, but basically we use the same `/** @type {...} */` syntax, but wrap the statement in parenthesis:

```js
/** @type {HTMLInputElement} */(el).value = `10`;
```


