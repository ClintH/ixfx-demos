/**
 * #####################################
 * This can be considered a library file
 * and should not need to be modified
 * #####################################
 */
import { Colour } from '../../ixfx/visual.js';
import * as Arrays from '../../ixfx/arrays.js';
import { wrapRange } from '../../ixfx/numbers.js';
import { StateMachine } from '../../ixfx/flow.js';
import { SimpleEventEmitter } from '../../ixfx/events.js';

/**
 * Parses an array of strings or [index,colour].
 * ```js
 * const leds = parseLeds([`blue`, `red`, `green`]);
 * // Yields:
 * 
 * const leds = parseLeds([ [2, `blue`], [4, `red`], [6, `green`]);
 * // Yields
 * ```
 * @param {Array<IndexedColour|string>} colours
 * @returns {Array<Led>} Leds
 */
export const parseLeds = (colours) => {
  /** @type Led[] */
  const leds = [];
  for (const [i, v] of colours.entries()) {
    const colour = (typeof v === `string`) ? v : v[1];
    const index = (typeof v === `string`) ? i : v[0];

    const parsed = Colour.toHsl(colour);
    leds.push({
      index,
      ...parsed
    });
  }
  return leds;
};

/**
 * Returns _true_ if LED/HSL is an off pixel
 * @param {Led|Hsl} led 
 */
export const isOff = (led) => {
  return (led.h === 0 && led.l === 0 && led.s === 0);
};

/**
 * Returns an 'off' colour
 * @returns 
 */
export const HslOff = () => {
  return { h: 0, s: 0, l: 0 };
};

/** @typedef {{(a:Hsl, b:Hsl):Hsl}} HslMixer */

/**
 * Updates `segment` adding/updating led values
 * ```js
 * const s = updateSegment([], [
 *  { index: 2, hue: 200, sat: 0.5, light: 0.5 }
 * ]);
 * ```
 * @param {Led[]} segment 
 * @param {Led[]} leds 
 * @param {HslMixer} [mixer]
 */
export const updateSegment = (segment, leds, mixer) => {
  // Get existing
  const existing = segment.filter(existingLed => leds.find(updatedLed => updatedLed.index === existingLed.index));

  // Get a copy minus leds that will be updated
  const without = Arrays.without(segment, leds, (a, b) => a.index === b.index);

  // Apply blend mode
  for (const existingLed of existing) {
    const updated = leds.find(led => led.index === existingLed.index);
    if (!updated) continue;

    // Don't blend off pixels
    if (existingLed.l === 0) continue;

    if (mixer) {
      const mixed = mixer(existingLed, updated);
      updated.h = mixed.h;
      updated.s = mixed.s;
      updated.l = mixed.l;
    }
  }

  // Insert the new values
  return [...without, ...leds];
};

/**
 * Sets the pixel values in `segment`, overwriting exiting values.
 * Use `updateSegment` to include blending
 * @param {Led[]} segment 
 * @param {Led[]} led 
 */
export const setPixel = (segment, led) => {
  return updateSegment(segment, led);

};

/**
 * Returns new data, setting all LEDs within
 * range to a given colour.
 * @param {Led[]} segment Data to use as basis
 * @param {Hsl} colour Colour to set
 * @param {number} start Start index
 * @param {number} count Number of LEDs to set, including start
 * @param {number} total Total number of LEDs (used for 'wrap around' logic)
 * @param {HslMixer} [mixer] How to mix colours
 */
export const setRange = (segment, colour, start, count, total, mixer) => {
  /** @type Led[] */
  const changes = [];
  for (let i = 0; i < count; i++) {
    const index = (start + i) % total;
    changes.push({ ...colour, index });
  }
  return updateSegment(segment, changes, mixer);
};

/**
 * Returns _true_ if it contains contiguous data
 * @param {Led[]} leds
 */
const isContiguous = (leds) => {
  for (const [i, led] of leds.entries()) {
    if (led.index === i) continue;
    return false;
  }
  return true;
};

/**
 * Get the hexidecimal value for LED
 * @param {Led} led 
 * @returns 
 */
const getHex = (led) => {
  const h = Math.abs(led.h % 360);

  // @ts-ignore
  const hex = Colour.toHex({ h, s: led.s, l: led.l });
  return hex.slice(1);
};

/**
 * 
 * @param {Led[]} leds 
 */
const simplifyLeds = (leds) => {
  if (isContiguous(leds)) {
    // Just grab colour: ["hex", "hex" ...]
    return leds.map(led => getHex(led));
  } else {
    // Return: [index, "hex", index, "hex" ...]
    const r = [];
    for (const led of leds) {
      r.push(led.index, getHex(led));
    }
    return r;
  }
};

/** 
 * Mixer that mixes hues somewhat perceptually
 * @type HslMixer */
export const hslHueMixer = (a, b) => {
  const d = wrapRange(0, 360, distance => {
    return Math.floor(distance * 0.5);
  }, a.h, b.h);

  return {
    h: d,
    s: b.s,
    l: b.l
  };
};

/**
 * Mixer that always lets the newer value overwrite old
 * @type HslMixer
 */
export const hslOverwriteMixer = (a, b) => {
  return b;
};

export class WledSegment {
  id = -1;

  /**
   * @type SegmentMessage
   */
  data;

  /**
   * @type Wled
   */
  #wled;

  /** @type Led[] */
  #leds;

  /** 
   * Mixing function for blending colours.
   * By default it does so by hue.
   * @type HslMixer
   * */
  mixer = hslHueMixer;

  /**
   * 
   * @param {SegmentMessage} data 
   */
  constructor(data, wled) {
    this.data = data;
    this.#wled = wled;
    this.id = data.id;
    this.#leds = this.getBlank();
  }

  /**
   * Returns an array of 'off' pixels corresponding
   * to the length of this segment. Does not set
   * the pixels.
   * @returns 
   */
  getBlank() {
    const blank = HslOff();

    /** @type Led[] */
    const d = Array.from({ length: this.length });
    for (let i = 0; i < d.length; i++) {
      d[i] = { ...blank, index: i };
    }
    return d;
  }

  /**
   * Iterate over each led from `start` and count.
   * If `start` is not provided, starts at 0
   * If `count` is not provided, wraps around to `start`
   * @param {number} [start] 
   * @param {number} [count] 
   */
  *each(start, count) {
    if (this.#leds.length !== this.length) throw new Error(`.led field does not have expected length of ${this.length}. Got: ${this.#leds.length}`);
    const s = start ?? 0;
    const c = count ?? this.length;
    for (let i = 0; i < c; i++) {
      const index = (s + i) % this.length;
      yield this.leds[index];
    }
  }

  /**
   * Set colour for all pixels within `start` and `count`.
   * @param {Hsl} colour 
   * @param {number} start 
   * @param {number} count 
   */
  setRange(colour, start, count) {
    this.leds = setRange(this.leds, colour, start, count, this.length, this.mixer);
  }

  /**
   * Set the colour for a single LED
   * @param {number} index 
   * @param {Hsl} colour 
   */
  setPixel(index, colour) {
    this.leds = setPixel(this.leds, [{ ...colour, index }]);
  }

  /**
   * 
   * @param {Led[]} leds 
   */
  setPixels(leds) {
    this.leds = setPixel(this.leds, leds);
  }

  /**
   * Set all pixels to a colour
   * @param {Hsl} hsl
   * @param {HslMixer} [mixer] 
   */
  setAll(hsl, mixer) {
    this.leds = setRange(this.leds, hsl, 0, this.length, this.length, mixer);
  }

  /**
   * Set led values in bulk
   * @param {Led[]} led 
   */
  set leds(led) {
    this.#leds = led;
  }

  get leds() {
    return this.#leds;
  }

  /**
   * Set all LEDs to this colour.
   * If not set, uses black (off)
   * @param {Hsl|undefined} [colour] 
   */
  fill(colour) {
    if (colour === undefined) colour = HslOff();
    this.setRange(colour, 0, this.length);
  }

  /**
   * Sends LED data
   */
  update() {
    if (this.#wled.debugSentLeds) {
      console.log(this.#leds);
    }
    this.send({ i: simplifyLeds(this.#leds) });
  }
  /**
   * Sets brightness 0..1
   */
  set brightness(value) {
    this.send({ bri: scalarToByte(value) });
  }

  /**
   * Sets effect (0...fxcount)
   * 
   * Sends: {fx:value}
   * @param {number} value 
   */
  set effect(value) {
    guardNumberRange(value, 0, this.#wled.effectCount);
    this.send({ fx: value });
  }

  /**
   * Sets effect speed (0..1)
   * 
   * Sends: {sx:value*255}
   */
  set speed(value) {
    const sx = scalarToByte(value);
    this.send({ sx });
  }

  /**
   * Sets effect intensity (0..1)
   * 
   * Sends: {ix:value*255}
   */
  set intensity(value) {
    const ix = scalarToByte(value);
    this.send({ ix });
  }

  /**
   * Sets value for custom slider 1
   * 
   * Sends: {c1: value*255}
   */
  set slider1(value) {
    const c1 = scalarToByte(value);
    this.send({ c1 });
  }
  /**
   * Sets value for custom slider 2
   * 
   * Sends: {c2: value*255}
   */
  set slider2(value) {
    const c2 = scalarToByte(value);
    this.send({ c2 });
  }

  /**
   * Sets value for custom slider 3
   * 
   * Sends: {c1: value*255}
   */
  set slider3(value) {
    const c3 = scalarToByte(value);
    this.send({ c3 });
  }

  /**
   * Sets palette. 0...palcount
   */
  set palette(value) {
    guardNumberRange(value, 0, this.#wled.paletteCount);
    this.send({ pal: value });
  }

  /**
   * Send data
   * @param {object} data 
   */
  send(data) {
    this.#wled.send({ seg: { id: this.id, ...data } });
  }

  /**
   * Returns the number of LEDs in the segment
   * 
   * 'len' parameter
   */
  get length() {
    return this.data.len;
  }

  /**
   * Sets the length of the segment. Necessary for some effects.
   * It will reset LED data to the new length.
   * 
   * This should usually be configured in the WLED app, but
   * in case you can't...
   */
  set length(length) {
    this.data.len = length;
    this.leds = this.getBlank();
  }
}

/**
 * @typedef {{
 * updated:{what:`info`|`state`}
 * }} WledEvents
 */
/**
 * @extends SimpleEventEmitter
 */
export class Wled extends SimpleEventEmitter {
  /**
   * @type WebSocket|undefined
   */
  ws;
  debug = true;
  /**
   * If _true_ prints result message
   */
  debugResults = false;
  /**
   * If _true_ prints out strings sent to WLED
   * Use `debugSentLeds` to print out LED info in a more readable form
   */
  debugSent = false;

  reconnectIntervalMs = 5000;

  /**
   * If _true_ dumps out LED data before sending
   */
  debugSentLeds = false;

  /**
   * @type WledSegment[]
   */
  segments = [];
  #_state;
  #_url;

  /**
   * @type StateMessage|undefined
   */
  #_lastState;

  /**
   * @type InfoMessage|undefined
   */
  #_lastInfo;

  /**
   * 
   * @param {string} websocketUrl 
   */
  constructor(websocketUrl) {
    super();
    this.#_url = websocketUrl;
    this.#_state = new StateMachine.WithEvents({
      closed: [`open`, `connecting`],
      open: [`closed`],
      connecting: [`open`, `closed`]
    }, { initial: `closed` });

    this.#_state.addEventListener(`change`, event => {
      if (event.newState === `closed`) {
        setTimeout(() => {
          console.log(`Trying to connect`);
          this.connect();
        }, this.reconnectIntervalMs);
      }
    });
    this.connect();

  }

  get connectionState() {
    return this.#_state;
  }

  get wledState() {
    return this.#_lastState;
  }

  /**
   * 
   * @param {StateMessage} msg 
   */
  #parseState(msg) {
    this.#_lastState = msg;

    this.segments = [];
    for (const seg of msg.seg) {
      this.segments.push(new WledSegment(seg, this));
    }
    this.fireEvent(`updated`, { what: `state` });
  }

  /**
   * 
   * @param {InfoMessage} msg 
   */
  #parseInfo(msg) {
    this.#_lastInfo = msg;
    this.fireEvent(`updated`, { what: `info` });
  }


  connect() {
    if (this.ws !== undefined) {
      try {
        this.ws.close();
      } catch {}
    }

    const s = new WebSocket(this.#_url);
    this.#_state.state = `connecting`;

    const reconnect = setTimeout(() => {
      console.log(`Connection failed`);
      s.close();
    }, this.reconnectIntervalMs);

    s.addEventListener(`close`, (ev) => {
      this.#_state.state = `closed`;
    });
    s.addEventListener(`error`, (ev) => {
      this.#log(`error`, ev);
    });
    s.addEventListener(`message`, (ev) => {
      let handled = false;
      try {
        const msg = JSON.parse(ev.data);

        if (`state` in msg) {
          handled = true;
          this.#parseState(msg.state);
        }
        if (`info` in msg) {
          handled = true;
          this.#parseInfo(msg.info);
        }
        if (`success` in msg) {
          const success = msg.success;
          handled = true;
          if (this.debugResults) {
            this.#log(`Success: ${success}`);
          }
        }

        if (!handled) {
          this.#log(msg);
        }
      } catch (error) {
        console.error(error);
        console.log(ev.data);
      }
    });
    s.addEventListener(`open`, (event) => {
      clearTimeout(reconnect);
      this.#log(`open`);
      this.#_state.state = `open`;
    });
    this.ws = s;
  }

  /**
   * 
   * @param {string} msg 
   * @param {object|undefined} [data]
   * @returns 
   */
  #log(msg, data) {
    if (!this.debug) return;
    if (typeof msg === `object`) msg = JSON.stringify(msg);
    if (data) {
      console.log(`Wled ${msg} ${JSON.stringify(data)}`);
    } else {
      console.log(`Wled ${msg}`);
    }
  }

  /**
   * Power on or off
   * 
   * Sends: { on: true/false}
   * @param {boolean} on 
   */
  set power(on) {
    this.send({ on });
  }

  /**
   * Gets te number of palettes.
   * Returns -1 if info not yet received.
   */
  get paletteCount() {
    if (this.#_lastInfo === undefined) return -1;
    return this.#_lastInfo.palcount;
  }

  /**
   * Gets te number of palettes
   * Returns -1 if info not yet received.
   */
  get effectCount() {
    if (this.#_lastInfo === undefined) return -1;
    return this.#_lastInfo.fxcount;
  }
  /**
   * Set brightness 0..1.
   * 
   * Sends: {bri:value*255}
   * @param {number} value 
   */
  set brightness(value) {
    const bri = scalarToByte(value);
    this.send({ bri });
    // Assumes success
    this.#updateLastState({ bri });
  }

  #updateLastState(info) {
    if (this.#_lastState === undefined) {
      this.#_lastState = info;
    } else {
      this.#_lastState = { ...this.#_lastState, ...info };
    }
  }

  get brightness() {
    return byteToScalar(this.#_lastState?.bri);
  }

  /**
   * Sends an object via websockets
   * @param {object} data 
   */
  send(data) {
    if (data === undefined) throw new TypeError(`Param 'data' is undefined`);
    if (data === null) throw new TypeError(`Param 'data' is null`);
    if (this.debugSent) {
      this.#log(`Sent`, data);
    }
    this.ws?.send(JSON.stringify(data));
  }

  /**
   * Preset value. -1...250
   * 
   * Sends: {ps:value}
   */
  set preset(value) {
    guardNumberRange(value, -1, 250);
    this.send({ ps: value });
  }

  /**
   * Iterating through a range of presets.
   * Eg `1~17` iterates between presets 1-17
   * See https://kno.wled.ge/interfaces/json-api/ 
   * 
   * Sends: {ps:pattern}
   * @param {*} pattern 
   */
  presetRange(pattern) {
    this.send({ ps: pattern });
  }

  setLeds(colours) {}
}

const scalarToByte = (value) => {
  guardNumberRange(value);
  return Math.floor(value * 255);
};

const byteToScalar = (value) => {
  guardNumberRange(value, 0, 255);
  return value / 255;
};

const guardNumberRange = (v, min = 0, max = 1) => {
  if (typeof v !== `number`) throw new TypeError(`Value is not a number. Got: ${typeof v}`);
  if (v < min) throw new Error(`Value is below min. Value: ${v} min: ${min}`);
  if (v > max) throw new Error(`Value is above max. Value: ${v} max: ${max}`);

};


/** 
 * @typedef {{
*  ver: string
*  vid: number
*  leds: {
*    count: number
*    pwr: number
*    fps: number
*    maxpwr: number
*    maxseg: number
*    seglc: number[]
*    lc:number
*    rgbw: boolean
*    wv: number
*    cct: number
*  }
*  str: boolean
*  name:string
*  udpport: number
*  live: boolean
*  liveseg: number
*  lm: string
*  lip:string
*  ws: number
*  fxcount: number
*  palcount: number
*  cpalcount: number
*  maps: any[]
*  ndc: number
*  arch: string
*  core: string
*  lwip: number
*  freeheap: number
*  uptime: number
*  time: string
*  opt: number
*  brand: string
*  product: string
*  mac: string
*  ip: string
* }} InfoMessage
*/

/**
* @typedef {{
* id: number // 0...maxseq
* start: number // start LED index
* stop: number // end LED index
* len: number // length of segment
* grp: number  // 0..255 group
* spc: number // spacing 0..255
* of: number // offset ie rotation
* on: boolean
* frz: boolean
* bri: number
* cct: number
* set: number
* col: Array<[red:number,green:number,blue:number]> // primary, secondary, tertiary
* fx: number // effect number
* sx: number // relative effect speed 0..255
* ix: number // intensity 0..255
* pal: number // id of palette
* c1: number // 0..255 custom slider
* c2: number // 0..255 custom slider
* c3: number // 0..255 custom slider
* sel: boolean
* rev: boolean
* mi: boolean // mirrors horiz
* mY: boolean // mirrors vert
* o1: boolean // effect option 1
* o2: boolean
* o3: boolean
* si: number
* m12: number
* }} SegmentMessage
*/
/**
* @typedef {{
*  on: boolean
*  bri: number
*  transition: number
*  ps: number
*  pl: number
*  nl: {
*    on:boolean
*    dur:number
*    mode: number
*    tbri: number
*    rem: number
*  }
*  lor: number
*  mainseg: number
*  seg: any[]
* }} StateMessage
*/

/**
* @typedef {{
* state:StateMessage
* info: InfoMessage
* }} StateAndInfoMessage
*/

/**
 * @typedef {[ledIndex:number, hex:string]} IndexedColour
 */

/**
 * @typedef {{
 * h:number
 * s:number
 * l:number
 * }} Hsl
 */
/**
 * @typedef {{
* h:number
* s:number
* l:number
* index:number
* }} Led
*/
