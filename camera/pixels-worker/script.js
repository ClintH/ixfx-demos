/**
 * pixels-worker: process image frames in a separate worker thread.
 * The image processing happens in `worker.js`.
 * 
 * Please see README.md in parent folder.
 */
import { Camera } from '../../ixfx/io.js';
import { Video } from '../../ixfx/visual.js';
import * as Trackers from '../../ixfx/trackers.js';
import { defaultErrorHandler } from '../../ixfx/dom.js';

/**
 * Define settings
 */
const settings = Object.freeze({
  worker: new Worker(`worker.js`),
  diffTracker: Trackers.number({ id: `difference`, resetAfterSamples: 200 }),
  frameIntervalTracker: Trackers.interval({ id: `fps`, resetAfterSamples: 100 }),
  // HTML elements for status
  /** @type {HTMLElement|null} */
  lblFps: document.querySelector(`#lblFps`),
  /** @type {HTMLElement|null} */
  lblDifferences: document.querySelector(`#lblDifferences`),
  /** @type {HTMLElement|null} */
  lblDiffVu: document.querySelector(`#lblDiffVu`)
});

/**
 * Define state
 */
let state = Object.freeze({
  /** @type {number} */
  fps: 0,
  /** @type {number} */
  differences: 0,
  diffVu: ``
});

const use = () => {
  const { fps, differences, diffVu } = state;
  const { lblFps, lblDifferences, lblDiffVu } = settings;

  // Update HTML labels
  if (lblFps) lblFps.textContent = `FPS: ${fps}`;
  if (lblDifferences)
    lblDifferences.textContent = `Differences: ${percentage(differences)}`;
  if (lblDiffVu) lblDiffVu.innerHTML = diffVu;
};

const startVideo = async () => {
  const { worker, frameIntervalTracker } = settings;
  const { videoEl, dispose } = await Camera.start();

  try {
    // Video.frames generator loops forever,
    // returning ImageData from video stream
    for await (const frame of Video.frames(videoEl)) {

      // Post frame to the worker for processing
      worker.postMessage({
        pixels: frame.data.buffer,
        width: frame.width,
        height: frame.height,
        channels: 4
      }, [frame.data.buffer]);

      // Keep track of how long it takes us to process frames
      frameIntervalTracker.mark();

      saveState({
        fps: Math.round(1000 / frameIntervalTracker.avg)
      });
    }
  } catch (error) {
    console.error(error);

    // Clean up camera
    dispose();
  }
};

/**
 * Returns a human-friendly percentage string
 * @param {number} v 
 * @returns 
 */
const percentage = (v) => Math.round(v * 100) + `%`;

function setup() {
  const { worker } = settings;
  defaultErrorHandler();

  // Start camera when button is pressed
  document.querySelector(`#btnStart`)?.addEventListener(`click`, async () => {
    await startVideo();
  });

  // Listen for results from the worker
  worker.addEventListener(`message`, event => {
    const d = event.data;
    const { diffTracker } = settings;

    diffTracker.seen(d.differences);
    const mma = diffTracker.getMinMaxAvg();

    // Add what the worker sends to the state
    saveState({
      ...d,
      diffVu: `
       max: ${percentage(mma.max)}<br />
       avg: ${percentage(mma.avg)}<br />
       min: ${percentage(mma.min)}`
    });

    use();
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