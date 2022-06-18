import {log} from '../../../ixfx/dom.js';

const settings = {
  pointerEl: document.getElementById(`pointerArea`),
  currentEl: document.getElementById(`current`),
  log: log(`#log`)
}

let state = {


};

const clearPointers = () => {
  const {currentEl} = settings;
  currentEl.innerHTML = ``;
};

const updatePointer = (ev) => {
  const {currentEl} = settings;
  const {isPrimary, pointerType, pointerId, type, shiftKey, ctrlKey, metaKey} = ev;
  const {movementX, movementY, x, y, offsetX, offsetY, screenX, screenY} = ev;

  let el = document.getElementById(`ptr-${pointerId}`);

  if (el === null) {
    el = document.createElement(`div`);
    el.id = `ptr-${pointerId}`;
    currentEl.append(el);
  }

  const keys = [];
  if (shiftKey) keys.push('shift');
  if (metaKey) keys.push('meta');
  if (ctrlKey) keys.push(`ctrl`);
  const keyStr = keys.map(k => `<kbd>${k}</kbd>`).join(` `);

  // const coords = [{x, y, label: ``}, {x: offsetX, y: offsetY, label: `offset`}, {x: screenX, y: screenY, label: `screen`}];
  // const coordsStr = coords.map(c => {
  //   return `${c.label} x: ${c.x} y: ${c.y}`
  // }).join(', ');

  const r = (v) => Math.round(v);

  let penStr = ``;
  if (pointerType === `pen`) {
    const {pressure, twist, tangentialPressure, tiltX, tiltY} = ev;
    penStr += `pressure: ${pressure}<br />twist: ${twist} tangentialPressure: ${tangentialPressure}<br />tilt: ${tiltX},${tiltY}<br />`;
    if (ev.altitudeAngle && ev.azimuthAngle) {
      penStr += `altitudeAngle ${ev.altitudeAngle}<br />azimuthAngle: ${ev.azimuthAngle})<br />`;
    }
    penStr += `<br />`;
  }

  const coordsStr = `<table class="coords">
  <thead><td></td><td></td><td>offset</td><td>screen</td><td>movement</td></thead>
  <tr><td>x</td><td>${r(x)}</td><td>${r(offsetX)}</td><td>${r(screenX)}</td><td>${movementX}</td></tr>
  <tr><td>y</td><td>${r(y)}</td><td>${r(offsetY)}</td><td>${r(screenY)}</td><td>${movementY}</td></tr>
  </table>`
  el.innerHTML = `
  <h1>${pointerId} ${pointerType} ${isPrimary ? `(primary)` : ``}</h1>
  ${type}<br />
  ${penStr}
  ${coordsStr}<br />
  ${keyStr}<br >
  `;
};

/**
 * 
 * @param {PointerEvent} ev 
 */
const pointerEventSimplify = (ev) => {
  const {button, buttons, ctrlKey, isPrimary, metaKey, movementX, movementY, offsetX, offsetY, pageX, pageY, pointerId, pointerType, pressure, screenX, screenY, shiftKey, tangentialPressure, tiltX, tiltY, twist, x, y} = ev;

  const r = {button, buttons, ctrlKey, isPrimary, metaKey, movementX, movementY, offsetX, offsetY, pageX, pageY, pointerId, pointerType, pressure, screenX, screenY, shiftKey, tangentialPressure, tiltX, tiltY, twist, x, y};

  if (ev.altitudeAngle) r.altitudeAngle = ev.altitudeAngle;
  if (ev.azimuthAngle) r.azimuthAngle = ev.azimuthAngle;

  return r;

}

const setup = () => {
  const {pointerEl, log} = settings;

  pointerEl.addEventListener(`pointermove`, ev => {
    log.log(`pointermove ${JSON.stringify(pointerEventSimplify(ev))}`);
    console.log(ev);
    updatePointer(ev);
  });

  pointerEl.addEventListener(`pointerenter`, ev => {

  });

  pointerEl.addEventListener(`pointerleave`, ev => {

  });

  pointerEl.addEventListener(`pointercancel`, ev => {

  });

  pointerEl.addEventListener(`pointerover`, ev => {

  });

  pointerEl.addEventListener(`pointerdown`, ev => {

  });

  pointerEl.addEventListener(`pointerup`, ev => {

  });


  document.getElementById(`btnCurrentReset`).addEventListener(`click`, () => {
    clearPointers();
  });
};
setup();