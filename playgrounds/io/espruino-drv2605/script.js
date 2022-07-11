/**
 * This code is a playground. It's is meant for playing with in the browser,
 * but the code is not meant to be extended.
 */
import {Espruino} from '../../../ixfx/io.js';
import {Forms} from '../../../ixfx/dom.js';
import {adsrSample} from '../../../ixfx/modulation.js';
import {IterableAsync} from '../../../ixfx/util.js';

const effects = [
  'strong click 100%', 'strong click 60%', 'strong click 30%',
  'sharp click 100%', 'sharp click 60%', 'sharp click 30%',
  'soft bump 100%', 'soft bump 60%', 'soft bump 30%',
  'double click 100%', 'double click 60%', 'triple click 100%',
  'soft fuzz 60%', 'strong buzz 100%',
  '750 ms alert 100%', '1000ms alert 100%',
  'strong click 1 100%', 'strong click 2 80%', 'strong click 3 60%', 'strong click 4 30%',
  'medium click 1 100%', 'medium click 2 80%', 'medium click 3 60%',
  'sharp tick 1 100%', 'sharp tick 2 80%', 'sharp tick 3 60%',
  'short double click strong 1 100%', 'short double click strong 2 80%', 'short double click strong 3 60%', 'short double click strong 4 30%',
  'short double click medium 1 100%', 'short double click medium 2 80%', 'short double click medium 3 60%',
  'short double sharp tick 1 100%', 'short double sharp tick 2 80%', 'short double sharp tick 3 60%',
  'long double sharp click strong 1 100%', 'long double sharp click strong 2 80%', 'long double sharp click strong 3 60%', 'long double sharp click strong 4 30%',
  'long double sharp click medium 1 100%', 'long double sharp click medium 2 80%', 'long double sharp click medium 3 60%',
  'long double sharp tick 1 100%', 'long double sharp tick 2 80%', 'long double sharp tick 3 60%',
  'buzz 1 100%', 'buzz 2 80%', 'buzz 3 60%', 'buzz 4 40%', 'buzz 5 20%',
  'pulsing strong 1 100%', 'pulsing strong 2 60%', 'pulsing medium 1 100%', 'pulsing medium 2 60%',
  'pulsing sharp 1 100%', 'pulsing sharp 2 60%',
  'transition click 1 100%', 'transition click 2 80%', 'transition click 3 60%', 'transition click 4 40%', 'transition click 5 20%', 'transition click 6 10%',
  'hum 1 100%', 'hum 2 80%', 'hum 3 60%', 'hum 4 40%', 'hum 5 20%', 'hum 6 10%',
  'ramp down long smooth 1', 'ramp down long smooth 2',
  'ramp down medium smooth 1', 'ramp down medium smooth 2',
  'ramp down short smooth 1', 'ramp down short smooth 2',
  'ramp down long sharp 1', 'ramp down long sharp 2',
  'ramp down medium sharp 1', 'ramp down medium sharp 2',
  'ramp down short sharp 1', 'ramp down short sharp 2',
  'ramp up long smooth 1', 'ramp up long smooth 2',
  'ramp up medium smooth 1', 'ramp up medium smooth 2',
  'ramp up short smooth 1', 'ramp up short smooth 2',
  'ramp up long sharp 1', 'ramp up long sharp 2',
  'ramp up medium sharp 1', 'ramp up medium sharp 2',
  'ramp up short sharp 1', 'ramp up short sharp 2',
  'ramp down long smooth 1 half', 'ramp down long smooth 2 half',
  'ramp down medium smooth 1 half', 'ramp down medium smooth 2 half',
  'ramp down short smooth 1 half', 'ramp down short smooth 2 half',
  'ramp down long sharp 1 half', 'ramp down long sharp 2 half',
  'ramp down medium sharp 1 half', 'ramp down medium sharp 2 half',
  'ramp down short sharp 1 half', 'ramp down short sharp 2 half',
  'ramp up long smooth 1 half', 'ramp up long smooth 2 half',
  'ramp up medium smooth 1 half', 'ramp up medium smooth 2 half',
  'ramp up short smooth 1 half', 'ramp up short smooth 2 half',
  'ramp up long sharp 1 half', 'ramp up long sharp 2 half',
  'ramp up medium sharp 1 half', 'ramp up medium sharp 2 half',
  'ramp up short sharp 1 half', 'ramp up short sharp 2 half',
  'long buzz no stop',
  'smooth hum 1 50%', 'smooth hum 2 40%', 'smooth hum 3 30%', 'smooth hum 4 20%', 'smooth hum 5 10%',
];

const settings = {
  effects,
  durationLimit: 500,
  selEffectsEl: document.getElementById(`selEffects`),
  seqArrayEl: document.getElementById(`seqArray`),
  txtEnvEl: document.getElementById(`txtEnv`),
  envArraysEl: document.getElementById(`envArrays`),
  numEnvResolutionEl: document.getElementById(`numEnvResolution`),
  btnEnvSendEl: document.getElementById(`btnEnvSend`)
}

// Keep track of Espruino instance
let state = {
  espruino: null
};

const setupTrigger = () => {
  const {effects, selEffectsEl} = settings;

  const selEffects = Forms.select(selEffectsEl, (newValue) => {
    console.log(newValue);
  });

  // Prefix effect name by its index
  const effectsPrefixed = effects.map((e, index) => `${index + 1}. ${e}`);
  selEffects.setOpts(effectsPrefixed);

  Forms.button(`#btnTrigger`, () => {
    const index = selEffects.index + 1;
    if (state.espruino) {
      state.espruino.write(`trigger(${index})\n`);
    }
  });
}

const setupSequencer = () => {
  const {effects, seqArrayEl} = settings;
  const steps = 8;
  const selectEls = [];

  const effectsPrefixed = effects.map((e, index) => `${index + 1}. ${e}`);

  const getSeq = () => {
    const seq = [];
    for (let i = 0; i < steps; i++) {
      const index = selectEls[i].index;
      if (index === 0) break;
      seq[i] = selectEls[i].index;
    }
    return seq;
  }

  const updateCodePreview = () => {
    seqArrayEl.innerText = JSON.stringify(getSeq());
  }

  let dirty = true;

  for (let i = 0; i < steps; i++) {
    const el = Forms.select(`#selSeq${i}`, () => {
      dirty = true;
      updateCodePreview();
    }, {shouldAddChoosePlaceholder: true});
    el.setOpts(effectsPrefixed);
    selectEls[i] = el;
  }

  Forms.button(`#btnSeqReset`, () => {
    selectEls.forEach(el => el.select(0))
    dirty = true;
    updateCodePreview();
  });

  Forms.button(`#btnSeqStart`, () => {
    const {espruino} = state;
    if (espruino === null) return;

    if (dirty) {
      // Call sequence(steps) on the Espruino
      espruino.write(`sequence(${JSON.stringify(getSeq())}\n)`)
      dirty = false;
    }

    espruino.write(`start()\n`);

  });

  Forms.button(`#btnSeqStop`, () => {
    if (state.espruino) {
      state.espruino.write(`stop()\n`);
    }
  })
}

const setupEnvelope = () => {
  const {btnEnvSendEl, txtEnvEl, envArraysEl, durationLimit, numEnvResolutionEl} = settings;

  let amplitudes = [];
  let durations = [];

  const reset = () => {
    envArraysEl.innerHTML = `1. Edit envelope and click 'Sample'.<br />2. Click 'Send to Espruino'`;
    btnEnvSendEl.disabled = true;
  }
  const sampleEnv = async () => {
    const sampleRate = parseInt(numEnvResolutionEl.value);

    try {
      const o = eval(`(${txtEnv.value.trim()})`);
      console.log(o);
      o.shouldLoop = false;

      if (o.attackDuration > durationLimit) throw new Error(`attackDuration cannot be longer than ${durationLimit}ms.`);
      if (o.decayDuration > durationLimit) throw new Error(`decayDuration cannot be longer than ${durationLimit}ms.`);
      if (o.releaseDuration > durationLimit) throw new Error(`releaseDuration cannot be longer than ${durationLimit}ms.`);

      const data = await IterableAsync.toArray(adsrSample(o, sampleRate));
      console.log(data);

      amplitudes = data.map(d => Math.round(d * 127));
      durations = data.map(d => sampleRate);

      const line1 = `let amplitudes = ${JSON.stringify(amplitudes)};`;
      const line2 = `let durations = ${JSON.stringify(durations)};`;
      envArraysEl.innerHTML = line1 + '<br />' + line2;
      btnEnvSendEl.disabled = false;
    } catch (e) {
      console.log(e);
      envArraysEl.innerHTML = `<h1>:(</h1><p>There is an error in the envelope definition.</p><p>${e}</p>`;
      btnEnvSendEl.disabled = true;
      amplitudes = [];
      durations = [];
    }
  }

  txtEnvEl.addEventListener(`input`, () => {
    reset();
  })

  Forms.button(`#btnPasteEnv`, async () => {
    let t = await navigator.clipboard.readText();
    if (t.startsWith(`"`) && t.endsWith(`"`)) {
      t = t.substring(1, t.length - 1);
    }
    let lines = t.split("\\n");
    lines = lines.filter(l => {
      l = l.trim();

      // Remove unneeded values
      if (l.startsWith('shouldLoop')) return false;
      if (l.startsWith('sustainLevel')) return false;

      return true;
    })
    txtEnvEl.value = lines.join('\n');
    amplitudes = [];
    durations = [];
    btnEnvSendEl.disabled = true;
  })

  Forms.button(`#btnSample`, async () => {
    sampleEnv();
  });

  Forms.button(btnEnvSendEl, () => {
    if (state.espruino && amplitudes.length > 0 && durations.length > 0) {
      state.espruino.write(`rtpMode(${JSON.stringify(amplitudes)}, ${JSON.stringify(durations)})\n`);
    }
  });

  reset();
}

const setup = () => {
  // Hide or show UI depending on connection state
  const onConnected = (connected) => {
    document.querySelectorAll(`section`).forEach(el => {
      if (connected) {
        el.classList.remove(`disconnected`);
        el.classList.add(`connected`);

      } else {
        el.classList.add(`disconnected`);
        el.classList.remove(`connected`);

      }
    });
  }


  Forms.button(`#btnConnect`, async () => {
    try {
      // Connect to Pico
      const p = await Espruino.serial();

      // Listen for events
      p.addEventListener(`change`, evt => {
        console.log(`${evt.priorState} -> ${evt.newState}`);
        onConnected(evt.newState === `connected`);
      });

      p.addEventListener(`data`, (evt) => {
        if (evt.data === `=undefined`) return; // boring
        console.log(evt.data);
      });

      onConnected(true);

      state.espruino = p;

    } catch (ex) {
      console.error(ex);
      onConnected(false);
    }
  });

  setupTrigger();
  setupSequencer();
  setupEnvelope();
}
setup();