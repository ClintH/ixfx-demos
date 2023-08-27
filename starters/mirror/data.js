const settings = Object.freeze({
  fullMode: window.location.hash === `#full`
});

let state = Object.freeze({
  /** @type number */
  slider: 0,
});

const use = () => {
  const { fullMode } = settings;
  const { slider } = state;

  // Update numeric output
  const labelElement = /** @type HTMLElement */(document.querySelector(`label[for="slider"]`));
  if (labelElement) labelElement.innerHTML = slider.toString();

  // Map slider value to colour saturation
  const spotElement = /** @type HTMLElement */(document.querySelector(`#spot`));

  // 0..100
  const saturation = Math.round(slider*100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotElement && !fullMode) {
    spotElement.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl; 
  }
};

const setup = () => {
  const { fullMode } = settings;

  document.querySelector(`#slider`)?.addEventListener(`input`, event => {
    const element = /** @type HTMLInputElement|null */(event.target);
    if (!element) return;
    // Slider is on range 0..1000, make into a 0..1 range
    saveState({ slider: Number.parseInt(element.value) / 1000 });
    use();
  });

  const buttonFullScreen = /** @type HTMLElement */(document.querySelector(`#btnFullScreen`));
  
  buttonFullScreen.addEventListener(`click`, event => {
    document.documentElement.requestFullscreen();
  });
  if (!fullMode) buttonFullScreen.style.display =`none`;
  
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
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
