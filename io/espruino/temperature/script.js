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
  const lblDataElement = /** @type HTMLElement */(document.querySelector(`#lblData`));
  if (!lblDataElement) return;
  
  lblDataElement.textContent = Number.isNaN(temp) ? `?°` : `${temp.toFixed(0)}°`;

  // Generate some text-shadow CSS for added 🎉
  const offsetX = (pointer.x * 20) - 10;
  const offsetY = (pointer.y * 20) - 10;
  const css = `${offsetX}px ${offsetY}px 0px hsl(356deg 76% 50% / 80%),
    ${offsetX * 2}px ${offsetY * 2}px 0px hsl(53deg 99% 40%),
    ${offsetX * 3}px ${offsetY * 3}px 0px hsl(180deg 100% 37%)`;
  lblDataElement.style.textShadow = css;
};

const setup = () => {
  const { script } = settings;
  const onConnected = (connected) => {
    setCssDisplay(`preamble`, connected ? `none` : `block`);
    setCssDisplay(`lblData`,  connected ? `contents` : `none`);
  };

  document.addEventListener(`pointermove`, event => {
    updateState({
      pointer: {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      }
    });
    useState();
  });

  document.querySelector(`#btnConnect`)?.addEventListener(`click`, async () => {
    try {
      // Filter by name, if defined in settings
      const options = settings.device.length > 0 ? { name: settings.device } : {};

      // Connect to Puck
      const p = await Espruino.puck(options);

      // Listen for events
      p.addEventListener(`change`, event => {
        console.log(`${event.priorState} -> ${event.newState}`);
        if (event.newState !== `connected`) onConnected(false);
      });

      p.addEventListener(`data`, event => {
        console.log(event.data);
        try {
          const temporary = Number.parseFloat(event.data);

          updateState({
            temp: temporary
          });
          useState();
        } catch {
          console.warn(`Cannot convert to float: ${event.data}`);
        }
      });

      // Send script after a moment
      delay(async () => {
        onConnected(true);
        p.writeScript(script);
      }, 1000);
    } catch (error) {
      console.error(error);
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

/**
 * Sets style.display for element
 * @param {string} id Id of element
 * @param {string} value Value of style.display to set
 * @returns 
 */
const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};