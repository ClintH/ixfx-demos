# object-detection

This demonstrates the [COCO-SSD TensorFlow.js model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd). It draws circles on the screen for each detected object, sized and positioned in accordance to its relation to the camera frame. The opacity of the circle is adjusted based on the confidence of the prediction.

COCO-SSD can:
* Identify multiple objects from a list of around 90 [common categories](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts).
* Position objects (x, y, width, height) with respect to the camera frame size.
* 'Score' each prediction from 0..1 according to the confidence.
* Infer predictions rather fast.

COCO-SSD does not:
* Track the identity of objects. For example, a pile of books might show up as several 'book'-class predictions, but you can't discern which is which, or if an object moves you cannot be sure if it's the same one

You'll also note that the data is jittery, with objects popping in and out of existence, and the position/size of object jumping around.

## Getting started

Quick start:
1. Running a local web server, open `index.html`. It may take a moment to load the TensorFlow model.
2. Click `Start` in the top-right panel to use your camera
3 Take a look at the shape of the raw data streaming in the console

The next step is to comment out these lines in _index.html_. This will remove the corner panel.

```html
<section id="sourceSection">
  <iframe src="source.html"></iframe>
</section>
```

Now, use a separate browser window with _source.html_ loaded. This way as you tinker in _index_ (see below for more info on this), you won't have to re-initialise the TensorFlow model and connect to the camera.

*Note* that your browser may stop or slow down processing in the separate window if it is minimised or behind other windows. Just resize it so its small and have it occupy some space on your screen.

## Architecture

This sketch is made up of two components: _source_ and _index_.

* _source_ (.html & .js) connects to a video source, does the ML inferences and dispatches the results.
* _index_ (.html & .js) receives data from _source_ and visualises it.

The benefit of this separation is:
1. You can use a different device, like your mobile phone, as a source
2. You can use multiple sources of data - eg different cameras covering different angles - or consume the data in multiple places
3. Most of your tinkering will be on the _use_ of the data, not its production so you can avoid slow TensorFlow model reloading and camera initialisation.
4. It's easier to test because you can generate data to see how your sketch responds

If you need to mess with machine learning parameters or how data is pre-processed, you'll need to dip into _source_. If you're just tinkering with how the data is being used, work in _index_.

Communication between _source_ and _index_ is handled via [remote](https://github.com/clinth/remote), and should automatically work between browser tabs. With a little extra configuration it can also connect over WebSockets to enable cross-device communication.