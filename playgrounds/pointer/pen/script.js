const settings = Object.freeze({
  penEl: document.getElementById(`penArea`),
  helpEl: document.getElementById(`helpArea`),
  eventKeys: `width height buttons button tiltX tiltY twist tangentialPressure pointerId x y movementX movementY`.split(` `)
});

/**
 * 
 * @param {PointerEvent} ev 
 */
const updatePointer = (ev) => {
  const { eventKeys } = settings;
  const { shiftKey, metaKey, ctrlKey } = ev;

  eventKeys.forEach(k => {
    const el = document.getElementById(k);
    if (el !== null) el.innerText = ev[k];
  });

  const keys = [];
  if (shiftKey) keys.push(`shift`);
  if (metaKey) keys.push(`meta`);
  if (ctrlKey) keys.push(`ctrl`);
  const keyStr = keys.map(k => `<kbd>${k}</kbd>`).join(` `);


  shtml(`keys`, keyStr);
  shtml(`pressure`, pc(ev.pressure));
  
  // @ts-ignore
  const altAngle = ev.altitudeAngle ?? 0;
  // @ts-ignore
  const aziAngle = ev.azimuthAngle ?? 0;
  shtml(`altitudeAngle`, altAngle.toPrecision(3));
  shtml(`azimuthAngle`, aziAngle.toPrecision(3));

  console.log(ev);
};

const pc = (v) => {
  return Math.round(v * 100) + `%`;
};

const shtml = (id, v) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = v;
};

const setup = () => {
  const { penEl, helpEl } = settings;
  if (!penEl) return;

  penEl.addEventListener(`pointermove`, ev => {
    updatePointer(ev);
  });

  penEl.addEventListener(`pointerenter`, ev => {

  });

  penEl.addEventListener(`pointerleave`, ev => {

  });

  penEl.addEventListener(`pointercancel`, ev => {

  });

  penEl.addEventListener(`pointerover`, ev => {

  });

  penEl.addEventListener(`pointerdown`, ev => {

  });

  penEl.addEventListener(`pointerup`, ev => {

  });

  document.getElementById(`btnHelpClose`)?.addEventListener(`click`, () => {
    if (helpEl) helpEl.style.display = `none`;
  });

  document.getElementById(`btnHelpShow`)?.addEventListener(`click`, () => {
    if (helpEl) helpEl.style.display = `block`;
  });

};
setup();