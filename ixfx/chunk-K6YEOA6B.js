import {
  queueMutable
} from "./chunk-2Q3G2A6K.js";
import {
  Arrays_exports,
  string
} from "./chunk-5JS26KLN.js";
import {
  StateMachine
} from "./chunk-5L5XW7ZM.js";
import {
  continuously,
  retry,
  waitFor
} from "./chunk-L2QCS65W.js";
import {
  isPowerOfTwo
} from "./chunk-CJEVR63F.js";
import {
  indexOfCharCode,
  omitChars,
  splitByLength
} from "./chunk-OE2F6QKM.js";
import {
  integer,
  number
} from "./chunk-U4IZE4J2.js";
import {
  SimpleEventEmitter
} from "./chunk-764ABC7D.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/io/index.ts
var io_exports = {};
__export(io_exports, {
  AudioAnalysers: () => AudioAnalyser_exports,
  AudioVisualisers: () => AudioVisualiser_exports,
  Bluetooth: () => NordicBleDevice_exports,
  Camera: () => Camera_exports,
  Espruino: () => Espruino_exports,
  Serial: () => Serial_exports
});

// src/io/NordicBleDevice.ts
var NordicBleDevice_exports = {};
__export(NordicBleDevice_exports, {
  NordicBleDevice: () => NordicBleDevice,
  defaultOpts: () => defaultOpts
});

// src/io/Codec.ts
var Codec = class {
  constructor() {
    __publicField(this, "enc", new TextEncoder());
    __publicField(this, "dec", new TextDecoder(`utf-8`));
  }
  toBuffer(str) {
    return this.enc.encode(str);
  }
  fromBuffer(buffer) {
    return this.dec.decode(buffer);
  }
};

// src/io/StringReceiveBuffer.ts
var StringReceiveBuffer = class {
  constructor(onData, separator = `
`) {
    this.onData = onData;
    this.separator = separator;
    __publicField(this, "buffer", ``);
    __publicField(this, "stream");
  }
  clear() {
    this.buffer = ``;
  }
  writable() {
    if (this.stream === void 0)
      this.stream = this.createWritable();
    return this.stream;
  }
  createWritable() {
    const b = this;
    return new WritableStream({
      write(chunk) {
        b.add(chunk);
      },
      close() {
        b.clear();
      }
    });
  }
  addImpl(str) {
    const pos = str.indexOf(this.separator);
    if (pos < 0) {
      this.buffer += str;
      return ``;
    }
    const part = str.substring(0, pos);
    try {
      this.onData(this.buffer + part);
      str = str.substring(part.length + this.separator.length);
    } catch (ex) {
      console.warn(ex);
    }
    this.buffer = ``;
    return str;
  }
  add(str) {
    while (str.length > 0) {
      str = this.addImpl(str);
    }
  }
};

// src/io/StringWriteBuffer.ts
var StringWriteBuffer = class {
  constructor(onData, chunkSize = -1) {
    this.onData = onData;
    this.chunkSize = chunkSize;
    __publicField(this, "paused", false);
    __publicField(this, "queue");
    __publicField(this, "writer");
    __publicField(this, "intervalMs");
    __publicField(this, "stream");
    this.intervalMs = 10;
    this.queue = queueMutable();
    this.writer = continuously(() => this.onWrite(), this.intervalMs);
  }
  clear() {
    this.queue = queueMutable();
  }
  writable() {
    if (this.stream === void 0)
      this.stream = this.createWritable();
    return this.stream;
  }
  createWritable() {
    const b = this;
    return new WritableStream({
      write(chunk) {
        b.add(chunk);
      },
      close() {
        b.clear();
      }
    });
  }
  async onWrite() {
    if (this.queue.isEmpty) {
      return false;
    }
    if (this.paused) {
      console.warn(`WriteBuffer.onWrite: paused...`);
      return true;
    }
    const s = this.queue.dequeue();
    if (s === void 0)
      return false;
    await this.onData(s);
    return true;
  }
  add(str) {
    if (this.chunkSize > 0) {
      this.queue.enqueue(...splitByLength(str, this.chunkSize));
    } else {
      this.queue.enqueue(str);
    }
    this.writer.start();
  }
};

// src/io/BleDevice.ts
var BleDevice = class extends SimpleEventEmitter {
  constructor(device, config) {
    super();
    this.device = device;
    this.config = config;
    __publicField(this, "states");
    __publicField(this, "codec");
    __publicField(this, "rx");
    __publicField(this, "tx");
    __publicField(this, "gatt");
    __publicField(this, "verboseLogging", false);
    __publicField(this, "rxBuffer");
    __publicField(this, "txBuffer");
    this.verboseLogging = config.debug;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config.chunkSize);
    this.rxBuffer = new StringReceiveBuffer((line) => {
      this.fireEvent(`data`, { data: line });
    });
    this.codec = new Codec();
    this.states = new StateMachine(`ready`, {
      ready: `connecting`,
      connecting: [`connected`, `closed`],
      connected: [`closed`],
      closed: `connecting`
    });
    this.states.addEventListener(`change`, (evt) => {
      this.fireEvent(`change`, evt);
      this.verbose(`${evt.priorState} -> ${evt.newState}`);
      if (evt.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
    device.addEventListener(`gattserverdisconnected`, () => {
      if (this.isClosed)
        return;
      this.verbose(`GATT server disconnected`);
      this.states.state = `closed`;
    });
    this.verbose(`ctor ${device.name} ${device.id}`);
  }
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`)
      throw new Error(`Cannot write while state is ${this.states.state}`);
    this.txBuffer.add(txt);
  }
  async writeInternal(txt) {
    this.verbose(`writeInternal ${txt}`);
    const tx = this.tx;
    if (tx === void 0)
      throw new Error(`Unexpectedly without tx characteristic`);
    try {
      await tx.writeValue(this.codec.toBuffer(txt));
    } catch (ex) {
      this.warn(ex);
    }
  }
  disconnect() {
    if (this.states.state !== `connected`)
      return;
    this.gatt?.disconnect();
  }
  async connect() {
    const attempts = this.config.connectAttempts ?? 3;
    this.states.state = `connecting`;
    this.verbose(`connect`);
    const gatt = this.device.gatt;
    if (gatt === void 0)
      throw new Error(`Gatt not available on device`);
    await retry(async () => {
      const server = await gatt.connect();
      this.verbose(`Getting primary service`);
      const service = await server.getPrimaryService(this.config.service);
      this.verbose(`Getting characteristics`);
      const rx = await service.getCharacteristic(this.config.rxGattCharacteristic);
      const tx = await service.getCharacteristic(this.config.txGattCharacteristic);
      rx.addEventListener(`characteristicvaluechanged`, (evt) => this.onRx(evt));
      this.rx = rx;
      this.tx = tx;
      this.gatt = gatt;
      this.states.state = `connected`;
      await rx.startNotifications();
    }, attempts, 200);
  }
  onRx(evt) {
    const rx = this.rx;
    if (rx === void 0)
      return;
    const view = evt.target.value;
    if (view === void 0)
      return;
    let str = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(str, 19);
    const plzStart = indexOfCharCode(str, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      str = omitChars(str, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      str = omitChars(str, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(str);
  }
  verbose(m) {
    if (this.verboseLogging)
      console.info(`${this.config.name} `, m);
  }
  log(m) {
    console.log(`${this.config.name} `, m);
  }
  warn(m) {
    console.warn(`${this.config.name} `, m);
  }
};

// src/io/NordicBleDevice.ts
var defaultOpts = {
  chunkSize: 20,
  service: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`,
  txGattCharacteristic: `6e400002-b5a3-f393-e0a9-e50e24dcca9e`,
  rxGattCharacteristic: `6e400003-b5a3-f393-e0a9-e50e24dcca9e`,
  name: `NordicDevice`,
  connectAttempts: 5,
  debug: false
};
var NordicBleDevice = class extends BleDevice {
  constructor(device, opts = {}) {
    super(device, { ...defaultOpts, ...opts });
  }
};

// src/io/AudioAnalyser.ts
var AudioAnalyser_exports = {};
__export(AudioAnalyser_exports, {
  AudioAnalyser: () => AudioAnalyser,
  basic: () => basic,
  freq: () => freq,
  peakLevel: () => peakLevel
});

// src/io/AudioVisualiser.ts
var AudioVisualiser_exports = {};
__export(AudioVisualiser_exports, {
  default: () => AudioVisualiser
});

// src/temporal/Tracker.ts
var Tracker = class {
  constructor(id = void 0, resetAfterSamples) {
    __publicField(this, "samples", 0);
    __publicField(this, "total", 0);
    __publicField(this, "min", 0);
    __publicField(this, "max", 0);
    __publicField(this, "id");
    __publicField(this, "resetAfterSamples");
    this.id = id;
    this.resetAfterSamples = resetAfterSamples;
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
    if (this.resetAfterSamples !== void 0 && this.samples > this.resetAfterSamples)
      this.reset();
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
var tracker = (id, resetAfterSamples) => new Tracker(id, resetAfterSamples);
var IntervalTracker = class extends Tracker {
  constructor(id = void 0, resetAfterSamples) {
    super(id, resetAfterSamples);
    __publicField(this, "lastMark", 0);
  }
  mark() {
    if (this.lastMark > 0) {
      this.seen(window.performance.now() - this.lastMark);
    }
    this.lastMark = window.performance.now();
  }
};
var intervalTracker = (id, resetAfterSamples) => new IntervalTracker(id, resetAfterSamples);

// src/io/AudioVisualiser.ts
var AudioVisualiser = class {
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

// src/io/AudioAnalyser.ts
var basic = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  const wave = new Float32Array(node.fftSize);
  node.getFloatFrequencyData(freq2);
  node.getFloatTimeDomainData(wave);
  onData(freq2, wave, analyser);
}, opts);
var freq = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  node.getFloatFrequencyData(freq2);
  onData(freq2, analyser);
}, opts);
var peakLevel = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
  const wave = new Float32Array(node.fftSize);
  node.getFloatTimeDomainData(wave);
  onData(Arrays_exports.maxFast(wave), analyser);
}, opts);
var _isPaused, _initInProgress;
var AudioAnalyser = class {
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
      const visualiser = new AudioVisualiser(visualiserEl, this);
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

// src/io/Espruino.ts
var Espruino_exports = {};
__export(Espruino_exports, {
  connectBle: () => connectBle,
  deviceEval: () => deviceEval,
  puck: () => puck,
  serial: () => serial
});

// src/io/EspruinoBleDevice.ts
var EspruinoBleDevice = class extends NordicBleDevice {
  constructor(device, opts = {}) {
    super(device, opts);
    __publicField(this, "evalTimeoutMs");
    __publicField(this, "evalReplyBluetooth", true);
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  async eval(code, opts = {}) {
    return deviceEval(code, opts, this, `Bluetooth.println`, false, (msg) => {
      this.warn(msg);
    });
  }
};

// src/io/Serial.ts
var Serial_exports = {};
__export(Serial_exports, {
  Device: () => Device
});

// src/io/JsonDevice.ts
var JsonDevice = class extends SimpleEventEmitter {
  constructor(config = {}) {
    super();
    __publicField(this, "states");
    __publicField(this, "codec");
    __publicField(this, "verboseLogging", false);
    __publicField(this, "name");
    __publicField(this, "connectAttempts");
    __publicField(this, "chunkSize");
    __publicField(this, "rxBuffer");
    __publicField(this, "txBuffer");
    this.verboseLogging = config.debug ?? false;
    this.chunkSize = config.chunkSize ?? 1024;
    this.connectAttempts = config.connectAttempts ?? 3;
    this.name = config.name ?? `JsonDevice`;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config.chunkSize);
    this.rxBuffer = new StringReceiveBuffer((line) => {
      this.fireEvent(`data`, { data: line });
    });
    this.codec = new Codec();
    this.states = new StateMachine(`ready`, {
      ready: `connecting`,
      connecting: [`connected`, `closed`],
      connected: [`closed`],
      closed: `connecting`
    });
    this.states.addEventListener(`change`, (evt) => {
      this.fireEvent(`change`, evt);
      this.verbose(`${evt.priorState} -> ${evt.newState}`);
      if (evt.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
  }
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`)
      throw new Error(`Cannot write while state is ${this.states.state}`);
    this.txBuffer.add(txt);
  }
  close() {
    if (this.states.state !== `connected`)
      return;
    this.onClosed();
  }
  async connect() {
    const attempts = this.connectAttempts;
    this.states.state = `connecting`;
    await this.onPreConnect();
    await retry(async () => {
      await this.onConnectAttempt();
      this.states.state = `connected`;
    }, attempts, 200);
  }
  onRx(evt) {
    const view = evt.target.value;
    if (view === void 0)
      return;
    let str = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(str, 19);
    const plzStart = indexOfCharCode(str, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      str = omitChars(str, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      str = omitChars(str, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(str);
  }
  verbose(m) {
    if (this.verboseLogging)
      console.info(`${this.name} `, m);
  }
  log(m) {
    console.log(`${this.name} `, m);
  }
  warn(m) {
    console.warn(`${this.name} `, m);
  }
};

// src/io/Serial.ts
var Device = class extends JsonDevice {
  constructor(config = {}) {
    super(config);
    this.config = config;
    __publicField(this, "port");
    __publicField(this, "tx");
    __publicField(this, "baudRate");
    this.baudRate = config.baudRate ?? 9600;
    if (config.name === void 0)
      super.name = `Serial.Device`;
    this.rxBuffer.separator = `\r
`;
  }
  async writeInternal(txt) {
    if (this.tx === void 0)
      throw new Error(`tx not ready`);
    try {
      this.tx.write(txt);
    } catch (ex) {
      this.warn(ex);
    }
  }
  onClosed() {
    try {
      this.port?.close();
    } catch (ex) {
      this.warn(ex);
    }
    this.states.state = `closed`;
  }
  onPreConnect() {
    return Promise.resolve();
  }
  async onConnectAttempt() {
    let reqOpts = {};
    const openOpts = {
      baudRate: this.baudRate
    };
    if (this.config.filters)
      reqOpts = { filters: [...this.config.filters] };
    this.port = await navigator.serial.requestPort(reqOpts);
    this.port.addEventListener(`disconnect`, (_) => {
      this.close();
    });
    await this.port.open(openOpts);
    const txW = this.port.writable;
    const txText = new TextEncoderStream();
    if (txW !== null) {
      txText.readable.pipeTo(txW);
      this.tx = txText.writable.getWriter();
    }
    const rxR = this.port.readable;
    const rxText = new TextDecoderStream();
    if (rxR !== null) {
      rxR.pipeTo(rxText.writable);
      rxText.readable.pipeTo(this.rxBuffer.writable());
    }
  }
};

// src/io/EspruinoSerialDevice.ts
var EspruinoSerialDevice = class extends Device {
  constructor(opts) {
    super(opts);
    __publicField(this, "evalTimeoutMs");
    __publicField(this, "evalReplyBluetooth", false);
    if (opts === void 0)
      opts = {};
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  async eval(code, opts = {}) {
    return deviceEval(code, opts, this, `console.log`, true, (msg) => {
      this.warn(msg);
    });
  }
};

// src/io/Espruino.ts
var puck = async (opts = {}) => {
  const name = opts.name ?? `Puck`;
  const debug = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      { namePrefix: `Puck.js` },
      { services: [defaultOpts.service] }
    ],
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name, debug });
  await d.connect();
  return d;
};
var serial = async (opts = {}) => {
  const d = new EspruinoSerialDevice(opts);
  await d.connect();
  return d;
};
var connectBle = async () => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      { namePrefix: `Puck.js` },
      { namePrefix: `Pixl.js` },
      { namePrefix: `MDBT42Q` },
      { namePrefix: `RuuviTag` },
      { namePrefix: `iTracker` },
      { namePrefix: `Thingy` },
      { namePrefix: `Espruino` },
      { services: [defaultOpts.service] }
    ],
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name: `Espruino` });
  await d.connect();
  return d;
};
var deviceEval = async (code, opts = {}, device, evalReplyPrefix, debug, warn) => {
  const timeoutMs = opts.timeoutMs ?? device.evalTimeoutMs;
  const assumeExclusive = opts.assumeExclusive ?? true;
  if (typeof code !== `string`)
    throw new Error(`code parameter should be a string`);
  return new Promise((resolve, reject) => {
    const id = string(5);
    const onData = (d) => {
      try {
        const dd = JSON.parse(d.data);
        if (`reply` in dd) {
          if (dd.reply === id) {
            done();
            if (`result` in dd) {
              resolve(dd.result);
            }
          } else {
            warn(`Expected reply ${id}, got ${dd.reply}`);
          }
        }
      } catch (ex) {
        if (assumeExclusive) {
          done(d.data);
        } else {
          warn(ex);
        }
      }
    };
    const onStateChange = (e) => {
      if (e.newState !== `connected`)
        done(`State changed to '${e.newState}', aborting`);
    };
    device.addEventListener(`data`, onData);
    device.addEventListener(`change`, onStateChange);
    const done = waitFor(timeoutMs, (reason) => {
      reject(reason);
    }, () => {
      device.removeEventListener(`data`, onData);
      device.removeEventListener(`change`, onStateChange);
    });
    const src = `${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))
`;
    if (debug)
      warn(src);
    device.write(src);
  });
};

// src/io/Camera.ts
var Camera_exports = {};
__export(Camera_exports, {
  dumpDevices: () => dumpDevices,
  start: () => start
});
var dumpDevices = async (filterKind = `videoinput`) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  devices.forEach((d) => {
    if (d.kind !== filterKind)
      return;
    console.log(d.label);
    console.log(` Kind: ${d.kind}`);
    console.log(` Device id: ${d.deviceId}`);
  });
};
var start = async (constraints = {}) => {
  const videoEl = document.createElement(`VIDEO`);
  videoEl.style.display = `none`;
  document.body.appendChild(videoEl);
  let stopVideo = () => {
  };
  const dispose = () => {
    try {
      stopVideo();
    } catch {
    }
    videoEl.remove();
  };
  try {
    const r = await startWithVideoEl(videoEl, constraints);
    stopVideo = r.dispose;
  } catch (err) {
    console.error(err);
    dispose();
    return;
  }
  return { videoEl, dispose };
};
var startWithVideoEl = async (videoEl, constraints = {}) => {
  if (videoEl === void 0)
    throw new Error(`videoEl undefined`);
  if (videoEl === null)
    throw new Error(`videoEl null`);
  const facingMode = constraints.facingMode ?? `user`;
  const maxRes = constraints.max;
  const minRes = constraints.min;
  const c = {
    audio: false,
    video: {
      facingMode,
      width: {},
      height: {}
    }
  };
  if (maxRes) {
    c.video.width = {
      max: maxRes.width
    };
    c.video.height = {
      max: maxRes.height
    };
  }
  if (minRes) {
    c.video.width = {
      min: minRes.width
    };
    c.video.height = {
      min: minRes.height
    };
  }
  const dispose = () => {
    console.log(`Camera:dispose`);
    videoEl.pause();
    const t = stream.getTracks();
    t.forEach((track) => track.stop());
  };
  const stream = await navigator.mediaDevices.getUserMedia(c);
  videoEl.srcObject = stream;
  const ret = { videoEl, dispose };
  const p = new Promise((resolve, reject) => {
    videoEl.addEventListener(`loadedmetadata`, () => {
      videoEl.play().then(() => {
        resolve(ret);
      }).catch((ex) => {
        reject(ex);
      });
    });
  });
  return p;
};

export {
  tracker,
  intervalTracker,
  NordicBleDevice_exports,
  AudioVisualiser_exports,
  AudioAnalyser_exports,
  Serial_exports,
  Espruino_exports,
  Camera_exports,
  io_exports
};
//# sourceMappingURL=chunk-K6YEOA6B.js.map