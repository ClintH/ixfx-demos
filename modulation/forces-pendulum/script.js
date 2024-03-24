import { CanvasHelper } from '../../ixfx/dom.js';
import { Forces } from '../../ixfx/modulation.js';
import { Points } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  pinnedAt: { x: 0.5, y: 0.2 },
  mass: 0.1,
  thingRadius: 40,
  pinRadius: 20,
  lineWidth: 10,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

let state = Object.freeze({
  thing: {
    position: { x: 1, y: 0.5 },
    mass: settings.mass
  },
  /** @type boolean */
  pause: false,

  // FORCES
  pendulumForce: Forces.pendulumForce(settings.pinnedAt),
  springForce: Forces.springForce(settings.pinnedAt, 0.2),
});

const update = () => {
  const { pause, thing, pendulumForce, springForce } = state;
  if (!pause) {
    let t = Forces.apply(
      thing,
      springForce,
      pendulumForce);
    // @ts-ignore
    saveState({ thing: t });
  }
};

const use = () => {
  const { lineWidth, thingRadius, pinRadius, canvas } = settings;
  const { thing } = state;
  const { ctx, width, height } = canvas;

  // Get absolute positions
  const thingPos = canvas.toAbsolute(thing.position);
  const pinPos = canvas.toAbsolute(settings.pinnedAt);

  // Paint background
  ctx.fillStyle = `SkyBlue`;
  ctx.fillRect(0, 0, width, height);

  // Line representing the 'string' of the pendulum
  ctx.moveTo(thingPos.x, thingPos.y);
  ctx.strokeStyle = `SlateGray`;
  ctx.lineWidth = lineWidth;
  ctx.lineTo(pinPos.x, pinPos.y);
  ctx.stroke();

  // Thing being swung
  ctx.fillStyle = `MidnightBlue`;
  ctx.beginPath();
  ctx.ellipse(thingPos.x, thingPos.y, thingRadius, thingRadius, 0, 0, Math.PI * 2);
  ctx.fill();

  // Circle representing the anchor of the pendulum
  ctx.fillStyle = `SlateGrey`;
  ctx.beginPath();
  ctx.ellipse(pinPos.x, pinPos.y, pinRadius, pinRadius, 0, 0, Math.PI * 2);
};

function setup() {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  /**
   * 
   * @param {PointerEvent} event 
   * @returns 
   */
  const onPointer = (event) => {
    if (event.buttons === 0) return;
    const t = {
      position: settings.canvas.toRelative({
        x: event.x,
        y: event.y
      }),
      velocity: { x: 0, y: 0 },
      mass: settings.mass
    };
    saveState({ thing: t });
  };
  document.addEventListener(`pointermove`, onPointer);


  document.addEventListener(`pointerdown`, (event) => {
    onPointer(event);
    saveState({ pause: true });
  });

  document.addEventListener(`pointerup`, () => {
    saveState({ pause: false });
  });

  document.addEventListener(`pointerleave`, () => {
    saveState({ pause: false });
  });

};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
