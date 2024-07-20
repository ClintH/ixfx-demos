import {
  manualCapture
} from "./chunk-AZ2EKYQP.js";
import {
  numberTracker
} from "./chunk-R2SBCFPC.js";
import {
  minMaxAvg
} from "./chunk-BXWBMVS6.js";
import {
  max,
  maxFast
} from "./chunk-IALMVFKW.js";
import {
  continuously,
  retryFunction,
  retryTask,
  waitFor
} from "./chunk-RNUQGND2.js";
import {
  StateMachineWithEvents,
  StateMachine_exports
} from "./chunk-XONNGZY5.js";
import {
  QueueMutable
} from "./chunk-5PZ2TXZH.js";
import {
  SimpleEventEmitter,
  eventRace
} from "./chunk-QZPNGNL4.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  indexOfCharCode,
  omitChars,
  splitByLength
} from "./chunk-KQLC3QPI.js";
import {
  string
} from "./chunk-3ZEQSJPN.js";
import {
  isPowerOfTwo,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/io/index.ts
var io_exports = {};
__export(io_exports, {
  AudioAnalysers: () => AudioAnalyser_exports,
  AudioVisualisers: () => AudioVisualiser_exports,
  Bluetooth: () => NordicBleDevice_exports,
  Camera: () => Camera_exports,
  Codec: () => Codec,
  Espruino: () => Espruino_exports,
  FrameProcessor: () => FrameProcessor,
  Serial: () => Serial_exports,
  StringReceiveBuffer: () => StringReceiveBuffer,
  StringWriteBuffer: () => StringWriteBuffer,
  VideoFile: () => VideoFile_exports,
  genericStateTransitionsInstance: () => genericStateTransitionsInstance,
  reconnectingWebsocket: () => reconnectingWebsocket
});

// src/io/NordicBleDevice.ts
var NordicBleDevice_exports = {};
__export(NordicBleDevice_exports, {
  NordicBleDevice: () => NordicBleDevice,
  defaultOpts: () => defaultOpts
});

// src/io/Codec.ts
var Codec = class {
  enc = new TextEncoder();
  dec = new TextDecoder(`utf-8`);
  /**
   * Convert string to Uint8Array buffer
   * @param str
   * @returns
   */
  toBuffer(str) {
    return this.enc.encode(str);
  }
  /**
   * Returns a string from a provided buffer
   * @param buffer
   * @returns
   */
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
  }
  buffer = ``;
  stream;
  async close() {
    const s = this.stream;
    if (!s) return;
    await s.abort();
    await s.close();
  }
  clear() {
    this.buffer = ``;
  }
  writable() {
    if (this.stream === void 0) this.stream = this.createWritable();
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
  /**
   * Constructor
   * @param dataHandler Calback to 'send' data onwards
   * @param opts Options
   */
  constructor(dataHandler, opts = {}) {
    this.dataHandler = dataHandler;
    this.chunkSize = opts.chunkSize ?? -1;
    this.writer = continuously(async () => {
      await this.onWrite();
    }, opts.interval ?? 10);
  }
  paused = false;
  queue = new QueueMutable();
  writer;
  stream;
  closed = false;
  chunkSize;
  /**
   * Close writer (async)
   */
  async close() {
    if (this.closed) return;
    const w = this.stream?.getWriter();
    w?.releaseLock();
    await w?.close();
    this.closed = true;
  }
  /**
   * Clear queued data.
   *
   * Throws an error if {@link close} has been called.
   */
  clear() {
    if (this.closed) throw new Error(`Buffer closed`);
    this.queue = new QueueMutable();
  }
  /**
   * Gets the buffer as a writable stream.
   *
   * Do not close stream directly, use .close on this class instead.
   *
   * Throws an error if .close() has been called.
   * @returns Underlying stream
   */
  writable() {
    if (this.closed) throw new Error(`Buffer closed`);
    if (this.stream === void 0) this.stream = this.createWritable();
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
  /**
   * Run in a `continunously` loop to process queued data
   * @returns _False_ if queue is empty and loop should stop. _True_ if it shoud continue.
   */
  async onWrite() {
    if (this.queue.isEmpty) {
      return false;
    }
    if (this.paused) {
      console.warn(`WriteBuffer.onWrite: paused...`);
      return true;
    }
    const s = this.queue.dequeue();
    if (s === void 0) return false;
    await this.dataHandler(s);
    return true;
  }
  /**
   * Returns _true_ if {@link close} has been called.
   */
  get isClosed() {
    return this.closed;
  }
  /**
   * Adds some queued data to send.
   * Longer strings are automatically chunked up according to the buffer's settings.
   *
   * Throws an error if {@link close} has been called.
   * @param stringToQueue
   */
  add(stringToQueue) {
    if (this.closed) throw new Error(`Buffer closed`);
    if (this.chunkSize > 0) {
      this.queue.enqueue(...splitByLength(stringToQueue, this.chunkSize));
    } else {
      this.queue.enqueue(stringToQueue);
    }
    this.writer.start();
  }
};

// src/io/GenericStateTransitions.ts
var genericStateTransitionsInstance = Object.freeze({
  ready: `connecting`,
  connecting: [`connected`, `closed`],
  connected: [`closed`],
  closed: `connecting`
});

// src/io/BleDevice.ts
var BleDevice = class extends SimpleEventEmitter {
  constructor(device, config) {
    super();
    this.device = device;
    this.config = config;
    this.verboseLogging = config.debug;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config);
    this.rxBuffer = new StringReceiveBuffer((line) => {
      this.fireEvent(`data`, { data: line });
    });
    this.codec = new Codec();
    this.states = new StateMachineWithEvents(
      genericStateTransitionsInstance,
      {
        initial: `ready`
      }
    );
    this.states.addEventListener(`change`, (event) => {
      this.fireEvent(`change`, event);
      this.verbose(`${event.priorState} -> ${event.newState}`);
      if (event.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
    device.addEventListener(`gattserverdisconnected`, () => {
      if (this.isClosed) return;
      this.verbose(`GATT server disconnected`);
      this.states.state = `closed`;
    });
    this.verbose(`ctor ${device.name} ${device.id}`);
  }
  states;
  codec;
  rx;
  tx;
  gatt;
  verboseLogging = false;
  rxBuffer;
  txBuffer;
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`) {
      throw new Error(`Cannot write while state is ${this.states.state}`);
    }
    this.txBuffer.add(txt);
  }
  async writeInternal(txt) {
    this.verbose(`writeInternal ${txt}`);
    const tx = this.tx;
    if (tx === void 0) {
      throw new Error(`Unexpectedly without tx characteristic`);
    }
    try {
      await tx.writeValue(this.codec.toBuffer(txt));
    } catch (error) {
      this.warn(error);
    }
  }
  disconnect() {
    if (this.states.state !== `connected`) return;
    this.gatt?.disconnect();
  }
  async connect() {
    const attempts = this.config.connectAttempts ?? 3;
    this.states.state = `connecting`;
    this.verbose(`connect`);
    const gatt = this.device.gatt;
    if (gatt === void 0) throw new Error(`Gatt not available on device`);
    await retryFunction(
      async () => {
        this.verbose(`connect.retry`);
        const server = await gatt.connect();
        this.verbose(`Getting primary service`);
        const service = await server.getPrimaryService(this.config.service);
        this.verbose(`Getting characteristics`);
        const rx = await service.getCharacteristic(
          this.config.rxGattCharacteristic
        );
        const tx = await service.getCharacteristic(
          this.config.txGattCharacteristic
        );
        rx.addEventListener(
          `characteristicvaluechanged`,
          (event) => {
            this.onRx(event);
          }
        );
        this.rx = rx;
        this.tx = tx;
        this.gatt = gatt;
        this.states.state = `connected`;
        await rx.startNotifications();
        return true;
      },
      {
        limitAttempts: attempts,
        startAt: 200
      }
    );
  }
  onRx(event) {
    const rx = this.rx;
    if (rx === void 0) return;
    const view = event.target.value;
    if (view === void 0) return;
    let string_ = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(string_, 19);
    const plzStart = indexOfCharCode(string_, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      string_ = omitChars(string_, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      string_ = omitChars(string_, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(string_);
  }
  verbose(m) {
    if (this.verboseLogging) console.info(`${this.config.name}`, m);
  }
  log(m) {
    console.log(`${this.config.name}`, m);
  }
  warn(m) {
    console.warn(`${this.config.name}`, m);
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
  AudioAnalyser: () => AudioAnalyser2,
  basic: () => basic,
  freq: () => freq,
  peakLevel: () => peakLevel
});

// src/io/AudioVisualiser.ts
var AudioVisualiser_exports = {};
__export(AudioVisualiser_exports, {
  default: () => AudioVisualiser
});
var AudioVisualiser = class {
  freqMaxRange = 200;
  audio;
  parent;
  lastPointer = { x: 0, y: 0 };
  pointerDown = false;
  pointerClicking = false;
  pointerClickDelayMs = 100;
  pointerDelaying = false;
  waveTracker;
  freqTracker;
  el;
  constructor(parentElem, audio) {
    this.audio = audio;
    this.parent = parentElem;
    this.waveTracker = numberTracker();
    this.freqTracker = numberTracker();
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
    if (!this.isExpanded()) return;
    if (!freq2) return;
    const canvas = document.getElementById(
      `rendererComponentFreqData`
    );
    if (canvas === null) throw new Error(`Cannot find canvas element`);
    const g = canvas.getContext(`2d`);
    if (g === null) throw new Error(`Cannot create drawing context`);
    const bins = freq2.length;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    g.clearRect(0, 0, canvasWidth, canvasHeight);
    const pointer = this.getPointerRelativeTo(canvas);
    const width = canvasWidth / bins;
    const minMax = minMaxAvg(freq2);
    for (let i = 0; i < bins; i++) {
      if (!Number.isFinite(freq2[i])) continue;
      const value = freq2[i] - minMax.min;
      const valueRelative = value / this.freqMaxRange;
      const height = Math.abs(canvasHeight * valueRelative);
      const offset = canvasHeight - height;
      const hue = i / bins * 360;
      const left = i * width;
      g.fillStyle = `hsl(` + hue + `, 100%, 50%)`;
      if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= left && pointer.x <= left + width) {
        if (this.freqTracker.id !== i.toString()) {
          this.freqTracker = numberTracker({ id: i.toString() });
        }
        this.freqTracker.seen(freq2[i]);
        const freqMma = this.freqTracker.getMinMaxAvg();
        g.fillStyle = `black`;
        if (this.audio) {
          g.fillText(
            `Frequency (${i}) at pointer: ${this.audio.getFrequencyAtIndex(i).toLocaleString(`en`)} - ${this.audio.getFrequencyAtIndex(i + 1).toLocaleString(`en`)}`,
            2,
            10
          );
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
    if (contentsElem === null) throw new Error(`contents div not found`);
    return contentsElem.style.display === ``;
  }
  setExpanded(value) {
    const contentsElem = this.el.querySelector(`div`);
    const button = this.el.querySelector(`button`);
    if (button === null) throw new Error(`Button element not found`);
    if (contentsElem === null) throw new Error(`Contents element not found`);
    if (value) {
      contentsElem.style.display = ``;
      button.innerText = `\u{1F53C}`;
    } else {
      contentsElem.style.display = `none`;
      button.innerText = `\u{1F53D}`;
    }
  }
  clear() {
    this.clearCanvas(
      document.getElementById(`rendererComponentFreqData`)
    );
    this.clearCanvas(
      document.getElementById(`rendererComponentWaveData`)
    );
  }
  // Clears a canvas to white
  clearCanvas(canvas) {
    if (canvas === null) throw new Error(`Canvas is null`);
    const g = canvas.getContext(`2d`);
    if (g === null) throw new Error(`Cannot create drawing context`);
    g.fillStyle = `white`;
    g.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }
  // Renders waveform data.
  // Adapted from MDN's AnalyserNode.getFloatTimeDomainData() example
  renderWave(wave, bipolar = true) {
    if (!this.isExpanded()) return;
    if (!wave) return;
    const canvas = document.getElementById(
      `rendererComponentWaveData`
    );
    if (canvas === null) throw new Error(`Cannot find wave canvas`);
    const g = canvas.getContext(`2d`);
    if (g === null) throw new Error(`Cannot create drawing context for wave`);
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
      if (this.pointerDown) this.waveTracker.seen(wave[i]);
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
      g.fillText(
        `Level: ` + (1 - pointer.y / canvasHeight).toFixed(2),
        2,
        10
      );
    }
  }
  // Yields pointer position relative to given element
  getPointerRelativeTo(elem) {
    const rect = elem.getBoundingClientRect();
    return {
      x: this.lastPointer.x - rect.left - window.scrollX,
      //elem.offsetLeft + window.scrollX,
      y: this.lastPointer.y - rect.top - window.scrollY
      //elem.offsetTop + window.scrollY
    };
  }
  // Keeps track of last pointer position in page coordinate space
  onPointer(evt) {
    this.lastPointer = {
      x: evt.pageX,
      y: evt.pageY
    };
    evt.preventDefault();
  }
  // getMinMax(data, start = 0, end = data.length) {
  //   if (end > data.length) throw new Error(`end is past size of array`);
  //   if (start < 0) throw new Error(`start should be at least 0`);
  //   if (end <= start) throw new Error(`end should be greater than start`);
  //   let max = Number.MIN_SAFE_INTEGER;
  //   let min = Number.MAX_SAFE_INTEGER;
  //   for (let i = start; i < end; i++) {
  //     max = Math.max(data[i], max);
  //     min = Math.min(data[i], min);
  //   }
  //   if (!Number.isFinite(max)) max = 0;
  //   if (!Number.isFinite(min)) min = 0;
  //   return {max: max, min: min};
  // }
};

// src/io/AudioAnalyser.ts
var basic = (onData, opts = {}) => new AudioAnalyser2((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  const wave = new Float32Array(node.fftSize);
  node.getFloatFrequencyData(freq2);
  node.getFloatTimeDomainData(wave);
  onData(freq2, wave, analyser);
}, opts);
var freq = (onData, opts = {}) => new AudioAnalyser2((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  node.getFloatFrequencyData(freq2);
  onData(freq2, analyser);
}, opts);
var peakLevel = (onData, opts = {}) => new AudioAnalyser2((node, analyser) => {
  const wave = new Float32Array(node.fftSize);
  node.getFloatTimeDomainData(wave);
  onData(maxFast(wave), analyser);
}, opts);
var AudioAnalyser2 = class {
  showVis;
  fftSize;
  smoothingTimeConstant;
  #isPaused = false;
  debug;
  #initInProgress = false;
  visualiser;
  audioCtx;
  analyserNode;
  analyse;
  constructor(analyse, opts = {}) {
    this.showVis = opts.showVis ?? false;
    this.fftSize = opts.fftSize ?? 1024;
    this.debug = opts.debug ?? false;
    this.smoothingTimeConstant = opts.smoothingTimeConstant ?? 0.8;
    throwIntegerTest(this.fftSize, `positive`, `opts.fftSize`);
    throwNumberTest(
      this.smoothingTimeConstant,
      `percentage`,
      `opts.smoothingTimeConstant`
    );
    if (!isPowerOfTwo(this.fftSize)) {
      throw new Error(
        `fftSize must be a power of two from 32 to 32768 (${this.fftSize})`
      );
    }
    if (this.fftSize < 32) throw new Error(`fftSize must be at least 32`);
    if (this.fftSize > 32768) {
      throw new Error(`fftSize must be no greater than 32768`);
    }
    this.analyse = analyse;
    this.paused = false;
    this.init();
    const visualiserEl = document.querySelector(`#audio-visualiser`);
    if (visualiserEl) {
      const visualiser = new AudioVisualiser(visualiserEl, this);
      visualiser.setExpanded(this.showVis);
      this.visualiser = visualiser;
    }
  }
  init() {
    if (this.#initInProgress) {
      if (this.debug) console.debug(`Init already in progress`);
      return;
    }
    this.#initInProgress = true;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.onMicSuccess(stream);
    }).catch((error) => {
      this.#initInProgress = false;
      console.error(error);
    });
  }
  get paused() {
    return this.#isPaused;
  }
  set paused(v) {
    if (v === this.#isPaused) return;
    this.#isPaused = v;
    if (v) {
      if (this.debug) console.log(`Paused`);
    } else {
      if (this.debug) console.log(`Unpaused`);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    }
  }
  setup(context, stream) {
    const analyser = context.createAnalyser();
    analyser.fftSize = this.fftSize;
    analyser.smoothingTimeConstant = this.smoothingTimeConstant;
    const micSource = context.createMediaStreamSource(stream);
    micSource.connect(analyser);
    return analyser;
  }
  // Microphone successfully initalised, now have access to audio data
  onMicSuccess(stream) {
    try {
      const context = new AudioContext();
      context.addEventListener(`statechange`, () => {
        if (this.debug) console.log(`Audio context state: ${context.state}`);
      });
      this.audioCtx = context;
      this.analyserNode = this.setup(context, stream);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    } catch (error) {
      this.#initInProgress = false;
      console.error(error);
    }
  }
  analyseLoop() {
    if (this.paused) {
      if (this.debug) console.log(`Paused`);
      return;
    }
    const a = this.analyserNode;
    if (a === void 0) {
      console.warn(`Analyser undefined`);
      return;
    }
    try {
      this.analyse(a, this);
    } catch (error) {
      console.error(error);
    }
    window.requestAnimationFrame(this.analyseLoop.bind(this));
  }
  // visualise(wave, freq) {
  //   if (!this.visualiser) return;
  //   this.visualiser.renderWave(wave, true);
  //   this.visualiser.renderFreq(freq);
  // }
  /**
   * Returns the maximum FFT value within the given frequency range
   */
  getFrequencyRangeMax(lowFreq, highFreq, freqData) {
    const samples = this.sliceByFrequency(lowFreq, highFreq, freqData);
    return max(samples);
  }
  /**
   * Returns a sub-sampling of frequency analysis data that falls between
   * `lowFreq` and `highFreq`.
   * @param lowFreq Low frequency
   * @param highFreq High frequency
   * @param freqData Full-spectrum frequency data
   * @returns Sub-sampling of analysis
   */
  sliceByFrequency(lowFreq, highFreq, freqData) {
    const lowIndex = this.getIndexForFrequency(lowFreq);
    const highIndex = this.getIndexForFrequency(highFreq);
    const samples = freqData.slice(lowIndex, highIndex);
    return samples;
  }
  /**
   * Returns the starting frequency for a given binned frequency index.
   * @param index Array index
   * @returns Sound frequency
   */
  getFrequencyAtIndex(index) {
    const a = this.analyserNode;
    const ctx = this.audioCtx;
    if (a === void 0) throw new Error(`Analyser not available`);
    if (ctx === void 0) throw new Error(`Audio context not available`);
    throwIntegerTest(index, `positive`, `index`);
    if (index > a.frequencyBinCount) {
      throw new Error(
        `Index ${index} exceeds frequency bin count ${a.frequencyBinCount}`
      );
    }
    return index * ctx.sampleRate / (a.frequencyBinCount * 2);
  }
  /**
   * Returns a binned array index for a given frequency
   * @param freq Sound frequency
   * @returns Array index into frequency bins
   */
  getIndexForFrequency(freq2) {
    const a = this.analyserNode;
    if (a === void 0) throw new Error(`Analyser not available`);
    const nyquist = a.context.sampleRate / 2;
    const index = Math.round(freq2 / nyquist * a.frequencyBinCount);
    if (index < 0) return 0;
    if (index >= a.frequencyBinCount) return a.frequencyBinCount - 1;
    return index;
  }
};

// src/io/Espruino.ts
var Espruino_exports = {};
__export(Espruino_exports, {
  EspruinoBleDevice: () => EspruinoBleDevice,
  EspruinoSerialDevice: () => EspruinoSerialDevice,
  bangle: () => bangle,
  connectBle: () => connectBle,
  deviceEval: () => deviceEval,
  puck: () => puck,
  serial: () => serial
});

// src/io/EspruinoBleDevice.ts
var EspruinoBleDevice = class extends NordicBleDevice {
  evalTimeoutMs;
  evalReplyBluetooth = true;
  /**
   * Creates instance. You probably would rather use {@link puck} to create.
   * @param device
   * @param opts
   */
  constructor(device, opts = {}) {
    super(device, opts);
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  async eval(code, opts = {}, warn) {
    const debug = opts.debug ?? false;
    const warnCallback = warn ?? ((m) => {
      this.warn(m);
    });
    return deviceEval(code, opts, this, `Bluetooth.println`, debug, warnCallback);
  }
  /*
      const timeoutMs = opts.timeoutMs ?? this.evalTimeoutMs;
      const assumeExclusive = opts.assumeExclusive ?? true;
  
      if (typeof code !== `string`) throw new Error(`code parameter should be a string`);
        
      return new Promise((resolve, reject) => {
        // Generate a random id so reply can be matched up with this request
        const id = randomString(5);
  
        const onData = (d:DataEvent) => {
          try {
            // Parse reply, expecting JSON.
            const dd = JSON.parse(d.data);
  
            // Check for reply field, and that it matches
            if (`reply` in dd) {
              if (dd.reply === id) {
                done(); // Stop waiting for result
                if (`result` in dd) {
                  resolve(dd.result);
                }
              } else {
                this.warn(`Expected reply ${id}, got ${dd.reply}`);
              }
            }
          } catch (ex:unknown) {
            // If there was a syntax error, response won't be JSON
            if (assumeExclusive) {
              // Fail with unexpected reply as the message
              done(d.data);
            } else {
              // Unexpected reply, but we cannot be sure if it's in response to eval or
              // some other code running on board. So just warn and eventually timeout
              this.warn(ex);
            }
          }
        };
  
        const onStateChange = (e:StateChangeEvent) => {
          if (e.newState !== `connected`) done(`State changed to '${e.newState}', aborting`);
        };
  
        this.addEventListener(`data`, onData);
        this.addEventListener(`change`, onStateChange);
  
        // Init waitFor
        const done = waitFor(timeoutMs, (reason:string) => {
          reject(reason);
        }, () => {
          // If we got a response or there was a timeout, remove event listeners
          this.removeEventListener(`data`, onData);
          this.removeEventListener(`change`, onStateChange);
        });
  
        this.write(`\x10Bluetooth.println(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))\n`);
      });
    */
};

// src/io/Serial.ts
var Serial_exports = {};
__export(Serial_exports, {
  Device: () => Device
});

// src/io/JsonDevice.ts
var JsonDevice = class extends SimpleEventEmitter {
  states;
  codec;
  verboseLogging = false;
  name;
  connectAttempts;
  chunkSize;
  rxBuffer;
  txBuffer;
  constructor(config = {}) {
    super();
    this.verboseLogging = config.debug ?? false;
    this.chunkSize = config.chunkSize ?? 1024;
    this.connectAttempts = config.connectAttempts ?? 3;
    this.name = config.name ?? `JsonDevice`;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config);
    this.rxBuffer = new StringReceiveBuffer((line) => {
      this.fireEvent(`data`, { data: line });
    });
    this.codec = new Codec();
    this.states = new StateMachineWithEvents(genericStateTransitionsInstance, {
      initial: `ready`
    });
    this.states.addEventListener(`change`, (event) => {
      this.fireEvent(`change`, event);
      this.verbose(`${event.priorState} -> ${event.newState}`);
      if (event.priorState === `connected`) {
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
    if (this.states.state !== `connected`) {
      throw new Error(`Cannot write while state is ${this.states.state}`);
    }
    this.txBuffer.add(txt);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async close() {
    if (this.states.state !== `connected`) return;
    this.onClosed();
  }
  async connect() {
    const attempts = this.connectAttempts;
    this.states.state = `connecting`;
    await this.onPreConnect();
    await retryFunction(
      async () => {
        await this.onConnectAttempt();
        this.states.state = `connected`;
        return true;
      },
      {
        limitAttempts: attempts,
        startAt: 200
      }
    );
  }
  onRx(event) {
    const view = event.target.value;
    if (view === void 0) return;
    let string_ = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(string_, 19);
    const plzStart = indexOfCharCode(string_, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      string_ = omitChars(string_, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      string_ = omitChars(string_, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(string_);
  }
  verbose(m) {
    if (this.verboseLogging) console.info(`${this.name}`, m);
  }
  log(m) {
    console.log(`${this.name}`, m);
  }
  warn(m) {
    console.warn(`${this.name}`, m);
  }
};

// src/io/Serial.ts
var Device = class extends JsonDevice {
  constructor(config = {}) {
    super(config);
    this.config = config;
    this.abort = new AbortController();
    const eol = config.eol ?? `\r
`;
    this.baudRate = config.baudRate ?? 9600;
    if (config.name === void 0) this.name = `Serial.Device`;
    this.rxBuffer.separator = eol;
  }
  port;
  tx;
  abort;
  baudRate;
  /**
   * Writes text collected in buffer
   * @param txt
   */
  async writeInternal(txt) {
    if (this.tx === void 0) throw new Error(`tx not ready`);
    try {
      this.tx.write(txt);
    } catch (error) {
      this.warn(error);
    }
  }
  onClosed() {
    this.tx?.releaseLock();
    this.abort.abort(`closing port`);
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
    if (this.config.filters) reqOpts = { filters: [...this.config.filters] };
    this.port = await navigator.serial.requestPort(reqOpts);
    this.port.addEventListener(`disconnect`, (_) => {
      this.close();
    });
    await this.port.open(openOpts);
    const txW = this.port.writable;
    const txText = new TextEncoderStream();
    if (txW !== null) {
      txText.readable.pipeTo(txW, { signal: this.abort.signal }).catch((error) => {
        console.log(`Serial.onConnectAttempt txText pipe:`);
        console.log(error);
      });
      this.tx = txText.writable.getWriter();
    }
    const rxR = this.port.readable;
    const rxText = new TextDecoderStream();
    if (rxR !== null) {
      rxR.pipeTo(rxText.writable, { signal: this.abort.signal }).catch((error) => {
        console.log(`Serial.onConnectAttempt rxR pipe:`);
        console.log(error);
      });
      rxText.readable.pipeTo(this.rxBuffer.writable(), { signal: this.abort.signal }).catch((error) => {
        console.log(`Serial.onConnectAttempt rxText pipe:`);
        console.log(error);
        try {
          this.port?.close();
        } catch (error2) {
          console.log(error2);
        }
      });
    }
  }
};

// src/io/EspruinoSerialDevice.ts
var EspruinoSerialDevice = class extends Device {
  evalTimeoutMs;
  evalReplyBluetooth = false;
  constructor(opts) {
    super(opts);
    if (opts === void 0) opts = {};
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async disconnect() {
    return super.close();
  }
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive: If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  async eval(code, opts = {}, warn) {
    const debug = opts.debug ?? false;
    const warner = warn ?? ((m) => {
      this.warn(m);
    });
    return deviceEval(code, opts, this, `USB.println`, debug, warner);
  }
};

// src/io/Espruino.ts
var puck = async (opts = {}) => {
  const name = opts.name ?? `Puck`;
  const debug = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts, `Puck.js`),
    optionalServices: [defaultOpts.service]
  });
  console.log(device.name);
  const d = new EspruinoBleDevice(device, { name, debug });
  await d.connect();
  return d;
};
var bangle = async (opts = {}) => {
  const name = opts.name ?? `Bangle`;
  const debug = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts, `Bangle.js`),
    optionalServices: [defaultOpts.service]
  });
  console.log(device.name);
  const d = new EspruinoBleDevice(device, { name, debug });
  await d.connect();
  return d;
};
var serial = async (opts = {}) => {
  const d = new EspruinoSerialDevice(opts);
  await d.connect();
  return d;
};
var getFilters = (opts, defaultNamePrefix) => {
  const filters = [];
  if (opts.filters) {
    filters.push(...opts.filters);
  } else if (opts.name) {
    filters.push({ name: opts.name });
    console.info(`Filtering Bluetooth devices by name '${opts.name}'`);
  } else {
    filters.push({ namePrefix: defaultNamePrefix });
  }
  return filters;
};
var connectBle = async (opts = {}) => {
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts, `Puck.js`),
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name: `Espruino`, ...opts });
  await d.connect();
  return d;
};
var deviceEval = async (code, opts = {}, device, evalReplyPrefix, debug, warn) => {
  const timeoutMs = opts.timeoutMs ?? device.evalTimeoutMs;
  const assumeExclusive = opts.assumeExclusive ?? true;
  if (typeof code !== `string`) {
    throw new TypeError(`code parameter should be a string`);
  }
  return new Promise((resolve, reject) => {
    const id = string(5);
    const onData = (d) => {
      try {
        let cleaned = d.data;
        if (cleaned.startsWith(`>{`) && cleaned.endsWith(`}`)) {
          cleaned = cleaned.slice(1);
        }
        const dd = JSON.parse(cleaned);
        if (`reply` in dd) {
          if (dd.reply === id) {
            done();
            if (`result` in dd) {
              resolve(dd.result);
            }
          } else {
            warn(`Expected reply ${id}, got ${dd.reply}`);
          }
        } else {
          warn(`Expected packet, missing 'reply' field. Got: ${d.data}`);
        }
      } catch (error) {
        if (assumeExclusive) {
          done(d.data);
        } else {
          warn(error);
        }
      }
    };
    const onStateChange = (event) => {
      if (event.newState !== `connected`) {
        done(`State changed to '${event.newState}', aborting`);
      }
    };
    device.addEventListener(`data`, onData);
    device.addEventListener(`change`, onStateChange);
    const done = waitFor(
      timeoutMs,
      (reason) => {
        reject(new Error(reason));
      },
      () => {
        device.removeEventListener(`data`, onData);
        device.removeEventListener(`change`, onStateChange);
      }
    );
    const source = `${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))
`;
    if (debug) warn(source);
    device.write(source);
  });
};

// src/io/Camera.ts
var Camera_exports = {};
__export(Camera_exports, {
  dumpDevices: () => dumpDevices,
  start: () => start
});
var startTimeoutMs = 1e4;
var dumpDevices = async (filterKind = `videoinput`) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  for (const d of devices) {
    if (d.kind !== filterKind) continue;
    console.log(d.label);
    console.log(` Kind: ${d.kind}`);
    console.log(` Device id: ${d.deviceId}`);
  }
};
var start = async (constraints = {}) => {
  const videoEl = document.createElement(`VIDEO`);
  videoEl.style.display = `none`;
  videoEl.playsInline = true;
  videoEl.muted = true;
  videoEl.classList.add(`ixfx-camera`);
  document.body.append(videoEl);
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
    return { videoEl, dispose };
  } catch (error) {
    console.error(error);
    dispose();
    throw error;
  }
};
var startWithVideoEl = async (videoEl, constraints = {}) => {
  if (videoEl === void 0) throw new Error(`videoEl undefined`);
  if (videoEl === null) throw new Error(`videoEl null`);
  const maxResolution = constraints.max;
  const minResolution = constraints.min;
  const idealResolution = constraints.ideal;
  const c = {
    audio: false,
    video: {
      width: {},
      height: {}
    }
  };
  if (constraints.facingMode === `front`) {
    constraints = { ...constraints, facingMode: `user` };
  }
  if (constraints.facingMode === `back`) {
    constraints = { ...constraints, facingMode: `environment` };
  }
  if (constraints.facingMode) {
    c.video.facingMode = constraints.facingMode;
  }
  if (constraints.deviceId) {
    c.video.deviceId = constraints.deviceId;
  }
  if (idealResolution) {
    c.video.width = {
      ...c.video.width,
      ideal: idealResolution.width
    };
    c.video.height = {
      ...c.video.height,
      ideal: idealResolution.height
    };
  }
  if (maxResolution) {
    c.video.width = {
      ...c.video.width,
      max: maxResolution.width
    };
    c.video.height = {
      ...c.video.height,
      max: maxResolution.height
    };
  }
  if (minResolution) {
    c.video.width = {
      ...c.video.width,
      min: minResolution.width
    };
    c.video.height = {
      ...c.video.height,
      min: minResolution.height
    };
  }
  const done = waitFor(
    constraints.startTimeoutMs ?? startTimeoutMs,
    (reason) => {
      throw new Error(`Camera getUserMedia failed: ${reason}`);
    }
  );
  try {
    const stream = await navigator.mediaDevices.getUserMedia(c);
    const dispose = () => {
      videoEl.pause();
      const t = stream.getTracks();
      for (const track of t) track.stop();
    };
    videoEl.srcObject = stream;
    done();
    const returnValue = { videoEl, dispose };
    const p = new Promise((resolve, reject) => {
      videoEl.addEventListener(`loadedmetadata`, () => {
        videoEl.play().then(() => {
          resolve(returnValue);
        }).catch((error) => {
          reject(error);
        });
      });
    });
    return p;
  } catch (error) {
    done(getErrorMessage(error));
    throw error;
  }
};

// src/io/VideoFile.ts
var VideoFile_exports = {};
__export(VideoFile_exports, {
  start: () => start2
});
var start2 = async (file) => {
  const videoEl = document.createElement(`VIDEO`);
  videoEl.style.display = `none`;
  videoEl.playsInline = true;
  videoEl.muted = true;
  videoEl.classList.add(`ixfx-video`);
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
    const r = await startWithVideoEl2(videoEl, file);
    stopVideo = r.dispose;
    return { videoEl, dispose };
  } catch (ex) {
    console.error(ex);
    dispose();
    throw ex;
  }
};
var startWithVideoEl2 = async (videoEl, file) => {
  if (videoEl === void 0) throw new Error(`videoEl undefined`);
  if (videoEl === null) throw new Error(`videoEl null`);
  const url = URL.createObjectURL(file);
  videoEl.src = url;
  videoEl.loop = true;
  const dispose = () => {
    videoEl.pause();
  };
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

// src/io/FrameProcessor.ts
var FrameProcessor = class {
  _source;
  _state;
  _teardownNeeded = false;
  _cameraConstraints;
  _cameraStartResult;
  _videoSourceCapture;
  _videoFile;
  _videoStartResult;
  _showCanvas;
  _showPreview;
  _postCaptureDraw;
  _timer;
  _captureCanvasEl;
  /**
   * Create a new frame processor
   * @param opts
   */
  constructor(opts = {}) {
    this._state = `ready`;
    this._source = ``;
    this._timer = performance.now();
    this._showCanvas = opts.showCanvas ?? false;
    this._showPreview = opts.showPreview ?? false;
    this._cameraConstraints = opts.cameraConstraints ?? void 0;
    this._captureCanvasEl = opts.captureCanvasEl ?? void 0;
    this._postCaptureDraw = opts.postCaptureDraw;
  }
  /**
   * Hides or shows the raw source in the DOM
   * @param enabled Preview enabled
   */
  showPreview(enabled) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    let el;
    switch (this._source) {
      case `camera`: {
        el = this._cameraStartResult?.videoEl;
        if (el !== void 0) el.style.display = enabled ? `block` : `none`;
        break;
      }
    }
    this._showPreview = enabled;
  }
  /**
   * Shows or hides the Canvas we're capturing to
   * @param enabled
   */
  showCanvas(enabled) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    let el;
    if (this._source === `camera` || this._source === `video`) {
      el = this._videoSourceCapture?.canvasEl;
      if (el !== void 0) el.style.display = enabled ? `block` : `none`;
    } else throw new Error(`Source not implemented: ${this._source}`);
    this._showCanvas = enabled;
  }
  /**
   * Returns the current capturer instance
   * @returns
   */
  getCapturer() {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    if (this._source === `camera` || this._source === `video`) {
      return this._videoSourceCapture;
    }
    throw new Error(`Source kind not supported ${this._source}`);
  }
  /**
   * Grab frames from a video camera source and initialises
   * frame processor.
   *
   * If `constraints` are not specified, it will use the ones
   * provided when creating the class, or defaults.
   *
   * @param constraints Override of constraints when requesting camera access
   */
  async useCamera(constraints) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    this._source = `camera`;
    if (this._teardownNeeded) this.teardown();
    if (constraints) this._cameraConstraints;
    await this.init();
  }
  async useVideo(file) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    this._source = `video`;
    if (this._teardownNeeded) this.teardown();
    this._videoFile = file;
    await this.init();
  }
  /**
   * Initialises camera
   */
  async initCamera() {
    const r = await start(this._cameraConstraints);
    if (r === void 0) throw new Error(`Could not start camera`);
    this._cameraStartResult = r;
    this.postInit(r);
  }
  async initVideo() {
    if (!this._videoFile) throw new Error(`Video file not defined`);
    const r = await start2(this._videoFile);
    this._videoStartResult = r;
    this.postInit(r);
  }
  async postInit(r) {
    if (this._showPreview) r.videoEl.style.display = `block`;
    this._videoSourceCapture = manualCapture(r.videoEl, {
      postCaptureDraw: this._postCaptureDraw,
      showCanvas: this._showCanvas,
      canvasEl: this._captureCanvasEl
    });
    this._teardownNeeded = true;
    this._cameraStartResult = r;
  }
  /**
   * Closes down connections and removes created elements.
   * Once disposed, the frame processor cannot be used
   * @returns
   */
  dispose() {
    if (this._state === `disposed`) return;
    this.teardown();
    this._state = `disposed`;
  }
  async init() {
    this._timer = performance.now();
    switch (this._source) {
      case `camera`: {
        await this.initCamera();
        break;
      }
      case `video`: {
        await this.initVideo();
        break;
      }
    }
    this._state = `initialised`;
  }
  teardown() {
    if (!this._teardownNeeded) return;
    if (this._source === `camera` || this._source === `video`) {
      this._videoSourceCapture?.dispose();
    }
    switch (this._source) {
      case `camera`: {
        this._cameraStartResult?.dispose();
        break;
      }
      case `video`: {
        this._videoStartResult?.dispose();
        break;
      }
    }
    this._teardownNeeded = false;
  }
  /**
   * Get the last frame
   * @returns
   */
  getFrame() {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    switch (this._source) {
      case `camera`: {
        return this.getFrameCamera();
      }
      case `video`: {
        return this.getFrameCamera();
      }
      default: {
        throw new Error(`source type unhandled ${this._source}`);
      }
    }
  }
  /**
   * Get the timestamp of the processor (elapsed time since starting)
   * @returns
   */
  getTimestamp() {
    return performance.now() - this._timer;
  }
  getFrameCamera() {
    return this._videoSourceCapture?.capture();
  }
};

// src/io/ReconnectingWebSocket.ts
var reconnectingWebsocket = (url, opts = {}) => {
  const startDelayMs = intervalToMs(opts.startDelay, 2e3);
  const maxDelayMs = intervalToMs(opts.maxDelay, startDelayMs * 10);
  const checkStateMs = intervalToMs(opts.checkStateMs, 5e3);
  if (startDelayMs > maxDelayMs) throw new Error(`startDelay should be less than maxDelay`);
  if (checkStateMs < 0) throw new Error(`Param 'checkState' should be above zero`);
  let reconnect = true;
  let currentState = StateMachine_exports.init({
    closed: `connecting`,
    open: `closed`,
    connecting: [`closed`, `open`]
  });
  let ws;
  const onError = (event_) => {
    if (opts.onError) {
      opts.onError(event_);
    } else {
      console.log(`rw on error`, event_);
      console.error(` error: ${event_.error}`);
      console.error(` type: ${event_.type}`);
      console.error(` error msg: ${event_.message}`);
    }
  };
  const onMessage = (message) => {
    if (opts.onMessage) opts.onMessage(message.data);
  };
  const connect = async () => {
    if (currentState.value === `connecting`) throw new Error(`Cannot connect twice`);
    currentState = StateMachine_exports.to(currentState, `connecting`);
    if (ws !== void 0) {
      ws.removeEventListener(`error`, onError);
      if (opts.onMessage) {
        ws.removeEventListener(`message`, onMessage);
      }
      ws = void 0;
    }
    const retry = await retryTask({
      async probe(_attempts) {
        try {
          const wss = new WebSocket(url);
          const r = await eventRace(wss, [`open`, `error`], { timeout: 1e3 });
          return r.type === `open` ? { success: true, value: wss } : { success: false, value: void 0 };
        } catch (error) {
          return { success: false, message: getErrorMessage(error) };
        }
      }
    }, { predelayMs: startDelayMs, limitAttempts: opts.limitAttempts });
    ws = retry.value;
    let result = false;
    if (retry.success && ws) {
      ws.addEventListener(`error`, onError);
      if (opts.onMessage) {
        ws.addEventListener(`message`, onMessage);
      }
      result = true;
      currentState = StateMachine_exports.to(currentState, `open`);
      if (opts.onConnected) opts.onConnected();
    } else {
      currentState = StateMachine_exports.to(currentState, `closed`);
    }
    return result;
  };
  const send = (data) => {
    if (ws) {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      } else {
        onDisconnected();
      }
    } else {
      throw new Error(`Not connected`);
    }
  };
  const onDisconnected = () => {
    if (currentState.value === `closed`) return;
    if (currentState.value === `open`) {
      currentState = StateMachine_exports.to(currentState, `closed`);
      if (opts.onDisconnected) opts.onDisconnected();
    }
    if (reconnect && currentState.value !== `connecting`) {
      console.log(`Scheduling connect`);
      setTimeout(() => {
        void connect();
      }, 100);
    }
  };
  const isConnected = () => {
    if (!ws) return false;
    return ws.readyState === ws.OPEN;
  };
  const close = () => {
    reconnect = false;
    currentState = StateMachine_exports.to(currentState, `closed`);
    ws?.close();
    if (opts.onDisconnected) opts.onDisconnected();
  };
  const open = () => {
    reconnect = true;
    if (currentState.value === `open`) return Promise.resolve(true);
    if (currentState.value === `connecting`) return Promise.resolve(false);
    return connect();
  };
  void connect();
  setInterval(() => {
    if (!ws) return;
    switch (ws.readyState) {
      case ws.CLOSED: {
        if (currentState.value === `open`) {
          onDisconnected();
        }
        break;
      }
    }
  }, checkStateMs);
  return { send, isConnected, close, open };
};

export {
  Codec,
  StringReceiveBuffer,
  StringWriteBuffer,
  genericStateTransitionsInstance,
  NordicBleDevice_exports,
  AudioVisualiser_exports,
  AudioAnalyser_exports,
  Serial_exports,
  Espruino_exports,
  Camera_exports,
  VideoFile_exports,
  FrameProcessor,
  reconnectingWebsocket,
  io_exports
};
//# sourceMappingURL=chunk-4LZW6ZKQ.js.map