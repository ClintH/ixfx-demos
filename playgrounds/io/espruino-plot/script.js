import {delay} from '../../../ixfx/flow.js';
import {Espruino} from '../../../ixfx/io.js';
import * as Dom from '../../../ixfx/dom.js';
import {Plot2, Colour} from '../../../ixfx/visual.js';

Split(['#editor', '#logArea'], {
  sizes: [50, 50],
  direction: `horizontal`
})

Split(['#plot', '#stream'], {
  sizes: [50, 50],
  direction: `vertical`
})

const settings = {
  log: Dom.log(`#log`, {
    capacity: 50,
    timestamp: true
  }),
  // @ts-ignore
  plot: new Plot2.Plot(document.getElementById(`plotCanvas`), {
    autoSize: true,
    axisColour: Colour.getCssVariable(`fg`)
  }),
  txtCode: document.getElementById(`txtCode`)
}


const onConnected = (connected) => {
  if (connected) {
    document.getElementById(`btnConnect`).setAttribute(`disabled`, `true`);
    document.getElementById(`btnSend`).removeAttribute(`disabled`);
  } else {
    document.getElementById(`btnSend`).setAttribute(`disabled`, `true`);
    document.getElementById(`btnConnect`).removeAttribute(`disabled`);
  }
}

const setup = () => {
  const {log, plot, txtCode} = settings;
  let clearedWelcome = false;
  let p;

  plot.axisX.visible = false;
  plot.axisY.visible = false;

  const lastCode = localStorage.getItem(`last`);
  if (lastCode !== null) {
    txtCode.value = lastCode;
  }

  const send = () => {
    if (p === undefined) return; // No Espruino

    // @ts-ignore
    const code = txtCode.value.trim() + `NRF.on('disconnect',()=>reset());`;
    console.log(code);

    try {
      p.writeScript(code);

      localStorage.setItem(`last`, code);
    } catch (ex) {
      log.error(ex);
    }
  };

  Dom.Forms.textAreaKeyboard(txtCode);

  document.getElementById(`btnClearLog`).addEventListener(`click`, () => {
    log.clear();
  });
  document.getElementById(`btnSend`).addEventListener(`click`, send);
  document.getElementById(`txtCode`).addEventListener(`keyup`, evt => {
    if (evt.key === `Enter` && evt.ctrlKey) {
      send();
    }
  });

  const connect = async () => {
    try {
      // Connect to Puck
      p = await Espruino.puck();

      const onData = (evt) => {
        const data = evt.data.trim(); // Remove line breaks etc

        if (!data.startsWith(`{`) || !data.endsWith(`}`)) {
          console.warn(`Expecting JSON response, got: ${data}`);
          return;
        }

        try {
          console.log(data);
          const d = JSON.parse(data);
          log.log(data);


          plot.plot(d);
          plot.update();
        } catch (ex) {
          console.warn(ex);
        }
      }
      // Listen for events
      p.addEventListener(`change`, evt => {
        log.log(`${evt.priorState} -> ${evt.newState}`);
        onConnected(evt.newState === `connected`);
      });

      p.addEventListener(`data`, onData);
      if (!clearedWelcome) {
        log.clear();
        clearedWelcome = true;
      }
      if (p.isConnected) onConnected(true);

    } catch (ex) {
      console.error(ex);
    }
  }

  document.getElementById(`btnConnect`).addEventListener(`click`, connect);
  onConnected(false);

  log.log(`eg: Bluetooth.printn(JSON.stringify(v));`);
  log.log(`eg: let v =  { msg:"Hi" };`)
  log.log(`Once connected, tap 'Send' to upload code. Code should send back string-formatted JSON to be properly displayed in this playground.`);
  log.log(`Power on your Espruino, and tap 'Connect'.`);

}
setup();

// setInterval(() => {
//   const {log, plot} = settings;
//   log.log({
//     acc: {x: 6995, y: -3834, z: -1644},
//     gyro: {x: -35, y: 102, z: 213 * Math.random()}
//   });

// }, 100);