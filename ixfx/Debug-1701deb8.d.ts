type LogKind = 'info' | 'debug' | 'error' | 'warn';
type LogMsg = {
    readonly kind?: LogKind;
    readonly msg: any;
    readonly category?: string;
};
type LogFn = (msg: LogMsg | string) => void;
/**
 * Either a flag for default console logging, or a simple log function
 */
type LogOption = boolean | LogFn;
/**
 * Resolve a LogOption to a function
 * @param l
 * @returns
 */
declare const resolveLogOption: (l?: LogOption, defaults?: {
    readonly category?: string;
    readonly kind?: string;
}) => LogFn;
/**
 * Returns a bundled collection of {@link logger}s
 *
 * ```js
 * const con = logSet(`a`);
 * con.log(`Hello`);  // console.log(`a Hello`);
 * con.warn(`Uh-oh`); // console.warn(`a Uh-oh`);
 * con.error(`Eek!`); // console.error(`a Eek!`);
 * ```
 *
 * By default each prefix is assigned a colour. To use
 * another logic, provide the `colourKey` parameter.
 *
 * ```js
 * // Both set of loggers will use same colour
 * const con = logSet(`a`, true, `system`);
 * const con2 = logSet(`b`, true, `system`);
 * ```
 * @param prefix Prefix for log messages
 * @param verbose True by default. If false, log() messages are a no-op
 * @param colourKey If specified, log messages will be coloured by this key instead of prefix (default)
 * @returns
 */
declare const logSet: (prefix: string, verbose?: boolean, colourKey?: string) => {
    log: Logger;
    warn: Logger;
    error: Logger;
};
type Logger = (m: any) => void;
type LogSet = {
    readonly log: Logger;
    readonly warn: Logger;
    readonly error: Logger;
};
/**
 * Returns a console logging function which prefixes messages. This is
 * useful for tracing messages from different components. Each prefix
 * is assigned a colour, further helping to distinguish messages.
 *
 * Use {@link logSet} to get a bundled set.
 *
 * ```
 * // Initialise once
 * const log = logger(`a`);
 * const error = logger(`a`, `error`);
 * const warn = logger(`a`, `warn);
 *
 * // And then use
 * log(`Hello`);    // console.log(`a Hello`);
 * error(`Uh-oh`);  // console.error(`a Uh-oh`);
 * warn(`Eek!`);    // console.warn(`a Eeek!`);
 * ```
 *
 * Provide the `colourKey` parameter to make log messages
 * be coloured the same, even though the prefix is different.
 * ```js
 * // Both loggers will use the same colour because they
 * // share the colour key `system`
 * const log = logger(`a`,`log`,`system`);
 * const log2 = logger(`b`, `log`, `system`);
 * ```
 * @param prefix
 * @param kind
 * @param colourKey Optional key to colour log lines by instead of prefix
 * @returns
 */
declare const logger: (prefix: string, kind?: `log` | `warn` | `error`, colourKey?: string) => Logger;
declare const getErrorMessage: (ex: Error | unknown) => string;

type Debug_LogFn = LogFn;
type Debug_LogKind = LogKind;
type Debug_LogMsg = LogMsg;
type Debug_LogOption = LogOption;
type Debug_LogSet = LogSet;
type Debug_Logger = Logger;
declare const Debug_getErrorMessage: typeof getErrorMessage;
declare const Debug_logSet: typeof logSet;
declare const Debug_logger: typeof logger;
declare const Debug_resolveLogOption: typeof resolveLogOption;
declare namespace Debug {
  export {
    Debug_LogFn as LogFn,
    Debug_LogKind as LogKind,
    Debug_LogMsg as LogMsg,
    Debug_LogOption as LogOption,
    Debug_LogSet as LogSet,
    Debug_Logger as Logger,
    Debug_getErrorMessage as getErrorMessage,
    Debug_logSet as logSet,
    Debug_logger as logger,
    Debug_resolveLogOption as resolveLogOption,
  };
}

export { Debug as D, LogSet as L, LogOption as a };
