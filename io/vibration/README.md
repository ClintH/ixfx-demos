# vibrate

Demonstates the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API).

This will likely only work on Chrome, on Android.

The vibration is very limited, allowing you to essentially set on/off pulses. These can be chained together to make crude patterns,
eg `10, 20, 30` means turn on for 10ms, off for 20ms and then on again for 30ms.

One part of the demo sketch has patterns stored as an attribute of the HTML DOM. This could be useful if vibrations are logically associated with an element.

A second part of the demo uses ixfx's envelope generator to generate the pattern. It maps envelope value to the time of a pulse, meaning that when the envelope peaks, it will send the longest 'on'

Read more:
* [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)