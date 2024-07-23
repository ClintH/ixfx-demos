import { frequency } from '../../ixfx/trackers.js';

let state = Object.freeze({
  freq: frequency()
});

const use = () => {
  const { freq } = state;

  const outputElement = document.querySelector(`#output`);
  if (!outputElement) return;

  // Sort with most frequent at position 0 of the array
  const sorted = freq.entriesSorted(`value-reverse`);

  // Grab just the top five
  const topFive = sorted.slice(0, Math.min(sorted.length, 5));

  // Calculate the min, max and avg over all frequencies
  const mma = freq.minMaxAvg();

  // Calculate percentage for a given letter
  const percent = (kv) => Math.round(kv[1] / mma.total * 100);

  const top = topFive[0];

  let txt = `<p>The top letter is <code>${top[0]}</code>, appearing ${percent(top)}% of the time.</p>`;

  const asList = topFive.map(t => `<li><code>${t[0]}</code> ${percent(t)}%`);

  txt += `<p>Top five ranking: <ol>${asList.join(`,`)}</ol></p>`;
  outputElement.innerHTML = txt;
};

const update = () => {
  // Get input element
  const element = /** @type HTMLInputElement|null */(document.querySelector(`#letters`));
  if (!element) return;

  // Upper case what was typed in
  const text = element.value.toLocaleUpperCase();

  // Create a new frequency tracker
  const f = frequency();

  // Add all letters except spaces
  for (let index = 0; index < text.length; index++) {
    const char = text.charAt(index);
    if (char === ` `) continue; // Skip spaces
    f.add(char);
  }

  // Update and use state
  saveState({ freq: f });
  use();
};


function setup() {
  document.querySelector(`#letters`)?.addEventListener(`input`, event => {
    update();
  });
  update();
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}