# ml-vision

* [pose](./pose/README.md): pose detection
* [object](./pose/README.md): object detection

# Architecture

There is a special sketch, _source_ which connects to a source (most likely a video camera), does the ML inferences and dispatches the results. All the other sketches use data being emitted from _source_, and do not interact with the ML systems or sources directly.

The benefit of this separation is:
1. You can use the video camera of another device, such as your mobile phone rather than your laptop.
2. You can use multiple sources of data - eg different cameras covering different angles - or consume the data in multiple places.
3. Most of your tinkering will be on the _use_ of the data, not its production so you can avoid slow TensorFlow model reloading and camera initialisation.
4. It's easier to test because you can generate data to see how your sketch responds and easily play back recorded data.

If you need to mess with machine learning parameters or how data is pre-processed, you'll need to dip into _source_. For 99% of the things you'll need to do, it won't be necessary.

Communication between _source_ and the other sketches is handled via [remote](https://github.com/clinth/remote), and should automatically work between browser tabs. With a little extra configuration it can also connect over WebSockets to enable cross-device communication.

# Auto reloading

Unfortunately VS Code's 'Live Preview' feature reloads all browsers if a source file has changed. This means that if you change a sketch that uses data, the _source_ sketch will also reload and you have to go through camera initialisation etc again. Consult the documentation to disable this reloading.

# Source

The provided _source_ supports does a lot of the boring plumbing for you. It's probably not necessary to go in to edit it, but if you do so, take a look at the comments at the top of the source file for an overview. Source is meant mostly as 'black box' which spits out the data from the machine learning engine.

It offers:
* Selectable sources: video camera, recorded data
* Recoding: record ML data for repeatable testing
* A UI for tweaking at runtime

_source_ depends on a sort of base library contained in _common-source.js_. This provides some common plumbing across the different kinds of sources.

## Recording

* Point data is recorded to the browser's local storage. The frames themselves are not stored.
* Run `localStorage.clear()` at the DevTools console to clear stored recordings, or clear your browser's cache
* Each stored chunk of data is played back at a fixed rate. This can be set when calling `CommonSource.setup`.

To edit a recording you can do so at the DevTools console. Eg to edit a recording 'big' and only keep the last 300 frames:

```js
const recordings = JSON.parse(localStorage.getItem(`recordings`));
const rec = recordings.find(r => r.name === `big`);
rec.data = rec.data.slice(300);
localStorage.setItem(`recordings`, JSON.stringify(recordings));
```

To save the recording named 'big' beyond the browser:

```js
const recordings = JSON.parse(localStorage.getItem(`recordings`));
const rec = recordings.find(r => r.name === `big`);
console.log(JSON.stringify(rec));
```

To insert a recording from JSON text:

```js
let recordings = JSON.parse(localStorage.getItem(`recordings`));
const rec = JSON.parse(`...your JSON here...`);
// Filter out any existing recording with same name
recordings = recordings.filter(r => r.name !== rec.name);
recordings.push(rec);
localStorage.setItem(`recordings`, JSON.stringify(recordings));
```

# Troubleshooting

Your code will not be able to access media devices like a camera if it's being loaded from an insecure connection.

If you're running a local server, make sure you're using http://127.0.0.1 as the address. If you're running from an online hosting service, make sure you're accessing via https://

