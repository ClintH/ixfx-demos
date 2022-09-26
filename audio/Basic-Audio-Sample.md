# BasicAudio sample-based

Some of the audio sketches share a common pattern, documented here. 

In the Web Audio API, a _graph_ is created connecting _nodes_. These describe the signal flow of audio, similarly to how one would physically patch analog cables.

Typically, we have a _source_ node (eg an MP3 file) and an _output_ or destination node (your speakers). To shape the signal, we need to insert nodes between input and output.

The basic sketches use a signal flow of:
* source -> stereo panner -> gain -> filter -> output

Source here is a `<audio>` element defined in the HTML, and given an `id` attribute.

### `initAudio()`

This function scans the HTML for `<audio>` elements, calling `initBasicAudio()` to create a wrapper for each one. It stores each wrapper into `state.audio`.

Because the audio context can only be worked with after a user interaction, there's a call to `initAudio` in all the event handlers. If the initialisation has already happened, the function does not thing.

### `initBasicAudio()`

This function sets up the audio graph for a particular `<audio>` element, and returns the wrapper.

### `BasicAudio`

This is the type of the wrapper (the type is defined at the end of script.js)

```typescript
type BasicAudio = {
 ctx: AudioContext
 pan: StereoPannerNode
 gain: GainNode
 filter: BiquadFilterNode
 id: string
 el HTMLMediaElement
}
```


## Using

Each of the BasicAudio wrappers is added to `state.audio`, keyed by the id of the `<audio>` element. Thus, if you have the HTML:

```html
<audio src="rainstorm.mp3" id="rainstorm"></audio>
```

You can fetch the wrapper for it with:

```js
const a = state.audio.get(`rainstorm`);
```

Since it's possible the id you provide doesn't exist, checking if it's _falsy_ before proceeding.

Here are some examples of controlling the audio.

```js
const a = state.audio.get(`rainstorm`);
if (!a) return; // 'rainstorm' does not exist
const { el, gain, pan, filter } = a; // Destructure

el.loop = true; // Repeat
el.start(); // Play
el.pause(); // Stop

pan.pan = -1; // Pan hard left
gain.value = gain.value*0.5; // Halve volume

// Adjust filter
filter.type = = `lowshelf`;
filter.frequency.value = 1000;
filter.gain.value = -1;
```

See more: [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext), [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode), [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode), [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode), [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement).
# Credits
* Sound sample [Talitha5 on FreeSound.org](https://freesound.org/people/Talitha5/sounds/321885/) (CC-0 License)