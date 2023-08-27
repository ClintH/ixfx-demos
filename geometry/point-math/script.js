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
const update = () => {
  const { pointer, reference } = state;

  // Demo some calculations
  // Because we're using relative points, distance will be a percentage
  const distance = Points.distance(reference, pointer);

  // Angle
  const angleDeg = radianToDegree(Points.angle(reference, pointer));

  // Update state with calculations...
  saveState({
    location: pointer,
    distance,
    angleDeg
  });
};

const use = () => {
  const { location, reference, distance, angleDeg } = state;
  const thingElement = document.querySelector(`#thing`);
  const referenceElement = document.querySelector(`#reference`);
  const distanceElement = document.querySelector(`#lblDistance`);
  const angleDegElement = document.querySelector(`#lblAngleDeg`);

  if (!thingElement) return;
  if (!referenceElement) return;
  if (!distanceElement || !angleDegElement) return;
  
  // Position element that tracks pointer
  positionElementByRelative(thingElement, location);

  // Position 'reference' element
  positionElementByRelative(referenceElement, reference);

  // Update labels
  distanceElement.textContent = distance.toPrecision(2);
  angleDegElement.textContent = Math.round(angleDeg).toString();
};

/**
 * Handle pointerdown and pointermove
 * @param {PointerEvent} event 
 */
const onPointerMoveOrDown = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  saveState({
    // Make pointer position relative (on 0..1 scale)
    pointer: Points.divide(x, y, window.innerWidth, window.innerHeight)
  });
};
  
function setup() {
  document.addEventListener(`pointerdown`, onPointerMoveOrDown);
  document.addEventListener(`pointermove`, onPointerMoveOrDown);

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
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
 * Positions an element using relative coordinates
 * @param el {HTMLElement}
 * @param pos {{x:number, y:number}}
 */
function positionElementByRelative(element, pos) {
  pos = Points.multiply(pos, window.innerWidth, window.innerHeight);

  const b = element.getBoundingClientRect();
  const p = Points.subtract(pos, b.width / 2, b.height / 2);
  element.style.transform = `translate(${p.x}px, ${p.y}px)`;
}