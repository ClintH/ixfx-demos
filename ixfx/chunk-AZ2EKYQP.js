import {
  continuously,
  delayLoop
} from "./chunk-RNUQGND2.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/visual/Video.ts
var Video_exports = {};
__export(Video_exports, {
  capture: () => capture,
  frames: () => frames,
  manualCapture: () => manualCapture
});
async function* frames(sourceVideoEl, opts = {}) {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  let canvasEl = opts.canvasEl;
  let w, h;
  w = h = 0;
  if (canvasEl === void 0) {
    canvasEl = document.createElement(`CANVAS`);
    canvasEl.classList.add(`ixfx-frames`);
    if (!showCanvas) {
      canvasEl.style.display = `none`;
    }
    document.body.appendChild(canvasEl);
  }
  const updateSize = () => {
    if (canvasEl === void 0) return;
    w = sourceVideoEl.videoWidth;
    h = sourceVideoEl.videoHeight;
    canvasEl.width = w;
    canvasEl.height = h;
  };
  let c = null;
  const looper = delayLoop(maxIntervalMs);
  for await (const _ of looper) {
    if (w === 0 || h === 0) updateSize();
    if (w === 0 || h === 0) continue;
    if (c === null) c = canvasEl.getContext(`2d`);
    if (c === null) return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c.getImageData(0, 0, w, h);
    yield pixels;
  }
}
var capture = (sourceVideoEl, opts = {}) => {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  const onFrame = opts.onFrame;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const canvasEl = document.createElement(`CANVAS`);
  canvasEl.classList.add(`ixfx-capture`);
  if (!showCanvas) {
    canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  let c = null;
  let worker;
  if (opts.workerScript) {
    worker = new Worker(opts.workerScript);
  }
  const getPixels = worker || onFrame;
  if (!getPixels && !showCanvas) {
    console.warn(
      `Video will be captured to hidden element without any processing. Is this what you want?`
    );
  }
  const loop = continuously(() => {
    if (c === null) c = canvasEl.getContext(`2d`);
    if (c === null) return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    let pixels;
    if (getPixels) {
      pixels = c.getImageData(0, 0, w, h);
    }
    if (worker) {
      worker.postMessage(
        {
          pixels: pixels.data.buffer,
          width: w,
          height: h,
          channels: 4
        },
        [pixels.data.buffer]
      );
    }
    if (onFrame) {
      try {
        onFrame(pixels);
      } catch (e) {
        console.error(e);
      }
    }
  }, maxIntervalMs);
  return {
    start: () => loop.start(),
    cancel: () => loop.cancel(),
    canvasEl
  };
};
var manualCapture = (sourceVideoEl, opts = {}) => {
  const showCanvas = opts.showCanvas ?? false;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const definedCanvasEl = opts.canvasEl !== void 0;
  let canvasEl = opts.canvasEl;
  if (!canvasEl) {
    canvasEl = document.createElement(`CANVAS`);
    canvasEl.classList.add(`ixfx-capture`);
    document.body.append(canvasEl);
    if (!showCanvas) canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  const capture2 = () => {
    let c2;
    if (!c2) c2 = canvasEl?.getContext(`2d`, { willReadFrequently: true });
    if (!c2) throw new Error(`Could not create graphics context`);
    c2.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c2.getImageData(0, 0, w, h);
    pixels.currentTime = sourceVideoEl.currentTime;
    if (opts.postCaptureDraw) opts.postCaptureDraw(c2, w, h);
    return pixels;
  };
  const dispose = () => {
    if (definedCanvasEl) return;
    try {
      canvasEl?.remove();
    } catch (_) {
    }
  };
  const c = {
    canvasEl,
    capture: capture2,
    dispose
  };
  return c;
};

export {
  manualCapture,
  Video_exports
};
//# sourceMappingURL=chunk-AZ2EKYQP.js.map