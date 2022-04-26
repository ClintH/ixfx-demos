import {
  Arrays_exports
} from "./chunk-IZS4HT5C.js";
import {
  isPowerOfTwo
} from "./chunk-BRJUVXZQ.js";
import {
  integer,
  number
} from "./chunk-U4IZE4J2.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/audio/index.ts
var audio_exports = {};
__export(audio_exports, {
  Analysers: () => Analyser_exports,
  Visualiser: () => AudioVisualiser_exports
});

// src/audio/Analyser.ts
var Analyser_exports = {};
__export(Analyser_exports, {
  Analyser: () => Analyser,
  basic: () => basic,
  freq: () => freq,
  peakLevel: () => peakLevel
});

// src/audio/AudioVisualiser.ts
var AudioVisualiser_exports = {};
__export(AudioVisualiser_exports, {
  default: () => Visualiser
});

// src/temporal/Tracker.ts
var Tracker = class {
  constructor(id = void 0) {
    __publicField(this, "samples", 0);
    __publicField(this, "total", 0);
    __publicField(this, "min", 0);
    __publicField(this, "max", 0);
    __publicField(this, "id");
    this.id = id;
  }
  get avg() {
    return this.total / this.samples;
  }
  resetAvg(newId = null) {
    if (newId !== null)
      this.id = newId;
    this.total = 0;
    this.samples = 0;
  }
  reset(newId = null) {
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.resetAvg(newId);
  }
  seen(sample) {
    if (Number.isNaN(sample))
      throw Error(`Cannot add NaN`);
    this.samples++;
    this.total += sample;
    this.min = Math.min(sample, this.min);
    this.max = Math.max(sample, this.max);
  }
  getMinMaxAvg() {
    return {
      min: this.min,
      max: this.max,
      avg: this.avg
    };
  }
};
var tracker = (id) => new Tracker(id);

// src/audio/AudioVisualiser.ts
var Visualiser = class {
  constructor(parentElem, audio) {
    __publicField(this, "freqMaxRange", 200);
    __publicField(this, "audio");
    __publicField(this, "parent");
    __publicField(this, "lastPointer", { x: 0, y: 0 });
    __publicField(this, "pointerDown", false);
    __publicField(this, "pointerClicking", false);
    __publicField(this, "pointerClickDelayMs", 100);
    __publicField(this, "pointerDelaying", false);
    __publicField(this, "waveTracker");
    __publicField(this, "freqTracker");
    __publicField(this, "el");
    this.audio = audio;
    this.parent = parentElem;
    this.waveTracker = new Tracker(`wave`);
    this.freqTracker = new Tracker(`freq`);
    parentElem.innerHTML = `
    <section>
      <button id="rendererComponentToggle">\u{1F53C}</button>
      <div>
        <h1>Visualiser</h1>
        <div style="display:flex; flex-wrap: wrap">
          <div class="visPanel">
            <h2>Frequency distribution</h2>
            <br />
            <canvas id="rendererComponentFreqData" height="200" width="400"></canvas>
          </div>
          <div class="visPanel">
            <h2>Waveform</h2>
            <button id="rendererComponentWaveReset">Reset</button>
            <div>
              Press and hold on wave to measure
            </div>
            <br />
            <canvas id="rendererComponentWaveData" height="200" width="400"></canvas>
          </div>
        </div>
      </div>
    </section>
    `;
    this.el = parentElem.children[0];
    document.getElementById(`rendererComponentToggle`)?.addEventListener(`click`, () => {
      this.setExpanded(!this.isExpanded());
    });
    this.el.addEventListener(`pointermove`, (e) => this.onPointer(e));
    this.el.addEventListener(`pointerup`, () => {
      this.pointerDelaying = false;
      this.pointerDown = false;
    });
    this.el.addEventListener(`pointerdown`, () => {
      this.pointerDelaying = true;
      setTimeout(() => {
        if (this.pointerDelaying) {
          this.pointerDelaying = false;
          this.pointerDown = true;
        }
      }, this.pointerClickDelayMs);
    });
    this.el.addEventListener(`pointerleave`, () => {
      this.pointerDelaying = false;
      this.pointerDown = false;
    });
    document.getElementById(`rendererComponentWaveReset`)?.addEventListener(`click`, () => {
      this.clear();
    });
  }
  renderFreq(freq2) {
    if (!this.isExpanded())
      return;
    if (!freq2)
      return;
    const canvas = document.getElementById(`rendererComponentFreqData`);
    if (canvas === null)
      throw new Error(`Cannot find canvas element`);
    const g = canvas.getContext(`2d`);
    if (g === null)
      throw new Error(`Cannot create drawing context`);
    const bins = freq2.length;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    g.clearRect(0, 0, canvasWidth, canvasHeight);
    const pointer = this.getPointerRelativeTo(canvas);
    const width = canvasWidth / bins;
    const minMax = Arrays_exports.minMaxAvg(freq2);
    for (let i = 0; i < bins; i++) {
      if (!Number.isFinite(freq2[i]))
        continue;
      const value = freq2[i] - minMax.min;
      const valueRelative = value / this.freqMaxRange;
      const height = Math.abs(canvasHeight * valueRelative);
      const offset = canvasHeight - height;
      const hue = i / bins * 360;
      const left = i * width;
      g.fillStyle = `hsl(` + hue + `, 100%, 50%)`;
      if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= left && pointer.x <= left + width) {
        if (this.freqTracker.id !== i.toString()) {
          this.freqTracker.reset(i.toString());
        }
        this.freqTracker.seen(freq2[i]);
        const freqMma = this.freqTracker.getMinMaxAvg();
        g.fillStyle = `black`;
        if (this.audio) {
          g.fillText(`Frequency (${i}) at pointer: ${this.audio.getFrequencyAtIndex(i).toLocaleString(`en`)} - ${this.audio.getFrequencyAtIndex(i + 1).toLocaleString(`en`)}`, 2, 10);
        }
        g.fillText(`Raw value: ${freq2[i].toFixed(2)}`, 2, 20);
        g.fillText(`Min: ${freqMma.min.toFixed(2)}`, 2, 40);
        g.fillText(`Max: ${freqMma.max.toFixed(2)}`, 60, 40);
        g.fillText(`Avg: ${freqMma.avg.toFixed(2)}`, 120, 40);
      }
      g.fillRect(left, offset, width, height);
    }
  }
  isExpanded() {
    const contentsElem = this.el.querySelector(`div`);
    if (contentsElem === null)
      throw new Error(`contents div not found`);
    return contentsElem.style.display === ``;
  }
  setExpanded(value) {
    const contentsElem = this.el.querySelector(`div`);
    const button = this.el.querySelector(`button`);
    if (button === null)
      throw new Error(`Button element not found`);
    if (contentsElem === null)
      throw new Error(`Contents element not found`);
    if (value) {
      contentsElem.style.display = ``;
      button.innerText = `\u{1F53C}`;
    } else {
      contentsElem.style.display = `none`;
      button.innerText = `\u{1F53D}`;
    }
  }
  clear() {
    this.clearCanvas(document.getElementById(`rendererComponentFreqData`));
    this.clearCanvas(document.getElementById(`rendererComponentWaveData`));
  }
  clearCanvas(canvas) {
    if (canvas === null)
      throw new Error(`Canvas is null`);
    const g = canvas.getContext(`2d`);
    if (g === null)
      throw new Error(`Cannot create drawing context`);
    g.fillStyle = `white`;
    g.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }
  renderWave(wave, bipolar = true) {
    if (!this.isExpanded())
      return;
    if (!wave)
      return;
    const canvas = document.getElementById(`rendererComponentWaveData`);
    if (canvas === null)
      throw new Error(`Cannot find wave canvas`);
    const g = canvas.getContext(`2d`);
    if (g === null)
      throw new Error(`Cannot create drawing context for wave`);
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const pointer = this.getPointerRelativeTo(canvas);
    const infoAreaHeight = 20;
    const infoAreaWidth = 60;
    const bins = wave.length;
    g.fillStyle = `white`;
    g.fillRect(0, 0, infoAreaWidth, infoAreaHeight);
    const width = canvasWidth / bins;
    g.fillStyle = `rgba(255, 255, 255, 0.03)`;
    g.fillRect(0, 20, canvasWidth, canvasHeight);
    g.fillStyle = `red`;
    if (bipolar) {
      g.fillRect(0, canvasHeight / 2, canvasWidth, 1);
    } else {
      g.fillRect(0, canvasHeight - 1, canvasWidth, 1);
    }
    g.lineWidth = 1;
    g.strokeStyle = `black`;
    g.beginPath();
    let x = 0;
    for (let i = 0; i < bins; i++) {
      const height = wave[i] * canvasHeight;
      const y = bipolar ? canvasHeight / 2 - height : canvasHeight - height;
      if (i === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
      x += width;
      if (this.pointerDown)
        this.waveTracker.seen(wave[i]);
    }
    g.lineTo(canvasWidth, bipolar ? canvasHeight / 2 : canvasHeight);
    g.stroke();
    if (this.pointerDown) {
      const waveMma = this.waveTracker.getMinMaxAvg();
      g.fillStyle = `rgba(255,255,0,1)`;
      g.fillRect(infoAreaWidth, 0, 150, 20);
      g.fillStyle = `black`;
      g.fillText(`Min: ` + waveMma.min.toFixed(2), 60, 10);
      g.fillText(`Max: ` + waveMma.max.toFixed(2), 110, 10);
      g.fillText(`Avg: ` + waveMma.avg.toFixed(2), 160, 10);
    } else {
      this.waveTracker.reset();
    }
    if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= 0 && pointer.x <= canvasWidth) {
      g.fillStyle = `black`;
      g.fillText(`Level: ` + (1 - pointer.y / canvasHeight).toFixed(2), 2, 10);
    }
  }
  getPointerRelativeTo(elem) {
    const rect = elem.getBoundingClientRect();
    return {
      x: this.lastPointer.x - rect.left - window.scrollX,
      y: this.lastPointer.y - rect.top - window.scrollY
    };
  }
  onPointer(evt) {
    this.lastPointer = {
      x: evt.pageX,
      y: evt.pageY
    };
    evt.preventDefault();
  }
};

// src/audio/Analyser.ts
var basic = (onData, opts = {}) => new Analyser((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  const wave = new Float32Array(node.fftSize);
  node.getFloatFrequencyData(freq2);
  node.getFloatTimeDomainData(wave);
  onData(freq2, wave, analyser);
}, opts);
var freq = (onData, opts = {}) => new Analyser((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  node.getFloatFrequencyData(freq2);
  onData(freq2, analyser);
}, opts);
var peakLevel = (onData, opts = {}) => new Analyser((node, analyser) => {
  const wave = new Float32Array(node.fftSize);
  node.getFloatTimeDomainData(wave);
  onData(Arrays_exports.maxFast(wave), analyser);
}, opts);
var _isPaused, _initInProgress;
var Analyser = class {
  constructor(analyse, opts = {}) {
    __publicField(this, "showVis");
    __publicField(this, "fftSize");
    __publicField(this, "smoothingTimeConstant");
    __privateAdd(this, _isPaused, false);
    __publicField(this, "debug");
    __privateAdd(this, _initInProgress, false);
    __publicField(this, "visualiser");
    __publicField(this, "audioCtx");
    __publicField(this, "analyserNode");
    __publicField(this, "analyse");
    this.showVis = opts.showVis ?? false;
    this.fftSize = opts.fftSize ?? 1024;
    this.debug = opts.debug ?? false;
    this.smoothingTimeConstant = opts.smoothingTimeConstant ?? 0.8;
    integer(this.fftSize, `positive`, `opts.fftSize`);
    number(this.smoothingTimeConstant, `percentage`, `opts.smoothingTimeConstant`);
    if (!isPowerOfTwo(this.fftSize))
      throw new Error(`fftSize must be a power of two from 32 to 32768 (${this.fftSize})`);
    if (this.fftSize < 32)
      throw new Error(`fftSize must be at least 32`);
    if (this.fftSize > 32768)
      throw new Error(`fftSize must be no greater than 32768`);
    this.analyse = analyse;
    this.paused = false;
    this.init();
    const visualiserEl = document.getElementById(`audio-visualiser`);
    if (visualiserEl) {
      const visualiser = new Visualiser(visualiserEl, this);
      visualiser.setExpanded(this.showVis);
      this.visualiser = visualiser;
    }
  }
  init() {
    if (__privateGet(this, _initInProgress)) {
      if (this.debug)
        console.debug(`Init already in progress`);
      return;
    }
    __privateSet(this, _initInProgress, true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.onMicSuccess(stream);
    }).catch((err) => {
      __privateSet(this, _initInProgress, false);
      console.error(err);
    });
  }
  get paused() {
    return __privateGet(this, _isPaused);
  }
  set paused(v) {
    if (v === __privateGet(this, _isPaused))
      return;
    __privateSet(this, _isPaused, v);
    if (!v) {
      if (this.debug)
        console.log(`Unpaused`);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    } else {
      if (this.debug)
        console.log(`Paused`);
    }
  }
  setup(audioCtx, stream) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = this.fftSize;
    analyser.smoothingTimeConstant = this.smoothingTimeConstant;
    const micSource = audioCtx.createMediaStreamSource(stream);
    micSource.connect(analyser);
    return analyser;
  }
  onMicSuccess(stream) {
    try {
      const audioCtx = new AudioContext();
      audioCtx.addEventListener(`statechange`, () => {
        if (this.debug)
          console.log(`Audio context state: ${audioCtx.state}`);
      });
      this.audioCtx = audioCtx;
      this.analyserNode = this.setup(audioCtx, stream);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    } catch (ex) {
      __privateSet(this, _initInProgress, false);
      console.error(ex);
    }
  }
  analyseLoop() {
    if (this.paused) {
      if (this.debug)
        console.log(`Paused`);
      return;
    }
    const a = this.analyserNode;
    if (a === void 0) {
      console.warn(`Analyser undefined`);
      return;
    }
    try {
      this.analyse(a, this);
    } catch (e) {
      console.error(e);
    }
    window.requestAnimationFrame(this.analyseLoop.bind(this));
  }
  getFrequencyRangeMax(lowFreq, highFreq, freqData) {
    const samples = this.sliceByFrequency(lowFreq, highFreq, freqData);
    return Arrays_exports.max(...samples);
  }
  sliceByFrequency(lowFreq, highFreq, freqData) {
    const lowIndex = this.getIndexForFrequency(lowFreq);
    const highIndex = this.getIndexForFrequency(highFreq);
    const samples = freqData.slice(lowIndex, highIndex);
    return samples;
  }
  getFrequencyAtIndex(index) {
    const a = this.analyserNode;
    const ctx = this.audioCtx;
    if (a === void 0)
      throw new Error(`Analyser not available`);
    if (ctx === void 0)
      throw new Error(`Audio context not available`);
    integer(index, `positive`, `index`);
    if (index > a.frequencyBinCount)
      throw new Error(`Index ${index} exceeds frequency bin count ${a.frequencyBinCount}`);
    return index * ctx.sampleRate / (a.frequencyBinCount * 2);
  }
  getIndexForFrequency(freq2) {
    const a = this.analyserNode;
    if (a === void 0)
      throw new Error(`Analyser not available`);
    const nyquist = a.context.sampleRate / 2;
    const index = Math.round(freq2 / nyquist * a.frequencyBinCount);
    if (index < 0)
      return 0;
    if (index >= a.frequencyBinCount)
      return a.frequencyBinCount - 1;
    return index;
  }
};
_isPaused = new WeakMap();
_initInProgress = new WeakMap();

export {
  tracker,
  AudioVisualiser_exports,
  Analyser_exports,
  audio_exports
};
//# sourceMappingURL=chunk-CBRQRP3X.js.map