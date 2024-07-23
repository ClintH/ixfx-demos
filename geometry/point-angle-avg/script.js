import { Points, radianToDegree } from '../../ixfx/geometry.js';
import { scale } from '../../ixfx/numbers.js';
import * as Trackers from '../../ixfx/trackers.js';
import * as Util from './util.js';

let state = Object.freeze({
  /**
   * Keep track of pointer movements
   */
  moveTracker: Trackers.point({
    id: `move`,
    storeIntermediate: true,
    sampleLimit: 5
  }),
  /**
   * Keep track of average angle of movement
   */
  angleAvg: Trackers.number({
    id: `angle`,
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

  Util.setText(`lblAngleRadAvg`, avgRadians.toFixed(2));
  Util.setText(`lblAngleDegAvg`, avgDegreesCircle.toFixed(2));

  Util.setText(`lblAngleRadRaw`, rawRadians.toFixed(2));
  Util.setText(`lblAngleDegRaw`, rawDegreesCircle.toFixed(2));


  Util.rotateElementById(`thingAvg`, avgDegreesCircle);
  Util.rotateElementById(`thingRaw`, rawDegreesCircle);
};


const onPointerMove = (event) => {
  const { moveTracker, angleAvg } = state;
  event.preventDefault();

  const pointerRelative = Util.relativePos(event);
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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

