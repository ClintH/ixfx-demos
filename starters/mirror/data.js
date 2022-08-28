const settings = Object.freeze({
  fullMode: window.location.hash === `#full`
});

let state = Object.freeze({
  /** @type number */
  slider: 0,
});

const useState = () => {
  const { fullMode } = settings;
  const { slider } = state;

  // Update numeric output
  const labelEl = document.querySelector(`label[for="slider"]`);
  if (labelEl) labelEl.innerHTML = slider.toString();

  // Map slider value to colour saturation
  const spotEl = document.getElementById(`spot`);

  // 0..100
  const saturation = Math.round(slider*100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotEl && !fullMode) {
    spotEl.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl; 
  }
};

const setup = () => {
  const { fullMode } = settings;

  document.getElementById(`slider`)?.addEventListener(`input`, evt => {
    const el = /** @type HTMLInputElement|null */(evt.target);
    if (!el) return;
    // Slider is on range 0..1000, make into a 0..1 range
    updateState({ slider: parseInt(el.value) / 1000 });
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
