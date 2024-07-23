/**
 * pixels-process: pixel-level manipulation of frames from a camera, 
 * drawing them to a canvas
 * 
 * Please see README.md in parent folder.
 */
import { Camera } from '../../ixfx/io.js';
import { Video } from '../../ixfx/visual.js';
import * as Trackers from '../../ixfx/trackers.js';
import { defaultErrorHandler } from '../../ixfx/dom.js';

const settings = Object.freeze({
  // Difference in grayscale value to count as a changed pixel
  threshold: 30,
  // If true, the differencing is shown. If false, 
  // just the difference calculation is shown
  visualise: true,
  frameIntervalTracker: Trackers.interval({ id: `fps`, resetAfterSamples: 100 }),
  // HTML Elements
  /** @type {HTMLCanvasElement|null} */
  canvasEl: document.querySelector(`#canvas`),
  /** @type {HTMLElement|null} */
  lblFps: document.querySelector(`#lblFps`),
  /** @type {HTMLElement|null} */
  lblDifferences: document.querySelector(`#lblDifferences`)
});

let state = Object.freeze({
  /** @type {number} */
  fps: 0,
  lastFrame: new Uint8ClampedArray(), // Empty array
  visFrame: new ImageData(1, 1), // Dummy image data
  /** @type {number} */
  differences: 0
});

/**
 * Update labels based on state
 */
const use = () => {
  const { fps, differences, visFrame } = state;
  const { visualise, lblFps, lblDifferences, canvasEl } = settings;

  if (lblFps) lblFps.textContent = `FPS: ${fps}`;
  if (lblDifferences)
    lblDifferences.textContent = `Differences: ${Math.round(differences * 100)}%`;

  // Get drawing context if possible
  const context = canvasEl?.getContext(`2d`);
  if (canvasEl === null || !context) return;

  // Write pixels to canvas. Pixels that were different are unchanged, 
  // so they come through in original colour but pixels deemed same 
  // as last frame were changed to grayscale and translucent
  if (visualise) context.putImageData(visFrame, 0, 0);

};

/**
 * In this simple frame processor, the current frame is compared
 * to the last frame. Pixels are compared to get the amount of change
 * frame-on-frame.
 * 
 * @param {ImageData} frame 
 */
const update = (frame) => {
  const { data } = frame;
  const { lastFrame } = state;
  const { threshold, frameIntervalTracker, visualise } = settings;

  // Counter for how many pixels have changed
  let differences = 0;

  // Copy frame data
  const frameDataCopy = new Uint8ClampedArray(frame.data);

  if (lastFrame.length === 0) {
    // No previous frame
  } else {
    // Compare to previous frame
    differences = 0;
    const w = frame.width;
    const h = frame.height;

    // Proceed left-to-right
    for (let x = 0; x < w; x++) {
      // ...top-to-bottom
      for (let y = 0; y < h; y++) {
        // Get array indexes of pixel
        const indexes = rgbaIndexes(w, x, y);

        // Get RGBA values and then compute grayscale value
        const pixel = rgbaValues(data, indexes);
        const pixelGray = grayscale(pixel);

        // Get the grayscale value of the same pixel in last frame
        const lastFramePixelGray = grayscale(rgbaValues(lastFrame, indexes));

        // Calculate absolute difference (don't care if it's higher or lower)
        const diff = Math.abs(pixelGray - lastFramePixelGray);

        // If difference is greater than the threshold, count it
        if (diff > threshold) {
          differences++;
        } else {
          if (visualise) {
            // Pixel is the same as before, set it to
            // a translucent grayscale
            data[indexes[0]] = pixelGray; // R
            data[indexes[1]] = pixelGray; // G
            data[indexes[2]] = pixelGray; // B
            data[indexes[3]] = 10;        // A
          }
        }
      }
    }


    // Get a proportional difference, dividing by total number of pixels
    differences /= (w * h);
  }

  // Keep track of how long it takes us to process frames
  frameIntervalTracker.mark();

  saveState({
    fps: Math.round(1000 / frameIntervalTracker.avg),
    lastFrame: frameDataCopy,
    differences,
    visFrame: frame
  });
};

/**
 * Get array indexes for pixel at x,y. This is four indexes,
 * for R, G, B and A.
 * @param {number} width Width of frame
 * @param {number} x X position
 * @param {number} y Y position
 * @returns number[]
 */
const rgbaIndexes = (width, x, y) => {
  const p = y * (width * 4) + x * 4;
  return [p, p + 1, p + 2, p + 3];
};

/**
 * Get the pixel values for a set of indexes
 * @param {Uint8ClampedArray} frame 
 * @param {number[]} indexes 
 * @returns number[]
 */
const rgbaValues = (frame, indexes) => [
  frame[indexes[0]],
  frame[indexes[1]],
  frame[indexes[2]],
  frame[indexes[3]]
];

/**
const rgbaString = (values) => `rgba(${values[0]}, 
  ${values[1]}, ${values[2]}, ${values[3]})`;
*/

/**
 * Calculates grayscale value of a pixel (ignoring alpha)
 * @param {number[]} values 
 * @returns number
 */
const grayscale = (values) => (values[0] + values[1] + values[2]) / 3;

const startVideo = async () => {
  const { canvasEl, visualise } = settings;

  // Init camera
  const { videoEl, dispose } = await Camera.start({
    ideal: { width: 800, height: 600 }
  });

  // Get drawing context if possible
  const context = canvasEl?.getContext(`2d`);
  if (canvasEl === null || !context) return;

  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  // Hide canvas if visualise is turned off
  if (!visualise) canvasEl.style.display = `none`;

  try {
    // Video.frames generator loops forever, 
    // returning ImageData from video stream
    for await (const frame of Video.frames(videoEl)) {
      // Update calculations
      update(frame);
      use();
    }
  } catch (error) {
    dispose();
    throw error;
  }
};

function setup() {
  defaultErrorHandler();
  document.querySelector(`#btnStart`)?.addEventListener(`click`, async () => {
    await startVideo();
  });
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}