
// #region Settings & state
const samples = Object.freeze({
  rainstorm: `../rainstorm.mp3`
});

/** @type Map<string,HTMLAudioElement> */
const loadedSounds = new Map();


const settings = Object.freeze({});

let state = Object.freeze({});
// #endregion

const use = () => {};

function initAudio() {
  // Load all the samples
  for (const [key,url] of Object.entries(samples)) {
    const audio = new Audio(url);
    loadedSounds.set(key, audio);
  }
}

function play() {
  console.log(`play`);
  const a = loadedSounds.get(`rainstorm`);
  a?.play();
}

function stop() {
  console.log(`stop`);

  const a = loadedSounds.get(`rainstorm`);
  a?.pause();
}

function setup() {
  // Call every half a second
  setInterval(use, 500);

  document.querySelector(`#btnPlay`)?.addEventListener(`click`, () => {
    play();
  });
  document.querySelector(`#btnStop`)?.addEventListener(`click`, () => {
    stop();
  });

  initAudio();
  
};

// #region Toolbox
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
setup();
// #endregion