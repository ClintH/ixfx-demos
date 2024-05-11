import * as Util from '../util.js';
import * as MIDI from '../midi.js';

const settings = Object.freeze({
  // Note that we respond to
  note: 48,
  // Function to update HTML element
  info: Util.textContent(`#info`),
  visElement: /** @type HTMLElement */(document.querySelector(`#vis`))
});

/**
 * No other state needed at the moment
 */
let state = Object.freeze({
  /** @type boolean */
  held: false,
  /** @type number */
  velocity: 0
});

const use = () => {
  const { info, visElement } = settings;
  const { held, velocity } = state;
  info(`Velocity: ${velocity}`);
  if (held) {
    visElement.classList.add(`pressed`);
  } else {
    visElement.classList.remove(`pressed`);
  }
};

/**
 * Received a MIDI message
 * @param {MIDI.Message} message 
 * @param {MIDIInput} input
 */
const onMidiMessage = (message, input) => {
  const { note } = settings;
  console.log(message);

  if (message.command === `noteon` && message.note === note) {
    saveState({ held: true, velocity: message.velocity });
  } else if (message.command === `noteoff` && message.note === note) {
    saveState({ held: false });
  }

  use();
};

async function setup() {
  try {
    const r = await navigator.requestMIDIAccess();
    for (const [id, input] of r.inputs) {
      console.log(`MIDI input: ${input.id} - ${input.name} (${input.manufacturer})`);

      input.addEventListener(`midimessage`, event => {
        const data = /** @type MIDIMessageEvent */(event).data;
        if (!data) return;
        const message = MIDI.parse(data);
        if (!message) return;
        onMidiMessage(message, input);
      });
    }
  } catch (error) {
    console.error(error);
  }
};
await setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}