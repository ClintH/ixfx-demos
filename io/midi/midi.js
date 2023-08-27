/** @typedef { 'noteon'|'noteoff'|'pitchbend'|'cc'|'poly-at'|'progchange'|'at' } Commands */
/**
 * @typedef {{
 *  command: Commands
 *  channel:number
 *  note: number
 *  velocity: number
 * }} Message
 */

/**
 * Parse MIDI event
 * @param {Uint8Array} data
 * @returns {Message|undefined} 
 */
export const parse = (data) => {
  /** @type Commands|undefined */
  let command;

  let first = data[0];
  let second = data[1];
  let third = data[2];

  let channel = 0;
  if (first >= 144 && first <= 159) {
    channel = first-143;
    command = third === 0 ? `noteoff` : `noteon`;  
  } else if (first >= 128 && first <= 143) {
    channel = first-127;
    command = `noteoff`;
  } else if (first >= 160 && first <= 175) {
    channel = first-159;
    command = `poly-at`;
  } else if (first >= 176 && first <= 191) {
    channel = first - 175;
    command = `cc`;
  } else if (first >= 192 && first <= 207) {
    channel = first - 191;
    command = `progchange`;
  } else if (first >= 208 && first <= 223) {
    channel = first - 207;
    command = `at`;
  } else if (first >= 224 && first <= 239) {
    channel = first - 223;
    command = `pitchbend`;
  }

  if (command === undefined) {
    console.log(data);
  } else {
    return { command, note: second, velocity: third, channel };
  }
};
