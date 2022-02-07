import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  weighted: () => weighted
});
var weighted = (min, max) => Math.round(max / (Math.random() * max + min));

export {
  weighted,
  Random_exports
};
