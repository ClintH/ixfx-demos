import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Plot2 } from "../../ixfx/visual.js";
import { parentSize } from "../../ixfx/dom.js";

const settings = Object.freeze({
  accelPlot: new Plot2.Plot(/** @type HTMLCanvasElement */(document.querySelector(`#accelPlot`))),
  accelGravPlot: new Plot2.Plot(/** @type HTMLCanvasElement */(document.querySelector(`#accelGravPlot`))),
  rotRatePlot: new Plot2.Plot(/** @type HTMLCanvasElement */(document.querySelector(`#rotRatePlot`))),    
});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: true,
  defaultLog: `verbose`
});

r.onData = (message) => {
  const { accelPlot, accelGravPlot, rotRatePlot } = settings;
  
  accelPlot.plot(message.accel);
  accelPlot.update();
  
  accelGravPlot.plot(message.accelGrav);
  accelGravPlot.update();
  
  rotRatePlot.plot(message.rotRate);
  rotRatePlot.update();
};

parentSize(`#accelPlot`);
parentSize(`#accelGravPlot`);
parentSize(`#rotRatePlot`);

