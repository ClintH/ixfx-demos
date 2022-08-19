import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';

const scripts = Object.freeze({
  poll: `setInterval(()=>Bluetooth.println(E.getTemperature()), 1000);NRF.on('disconnect',()=>reset());`
});

const settings = Object.freeze({
  script: scripts.poll,
  // Filter device list
  device: `` // Put in the name of your device here, eg `Puck.js a123`
});

let state = Object.freeze({
  /** @type {number} */
  temp: 0,
  pointer: { x: 0, y: 0 }
});

const useState = () => {
  const { temp, pointer } = state;
  const lblDataEl =document.getElementById(`lblData`);
  if (!lblDataEl) return;
  
  if (Number.isNaN(temp)) {
    lblDataEl.innerText = `?°`;
  } else {
    lblDataEl.innerText = `${temp.toFixed(0)}°`;
  }

  // Generate some text-shadow CSS for added 🎉
  const offsetX = (pointer.x * 20) - 10;
  const offsetY = (pointer.y * 20) - 10;
  const css = `${offsetX}px ${offsetY}px 0px hsl(356deg 76% 50% / 80%),
    ${offsetX * 2}px ${offsetY * 2}px 0px hsl(53deg 99% 40%),
    ${offsetX * 3}px ${offsetY * 3}px 0px hsl(180deg 100% 37%)`;
  lblDataEl.style.textShadow = css;
};

const setup = () => {
  const { script } = settings;
  const onConnected = (connected) => {
    setCssDisplay(`preamble`, connected ? `none` : `block`);
    setCssDisplay(`lblData`,  connected ? `contents` : `none`);
  };

  document.addEventListener(`pointermove`, evt => {
    updateState({
      pointer: {
        x: evt.clientX / window.innerWidth,
        y: evt.clientY / window.innerHeight
      }
    });
    useState();
  });

  document.getElementById(`btnConnect`)?.addEventListener(`click`, async () => {
    try {
      // Filter by name, if defined in settings
      const opts = settings.device.length > 0 ? { name: settings.device } : {};

      // Connect to Puck
      const p = await Espruino.puck(opts);

      // Listen for events
      p.addEventListener(`change`, evt => {
        console.log(`${evt.priorState} -> ${evt.newState}`);
        if (evt.newState !== `connected`) onConnected(false);
      });

      p.addEventListener(`data`, evt => {
        console.log(evt.data);
        try {
          const temp = parseFloat(evt.data);

          updateState({
            temp
          });
          useState();
        } catch (ex) {
          console.warn(`Cannot convert to float: ${evt.data}`);
        }
      });

      // Send script after a moment
      delay(async () => {
        onConnected(true);
        p.writeScript(script);
      }, 1000);
    } catch (ex) {
      console.error(ex);
    }
  });
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

function setCssDisplay(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = value;
}