# pixel- demos

Demonstrates starting a video stream, accessing and manipulating pixel data and then writing it back to a canvas.

In this case, the processing compares the current video frame to the last, counting the number of pixels which have changed. This is boiled down to a % in `state.differences`.

To demo changing pixels, it sets all unchanged pixels to grayscale, and somewhat translucent. Only changed pixels are left alone.

Settings:

* `threshold`: how much change in grayscale value counts as a changed pixel. Lower = more sensitive
* `visualise`: if 'false', the video feed is not shown. This technique works well if you only want to show processed pixels, and the output matches the input dimensions.

## pixel-overlay

Draws on top of the video feed, using the underlying Canvas element that the frame grabber uses. In this case, we aren't responsible for drawing the frames from the camera. It also shows how we don't need to show the video at all.

## pixel-process

In this demo, we draw camera frames to a canvas. Pixels deemed to be the same as the last frame are changed to grayscale and translucent. Pixels which are deemed different are left alone, so they come through in original colour.

## pixels-worker

The same basic pixel-processing technique as the others, but this time calculated in a 'web worker'. This runs in parallel to your regular code, meaning that it doesn't slow down interactivity as much. This demo also shows how to use a tracker instance to average the difference data over a number of samples.