type LogSet = {
    readonly log: MessageLogger;
    readonly warn: MessageLogger;
    readonly error: MessageLogger;
};
type MessageLogger = (message: LogMessage | string) => void;
type LogKind = `info` | `debug` | `error` | `warn`;
type LogMessage = {
    readonly kind?: LogKind;
    readonly msg: any;
    readonly category?: string;
};

export type { LogKind as L, MessageLogger as M, LogMessage as a, LogSet as b };
