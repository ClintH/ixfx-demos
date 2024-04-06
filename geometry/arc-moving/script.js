import { Arcs } from '../../ixfx/geometry.js';
import { timeout, continuously } from '../../ixfx/flow.js';
import * as Numbers from '../../ixfx/numbers.js';

const settings = Object.freeze({
  // Loop back and forth between 0 and 1, 0.0.1 steps at a time
  pingPong: Numbers.pingPongPercent(0.01),
  // Arc settings
  endAngle: 180,
  radiusProportion: 0.3,
  startAngle: 0,
  movedEl: /** @type HTMLElement */(document.querySelector(`#moved`))
});

let state = Object.freeze({
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  coord: { x: 0, y: 0 }
});

// Update state of world
const update = () => {
  // Get fields we need
  const { pingPong, radiusProportion } = settings;
  const bounds = state.bounds;
  const center = bounds.center;

  // Set radius to be proportional to screen size so it's always visible
  // - Radius will be radiusProportion% of viewport 
  //   width or height, whichever is smaller
  const radius = Math.min(bounds.width, bounds.height) * radiusProportion;

  // Define arc
  const arc = Arcs.fromDegrees(
    radius,
    settings.startAngle,
    settings.endAngle,
    center);

  // Calculate relative point on arc using current pingpong amount
  const coord = Arcs.interpolate(pingPong.next().value, arc);

  // Update state
  saveState({
    coord
  });
};

const use = () => {
  const { movedEl } = settings;
  const { coord } = state;
  if (movedEl === null) return;

  // Move calculated position on arc
  movedEl.style.transform = `translate(${coord.x}px, ${coord.y}px)`;
};

// Update state when viewport size changes
const sizeChange = () => {
  // Center of viewport
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const center = { x: width / 2, y: height / 2 };

  // Update state
  saveState({
    bounds: { width, height, center },
  });
};

function setup() {
  const { movedEl } = settings;

  window.addEventListener(`resize`, sizeChange);
  sizeChange(); // Trigger to use current size

  // After 2 seconds, reset button text
  const clickedTimeout = timeout(() => {
    if (movedEl) movedEl.textContent = `Click me!`;
  }, 2000);

  // If button is clicked, change text and start reset timeout
  movedEl?.addEventListener(`click`, () => {
    if (movedEl) movedEl.textContent = `Bravo!`;
    clickedTimeout.start();
  });

  // Keep running at animation speed
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}