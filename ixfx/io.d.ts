import { S as SimpleEventEmitter } from './Events-d728150d';
import { a as StateMachine, b as StateChangeEvent } from './StateMachine-21422f69';
import { j as QueueMutable } from './Interfaces-1ec1aff0';
import { C as Continuously } from './Timer-1403e151';
import './util';

declare class Codec {
    enc: TextEncoder;
    dec: TextDecoder;
    toBuffer(str: string): Uint8Array;
    fromBuffer(buffer: ArrayBuffer): string;
}

declare class StringReceiveBuffer {
    private onData;
    private separator;
    buffer: string;
    constructor(onData: (data: string) => void, separator?: string);
    clear(): void;
    add(str: string): void;
}

declare class StringWriteBuffer {
    private onData;
    private chunkSize;
    paused: boolean;
    queue: QueueMutable<string>;
    writer: Continuously;
    intervalMs: number;
    constructor(onData: (data: string) => Promise<void>, chunkSize?: number);
    clear(): void;
    onWrite(): Promise<boolean>;
    add(str: string): void;
}

declare type Opts$1 = {
    readonly service: string;
    readonly rxGattCharacteristic: string;
    readonly txGattCharacteristic: string;
    readonly chunkSize: number;
    readonly name: string;
    readonly connectAttempts: number;
};
declare type DataEvent = {
    readonly data: string;
};
declare type Events = {
    readonly data: DataEvent;
    readonly change: StateChangeEvent;
};
declare class BleDevice extends SimpleEventEmitter<Events> {
    private device;
    private config;
    states: StateMachine;
    codec: Codec;
    rx: BluetoothRemoteGATTCharacteristic | undefined;
    tx: BluetoothRemoteGATTCharacteristic | undefined;
    gatt: BluetoothRemoteGATTServer | undefined;
    verboseLogging: boolean;
    rxBuffer: StringReceiveBuffer;
    txBuffer: StringWriteBuffer;
    constructor(device: BluetoothDevice, config: Opts$1);
    get isConnected(): boolean;
    get isClosed(): boolean;
    write(txt: string): void;
    private writeInternal;
    disconnect(): void;
    connect(): Promise<void>;
    onRx(evt: Event): void;
    protected verbose(m: string): void;
    protected log(m: string): void;
    protected warn(m: unknown): void;
}

declare const defaultOpts: {
    chunkSize: number;
    service: string;
    txGattCharacteristic: string;
    rxGattCharacteristic: string;
    name: string;
    connectAttempts: number;
};
declare type Opts = {
    readonly chunkSize?: number;
    readonly name?: string;
    readonly connectAttempts?: number;
};
declare class NordicBleDevice extends BleDevice {
    constructor(device: BluetoothDevice, opts?: Opts);
}

declare const NordicBleDevice$1_defaultOpts: typeof defaultOpts;
type NordicBleDevice$1_NordicBleDevice = NordicBleDevice;
declare const NordicBleDevice$1_NordicBleDevice: typeof NordicBleDevice;
declare namespace NordicBleDevice$1 {
  export {
    NordicBleDevice$1_defaultOpts as defaultOpts,
    NordicBleDevice$1_NordicBleDevice as NordicBleDevice,
  };
}

declare type Options = {
    readonly evalTimeoutMs?: number;
    readonly name?: string;
};
declare type EvalOpts = {
    readonly timeoutMs?: number;
    readonly assumeExclusive?: boolean;
};
/**
 * An Espruino BLE-connection
 *
 * Use the `puck` function to initialise and connect to a Puck.js.
 * It must be called in a UI event handler for browser security reasons.
 *
 * ```js
 * const e = await puck();
 * ```
 *
 * Listen for events:
 * ```js
 * // Received something
 * e.addEventLister(`data`, d => console.log(d.data));
 * // Monitor connection state
 * e.addEventListener(`change`, c => console.log(`${d.priorState} -> ${d.newState}`));
 * ```
 *
 * Write to the device (note the \n for a new line at the end of the string). This will
 * execute the code on the Espruino.
 *
 * ```js
 * e.write(`digitalPulse(LED1,1,[10,500,10,500,10]);\n`);
 * ```
 *
 * Run some code and return result:
 * ```js
 * const result = await e.eval(`2+2\n`);
 * ```
 */
declare class Espruino extends NordicBleDevice {
    evalTimeoutMs: number;
    /**
     * Creates instance. You probably would rather use {@link puck} to create.
     * @param device
     * @param opts
     */
    constructor(device: BluetoothDevice, opts?: Options);
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
     *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. False by default
     * @param code Code to run on the Espruino.
     * @param opts Options
     */
    eval(code: string, opts?: EvalOpts): Promise<string>;
}
/**
 * @inheritdoc Espruino
 * @returns
 */
declare const puck: () => Promise<Espruino>;
/**
 * @inheritdoc Espruino
 * @returns
 */
declare const connect: () => Promise<Espruino>;

type Espruino$1_Options = Options;
type Espruino$1_EvalOpts = EvalOpts;
declare const Espruino$1_puck: typeof puck;
declare const Espruino$1_connect: typeof connect;
declare namespace Espruino$1 {
  export {
    Espruino$1_Options as Options,
    Espruino$1_EvalOpts as EvalOpts,
    Espruino$1_puck as puck,
    Espruino$1_connect as connect,
  };
}

export { NordicBleDevice$1 as Bluetooth, Espruino$1 as Espruino };
