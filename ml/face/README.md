# face

* [Main readme for all ml-vision](../README.md)
* [TFJS face detection readme](https://github.com/tensorflow/tfjs-models/tree/master/face-detection)

This demonstrates the [face detection TensorFlow.js model](https://github.com/tensorflow/tfjs-models/tree/master/face-detection). 

## Getting started

Quick start:
1. Running a local web server, open _objects.html_  in your browser. It may take a moment to load the TensorFlow model.
2. Click the yellow check mark in the top-right panel to use your camera.
3. Take a look at the shape of the raw data streaming in the console

The next step is to comment out the following lines in _objects.html_. This will remove the corner panel.

```html
<button id="btnCloseFrame">Close panel</button>
<section id="sourceSection">
  <iframe src="source.html"></iframe>
</section>
```

Now, use a separate browser window with _source.html_ loaded. This way, as you tinker you won't have to re-initialise the TensorFlow model and connect to the camera. See [the main README](../README.md) for more info on this.

**Note:** Your browser may stop or slow down processing in the separate window if it is minimised or behind other windows. Resize it so its small and have it occupy some space on your screen.

## Face detection

The face detection model
* Identify multiple faces
* Locate faces (x, y, width, height) with respect to the camera frame size.
* Identify location of facial features
* 'Score' each prediction from 0..1 according to the confidence.
