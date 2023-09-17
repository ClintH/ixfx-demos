import { interpolate, pointTracker, clamp } from "../../ixfx/data.js";
import {textContent} from "./util.js";

// #region Settings & state
const settings = Object.freeze({
  // Tracker for point. Reset when there is a pointerdown
  tracker: pointTracker({
    sampleLimit: 5
  }),
  // How much to decay values by each loop
  decayAmount: 0.99,
  // Interpolation speed to new value
  interpolateAmount: 0.25,
  // What seems to be the highest speed
  speedMax: 2
});

let state = Object.freeze({
  /** 
   * Info about pointer location with respect to initial pointerdown
   * @type import("../../ixfx/data.js").PointTrack|undefined */
  fromLast: undefined,
  /** @type number */
  angle: 0,
  /** @type number */
  speed:0
});
// #endregion

const update = () => {
  let { speed } = state;
  const { decayAmount, interpolateAmount, speedMax } = settings;

  // Get latest info from pointer move
  const { fromLast } = state;
  
  // Decay values
  speed = speed * decayAmount;

  // Yes, there is new data from the pointTracker
  if (fromLast) {
    // Get relative speed
    const relativeSpeed = clamp(fromLast.speed / speedMax);

    // Interpolate to new speed value
    speed = interpolate(interpolateAmount, speed, relativeSpeed);
  }

  saveState({
    // Reset last data
    fromLast: undefined,

    // Update speed
    speed
  });

  // Visualise
  use();
};

const use = () => {
  const { speed } = state;
  
  // Update HTML element with current speed
  textContent(`#speed`,speed);
};

function setup() {
  document.addEventListener(`pointerdown`, event => {
    // Reset tracker
    settings.tracker.reset();
  });

  document.addEventListener(`pointermove` ,event => {
    const { tracker } = settings;

    // Add to tracker, get back computed results
    const info = tracker.seenEvent(event);

    saveState( {
      // Keep track of infom about move event with respect
      // to last pointerdown
      fromLast: info.fromLast
    });
  });
  
  // Call every half a second
  setInterval(update, 500);
};

// #region Toolbox
/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
setup();
// #endregion