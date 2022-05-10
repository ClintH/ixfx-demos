import {
  queueMutable
} from "./chunk-F667TMKX.js";
import {
  string
} from "./chunk-ZRXV45HR.js";
import {
  StateMachine
} from "./chunk-EVCJTLDY.js";
import {
  SimpleEventEmitter
} from "./chunk-DDV6VV3P.js";
import {
  continuously,
  retry,
  waitFor
} from "./chunk-DH3KCIEB.js";
import {
  indexOfCharCode,
  omitChars,
  splitByLength
} from "./chunk-5J6CFDHI.js";
import {
  __export,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/io/index.ts
var io_exports = {};
__export(io_exports, {
  Bluetooth: () => NordicBleDevice_exports,
  Camera: () => Camera_exports,
  Espruino: () => EspruinoDevice_exports
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
  }
  clear() {
    this.buffer = ``;
  }
  add(str) {
    if (str.length === 0)
      return;
    const pos = str.indexOf(this.separator);
    if (pos < 0) {
      this.buffer += str;
      return;
    }
    const part = str.substring(0, pos);
    try {
      this.onData(this.buffer + part);
    } catch (ex) {
      console.warn(ex);
    }
    this.buffer = ``;
    if (pos < str.length)
      return;
    this.add(str.substring(pos + 1));
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
    this.intervalMs = 10;
    this.queue = queueMutable();
    this.writer = continuously(() => this.onWrite(), this.intervalMs);
  }
  clear() {
    this.queue = queueMutable();
  }
  async onWrite() {
    if (this.queue.isEmpty) {
      console.debug(`WriteBuffer.onWrite: queue empty`);
      return false;
    }
    if (this.paused) {
      console.debug(`WriteBuffer.onWrite: paused...`);
      return true;
    }
    const s = this.queue.dequeue();
    if (s === void 0)
      return false;
    await this.onData(s);
    return true;
  }
  add(str) {
    if (this.chunkSize) {
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

// src/io/EspruinoDevice.ts
var EspruinoDevice_exports = {};
__export(EspruinoDevice_exports, {
  EspruinoDevice: () => EspruinoDevice,
  connect: () => connect,
  puck: () => puck
});
var EspruinoDevice = class extends NordicBleDevice {
  constructor(device, opts = {}) {
    super(device, opts);
    __publicField(this, "evalTimeoutMs");
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  async eval(code, opts = {}) {
    const timeoutMs = opts.timeoutMs ?? this.evalTimeoutMs;
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
              this.warn(`Expected reply ${id}, got ${dd.reply}`);
            }
          }
        } catch (ex) {
          if (assumeExclusive) {
            done(d.data);
          } else {
            this.warn(ex);
          }
        }
      };
      const onStateChange = (e) => {
        if (e.newState !== `connected`)
          done(`State changed to '${e.newState}', aborting`);
      };
      this.addEventListener(`data`, onData);
      this.addEventListener(`change`, onStateChange);
      const done = waitFor(timeoutMs, (reason) => {
        reject(reason);
      }, () => {
        this.removeEventListener(`data`, onData);
        this.removeEventListener(`change`, onStateChange);
      });
      this.write(`Bluetooth.println(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))
`);
    });
  }
};
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
  const d = new EspruinoDevice(device, { name, debug });
  await d.connect();
  return d;
};
var connect = async () => {
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
  const d = new EspruinoDevice(device, { name: `Espruino` });
  await d.connect();
  return d;
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
  NordicBleDevice_exports,
  EspruinoDevice_exports,
  Camera_exports,
  io_exports
};
//# sourceMappingURL=chunk-75UDL3AK.js.map