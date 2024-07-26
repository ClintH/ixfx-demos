import { L as LogKind, a as LogMessage, b as LogSet, M as MessageLogger } from './Types-CF8sZZ-9.js';
import { L as LogOption, l as logColours, a as logSet, b as logger, r as resolveLogOption } from './Logger-D5sMnenM.js';

declare const getErrorMessage: (ex: unknown) => string;

declare const fpsCounter: (autoDisplay?: boolean, computeAfterFrames?: number) => () => number;

declare const index_LogKind: typeof LogKind;
declare const index_LogMessage: typeof LogMessage;
declare const index_LogOption: typeof LogOption;
declare const index_LogSet: typeof LogSet;
declare const index_MessageLogger: typeof MessageLogger;
declare const index_fpsCounter: typeof fpsCounter;
declare const index_getErrorMessage: typeof getErrorMessage;
declare const index_logColours: typeof logColours;
declare const index_logSet: typeof logSet;
declare const index_logger: typeof logger;
declare const index_resolveLogOption: typeof resolveLogOption;
declare namespace index {
  export { index_LogKind as LogKind, index_LogMessage as LogMessage, index_LogOption as LogOption, index_LogSet as LogSet, index_MessageLogger as MessageLogger, index_fpsCounter as fpsCounter, index_getErrorMessage as getErrorMessage, index_logColours as logColours, index_logSet as logSet, index_logger as logger, index_resolveLogOption as resolveLogOption };
}

export { fpsCounter as f, getErrorMessage as g, index as i };
