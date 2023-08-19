# force

Demonstrates getting the pressure or force from a trackpad or stylus. [Online demo](https://clinth.github.io/ixfx-demos/pointer/force/)

* Trackpad force is only supported by the Safari browser with a force trackpad.
* Stylus pressure should work cross-platform, but a pressure-sensitive stylus is needed.

A helper function is provided which emits pressure/force data. In the demo it's used to bind to a single element, but it can be used for tracking force across any number of elements (or on `document.body`).

See also:
* [Force playground](https://clinth.github.io/ixfx-play/pointer/force/index.html)

Read more:
* [Apple's force touch API](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/SafariJSProgTopics/RespondingtoForceTouchEventsfromJavaScript.html)
* [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)