import * as Dom from '../../ixfx/dom.js';
import { Forces } from '../../ixfx/modulation.js';
import { Points } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  pinnedAt: { x: 0.5, y: 0.2 },
  mass: 0.1,
  thingRadius: 40,
  pinRadius: 20,
  lineWidth: 10
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  thing: {
    position: { x: 1.0 , y: 0.5 },
    mass: settings.mass
  },
  /** @type boolean */
  pause: false,

  // FORCES
  pendulumForce: Forces.pendulumForce(settings.pinnedAt),
  springForce: Forces.springForce(settings.pinnedAt, 0.2),
});

const onTick = () => {
  const { pause , thing, pendulumForce, springForce } = state;
  if (!pause) {
    let t = Forces.apply(
      thing, 
      springForce, 
      pendulumForce);
    // @ts-ignore
    updateState({ thing: t });
  }
};

const useState = () => {
  const { lineWidth, thingRadius, pinRadius } = settings;

  const canvas = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const { thing, bounds } = state;
  
  /** @type {CanvasRenderingContext2D|null|undefined} */
  const ctx = canvas?.getContext(`2d`);
  if (!ctx) return;

  // Get absolute position from relative
  const thingPos = Points.multiply(thing.position, bounds);
  const pinPos = Points.multiply(settings.pinnedAt, bounds);

  // Fill rect
  ctx.fillStyle = `SkyBlue`;
  ctx.fillRect(0, 0, bounds.width, bounds.height);
  
  // Line
  ctx.moveTo(thingPos.x, thingPos.y);
  ctx.strokeStyle = `SlateGray`;
  ctx.lineWidth = lineWidth;
  ctx.lineTo(pinPos.x, pinPos.y);
  ctx.stroke();
  
  // Thing
  ctx.fillStyle = `MidnightBlue`;
  ctx.beginPath();
  ctx.ellipse(thingPos.x, thingPos.y, thingRadius, thingRadius, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pin
  ctx.fillStyle = `SlateGrey`;
  ctx.beginPath();
  ctx.ellipse(pinPos.x, pinPos.y, pinRadius, pinRadius, 0, 0, Math.PI * 2);
};

const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  const loop = () => {
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointermove`, evt => {
    if (evt.buttons === 0) return;
    const t = {
      position: {
        x: evt.x / window.innerWidth,
        y: evt.y / window.innerHeight
      },
      velocity: { x: 0, y: 0 },
      mass: settings.mass
    };
    updateState({ thing: t });
  });

  document.addEventListener(`pointerdown`, (ev) => {
    updateState({ pause:true });
  });

  document.addEventListener(`pointerup`, () => {
    updateState({ pause:false });
  });

  document.addEventListener(`pointerleave`, () => {
    updateState({ pause:false });
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
