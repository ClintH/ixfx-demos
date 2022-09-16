/* eslint-disable */ 
// @ts-nocheck
/** 
 * This script must be uploaded to the Espruino. 
 * Use Espruino's web IDE for that. It provides a set of 
 * functions to call into the DRV2605 module [1].
 * 
 * Overview of functions
 * 
 * rtpMode(powers, durations)
 *  Controls motor in real-time mode, where powers and durations are
 *  arrays of equal length. Powers is motor amplitude in 0-127, and durations
 *  is milliseconds for each step.
 * 
 * rtpCancel()
 *  Stops a running RTP sequence
 * 
 * setSequence(steps)
 *  This uses the DRV2605's in-built 8-step sequencer. Steps is an
 *  array of numeric indexes or string effects. Use start() to begin.
 * 
 * start() / stop()
 *  Start/stop a previously set sequence.
 * 
 * trigger(effect)
 *  One-time trigger of an effect, designated by its index or name.
 * 
 * 1. http://www.espruino.com/DRV2605
 */

const STATE_READY = 1;
const STATE_RTP = 2;
const STATE_RTP_CANCEL = 3;
const RTP_MAX_DURATION = 1000;

let state = STATE_READY;

// Default pins for the Espruino Pico
I2C1.setup({ scl: B6, sda: B7 });

// Initialise module
// Read more: http://www.espruino.com/DRV2605
const hap = require(`DRV2605`).connect(I2C1);

// Don't call this directly. Use rtpMode
function rtpRun(powers, durations, index) {
  try {
    if (state === STATE_RTP && index < powers.length) {
      const power = powers[index];
      const duration = durations[index];
      if (duration > RTP_MAX_DURATION) duration = RTP_MAX_DURATION;
      hap.setRealtimeValue(power);
      setTimeout(function () {
        rtpRun(powers, durations, index + 1);
      }, duration);
    } else {
      hap.setMode(`internal-trigger`);
      if (state === STATE_RTP_CANCEL) {
        console.log(`RTP cancelled.`);
      } else {
        console.log(`RTP Done.`);
      }
      state = STATE_READY;
    }
  } catch (ex) {
    console.log(ex);
    hap.setMode(`internal-trigger`);
    state = STATE_READY;
  }
}

// Cancels queued RTP
function rtpCancel() {
  if (this.state === STATE_RTP) {
    this.state = STATE_RTP_CANCEL;
  }
}

// Function for real-time mode
function rtpMode(powers, durations) {
  if (state !== STATE_READY) throw new Error(`Not in STATE_READY`);

  if (powers.length !== durations.length) throw new Error(`powers and delays arrays must be same length`);

  state = STATE_RTP;
  hap.setMode(`rtp`);
  rtpRun(powers, durations, 0);
}

// Sequence some steps
function setSequence(steps) {
  if (state !== STATE_READY) throw new Error(`Not in STATE_READY`);

  hap.setSequence(steps);
}

// Run a previously set sequence
function start() {
  if (state !== STATE_READY) throw new Error(`Not in STATE_READY`);

  hap.start();
}

// Stop a running sequence
function stop() {
  hap.stop();
}

// Trigger an effect by name or index
function trigger(what) {
  if (state !== STATE_READY) throw new Error(`Not in STATE_READY`);
  hap.trigger(what);
}

// Say hello so it's clear the sketch is loaded
console.log(`Hello from the DRV2605 script!`);