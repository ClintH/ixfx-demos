# force playground

Demonstrates getting the pressure or force from a trackpad or stylus.

* Trackpad force is only supported by the Safari browser with a force trackpad.
* Stylus pressure should work cross-platform, but a pressure-sensitive stylus is needed.

A helper function is provided which emits pressure/force data. In the demo it's used to bind to a single element, but it can be used for tracking force across any number of elements (or on `document.body`).

See also:
* [force sketch](https://github.com/ClintH/ixfx-demos/tree/main/pointer/force)  ([online demo](https://clinth.github.io/ixfx-demos/playgrounds/io/force/))

Read more:
* [Apple's force touch API](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/SafariJSProgTopics/RespondingtoForceTouchEventsfromJavaScript.html)