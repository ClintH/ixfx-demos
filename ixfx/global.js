import {
  Generators_exports,
  Numbers_exports,
  Random_exports,
  Text_exports,
  collections_exports,
  data_exports,
  dom_exports,
  flow_exports,
  geometry_exports,
  io_exports,
  modulation_exports,
  visual_exports
} from "./chunk-6YLYFKO3.js";
import "./chunk-EIQV725C.js";
import {
  Events_exports
} from "./chunk-ZSSYQQHP.js";
import {
  Util_exports
} from "./chunk-DUNDLGZO.js";
import "./chunk-BIZA3WZ7.js";
import "./chunk-VE7DK22H.js";

// src/MakeGlobal.ts
try {
  if (typeof window !== `undefined`) {
    window.Util = Util_exports;
    window.Random = Random_exports;
    window.Data = data_exports;
    window.Text = Text_exports;
    window.Numbers = Numbers_exports;
    window.Io = io_exports;
    window.Geometry = geometry_exports;
    window.Flow = flow_exports;
    window.Generators = Generators_exports;
    window.Visual = visual_exports;
    window.Events = Events_exports;
    window.Modulation = modulation_exports;
    window.Dom = dom_exports;
    window.Collections = collections_exports;
  }
} catch {
}
export {
  collections_exports as Collections
};
//# sourceMappingURL=global.js.map