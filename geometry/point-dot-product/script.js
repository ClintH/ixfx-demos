import { Points } from '../../ixfx/geometry.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Upwards vector to compare against
  compareTo: { x: 0, y: -1 }
});

let state = Object.freeze({
  // Current heading
  heading: { x:0, y:0 },
  /** 
   * Current dot product
   * @type number */
  dotProduct: 0
});

const use = () => {
  const { heading, dotProduct } = state;
  
  // TODO: Do something interesting with dotProduct

  // ...for debug, display data
  Util.setHtml(`dot-product`, dotProduct.toString());
  Util.setHtml(`vector`, Points.toString(heading));
};

/**
 * Pointer move
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { compareTo } = settings;
  event.preventDefault();

  // Only process if a button is being pressed
  if (event.buttons === 0) return;

  const movement = Util.addUpSignedMovement(event);

  // If there's not much movement, ignore
  if (Points.withinRange(movement, Points.Empty, 2)) return;

  // Calculate movement vector
  // eg. east {x:1, y:0}
  // eg. south-east {x: 1, y: 1}
  // eg: north-west {x: -1, y: -1}
  const heading = Points.normalise(movement);

  // Calculate dot product of heading and target vector
  const dotProduct = Points.dotProduct(heading, compareTo);
  
  saveState({ heading, dotProduct });
  use();
};

function setup() {
  document.addEventListener(`pointermove`, onPointerMove);
};
setup();

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
