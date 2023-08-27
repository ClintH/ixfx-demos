/**
 * This is the worker, loaded by 'script.js'.
 * It is responsible for processing pixel frames, and is unable to
 * interact with the HTML document.
 * 
 * Please see README.md in the parent folder.
 */

/**
 * Define settings
 */
const settings = Object.freeze({
  // Difference in grayscale value to count as a changed pixel
  threshold: 30,
});

/**
 * Define state
 */
let state = Object.freeze({
  lastFrame: new Uint8ClampedArray()
});

/**
 * Process image data
 * @param {ImageData} frame 
 */
const processFrame = (frame) => {
  const { lastFrame } = state;
  const { threshold } = settings;

  if (lastFrame.length === 0) {
    // No previous frame
    console.log(`No prev frame`);
  } else {
    // Compare to previous frame
    const w = frame.width;
    const h = frame.height;

    // Count of differences
    let differences = 0;

    // Run left-to-right
    for (let x = 0; x < w; x++) {
      // ...top-to-bottom of the image frame
      for (let y = 0; y < h; y++) {
        // Get array indexes of a given pixel
        const indexes = rgbaIndexes(w, x, y);

        // Get colour values and calculate the grayscale value
        const pixel = rgbaValues(frame.data, indexes);
        const pixelGray = grayscale(pixel);

        // Get the grayscale value of the same pixel in last frame
        const lastFramePixelGray = grayscale(rgbaValues(lastFrame, indexes));

        // Compare to last frame, and if absolute difference exceeds
        // the threshold, count it
        const diff = Math.abs(pixelGray - lastFramePixelGray);
        if (diff > threshold) {
          differences++;
        }
      }
    }

    // Get a proportional difference, dividing by total number of pixels
    differences /= (w * h);

    // Send calculation back to main thread
    self.postMessage({ differences });
  }

  saveState({
    lastFrame: frame.data
  });
};

// Returns pixel indexes for rgba values at x,y
const rgbaIndexes = (width, x, y) => {
  const p = y * (width * 4) + x * 4;
  return [ p, p + 1, p + 2, p + 3 ];
};

// Get the pixel values for a set of indexes
const rgbaValues = (frame, indexes) => [
  frame[indexes[0]],
  frame[indexes[1]],
  frame[indexes[2]],
  frame[indexes[3]]
];

//const rgbaString = (values) => `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`;

// Returns a simple average of RGB (ignoring alpha)
const grayscale = (values) => (values[0] + values[1] + values[2]) / 3;

const setup = () => {
  // Process message from script.js
  self.addEventListener(`message`, listener => {
    // It sends us the pixel data and dimensions of frame
    const { pixels, width, height } = listener.data;
    const frame = new ImageData(new Uint8ClampedArray(pixels),
      width, height);

    // Process it
    processFrame(frame);
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}