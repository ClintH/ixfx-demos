import * as Dom from '../../../ixfx/dom.js';

const settings = Object.freeze({
  lastEl: document.getElementById(`last`),
  log: Dom.log(`#log`, { timestamp: true })
});

/**
 * @typedef MidiDevice
 * @property {string} id
 * @property {string|null} manufacturer
 * @property {string|null} name
 * @property {"input"|"output"} type
 * @property {"closed"|"open"|"pending"} connection
 * @property {"connected"|"disconnected"} state
 * @method {onmidimessage} onmidimessage
 */

/**
 * @callback onmidimessage
 * 
 */
let state = Object.freeze({
  /** @type {Dom.Forms.SelectHandler|undefined} */
  deviceSelEl: undefined,
  /** @type MidiDevice[] */
  devices: [],
  /** @type MidiDevice|undefined */
  activeDevice: undefined
});

//state.devices[0].

/**
 * 
 * @param {KeyboardEvent} ev 
 */
const extract = (ev) => {
  // Pull out some fields from the KeyEvent
  const { altKey, metaKey, ctrlKey, shiftKey, key, code, repeat, type } = ev;
  return { altKey, metaKey, ctrlKey, shiftKey, key, code, repeat, type };
};

/**
 * 
 * @param {KeyboardEvent} ev 
 */
const toString = (ev) => {
  const t = extract(ev);
  return `{
    key: ${t.key},
    code: ${t.code},
    altKey: ${t.altKey},
    metaKey: ${t.metaKey},
    ctrlKey: ${t.ctrlKey},
    shiftKey: ${t.shiftKey},
    repeat: ${t.repeat},
    type: ${t.type}
  }`;
};

const initMidi = () => {
  const { deviceSelEl } = state;
  if (!navigator.requestMIDIAccess) throw new Error(`MIDI not supported in this browser.`);
  
  navigator.requestMIDIAccess().then(
    (midi) => {
      const inputs = midi.inputs;
      console.log(inputs);

      let opts = [];
      /** @type MidiDevice[] */
      let devices = [];
      for (const i of inputs.values()) {
        opts.push(i.name ?? `?`);
        devices.push({
          id: i.id,
          manufacturer: i.manufacturer,
          name: i.name,
          connection: i.connection,
          state: i.state,
          type: i.type
        });
      }

      deviceSelEl?.setOpts(opts);
      updateState({ devices });
    }, (err) => {
      console.log(err);
    });
  console.log(`done`);
};

const setup = () => {
  const { log, lastEl } = settings;

  const chkKeydown = Dom.Forms.checkbox(`#evKeydown`);
  const chkKeyup = Dom.Forms.checkbox(`#evKeyup`);
  const chkKeypress = Dom.Forms.checkbox(`#evKeypress`);

  const deviceSelEl = Dom.Forms.select(`#device`, (v) => {
    console.log(v);
  }, { placeholderOpt:`Omni` });
  updateState({ deviceSelEl });

  document.getElementById(`btnLogClear`)?.addEventListener(`click`, () => {
    log.clear();
  });

};
setup();
initMidi();

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