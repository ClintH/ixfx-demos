import { clamp } from '../../ixfx/data.js';

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

const useState = () => {
  const { fullMode } = settings;
  const { speed } = state;

  // Update numeric output
  const labelEl = document.querySelector(`label[for="slider"]`);
  if (labelEl) labelEl.innerHTML = speed.toFixed(2);

  // Map slider value to colour saturation
  const spotEl = document.getElementById(`spot`);

  // 0..100
  const saturation = Math.round(speed*100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotEl && !fullMode) {
    spotEl.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl; 
  }
};

const setup = () => {
  const { fullMode, speedMax } = settings;

  document.getElementById(`slider`)?.addEventListener(`input`, evt => {
    const el = /** @type HTMLInputElement|null */(evt.target);
    if (!el) return;

    // Convert to number
    const v = parseInt(el.value);

    // Compare with last value, ignoring if
    // it's a +/- change
    const diff = Math.abs(v - state.lastSliderValue);

    // Get a speed value of 0..1
    const speed = clamp(diff / speedMax);

    // TODO: It would be better if the speed value
    // was blended into the current speed, and for
    // speed to slowly reduce when there is no movement.
    // movingAverageLight (discussed here: https://clinth.github.io/ixfx-docs/data/averaging/) would be useful.

    updateState({
      lastSliderValue: v,
      speed,
    });
    useState();
  });

  const btnFullScreen = document.getElementById(`btnFullScreen`);
  if (btnFullScreen) {
    btnFullScreen.addEventListener(`click`, evt => {
      document.documentElement.requestFullscreen();
    });
    if (!fullMode) btnFullScreen.style.display =`none`;
  }
  
  if (fullMode) {
    const spotEl = document.getElementById(`spot`);
    if (spotEl) spotEl.style.display = `none`;
  }
  useState();
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
