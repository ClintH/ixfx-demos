# pose-between

Based on the `starters/things` skeleton.

This basic demo demonstrates:
1. Receiving pose data of one or more bodies
2. Deriving data from raw pose data
3. Mapping to screen coordinates
4. Updating DOM elements

In `sketch.js` we calculate the middle point of all the poses, saving to state. In `thing.js`, we use this to calculate the average distance from a given thing to all other things. Things closer to other things will thus have a lower distance value.

`Things.update` takes in the `PoseTracker` associated with the pose that the thing represents. This allows us to query details about the pose. In this case we're just using it to get the middle point of the pose.

The distance value is not used meaningfully - we just show it as text.

Another technique shown is interpolating position values so they slide smoothly.

Since this demo uses the DOM, we also show how to remove things (and their associated HTML elements) if the pose expires.