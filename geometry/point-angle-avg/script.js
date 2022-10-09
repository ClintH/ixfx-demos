import { Points, radianToDegree } from '../../ixfx/geometry.js';
import { scale, numberTracker, pointTracker } from '../../ixfx/data.js';

let state = Object.freeze({
  /**
   * Keep track of pointer movements
   */
  moveTracker: pointTracker(`move`, {
    storeIntermediate: true,
    sampleLimit: 5
  }),
  /**
   * Keep track of average angle of movement
   */
  angleAvg: numberTracker(`angle`, {
    storeIntermediate: true,
    // Use the last 100 samples for the average
    sampleLimit: 100
  })
});

const useState = () => {
  const { angleAvg } = state;
  
  const avgRadians = angleAvg.avg;
  const avgDegrees = radianToDegree(avgRadians);

  let rawRadians = angleAvg.last;
  if (!rawRadians) rawRadians = 0;
  const rawDegrees = radianToDegree(rawRadians);

  // Degrees will be on -180 ... 180 scale
  const avgDegreesCircle = scale(avgDegrees, -180, 180, 0, 359);
  const rawDegreesCircle = scale(rawDegrees, -180, 180, 0, 359);

  setText(`lblAngleRadAvg`, avgRadians.toFixed(2));
  setText(`lblAngleDegAvg`, avgDegreesCircle.toFixed(2));

  setText(`lblAngleRadRaw`, rawRadians.toFixed(2));
  setText(`lblAngleDegRaw`, rawDegreesCircle.toFixed(2));


  rotateElementById(`thingAvg`, avgDegreesCircle);
  rotateElementById(`thingRaw`, rawDegreesCircle);
};


const onPointerMove = (e) => {
  const { moveTracker, angleAvg } = state;
  e.preventDefault();

  const rel = relativePos(e);
  const result = moveTracker.seen(rel);

  // Angle from last movement
  const angle = result.fromLast.angle;

  // Add to averager
  angleAvg.seen(angle);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  document.addEventListener(`pointermove`, onPointerMove);
  const loop = () => {
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
function setText(id, text)  {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = text;
}

/**
 * Returns the relative position from an absolute one
 * @param {Points.Point} pos 
 * @returns {Points.Point}
 */
function relativePos(pos) {
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight
  };
}

function rotateElementById(id, rotation) {
  const el = document.getElementById(id);
  if (el) {
    el.style.transform = `rotate(${rotation}deg)`;
  }
}
