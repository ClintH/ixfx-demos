import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
import {
  logColours,
  logSet,
  logger,
  resolveLogOption
} from "./chunk-BWJ5AMOD.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/debug/index.ts
var debug_exports = {};
__export(debug_exports, {
  fpsCounter: () => fpsCounter,
  getErrorMessage: () => getErrorMessage,
  logColours: () => logColours,
  logSet: () => logSet,
  logger: () => logger,
  resolveLogOption: () => resolveLogOption
});

// src/debug/FpsCounter.ts
var fpsCounter = (autoDisplay = true, computeAfterFrames = 500) => {
  let count = 0;
  let lastFps = 0;
  let countStart = performance.now();
  return () => {
    if (count++ >= computeAfterFrames) {
      const elapsed = performance.now() - countStart;
      countStart = performance.now();
      count = 0;
      lastFps = Math.floor(computeAfterFrames / elapsed * 1e3);
      if (autoDisplay) console.log(`fps: ${lastFps}`);
    }
    return lastFps;
  };
};

export {
  fpsCounter,
  debug_exports
};
//# sourceMappingURL=chunk-NWAKPUUW.js.map