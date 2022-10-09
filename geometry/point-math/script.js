import { Points, radianToDegree } from '../../ixfx/geometry.js';

// Initial state with empty values
let state = Object.freeze({

  /**
   * Point to compare against (in relative coords)
   */
  reference: {
    x: 0.5,
    y: 0.5
  },
  /**
   * Other point to compare to
   */
  location: {
    x: Math.random(),
    y: Math.random()
  },
  /** 
   * Calculated angle between reference and location
   * @type {number} 
   */
  angleDeg: 0,
  /** 
   * Calculated distance between reference and location
   * @type {number} 
   */
  distance: 0,
  /**
   * Current position of pointer
   */
  pointer: { x: 0, y: 0 }
});

// Update state of world
const onTick = () => {
  const { pointer, reference } = state;

  // Demo some calculations
  // Because we're using relative points, distance will be a percentage
  const distance = Points.distance(reference, pointer);

  // Angle
  const angleDeg = radianToDegree(Points.angle(reference, pointer));

  // Update state with calculations...
  updateState({
    location: pointer,
    distance,
    angleDeg
  });
};

const useState = () => {
  const { location, reference, distance, angleDeg } = state;
  const thingEl = document.getElementById(`thing`);
  const referenceEl = document.getElementById(`reference`);
  const distanceEl = document.getElementById(`lblDistance`);
  const angleDegEl = document.getElementById(`lblAngleDeg`);

  if (!thingEl) return;
  if (!referenceEl) return;
  if (!distanceEl || !angleDegEl) return;
  
  // Position element that tracks pointer
  positionElementByRelative(thingEl, location);

  // Position 'reference' element
  positionElementByRelative(referenceEl, reference);

  // Update labels
  distanceEl.innerText = distance.toPrecision(2);
  angleDegEl.innerText = Math.round(angleDeg).toString();
};

/**
 * Handle pointerdown and pointermove
 * @param {PointerEvent} e 
 */
const onPointerMoveOrDown = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  updateState({
    // Make pointer position relative (on 0..1 scale)
    pointer: Points.divide(x, y, window.innerWidth, window.innerHeight)
  });
};
  
/**
 * Setup and run main loop 
 */
const setup = () => {
  document.addEventListener(`pointerdown`, onPointerMoveOrDown);
  document.addEventListener(`pointermove`, onPointerMoveOrDown);

  const loop = () => {
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();
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
 * Positions an element using relative coordinates
 * @param el {HTMLElement}
 * @param pos {{x:number, y:number}}
 */
function positionElementByRelative(el, pos) {
  pos = Points.multiply(pos, window.innerWidth, window.innerHeight);

  const b = el.getBoundingClientRect();
  const p = Points.subtract(pos, b.width / 2, b.height / 2);
  el.style.transform = `translate(${p.x}px, ${p.y}px)`;
}