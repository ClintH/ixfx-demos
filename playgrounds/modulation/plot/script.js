import * as Visual from '../../../ixfx/visual.js';
const el = /** @type HTMLCanvasElement */(document.getElementById(`plot`));

const plotter = new Visual.Plot2.Plot(el, { autoSize: true }); 
plotter.axisX.visible = false;
plotter.axisY.visible = false;
plotter.legend.visible = false;

const settings = Object.freeze({
  series: plotter.createSeries(`data`, `stream`, { 
    width:10,
    colour: `gray`,
    drawingStyle: `dotted`
  }),
  editorEl: /** @type HTMLTextAreaElement */( document.getElementById(`editor`))
});

let state = Object.freeze({
  /** @type HTMLScriptElement|null */
  scriptEl:null,
  /** @type Worker|null */
  worker:null,
  /** @type string */
  code: `
  let ticks = 0;
  const freq = 0.1;
  setInterval(() => {
    const y = Math.sin(ticks++*freq);
    postMessage(y);
  }, 100);`
});

const updateCode = () => {
  const { worker, code } = state;
  const { series } = settings;
  if (worker !== null) worker.terminate();
  setStatus(false, ``);

  const blob = new Blob([ code ], { type: `application/javascript` });
  const w = new Worker(URL.createObjectURL(blob), { type: `module` });
  w.onerror = (error) => {
    let msg = `Error`;
    if (`message` in error) msg = error.message;
    else msg = `error`;
    setStatus(true, encodeString(msg));
  };
  w.onmessage = (msg) => {
    const { data } = msg;
    if (data === undefined) {
      setStatus(true, `undefined`);
    } else if (data === null) {
      setStatus(true, ``);
    } else if (typeof data === `number`) {
      if (Number.isNaN(data)) {
        setStatus(true, `NaN`);
      } else {
        series.add(data);
        plotter.update();  
      }
    } else {
      setStatus(true, `expecting a number, got ${typeof data}`);
    }
  };
  updateState({ worker:w });
};

const setup = () => {
  const { editorEl } = settings;
  if (location.hash.length > 0) {
    const code = atob(location.hash.substring(1));
    updateState({ code });
    editorEl.value = code;
    editorEl.focus();
  }

  editorEl.addEventListener(`input`, evt => {
    updateState({ code:editorEl.value });
  });

  updateState({ code:state.code });
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

  if (s.code) {
    updateCode();
    const enc = btoa(s.code);
    window.location.replace(`#${enc}`);
  }
}

/**
 * HTML encode
 * @param {string} rawStr 
 * @returns 
 */
function encodeString(rawStr) {
  if (!rawStr) return rawStr;
  return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
    return `&#` + i.charCodeAt(0) + `;`;
  });
}

/**
 * 
 * @param {boolean} isError 
 * @param {string} msg 
 * @returns 
 */
function setStatus(isError, msg) {
  const el = document.getElementById(`status`);
  if (!el) return;
  el.innerText = msg;
  if (isError) el.classList.add(`error`);
  else el.classList.remove(`error`);

  if (isError) plotter.clearSeries();

}