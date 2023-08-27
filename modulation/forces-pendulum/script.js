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
    position: { x: 1 , y: 0.5 },
    mass: settings.mass
  },
  /** @type boolean */
  pause: false,

  // FORCES
  pendulumForce: Forces.pendulumForce(settings.pinnedAt),
  springForce: Forces.springForce(settings.pinnedAt, 0.2),
});

const update = () => {
  const { pause , thing, pendulumForce, springForce } = state;
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
  const { lineWidth, thingRadius, pinRadius } = settings;

  const canvas = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const { thing, bounds } = state;
  
  /** @type {CanvasRenderingContext2D|null|undefined} */
  const context = canvas?.getContext(`2d`);
  if (!context) return;

  // Get absolute position from relative
  const thingPos = Points.multiply(thing.position, bounds);
  const pinPos = Points.multiply(settings.pinnedAt, bounds);

  // Fill rect
  context.fillStyle = `SkyBlue`;
  context.fillRect(0, 0, bounds.width, bounds.height);
  
  // Line
  context.moveTo(thingPos.x, thingPos.y);
  context.strokeStyle = `SlateGray`;
  context.lineWidth = lineWidth;
  context.lineTo(pinPos.x, pinPos.y);
  context.stroke();
  
  // Thing
  context.fillStyle = `MidnightBlue`;
  context.beginPath();
  context.ellipse(thingPos.x, thingPos.y, thingRadius, thingRadius, 0, 0, Math.PI * 2);
  context.fill();

  // Pin
  context.fillStyle = `SlateGrey`;
  context.beginPath();
  context.ellipse(pinPos.x, pinPos.y, pinRadius, pinRadius, 0, 0, Math.PI * 2);
};

function setup() {
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ bounds: arguments_.bounds });
  });

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
      position: {
        x: event.x / window.innerWidth,
        y: event.y / window.innerHeight
      },
      velocity: { x: 0, y: 0 },
      mass: settings.mass
    };
    saveState({ thing: t });
  };
  document.addEventListener(`pointermove`, onPointer);
  

  document.addEventListener(`pointerdown`, (event) => {
    onPointer(event);
    saveState({ pause:true });
  });

  document.addEventListener(`pointerup`, () => {
    saveState({ pause:false });
  });

  document.addEventListener(`pointerleave`, () => {
    saveState({ pause:false });
  });

};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
