import { Points, radianToDegree } from '../../ixfx/geometry.js';
import { scale, numberTracker, pointTracker } from '../../ixfx/data.js';

let state = Object.freeze({
  /**
   * Keep track of pointer movements
   */
  moveTracker: pointTracker( {
    id:`move`,
    storeIntermediate: true,
    sampleLimit: 5
  }),
  /**
   * Keep track of average angle of movement
   */
  angleAvg: numberTracker({
    id:`angle`,
    storeIntermediate: true,
    // Use the last 100 samples for the average
    sampleLimit: 100
  })
});

const use = () => {
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


const onPointerMove = (event) => {
  const { moveTracker, angleAvg } = state;
  event.preventDefault();

  const pointerRelative = relativePos(event);
  const result = moveTracker.seen(pointerRelative);

  // Angle from last movement
  const angle = result.fromLast.angle;

  // Add to averager
  angleAvg.seen(angle);
};

function setup() {
  document.addEventListener(`pointermove`, onPointerMove);
  const loop = () => {
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
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

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
function setText(id, text)  {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  element.textContent = text;
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
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element) {
    element.style.transform = `rotate(${rotation}deg)`;
  }
}
