
import { defaultAdsrOpts as defaultAdsrOptions, adsr } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';

const settings = Object.freeze({
  sampleRateMs: 5,
  adsrOptions: {
    ...defaultAdsrOptions(),
    attackBend: 1,
    attackDuration: 10*1000,
    releaseLevel: 0,
    releaseDuration: 15*1000,
    sustainLevel: 1
  }
});

let state = Object.freeze({
  envelope: adsr(settings.adsrOptions),
  /** @type number */
  target: 0,
  /** @type number */
  value: 0,
  abortController: new AbortController()
});

const update = () => {
  let { envelope } = state;
  
  // Read value from envelope and set it to state
  updateState({ value: envelope.value});
};
/**
 * Use state properties for something...
 */
const useState = () => {
  const { value } = state;
  console.log(value);
};

const setup = () => {
  continuously(() => {
    update();
    useState();
  }).start();

  // Trigger envelope
  state.envelope.trigger();
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