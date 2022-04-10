/**
 * Sends a small script to the Espruino so that it sends a temperature
 * reading every five seconds.
 */
import {delay} from '../../../ixfx/flow.js';
import {Espruino} from '../../../ixfx/io.js';

const settings = {
  lblDataEl: document.getElementById(`lblData`),
  script: `setInterval(()=>Bluetooth.println(E.getTemperature()), 5000);NRF.on('disconnect',()=>reset());`
}

let state = {
  temp: 0,
  pointer: {x: 0, y: 0}
};

const display = () => {
  const {temp, pointer} = state;
  const {lblDataEl} = settings;

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
}

const setup = () => {
  const {script} = settings;
  const onConnected = (connected) => {
    document.getElementById(`preamble`).style.display = connected ? `none` : `block`;
    document.getElementById(`lblData`).style.display = connected ? `contents` : `none`;
  }

  document.addEventListener(`pointermove`, evt => {
    state = {
      ...state,
      pointer: {
        x: evt.clientX / window.innerWidth,
        y: evt.clientY / window.innerHeight
      }
    }
    display();
  });

  document.getElementById(`btnConnect`).addEventListener(`click`, async () => {
    try {
      // Connect to Puck
      const p = await Espruino.puck();

      // Listen for events
      p.addEventListener(`change`, evt => {
        console.log(`${evt.priorState} -> ${evt.newState}`);
        if (evt.newState !== `connected`) onConnected(false);
      });

      p.addEventListener(`data`, evt => {
        console.log(evt.data);
        try {
          const temp = parseFloat(evt.data);

          state = {
            ...state,
            temp
          };
          display();
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
}
setup();