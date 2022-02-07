import * as Generators from '../../ixfx/generators.js';

// Loop back and forth between 0 and 1, 0.0.1 steps at a time
const pingPong = Generators.pingPongPercent(0.01);

// State
let state = {
  progression: 0,
  arc: {x: 110, y: 100, radius: 90, startRadian: 0, endRadian: Math.PI}
};

// Update state of world
const update = () => {
  state = {
    ...state, // Include existing state
    // Get a new value from the generator
    progression: pingPong.next().value,
  }
}

const draw = () => {
  const {progression, arc} = state;
  const {ctx} = canvas;
  ctx.fillStyle = `black`;
  // Draw!
  ctx.fillText(state.progression, 50, 50);

  ctx.strokeStyle = `red`;
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.arc(arc.x, arc.y, arc.radius, arc.startRadian, arc.endRadian);
  ctx.stroke();
}

const setupCanvas = (canvasQuery) => {
  const canvasEl = document.querySelector(canvasQuery);
  if (canvasEl === null) {
    console.warn(`Could not find canvas element: ${canvasQuery}`);
    return;
  }

  const ctx = canvasEl.getContext(`2d`);
  const clear = () => {
    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  };

  return {
    ctx,
    canvasEl,
    clear
  };
}

const canvas = setupCanvas(`canvas`);

const loop = () => {
  if (canvas === undefined) return; // didn't initialise properly
  canvas.clear();
  update();
  draw();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

