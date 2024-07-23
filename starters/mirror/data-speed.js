import { clamp } from '../../ixfx/numbers.js';

const settings = Object.freeze({
  fullMode: window.location.hash === `#full`,
  // On a full scale of 0..1000, what speed
  // is considered maximum
  speedMax: 20
});

let state = Object.freeze({
  /** @type number */
  lastSliderValue: 0,
  /** @type number */
  speed: 0
});

const use = () => {
  const { fullMode } = settings;
  const { speed } = state;

  // Update numeric output
  const labelElement = /** @type HTMLElement */(document.querySelector(`label[for="slider"]`));
  if (labelElement) labelElement.innerHTML = speed.toFixed(2);

  // Map slider value to colour saturation
  const spotElement = /** @type HTMLElement */(document.querySelector(`#spot`));

  // 0..100
  const saturation = Math.round(speed * 100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotElement && !fullMode) {
    spotElement.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl;
  }
};

function setup() {
  const { fullMode, speedMax } = settings;

  document.querySelector(`#slider`)?.addEventListener(`input`, event => {
    const element = /** @type HTMLInputElement|null */(event.target);
    if (!element) return;

    // Convert to number
    const v = Number.parseInt(element.value);

    // Compare with last value, ignoring if
    // it's a +/- change
    const diff = Math.abs(v - state.lastSliderValue);

    // Get a speed value of 0..1
    const speed = clamp(diff / speedMax);

    // TODO: It would be better if the speed value
    // was blended into the current speed, and for
    // speed to slowly reduce when there is no movement.
    // movingAverageLight (discussed here: https://clinth.github.io/ixfx-docs/data/averaging/) would be useful.

    saveState({
      lastSliderValue: v,
      speed,
    });
    use();
  });

  const buttonFullScreen = /** @type HTMLElement */(document.querySelector(`#btnFullScreen`));
  if (buttonFullScreen) {
    buttonFullScreen.addEventListener(`click`, event => {
      document.documentElement.requestFullscreen();
    });
    if (!fullMode) buttonFullScreen.style.display = `none`;
  }

  if (fullMode) {
    const spotElement = /** @type HTMLElement */(document.querySelector(`#spot`));
    if (spotElement) spotElement.style.display = `none`;
  }
  use();
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
