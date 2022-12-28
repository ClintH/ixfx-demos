import { continuously } from '../../ixfx/flow.js';
import { Points } from '../../ixfx/geometry.js';
import { Polar } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  // how many points to distribute around the circumference
  totalPoints: 8
});

let state = Object.freeze({
  /** 
   * Polar points
   * @type {{angleRadian:number, distance:number}[]}
   * */
  points: []
});

const useState = () => {
  const { points } = state;
  
  const origin = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
  };

  points.forEach((pt,index) => {
    const el = document.getElementById(`pt-${index}`);
    if (el === null) return;
    const absPolar = Polar.multiply(pt, scaleBy());
    const absPt = Polar.toCartesian(absPolar, origin);
    positionElementByAbs(el, absPt);
  });
};

const setup = () => {
  const { totalPoints } = settings;

  // Evenly distribute angle by number of points
  const angleSteps = (Math.PI*2) / totalPoints;
  const points = [];
  let angle = 0;

  for (let i=0;i<totalPoints;i++) {
    // Create polar coordinate for this point
    points.push({
      distance: 0.3,
      angleRadian: angle
    });
    angle += angleSteps;

    // Create HTML element for this # point
    const el = document.createElement(`DIV`);
    el.id = `pt-${i}`;
    el.classList.add(`pt`);
    document.body.append(el);
  }
  saveState({ points });
};
setup();

// Call `useState` continuously
continuously(useState).start();

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

/**
 * Returns the scale factor
 * (the smaller of either the window width/height)
 * @returns 
 */
function scaleBy() {
  return Math.min(window.innerWidth, window.innerHeight);
}

/**
 * Positions an element using absolute coordinates
 * @param el {HTMLElement}
 * @param pos {{x:number, y:number}}
 */
function positionElementByAbs(el, pos) {
  const b = el.getBoundingClientRect();
  pos = Points.subtract(pos, b.width / 2, b.height / 2);
  el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
}