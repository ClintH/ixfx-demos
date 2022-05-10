/**
 * Demonstates starting a video stream, accessing the frames for
 * processing, and then drawing an overlay.
 * 
 * In this case, the processing compares the current video frame to the last, 
 * counting the number of pixels which have changed. This is boiled down to a % in
 * state.differences. It also visually overlays the changed pixels, but this step is not
 * necessary for the calculation.
 * 
 * Settings:
 *  threshold: how much change in grayscale value counts as a changed pixel. Lower = more sensitive
 *  visualise: if 'false', the video feed is not shown
 * 
 * This technique works well if you only want to show processed pixels, and the
 * output matches the input dimensions.
 * 
 * For a variation, see the `camera-process` demo. That that sketch, we edit pixels in the frame buffer
 * and draw it as a whole frame rather than drawing on top.
 */
import {Camera} from '../../ixfx/io.js';
import {Video} from '../../ixfx/visual.js';
import {intervalTracker} from '../../ixfx/temporal.js';

const settings = {
  // Difference in grayscale value to count as a changed pixel
  threshold: 30,
  // If true, the differencing is shown. If false, just the difference calculation is shown
  visualise: true,
  /** @type {HTMLCanvasElement} */
  canvasEl: document.getElementById(`canvas`),
  lblFps: document.getElementById(`lblFps`),
  lblDifferences: document.getElementById(`lblDifferences`),
  frameIntervalTracker: intervalTracker(`fps`, 100)
}

let state = {
  fps: 0,
  lastFrame: new Uint8ClampedArray(),
  differences: 0
}

const draw = () => {
  const {fps, differences} = state;
  const {lblFps, lblDifferences} = settings;
  lblFps.innerText = `FPS: ${fps}`;
  lblDifferences.innerText = `Differences: ${Math.round(differences * 100)}%`;
}

// Returns pixel indexes for rgba values at x,y
const rgbaIndexes = (width, x, y) => {
  const p = y * (width * 4) + x * 4;
  return [p, p + 1, p + 2, p + 3]
}

// Get the pixel values for a set of indexes
const rgbaValues = (frame, indexes) => [
  frame[indexes[0]],
  frame[indexes[1]],
  frame[indexes[2]],
  frame[indexes[3]]
];

// Returns a simple average of RGB (ignoring alpha)
const grayscale = (values) => (values[0] + values[1] + values[2]) / 3;

/**
 * In this simple frame processor, the current frame is compared
 * to the last frame. Pixels are compared to get the amount of change
 * frame-on-frame.
 * 
 * @param {ImageData} frame 
 * @param {CanvasRenderingContext2D} ctx
 */
const update = (frame, ctx) => {
  const {data} = frame;
  const {lastFrame} = state;
  const {threshold, frameIntervalTracker, visualise} = settings;
  let differences = 0;
  if (lastFrame.length === 0) {
    // No previous frame
  } else {
    // Compare to previous frame
    differences = 0;

    const w = frame.width;
    const h = frame.height;
    ctx.fillStyle = `magenta`;
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const indexes = rgbaIndexes(w, x, y);
        const pixel = rgbaValues(data, indexes);
        const pixelGray = grayscale(pixel);

        // Get the grayscale value of the same pixel in last frame
        const lastFramePixelGray = grayscale(rgbaValues(lastFrame, indexes));

        const diff = Math.abs(pixelGray - lastFramePixelGray);
        if (diff > threshold) {
          differences++;
          if (visualise) ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Get a proportional difference, dividing by total number of pixels
    differences /= (w * h);
  }

  frameIntervalTracker.mark(); // Keep track of how long it takes us to process frames

  state = {
    ...state,
    fps: Math.round(1000 / frameIntervalTracker.avg),
    lastFrame: data,
    differences
  }
}

const startVideo = async () => {
  const {canvasEl, visualise} = settings;
  const {videoEl, dispose} = await Camera.start();
  const ctx = canvasEl.getContext(`2d`);
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  // Hide canvas if visualise is turned off
  if (!visualise) canvasEl.style.display = `none`;

  try {
    // Video.frames generator loops forever, returning ImageData from video stream
    for await (const frame of Video.frames(videoEl, {canvasEl})) {
      // Update calculations
      update(frame, ctx);

      // Update labels
      draw();
    }
  } catch (ex) {
    console.error(ex);
    dispose();
  }
}

const setup = () => {
  document.getElementById(`btnStart`).addEventListener(`click`, async () => {
    try {
      await startVideo();
    } catch (ex) {
      console.error(`Could not start video`);
      console.error(ex);
    }
  });
}
setup();
