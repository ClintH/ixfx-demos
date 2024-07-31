import {
  windowResize
} from "./chunk-OXLPQ75P.js";
import {
  empty,
  guard,
  multiply2 as multiply,
  scaler
} from "./chunk-MVQCQHQL.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  SimpleEventEmitter
} from "./chunk-YSD5376E.js";

// src/dom/CanvasHelper.ts
var CanvasHelper = class extends SimpleEventEmitter {
  #scaler;
  #currentSize = empty;
  #ctx;
  constructor(domQueryOrEl, opts = {}) {
    super();
    if (!domQueryOrEl) throw new Error(`Param 'domQueryOrEl' is null or undefined`);
    this.el = resolveEl(domQueryOrEl);
    if (this.el.nodeName !== `CANVAS`) {
      throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
    }
    this.opts = {
      fill: opts.fill ?? `none`,
      height: opts.height ?? -1,
      width: opts.width ?? -1,
      zIndex: opts.zIndex ?? -1,
      scaleBy: opts.scaleBy ?? `both`,
      onResize: opts.onResize,
      clearOnResize: opts.clearOnResize ?? true,
      draw: opts.draw,
      skipCss: opts.skipCss ?? false
    };
    this.#scaler = scaler(`both`);
    this.#init();
  }
  #getContext(reset = false) {
    if (this.#ctx === void 0 || reset) {
      const ratio = this.ratio;
      const c = this.el.getContext(`2d`);
      if (c === null) throw new Error(`Could not create drawing context`);
      this.#ctx = c;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.scale(ratio, ratio);
    }
    return this.#ctx;
  }
  setLogicalSize(logicalSize) {
    guard(logicalSize, `logicalSize`);
    const ratio = window.devicePixelRatio || 1;
    this.#scaler = scaler(this.opts.scaleBy, logicalSize);
    const pixelScaled = multiply(logicalSize, ratio, ratio);
    this.el.width = pixelScaled.width;
    this.el.height = pixelScaled.height;
    this.el.style.width = logicalSize.width.toString() + `px`;
    this.el.style.height = logicalSize.height.toString() + `px`;
    this.#getContext(true);
    if (this.opts.clearOnResize) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.#currentSize = logicalSize;
    const r = this.opts.onResize;
    if (r) {
      setTimeout(() => {
        r(this.ctx, this.size, this);
      }, 100);
    }
    this.fireEvent(`resize`, { ctx: this.ctx, size: this.#currentSize, helper: this });
  }
  /**
   * Notified that parent has changed size
   * @returns 
   */
  #onParentResize() {
    let parentEl = this.el.parentElement;
    if (!parentEl) {
      console.warn(`No parent element`);
      return;
    }
    const bounds = parentEl.getBoundingClientRect();
    this.setLogicalSize({ width: bounds.width, height: bounds.height });
  }
  /**
   * Notified that window has changed size
   */
  #onWindowResize() {
    this.setLogicalSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  #init() {
    switch (this.opts.fill) {
      case `viewport`: {
        if (!this.opts.skipCss) {
          this.el.style.position = `absolute`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
          this.el.style.zIndex = this.opts.zIndex.toString();
        }
        const r = windowResize();
        r.onValue(() => {
          this.#onWindowResize();
        });
        this.#onWindowResize();
        break;
      }
      case `parent`: {
        if (!this.opts.skipCss) {
          this.el.style.position = `relative`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
        }
        const r = windowResize();
        r.onValue(() => {
          this.#onParentResize();
        });
        this.#onParentResize();
        break;
      }
      case `none`: {
        let { width, height } = this.el.getBoundingClientRect();
        if (this.opts.width > 0) width = this.opts.width;
        if (this.opts.height > 0) height = this.opts.height;
        const desiredSize = { width, height };
        this.setLogicalSize(desiredSize);
        break;
      }
      default: {
        throw new Error(`Unknown 'fill' value. Expecting: 'none', 'viewport' or 'fill'`);
      }
    }
    const d = this.opts.draw;
    if (d) {
      const sched = () => {
        d(this.ctx, this.#currentSize, this);
        requestAnimationFrame(sched);
      };
      setTimeout(() => {
        sched();
      }, 100);
    }
  }
  /**
   * Clears the canvas.
   * 
   * Shortcut for:
   * `this.ctx.clearRect( 0, 0, this.width, this.height)`
   */
  clear() {
    if (this.#ctx) {
      this.#ctx.clearRect(0, 0, this.width, this.height);
    }
  }
  fill(colour) {
    if (this.#ctx) {
      if (colour) this.#ctx.fillStyle = colour;
      this.#ctx.fillRect(0, 0, this.width, this.height);
    }
  }
  /**
   * Gets the drawing context
   */
  get ctx() {
    if (this.#ctx === void 0) throw new Error(`Context not available`);
    return this.#getContext();
  }
  /**
   * Gets the logical width of the canvas
   * See also: {@link height}, {@link size}
   */
  get width() {
    return this.#currentSize.width;
  }
  /**
   * Gets the logical height of the canvas
   * See also: {@link width}, {@link size}
   */
  get height() {
    return this.#currentSize.height;
  }
  /**
   * Gets the logical size of the canvas
   * See also: {@link width}, {@link height}
   */
  get size() {
    return this.#currentSize;
  }
  /**
   * Gets the current scaling ratio being used
   * to compensate for high-DPI display
   */
  get ratio() {
    return window.devicePixelRatio || 1;
  }
  /**
   * Returns the width or height, whichever is smallest
   */
  get dimensionMin() {
    return Math.min(this.width, this.height);
  }
  /**
   * Returns the width or height, whichever is largest
   */
  get dimensionMax() {
    return Math.max(this.width, this.height);
  }
  /**
   * Returns a Scaler that converts from relative to absolute
   * coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x600
   * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
   * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
   * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
   * ```
   */
  get toAbsolute() {
    return this.#scaler.abs;
  }
  /**
   * Returns a Scaler that converts from absolute
   * to relative coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x500
   * toRelative({ x: 800, y:600 });  // { x: 1,   y: 1 }
   * toRelative({ x: 0,   y: 0 });   // { x: 0,   y: 0 }
   * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
   * ```
   */
  get toRelative() {
    return this.#scaler.rel;
  }
  /**
   * Gets the center coordinate of the canvas
   */
  get center() {
    return { x: this.width / 2, y: this.height / 2 };
  }
};

export {
  CanvasHelper
};
//# sourceMappingURL=chunk-JYIJOPEM.js.map