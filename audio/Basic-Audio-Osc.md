# BasicAudio oscillator-based

Some of the audio sketches share a common pattern, documented here. 

In the Web Audio API, a _graph_ is created connecting _nodes_. These describe the signal flow of audio, similarly to how one would physically patch analog cables.

Typically, we have a _source_ node (ie. an oscillator) and an _output_ or destination node (your speakers). To shape the signal, we need to insert nodes between input and output.

The basic sketches use a signal flow of:
* source -> stereo panner -> gain -> filter -> output

### `initAudio()`

This function intialises & returns the audio graph if it hasn't already been done

### `initBasicAudio()`

This function sets up the audio graph, with the provided oscillator settings.

### `BasicAudio`

This is the type of the wrapper (the type is defined at the end of script.js)

Oscillator-based demos use:

```typescript
/**
 * @typedef BasicAudio
 * @property {AudioContext} ctx
 * @property {StereoPannerNode} pan
 * @property {GainNode} gain
 * @property {BiquadFilterNode} filter
 * @property {OscillatorNode} osc
 */
```

See more: [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext), [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode), [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode), [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode), [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement).
