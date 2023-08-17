import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Plot2 } from "../../ixfx/visual.js";
import { parentSize } from "../../ixfx/dom.js";

const settings = Object.freeze({
  accelPlot: new Plot2.Plot(/** @type HTMLCanvasElement */(document.getElementById(`accelPlot`))),
  accelGravPlot: new Plot2.Plot(/** @type HTMLCanvasElement */(document.getElementById(`accelGravPlot`))),
  rotRatePlot: new Plot2.Plot(/** @type HTMLCanvasElement */(document.getElementById(`rotRatePlot`))),    
});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: true,
  defaultLog: `verbose`
});

r.onData = (msg) => {
  const { accelPlot, accelGravPlot, rotRatePlot } = settings;
  
  accelPlot.plot(msg.accel);
  accelPlot.update();
  
  accelGravPlot.plot(msg.accelGrav);
  accelGravPlot.update();
  
  rotRatePlot.plot(msg.rotRate);
  rotRatePlot.update();
};

parentSize(`#accelPlot`);
parentSize(`#accelGravPlot`);
parentSize(`#rotRatePlot`);

