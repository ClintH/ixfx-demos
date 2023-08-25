import { Points } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  // Upwards vector to compare against
  compareTo: { x: 0, y: -1 },
  dotProductEl: /** @type HTMLElement */(document.querySelector(`#dot-product`)),
  vectorEl: /** @type HTMLElement */(document.querySelector(`#vector`))
});

let state = Object.freeze({
  heading: {x:0,y:0},
  /** @type number */
  dotProduct: 0
});

const useState = () => {
  const { vectorEl, dotProductEl } = settings;
  const { heading, dotProduct } = state;
  
  vectorEl.innerHTML = Points.toString(heading);
  dotProductEl.innerHTML = dotProduct.toString();
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

  const movement = {x:event.movementX, y:event.movementY};
  console.log(movement);

  // If there's not much movement, ignore
  if (Points.withinRange(movement, Points.Empty, 2)) return;

  // Calculate movement vector
  // eg. east {x:1, y:0}
  // eg. south-east {x: 1, y: 1}
  // eg: north-west {x: -1, y: -1}
  const heading = Points.normalise(movement);

  const dotProduct = Points.dotProduct(heading, compareTo);
  
  updateState({heading, dotProduct});
  useState();
};

const setup = () => {
  document.addEventListener(`pointermove`, onPointerMove);
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
