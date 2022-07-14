# pose-detection

[TFJS readme](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection)

## Getting started

Quick start:
1. Running a local web server, open `index.html`. It may take a moment to load the TensorFlow model.
2. Click `Start` in the top-right panel to use your camera.
3. Take a look at the shape of the raw data streaming in the console

The next step is to comment out the following lines in _index.html_. This will remove the corner panel.

```html
<button id="btnCloseFrame">Close panel</button>
<section id="sourceSection">
  <iframe src="source.html"></iframe>
</section>
```

Now, use a separate browser window with _source.html_ loaded. This way as you tinker in _index_ (see [Architecture](#architecture) for more info on this), you won't have to re-initialise the TensorFlow model and connect to the camera.

**Note:** Your browser may stop or slow down processing in the separate window if it is minimised or behind other windows. Just resize it so its small and have it occupy some space on your screen.

## Models

The TensorFlow.js pose detection library has three models: MoveNet, PoseNet. For most cases, MoveNet is the model to choose, but read on for the differences.

The model can be selected via `settings.model`.

Pose detection models can:
* Identify key points point of the human body in reference to the camera frame.
* Key points are named, so it's possible to get the position of the nose, right ankle, and so on.
* Each key point is individually scored on a scale of 0...1, where 1 is the highest confidence.
* The overall pose is also given a score (not the case for some settings).
* MoveNet has the possibility to detect poses of up to six bodies at a time, but most models are optimise for a single body.

There is some difference with what named key points are returned, see [the TFJS documentation for an overview](https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/README.md#pose-estimation)

### MoveNet

MoveNet is considered the fastest and most accurate of the available TFJS models, detecting 17 points of a body.

Has three modes:
1. _SinglePose.Lightning:_ optimised for speed, only a single body (default)
2. _SinglePose.Thunder:_ optimised for accuracy, only a single body
3. _MultiPose.Lightning:_ slower than 'SinglePose.Lightning' but can detect up to six bodies and also returns a bounding box for each pose.

The mode can be set via `settings.moveNet.modelType`.

Read more about MoveNet:

* [Introduction](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html)
* [Github](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet)

## BlazePose

BlazePose offers a more key points than MoveNet and PoseNet, allowing for more precise tracking and additionally provides points in 3D space.

BlazePose has 'lite', 'full' and 'heavy' modes, set via `settings.blazePose.modelType`.
* _lite:_ least accurate, but the model is more lightweight (in terms of download and memory)
* _heavy:_ most accurate, but most heavyweight
* _full:_ a balance

### Runtime

BlazePose can run using two different _runtimes_, 'mediapipe' and 'tfjs'. 'tfjs' is the default, because it works best across all platforms. If you are not using iOS, switch to 'mediapipe' for higher performance. 

If the 'mediapipe' runtime is selected, ensure you have these SCRIPT tags:

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection"></script>
```

If you have the 'tfjs' runtime selected, ensure you have these SCRIPT tags:

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection"></script>
```

Read more about BlazePose:

* [Introduction](https://blog.tensorflow.org/2021/05/high-fidelity-pose-tracking-with-mediapipe-blazepose-and-tfjs.html)
* [BlazePose TFJS Github](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepos_tfjs)
* [BlazePose Mediapipe Github](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepos_tfjs)


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

## Troubleshooting

`TypeError: t.Pose is not a constructor`

* If you have changed the `runtime`, make sure you update the SCRIPT tags in the HTML appropriately.
