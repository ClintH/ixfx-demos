/** 
 * This script should be uploaded to the Espruino
 */

const STATE_READY = 1;
const STATE_RTP = 2;
const STATE_RTP_CANCEL = 3;

let state = STATE_READY;

// Default pins for the Espruino Pico
I2C1.setup({scl: B6, sda: B7});

// Initialise module
// Read more: http://www.espruino.com/DRV2605
const hap = require('DRV2605').connect(I2C1);

// Don't call this directly. Use rtpMode
function rtpRun(powers, durations, index) {
  try {
    if (state === STATE_RTP && index < powers.length) {
      const power = powers[index];
      const duration = durations[index];
      if (duration > 500) duration = 500;
      hap.setRealtimeValue(power);
      setTimeout(function () {
        rtpRun(powers, durations, index + 1);
      }, duration);
    } else {
      hap.setMode('internal-trigger');
      if (state === STATE_RTP_CANCEL) {
        console.log('RTP cancelled.');
      } else {
        console.log('RTP Done.');
      }
      state = STATE_READY;
    }
  } catch (ex) {
    console.log(ex);
    hap.setMode('internal-trigger');
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
  if (state !== STATE_READY) {
    throw new Error('Not in STATE_READY');
  }

  if (powers.length !== durations.length) throw new Error('powers and delays arrays must be same length');

  state = STATE_RTP;

  hap.setMode('rtp');
  rtpRun(powers, durations, 0);
}

// Trigger an effect by name or index
function trigger(what) {
  if (state !== STATE_READY) {
    throw new Error('Not in STATE_READY');
  }
  hap.trigger(what);
}

// Say hello 
console.log('Hello from the DRV2605 script!');