import { HslOff, Wled } from "../wled.js";
import { clamp } from '../../../ixfx/numbers.js';
import { continuously } from '../../../ixfx/flow.js';
import { frequencyTimer } from '../../../ixfx/flow.js';
import { Oscillators } from '../../../ixfx/modulation.js';

const settings = Object.freeze({
  wled: new Wled(`ws://4.3.2.1/ws`),
  // What segment to control
  segment: 0,
  // Number of LEDs
  numberOfLeds: 8,
  // Oscillator
  osc: Oscillators.sine(frequencyTimer(0.1))
});

/**
 * @typedef {{
 * connected: boolean
 * reset: boolean
 * index: number
 * test4Loop: undefined|import('../../../ixfx/flow.js').Continuously
 * }} State
 */

/** @type State */
let state = Object.freeze({
  connected: false,
  reset: false,
  index: 0,
  test4Loop: undefined
});

/**
 * Turn effect to 'solid' and 50% brightness
 */
function reset() {
  const { wled, segment } = settings;

  const s = wled.segments[segment];

  // 50% brightness
  s.brightness = 0.5;

  // Start with 'solid' effect
  s.effect = 0;

  // Keep track that we've sent our 'reset' commands
  saveState({ reset: true });
}

/**
 * Demos lighting up a single random LED
 */
function test1() {
  const { wled, segment, numberOfLeds } = settings;
  const s = wled.segments[segment];

  // Get an array of off LEDs
  // so we can modify it
  const leds = s.getBlank();

  // Manually set hue, sat & lightness
  const ledIndex = Math.floor(Math.random() * numberOfLeds);
  const hue = Math.floor(Math.random() * 360);
  leds[ledIndex].h = hue;  // 0..360
  leds[ledIndex].s = 1;    // 100% saturation
  leds[ledIndex].l = 0.2;  // 20% lightness

  // Update LEDs. All will be off except the random one
  s.leds = leds;
  s.update();
}

/**
 * Demos lighting up a range
 */
function test2() {
  const { wled, segment } = settings;
  let { index } = state;

  const s = wled.segments[segment];

  const colour = { h: 200, s: 0.8, l: 0.4 };

  // Want to start with all LEDs off
  s.fill();

  // Set a range of 3 leds from the current start index
  s.setRange(colour, index, 3);

  // We could call 'setRange' again to layer another range on top
  //s.setRange({ h: 10, s: 0.8, l: 0.4 }, 2, 2);

  // Send data
  s.update();

  incrementIndex();
}

/**
 * Demos using an iterator to loop over LEDs
 */
function test3() {
  const { wled, segment } = settings;
  let { index } = state;
  const s = wled.segments[segment];

  // Pick a random hue
  const hue = Math.floor(Math.random() * 360);
  // Amount to increment lightness by
  const increment = 0.1;
  // Starting lightness value
  let l = 0.3;

  for (const led of s.each(index)) {
    led.h = hue;
    led.s = 0.9;
    led.l = l;
    // Make sure we stay 0..1
    l += clamp(increment);
  }

  // Send data
  s.update();
  incrementIndex();
}

/**
 * Demonstrates animation.
 * 
 * On starting, it sets all LEDs to a colour.
 * Each time it loops, it drains some saturation from each LED
 * It also lights up a single LED with full saturation based on 
 * the position of a sine oscillator.
 * @returns 
 */
function test4() {
  const { wled, segment, osc } = settings;
  let { test4Loop } = state;
  const s = wled.segments[segment];

  // If it's already running, turn off LEDs and stop
  if (test4Loop?.runState === `running` || test4Loop?.runState === `scheduled`) {
    s.setAll(HslOff());
    s.update();

    test4Loop.cancel();
    return;
  }

  // Init segment
  s.setAll({ h: 330, s: 0, l: 0.4 });

  const anim = continuously(() => {
    // Fade out every LED a little
    for (const led of s.each()) {
      led.s = clamp(led.s - 0.1);
    }

    const v = osc.next().value;
    if (v) {
      const targetLed = Math.floor(v * s.length);
      s.setPixel(targetLed, { h: 100, s: 1, l: 0.5 });
    }
    s.update();
  }, 100);
  anim.start();

  saveState({ test4Loop: anim });
}

function incrementIndex() {
  const { wled, segment, numberOfLeds } = settings;
  let { index } = state;
  const s = wled.segments[segment];

  // Next time use the next LED as a starting point
  index++;
  if (state.index === numberOfLeds) index = 0;
  saveState({ index });
}

function setup() {
  const { wled } = settings;

  // Example UI
  document.querySelector(`#btnTest1`)?.addEventListener(`click`, event => {
    test1();
  });

  document.querySelector(`#btnTest2`)?.addEventListener(`click`, event => {
    test2();
  });

  document.querySelector(`#btnTest3`)?.addEventListener(`click`, event => {
    test3();
  });

  document.querySelector(`#btnTest4`)?.addEventListener(`click`, event => {
    test4();
  });

  // Enable this to see debug info on page. Useful for mobile.
  // Dom.inlineConsole();

  // Listen for connection state changes
  wled.connectionState.addEventListener(`change`, event => {
    console.log(`Connection: ${event.priorState} -> ${event.newState}`);
    saveState({ connected: event.newState === `open` });
  });

  // Eg. Listen for when we get updates from WLED
  wled.addEventListener(`updated`, event => {
    if (event.what === `info` && !state.reset) {
      reset();
    } else if (event.what == `state`) {
      // Override segment length, because my particular
      // WLED setup doesn't have segments configured properly
      wled.segments[settings.segment].length = settings.numberOfLeds;
    }
  });
};

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });

  // Connected state has changed
  // Update CSS so we could make it obvious in UI
  if (`connected` in s) {
    if (s.connected) {
      document.body.classList.add(`ws-open`);
      document.body.classList.remove(`ws-closed`);
    } else {
      document.body.classList.remove(`ws-open`);
      document.body.classList.add(`ws-closed`);
    }
  }
}
setup();
