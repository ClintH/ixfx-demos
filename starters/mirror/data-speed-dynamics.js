import { clamp, interpolate } from '../../ixfx/numbers.js';

const settings = Object.freeze({
  fullMode: window.location.hash.includes(`full`),
  jumboSlider: window.location.hash.includes(`jumbo`),
  // On a full scale of 0..1000, what speed
  // is considered maximum
  speedMax: 20,
});

let state = Object.freeze({
  // Last position of slider (0..1000)
  /** @type number */
  lastSliderValue: 0,
  // Last calculated speed (0..1)
  /** @type number */
  speed: 0,
  // Value we want to reach (0..1)
  /** @type number */
  targetValue: 0,
  // Current value, enroute to targetValue (0..1)
  /** @type number */
  value: 0
});

const use = () => {
  const { fullMode } = settings;
  const { value } = state;

  // Update numeric output
  const labelElement = document.querySelector(`label[for="slider"]`);
  if (labelElement) labelElement.innerHTML = value.toFixed(2);

  // Map slider value to colour saturation
  const spotElement = /** @type HTMLElement */(document.querySelector(`#spot`));

  // 0..100
  const saturation = Math.round(value * 100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotElement && !fullMode) {
    spotElement.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl;
  }
};

// Called continuously in a loop
const update = () => {
  const { value, targetValue, speed } = state;

  // Interpolate from value -> targetValue.
  // Last speed of slider is scaled and used
  // for the interpolationAmt
  const amount = speed / 100;
  const interpolatedValue = interpolate(amount, value, targetValue);

  saveState({
    value: interpolatedValue
  });
};

const setup = () => {
  const { fullMode, speedMax, jumboSlider } = settings;

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
      // Value we want to reach via interpolation
      targetValue: v / 1000
    });
  });

  const buttonFullScreen = /** @type HTMLElement */(document.querySelector(`#btnFullScreen`));
  if (buttonFullScreen) {
    buttonFullScreen.addEventListener(`click`, event => {
      document.documentElement.requestFullscreen();
    });
    if (!fullMode) buttonFullScreen.style.display = `none`;
  }

  // Hide colour swatch if we're in 'full' mode
  if (fullMode) {
    const spotElement = /** @type HTMLElement */(document.querySelector(`#spot`));
    if (spotElement) spotElement.style.display = `none`;
  }

  if (jumboSlider) document.body.classList.add(`jumbo`);

  // Continuous loop
  const loop = () => {
    // Re-calculate value based on interpolation
    update();
    // Use value to update colour
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
