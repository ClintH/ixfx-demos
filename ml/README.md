# ml-vision

* [pose](./pose/README.md): pose detection
* [object](./pose/README.md): object detection

# Architecture

There is a special sketch, _source_ which connects to a source (most likely a video camera), does the ML inferences and dispatches the results. All the other sketches use data being emitted from _source_, and do not interact with the ML systems or sources directly.

The benefit of this separation is:
1. You can use the video camera of another device, such as your mobile phone rather than your laptop. Multiple simultaneous sources are even possible.
2. Data can be consumed by different sketches/devices with no extra effort.
3. Most of your tinkering will be on the _use_ of the data, not its production, so you can avoid slow TensorFlow model reloading and camera initialisation. It makes your sketches simpler as well.
4. It's easier to test by generating data or using recorded data.

If you need to mess with machine learning parameters or how data is pre-processed, you'll need to dip into _source_. For 99% of the things you'll need to do, it won't be necessary. The most likely reason to need to edit `source.js` is to set which machine learning model to use - this is described in the `README.md` files in each sub-folder.

Communication between _source_ and the other sketches is handled via [remote](https://github.com/clinth/remote), and should automatically work between browser tabs. With a little extra configuration it can also connect over WebSockets to enable cross-device communication.

# Auto reloading

Unfortunately VS Code's 'Live Preview' feature reloads all browsers if a source file has changed. This means that if you change a sketch that uses data, the _source_ sketch will also reload and you have to go through camera initialisation etc again. Consult the documentation to disable this reloading.

# Source

The provided _source_ does a lot of the boring plumbing for you. It's probably not necessary to go in to edit it, but if you do so, take a look at the comments at the top of the source file for an overview. Source is meant mostly as 'black box' which spits out the data from the machine learning engine.

It offers:
* Selectable sources: video camera, recorded data (future: offline video & static images)
* Recording: record ML data for repeatable testing/demos
* A UI for tweaking at runtime

_source_ depends on a set of base functionality contained in _common-source.js_. This provides some common plumbing across the different kinds of sources. It's even less likely you want to dive into that :)

See the `setup` function for how to choose a custom camera by default.

## Recording

* Point data is recorded to the browser's local storage. The image data is are not stored.
* Run `localStorage.clear()` at the DevTools console to clear stored recordings, or clear your browser's cache
* Recording might skip frames in order to keep a minimum rate. Changes this in `recordThrottle` in `common-vision-source.js`. 
* Each stored chunk of data is played back at a fixed rate. This can be set in `source.js` when calling `CommonSource.setup`. The default is 50ms which roughly corresponds with a normal rate.

To edit a recording you can do so at the DevTools console. 

Example 1. To edit a recording 'big' and only keep the last 300 frames:

```js
const recordings = JSON.parse(localStorage.getItem(`recordings`));
const rec = recordings.find(r => r.name === `big`);
rec.data = rec.data.slice(300);
localStorage.setItem(`recordings`, JSON.stringify(recordings));
```

Example 2. To save the recording named 'big' beyond the browser:

```js
const recordings = JSON.parse(localStorage.getItem(`recordings`));
const rec = recordings.find(r => r.name === `big`);
console.log(JSON.stringify(rec));
// Copy the outputted text to a file, send via an email etc.
```

Example 3. To insert a recording from JSON text (`...your JSON here...`):

```js
let recordings = JSON.parse(localStorage.getItem(`recordings`));
const rec = JSON.parse(`...your JSON here...`);

// Filter out any existing recording with same name
recordings = recordings.filter(r => r.name !== rec.name);
recordings.push(rec);
localStorage.setItem(`recordings`, JSON.stringify(recordings));
```

# Remote data

To configure for sending data via WebRTC/websockets, first read [_readmes/websockets](../_readmes/websockets.md) and make sure the simple pointer remote works.

In the `source.js` file and the sketch you are using, look for where `new Remote()` is called when creating `settings`. Add `allowNetwork: true`. For example:

```js
const settings = Object.freeze({
  ...
  remote: new Remote({
    allowNetwork: true
  }),
  ...
});
```

Now the sketches will additionally connect to each other via websockets and WebRTC.

# Troubleshooting

## https

Your code will not be able to access media devices like a camera if it's being loaded from an insecure connection.

If you're running a local server, make sure you're using http://127.0.0.1 as the address. If you're running from an online hosting service, make sure you're accessing via `https://`.

## getUserMedia timeout

Repeated 'opening' of the camera while tinkering can seem to cause an issue in some browsers. An internal call to `getUserMedia` hangs indefinitely, rather than returning the camera stream or throwing an error. Thus we use ixfx's `waitFor` function to trigger a timeout error, so at least you're aware when it's happening. If this does happen, closing all browser windows and starting again seems to fix the problem.
