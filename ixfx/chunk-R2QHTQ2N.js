import {
  getOrGenerateSync
} from "./chunk-G6WH2AA6.js";

// src/debug/Logger.ts
var logger = (prefix, kind = `log`, colourKey) => (m) => {
  if (m === void 0) {
    m = `(undefined)`;
  } else if (typeof m === `object`) {
    m = JSON.stringify(m);
  }
  const colour = colourKey ?? prefix;
  switch (kind) {
    case `log`: {
      console.log(`%c${prefix} ${m}`, `color: ${logColours(colour)}`);
      break;
    }
    case `warn`: {
      console.warn(prefix, m);
      break;
    }
    case `error`: {
      console.error(prefix, m);
      break;
    }
  }
};
var logSet = (prefix, verbose = true, colourKey) => {
  if (verbose) {
    return {
      log: logger(prefix, `log`, colourKey),
      warn: logger(prefix, `warn`, colourKey),
      error: logger(prefix, `error`, colourKey)
    };
  }
  return {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (_) => {
    },
    warn: logger(prefix, `warn`, colourKey),
    error: logger(prefix, `error`, colourKey)
  };
};
var resolveLogOption = (l, defaults = {}) => {
  if (l === void 0 || typeof l === `boolean` && !l) {
    return (_) => {
    };
  }
  const defaultCat = defaults.category ?? ``;
  const defaultKind = defaults.kind ?? void 0;
  if (typeof l === `boolean`) {
    return (messageOrString) => {
      const m = typeof messageOrString === `string` ? { msg: messageOrString } : messageOrString;
      const kind = m.kind ?? defaultKind;
      const category = m.category ?? defaultCat;
      let message = m.msg;
      if (category) message = `[${category}] ${message}`;
      switch (kind) {
        case `error`: {
          console.error(message);
          break;
        }
        case `warn`: {
          console.warn(message);
          break;
        }
        case `info`: {
          console.info(message);
          break;
        }
        default: {
          console.log(message);
        }
      }
    };
  }
  return l;
};
var logColourCount = 0;
var logColours = getOrGenerateSync(/* @__PURE__ */ new Map(), () => {
  const hue = ++logColourCount * 137.508;
  return `hsl(${hue},50%,75%)`;
});

export {
  logger,
  logSet,
  resolveLogOption,
  logColours
};
//# sourceMappingURL=chunk-R2QHTQ2N.js.map