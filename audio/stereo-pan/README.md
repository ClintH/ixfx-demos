# stereo-pan

Demonstates controlling audio panning with a few techniques:
* Random pan value
* Pan value based on relative pointer position
* Panning based on an [oscillator](https://clinth.github.io/ixfx-docs/modulation/oscillator/) value (aka auto pan)

Keep in mind that audio can only be started from within a user interaction event handler (eg from clicking somewhere). This is a browser restriction.

Please see [Basic Audio sample-based](../Basic-Audio-Sample.md) for more.

Read more
* [StereoPannerNode.pan](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode/pan)
* [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode) (MDN)
* [MDN example](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createStereoPanner#example)
* [ixfx Oscillator module](https://clinth.github.io/ixfx-docs/modulation/oscillator/)

