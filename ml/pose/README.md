# pose-detection

* [Main readme for all ml-vision](../README.md)
* [TFJS Pose Detection readme](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection)

Overview of sketches:

| sketch                  | demonstrates                                                |
|-------------------------|-------------------------------------------------------------|
| single                  | smoothing a single pose                                     |
| multiple                | handling multiple sources and multiple poses                |
| geometry                | calculations based on relationship between points           |
| source                  | a common data source (loaded in a new window) for the others |

# Getting started

Quick start:
1. Running a local web server, browse the provided 'single' sketch in your browser. It may take a moment to load the TensorFlow model.
2. Click the yellow checkmark in the top-right panel to use your camera.
3. Take a look at the shape of the raw data streaming in the console

The next step is to comment out the following lines in _single/index.html_. This will remove the corner panel.

```html
<button id="btnCloseFrame">Close panel</button>
<section id="sourceSection">
  <iframe src="source.html"></iframe>
</section>
```

Now, use a separate browser window with _source.html_ loaded. This way, as you tinker you won't have to re-initialise the TensorFlow model and connect to the camera. See [the main README](../README.md) for more info on this.

**Note:** Your browser may stop or slow down processing in the separate window if it is minimised or behind other windows. Resize it so its small and have it occupy some space on your screen.

# Models

The TensorFlow.js (that's the name of the product, not a Javascript file) pose detection library has three models: _MoveNet_, _BlazePose_ and _PoseNet_. For most cases, MoveNet is the model to choose, but read on for the differences.

The model can be set through the `settings.model` property (in `source.js`). It can also be set [via URL parameters](#url-parameters).

```js
const settings = {
  model: `MoveNet`, // `BlazePose` or `PoseNet`
}
```

Pose detection models can:
* Identify key points point of the human body in reference to the camera frame.
* Key points are named, so it's possible to get the position of the nose, right ankle, and so on.
* Each key point is individually scored on a scale of 0...1, where 1 is the highest confidence.
* The overall pose is also given a score (not the case for some settings).
* MoveNet has the possibility to detect poses of up to six bodies at a time, but most models are optimised for a single body.

There are some differences with what named key points are returned, see [the TFJS documentation for an overview](https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/README.md#pose-estimation).

## MoveNet

MoveNet is considered the fastest and most accurate of the available TFJS models, detecting 17 points of a body.

It three modes:
1. _SinglePose.Lightning:_ optimised for speed, only a single body (default)
2. _SinglePose.Thunder:_ optimised for accuracy, only a single body
3. _MultiPose.Lightning:_ slower than 'SinglePose.Lightning' but can detect up to six bodies and also returns a bounding box for each pose.

The mode can be set the `moveNet.modelType` variable (in `source.js`):

```js
const moveNet = {
  enableTracking: true,
  enableSmoothing: true,
  modelType: `MultiPose.Lightning`
};
```

Read more about MoveNet:

* [Introduction](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html)
* [GitHub](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet)

## BlazePose

BlazePose offers more key points than MoveNet and PoseNet, allowing for more precise tracking and additionally provides points in 3D space.

BlazePose has 'lite', 'full' and 'heavy' modes, set via `settings.blazePose.modelType`.
* _lite:_ least accurate, but the model is more lightweight (in terms of download and memory)
* _heavy:_ most accurate, but most heavyweight
* _full:_ a balance

It's configured with the `blazePose` variable (in `source.js`):

```js
const blazePose = {
  runtime: `tfjs`,
  enableSmoothing: true,
  modelType: `full`
};
```

### Runtime

BlazePose can run using two different 'runtimes', _mediapipe_ and _tfjs_. _tfjs_ is the default, because it works best across all platforms. If you are not using iOS, switch to _mediapipe_ for higher performance. 

If the _mediapipe_ runtime is selected, ensure you have these SCRIPT tags:

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
* [BlazePose TFJS GitHub](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepos_tfjs)
* [BlazePose Mediapipe GitHub](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepos_tfjs)

## PoseNet

PoseNet is considered a legacy model, with MoveNet being the preferred option. Like MoveNet, PoseNet tracks 17 points on the body and can run in single-pose or multiple-pose modes.

# Remote data

See the main [README](../README.md) for info on using your phone as a remote camera source. By default, each source will have a random id. To assign an id, `source.html` can be accessed with an _id_ [URL parameter](#url-parameters):
  
  `source.html?model=MoveNet&moveNetModelType=MultiPose.lightning&id=mobilephone`

In the above example, note the `id=mobilephone` in the URL. 

# URL parameters

_source.html_ can be loaded with URL parameters to make minor adjustments without modifying code. Please see _source.js_ for more details.

For example: `source.html?model=MoveNet&moveNetModelType=MultiPose.Lightning` will use the MoveNet model, with MultiPose.Lightning, for detecting multiple poses.

# common-pose.js

All the pose sketches import a small library, `common-pose.js`. Read the source and documentation for more details.

In brief...

`sanityCheck(pose:Pose, opts:SanityChecks) => Pose`
* Reduces score of keypoints which seem wrong (eg ankles being above shoulders). By default all the checks are enabled, so you may need to customise the options to disable certain checks if you don't want to penalise certain kinds of poses.
* It additionally removes keypoints below a given threshold
* Returned pose is a copy of the input pose with these changes made.

`smoothPose(amt:number, a:Pose, b:Pose) => Pose`
* Interpolate from pose A to B by given amount. Returns a new pose.

`absPose = (p, bounds, horizontalMirror = false) => Pose`
* Returns a pose with all keypoints and bounding box mapped to the given `bounds`
* eg for converting a relative pose into screen coordinates

`debugDrawPose = (ctx, p, opts = {})`
* Draws the keypoints, names and scores for a pose in the given drawing context

`commonPoseSetup()`
* Listens for button presses that control the source IFRAME

`poseProcessor(smoothingAmt:number, sanityOpts:SanityChecks) => (pose:Pose) => Pose`
* Returns a 'PoseProcessor'

`PoseProcessor.process(pose:Pose)=>Pose`
* This function does runs `sanityCheck` and `smoothPose`, returning result

`PoseProcessor.processed:Pose`
* This property is the last processed pose

`PoseProcessor.id:string`
* Id of pose being processed


# Troubleshooting

`TypeError: t.Pose is not a constructor`

* If you have changed the `runtime`, make sure you update the SCRIPT tags in the HTML appropriately.
