# oscillator

Demonstates starting and controlling an oscillator.

Pointer x/y are mapped to relative values and saved into state. In `use`, these values are used to calculate frequency and gain values. 

If the pointer is released or goes outside of the element, the _gain_ (ie. volume) is set to zero. This is because `OscillatorNode`s are not designed to be stopped and restarted.

Keep in mind that audio can only be started from within a user interaction event handler (eg from clicking somewhere). This is a browser restriction.

Please see [Basic Audio Oscillator-based](../Basic-Audio-Osc.md) for more info.

Read more
* [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) (MDN)

