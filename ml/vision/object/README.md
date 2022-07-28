# object-detection

* [Main readme for all ml-vision](../README.md)
* [TFJS COCO-SSD readme](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

This demonstrates the [COCO-SSD TensorFlow.js model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd). It draws circles on the screen for each detected object, sized and positioned in accordance to its relation to the camera frame. The opacity of the circle is adjusted based on the confidence of the prediction.

Overview of sketches:

| sketch                  | demonstrates                                                |
|-------------------------|-------------------------------------------------------------|
| objects                 | displaying object bounding boxes                            |
| points-multiple-sources | handling multiple sources and multiple poses                |
| point-to-point          | calculations based on relationship between points           |
| source                  |   a common data source (loaded in a new window) for the others      

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

## COCO-SSD

COCO-SSD can:
* Identify multiple objects from a list of around 90 [common categories](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts).
* Position objects (x, y, width, height) with respect to the camera frame size.
* 'Score' each prediction from 0..1 according to the confidence.

COCO-SSD does not:
* Track the identity of objects. For example, a pile of books might show up as several 'book'-class predictions, but you can't discern which is which. If an object moves you cannot be sure if it's the same one or not.

You'll also note that the data is jittery, with objects popping in and out of existence, and the position/size of object jumping around.

## URL Parameters

_source.html_ can be loaded with URL parameters to make minor adjustments without modifying code. Please see _source.js_ for more details.

For example: `source.html?base=mobilenet_v2&maxNumBoxes=1` will use the slower (but more accurate) mobilenet_v2 model and only return the highest-scored object.