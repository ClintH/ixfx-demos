import { clamp } from '../../ixfx/numbers.js';
import { StateMachine, continuously } from '../../ixfx/flow.js';

// Settings
const settings = Object.freeze({
  updateSpeed: 2000,
  labelStateEmoji: /** @type HTMLElement */(document.querySelector(`#labelStateEmoji`)),
  labelState: /** @type HTMLElement */(document.querySelector(`#labelState`)),
  labelEnergy:/** @type HTMLElement */(document.querySelector(`#labelEnergy`))
});

// Regular state
let state = Object.freeze({
  /** @type string */
  current: ``,
  /** @type number */
  energy: 0.5,
});

// State machine transitions
const stateMachine = Object.freeze({
  sleeping: `waking`,
  waking: [`resting`, `sleeping`],
  resting: [`sleeping`, `walking`],
  walking: [`running`, `resting`],
  running: [`walking`],
});

// State handlers
const stateHandlers = Object.freeze([
  {
    // State is 'sleeping'
    if: `sleeping`,
    then: [
      // Increase energy by 10%
      () => updateEnergy(0.1),
      () => {
        // Wake up if 100% energy
        if (state.energy >= 1) {
          return { next: true };
        }
      },
    ],
  },
  Object.freeze({
    // State is 'waking'
    if: `waking`,
    resultChoice: `random`,
    then: [{ next: `resting` }, { next: `sleeping` }],
  }),
  {
    // State is 'resting'
    if: `resting`,
    then: [
      // Increase energy by 1%
      () => updateEnergy(0.01),
      () => {
        // 20% chance of a nap
        if (Math.random() < 0.2) return { next: `sleeping` };
        // If we have some energy, go for a walk
        if (state.energy > 0.5) return { next: `walking` };
      },
    ],
  },
  {
    // State is 'walking'
    if: `walking`,
    then: [
      // Drop energy by 5%
      () => updateEnergy(-0.05),
      () => {
        // If we're exhausted, rest
        if (state.energy < 0.2) return { next: `resting` };
        // Lots of energy + chance: run!
        if (state.energy > 0.7 && Math.random() > 0.6)
          return { next: `running` };
      },
    ],
  },
  {
    // State is 'running'
    if: `running`,
    then: [
      // Drop energy by 15%
      () => updateEnergy(-0.15),
      () => {
        // If we're tiring, walk
        if (state.energy < 0.5) return { next: `walking` };
      },
    ],
  },
]);

// Update UI based on current state
const updateUi = () => {
  const { current, energy } = state;
  const { labelStateEmoji, labelState, labelEnergy } = settings;
  labelStateEmoji.textContent = stateToEmoji(current);
  labelState.innerHTML = `<p>${current}</p>`;
  labelEnergy.textContent = `${Math.floor(energy * 100)}%`;
};

// Set up driver
async function setup() {
  const { updateSpeed } = settings;
  const driver = await StateMachine.driver(stateMachine, stateHandlers);

  continuously(async () => {
    const result = await driver.run();
    if (result?.value !== state.current) {
      state = {
        ...state,
        current: /** @type string*/(result?.value),
      };
    }

    updateUi();
  }, updateSpeed).start();
};
await setup();

function updateEnergy(amt) {
  const { energy } = state;
  state = { ...state, energy: clamp(energy + amt) };
}

function stateToEmoji(state) {
  switch (state) {
    case `sleeping`: {
      return `😴`;
    }
    case `waking`: {
      return `😵‍💫`;
    }
    case `resting`: {
      return `😌`;
    }
    case `walking`: {
      return `🚶🏻‍♀️`;
    }
    case `running`: {
      return `🏃🏻‍♀️`;
    }
  }
  return `?`;
}
