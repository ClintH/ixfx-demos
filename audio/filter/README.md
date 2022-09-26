# filter

Demonstates controlling audio filtering with a few techniques:
* Random filter frequency value
* Filter frequency based on relative pointer position
* Filter frequency based on an [oscillator](https://clinth.github.io/ixfx-docs/modulation/oscillator/) value (aka auto-filter)

Keep in mind that audio can only be started from within a user interaction event handler (eg from clicking somewhere). This is a browser restriction.

Please see [Basic Audio sample-based](../Basic-Audio-Sample.md) for more on the plumbing underneath.

[BiquadFilterNodes](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) have different filter types. In this example, a bandpass filter is used.

Read more
* [BiquadFilterNode.frequency](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/frequency)
* [BiquadFilterNode.Q](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/Q)
* [BiquadFilterNode.type](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type)
* [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) (MDN)
* [ixfx Oscillator module](https://clinth.github.io/ixfx-docs/modulation/oscillator/)

