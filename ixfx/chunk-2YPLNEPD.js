import {
  Set_exports,
  setMutable
} from "./chunk-ZPOLPYF5.js";
import {
  IterableAsync_exports,
  pingPong,
  pingPongPercent
} from "./chunk-FR25YNY2.js";
import {
  clamp,
  clampIndex,
  continuously,
  frequencyTimer,
  msElapsedTimer,
  relativeTimer,
  repeat,
  ticksElapsedTimer,
  waitFor
} from "./chunk-BAXIADUG.js";
import {
  StateMachine
} from "./chunk-DXG5CRMI.js";
import {
  delayLoop,
  sleep
} from "./chunk-LCTS33YV.js";
import {
  array,
  integer,
  number,
  percent
} from "./chunk-DEXQDIBZ.js";
import {
  SimpleEventEmitter,
  simpleMapArrayMutable
} from "./chunk-OVCUSACM.js";
import {
  __commonJS,
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toESM
} from "./chunk-FU5PERHQ.js";

// node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/fp-ts/lib/function.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
    var getBooleanAlgebra = function(B2) {
      return function() {
        return {
          meet: function(x, y) {
            return function(a) {
              return B2.meet(x(a), y(a));
            };
          },
          join: function(x, y) {
            return function(a) {
              return B2.join(x(a), y(a));
            };
          },
          zero: function() {
            return B2.zero;
          },
          one: function() {
            return B2.one;
          },
          implies: function(x, y) {
            return function(a) {
              return B2.implies(x(a), y(a));
            };
          },
          not: function(x) {
            return function(a) {
              return B2.not(x(a));
            };
          }
        };
      };
    };
    exports.getBooleanAlgebra = getBooleanAlgebra;
    var getSemigroup = function(S2) {
      return function() {
        return {
          concat: function(f, g) {
            return function(a) {
              return S2.concat(f(a), g(a));
            };
          }
        };
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function(M) {
      var getSemigroupM = (0, exports.getSemigroup)(M);
      return function() {
        return {
          concat: getSemigroupM().concat,
          empty: function() {
            return M.empty;
          }
        };
      };
    };
    exports.getMonoid = getMonoid;
    var getSemiring = function(S2) {
      return {
        add: function(f, g) {
          return function(x) {
            return S2.add(f(x), g(x));
          };
        },
        zero: function() {
          return S2.zero;
        },
        mul: function(f, g) {
          return function(x) {
            return S2.mul(f(x), g(x));
          };
        },
        one: function() {
          return S2.one;
        }
      };
    };
    exports.getSemiring = getSemiring;
    var getRing = function(R) {
      var S2 = (0, exports.getSemiring)(R);
      return {
        add: S2.add,
        mul: S2.mul,
        one: S2.one,
        zero: S2.zero,
        sub: function(f, g) {
          return function(x) {
            return R.sub(f(x), g(x));
          };
        }
      };
    };
    exports.getRing = getRing;
    var apply5 = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports.apply = apply5;
    function identity2(a) {
      return a;
    }
    exports.identity = identity2;
    exports.unsafeCoerce = identity2;
    function constant(a) {
      return function() {
        return a;
      };
    }
    exports.constant = constant;
    exports.constTrue = constant(true);
    exports.constFalse = constant(false);
    exports.constNull = constant(null);
    exports.constUndefined = constant(void 0);
    exports.constVoid = exports.constUndefined;
    function flip2(f) {
      return function(b, a) {
        return f(a, b);
      };
    }
    exports.flip = flip2;
    function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
        case 1:
          return ab;
        case 2:
          return function() {
            return bc(ab.apply(this, arguments));
          };
        case 3:
          return function() {
            return cd(bc(ab.apply(this, arguments)));
          };
        case 4:
          return function() {
            return de(cd(bc(ab.apply(this, arguments))));
          };
        case 5:
          return function() {
            return ef(de(cd(bc(ab.apply(this, arguments)))));
          };
        case 6:
          return function() {
            return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
          };
        case 7:
          return function() {
            return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
          };
        case 8:
          return function() {
            return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
          };
        case 9:
          return function() {
            return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
          };
      }
      return;
    }
    exports.flow = flow;
    function tuple() {
      var t4 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t4[_i] = arguments[_i];
      }
      return t4;
    }
    exports.tuple = tuple;
    function increment(n) {
      return n + 1;
    }
    exports.increment = increment;
    function decrement(n) {
      return n - 1;
    }
    exports.decrement = decrement;
    function absurd(_) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    exports.absurd = absurd;
    function tupled(f) {
      return function(a) {
        return f.apply(void 0, a);
      };
    }
    exports.tupled = tupled;
    function untupled(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return f(a);
      };
    }
    exports.untupled = untupled;
    function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi) {
      switch (arguments.length) {
        case 1:
          return a;
        case 2:
          return ab(a);
        case 3:
          return bc(ab(a));
        case 4:
          return cd(bc(ab(a)));
        case 5:
          return de(cd(bc(ab(a))));
        case 6:
          return ef(de(cd(bc(ab(a)))));
        case 7:
          return fg(ef(de(cd(bc(ab(a))))));
        case 8:
          return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
          return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default: {
          var ret = arguments[0];
          for (var i = 1; i < arguments.length; i++) {
            ret = arguments[i](ret);
          }
          return ret;
        }
      }
    }
    exports.pipe = pipe2;
    exports.hole = absurd;
    var SK = function(_, b) {
      return b;
    };
    exports.SK = SK;
    function not(predicate) {
      return function(a) {
        return !predicate(a);
      };
    }
    exports.not = not;
    var getEndomorphismMonoid = function() {
      return {
        concat: function(first, second) {
          return flow(first, second);
        },
        empty: identity2
      };
    };
    exports.getEndomorphismMonoid = getEndomorphismMonoid;
  }
});

// node_modules/fp-ts/lib/internal.js
var require_internal = __commonJS({
  "node_modules/fp-ts/lib/internal.js"(exports) {
    "use strict";
    var __spreadArray2 = exports && exports.__spreadArray || function(to, from2, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from2.length, ar; i < l; i++) {
          if (ar || !(i in from2)) {
            if (!ar)
              ar = Array.prototype.slice.call(from2, 0, i);
            ar[i] = from2[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from2));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
    var isNone = function(fa) {
      return fa._tag === "None";
    };
    exports.isNone = isNone;
    var isSome = function(fa) {
      return fa._tag === "Some";
    };
    exports.isSome = isSome;
    exports.none = { _tag: "None" };
    var some = function(a) {
      return { _tag: "Some", value: a };
    };
    exports.some = some;
    var isLeft = function(ma) {
      return ma._tag === "Left";
    };
    exports.isLeft = isLeft;
    var isRight = function(ma) {
      return ma._tag === "Right";
    };
    exports.isRight = isRight;
    var left = function(e) {
      return { _tag: "Left", left: e };
    };
    exports.left = left;
    var right = function(a) {
      return { _tag: "Right", right: a };
    };
    exports.right = right;
    var singleton = function(a) {
      return [a];
    };
    exports.singleton = singleton;
    var isNonEmpty = function(as) {
      return as.length > 0;
    };
    exports.isNonEmpty = isNonEmpty;
    var head = function(as) {
      return as[0];
    };
    exports.head = head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports.tail = tail;
    exports.emptyReadonlyArray = [];
    exports.emptyRecord = {};
    exports.has = Object.prototype.hasOwnProperty;
    var fromReadonlyNonEmptyArray = function(as) {
      return __spreadArray2([as[0]], as.slice(1), true);
    };
    exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
  }
});

// node_modules/fp-ts/lib/Apply.js
var require_Apply = __commonJS({
  "node_modules/fp-ts/lib/Apply.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
    var function_1 = require_function();
    var _ = __importStar2(require_internal());
    function ap(F, G) {
      return function(fa) {
        return function(fab) {
          return F.ap(F.map(fab, function(gab) {
            return function(ga) {
              return G.ap(gab, ga);
            };
          }), fa);
        };
      };
    }
    exports.ap = ap;
    function apFirst(A2) {
      return function(second) {
        return function(first) {
          return A2.ap(A2.map(first, function(a) {
            return function() {
              return a;
            };
          }), second);
        };
      };
    }
    exports.apFirst = apFirst;
    function apSecond(A2) {
      return function(second) {
        return function(first) {
          return A2.ap(A2.map(first, function() {
            return function(b) {
              return b;
            };
          }), second);
        };
      };
    }
    exports.apSecond = apSecond;
    function apS(F) {
      return function(name, fb) {
        return function(fa) {
          return F.ap(F.map(fa, function(a) {
            return function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            };
          }), fb);
        };
      };
    }
    exports.apS = apS;
    function getApplySemigroup(F) {
      return function(S2) {
        return {
          concat: function(first, second) {
            return F.ap(F.map(first, function(x) {
              return function(y) {
                return S2.concat(x, y);
              };
            }), second);
          }
        };
      };
    }
    exports.getApplySemigroup = getApplySemigroup;
    function curried(f, n, acc) {
      return function(x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
          combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
      };
    }
    var tupleConstructors = {
      1: function(a) {
        return [a];
      },
      2: function(a) {
        return function(b) {
          return [a, b];
        };
      },
      3: function(a) {
        return function(b) {
          return function(c) {
            return [a, b, c];
          };
        };
      },
      4: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return [a, b, c, d];
            };
          };
        };
      },
      5: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return function(e) {
                return [a, b, c, d, e];
              };
            };
          };
        };
      }
    };
    function getTupleConstructor(len) {
      if (!_.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
      }
      return tupleConstructors[len];
    }
    function sequenceT(F) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
          fas = F.ap(fas, args[i]);
        }
        return fas;
      };
    }
    exports.sequenceT = sequenceT;
    function getRecordConstructor(keys) {
      var len = keys.length;
      switch (len) {
        case 1:
          return function(a) {
            var _a;
            return _a = {}, _a[keys[0]] = a, _a;
          };
        case 2:
          return function(a) {
            return function(b) {
              var _a;
              return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a;
            };
          };
        case 3:
          return function(a) {
            return function(b) {
              return function(c) {
                var _a;
                return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a;
              };
            };
          };
        case 4:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  var _a;
                  return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a;
                };
              };
            };
          };
        case 5:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  return function(e) {
                    var _a;
                    return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a[keys[4]] = e, _a;
                  };
                };
              };
            };
          };
        default:
          return curried(function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var r = {};
            for (var i = 0; i < len; i++) {
              r[keys[i]] = args[i];
            }
            return r;
          }, len - 1, []);
      }
    }
    function sequenceS(F) {
      return function(r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
          fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
      };
    }
    exports.sequenceS = sequenceS;
  }
});

// node_modules/fp-ts/lib/Chain.js
var require_Chain = __commonJS({
  "node_modules/fp-ts/lib/Chain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bind = exports.chainFirst = void 0;
    function chainFirst(M) {
      return function(f) {
        return function(first) {
          return M.chain(first, function(a) {
            return M.map(f(a), function() {
              return a;
            });
          });
        };
      };
    }
    exports.chainFirst = chainFirst;
    function bind2(M) {
      return function(name, f) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return M.map(f(a), function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            });
          });
        };
      };
    }
    exports.bind = bind2;
  }
});

// node_modules/fp-ts/lib/FromEither.js
var require_FromEither = __commonJS({
  "node_modules/fp-ts/lib/FromEither.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterOrElse = exports.chainFirstEitherK = exports.chainEitherK = exports.fromEitherK = exports.chainOptionK = exports.fromOptionK = exports.fromPredicate = exports.fromOption = void 0;
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    var _ = __importStar2(require_internal());
    function fromOption(F) {
      return function(onNone) {
        return function(ma) {
          return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value));
        };
      };
    }
    exports.fromOption = fromOption;
    function fromPredicate(F) {
      return function(predicate, onFalse) {
        return function(a) {
          return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
      };
    }
    exports.fromPredicate = fromPredicate;
    function fromOptionK(F) {
      var fromOptionF = fromOption(F);
      return function(onNone) {
        var from2 = fromOptionF(onNone);
        return function(f) {
          return (0, function_1.flow)(f, from2);
        };
      };
    }
    exports.fromOptionK = fromOptionK;
    function chainOptionK(F, M) {
      var fromOptionKF = fromOptionK(F);
      return function(onNone) {
        var from2 = fromOptionKF(onNone);
        return function(f) {
          return function(ma) {
            return M.chain(ma, from2(f));
          };
        };
      };
    }
    exports.chainOptionK = chainOptionK;
    function fromEitherK(F) {
      return function(f) {
        return (0, function_1.flow)(f, F.fromEither);
      };
    }
    exports.fromEitherK = fromEitherK;
    function chainEitherK(F, M) {
      var fromEitherKF = fromEitherK(F);
      return function(f) {
        return function(ma) {
          return M.chain(ma, fromEitherKF(f));
        };
      };
    }
    exports.chainEitherK = chainEitherK;
    function chainFirstEitherK(F, M) {
      return (0, function_1.flow)(fromEitherK(F), (0, Chain_1.chainFirst)(M));
    }
    exports.chainFirstEitherK = chainFirstEitherK;
    function filterOrElse(F, M) {
      return function(predicate, onFalse) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
          });
        };
      };
    }
    exports.filterOrElse = filterOrElse;
  }
});

// node_modules/fp-ts/lib/Functor.js
var require_Functor = __commonJS({
  "node_modules/fp-ts/lib/Functor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFunctorComposition = exports.bindTo = exports.flap = exports.map = void 0;
    var function_1 = require_function();
    function map3(F, G) {
      return function(f) {
        return function(fa) {
          return F.map(fa, function(ga) {
            return G.map(ga, f);
          });
        };
      };
    }
    exports.map = map3;
    function flap(F) {
      return function(a) {
        return function(fab) {
          return F.map(fab, function(f) {
            return f(a);
          });
        };
      };
    }
    exports.flap = flap;
    function bindTo(F) {
      return function(name) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return _a = {}, _a[name] = a, _a;
          });
        };
      };
    }
    exports.bindTo = bindTo;
    function getFunctorComposition(F, G) {
      var _map2 = map3(F, G);
      return {
        map: function(fga, f) {
          return (0, function_1.pipe)(fga, _map2(f));
        }
      };
    }
    exports.getFunctorComposition = getFunctorComposition;
  }
});

// node_modules/fp-ts/lib/Eq.js
var require_Eq = __commonJS({
  "node_modules/fp-ts/lib/Eq.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.eqDate = exports.eqNumber = exports.eqString = exports.eqBoolean = exports.eq = exports.strictEqual = exports.getStructEq = exports.getTupleEq = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.eqStrict = exports.URI = exports.contramap = exports.tuple = exports.struct = exports.fromEquals = void 0;
    var function_1 = require_function();
    var fromEquals = function(equals) {
      return {
        equals: function(x, y) {
          return x === y || equals(x, y);
        }
      };
    };
    exports.fromEquals = fromEquals;
    var struct = function(eqs) {
      return (0, exports.fromEquals)(function(first, second) {
        for (var key in eqs) {
          if (!eqs[key].equals(first[key], second[key])) {
            return false;
          }
        }
        return true;
      });
    };
    exports.struct = struct;
    var tuple = function() {
      var eqs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
      }
      return (0, exports.fromEquals)(function(first, second) {
        return eqs.every(function(E2, i) {
          return E2.equals(first[i], second[i]);
        });
      });
    };
    exports.tuple = tuple;
    var contramap_ = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.contramap)(f));
    };
    var contramap2 = function(f) {
      return function(fa) {
        return (0, exports.fromEquals)(function(x, y) {
          return fa.equals(f(x), f(y));
        });
      };
    };
    exports.contramap = contramap2;
    exports.URI = "Eq";
    exports.eqStrict = {
      equals: function(a, b) {
        return a === b;
      }
    };
    var empty2 = {
      equals: function() {
        return true;
      }
    };
    var getSemigroup = function() {
      return {
        concat: function(x, y) {
          return (0, exports.fromEquals)(function(a, b) {
            return x.equals(a, b) && y.equals(a, b);
          });
        }
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function() {
      return {
        concat: (0, exports.getSemigroup)().concat,
        empty: empty2
      };
    };
    exports.getMonoid = getMonoid;
    exports.Contravariant = {
      URI: exports.URI,
      contramap: contramap_
    };
    exports.getTupleEq = exports.tuple;
    exports.getStructEq = exports.struct;
    exports.strictEqual = exports.eqStrict.equals;
    exports.eq = exports.Contravariant;
    exports.eqBoolean = exports.eqStrict;
    exports.eqString = exports.eqStrict;
    exports.eqNumber = exports.eqStrict;
    exports.eqDate = {
      equals: function(first, second) {
        return first.valueOf() === second.valueOf();
      }
    };
  }
});

// node_modules/fp-ts/lib/Ord.js
var require_Ord = __commonJS({
  "node_modules/fp-ts/lib/Ord.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ordDate = exports.ordNumber = exports.ordString = exports.ordBoolean = exports.ord = exports.getDualOrd = exports.getTupleOrd = exports.between = exports.clamp = exports.max = exports.min = exports.geq = exports.leq = exports.gt = exports.lt = exports.equals = exports.trivial = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.URI = exports.contramap = exports.reverse = exports.tuple = exports.fromCompare = exports.equalsDefault = void 0;
    var Eq_1 = require_Eq();
    var function_1 = require_function();
    var equalsDefault = function(compare3) {
      return function(first, second) {
        return first === second || compare3(first, second) === 0;
      };
    };
    exports.equalsDefault = equalsDefault;
    var fromCompare = function(compare3) {
      return {
        equals: (0, exports.equalsDefault)(compare3),
        compare: function(first, second) {
          return first === second ? 0 : compare3(first, second);
        }
      };
    };
    exports.fromCompare = fromCompare;
    var tuple = function() {
      var ords = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
      }
      return (0, exports.fromCompare)(function(first, second) {
        var i = 0;
        for (; i < ords.length - 1; i++) {
          var r = ords[i].compare(first[i], second[i]);
          if (r !== 0) {
            return r;
          }
        }
        return ords[i].compare(first[i], second[i]);
      });
    };
    exports.tuple = tuple;
    var reverse = function(O) {
      return (0, exports.fromCompare)(function(first, second) {
        return O.compare(second, first);
      });
    };
    exports.reverse = reverse;
    var contramap_ = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.contramap)(f));
    };
    var contramap2 = function(f) {
      return function(fa) {
        return (0, exports.fromCompare)(function(first, second) {
          return fa.compare(f(first), f(second));
        });
      };
    };
    exports.contramap = contramap2;
    exports.URI = "Ord";
    var getSemigroup = function() {
      return {
        concat: function(first, second) {
          return (0, exports.fromCompare)(function(a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
          });
        }
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function() {
      return {
        concat: (0, exports.getSemigroup)().concat,
        empty: (0, exports.fromCompare)(function() {
          return 0;
        })
      };
    };
    exports.getMonoid = getMonoid;
    exports.Contravariant = {
      URI: exports.URI,
      contramap: contramap_
    };
    exports.trivial = {
      equals: function_1.constTrue,
      compare: /* @__PURE__ */ (0, function_1.constant)(0)
    };
    var equals = function(O) {
      return function(second) {
        return function(first) {
          return first === second || O.compare(first, second) === 0;
        };
      };
    };
    exports.equals = equals;
    var lt = function(O) {
      return function(first, second) {
        return O.compare(first, second) === -1;
      };
    };
    exports.lt = lt;
    var gt = function(O) {
      return function(first, second) {
        return O.compare(first, second) === 1;
      };
    };
    exports.gt = gt;
    var leq = function(O) {
      return function(first, second) {
        return O.compare(first, second) !== 1;
      };
    };
    exports.leq = leq;
    var geq = function(O) {
      return function(first, second) {
        return O.compare(first, second) !== -1;
      };
    };
    exports.geq = geq;
    var min4 = function(O) {
      return function(first, second) {
        return first === second || O.compare(first, second) < 1 ? first : second;
      };
    };
    exports.min = min4;
    var max4 = function(O) {
      return function(first, second) {
        return first === second || O.compare(first, second) > -1 ? first : second;
      };
    };
    exports.max = max4;
    var clamp3 = function(O) {
      var minO = (0, exports.min)(O);
      var maxO = (0, exports.max)(O);
      return function(low, hi) {
        return function(a) {
          return maxO(minO(a, hi), low);
        };
      };
    };
    exports.clamp = clamp3;
    var between2 = function(O) {
      var ltO = (0, exports.lt)(O);
      var gtO = (0, exports.gt)(O);
      return function(low, hi) {
        return function(a) {
          return ltO(a, low) || gtO(a, hi) ? false : true;
        };
      };
    };
    exports.between = between2;
    exports.getTupleOrd = exports.tuple;
    exports.getDualOrd = exports.reverse;
    exports.ord = exports.Contravariant;
    function compare2(first, second) {
      return first < second ? -1 : first > second ? 1 : 0;
    }
    var strictOrd = {
      equals: Eq_1.eqStrict.equals,
      compare: compare2
    };
    exports.ordBoolean = strictOrd;
    exports.ordString = strictOrd;
    exports.ordNumber = strictOrd;
    exports.ordDate = (0, function_1.pipe)(
      exports.ordNumber,
      /* @__PURE__ */ (0, exports.contramap)(function(date) {
        return date.valueOf();
      })
    );
  }
});

// node_modules/fp-ts/lib/Magma.js
var require_Magma = __commonJS({
  "node_modules/fp-ts/lib/Magma.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.concatAll = exports.endo = exports.filterSecond = exports.filterFirst = exports.reverse = void 0;
    var reverse = function(M) {
      return {
        concat: function(first, second) {
          return M.concat(second, first);
        }
      };
    };
    exports.reverse = reverse;
    var filterFirst = function(predicate) {
      return function(M) {
        return {
          concat: function(first, second) {
            return predicate(first) ? M.concat(first, second) : second;
          }
        };
      };
    };
    exports.filterFirst = filterFirst;
    var filterSecond = function(predicate) {
      return function(M) {
        return {
          concat: function(first, second) {
            return predicate(second) ? M.concat(first, second) : first;
          }
        };
      };
    };
    exports.filterSecond = filterSecond;
    var endo = function(f) {
      return function(M) {
        return {
          concat: function(first, second) {
            return M.concat(f(first), f(second));
          }
        };
      };
    };
    exports.endo = endo;
    var concatAll = function(M) {
      return function(startWith) {
        return function(as) {
          return as.reduce(function(a, acc) {
            return M.concat(a, acc);
          }, startWith);
        };
      };
    };
    exports.concatAll = concatAll;
  }
});

// node_modules/fp-ts/lib/Semigroup.js
var require_Semigroup = __commonJS({
  "node_modules/fp-ts/lib/Semigroup.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.semigroupProduct = exports.semigroupSum = exports.semigroupString = exports.getFunctionSemigroup = exports.semigroupAny = exports.semigroupAll = exports.fold = exports.getIntercalateSemigroup = exports.getMeetSemigroup = exports.getJoinSemigroup = exports.getDualSemigroup = exports.getStructSemigroup = exports.getTupleSemigroup = exports.getFirstSemigroup = exports.getLastSemigroup = exports.getObjectSemigroup = exports.semigroupVoid = exports.concatAll = exports.last = exports.first = exports.intercalate = exports.tuple = exports.struct = exports.reverse = exports.constant = exports.max = exports.min = void 0;
    var function_1 = require_function();
    var _ = __importStar2(require_internal());
    var M = __importStar2(require_Magma());
    var Or = __importStar2(require_Ord());
    var min4 = function(O) {
      return {
        concat: Or.min(O)
      };
    };
    exports.min = min4;
    var max4 = function(O) {
      return {
        concat: Or.max(O)
      };
    };
    exports.max = max4;
    var constant = function(a) {
      return {
        concat: function() {
          return a;
        }
      };
    };
    exports.constant = constant;
    exports.reverse = M.reverse;
    var struct = function(semigroups) {
      return {
        concat: function(first2, second) {
          var r = {};
          for (var k in semigroups) {
            if (_.has.call(semigroups, k)) {
              r[k] = semigroups[k].concat(first2[k], second[k]);
            }
          }
          return r;
        }
      };
    };
    exports.struct = struct;
    var tuple = function() {
      var semigroups = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
      }
      return {
        concat: function(first2, second) {
          return semigroups.map(function(s, i) {
            return s.concat(first2[i], second[i]);
          });
        }
      };
    };
    exports.tuple = tuple;
    var intercalate = function(middle) {
      return function(S2) {
        return {
          concat: function(x, y) {
            return S2.concat(x, S2.concat(middle, y));
          }
        };
      };
    };
    exports.intercalate = intercalate;
    var first = function() {
      return { concat: function_1.identity };
    };
    exports.first = first;
    var last = function() {
      return { concat: function(_2, y) {
        return y;
      } };
    };
    exports.last = last;
    exports.concatAll = M.concatAll;
    exports.semigroupVoid = (0, exports.constant)(void 0);
    var getObjectSemigroup = function() {
      return {
        concat: function(first2, second) {
          return Object.assign({}, first2, second);
        }
      };
    };
    exports.getObjectSemigroup = getObjectSemigroup;
    exports.getLastSemigroup = exports.last;
    exports.getFirstSemigroup = exports.first;
    exports.getTupleSemigroup = exports.tuple;
    exports.getStructSemigroup = exports.struct;
    exports.getDualSemigroup = exports.reverse;
    exports.getJoinSemigroup = exports.max;
    exports.getMeetSemigroup = exports.min;
    exports.getIntercalateSemigroup = exports.intercalate;
    function fold(S2) {
      var concatAllS = (0, exports.concatAll)(S2);
      return function(startWith, as) {
        return as === void 0 ? concatAllS(startWith) : concatAllS(startWith)(as);
      };
    }
    exports.fold = fold;
    exports.semigroupAll = {
      concat: function(x, y) {
        return x && y;
      }
    };
    exports.semigroupAny = {
      concat: function(x, y) {
        return x || y;
      }
    };
    exports.getFunctionSemigroup = function_1.getSemigroup;
    exports.semigroupString = {
      concat: function(x, y) {
        return x + y;
      }
    };
    exports.semigroupSum = {
      concat: function(x, y) {
        return x + y;
      }
    };
    exports.semigroupProduct = {
      concat: function(x, y) {
        return x * y;
      }
    };
  }
});

// node_modules/fp-ts/lib/ReadonlyNonEmptyArray.js
var require_ReadonlyNonEmptyArray = __commonJS({
  "node_modules/fp-ts/lib/ReadonlyNonEmptyArray.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray2 = exports && exports.__spreadArray || function(to, from2, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from2.length, ar; i < l; i++) {
          if (ar || !(i in from2)) {
            if (!ar)
              ar = Array.prototype.slice.call(from2, 0, i);
            ar[i] = from2[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from2));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reduceRight = exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chain = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
    exports.filterWithIndex = exports.filter = exports.groupSort = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = void 0;
    exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var Eq_1 = require_Eq();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar2(require_internal());
    var Ord_1 = require_Ord();
    var Se = __importStar2(require_Semigroup());
    exports.empty = _.emptyReadonlyArray;
    exports.isNonEmpty = _.isNonEmpty;
    var isOutOfBound = function(i, as) {
      return i < 0 || i >= as.length;
    };
    exports.isOutOfBound = isOutOfBound;
    var prependW = function(head) {
      return function(tail) {
        return __spreadArray2([head], tail, true);
      };
    };
    exports.prependW = prependW;
    exports.prepend = exports.prependW;
    var appendW = function(end) {
      return function(init3) {
        return __spreadArray2(__spreadArray2([], init3, true), [end], false);
      };
    };
    exports.appendW = appendW;
    exports.append = exports.appendW;
    var unsafeInsertAt = function(i, a, as) {
      if ((0, exports.isNonEmpty)(as)) {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
      }
      return [a];
    };
    exports.unsafeInsertAt = unsafeInsertAt;
    var unsafeUpdateAt = function(i, a, as) {
      if (as[i] === a) {
        return as;
      } else {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
      }
    };
    exports.unsafeUpdateAt = unsafeUpdateAt;
    var uniq = function(E2) {
      return function(as) {
        if (as.length === 1) {
          return as;
        }
        var out = [(0, exports.head)(as)];
        var rest = (0, exports.tail)(as);
        var _loop_1 = function(a2) {
          if (out.every(function(o) {
            return !E2.equals(o, a2);
          })) {
            out.push(a2);
          }
        };
        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
          var a = rest_1[_i];
          _loop_1(a);
        }
        return out;
      };
    };
    exports.uniq = uniq;
    var sortBy = function(ords) {
      if ((0, exports.isNonEmpty)(ords)) {
        var M = (0, Ord_1.getMonoid)();
        return (0, exports.sort)(ords.reduce(M.concat, M.empty));
      }
      return function_1.identity;
    };
    exports.sortBy = sortBy;
    var union = function(E2) {
      var uniqE = (0, exports.uniq)(E2);
      return function(second) {
        return function(first) {
          return uniqE((0, function_1.pipe)(first, concat(second)));
        };
      };
    };
    exports.union = union;
    var rotate5 = function(n) {
      return function(as) {
        var len = as.length;
        var m = Math.round(n) % len;
        if ((0, exports.isOutOfBound)(Math.abs(m), as) || m === 0) {
          return as;
        }
        if (m < 0) {
          var _a = (0, exports.splitAt)(-m)(as), f = _a[0], s = _a[1];
          return (0, function_1.pipe)(s, concat(f));
        } else {
          return (0, exports.rotate)(m - len)(as);
        }
      };
    };
    exports.rotate = rotate5;
    var fromReadonlyArray = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(as) : _.none;
    };
    exports.fromReadonlyArray = fromReadonlyArray;
    var makeBy = function(f) {
      return function(n) {
        var j = Math.max(0, Math.floor(n));
        var out = [f(0)];
        for (var i = 1; i < j; i++) {
          out.push(f(i));
        }
        return out;
      };
    };
    exports.makeBy = makeBy;
    var replicate = function(a) {
      return (0, exports.makeBy)(function() {
        return a;
      });
    };
    exports.replicate = replicate;
    var range = function(start3, end) {
      return start3 <= end ? (0, exports.makeBy)(function(i) {
        return start3 + i;
      })(end - start3 + 1) : [start3];
    };
    exports.range = range;
    var unprepend = function(as) {
      return [(0, exports.head)(as), (0, exports.tail)(as)];
    };
    exports.unprepend = unprepend;
    var unappend = function(as) {
      return [(0, exports.init)(as), (0, exports.last)(as)];
    };
    exports.unappend = unappend;
    var fromArray = function(as) {
      return (0, exports.fromReadonlyArray)(as.slice());
    };
    exports.fromArray = fromArray;
    function concatW(second) {
      return function(first) {
        return first.concat(second);
      };
    }
    exports.concatW = concatW;
    function concat(x, y) {
      return y ? x.concat(y) : function(y2) {
        return y2.concat(x);
      };
    }
    exports.concat = concat;
    var reverse = function(as) {
      return as.length === 1 ? as : __spreadArray2([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
    };
    exports.reverse = reverse;
    function group2(E2) {
      return function(as) {
        var len = as.length;
        if (len === 0) {
          return exports.empty;
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
          var a = as[i];
          if (E2.equals(a, head)) {
            nea.push(a);
          } else {
            out.push(nea);
            head = a;
            nea = [head];
          }
        }
        out.push(nea);
        return out;
      };
    }
    exports.group = group2;
    var groupBy2 = function(f) {
      return function(as) {
        var out = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
          var a = as_1[_i];
          var k = f(a);
          if (_.has.call(out, k)) {
            out[k].push(a);
          } else {
            out[k] = [a];
          }
        }
        return out;
      };
    };
    exports.groupBy = groupBy2;
    var sort2 = function(O) {
      return function(as) {
        return as.length === 1 ? as : as.slice().sort(O.compare);
      };
    };
    exports.sort = sort2;
    var updateAt = function(i, a) {
      return (0, exports.modifyAt)(i, function() {
        return a;
      });
    };
    exports.updateAt = updateAt;
    var modifyAt = function(i, f) {
      return function(as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
      };
    };
    exports.modifyAt = modifyAt;
    var zipWith = function(as, bs, f) {
      var cs = [f(as[0], bs[0])];
      var len = Math.min(as.length, bs.length);
      for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
      }
      return cs;
    };
    exports.zipWith = zipWith;
    function zip2(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip2(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip2;
    var unzip = function(abs4) {
      var fa = [abs4[0][0]];
      var fb = [abs4[0][1]];
      for (var i = 1; i < abs4.length; i++) {
        fa[i] = abs4[i][0];
        fb[i] = abs4[i][1];
      }
      return [fa, fb];
    };
    exports.unzip = unzip;
    var prependAll = function(middle) {
      return function(as) {
        var out = [middle, as[0]];
        for (var i = 1; i < as.length; i++) {
          out.push(middle, as[i]);
        }
        return out;
      };
    };
    exports.prependAll = prependAll;
    var intersperse = function(middle) {
      return function(as) {
        var rest = (0, exports.tail)(as);
        return (0, exports.isNonEmpty)(rest) ? (0, function_1.pipe)(rest, (0, exports.prependAll)(middle), (0, exports.prepend)((0, exports.head)(as))) : as;
      };
    };
    exports.intersperse = intersperse;
    var chainWithIndex = function(f) {
      return function(as) {
        var out = _.fromReadonlyNonEmptyArray(f(0, (0, exports.head)(as)));
        for (var i = 1; i < as.length; i++) {
          out.push.apply(out, f(i, as[i]));
        }
        return out;
      };
    };
    exports.chainWithIndex = chainWithIndex;
    var chop = function(f) {
      return function(as) {
        var _a = f(as), b = _a[0], rest = _a[1];
        var out = [b];
        var next = rest;
        while ((0, exports.isNonEmpty)(next)) {
          var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
          out.push(b_1);
          next = rest_2;
        }
        return out;
      };
    };
    exports.chop = chop;
    var splitAt = function(n) {
      return function(as) {
        var m = Math.max(1, n);
        return m >= as.length ? [as, exports.empty] : [(0, function_1.pipe)(as.slice(1, m), (0, exports.prepend)((0, exports.head)(as))), as.slice(m)];
      };
    };
    exports.splitAt = splitAt;
    var chunksOf = function(n) {
      return (0, exports.chop)((0, exports.splitAt)(n));
    };
    exports.chunksOf = chunksOf;
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
    };
    var _chain = function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chain)(f));
    };
    var _extend = function(wa, f) {
      return (0, function_1.pipe)(wa, (0, exports.extend)(f));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f));
    };
    var _foldMap = function(M) {
      var foldMapM = (0, exports.foldMap)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports.alt)(that));
    };
    var _reduceWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
    };
    var _foldMapWithIndex = function(M) {
      var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapWithIndexM(f));
      };
    };
    var _reduceRightWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
    };
    var _traverseWithIndex = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseWithIndexF(f));
      };
    };
    exports.of = _.singleton;
    var altW = function(that) {
      return function(as) {
        return (0, function_1.pipe)(as, concatW(that()));
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    var ap = function(as) {
      return (0, exports.chain)(function(f) {
        return (0, function_1.pipe)(as, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    var chain = function(f) {
      return (0, exports.chainWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.chain = chain;
    var extend2 = function(f) {
      return function(as) {
        var next = (0, exports.tail)(as);
        var out = [f(as)];
        while ((0, exports.isNonEmpty)(next)) {
          out.push(f(next));
          next = (0, exports.tail)(next);
        }
        return out;
      };
    };
    exports.extend = extend2;
    exports.duplicate = (0, exports.extend)(function_1.identity);
    exports.flatten = (0, exports.chain)(function_1.identity);
    var map3 = function(f) {
      return (0, exports.mapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.map = map3;
    var mapWithIndex = function(f) {
      return function(as) {
        var out = [f(0, (0, exports.head)(as))];
        for (var i = 1; i < as.length; i++) {
          out.push(f(i, as[i]));
        }
        return out;
      };
    };
    exports.mapWithIndex = mapWithIndex;
    var reduce2 = function(b, f) {
      return (0, exports.reduceWithIndex)(b, function(_2, b2, a) {
        return f(b2, a);
      });
    };
    exports.reduce = reduce2;
    var foldMap = function(S2) {
      return function(f) {
        return function(as) {
          return as.slice(1).reduce(function(s, a) {
            return S2.concat(s, f(a));
          }, f(as[0]));
        };
      };
    };
    exports.foldMap = foldMap;
    var reduceRight = function(b, f) {
      return (0, exports.reduceRightWithIndex)(b, function(_2, b2, a) {
        return f(b2, a);
      });
    };
    exports.reduceRight = reduceRight;
    var reduceWithIndex = function(b, f) {
      return function(as) {
        return as.reduce(function(b2, a, i) {
          return f(i, b2, a);
        }, b);
      };
    };
    exports.reduceWithIndex = reduceWithIndex;
    var foldMapWithIndex = function(S2) {
      return function(f) {
        return function(as) {
          return as.slice(1).reduce(function(s, a, i) {
            return S2.concat(s, f(i + 1, a));
          }, f(0, as[0]));
        };
      };
    };
    exports.foldMapWithIndex = foldMapWithIndex;
    var reduceRightWithIndex = function(b, f) {
      return function(as) {
        return as.reduceRight(function(b2, a, i) {
          return f(i, a, b2);
        }, b);
      };
    };
    exports.reduceRightWithIndex = reduceRightWithIndex;
    var traverse = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(f) {
        return traverseWithIndexF(function(_2, a) {
          return f(a);
        });
      };
    };
    exports.traverse = traverse;
    var sequence = function(F) {
      return (0, exports.traverseWithIndex)(F)(function_1.SK);
    };
    exports.sequence = sequence;
    var traverseWithIndex = function(F) {
      return function(f) {
        return function(as) {
          var out = F.map(f(0, (0, exports.head)(as)), exports.of);
          for (var i = 1; i < as.length; i++) {
            out = F.ap(F.map(out, function(bs) {
              return function(b) {
                return (0, function_1.pipe)(bs, (0, exports.append)(b));
              };
            }), f(i, as[i]));
          }
          return out;
        };
      };
    };
    exports.traverseWithIndex = traverseWithIndex;
    exports.extract = _.head;
    exports.URI = "ReadonlyNonEmptyArray";
    var getShow = function(S2) {
      return {
        show: function(as) {
          return "[".concat(as.map(S2.show).join(", "), "]");
        }
      };
    };
    exports.getShow = getShow;
    var getSemigroup = function() {
      return {
        concat
      };
    };
    exports.getSemigroup = getSemigroup;
    var getEq = function(E2) {
      return (0, Eq_1.fromEquals)(function(xs, ys) {
        return xs.length === ys.length && xs.every(function(x, i) {
          return E2.equals(x, ys[i]);
        });
      });
    };
    exports.getEq = getEq;
    var getUnionSemigroup = function(E2) {
      var unionE = (0, exports.union)(E2);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map2,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain
    };
    exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
    exports.Monad = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: _chain
    };
    exports.Foldable = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    exports.FoldableWithIndex = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex
    };
    exports.Traversable = {
      URI: exports.URI,
      map: _map2,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverseWithIndex: _traverseWithIndex
    };
    exports.Alt = {
      URI: exports.URI,
      map: _map2,
      alt: _alt
    };
    exports.Comonad = {
      URI: exports.URI,
      map: _map2,
      extend: _extend,
      extract: exports.extract
    };
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.head = exports.extract;
    exports.tail = _.tail;
    var last = function(as) {
      return as[as.length - 1];
    };
    exports.last = last;
    var init2 = function(as) {
      return as.slice(0, -1);
    };
    exports.init = init2;
    var min4 = function(O) {
      var S2 = Se.min(O);
      return function(as) {
        return as.reduce(S2.concat);
      };
    };
    exports.min = min4;
    var max4 = function(O) {
      var S2 = Se.max(O);
      return function(as) {
        return as.reduce(S2.concat);
      };
    };
    exports.max = max4;
    var concatAll = function(S2) {
      return function(as) {
        return as.reduce(S2.concat);
      };
    };
    exports.concatAll = concatAll;
    var matchLeft = function(f) {
      return function(as) {
        return f((0, exports.head)(as), (0, exports.tail)(as));
      };
    };
    exports.matchLeft = matchLeft;
    var matchRight = function(f) {
      return function(as) {
        return f((0, exports.init)(as), (0, exports.last)(as));
      };
    };
    exports.matchRight = matchRight;
    var modifyHead = function(f) {
      return function(as) {
        return __spreadArray2([
          f((0, exports.head)(as))
        ], (0, exports.tail)(as), true);
      };
    };
    exports.modifyHead = modifyHead;
    var updateHead = function(a) {
      return (0, exports.modifyHead)(function() {
        return a;
      });
    };
    exports.updateHead = updateHead;
    var modifyLast = function(f) {
      return function(as) {
        return (0, function_1.pipe)((0, exports.init)(as), (0, exports.append)(f((0, exports.last)(as))));
      };
    };
    exports.modifyLast = modifyLast;
    var updateLast = function(a) {
      return (0, exports.modifyLast)(function() {
        return a;
      });
    };
    exports.updateLast = updateLast;
    var intercalate = function(S2) {
      var concatAllS = (0, exports.concatAll)(S2);
      return function(middle) {
        return (0, function_1.flow)((0, exports.intersperse)(middle), concatAllS);
      };
    };
    exports.intercalate = intercalate;
    function groupSort(O) {
      var sortO = (0, exports.sort)(O);
      var groupO = group2(O);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : exports.empty;
      };
    }
    exports.groupSort = groupSort;
    function filter3(predicate) {
      return (0, exports.filterWithIndex)(function(_2, a) {
        return predicate(a);
      });
    }
    exports.filter = filter3;
    var filterWithIndex = function(predicate) {
      return function(as) {
        return (0, exports.fromReadonlyArray)(as.filter(function(a, i) {
          return predicate(i, a);
        }));
      };
    };
    exports.filterWithIndex = filterWithIndex;
    exports.uncons = exports.unprepend;
    exports.unsnoc = exports.unappend;
    function cons(head, tail) {
      return tail === void 0 ? (0, exports.prepend)(head) : (0, function_1.pipe)(tail, (0, exports.prepend)(head));
    }
    exports.cons = cons;
    var snoc = function(init3, end) {
      return (0, function_1.pipe)(init3, concat([end]));
    };
    exports.snoc = snoc;
    var insertAt = function(i, a) {
      return function(as) {
        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
      };
    };
    exports.insertAt = insertAt;
    exports.prependToAll = exports.prependAll;
    exports.fold = exports.concatAll;
    exports.readonlyNonEmptyArray = {
      URI: exports.URI,
      of: exports.of,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      ap: _ap,
      chain: _chain,
      extend: _extend,
      extract: exports.extract,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverseWithIndex: _traverseWithIndex,
      alt: _alt
    };
  }
});

// node_modules/fp-ts/lib/NonEmptyArray.js
var require_NonEmptyArray = __commonJS({
  "node_modules/fp-ts/lib/NonEmptyArray.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray2 = exports && exports.__spreadArray || function(to, from2, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from2.length, ar; i < l; i++) {
          if (ar || !(i in from2)) {
            if (!ar)
              ar = Array.prototype.slice.call(from2, 0, i);
            ar[i] = from2[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from2));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chain = exports.ap = exports.alt = exports.altW = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.foldMap = exports.foldMapWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.of = exports.copy = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromArray = exports.fromReadonlyNonEmptyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = void 0;
    exports.filter = exports.groupSort = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = void 0;
    exports.nonEmptyArray = exports.fold = exports.prependToAll = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar2(require_internal());
    var Ord_1 = require_Ord();
    var RNEA = __importStar2(require_ReadonlyNonEmptyArray());
    var isNonEmpty = function(as) {
      return as.length > 0;
    };
    exports.isNonEmpty = isNonEmpty;
    var isOutOfBound = function(i, as) {
      return i < 0 || i >= as.length;
    };
    exports.isOutOfBound = isOutOfBound;
    var prependW = function(head) {
      return function(tail2) {
        return __spreadArray2([head], tail2, true);
      };
    };
    exports.prependW = prependW;
    exports.prepend = exports.prependW;
    var appendW = function(end) {
      return function(init3) {
        return __spreadArray2(__spreadArray2([], init3, true), [end], false);
      };
    };
    exports.appendW = appendW;
    exports.append = exports.appendW;
    var unsafeInsertAt = function(i, a, as) {
      if ((0, exports.isNonEmpty)(as)) {
        var xs = (0, exports.fromReadonlyNonEmptyArray)(as);
        xs.splice(i, 0, a);
        return xs;
      }
      return [a];
    };
    exports.unsafeInsertAt = unsafeInsertAt;
    var unsafeUpdateAt = function(i, a, as) {
      var xs = (0, exports.fromReadonlyNonEmptyArray)(as);
      xs[i] = a;
      return xs;
    };
    exports.unsafeUpdateAt = unsafeUpdateAt;
    var uniq = function(E2) {
      return function(as) {
        if (as.length === 1) {
          return (0, exports.copy)(as);
        }
        var out = [(0, exports.head)(as)];
        var rest = (0, exports.tail)(as);
        var _loop_1 = function(a2) {
          if (out.every(function(o) {
            return !E2.equals(o, a2);
          })) {
            out.push(a2);
          }
        };
        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
          var a = rest_1[_i];
          _loop_1(a);
        }
        return out;
      };
    };
    exports.uniq = uniq;
    var sortBy = function(ords) {
      if ((0, exports.isNonEmpty)(ords)) {
        var M = (0, Ord_1.getMonoid)();
        return (0, exports.sort)(ords.reduce(M.concat, M.empty));
      }
      return exports.copy;
    };
    exports.sortBy = sortBy;
    var union = function(E2) {
      var uniqE = (0, exports.uniq)(E2);
      return function(second) {
        return function(first) {
          return uniqE((0, function_1.pipe)(first, concat(second)));
        };
      };
    };
    exports.union = union;
    var rotate5 = function(n) {
      return function(as) {
        var len = as.length;
        var m = Math.round(n) % len;
        if ((0, exports.isOutOfBound)(Math.abs(m), as) || m === 0) {
          return (0, exports.copy)(as);
        }
        if (m < 0) {
          var _a = (0, exports.splitAt)(-m)(as), f = _a[0], s = _a[1];
          return (0, function_1.pipe)(s, concat(f));
        } else {
          return (0, exports.rotate)(m - len)(as);
        }
      };
    };
    exports.rotate = rotate5;
    exports.fromReadonlyNonEmptyArray = _.fromReadonlyNonEmptyArray;
    var fromArray = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(as) : _.none;
    };
    exports.fromArray = fromArray;
    var makeBy = function(f) {
      return function(n) {
        var j = Math.max(0, Math.floor(n));
        var out = [f(0)];
        for (var i = 1; i < j; i++) {
          out.push(f(i));
        }
        return out;
      };
    };
    exports.makeBy = makeBy;
    var replicate = function(a) {
      return (0, exports.makeBy)(function() {
        return a;
      });
    };
    exports.replicate = replicate;
    var range = function(start3, end) {
      return start3 <= end ? (0, exports.makeBy)(function(i) {
        return start3 + i;
      })(end - start3 + 1) : [start3];
    };
    exports.range = range;
    var unprepend = function(as) {
      return [(0, exports.head)(as), (0, exports.tail)(as)];
    };
    exports.unprepend = unprepend;
    var unappend = function(as) {
      return [(0, exports.init)(as), (0, exports.last)(as)];
    };
    exports.unappend = unappend;
    function concatW(second) {
      return function(first) {
        return first.concat(second);
      };
    }
    exports.concatW = concatW;
    function concat(x, y) {
      return y ? x.concat(y) : function(y2) {
        return y2.concat(x);
      };
    }
    exports.concat = concat;
    var reverse = function(as) {
      return __spreadArray2([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
    };
    exports.reverse = reverse;
    function group2(E2) {
      return function(as) {
        var len = as.length;
        if (len === 0) {
          return [];
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
          var a = as[i];
          if (E2.equals(a, head)) {
            nea.push(a);
          } else {
            out.push(nea);
            head = a;
            nea = [head];
          }
        }
        out.push(nea);
        return out;
      };
    }
    exports.group = group2;
    var groupBy2 = function(f) {
      return function(as) {
        var out = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
          var a = as_1[_i];
          var k = f(a);
          if (_.has.call(out, k)) {
            out[k].push(a);
          } else {
            out[k] = [a];
          }
        }
        return out;
      };
    };
    exports.groupBy = groupBy2;
    var sort2 = function(O) {
      return function(as) {
        return as.slice().sort(O.compare);
      };
    };
    exports.sort = sort2;
    var insertAt = function(i, a) {
      return function(as) {
        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
      };
    };
    exports.insertAt = insertAt;
    var updateAt = function(i, a) {
      return (0, exports.modifyAt)(i, function() {
        return a;
      });
    };
    exports.updateAt = updateAt;
    var modifyAt = function(i, f) {
      return function(as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
      };
    };
    exports.modifyAt = modifyAt;
    exports.copy = exports.fromReadonlyNonEmptyArray;
    var of = function(a) {
      return [a];
    };
    exports.of = of;
    var zipWith = function(as, bs, f) {
      var cs = [f(as[0], bs[0])];
      var len = Math.min(as.length, bs.length);
      for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
      }
      return cs;
    };
    exports.zipWith = zipWith;
    function zip2(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip2(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip2;
    var unzip = function(abs4) {
      var fa = [abs4[0][0]];
      var fb = [abs4[0][1]];
      for (var i = 1; i < abs4.length; i++) {
        fa[i] = abs4[i][0];
        fb[i] = abs4[i][1];
      }
      return [fa, fb];
    };
    exports.unzip = unzip;
    var prependAll = function(middle) {
      return function(as) {
        var out = [middle, as[0]];
        for (var i = 1; i < as.length; i++) {
          out.push(middle, as[i]);
        }
        return out;
      };
    };
    exports.prependAll = prependAll;
    var intersperse = function(middle) {
      return function(as) {
        var rest = (0, exports.tail)(as);
        return (0, exports.isNonEmpty)(rest) ? (0, function_1.pipe)(rest, (0, exports.prependAll)(middle), (0, exports.prepend)((0, exports.head)(as))) : (0, exports.copy)(as);
      };
    };
    exports.intersperse = intersperse;
    exports.foldMapWithIndex = RNEA.foldMapWithIndex;
    exports.foldMap = RNEA.foldMap;
    var chainWithIndex = function(f) {
      return function(as) {
        var out = (0, exports.fromReadonlyNonEmptyArray)(f(0, (0, exports.head)(as)));
        for (var i = 1; i < as.length; i++) {
          out.push.apply(out, f(i, as[i]));
        }
        return out;
      };
    };
    exports.chainWithIndex = chainWithIndex;
    var chop = function(f) {
      return function(as) {
        var _a = f(as), b = _a[0], rest = _a[1];
        var out = [b];
        var next = rest;
        while ((0, exports.isNonEmpty)(next)) {
          var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
          out.push(b_1);
          next = rest_2;
        }
        return out;
      };
    };
    exports.chop = chop;
    var splitAt = function(n) {
      return function(as) {
        var m = Math.max(1, n);
        return m >= as.length ? [(0, exports.copy)(as), []] : [(0, function_1.pipe)(as.slice(1, m), (0, exports.prepend)((0, exports.head)(as))), as.slice(m)];
      };
    };
    exports.splitAt = splitAt;
    var chunksOf = function(n) {
      return (0, exports.chop)((0, exports.splitAt)(n));
    };
    exports.chunksOf = chunksOf;
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
    };
    var _chain = function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chain)(f));
    };
    var _extend = function(wa, f) {
      return (0, function_1.pipe)(wa, (0, exports.extend)(f));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f));
    };
    var _foldMap = function(M) {
      var foldMapM = (0, exports.foldMap)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports.alt)(that));
    };
    var _reduceWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
    };
    var _foldMapWithIndex = function(M) {
      var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapWithIndexM(f));
      };
    };
    var _reduceRightWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
    };
    var _traverseWithIndex = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseWithIndexF(f));
      };
    };
    var altW = function(that) {
      return function(as) {
        return (0, function_1.pipe)(as, concatW(that()));
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    var ap = function(as) {
      return (0, exports.chain)(function(f) {
        return (0, function_1.pipe)(as, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    var chain = function(f) {
      return (0, exports.chainWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.chain = chain;
    var extend2 = function(f) {
      return function(as) {
        var next = (0, exports.tail)(as);
        var out = [f(as)];
        while ((0, exports.isNonEmpty)(next)) {
          out.push(f(next));
          next = (0, exports.tail)(next);
        }
        return out;
      };
    };
    exports.extend = extend2;
    exports.duplicate = (0, exports.extend)(function_1.identity);
    exports.flatten = (0, exports.chain)(function_1.identity);
    var map3 = function(f) {
      return (0, exports.mapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.map = map3;
    var mapWithIndex = function(f) {
      return function(as) {
        var out = [f(0, (0, exports.head)(as))];
        for (var i = 1; i < as.length; i++) {
          out.push(f(i, as[i]));
        }
        return out;
      };
    };
    exports.mapWithIndex = mapWithIndex;
    exports.reduce = RNEA.reduce;
    exports.reduceWithIndex = RNEA.reduceWithIndex;
    exports.reduceRight = RNEA.reduceRight;
    exports.reduceRightWithIndex = RNEA.reduceRightWithIndex;
    var traverse = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(f) {
        return traverseWithIndexF(function(_2, a) {
          return f(a);
        });
      };
    };
    exports.traverse = traverse;
    var sequence = function(F) {
      return (0, exports.traverseWithIndex)(F)(function(_2, a) {
        return a;
      });
    };
    exports.sequence = sequence;
    var traverseWithIndex = function(F) {
      return function(f) {
        return function(as) {
          var out = F.map(f(0, (0, exports.head)(as)), exports.of);
          for (var i = 1; i < as.length; i++) {
            out = F.ap(F.map(out, function(bs) {
              return function(b) {
                return (0, function_1.pipe)(bs, (0, exports.append)(b));
              };
            }), f(i, as[i]));
          }
          return out;
        };
      };
    };
    exports.traverseWithIndex = traverseWithIndex;
    exports.extract = RNEA.head;
    exports.URI = "NonEmptyArray";
    exports.getShow = RNEA.getShow;
    var getSemigroup = function() {
      return {
        concat
      };
    };
    exports.getSemigroup = getSemigroup;
    exports.getEq = RNEA.getEq;
    var getUnionSemigroup = function(E2) {
      var unionE = (0, exports.union)(E2);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map2,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain
    };
    exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
    exports.Monad = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: _chain
    };
    exports.Foldable = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    exports.FoldableWithIndex = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex
    };
    exports.Traversable = {
      URI: exports.URI,
      map: _map2,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverseWithIndex: _traverseWithIndex
    };
    exports.Alt = {
      URI: exports.URI,
      map: _map2,
      alt: _alt
    };
    exports.Comonad = {
      URI: exports.URI,
      map: _map2,
      extend: _extend,
      extract: exports.extract
    };
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.head = RNEA.head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports.tail = tail;
    exports.last = RNEA.last;
    var init2 = function(as) {
      return as.slice(0, -1);
    };
    exports.init = init2;
    exports.min = RNEA.min;
    exports.max = RNEA.max;
    var concatAll = function(S2) {
      return function(as) {
        return as.reduce(S2.concat);
      };
    };
    exports.concatAll = concatAll;
    var matchLeft = function(f) {
      return function(as) {
        return f((0, exports.head)(as), (0, exports.tail)(as));
      };
    };
    exports.matchLeft = matchLeft;
    var matchRight = function(f) {
      return function(as) {
        return f((0, exports.init)(as), (0, exports.last)(as));
      };
    };
    exports.matchRight = matchRight;
    var modifyHead = function(f) {
      return function(as) {
        return __spreadArray2([
          f((0, exports.head)(as))
        ], (0, exports.tail)(as), true);
      };
    };
    exports.modifyHead = modifyHead;
    var updateHead = function(a) {
      return (0, exports.modifyHead)(function() {
        return a;
      });
    };
    exports.updateHead = updateHead;
    var modifyLast = function(f) {
      return function(as) {
        return (0, function_1.pipe)((0, exports.init)(as), (0, exports.append)(f((0, exports.last)(as))));
      };
    };
    exports.modifyLast = modifyLast;
    var updateLast = function(a) {
      return (0, exports.modifyLast)(function() {
        return a;
      });
    };
    exports.updateLast = updateLast;
    exports.intercalate = RNEA.intercalate;
    function groupSort(O) {
      var sortO = (0, exports.sort)(O);
      var groupO = group2(O);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : [];
      };
    }
    exports.groupSort = groupSort;
    function filter3(predicate) {
      return (0, exports.filterWithIndex)(function(_2, a) {
        return predicate(a);
      });
    }
    exports.filter = filter3;
    var filterWithIndex = function(predicate) {
      return function(as) {
        return (0, exports.fromArray)(as.filter(function(a, i) {
          return predicate(i, a);
        }));
      };
    };
    exports.filterWithIndex = filterWithIndex;
    exports.uncons = exports.unprepend;
    exports.unsnoc = exports.unappend;
    function cons(head, tail2) {
      return tail2 === void 0 ? (0, exports.prepend)(head) : (0, function_1.pipe)(tail2, (0, exports.prepend)(head));
    }
    exports.cons = cons;
    var snoc = function(init3, end) {
      return (0, function_1.pipe)(init3, (0, exports.append)(end));
    };
    exports.snoc = snoc;
    exports.prependToAll = exports.prependAll;
    exports.fold = RNEA.concatAll;
    exports.nonEmptyArray = {
      URI: exports.URI,
      of: exports.of,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      ap: _ap,
      chain: _chain,
      extend: _extend,
      extract: exports.extract,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverseWithIndex: _traverseWithIndex,
      alt: _alt
    };
  }
});

// node_modules/fp-ts/lib/number.js
var require_number = __commonJS({
  "node_modules/fp-ts/lib/number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Field = exports.MonoidProduct = exports.MonoidSum = exports.SemigroupProduct = exports.SemigroupSum = exports.MagmaSub = exports.Show = exports.Bounded = exports.Ord = exports.Eq = exports.isNumber = void 0;
    var isNumber = function(u) {
      return typeof u === "number";
    };
    exports.isNumber = isNumber;
    exports.Eq = {
      equals: function(first, second) {
        return first === second;
      }
    };
    exports.Ord = {
      equals: exports.Eq.equals,
      compare: function(first, second) {
        return first < second ? -1 : first > second ? 1 : 0;
      }
    };
    exports.Bounded = {
      equals: exports.Eq.equals,
      compare: exports.Ord.compare,
      top: Infinity,
      bottom: -Infinity
    };
    exports.Show = {
      show: function(n) {
        return JSON.stringify(n);
      }
    };
    exports.MagmaSub = {
      concat: function(first, second) {
        return first - second;
      }
    };
    exports.SemigroupSum = {
      concat: function(first, second) {
        return first + second;
      }
    };
    exports.SemigroupProduct = {
      concat: function(first, second) {
        return first * second;
      }
    };
    exports.MonoidSum = {
      concat: exports.SemigroupSum.concat,
      empty: 0
    };
    exports.MonoidProduct = {
      concat: exports.SemigroupProduct.concat,
      empty: 1
    };
    exports.Field = {
      add: exports.SemigroupSum.concat,
      zero: 0,
      mul: exports.SemigroupProduct.concat,
      one: 1,
      sub: exports.MagmaSub.concat,
      degree: function(_) {
        return 1;
      },
      div: function(first, second) {
        return first / second;
      },
      mod: function(first, second) {
        return first % second;
      }
    };
  }
});

// node_modules/fp-ts/lib/Separated.js
var require_Separated = __commonJS({
  "node_modules/fp-ts/lib/Separated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var separated = function(left2, right2) {
      return { left: left2, right: right2 };
    };
    exports.separated = separated;
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f));
    };
    var _bimap = function(fa, g, f) {
      return (0, function_1.pipe)(fa, (0, exports.bimap)(g, f));
    };
    var map3 = function(f) {
      return function(fa) {
        return (0, exports.separated)((0, exports.left)(fa), f((0, exports.right)(fa)));
      };
    };
    exports.map = map3;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports.separated)(f((0, exports.left)(fa)), (0, exports.right)(fa));
      };
    };
    exports.mapLeft = mapLeft;
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports.separated)(f((0, exports.left)(fa)), g((0, exports.right)(fa)));
      };
    };
    exports.bimap = bimap;
    exports.URI = "Separated";
    exports.Bifunctor = {
      URI: exports.URI,
      mapLeft: _mapLeft,
      bimap: _bimap
    };
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    var left = function(s) {
      return s.left;
    };
    exports.left = left;
    var right = function(s) {
      return s.right;
    };
    exports.right = right;
  }
});

// node_modules/fp-ts/lib/Witherable.js
var require_Witherable = __commonJS({
  "node_modules/fp-ts/lib/Witherable.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterE = exports.witherDefault = exports.wiltDefault = void 0;
    var _ = __importStar2(require_internal());
    function wiltDefault(T, C2) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C2.separate);
        };
      };
    }
    exports.wiltDefault = wiltDefault;
    function witherDefault(T, C2) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C2.compact);
        };
      };
    }
    exports.witherDefault = witherDefault;
    function filterE(W) {
      return function(F) {
        var witherF = W.wither(F);
        return function(predicate) {
          return function(ga) {
            return witherF(ga, function(a) {
              return F.map(predicate(a), function(b) {
                return b ? _.some(a) : _.none;
              });
            });
          };
        };
      };
    }
    exports.filterE = filterE;
  }
});

// node_modules/fp-ts/lib/Zero.js
var require_Zero = __commonJS({
  "node_modules/fp-ts/lib/Zero.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.guard = void 0;
    function guard9(F, P) {
      return function(b) {
        return b ? P.of(void 0) : F.zero();
      };
    }
    exports.guard = guard9;
  }
});

// node_modules/fp-ts/lib/ReadonlyArray.js
var require_ReadonlyArray = __commonJS({
  "node_modules/fp-ts/lib/ReadonlyArray.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray2 = exports && exports.__spreadArray || function(to, from2, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from2.length, ar; i < l; i++) {
          if (ar || !(i in from2)) {
            if (!ar)
              ar = Array.prototype.slice.call(from2, 0, i);
            ar[i] = from2[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from2));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
    exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.foldMap = exports.reduce = exports.foldMapWithIndex = exports.duplicate = exports.extend = exports.filterWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.flatten = exports.chain = exports.ap = exports.alt = exports.altW = exports.zero = exports.of = exports._chainRecBreadthFirst = exports._chainRecDepthFirst = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = void 0;
    exports.toArray = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.Witherable = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.chainFirst = exports.Monad = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = void 0;
    exports.readonlyArray = exports.prependToAll = exports.snoc = exports.cons = exports.range = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.intercalate = exports.exists = exports.some = exports.every = exports.empty = exports.fromArray = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var Eq_1 = require_Eq();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar2(require_internal());
    var N2 = __importStar2(require_number());
    var Ord_1 = require_Ord();
    var RNEA = __importStar2(require_ReadonlyNonEmptyArray());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    var Zero_1 = require_Zero();
    var isEmpty7 = function(as) {
      return as.length === 0;
    };
    exports.isEmpty = isEmpty7;
    exports.isNonEmpty = RNEA.isNonEmpty;
    exports.prepend = RNEA.prepend;
    exports.prependW = RNEA.prependW;
    exports.append = RNEA.append;
    exports.appendW = RNEA.appendW;
    var makeBy = function(n, f) {
      return n <= 0 ? exports.empty : RNEA.makeBy(f)(n);
    };
    exports.makeBy = makeBy;
    var replicate = function(n, a) {
      return (0, exports.makeBy)(n, function() {
        return a;
      });
    };
    exports.replicate = replicate;
    function fromPredicate(predicate) {
      return function(a) {
        return predicate(a) ? [a] : exports.empty;
      };
    }
    exports.fromPredicate = fromPredicate;
    var fromOption = function(ma) {
      return _.isNone(ma) ? exports.empty : [ma.value];
    };
    exports.fromOption = fromOption;
    var fromEither = function(e) {
      return _.isLeft(e) ? exports.empty : [e.right];
    };
    exports.fromEither = fromEither;
    var matchW = function(onEmpty, onNonEmpty) {
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(as) : onEmpty();
      };
    };
    exports.matchW = matchW;
    exports.match = exports.matchW;
    var matchLeftW = function(onEmpty, onNonEmpty) {
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(RNEA.head(as), RNEA.tail(as)) : onEmpty();
      };
    };
    exports.matchLeftW = matchLeftW;
    exports.matchLeft = exports.matchLeftW;
    exports.foldLeft = exports.matchLeft;
    var matchRightW = function(onEmpty, onNonEmpty) {
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(RNEA.init(as), RNEA.last(as)) : onEmpty();
      };
    };
    exports.matchRightW = matchRightW;
    exports.matchRight = exports.matchRightW;
    exports.foldRight = exports.matchRight;
    var chainWithIndex = function(f) {
      return function(as) {
        if ((0, exports.isEmpty)(as)) {
          return exports.empty;
        }
        var out = [];
        for (var i = 0; i < as.length; i++) {
          out.push.apply(out, f(i, as[i]));
        }
        return out;
      };
    };
    exports.chainWithIndex = chainWithIndex;
    var scanLeft = function(b, f) {
      return function(as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[0] = b;
        for (var i = 0; i < len; i++) {
          out[i + 1] = f(out[i], as[i]);
        }
        return out;
      };
    };
    exports.scanLeft = scanLeft;
    var scanRight = function(b, f) {
      return function(as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[len] = b;
        for (var i = len - 1; i >= 0; i--) {
          out[i] = f(as[i], out[i + 1]);
        }
        return out;
      };
    };
    exports.scanRight = scanRight;
    var size = function(as) {
      return as.length;
    };
    exports.size = size;
    exports.isOutOfBound = RNEA.isOutOfBound;
    function lookup(i, as) {
      return as === void 0 ? function(as2) {
        return lookup(i, as2);
      } : (0, exports.isOutOfBound)(i, as) ? _.none : _.some(as[i]);
    }
    exports.lookup = lookup;
    var head = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(RNEA.head(as)) : _.none;
    };
    exports.head = head;
    var last = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(RNEA.last(as)) : _.none;
    };
    exports.last = last;
    var tail = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(RNEA.tail(as)) : _.none;
    };
    exports.tail = tail;
    var init2 = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(RNEA.init(as)) : _.none;
    };
    exports.init = init2;
    var takeLeft = function(n) {
      return function(as) {
        return (0, exports.isOutOfBound)(n, as) ? as : n === 0 ? exports.empty : as.slice(0, n);
      };
    };
    exports.takeLeft = takeLeft;
    var takeRight = function(n) {
      return function(as) {
        return (0, exports.isOutOfBound)(n, as) ? as : n === 0 ? exports.empty : as.slice(-n);
      };
    };
    exports.takeRight = takeRight;
    function takeLeftWhile(predicate) {
      return function(as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
          var a = as_1[_i];
          if (!predicate(a)) {
            break;
          }
          out.push(a);
        }
        var len = out.length;
        return len === as.length ? as : len === 0 ? exports.empty : out;
      };
    }
    exports.takeLeftWhile = takeLeftWhile;
    var spanLeftIndex = function(as, predicate) {
      var l = as.length;
      var i = 0;
      for (; i < l; i++) {
        if (!predicate(as[i])) {
          break;
        }
      }
      return i;
    };
    function spanLeft(predicate) {
      return function(as) {
        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init3 = _a[0], rest = _a[1];
        return { init: init3, rest };
      };
    }
    exports.spanLeft = spanLeft;
    var dropLeft = function(n) {
      return function(as) {
        return n <= 0 || (0, exports.isEmpty)(as) ? as : n >= as.length ? exports.empty : as.slice(n, as.length);
      };
    };
    exports.dropLeft = dropLeft;
    var dropRight = function(n) {
      return function(as) {
        return n <= 0 || (0, exports.isEmpty)(as) ? as : n >= as.length ? exports.empty : as.slice(0, as.length - n);
      };
    };
    exports.dropRight = dropRight;
    function dropLeftWhile(predicate) {
      return function(as) {
        var i = spanLeftIndex(as, predicate);
        return i === 0 ? as : i === as.length ? exports.empty : as.slice(i);
      };
    }
    exports.dropLeftWhile = dropLeftWhile;
    var findIndex = function(predicate) {
      return function(as) {
        for (var i = 0; i < as.length; i++) {
          if (predicate(as[i])) {
            return _.some(i);
          }
        }
        return _.none;
      };
    };
    exports.findIndex = findIndex;
    function findFirst(predicate) {
      return function(as) {
        for (var i = 0; i < as.length; i++) {
          if (predicate(as[i])) {
            return _.some(as[i]);
          }
        }
        return _.none;
      };
    }
    exports.findFirst = findFirst;
    var findFirstMap = function(f) {
      return function(as) {
        for (var i = 0; i < as.length; i++) {
          var out = f(as[i]);
          if (_.isSome(out)) {
            return out;
          }
        }
        return _.none;
      };
    };
    exports.findFirstMap = findFirstMap;
    function findLast(predicate) {
      return function(as) {
        for (var i = as.length - 1; i >= 0; i--) {
          if (predicate(as[i])) {
            return _.some(as[i]);
          }
        }
        return _.none;
      };
    }
    exports.findLast = findLast;
    var findLastMap = function(f) {
      return function(as) {
        for (var i = as.length - 1; i >= 0; i--) {
          var out = f(as[i]);
          if (_.isSome(out)) {
            return out;
          }
        }
        return _.none;
      };
    };
    exports.findLastMap = findLastMap;
    var findLastIndex = function(predicate) {
      return function(as) {
        for (var i = as.length - 1; i >= 0; i--) {
          if (predicate(as[i])) {
            return _.some(i);
          }
        }
        return _.none;
      };
    };
    exports.findLastIndex = findLastIndex;
    var insertAt = function(i, a) {
      return function(as) {
        return i < 0 || i > as.length ? _.none : _.some(RNEA.unsafeInsertAt(i, a, as));
      };
    };
    exports.insertAt = insertAt;
    var updateAt = function(i, a) {
      return (0, exports.modifyAt)(i, function() {
        return a;
      });
    };
    exports.updateAt = updateAt;
    var deleteAt = function(i) {
      return function(as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeDeleteAt)(i, as));
      };
    };
    exports.deleteAt = deleteAt;
    var modifyAt = function(i, f) {
      return function(as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
      };
    };
    exports.modifyAt = modifyAt;
    var reverse = function(as) {
      return as.length <= 1 ? as : as.slice().reverse();
    };
    exports.reverse = reverse;
    var rights = function(as) {
      var r = [];
      for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === "Right") {
          r.push(a.right);
        }
      }
      return r;
    };
    exports.rights = rights;
    var lefts = function(as) {
      var r = [];
      for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === "Left") {
          r.push(a.left);
        }
      }
      return r;
    };
    exports.lefts = lefts;
    var sort2 = function(O) {
      return function(as) {
        return as.length <= 1 ? as : as.slice().sort(O.compare);
      };
    };
    exports.sort = sort2;
    var zipWith = function(fa, fb, f) {
      var fc = [];
      var len = Math.min(fa.length, fb.length);
      for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
      }
      return fc;
    };
    exports.zipWith = zipWith;
    function zip2(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip2(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip2;
    var unzip = function(as) {
      var fa = [];
      var fb = [];
      for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
      }
      return [fa, fb];
    };
    exports.unzip = unzip;
    var prependAll = function(middle) {
      var f = RNEA.prependAll(middle);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : as;
      };
    };
    exports.prependAll = prependAll;
    var intersperse = function(middle) {
      var f = RNEA.intersperse(middle);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : as;
      };
    };
    exports.intersperse = intersperse;
    var rotate5 = function(n) {
      var f = RNEA.rotate(n);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : as;
      };
    };
    exports.rotate = rotate5;
    function elem(E2) {
      return function(a, as) {
        if (as === void 0) {
          var elemE_1 = elem(E2);
          return function(as2) {
            return elemE_1(a, as2);
          };
        }
        var predicate = function(element) {
          return E2.equals(element, a);
        };
        var i = 0;
        for (; i < as.length; i++) {
          if (predicate(as[i])) {
            return true;
          }
        }
        return false;
      };
    }
    exports.elem = elem;
    var uniq = function(E2) {
      var f = RNEA.uniq(E2);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : as;
      };
    };
    exports.uniq = uniq;
    var sortBy = function(ords) {
      var f = RNEA.sortBy(ords);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : as;
      };
    };
    exports.sortBy = sortBy;
    var chop = function(f) {
      var g = RNEA.chop(f);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? g(as) : exports.empty;
      };
    };
    exports.chop = chop;
    var splitAt = function(n) {
      return function(as) {
        return n >= 1 && (0, exports.isNonEmpty)(as) ? RNEA.splitAt(n)(as) : (0, exports.isEmpty)(as) ? [as, exports.empty] : [exports.empty, as];
      };
    };
    exports.splitAt = splitAt;
    var chunksOf = function(n) {
      var f = RNEA.chunksOf(n);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : exports.empty;
      };
    };
    exports.chunksOf = chunksOf;
    var fromOptionK = function(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports.fromOption)(f.apply(void 0, a));
      };
    };
    exports.fromOptionK = fromOptionK;
    function comprehension(input, f, g) {
      if (g === void 0) {
        g = function() {
          return true;
        };
      }
      var go = function(scope, input2) {
        return (0, exports.isNonEmpty)(input2) ? (0, function_1.pipe)(RNEA.head(input2), (0, exports.chain)(function(x) {
          return go((0, function_1.pipe)(scope, (0, exports.append)(x)), RNEA.tail(input2));
        })) : g.apply(void 0, scope) ? [f.apply(void 0, scope)] : exports.empty;
      };
      return go(exports.empty, input);
    }
    exports.comprehension = comprehension;
    var concatW = function(second) {
      return function(first) {
        return (0, exports.isEmpty)(first) ? second : (0, exports.isEmpty)(second) ? first : first.concat(second);
      };
    };
    exports.concatW = concatW;
    exports.concat = exports.concatW;
    function union(E2) {
      var unionE = RNEA.union(E2);
      return function(first, second) {
        if (second === void 0) {
          var unionE_1 = union(E2);
          return function(second2) {
            return unionE_1(second2, first);
          };
        }
        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second) ? unionE(second)(first) : (0, exports.isNonEmpty)(first) ? first : second;
      };
    }
    exports.union = union;
    function intersection2(E2) {
      var elemE = elem(E2);
      return function(xs, ys) {
        if (ys === void 0) {
          var intersectionE_1 = intersection2(E2);
          return function(ys2) {
            return intersectionE_1(ys2, xs);
          };
        }
        return xs.filter(function(a) {
          return elemE(a, ys);
        });
      };
    }
    exports.intersection = intersection2;
    function difference(E2) {
      var elemE = elem(E2);
      return function(xs, ys) {
        if (ys === void 0) {
          var differenceE_1 = difference(E2);
          return function(ys2) {
            return differenceE_1(ys2, xs);
          };
        }
        return xs.filter(function(a) {
          return !elemE(a, ys);
        });
      };
    }
    exports.difference = difference;
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
    };
    var _chain = function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chain)(f));
    };
    var _filter = function(fa, predicate) {
      return (0, function_1.pipe)(fa, (0, exports.filter)(predicate));
    };
    var _filterMap = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.filterMap)(f));
    };
    var _partition = function(fa, predicate) {
      return (0, function_1.pipe)(fa, (0, exports.partition)(predicate));
    };
    var _partitionMap = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.partitionMap)(f));
    };
    var _partitionWithIndex = function(fa, predicateWithIndex) {
      return (0, function_1.pipe)(fa, (0, exports.partitionWithIndex)(predicateWithIndex));
    };
    var _partitionMapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.partitionMapWithIndex)(f));
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports.alt)(that));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f));
    };
    var _foldMap = function(M) {
      var foldMapM = (0, exports.foldMap)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f));
    };
    var _reduceWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
    };
    var _foldMapWithIndex = function(M) {
      var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapWithIndexM(f));
      };
    };
    var _reduceRightWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
    };
    var _filterMapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.filterMapWithIndex)(f));
    };
    var _filterWithIndex = function(fa, predicateWithIndex) {
      return (0, function_1.pipe)(fa, (0, exports.filterWithIndex)(predicateWithIndex));
    };
    var _extend = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.extend)(f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _traverseWithIndex = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseWithIndexF(f));
      };
    };
    var _chainRecDepthFirst = function(a, f) {
      return (0, function_1.pipe)(a, (0, exports.chainRecDepthFirst)(f));
    };
    exports._chainRecDepthFirst = _chainRecDepthFirst;
    var _chainRecBreadthFirst = function(a, f) {
      return (0, function_1.pipe)(a, (0, exports.chainRecBreadthFirst)(f));
    };
    exports._chainRecBreadthFirst = _chainRecBreadthFirst;
    exports.of = RNEA.of;
    var zero2 = function() {
      return exports.empty;
    };
    exports.zero = zero2;
    var altW = function(that) {
      return function(fa) {
        return fa.concat(that());
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    var ap = function(fa) {
      return (0, exports.chain)(function(f) {
        return (0, function_1.pipe)(fa, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    var chain = function(f) {
      return function(ma) {
        return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function(_2, a) {
          return f(a);
        }));
      };
    };
    exports.chain = chain;
    exports.flatten = (0, exports.chain)(function_1.identity);
    var map3 = function(f) {
      return function(fa) {
        return fa.map(function(a) {
          return f(a);
        });
      };
    };
    exports.map = map3;
    var mapWithIndex = function(f) {
      return function(fa) {
        return fa.map(function(a, i) {
          return f(i, a);
        });
      };
    };
    exports.mapWithIndex = mapWithIndex;
    var separate = function(fa) {
      var left = [];
      var right = [];
      for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === "Left") {
          left.push(e.left);
        } else {
          right.push(e.right);
        }
      }
      return (0, Separated_1.separated)(left, right);
    };
    exports.separate = separate;
    var filter3 = function(predicate) {
      return function(as) {
        return as.filter(predicate);
      };
    };
    exports.filter = filter3;
    var filterMapWithIndex = function(f) {
      return function(fa) {
        var out = [];
        for (var i = 0; i < fa.length; i++) {
          var optionB = f(i, fa[i]);
          if (_.isSome(optionB)) {
            out.push(optionB.value);
          }
        }
        return out;
      };
    };
    exports.filterMapWithIndex = filterMapWithIndex;
    var filterMap = function(f) {
      return (0, exports.filterMapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.filterMap = filterMap;
    exports.compact = (0, exports.filterMap)(function_1.identity);
    var partition = function(predicate) {
      return (0, exports.partitionWithIndex)(function(_2, a) {
        return predicate(a);
      });
    };
    exports.partition = partition;
    var partitionWithIndex = function(predicateWithIndex) {
      return function(as) {
        var left = [];
        var right = [];
        for (var i = 0; i < as.length; i++) {
          var a = as[i];
          if (predicateWithIndex(i, a)) {
            right.push(a);
          } else {
            left.push(a);
          }
        }
        return (0, Separated_1.separated)(left, right);
      };
    };
    exports.partitionWithIndex = partitionWithIndex;
    var partitionMap = function(f) {
      return (0, exports.partitionMapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.partitionMap = partitionMap;
    var partitionMapWithIndex = function(f) {
      return function(fa) {
        var left = [];
        var right = [];
        for (var i = 0; i < fa.length; i++) {
          var e = f(i, fa[i]);
          if (e._tag === "Left") {
            left.push(e.left);
          } else {
            right.push(e.right);
          }
        }
        return (0, Separated_1.separated)(left, right);
      };
    };
    exports.partitionMapWithIndex = partitionMapWithIndex;
    var filterWithIndex = function(predicateWithIndex) {
      return function(as) {
        return as.filter(function(a, i) {
          return predicateWithIndex(i, a);
        });
      };
    };
    exports.filterWithIndex = filterWithIndex;
    var extend2 = function(f) {
      return function(wa) {
        return wa.map(function(_2, i) {
          return f(wa.slice(i));
        });
      };
    };
    exports.extend = extend2;
    exports.duplicate = (0, exports.extend)(function_1.identity);
    var foldMapWithIndex = function(M) {
      return function(f) {
        return function(fa) {
          return fa.reduce(function(b, a, i) {
            return M.concat(b, f(i, a));
          }, M.empty);
        };
      };
    };
    exports.foldMapWithIndex = foldMapWithIndex;
    var reduce2 = function(b, f) {
      return (0, exports.reduceWithIndex)(b, function(_2, b2, a) {
        return f(b2, a);
      });
    };
    exports.reduce = reduce2;
    var foldMap = function(M) {
      var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
      return function(f) {
        return foldMapWithIndexM(function(_2, a) {
          return f(a);
        });
      };
    };
    exports.foldMap = foldMap;
    var reduceWithIndex = function(b, f) {
      return function(fa) {
        var len = fa.length;
        var out = b;
        for (var i = 0; i < len; i++) {
          out = f(i, out, fa[i]);
        }
        return out;
      };
    };
    exports.reduceWithIndex = reduceWithIndex;
    var reduceRight = function(b, f) {
      return (0, exports.reduceRightWithIndex)(b, function(_2, a, b2) {
        return f(a, b2);
      });
    };
    exports.reduceRight = reduceRight;
    var reduceRightWithIndex = function(b, f) {
      return function(fa) {
        return fa.reduceRight(function(b2, a, i) {
          return f(i, a, b2);
        }, b);
      };
    };
    exports.reduceRightWithIndex = reduceRightWithIndex;
    var traverse = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(f) {
        return traverseWithIndexF(function(_2, a) {
          return f(a);
        });
      };
    };
    exports.traverse = traverse;
    var sequence = function(F) {
      return function(ta) {
        return _reduce(ta, F.of((0, exports.zero)()), function(fas, fa) {
          return F.ap(F.map(fas, function(as) {
            return function(a) {
              return (0, function_1.pipe)(as, (0, exports.append)(a));
            };
          }), fa);
        });
      };
    };
    exports.sequence = sequence;
    var traverseWithIndex = function(F) {
      return function(f) {
        return (0, exports.reduceWithIndex)(F.of((0, exports.zero)()), function(i, fbs, a) {
          return F.ap(F.map(fbs, function(bs) {
            return function(b) {
              return (0, function_1.pipe)(bs, (0, exports.append)(b));
            };
          }), f(i, a));
        });
      };
    };
    exports.traverseWithIndex = traverseWithIndex;
    var wither = function(F) {
      var _witherF = _wither(F);
      return function(f) {
        return function(fa) {
          return _witherF(fa, f);
        };
      };
    };
    exports.wither = wither;
    var wilt = function(F) {
      var _wiltF = _wilt(F);
      return function(f) {
        return function(fa) {
          return _wiltF(fa, f);
        };
      };
    };
    exports.wilt = wilt;
    var unfold = function(b, f) {
      var out = [];
      var bb = b;
      while (true) {
        var mt = f(bb);
        if (_.isSome(mt)) {
          var _a = mt.value, a = _a[0], b_1 = _a[1];
          out.push(a);
          bb = b_1;
        } else {
          break;
        }
      }
      return out;
    };
    exports.unfold = unfold;
    exports.URI = "ReadonlyArray";
    var getShow = function(S2) {
      return {
        show: function(as) {
          return "[".concat(as.map(S2.show).join(", "), "]");
        }
      };
    };
    exports.getShow = getShow;
    var getSemigroup = function() {
      return {
        concat: function(first, second) {
          return (0, exports.isEmpty)(first) ? second : (0, exports.isEmpty)(second) ? first : first.concat(second);
        }
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function() {
      return {
        concat: (0, exports.getSemigroup)().concat,
        empty: exports.empty
      };
    };
    exports.getMonoid = getMonoid;
    var getEq = function(E2) {
      return (0, Eq_1.fromEquals)(function(xs, ys) {
        return xs.length === ys.length && xs.every(function(x, i) {
          return E2.equals(x, ys[i]);
        });
      });
    };
    exports.getEq = getEq;
    var getOrd = function(O) {
      return (0, Ord_1.fromCompare)(function(a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
          var ordering = O.compare(a[i], b[i]);
          if (ordering !== 0) {
            return ordering;
          }
        }
        return N2.Ord.compare(aLen, bLen);
      });
    };
    exports.getOrd = getOrd;
    var getUnionSemigroup = function(E2) {
      var unionE = union(E2);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    var getUnionMonoid = function(E2) {
      return {
        concat: (0, exports.getUnionSemigroup)(E2).concat,
        empty: exports.empty
      };
    };
    exports.getUnionMonoid = getUnionMonoid;
    var getIntersectionSemigroup = function(E2) {
      var intersectionE = intersection2(E2);
      return {
        concat: function(first, second) {
          return intersectionE(second)(first);
        }
      };
    };
    exports.getIntersectionSemigroup = getIntersectionSemigroup;
    var getDifferenceMagma = function(E2) {
      var differenceE = difference(E2);
      return {
        concat: function(first, second) {
          return differenceE(second)(first);
        }
      };
    };
    exports.getDifferenceMagma = getDifferenceMagma;
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map2,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain
    };
    exports.Monad = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: _chain
    };
    exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
    exports.Unfoldable = {
      URI: exports.URI,
      unfold: exports.unfold
    };
    exports.Alt = {
      URI: exports.URI,
      map: _map2,
      alt: _alt
    };
    exports.Zero = {
      URI: exports.URI,
      zero: exports.zero
    };
    exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
    exports.Alternative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      alt: _alt,
      zero: exports.zero
    };
    exports.Extend = {
      URI: exports.URI,
      map: _map2,
      extend: _extend
    };
    exports.Compactable = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate
    };
    exports.Filterable = {
      URI: exports.URI,
      map: _map2,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap
    };
    exports.FilterableWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      partitionMapWithIndex: _partitionMapWithIndex,
      partitionWithIndex: _partitionWithIndex,
      filterMapWithIndex: _filterMapWithIndex,
      filterWithIndex: _filterWithIndex
    };
    exports.Foldable = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    exports.FoldableWithIndex = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex
    };
    exports.Traversable = {
      URI: exports.URI,
      map: _map2,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverse: _traverse,
      sequence: exports.sequence,
      traverseWithIndex: _traverseWithIndex
    };
    var chainRecDepthFirst = function(f) {
      return function(a) {
        var todo = __spreadArray2([], f(a), true);
        var out = [];
        while (todo.length > 0) {
          var e = todo.shift();
          if (_.isLeft(e)) {
            todo.unshift.apply(todo, f(e.left));
          } else {
            out.push(e.right);
          }
        }
        return out;
      };
    };
    exports.chainRecDepthFirst = chainRecDepthFirst;
    exports.ChainRecDepthFirst = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain,
      chainRec: exports._chainRecDepthFirst
    };
    var chainRecBreadthFirst = function(f) {
      return function(a) {
        var initial = f(a);
        var todo = [];
        var out = [];
        function go(e2) {
          if (_.isLeft(e2)) {
            f(e2.left).forEach(function(v) {
              return todo.push(v);
            });
          } else {
            out.push(e2.right);
          }
        }
        for (var _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
          var e = initial_1[_i];
          go(e);
        }
        while (todo.length > 0) {
          go(todo.shift());
        }
        return out;
      };
    };
    exports.chainRecBreadthFirst = chainRecBreadthFirst;
    exports.ChainRecBreadthFirst = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain,
      chainRec: exports._chainRecBreadthFirst
    };
    var _wither = /* @__PURE__ */ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
    var _wilt = /* @__PURE__ */ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
    exports.Witherable = {
      URI: exports.URI,
      map: _map2,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      wither: _wither,
      wilt: _wilt
    };
    exports.filterE = (0, Witherable_1.filterE)(exports.Witherable);
    exports.FromEither = {
      URI: exports.URI,
      fromEither: exports.fromEither
    };
    exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
    exports.unsafeInsertAt = RNEA.unsafeInsertAt;
    var unsafeUpdateAt = function(i, a, as) {
      return (0, exports.isNonEmpty)(as) ? RNEA.unsafeUpdateAt(i, a, as) : as;
    };
    exports.unsafeUpdateAt = unsafeUpdateAt;
    var unsafeDeleteAt = function(i, as) {
      var xs = as.slice();
      xs.splice(i, 1);
      return xs;
    };
    exports.unsafeDeleteAt = unsafeDeleteAt;
    var toArray4 = function(as) {
      return as.slice();
    };
    exports.toArray = toArray4;
    var fromArray = function(as) {
      return (0, exports.isEmpty)(as) ? exports.empty : as.slice();
    };
    exports.fromArray = fromArray;
    exports.empty = RNEA.empty;
    function every(predicate) {
      return function(as) {
        return as.every(predicate);
      };
    }
    exports.every = every;
    var some = function(predicate) {
      return function(as) {
        return as.some(predicate);
      };
    };
    exports.some = some;
    exports.exists = exports.some;
    var intercalate = function(M) {
      var intercalateM = RNEA.intercalate(M);
      return function(middle) {
        return (0, exports.match)(function() {
          return M.empty;
        }, intercalateM(middle));
      };
    };
    exports.intercalate = intercalate;
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.range = RNEA.range;
    exports.cons = RNEA.cons;
    exports.snoc = RNEA.snoc;
    exports.prependToAll = exports.prependAll;
    exports.readonlyArray = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: _chain,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      mapWithIndex: _mapWithIndex,
      partitionMapWithIndex: _partitionMapWithIndex,
      partitionWithIndex: _partitionWithIndex,
      filterMapWithIndex: _filterMapWithIndex,
      filterWithIndex: _filterWithIndex,
      alt: _alt,
      zero: exports.zero,
      unfold: exports.unfold,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverseWithIndex: _traverseWithIndex,
      extend: _extend,
      wither: _wither,
      wilt: _wilt
    };
  }
});

// node_modules/fp-ts/lib/Array.js
var require_Array = __commonJS({
  "node_modules/fp-ts/lib/Array.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.copy = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
    exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.foldMapWithIndex = exports.foldMap = exports.duplicate = exports.extend = exports.filterWithIndex = exports.alt = exports.altW = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.filter = exports.separate = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.mapWithIndex = exports.flatten = exports.chain = exports.ap = exports.map = exports.zero = exports.of = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.sort = void 0;
    exports.some = exports.every = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = void 0;
    exports.array = exports.prependToAll = exports.snoc = exports.cons = exports.empty = exports.range = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.intercalate = exports.exists = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar2(require_internal());
    var NEA = __importStar2(require_NonEmptyArray());
    var RA = __importStar2(require_ReadonlyArray());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    var Zero_1 = require_Zero();
    var isEmpty7 = function(as) {
      return as.length === 0;
    };
    exports.isEmpty = isEmpty7;
    exports.isNonEmpty = NEA.isNonEmpty;
    exports.prepend = NEA.prepend;
    exports.prependW = NEA.prependW;
    exports.append = NEA.append;
    exports.appendW = NEA.appendW;
    var makeBy = function(n, f) {
      return n <= 0 ? [] : NEA.makeBy(f)(n);
    };
    exports.makeBy = makeBy;
    var replicate = function(n, a) {
      return (0, exports.makeBy)(n, function() {
        return a;
      });
    };
    exports.replicate = replicate;
    function fromPredicate(predicate) {
      return function(a) {
        return predicate(a) ? [a] : [];
      };
    }
    exports.fromPredicate = fromPredicate;
    var fromOption = function(ma) {
      return _.isNone(ma) ? [] : [ma.value];
    };
    exports.fromOption = fromOption;
    var fromEither = function(e) {
      return _.isLeft(e) ? [] : [e.right];
    };
    exports.fromEither = fromEither;
    var matchW = function(onEmpty, onNonEmpty) {
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(as) : onEmpty();
      };
    };
    exports.matchW = matchW;
    exports.match = exports.matchW;
    var matchLeftW = function(onEmpty, onNonEmpty) {
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(NEA.head(as), NEA.tail(as)) : onEmpty();
      };
    };
    exports.matchLeftW = matchLeftW;
    exports.matchLeft = exports.matchLeftW;
    exports.foldLeft = exports.matchLeft;
    var matchRightW = function(onEmpty, onNonEmpty) {
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(NEA.init(as), NEA.last(as)) : onEmpty();
      };
    };
    exports.matchRightW = matchRightW;
    exports.matchRight = exports.matchRightW;
    exports.foldRight = exports.matchRight;
    var chainWithIndex = function(f) {
      return function(as) {
        var out = [];
        for (var i = 0; i < as.length; i++) {
          out.push.apply(out, f(i, as[i]));
        }
        return out;
      };
    };
    exports.chainWithIndex = chainWithIndex;
    var scanLeft = function(b, f) {
      return function(as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[0] = b;
        for (var i = 0; i < len; i++) {
          out[i + 1] = f(out[i], as[i]);
        }
        return out;
      };
    };
    exports.scanLeft = scanLeft;
    var scanRight = function(b, f) {
      return function(as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[len] = b;
        for (var i = len - 1; i >= 0; i--) {
          out[i] = f(as[i], out[i + 1]);
        }
        return out;
      };
    };
    exports.scanRight = scanRight;
    var size = function(as) {
      return as.length;
    };
    exports.size = size;
    exports.isOutOfBound = NEA.isOutOfBound;
    exports.lookup = RA.lookup;
    exports.head = RA.head;
    exports.last = RA.last;
    var tail = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(NEA.tail(as)) : _.none;
    };
    exports.tail = tail;
    var init2 = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(NEA.init(as)) : _.none;
    };
    exports.init = init2;
    var takeLeft = function(n) {
      return function(as) {
        return (0, exports.isOutOfBound)(n, as) ? (0, exports.copy)(as) : as.slice(0, n);
      };
    };
    exports.takeLeft = takeLeft;
    var takeRight = function(n) {
      return function(as) {
        return (0, exports.isOutOfBound)(n, as) ? (0, exports.copy)(as) : n === 0 ? [] : as.slice(-n);
      };
    };
    exports.takeRight = takeRight;
    function takeLeftWhile(predicate) {
      return function(as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
          var a = as_1[_i];
          if (!predicate(a)) {
            break;
          }
          out.push(a);
        }
        return out;
      };
    }
    exports.takeLeftWhile = takeLeftWhile;
    var spanLeftIndex = function(as, predicate) {
      var l = as.length;
      var i = 0;
      for (; i < l; i++) {
        if (!predicate(as[i])) {
          break;
        }
      }
      return i;
    };
    function spanLeft(predicate) {
      return function(as) {
        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init3 = _a[0], rest = _a[1];
        return { init: init3, rest };
      };
    }
    exports.spanLeft = spanLeft;
    var dropLeft = function(n) {
      return function(as) {
        return n <= 0 || (0, exports.isEmpty)(as) ? (0, exports.copy)(as) : n >= as.length ? [] : as.slice(n, as.length);
      };
    };
    exports.dropLeft = dropLeft;
    var dropRight = function(n) {
      return function(as) {
        return n <= 0 || (0, exports.isEmpty)(as) ? (0, exports.copy)(as) : n >= as.length ? [] : as.slice(0, as.length - n);
      };
    };
    exports.dropRight = dropRight;
    function dropLeftWhile(predicate) {
      return function(as) {
        return as.slice(spanLeftIndex(as, predicate));
      };
    }
    exports.dropLeftWhile = dropLeftWhile;
    exports.findIndex = RA.findIndex;
    function findFirst(predicate) {
      return RA.findFirst(predicate);
    }
    exports.findFirst = findFirst;
    exports.findFirstMap = RA.findFirstMap;
    function findLast(predicate) {
      return RA.findLast(predicate);
    }
    exports.findLast = findLast;
    exports.findLastMap = RA.findLastMap;
    exports.findLastIndex = RA.findLastIndex;
    var copy = function(as) {
      return as.slice();
    };
    exports.copy = copy;
    var insertAt = function(i, a) {
      return function(as) {
        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
      };
    };
    exports.insertAt = insertAt;
    var updateAt = function(i, a) {
      return (0, exports.modifyAt)(i, function() {
        return a;
      });
    };
    exports.updateAt = updateAt;
    var deleteAt = function(i) {
      return function(as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeDeleteAt)(i, as));
      };
    };
    exports.deleteAt = deleteAt;
    var modifyAt = function(i, f) {
      return function(as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
      };
    };
    exports.modifyAt = modifyAt;
    var reverse = function(as) {
      return (0, exports.isEmpty)(as) ? [] : as.slice().reverse();
    };
    exports.reverse = reverse;
    var rights = function(as) {
      var r = [];
      for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === "Right") {
          r.push(a.right);
        }
      }
      return r;
    };
    exports.rights = rights;
    var lefts = function(as) {
      var r = [];
      for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === "Left") {
          r.push(a.left);
        }
      }
      return r;
    };
    exports.lefts = lefts;
    var sort2 = function(O) {
      return function(as) {
        return as.length <= 1 ? (0, exports.copy)(as) : as.slice().sort(O.compare);
      };
    };
    exports.sort = sort2;
    var zipWith = function(fa, fb, f) {
      var fc = [];
      var len = Math.min(fa.length, fb.length);
      for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
      }
      return fc;
    };
    exports.zipWith = zipWith;
    function zip2(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip2(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip2;
    var unzip = function(as) {
      var fa = [];
      var fb = [];
      for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
      }
      return [fa, fb];
    };
    exports.unzip = unzip;
    var prependAll = function(middle) {
      var f = NEA.prependAll(middle);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : [];
      };
    };
    exports.prependAll = prependAll;
    var intersperse = function(middle) {
      var f = NEA.intersperse(middle);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as);
      };
    };
    exports.intersperse = intersperse;
    var rotate5 = function(n) {
      var f = NEA.rotate(n);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as);
      };
    };
    exports.rotate = rotate5;
    exports.elem = RA.elem;
    var uniq = function(E2) {
      var f = NEA.uniq(E2);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as);
      };
    };
    exports.uniq = uniq;
    var sortBy = function(ords) {
      var f = NEA.sortBy(ords);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as);
      };
    };
    exports.sortBy = sortBy;
    var chop = function(f) {
      var g = NEA.chop(f);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? g(as) : [];
      };
    };
    exports.chop = chop;
    var splitAt = function(n) {
      return function(as) {
        return n >= 1 && (0, exports.isNonEmpty)(as) ? NEA.splitAt(n)(as) : (0, exports.isEmpty)(as) ? [(0, exports.copy)(as), []] : [[], (0, exports.copy)(as)];
      };
    };
    exports.splitAt = splitAt;
    var chunksOf = function(n) {
      var f = NEA.chunksOf(n);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : [];
      };
    };
    exports.chunksOf = chunksOf;
    var fromOptionK = function(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports.fromOption)(f.apply(void 0, a));
      };
    };
    exports.fromOptionK = fromOptionK;
    function comprehension(input, f, g) {
      if (g === void 0) {
        g = function() {
          return true;
        };
      }
      var go = function(scope, input2) {
        return (0, exports.isNonEmpty)(input2) ? (0, function_1.pipe)(NEA.head(input2), (0, exports.chain)(function(x) {
          return go((0, function_1.pipe)(scope, (0, exports.append)(x)), NEA.tail(input2));
        })) : g.apply(void 0, scope) ? [f.apply(void 0, scope)] : [];
      };
      return go([], input);
    }
    exports.comprehension = comprehension;
    var concatW = function(second) {
      return function(first) {
        return (0, exports.isEmpty)(first) ? (0, exports.copy)(second) : (0, exports.isEmpty)(second) ? (0, exports.copy)(first) : first.concat(second);
      };
    };
    exports.concatW = concatW;
    exports.concat = exports.concatW;
    function union(E2) {
      var unionE = NEA.union(E2);
      return function(first, second) {
        if (second === void 0) {
          var unionE_1 = union(E2);
          return function(second2) {
            return unionE_1(second2, first);
          };
        }
        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second) ? unionE(second)(first) : (0, exports.isNonEmpty)(first) ? (0, exports.copy)(first) : (0, exports.copy)(second);
      };
    }
    exports.union = union;
    function intersection2(E2) {
      var elemE = (0, exports.elem)(E2);
      return function(xs, ys) {
        if (ys === void 0) {
          var intersectionE_1 = intersection2(E2);
          return function(ys2) {
            return intersectionE_1(ys2, xs);
          };
        }
        return xs.filter(function(a) {
          return elemE(a, ys);
        });
      };
    }
    exports.intersection = intersection2;
    function difference(E2) {
      var elemE = (0, exports.elem)(E2);
      return function(xs, ys) {
        if (ys === void 0) {
          var differenceE_1 = difference(E2);
          return function(ys2) {
            return differenceE_1(ys2, xs);
          };
        }
        return xs.filter(function(a) {
          return !elemE(a, ys);
        });
      };
    }
    exports.difference = difference;
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
    };
    var _chain = function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chain)(f));
    };
    var _filter = function(fa, predicate) {
      return (0, function_1.pipe)(fa, (0, exports.filter)(predicate));
    };
    var _filterMap = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.filterMap)(f));
    };
    var _partition = function(fa, predicate) {
      return (0, function_1.pipe)(fa, (0, exports.partition)(predicate));
    };
    var _partitionMap = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.partitionMap)(f));
    };
    var _partitionWithIndex = function(fa, predicateWithIndex) {
      return (0, function_1.pipe)(fa, (0, exports.partitionWithIndex)(predicateWithIndex));
    };
    var _partitionMapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.partitionMapWithIndex)(f));
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports.alt)(that));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f));
    };
    var _foldMap = function(M) {
      var foldMapM = (0, exports.foldMap)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f));
    };
    var _reduceWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
    };
    var _foldMapWithIndex = function(M) {
      var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
      return function(fa, f) {
        return (0, function_1.pipe)(fa, foldMapWithIndexM(f));
      };
    };
    var _reduceRightWithIndex = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
    };
    var _filterMapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.filterMapWithIndex)(f));
    };
    var _filterWithIndex = function(fa, predicateWithIndex) {
      return (0, function_1.pipe)(fa, (0, exports.filterWithIndex)(predicateWithIndex));
    };
    var _extend = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.extend)(f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _traverseWithIndex = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseWithIndexF(f));
      };
    };
    var _chainRecDepthFirst = RA._chainRecDepthFirst;
    var _chainRecBreadthFirst = RA._chainRecBreadthFirst;
    exports.of = NEA.of;
    var zero2 = function() {
      return [];
    };
    exports.zero = zero2;
    var map3 = function(f) {
      return function(fa) {
        return fa.map(function(a) {
          return f(a);
        });
      };
    };
    exports.map = map3;
    var ap = function(fa) {
      return (0, exports.chain)(function(f) {
        return (0, function_1.pipe)(fa, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    var chain = function(f) {
      return function(ma) {
        return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function(_2, a) {
          return f(a);
        }));
      };
    };
    exports.chain = chain;
    exports.flatten = (0, exports.chain)(function_1.identity);
    var mapWithIndex = function(f) {
      return function(fa) {
        return fa.map(function(a, i) {
          return f(i, a);
        });
      };
    };
    exports.mapWithIndex = mapWithIndex;
    var filterMapWithIndex = function(f) {
      return function(fa) {
        var out = [];
        for (var i = 0; i < fa.length; i++) {
          var optionB = f(i, fa[i]);
          if (_.isSome(optionB)) {
            out.push(optionB.value);
          }
        }
        return out;
      };
    };
    exports.filterMapWithIndex = filterMapWithIndex;
    var filterMap = function(f) {
      return (0, exports.filterMapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.filterMap = filterMap;
    exports.compact = (0, exports.filterMap)(function_1.identity);
    var separate = function(fa) {
      var left = [];
      var right = [];
      for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === "Left") {
          left.push(e.left);
        } else {
          right.push(e.right);
        }
      }
      return (0, Separated_1.separated)(left, right);
    };
    exports.separate = separate;
    var filter3 = function(predicate) {
      return function(as) {
        return as.filter(predicate);
      };
    };
    exports.filter = filter3;
    var partition = function(predicate) {
      return (0, exports.partitionWithIndex)(function(_2, a) {
        return predicate(a);
      });
    };
    exports.partition = partition;
    var partitionWithIndex = function(predicateWithIndex) {
      return function(as) {
        var left = [];
        var right = [];
        for (var i = 0; i < as.length; i++) {
          var b = as[i];
          if (predicateWithIndex(i, b)) {
            right.push(b);
          } else {
            left.push(b);
          }
        }
        return (0, Separated_1.separated)(left, right);
      };
    };
    exports.partitionWithIndex = partitionWithIndex;
    var partitionMap = function(f) {
      return (0, exports.partitionMapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.partitionMap = partitionMap;
    var partitionMapWithIndex = function(f) {
      return function(fa) {
        var left = [];
        var right = [];
        for (var i = 0; i < fa.length; i++) {
          var e = f(i, fa[i]);
          if (e._tag === "Left") {
            left.push(e.left);
          } else {
            right.push(e.right);
          }
        }
        return (0, Separated_1.separated)(left, right);
      };
    };
    exports.partitionMapWithIndex = partitionMapWithIndex;
    var altW = function(that) {
      return function(fa) {
        return fa.concat(that());
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    var filterWithIndex = function(predicateWithIndex) {
      return function(as) {
        return as.filter(function(b, i) {
          return predicateWithIndex(i, b);
        });
      };
    };
    exports.filterWithIndex = filterWithIndex;
    var extend2 = function(f) {
      return function(wa) {
        return wa.map(function(_2, i) {
          return f(wa.slice(i));
        });
      };
    };
    exports.extend = extend2;
    exports.duplicate = (0, exports.extend)(function_1.identity);
    exports.foldMap = RA.foldMap;
    exports.foldMapWithIndex = RA.foldMapWithIndex;
    exports.reduce = RA.reduce;
    exports.reduceWithIndex = RA.reduceWithIndex;
    exports.reduceRight = RA.reduceRight;
    exports.reduceRightWithIndex = RA.reduceRightWithIndex;
    var traverse = function(F) {
      var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
      return function(f) {
        return traverseWithIndexF(function(_2, a) {
          return f(a);
        });
      };
    };
    exports.traverse = traverse;
    var sequence = function(F) {
      return function(ta) {
        return _reduce(ta, F.of((0, exports.zero)()), function(fas, fa) {
          return F.ap(F.map(fas, function(as) {
            return function(a) {
              return (0, function_1.pipe)(as, (0, exports.append)(a));
            };
          }), fa);
        });
      };
    };
    exports.sequence = sequence;
    var traverseWithIndex = function(F) {
      return function(f) {
        return (0, exports.reduceWithIndex)(F.of((0, exports.zero)()), function(i, fbs, a) {
          return F.ap(F.map(fbs, function(bs) {
            return function(b) {
              return (0, function_1.pipe)(bs, (0, exports.append)(b));
            };
          }), f(i, a));
        });
      };
    };
    exports.traverseWithIndex = traverseWithIndex;
    var wither = function(F) {
      var _witherF = _wither(F);
      return function(f) {
        return function(fa) {
          return _witherF(fa, f);
        };
      };
    };
    exports.wither = wither;
    var wilt = function(F) {
      var _wiltF = _wilt(F);
      return function(f) {
        return function(fa) {
          return _wiltF(fa, f);
        };
      };
    };
    exports.wilt = wilt;
    var unfold = function(b, f) {
      var out = [];
      var bb = b;
      while (true) {
        var mt = f(bb);
        if (_.isSome(mt)) {
          var _a = mt.value, a = _a[0], b_1 = _a[1];
          out.push(a);
          bb = b_1;
        } else {
          break;
        }
      }
      return out;
    };
    exports.unfold = unfold;
    exports.URI = "Array";
    exports.getShow = RA.getShow;
    var getSemigroup = function() {
      return {
        concat: function(first, second) {
          return first.concat(second);
        }
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function() {
      return {
        concat: (0, exports.getSemigroup)().concat,
        empty: []
      };
    };
    exports.getMonoid = getMonoid;
    exports.getEq = RA.getEq;
    exports.getOrd = RA.getOrd;
    var getUnionSemigroup = function(E2) {
      var unionE = union(E2);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    var getUnionMonoid = function(E2) {
      return {
        concat: (0, exports.getUnionSemigroup)(E2).concat,
        empty: []
      };
    };
    exports.getUnionMonoid = getUnionMonoid;
    var getIntersectionSemigroup = function(E2) {
      var intersectionE = intersection2(E2);
      return {
        concat: function(first, second) {
          return intersectionE(second)(first);
        }
      };
    };
    exports.getIntersectionSemigroup = getIntersectionSemigroup;
    var getDifferenceMagma = function(E2) {
      var differenceE = difference(E2);
      return {
        concat: function(first, second) {
          return differenceE(second)(first);
        }
      };
    };
    exports.getDifferenceMagma = getDifferenceMagma;
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map2,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain
    };
    exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
    exports.Monad = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: _chain
    };
    exports.Unfoldable = {
      URI: exports.URI,
      unfold: exports.unfold
    };
    exports.Alt = {
      URI: exports.URI,
      map: _map2,
      alt: _alt
    };
    exports.Zero = {
      URI: exports.URI,
      zero: exports.zero
    };
    exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
    exports.Alternative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      alt: _alt,
      zero: exports.zero
    };
    exports.Extend = {
      URI: exports.URI,
      map: _map2,
      extend: _extend
    };
    exports.Compactable = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate
    };
    exports.Filterable = {
      URI: exports.URI,
      map: _map2,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap
    };
    exports.FilterableWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      partitionMapWithIndex: _partitionMapWithIndex,
      partitionWithIndex: _partitionWithIndex,
      filterMapWithIndex: _filterMapWithIndex,
      filterWithIndex: _filterWithIndex
    };
    exports.Foldable = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    exports.FoldableWithIndex = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex
    };
    exports.Traversable = {
      URI: exports.URI,
      map: _map2,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map2,
      mapWithIndex: _mapWithIndex,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverse: _traverse,
      sequence: exports.sequence,
      traverseWithIndex: _traverseWithIndex
    };
    var _wither = /* @__PURE__ */ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
    var _wilt = /* @__PURE__ */ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
    exports.Witherable = {
      URI: exports.URI,
      map: _map2,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      wither: _wither,
      wilt: _wilt
    };
    exports.chainRecDepthFirst = RA.chainRecDepthFirst;
    exports.ChainRecDepthFirst = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain,
      chainRec: _chainRecDepthFirst
    };
    exports.chainRecBreadthFirst = RA.chainRecBreadthFirst;
    exports.ChainRecBreadthFirst = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: _chain,
      chainRec: _chainRecBreadthFirst
    };
    exports.filterE = (0, Witherable_1.filterE)(exports.Witherable);
    exports.FromEither = {
      URI: exports.URI,
      fromEither: exports.fromEither
    };
    exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
    exports.unsafeInsertAt = NEA.unsafeInsertAt;
    var unsafeUpdateAt = function(i, a, as) {
      return (0, exports.isNonEmpty)(as) ? NEA.unsafeUpdateAt(i, a, as) : [];
    };
    exports.unsafeUpdateAt = unsafeUpdateAt;
    var unsafeDeleteAt = function(i, as) {
      var xs = as.slice();
      xs.splice(i, 1);
      return xs;
    };
    exports.unsafeDeleteAt = unsafeDeleteAt;
    exports.every = RA.every;
    var some = function(predicate) {
      return function(as) {
        return as.some(predicate);
      };
    };
    exports.some = some;
    exports.exists = exports.some;
    exports.intercalate = RA.intercalate;
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.range = NEA.range;
    exports.empty = [];
    exports.cons = NEA.cons;
    exports.snoc = NEA.snoc;
    exports.prependToAll = exports.prependAll;
    exports.array = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: _chain,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      mapWithIndex: _mapWithIndex,
      partitionMapWithIndex: _partitionMapWithIndex,
      partitionWithIndex: _partitionWithIndex,
      filterMapWithIndex: _filterMapWithIndex,
      filterWithIndex: _filterWithIndex,
      alt: _alt,
      zero: exports.zero,
      unfold: exports.unfold,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      reduceWithIndex: _reduceWithIndex,
      foldMapWithIndex: _foldMapWithIndex,
      reduceRightWithIndex: _reduceRightWithIndex,
      traverseWithIndex: _traverseWithIndex,
      extend: _extend,
      wither: _wither,
      wilt: _wilt
    };
  }
});

// node_modules/fp-ts/lib/string.js
var require_string = __commonJS({
  "node_modules/fp-ts/lib/string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.endsWith = exports.startsWith = exports.includes = exports.split = exports.size = exports.isEmpty = exports.slice = exports.trimRight = exports.trimLeft = exports.trim = exports.replace = exports.toLowerCase = exports.toUpperCase = exports.isString = exports.Show = exports.Ord = exports.Monoid = exports.empty = exports.Semigroup = exports.Eq = void 0;
    var ReadonlyNonEmptyArray_1 = require_ReadonlyNonEmptyArray();
    exports.Eq = {
      equals: function(first, second) {
        return first === second;
      }
    };
    exports.Semigroup = {
      concat: function(first, second) {
        return first + second;
      }
    };
    exports.empty = "";
    exports.Monoid = {
      concat: exports.Semigroup.concat,
      empty: exports.empty
    };
    exports.Ord = {
      equals: exports.Eq.equals,
      compare: function(first, second) {
        return first < second ? -1 : first > second ? 1 : 0;
      }
    };
    exports.Show = {
      show: function(s) {
        return JSON.stringify(s);
      }
    };
    var isString = function(u) {
      return typeof u === "string";
    };
    exports.isString = isString;
    var toUpperCase = function(s) {
      return s.toUpperCase();
    };
    exports.toUpperCase = toUpperCase;
    var toLowerCase = function(s) {
      return s.toLowerCase();
    };
    exports.toLowerCase = toLowerCase;
    var replace = function(searchValue, replaceValue) {
      return function(s) {
        return s.replace(searchValue, replaceValue);
      };
    };
    exports.replace = replace;
    var trim = function(s) {
      return s.trim();
    };
    exports.trim = trim;
    var trimLeft = function(s) {
      return s.trimLeft();
    };
    exports.trimLeft = trimLeft;
    var trimRight = function(s) {
      return s.trimRight();
    };
    exports.trimRight = trimRight;
    var slice = function(start3, end) {
      return function(s) {
        return s.slice(start3, end);
      };
    };
    exports.slice = slice;
    var isEmpty7 = function(s) {
      return s.length === 0;
    };
    exports.isEmpty = isEmpty7;
    var size = function(s) {
      return s.length;
    };
    exports.size = size;
    var split = function(separator) {
      return function(s) {
        var out = s.split(separator);
        return (0, ReadonlyNonEmptyArray_1.isNonEmpty)(out) ? out : [s];
      };
    };
    exports.split = split;
    var includes = function(searchString, position) {
      return function(s) {
        return s.includes(searchString, position);
      };
    };
    exports.includes = includes;
    var startsWith = function(searchString, position) {
      return function(s) {
        return s.startsWith(searchString, position);
      };
    };
    exports.startsWith = startsWith;
    var endsWith = function(searchString, position) {
      return function(s) {
        return s.endsWith(searchString, position);
      };
    };
    exports.endsWith = endsWith;
  }
});

// node_modules/rxjs/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/rxjs/node_modules/tslib/tslib.js"(exports, module) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __createBinding2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends2 = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t4) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t4[p] = s[p];
        }
        return t4;
      };
      __rest2 = function(s, e) {
        var t4 = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t4[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t4[p[i]] = s[p[i]];
          }
        return t4;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t4[0] & 1)
            throw t4[1];
          return t4[1];
        }, trys: [], ops: [] }, f, y, t4, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t4 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t4 = y["return"]) && t4.call(y), 0) : y.next) && !(t4 = t4.call(y, op[1])).done)
                return t4;
              if (y = 0, t4)
                op = [op[0] & 2, t4.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t4 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t4 = _.trys, t4 = t4.length > 0 && t4[t4.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t4 || op[1] > t4[0] && op[1] < t4[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t4[1]) {
                    _.label = t4[1];
                    t4 = op;
                    break;
                  }
                  if (t4 && _.label < t4[2]) {
                    _.label = t4[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t4[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t4 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m, p);
      };
      __createBinding2 = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values2 = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray2 = function(to, from2, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from2.length, ar; i < l; i++) {
            if (ar || !(i in from2)) {
              if (!ar)
                ar = Array.prototype.slice.call(from2, 0, i);
              ar[i] = from2[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from2));
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
    });
  }
});

// node_modules/json5/dist/index.js
var require_dist = __commonJS({
  "node_modules/json5/dist/index.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.JSON5 = factory();
    })(exports, function() {
      "use strict";
      function createCommonjsModule(fn, module2) {
        return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
      }
      var _global = createCommonjsModule(function(module2) {
        var global2 = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
        if (typeof __g == "number") {
          __g = global2;
        }
      });
      var _core = createCommonjsModule(function(module2) {
        var core = module2.exports = { version: "2.6.5" };
        if (typeof __e == "number") {
          __e = core;
        }
      });
      var _core_1 = _core.version;
      var _isObject = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
      };
      var _anObject = function(it) {
        if (!_isObject(it)) {
          throw TypeError(it + " is not an object!");
        }
        return it;
      };
      var _fails = function(exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };
      var _descriptors = !_fails(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
      var document2 = _global.document;
      var is = _isObject(document2) && _isObject(document2.createElement);
      var _domCreate = function(it) {
        return is ? document2.createElement(it) : {};
      };
      var _ie8DomDefine = !_descriptors && !_fails(function() {
        return Object.defineProperty(_domCreate("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
      var _toPrimitive = function(it, S2) {
        if (!_isObject(it)) {
          return it;
        }
        var fn, val;
        if (S2 && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        if (!S2 && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        throw TypeError("Can't convert object to primitive value");
      };
      var dP = Object.defineProperty;
      var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine) {
          try {
            return dP(O, P, Attributes);
          } catch (e) {
          }
        }
        if ("get" in Attributes || "set" in Attributes) {
          throw TypeError("Accessors not supported!");
        }
        if ("value" in Attributes) {
          O[P] = Attributes.value;
        }
        return O;
      };
      var _objectDp = {
        f
      };
      var _propertyDesc = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value
        };
      };
      var _hide = _descriptors ? function(object, key2, value) {
        return _objectDp.f(object, key2, _propertyDesc(1, value));
      } : function(object, key2, value) {
        object[key2] = value;
        return object;
      };
      var hasOwnProperty = {}.hasOwnProperty;
      var _has = function(it, key2) {
        return hasOwnProperty.call(it, key2);
      };
      var id = 0;
      var px = Math.random();
      var _uid = function(key2) {
        return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
      };
      var _library = false;
      var _shared = createCommonjsModule(function(module2) {
        var SHARED = "__core-js_shared__";
        var store = _global[SHARED] || (_global[SHARED] = {});
        (module2.exports = function(key2, value) {
          return store[key2] || (store[key2] = value !== void 0 ? value : {});
        })("versions", []).push({
          version: _core.version,
          mode: _library ? "pure" : "global",
          copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
        });
      });
      var _functionToString = _shared("native-function-to-string", Function.toString);
      var _redefine = createCommonjsModule(function(module2) {
        var SRC = _uid("src");
        var TO_STRING = "toString";
        var TPL = ("" + _functionToString).split(TO_STRING);
        _core.inspectSource = function(it) {
          return _functionToString.call(it);
        };
        (module2.exports = function(O, key2, val, safe) {
          var isFunction2 = typeof val == "function";
          if (isFunction2) {
            _has(val, "name") || _hide(val, "name", key2);
          }
          if (O[key2] === val) {
            return;
          }
          if (isFunction2) {
            _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
          }
          if (O === _global) {
            O[key2] = val;
          } else if (!safe) {
            delete O[key2];
            _hide(O, key2, val);
          } else if (O[key2]) {
            O[key2] = val;
          } else {
            _hide(O, key2, val);
          }
        })(Function.prototype, TO_STRING, function toString6() {
          return typeof this == "function" && this[SRC] || _functionToString.call(this);
        });
      });
      var _aFunction = function(it) {
        if (typeof it != "function") {
          throw TypeError(it + " is not a function!");
        }
        return it;
      };
      var _ctx = function(fn, that, length5) {
        _aFunction(fn);
        if (that === void 0) {
          return fn;
        }
        switch (length5) {
          case 1:
            return function(a) {
              return fn.call(that, a);
            };
          case 2:
            return function(a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function(a, b, c2) {
              return fn.call(that, a, b, c2);
            };
        }
        return function() {
          return fn.apply(that, arguments);
        };
      };
      var PROTOTYPE = "prototype";
      var $export = function(type, name, source2) {
        var IS_FORCED = type & $export.F;
        var IS_GLOBAL = type & $export.G;
        var IS_STATIC = type & $export.S;
        var IS_PROTO = type & $export.P;
        var IS_BIND = type & $export.B;
        var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
        var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
        var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
        var key2, own, out, exp;
        if (IS_GLOBAL) {
          source2 = name;
        }
        for (key2 in source2) {
          own = !IS_FORCED && target && target[key2] !== void 0;
          out = (own ? target : source2)[key2];
          exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
          if (target) {
            _redefine(target, key2, out, type & $export.U);
          }
          if (exports2[key2] != out) {
            _hide(exports2, key2, exp);
          }
          if (IS_PROTO && expProto[key2] != out) {
            expProto[key2] = out;
          }
        }
      };
      _global.core = _core;
      $export.F = 1;
      $export.G = 2;
      $export.S = 4;
      $export.P = 8;
      $export.B = 16;
      $export.W = 32;
      $export.U = 64;
      $export.R = 128;
      var _export = $export;
      var ceil = Math.ceil;
      var floor = Math.floor;
      var _toInteger = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
      };
      var _defined = function(it) {
        if (it == void 0) {
          throw TypeError("Can't call method on  " + it);
        }
        return it;
      };
      var _stringAt = function(TO_STRING) {
        return function(that, pos2) {
          var s = String(_defined(that));
          var i = _toInteger(pos2);
          var l = s.length;
          var a, b;
          if (i < 0 || i >= l) {
            return TO_STRING ? "" : void 0;
          }
          a = s.charCodeAt(i);
          return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
        };
      };
      var $at = _stringAt(false);
      _export(_export.P, "String", {
        codePointAt: function codePointAt2(pos2) {
          return $at(this, pos2);
        }
      });
      var codePointAt = _core.String.codePointAt;
      var max4 = Math.max;
      var min4 = Math.min;
      var _toAbsoluteIndex = function(index, length5) {
        index = _toInteger(index);
        return index < 0 ? max4(index + length5, 0) : min4(index, length5);
      };
      var fromCharCode = String.fromCharCode;
      var $fromCodePoint = String.fromCodePoint;
      _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
        fromCodePoint: function fromCodePoint2(x) {
          var arguments$1 = arguments;
          var res = [];
          var aLen = arguments.length;
          var i = 0;
          var code;
          while (aLen > i) {
            code = +arguments$1[i++];
            if (_toAbsoluteIndex(code, 1114111) !== code) {
              throw RangeError(code + " is not a valid code point");
            }
            res.push(
              code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320)
            );
          }
          return res.join("");
        }
      });
      var fromCodePoint = _core.String.fromCodePoint;
      var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
      var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
      var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
      var unicode = {
        Space_Separator,
        ID_Start,
        ID_Continue
      };
      var util = {
        isSpaceSeparator: function isSpaceSeparator(c2) {
          return typeof c2 === "string" && unicode.Space_Separator.test(c2);
        },
        isIdStartChar: function isIdStartChar(c2) {
          return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
        },
        isIdContinueChar: function isIdContinueChar(c2) {
          return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
        },
        isDigit: function isDigit(c2) {
          return typeof c2 === "string" && /[0-9]/.test(c2);
        },
        isHexDigit: function isHexDigit(c2) {
          return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
        }
      };
      var source;
      var parseState;
      var stack2;
      var pos;
      var line3;
      var column;
      var token;
      var key;
      var root;
      var parse = function parse2(text2, reviver) {
        source = String(text2);
        parseState = "start";
        stack2 = [];
        pos = 0;
        line3 = 1;
        column = 0;
        token = void 0;
        key = void 0;
        root = void 0;
        do {
          token = lex();
          parseStates[parseState]();
        } while (token.type !== "eof");
        if (typeof reviver === "function") {
          return internalize({ "": root }, "", reviver);
        }
        return root;
      };
      function internalize(holder, name, reviver) {
        var value = holder[name];
        if (value != null && typeof value === "object") {
          for (var key2 in value) {
            var replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              value[key2] = replacement;
            }
          }
        }
        return reviver.call(holder, name, value);
      }
      var lexState;
      var buffer;
      var doubleQuote;
      var sign;
      var c;
      function lex() {
        lexState = "default";
        buffer = "";
        doubleQuote = false;
        sign = 1;
        for (; ; ) {
          c = peek3();
          var token2 = lexStates[lexState]();
          if (token2) {
            return token2;
          }
        }
      }
      function peek3() {
        if (source[pos]) {
          return String.fromCodePoint(source.codePointAt(pos));
        }
      }
      function read() {
        var c2 = peek3();
        if (c2 === "\n") {
          line3++;
          column = 0;
        } else if (c2) {
          column += c2.length;
        } else {
          column++;
        }
        if (c2) {
          pos += c2.length;
        }
        return c2;
      }
      var lexStates = {
        default: function default$1() {
          switch (c) {
            case "	":
            case "\v":
            case "\f":
            case " ":
            case "\xA0":
            case "\uFEFF":
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              read();
              return;
            case "/":
              read();
              lexState = "comment";
              return;
            case void 0:
              read();
              return newToken("eof");
          }
          if (util.isSpaceSeparator(c)) {
            read();
            return;
          }
          return lexStates[parseState]();
        },
        comment: function comment() {
          switch (c) {
            case "*":
              read();
              lexState = "multiLineComment";
              return;
            case "/":
              read();
              lexState = "singleLineComment";
              return;
          }
          throw invalidChar(read());
        },
        multiLineComment: function multiLineComment() {
          switch (c) {
            case "*":
              read();
              lexState = "multiLineCommentAsterisk";
              return;
            case void 0:
              throw invalidChar(read());
          }
          read();
        },
        multiLineCommentAsterisk: function multiLineCommentAsterisk() {
          switch (c) {
            case "*":
              read();
              return;
            case "/":
              read();
              lexState = "default";
              return;
            case void 0:
              throw invalidChar(read());
          }
          read();
          lexState = "multiLineComment";
        },
        singleLineComment: function singleLineComment() {
          switch (c) {
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              read();
              lexState = "default";
              return;
            case void 0:
              read();
              return newToken("eof");
          }
          read();
        },
        value: function value() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
            case "n":
              read();
              literal("ull");
              return newToken("null", null);
            case "t":
              read();
              literal("rue");
              return newToken("boolean", true);
            case "f":
              read();
              literal("alse");
              return newToken("boolean", false);
            case "-":
            case "+":
              if (read() === "-") {
                sign = -1;
              }
              lexState = "sign";
              return;
            case ".":
              buffer = read();
              lexState = "decimalPointLeading";
              return;
            case "0":
              buffer = read();
              lexState = "zero";
              return;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              buffer = read();
              lexState = "decimalInteger";
              return;
            case "I":
              read();
              literal("nfinity");
              return newToken("numeric", Infinity);
            case "N":
              read();
              literal("aN");
              return newToken("numeric", NaN);
            case '"':
            case "'":
              doubleQuote = read() === '"';
              buffer = "";
              lexState = "string";
              return;
          }
          throw invalidChar(read());
        },
        identifierNameStartEscape: function identifierNameStartEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          var u = unicodeEscape();
          switch (u) {
            case "$":
            case "_":
              break;
            default:
              if (!util.isIdStartChar(u)) {
                throw invalidIdentifier();
              }
              break;
          }
          buffer += u;
          lexState = "identifierName";
        },
        identifierName: function identifierName() {
          switch (c) {
            case "$":
            case "_":
            case "\u200C":
            case "\u200D":
              buffer += read();
              return;
            case "\\":
              read();
              lexState = "identifierNameEscape";
              return;
          }
          if (util.isIdContinueChar(c)) {
            buffer += read();
            return;
          }
          return newToken("identifier", buffer);
        },
        identifierNameEscape: function identifierNameEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          var u = unicodeEscape();
          switch (u) {
            case "$":
            case "_":
            case "\u200C":
            case "\u200D":
              break;
            default:
              if (!util.isIdContinueChar(u)) {
                throw invalidIdentifier();
              }
              break;
          }
          buffer += u;
          lexState = "identifierName";
        },
        sign: function sign$1() {
          switch (c) {
            case ".":
              buffer = read();
              lexState = "decimalPointLeading";
              return;
            case "0":
              buffer = read();
              lexState = "zero";
              return;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              buffer = read();
              lexState = "decimalInteger";
              return;
            case "I":
              read();
              literal("nfinity");
              return newToken("numeric", sign * Infinity);
            case "N":
              read();
              literal("aN");
              return newToken("numeric", NaN);
          }
          throw invalidChar(read());
        },
        zero: function zero2() {
          switch (c) {
            case ".":
              buffer += read();
              lexState = "decimalPoint";
              return;
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
            case "x":
            case "X":
              buffer += read();
              lexState = "hexadecimal";
              return;
          }
          return newToken("numeric", sign * 0);
        },
        decimalInteger: function decimalInteger() {
          switch (c) {
            case ".":
              buffer += read();
              lexState = "decimalPoint";
              return;
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalPointLeading: function decimalPointLeading() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          throw invalidChar(read());
        },
        decimalPoint: function decimalPoint() {
          switch (c) {
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalFraction: function decimalFraction() {
          switch (c) {
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalExponent: function decimalExponent() {
          switch (c) {
            case "+":
            case "-":
              buffer += read();
              lexState = "decimalExponentSign";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentSign: function decimalExponentSign() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentInteger: function decimalExponentInteger() {
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        hexadecimal: function hexadecimal() {
          if (util.isHexDigit(c)) {
            buffer += read();
            lexState = "hexadecimalInteger";
            return;
          }
          throw invalidChar(read());
        },
        hexadecimalInteger: function hexadecimalInteger() {
          if (util.isHexDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        string: function string2() {
          switch (c) {
            case "\\":
              read();
              buffer += escape();
              return;
            case '"':
              if (doubleQuote) {
                read();
                return newToken("string", buffer);
              }
              buffer += read();
              return;
            case "'":
              if (!doubleQuote) {
                read();
                return newToken("string", buffer);
              }
              buffer += read();
              return;
            case "\n":
            case "\r":
              throw invalidChar(read());
            case "\u2028":
            case "\u2029":
              separatorChar(c);
              break;
            case void 0:
              throw invalidChar(read());
          }
          buffer += read();
        },
        start: function start3() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
          }
          lexState = "value";
        },
        beforePropertyName: function beforePropertyName() {
          switch (c) {
            case "$":
            case "_":
              buffer = read();
              lexState = "identifierName";
              return;
            case "\\":
              read();
              lexState = "identifierNameStartEscape";
              return;
            case "}":
              return newToken("punctuator", read());
            case '"':
            case "'":
              doubleQuote = read() === '"';
              lexState = "string";
              return;
          }
          if (util.isIdStartChar(c)) {
            buffer += read();
            lexState = "identifierName";
            return;
          }
          throw invalidChar(read());
        },
        afterPropertyName: function afterPropertyName() {
          if (c === ":") {
            return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforePropertyValue: function beforePropertyValue() {
          lexState = "value";
        },
        afterPropertyValue: function afterPropertyValue() {
          switch (c) {
            case ",":
            case "}":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforeArrayValue: function beforeArrayValue() {
          if (c === "]") {
            return newToken("punctuator", read());
          }
          lexState = "value";
        },
        afterArrayValue: function afterArrayValue() {
          switch (c) {
            case ",":
            case "]":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        end: function end() {
          throw invalidChar(read());
        }
      };
      function newToken(type, value) {
        return {
          type,
          value,
          line: line3,
          column
        };
      }
      function literal(s) {
        for (var i = 0, list = s; i < list.length; i += 1) {
          var c2 = list[i];
          var p = peek3();
          if (p !== c2) {
            throw invalidChar(read());
          }
          read();
        }
      }
      function escape() {
        var c2 = peek3();
        switch (c2) {
          case "b":
            read();
            return "\b";
          case "f":
            read();
            return "\f";
          case "n":
            read();
            return "\n";
          case "r":
            read();
            return "\r";
          case "t":
            read();
            return "	";
          case "v":
            read();
            return "\v";
          case "0":
            read();
            if (util.isDigit(peek3())) {
              throw invalidChar(read());
            }
            return "\0";
          case "x":
            read();
            return hexEscape();
          case "u":
            read();
            return unicodeEscape();
          case "\n":
          case "\u2028":
          case "\u2029":
            read();
            return "";
          case "\r":
            read();
            if (peek3() === "\n") {
              read();
            }
            return "";
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            throw invalidChar(read());
          case void 0:
            throw invalidChar(read());
        }
        return read();
      }
      function hexEscape() {
        var buffer2 = "";
        var c2 = peek3();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
        c2 = peek3();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      function unicodeEscape() {
        var buffer2 = "";
        var count = 4;
        while (count-- > 0) {
          var c2 = peek3();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
        }
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      var parseStates = {
        start: function start3() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push2();
        },
        beforePropertyName: function beforePropertyName() {
          switch (token.type) {
            case "identifier":
            case "string":
              key = token.value;
              parseState = "afterPropertyName";
              return;
            case "punctuator":
              pop2();
              return;
            case "eof":
              throw invalidEOF();
          }
        },
        afterPropertyName: function afterPropertyName() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          parseState = "beforePropertyValue";
        },
        beforePropertyValue: function beforePropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push2();
        },
        beforeArrayValue: function beforeArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          if (token.type === "punctuator" && token.value === "]") {
            pop2();
            return;
          }
          push2();
        },
        afterPropertyValue: function afterPropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          switch (token.value) {
            case ",":
              parseState = "beforePropertyName";
              return;
            case "}":
              pop2();
          }
        },
        afterArrayValue: function afterArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          switch (token.value) {
            case ",":
              parseState = "beforeArrayValue";
              return;
            case "]":
              pop2();
          }
        },
        end: function end() {
        }
      };
      function push2() {
        var value;
        switch (token.type) {
          case "punctuator":
            switch (token.value) {
              case "{":
                value = {};
                break;
              case "[":
                value = [];
                break;
            }
            break;
          case "null":
          case "boolean":
          case "numeric":
          case "string":
            value = token.value;
            break;
        }
        if (root === void 0) {
          root = value;
        } else {
          var parent = stack2[stack2.length - 1];
          if (Array.isArray(parent)) {
            parent.push(value);
          } else {
            parent[key] = value;
          }
        }
        if (value !== null && typeof value === "object") {
          stack2.push(value);
          if (Array.isArray(value)) {
            parseState = "beforeArrayValue";
          } else {
            parseState = "beforePropertyName";
          }
        } else {
          var current = stack2[stack2.length - 1];
          if (current == null) {
            parseState = "end";
          } else if (Array.isArray(current)) {
            parseState = "afterArrayValue";
          } else {
            parseState = "afterPropertyValue";
          }
        }
      }
      function pop2() {
        stack2.pop();
        var current = stack2[stack2.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
      function invalidChar(c2) {
        if (c2 === void 0) {
          return syntaxError("JSON5: invalid end of input at " + line3 + ":" + column);
        }
        return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line3 + ":" + column);
      }
      function invalidEOF() {
        return syntaxError("JSON5: invalid end of input at " + line3 + ":" + column);
      }
      function invalidIdentifier() {
        column -= 5;
        return syntaxError("JSON5: invalid identifier character at " + line3 + ":" + column);
      }
      function separatorChar(c2) {
        console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
      }
      function formatChar(c2) {
        var replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        if (replacements[c2]) {
          return replacements[c2];
        }
        if (c2 < " ") {
          var hexString = c2.charCodeAt(0).toString(16);
          return "\\x" + ("00" + hexString).substring(hexString.length);
        }
        return c2;
      }
      function syntaxError(message) {
        var err = new SyntaxError(message);
        err.lineNumber = line3;
        err.columnNumber = column;
        return err;
      }
      var stringify = function stringify2(value, replacer, space) {
        var stack3 = [];
        var indent = "";
        var propertyList;
        var replacerFunc;
        var gap = "";
        var quote;
        if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
          space = replacer.space;
          quote = replacer.quote;
          replacer = replacer.replacer;
        }
        if (typeof replacer === "function") {
          replacerFunc = replacer;
        } else if (Array.isArray(replacer)) {
          propertyList = [];
          for (var i = 0, list = replacer; i < list.length; i += 1) {
            var v = list[i];
            var item = void 0;
            if (typeof v === "string") {
              item = v;
            } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
              item = String(v);
            }
            if (item !== void 0 && propertyList.indexOf(item) < 0) {
              propertyList.push(item);
            }
          }
        }
        if (space instanceof Number) {
          space = Number(space);
        } else if (space instanceof String) {
          space = String(space);
        }
        if (typeof space === "number") {
          if (space > 0) {
            space = Math.min(10, Math.floor(space));
            gap = "          ".substr(0, space);
          }
        } else if (typeof space === "string") {
          gap = space.substr(0, 10);
        }
        return serializeProperty("", { "": value });
        function serializeProperty(key2, holder) {
          var value2 = holder[key2];
          if (value2 != null) {
            if (typeof value2.toJSON5 === "function") {
              value2 = value2.toJSON5(key2);
            } else if (typeof value2.toJSON === "function") {
              value2 = value2.toJSON(key2);
            }
          }
          if (replacerFunc) {
            value2 = replacerFunc.call(holder, key2, value2);
          }
          if (value2 instanceof Number) {
            value2 = Number(value2);
          } else if (value2 instanceof String) {
            value2 = String(value2);
          } else if (value2 instanceof Boolean) {
            value2 = value2.valueOf();
          }
          switch (value2) {
            case null:
              return "null";
            case true:
              return "true";
            case false:
              return "false";
          }
          if (typeof value2 === "string") {
            return quoteString(value2, false);
          }
          if (typeof value2 === "number") {
            return String(value2);
          }
          if (typeof value2 === "object") {
            return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
          }
          return void 0;
        }
        function quoteString(value2) {
          var quotes = {
            "'": 0.1,
            '"': 0.2
          };
          var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
          };
          var product = "";
          for (var i2 = 0; i2 < value2.length; i2++) {
            var c2 = value2[i2];
            switch (c2) {
              case "'":
              case '"':
                quotes[c2]++;
                product += c2;
                continue;
              case "\0":
                if (util.isDigit(value2[i2 + 1])) {
                  product += "\\x00";
                  continue;
                }
            }
            if (replacements[c2]) {
              product += replacements[c2];
              continue;
            }
            if (c2 < " ") {
              var hexString = c2.charCodeAt(0).toString(16);
              product += "\\x" + ("00" + hexString).substring(hexString.length);
              continue;
            }
            product += c2;
          }
          var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
            return quotes[a] < quotes[b] ? a : b;
          });
          product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
          return quoteChar + product + quoteChar;
        }
        function serializeObject(value2) {
          if (stack3.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack3.push(value2);
          var stepback = indent;
          indent = indent + gap;
          var keys = propertyList || Object.keys(value2);
          var partial = [];
          for (var i2 = 0, list2 = keys; i2 < list2.length; i2 += 1) {
            var key2 = list2[i2];
            var propertyString = serializeProperty(key2, value2);
            if (propertyString !== void 0) {
              var member = serializeKey(key2) + ":";
              if (gap !== "") {
                member += " ";
              }
              member += propertyString;
              partial.push(member);
            }
          }
          var final;
          if (partial.length === 0) {
            final = "{}";
          } else {
            var properties;
            if (gap === "") {
              properties = partial.join(",");
              final = "{" + properties + "}";
            } else {
              var separator = ",\n" + indent;
              properties = partial.join(separator);
              final = "{\n" + indent + properties + ",\n" + stepback + "}";
            }
          }
          stack3.pop();
          indent = stepback;
          return final;
        }
        function serializeKey(key2) {
          if (key2.length === 0) {
            return quoteString(key2, true);
          }
          var firstChar = String.fromCodePoint(key2.codePointAt(0));
          if (!util.isIdStartChar(firstChar)) {
            return quoteString(key2, true);
          }
          for (var i2 = firstChar.length; i2 < key2.length; i2++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
              return quoteString(key2, true);
            }
          }
          return key2;
        }
        function serializeArray(value2) {
          if (stack3.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack3.push(value2);
          var stepback = indent;
          indent = indent + gap;
          var partial = [];
          for (var i2 = 0; i2 < value2.length; i2++) {
            var propertyString = serializeProperty(String(i2), value2);
            partial.push(propertyString !== void 0 ? propertyString : "null");
          }
          var final;
          if (partial.length === 0) {
            final = "[]";
          } else {
            if (gap === "") {
              var properties = partial.join(",");
              final = "[" + properties + "]";
            } else {
              var separator = ",\n" + indent;
              var properties$1 = partial.join(separator);
              final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
            }
          }
          stack3.pop();
          indent = stepback;
          return final;
        }
      };
      var JSON52 = {
        parse,
        stringify
      };
      var lib = JSON52;
      var es5 = lib;
      return es5;
    });
  }
});

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  byValueString: () => byValueString,
  getSorter: () => getSorter,
  minMaxAvg: () => minMaxAvg2,
  sortByKey: () => sortByKey,
  sortByValueNumber: () => sortByValueNumber,
  sortByValueString: () => sortByValueString
});
var import_Array = __toESM(require_Array(), 1);
var import_function = __toESM(require_function(), 1);
var S = __toESM(require_string(), 1);
var N = __toESM(require_number(), 1);
var import_Ord = __toESM(require_Ord(), 1);

// src/collections/Arrays.ts
var Arrays_exports = {};
__export(Arrays_exports, {
  areValuesIdentical: () => areValuesIdentical,
  average: () => average,
  averageWeighted: () => averageWeighted,
  chunks: () => chunks,
  dotProduct: () => dotProduct,
  ensureLength: () => ensureLength,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  interleave: () => interleave,
  intersection: () => intersection,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  mergeByKey: () => mergeByKey2,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  pushUnique: () => pushUnique,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  reducePairwise: () => reducePairwise,
  remove: () => remove2,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  total: () => total,
  totalFast: () => totalFast,
  until: () => until,
  validNumbers: () => validNumbers,
  weight: () => weight,
  without: () => without,
  zip: () => zip
});

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  defaultRandom: () => defaultRandom,
  float: () => float,
  gaussian: () => gaussian2,
  gaussianSkewed: () => gaussianSkewed,
  hue: () => randomHue,
  integer: () => integer2,
  shortGuid: () => shortGuid,
  string: () => string,
  weighted: () => weighted,
  weightedInteger: () => weightedInteger,
  weightedSkewed: () => weightedSkewed
});

// src/modulation/Easing.ts
var Easing_exports = {};
__export(Easing_exports, {
  crossfade: () => crossfade,
  fromCubicBezier: () => fromCubicBezier,
  functions: () => functions,
  gaussian: () => gaussian,
  get: () => get,
  getEasings: () => getEasings,
  mix: () => mix,
  tick: () => tick,
  time: () => time
});

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Correlate: () => Correlate_exports,
  FrequencyMutable: () => FrequencyMutable,
  IntervalTracker: () => IntervalTracker,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  PointTracker: () => PointTracker,
  Pool: () => Pool_exports,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate7,
  interpolateAngle: () => interpolateAngle,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  numberTracker: () => numberTracker,
  piPi: () => piPi9,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/data/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array2,
  stream: () => stream
});

// src/collections/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn === void 0 ? (x) => x : fn;
  return validNumbers(data).map((v, index) => v * f(index / (validNumbers.length - 1)));
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values) => {
  let r = 0;
  const len = values[0].length;
  for (let i = 0; i < len; i++) {
    let t4 = 0;
    for (let p = 0; p < values.length; p++) {
      if (p === 0)
        t4 = values[p][i];
      else {
        t4 *= values[p][i];
      }
    }
    r += t4;
  }
  return r;
};
var average = (data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total3 = valid.reduce((acc, v) => acc + v, 0);
  return total3 / valid.length;
};
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`)
    weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce((acc, v) => [acc[0] + v[0] * v[1], acc[1] + v[1]], [0, 0]);
  return totalV / totalW;
};
var min = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => data.reduce((bestIndex, value, index, arr) => value > arr[bestIndex] ? index : bestIndex, 0);
var minIndex = (...data) => data.reduce((bestIndex, value, index, arr) => value < arr[bestIndex] ? index : bestIndex, 0);
var max = (data) => Math.max(...validNumbers(data));
var total = (data) => data.reduce((prev, curr) => {
  if (typeof curr !== `number`)
    return prev;
  if (Number.isNaN(curr))
    return prev;
  if (Number.isFinite(curr))
    return prev;
  return prev + curr;
}, 0);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < data.length; i++) {
    m = Math.max(m, data[i]);
  }
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (let i = 0; i < data.length; i++) {
    m += data[i];
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < data.length; i++) {
    m = Math.min(m, data[i]);
  }
  return m;
};
var minMaxAvg = (data, startIndex, endIndex) => {
  if (data === void 0)
    throw new Error(`'data' is undefined`);
  if (!Array.isArray(data))
    throw new Error(`'data' parameter is not an array`);
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  if (startIndex === void 0)
    startIndex = 0;
  if (endIndex === void 0)
    endIndex = data.length - 1;
  const validNumbers2 = filterBetween(data, (d) => typeof d === `number` && !Number.isNaN(d), startIndex, endIndex);
  const total3 = validNumbers2.reduce((acc, v) => acc + v, 0);
  return {
    total: total3,
    max: Math.max(...validNumbers2),
    min: Math.min(...validNumbers2),
    avg: total3 / validNumbers2.length
  };
};

// src/data/Scale.ts
var scale = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0)
    outMax = 1;
  if (outMin === void 0)
    outMin = 0;
  if (inMin === inMax)
    return outMax;
  let a = (v - inMin) / (inMax - inMin);
  if (easing !== void 0)
    a = easing(a);
  return a * (outMax - outMin) + outMin;
};
var scaleClamped = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0)
    outMax = 1;
  if (outMin === void 0)
    outMin = 0;
  if (inMin === inMax)
    return outMax;
  const x = scale(v, inMin, inMax, outMin, outMax, easing);
  return clamp(x, outMin, outMax);
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  number(percentage, `percentage`, `v`);
  number(outMin, `percentage`, `outMin`);
  number(outMax, `percentage`, `outMax`);
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => {
  number(v, `percentage`, `v`);
  return scale(v, 0, 1, outMin, outMax);
};

// src/data/Normalise.ts
var stream = (minDefault, maxDefault) => {
  let min4 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max4 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  number(minDefault);
  number(maxDefault);
  return (v) => {
    number(v);
    min4 = Math.min(min4, v);
    max4 = Math.max(max4, v);
    return scale(v, min4, max4);
  };
};
var array2 = (values, minForced, maxForced) => {
  if (!Array.isArray(values))
    throw new Error(`values param should be an array`);
  const mma = minMaxAvg(values);
  const min4 = minForced ?? mma.min;
  const max4 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min4, max4)));
};

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => Arc_exports,
  Beziers: () => Bezier_exports,
  Circles: () => Circle_exports,
  Compound: () => CompoundPath_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => Grid_exports,
  Lines: () => Line_exports,
  Paths: () => Path_exports,
  Points: () => Point_exports,
  Polar: () => Polar_exports,
  Rects: () => Rect_exports,
  Scaler: () => Scaler_exports,
  Shapes: () => Shape_exports,
  Spheres: () => Sphere_exports,
  SurfacePoints: () => SurfacePoints_exports,
  Triangles: () => Triangle_exports,
  Vectors: () => Vector_exports,
  Waypoints: () => Waypoint_exports,
  degreeToRadian: () => degreeToRadian,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});

// src/geometry/Arc.ts
var Arc_exports = {};
__export(Arc_exports, {
  bbox: () => bbox3,
  distanceCenter: () => distanceCenter,
  fromDegrees: () => fromDegrees,
  guard: () => guard3,
  interpolate: () => interpolate4,
  isArc: () => isArc,
  isEqual: () => isEqual3,
  isPositioned: () => isPositioned,
  length: () => length3,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath2,
  toSvg: () => toSvg
});

// src/geometry/Point.ts
var Point_exports = {};
__export(Point_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder2,
  abs: () => abs,
  angle: () => angle,
  apply: () => apply2,
  bbox: () => bbox2,
  centroid: () => centroid,
  clamp: () => clamp2,
  clampMagnitude: () => clampMagnitude,
  compare: () => compare,
  compareByX: () => compareByX,
  convexHull: () => convexHull,
  distance: () => distance2,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide2,
  dotProduct: () => dotProduct2,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers2,
  getPointParam: () => getPointParam,
  guard: () => guard,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate3,
  invert: () => invert,
  isEmpty: () => isEmpty4,
  isEqual: () => isEqual2,
  isNaN: () => isNaN2,
  isNull: () => isNull,
  isPlaceholder: () => isPlaceholder2,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  leftmost: () => leftmost,
  multiply: () => multiply2,
  multiplyScalar: () => multiplyScalar,
  normalise: () => normalise,
  normaliseByRect: () => normaliseByRect2,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  progressBetween: () => progressBetween,
  project: () => project,
  quantiseEvery: () => quantiseEvery2,
  random: () => random,
  reduce: () => reduce,
  relation: () => relation,
  rightmost: () => rightmost,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  subtract: () => subtract2,
  sum: () => sum2,
  toArray: () => toArray2,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString2,
  withinRange: () => withinRange2,
  wrap: () => wrap2
});

// src/geometry/Line.ts
var Line_exports = {};
__export(Line_exports, {
  Empty: () => Empty,
  Placeholder: () => Placeholder,
  angleRadian: () => angleRadian,
  apply: () => apply,
  asPoints: () => asPoints,
  bbox: () => bbox,
  distance: () => distance,
  divide: () => divide,
  extendFromA: () => extendFromA,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointsParam: () => getPointsParam,
  guard: () => guard2,
  interpolate: () => interpolate2,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual,
  isLine: () => isLine,
  isPlaceholder: () => isPlaceholder,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length,
  midpoint: () => midpoint,
  multiply: () => multiply,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  pointAtX: () => pointAtX,
  pointsOf: () => pointsOf,
  rotate: () => rotate,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract,
  sum: () => sum,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange
});

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Arrays: () => Arrays_exports,
  MapOfMutableImpl: () => MapOfMutableImpl,
  Maps: () => Map_exports,
  Queues: () => Queue_exports,
  Sets: () => Set_exports,
  Stacks: () => Stack_exports,
  circularArray: () => circularArray,
  map: () => map,
  mapArray: () => mapArray,
  mapCircularMutable: () => mapCircularMutable,
  mapMutable: () => mapMutable,
  mapSet: () => mapSet,
  queue: () => queue,
  queueMutable: () => queueMutable,
  setMutable: () => setMutable,
  simpleMapArrayMutable: () => simpleMapArrayMutable,
  stack: () => stack,
  stackMutable: () => stackMutable
});

// src/Util.ts
var Util_exports = {};
__export(Util_exports, {
  Debug: () => Debug_exports,
  IterableAsync: () => IterableAsync_exports,
  defaultComparer: () => defaultComparer,
  getFieldByPath: () => getFieldByPath,
  getFieldPaths: () => getFieldPaths,
  ifNaN: () => ifNaN,
  isEqualDefault: () => isEqualDefault,
  isEqualValueDefault: () => isEqualValueDefault,
  isPowerOfTwo: () => isPowerOfTwo,
  mapObject: () => mapObject,
  relativeDifference: () => relativeDifference,
  roundUpToMultiple: () => roundUpToMultiple,
  runningiOS: () => runningiOS,
  toStringDefault: () => toStringDefault
});

// src/Text.ts
var Text_exports = {};
__export(Text_exports, {
  between: () => between,
  countCharsFromStart: () => countCharsFromStart,
  htmlEntities: () => htmlEntities,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  random: () => string,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  untilMatch: () => untilMatch,
  unwrap: () => unwrap
});
var between = (source, start3, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start3);
  if (startPos < 0)
    return;
  if (end === void 0)
    end = start3;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return;
  return source.substring(startPos + 1, endPos);
};
var indexOfCharCode = (source, code, start3 = 0, end = source.length - 1) => {
  for (let i = start3; i <= end; i++) {
    if (source.charCodeAt(i) === code)
      return i;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.substring(0, removeStart) + source.substring(removeStart + removeLength);
var splitByLength = (source, length5) => {
  const chunks2 = Math.ceil(source.length / length5);
  const ret = [];
  let start3 = 0;
  for (let c = 0; c < chunks2; c++) {
    ret.push(source.substring(start3, start3 + length5));
    start3 += length5;
  }
  return ret;
};
var untilMatch = (source, match, startPos = 0) => {
  if (startPos > source.length)
    throw new Error(`startPos should be less than length`);
  const m = source.indexOf(match, startPos);
  if (m < 0)
    return source;
  return source.substring(startPos, m);
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.substring(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start3, end) => {
  let s = -1;
  let e = -1;
  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i];
    s = i;
    if (r.text.length === 0)
      continue;
    if (start3 < r.end) {
      break;
    }
  }
  for (let i = s; i < ranges.length; i++) {
    const r = ranges[i];
    e = i;
    if (end === r.end) {
      e = i + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: e - s, start: s, end: e };
};
var splitRanges = (source, split) => {
  let start3 = 0;
  let text2 = ``;
  const ranges = [];
  let index = 0;
  for (let i = 0; i < source.length; i++) {
    if (source.indexOf(split, i) === i) {
      const end = i;
      ranges.push({
        text: text2,
        start: start3,
        end,
        index
      });
      start3 = end + 1;
      text2 = ``;
      index++;
    } else {
      text2 += source.charAt(i);
    }
  }
  if (start3 < source.length) {
    ranges.push({ text: text2, start: start3, index, end: source.length });
  }
  return ranges;
};
var countCharsFromStart = (source, ...chars) => {
  let counted = 0;
  for (let i = 0; i < source.length; i++) {
    if (chars.includes(source.charAt(i))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start3, end = start3) => source.startsWith(start3) && source.endsWith(end);
var htmlEntities = (source) => source.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);

// src/Debug.ts
var Debug_exports = {};
__export(Debug_exports, {
  logSet: () => logSet,
  logger: () => logger
});

// src/collections/Map.ts
var Map_exports = {};
__export(Map_exports, {
  ExpiringMap: () => ExpiringMap,
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  expiringMap: () => create,
  filter: () => filter,
  find: () => find,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  mapToArray: () => mapToArray,
  mapToObjTransform: () => mapToObjTransform,
  mergeByKey: () => mergeByKey,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/collections/ExpiringMap.ts
var create = (opts = {}) => new ExpiringMap(opts);
var _maintain, maintain_fn;
var ExpiringMap = class extends SimpleEventEmitter {
  constructor(opts = {}) {
    super();
    __privateAdd(this, _maintain);
    __publicField(this, "capacity");
    __publicField(this, "store");
    __publicField(this, "keyCount");
    __publicField(this, "evictPolicy");
    __publicField(this, "autoDeleteElapsedMs");
    __publicField(this, "autoDeletePolicy");
    this.capacity = opts.capacity ?? -1;
    integer(this.capacity, `nonZero`, `capacity`);
    this.store = /* @__PURE__ */ new Map();
    this.keyCount = 0;
    if (opts.evictPolicy && this.capacity <= 0)
      throw new Error(`evictPolicy is set, but no capacity limit is set`);
    this.evictPolicy = opts.evictPolicy ?? `none`;
    this.autoDeleteElapsedMs = opts.autoDeleteElapsedMs ?? -1;
    this.autoDeletePolicy = opts.autoDeletePolicy ?? `none`;
    if (this.autoDeleteElapsedMs > 0) {
      setInterval(() => __privateMethod(this, _maintain, maintain_fn).call(this), Math.max(1e3, this.autoDeleteElapsedMs * 2));
    }
  }
  get keyLength() {
    return this.keyCount;
  }
  *entries() {
    for (const entry of this.store.entries()) {
      yield [entry[0], entry[1].value];
    }
  }
  *values() {
    for (const v of this.store.values()) {
      yield v.value;
    }
  }
  *keys() {
    yield* this.store.keys();
  }
  elapsedSet(key) {
    const v = this.store.get(key);
    if (!v)
      return v;
    return Date.now() - v.lastSet;
  }
  elapsedGet(key) {
    const v = this.store.get(key);
    if (!v)
      return v;
    return Date.now() - v.lastGet;
  }
  has(key) {
    return this.store.has(key);
  }
  get(key) {
    const v = this.store.get(key);
    if (v) {
      return v.value;
    }
  }
  delete(key) {
    const val = this.store.get(key);
    if (!val)
      return false;
    const d = this.store.delete(key);
    this.keyCount = this.keyCount - 1;
    this.fireEvent(`removed`, {
      key,
      value: val.value
    });
    return d;
  }
  touch(key) {
    const v = this.store.get(key);
    if (!v)
      return false;
    this.store.set(key, {
      ...v,
      lastSet: Date.now(),
      lastGet: Date.now()
    });
    return true;
  }
  findEvicteeKey() {
    if (this.evictPolicy === `none`)
      return null;
    let sortBy = ``;
    if (this.evictPolicy === `oldestGet`)
      sortBy = `lastGet`;
    else if (this.evictPolicy === `oldestSet`)
      sortBy = `lastSet`;
    else
      throw Error(`Unknown eviction policy ${this.evictPolicy}`);
    const sorted = sortByValueProperty(this.store, sortBy);
    return sorted[0][0];
  }
  deleteWithElapsed(time2, prop) {
    const entries = [...this.store.entries()];
    const prune = [];
    const now = Date.now();
    for (const e of entries) {
      const elapsedGet = now - e[1].lastGet;
      const elapsedSet = now - e[1].lastSet;
      const elapsed = prop === `get` ? elapsedGet : prop === `set` ? elapsedSet : Math.max(elapsedGet, elapsedSet);
      if (elapsed >= time2) {
        prune.push([e[0], e[1].value]);
      }
    }
    for (const e of prune) {
      this.store.delete(e[0]);
      this.keyCount = this.keyCount - 1;
      const eventArgs = {
        key: e[0],
        value: e[1]
      };
      this.fireEvent(`expired`, eventArgs);
      this.fireEvent(`removed`, eventArgs);
    }
    return prune;
  }
  set(key, value) {
    const existing = this.store.get(key);
    if (existing) {
      this.store.set(key, {
        ...existing,
        lastSet: performance.now()
      });
      return;
    }
    if (this.keyCount === this.capacity && this.capacity > 0) {
      const key2 = this.findEvicteeKey();
      if (!key2)
        throw new Error(`ExpiringMap full (capacity: ${this.capacity})`);
      const existing2 = this.store.get(key2);
      this.store.delete(key2);
      this.keyCount = this.keyCount - 1;
      if (existing2) {
        const eventArgs = { key: key2, value: existing2.value };
        this.fireEvent(`expired`, eventArgs);
        this.fireEvent(`removed`, eventArgs);
      }
    }
    this.keyCount++;
    this.store.set(key, {
      lastGet: 0,
      lastSet: Date.now(),
      value
    });
    this.fireEvent(`newKey`, { key, value });
  }
};
_maintain = new WeakSet();
maintain_fn = function() {
  if (this.autoDeletePolicy === `none`)
    return;
  this.deleteWithElapsed(this.autoDeleteElapsedMs, this.autoDeletePolicy);
};

// src/collections/Map.ts
var hasKeyValue = (map3, key, value, comparer) => {
  if (!map3.has(key))
    return false;
  const values = Array.from(map3.values());
  return values.some((v) => comparer(v, value));
};
var deleteByValue = (map3, value, comparer = isEqualDefault) => {
  for (const e of Object.entries(map3)) {
    if (comparer(e[1], value)) {
      map3.delete(e[0]);
    }
  }
};
var getOrGenerate = (map3, fn) => async (key, args) => {
  let value = map3.get(key);
  if (value !== void 0)
    return Promise.resolve(value);
  value = await fn(key, args);
  if (value === void 0)
    throw new Error(`fn returned undefined`);
  map3.set(key, value);
  return value;
};
var getOrGenerateSync = (map3, fn) => (key, args) => {
  let value = map3.get(key);
  if (value !== void 0)
    return value;
  value = fn(key, args);
  map3.set(key, value);
  return value;
};
var addKeepingExisting = (set2, hashFunc, ...values) => {
  const s = set2 === void 0 ? /* @__PURE__ */ new Map() : new Map(set2);
  values.forEach((v) => {
    const vStr = hashFunc(v);
    if (s.has(vStr))
      return;
    s.set(vStr, v);
  });
  return s;
};
var sortByValue = (map3, compareFn) => {
  const f = compareFn ?? defaultComparer;
  [...map3.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map3, prop, compareFn) => {
  const cfn = typeof compareFn === `undefined` ? defaultComparer : compareFn;
  return [...map3.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[prop], b[prop]);
  });
};
var hasAnyValue = (map3, value, comparer) => {
  const entries = Array.from(map3.entries());
  return entries.some((kv) => comparer(kv[1], value));
};
function* filter(map3, predicate) {
  for (const v of map3.values()) {
    if (predicate(v))
      yield v;
  }
}
var toArray = (map3) => Array.from(map3.values());
var fromIterable = (data, keyFn, allowOverwrites = false) => {
  const m = /* @__PURE__ */ new Map();
  for (const d of data) {
    const id = keyFn(d);
    if (m.has(id) && !allowOverwrites)
      throw new Error(`id ${id} is already used and new data will overwrite it. `);
    m.set(id, d);
  }
  return m;
};
var fromObject = (data) => {
  const map3 = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) {
    data.forEach((d) => addObject(map3, d));
  } else {
    addObject(map3, data);
  }
  return map3;
};
var addObject = (map3, data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    map3.set(key, value);
  }
};
var find = (map3, predicate) => Array.from(map3.values()).find((vv) => predicate(vv));
var mapToObjTransform = (m, valueTransform) => Array.from(m).reduce((obj, [key, value]) => {
  const t4 = valueTransform(value);
  obj[key] = t4;
  return obj;
}, {});
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length)
    throw new Error(`Keys and values arrays should be same length`);
  return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
};
var transformMap = (source, transformer) => new Map(
  Array.from(source, (v) => [v[0], transformer(v[1], v[0])])
);
var toObject = (m) => Array.from(m).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});
var mapToArray = (m, transformer) => Array.from(m.entries()).map((x) => transformer(x[0], x[1]));
var mergeByKey = (reconcile, ...maps) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of maps) {
    for (const [mk, mv] of m) {
      let v = result.get(mk);
      if (v) {
        v = reconcile(v, mv);
      } else {
        v = mv;
      }
      result.set(mk, v);
    }
  }
  return result;
};

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  interpolate: () => interpolate,
  opacity: () => opacity,
  randomHue: () => randomHue,
  scale: () => scale2,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb
});

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity2) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity2 == null ? 1 : opacity2);
}
function Rgb(r, g, b, opacity2) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity2;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity2) {
  return isNaN(opacity2) ? 1 : Math.max(0, Math.min(1, opacity2));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min4 = Math.min(r, g, b), max4 = Math.max(r, g, b), h = NaN, s = max4 - min4, l = (max4 + min4) / 2;
  if (s) {
    if (r === max4)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max4)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max4 + min4 : 2 - max4 - min4;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity2) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity2 == null ? 1 : opacity2);
}
function Hsl(h, s, l, opacity2) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity2;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab)
    return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl)
    return hcl2lab(o);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b)
    x = z = y;
  else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function lab(l, a, b, opacity2) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity2 == null ? 1 : opacity2);
}
function Lab(l, a, b, opacity2) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity2;
}
define_default(Lab, lab, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z),
      lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t4) {
  return t4 > t3 ? Math.pow(t4, 1 / 3) : t4 / t2 + t0;
}
function lab2xyz(t4) {
  return t4 > t1 ? t4 * t4 * t4 : t2 * (t4 - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl)
    return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab))
    o = labConvert(o);
  if (o.a === 0 && o.b === 0)
    return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c, l, opacity2) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity2 == null ? 1 : opacity2);
}
function Hcl(h, c, l, opacity2) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity2;
}
function hcl2lab(o) {
  if (isNaN(o.h))
    return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity2) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity2 == null ? 1 : opacity2);
}
function Cubehelix(h, s, l, opacity2) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity2;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t22 = t12 * t12, t32 = t22 * t12;
  return ((1 - 3 * t12 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t12 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t4) {
    var i = t4 <= 0 ? t4 = 0 : t4 >= 1 ? (t4 = 1, n - 1) : Math.floor(t4 * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t4 - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t4) {
    var i = Math.floor(((t4 %= 1) < 0 ? ++t4 : t4) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t4 - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t4) {
    return a + t4 * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t4) {
    return Math.pow(a + t4 * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start3, end) {
    var r = color2((start3 = rgb(start3)).r, (end = rgb(end)).r), g = color2(start3.g, end.g), b = color2(start3.b, end.b), opacity2 = nogamma(start3.opacity, end.opacity);
    return function(t4) {
      start3.r = r(t4);
      start3.g = g(t4);
      start3.b = b(t4);
      start3.opacity = opacity2(t4);
      return start3 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t4) {
      color2.r = r(t4);
      color2.g = g(t4);
      color2.b = b(t4);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t4) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t4) + b[i] * t4;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i)
    c[i] = b[i];
  return function(t4) {
    for (i = 0; i < na; ++i)
      c[i] = x[i](t4);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function(t4) {
    return d.setTime(a * (1 - t4) + b * t4), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t4) {
    return a * (1 - t4) + b * t4;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t4) {
    for (k in i)
      c[k] = i[k](t4);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t4) {
    return b(t4) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t4) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t4);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t4 = typeof b, c;
  return b == null || t4 === "boolean" ? constant_default(b) : (t4 === "number" ? number_default : t4 === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start3, end) {
    var h = hue2((start3 = hsl(start3)).h, (end = hsl(end)).h), s = nogamma(start3.s, end.s), l = nogamma(start3.l, end.l), opacity2 = nogamma(start3.opacity, end.opacity);
    return function(t4) {
      start3.h = h(t4);
      start3.s = s(t4);
      start3.l = l(t4);
      start3.opacity = opacity2(t4);
      return start3 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/lab.js
function lab2(start3, end) {
  var l = nogamma((start3 = lab(start3)).l, (end = lab(end)).l), a = nogamma(start3.a, end.a), b = nogamma(start3.b, end.b), opacity2 = nogamma(start3.opacity, end.opacity);
  return function(t4) {
    start3.l = l(t4);
    start3.a = a(t4);
    start3.b = b(t4);
    start3.opacity = opacity2(t4);
    return start3 + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start3, end) {
    var h = hue2((start3 = hcl(start3)).h, (end = hcl(end)).h), c = nogamma(start3.c, end.c), l = nogamma(start3.l, end.l), opacity2 = nogamma(start3.opacity, end.opacity);
    return function(t4) {
      start3.h = h(t4);
      start3.c = c(t4);
      start3.l = l(t4);
      start3.opacity = opacity2(t4);
      return start3 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix3(start3, end) {
      var h = hue2((start3 = cubehelix(start3)).h, (end = cubehelix(end)).h), s = nogamma(start3.s, end.s), l = nogamma(start3.l, end.l), opacity2 = nogamma(start3.opacity, end.opacity);
      return function(t4) {
        start3.h = h(t4);
        start3.s = s(t4);
        start3.l = l(Math.pow(t4, y));
        start3.opacity = opacity2(t4);
        return start3 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate8, values) {
  if (values === void 0)
    values = interpolate8, interpolate8 = value_default;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n)
    I[i] = interpolate8(v, v = values[++i]);
  return function(t4) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t4 *= n)));
    return I[i2](t4 - i2);
  };
}

// src/visual/Colour.ts
var toHsl = (colour) => {
  const rgb2 = toRgb(colour);
  const hsl3 = rgbToHsl(rgb2.r, rgb2.b, rgb2.g);
  if (rgb2.opacity)
    return { ...hsl3, opacity: rgb2.opacity };
  else
    return hsl3;
};
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75, alpha = 1) => {
  number(index, `positive`, `index`);
  number(saturation, `percentage`, `saturation`);
  number(lightness, `percentage`, `lightness`);
  number(alpha, `percentage`, `alpha`);
  const hue2 = index * 137.508;
  if (alpha === 1)
    return `hsl(${hue2},${saturation * 100}%,${lightness * 100}%)`;
  else
    `hsl(${hue2},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};
var toRgb = (colour) => {
  const c = resolveColour(colour);
  const rgb2 = c.rgb();
  if (c.opacity < 1)
    return { r: rgb2.r, g: rgb2.g, b: rgb2.b, opacity: c.opacity };
  else
    return { r: rgb2.r, g: rgb2.g, b: rgb2.b };
};
var resolveColour = (c) => {
  if (typeof c === `string`) {
    const css = color(c);
    if (css !== null)
      return css;
  } else {
    if (isHsl(c))
      return hsl(c.h, c.s, c.l);
    if (isRgb(c))
      return rgb(c.r, c.g, c.b);
  }
  throw new Error(`Could not resolve colour ${JSON.stringify(c)}`);
};
var toHex = (colour) => {
  const c = resolveColour(colour);
  return c.formatHex();
};
var opacity = (colour, amt) => {
  const c = resolveColour(colour);
  c.opacity *= amt;
  return c.toString();
};
var getCssVariable = (name, fallbackColour = `black`, root) => {
  if (root === void 0)
    root = document.body;
  const fromCss = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
  if (fromCss === void 0 || fromCss.length === 0)
    return fallbackColour;
  return fromCss;
};
var interpolate = (amount, from2, to, optsOrSpace) => {
  number(amount, `percentage`, `amount`);
  if (typeof from2 !== `string`)
    throw new Error(`Expected string for 'from' param`);
  if (typeof to !== `string`)
    throw new Error(`Expected string for 'to' param`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  const inter = getInterpolator(opts, [from2, to]);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  return inter(amount);
};
var getInterpolator = (optsOrSpace, colours) => {
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  if (!Array.isArray(colours))
    throw new Error(`Expected array for colours parameter`);
  if (colours.length < 2)
    throw new Error(`Interpolation expects at least two colours`);
  const { space = `rgb`, long = false } = opts;
  let inter;
  switch (space) {
    case `lab`:
      inter = lab2;
      break;
    case `hsl`:
      inter = long ? hslLong : hsl_default;
      break;
    case `hcl`:
      inter = long ? hclLong : hcl_default;
      break;
    case `cubehelix`:
      inter = long ? cubehelixLong : cubehelix_default;
      break;
    case `rgb`:
      inter = rgb_default;
    default:
      inter = rgb_default;
  }
  if (opts.gamma) {
    if (space === `rgb` || space === `cubehelix`) {
      inter = inter.gamma(opts.gamma);
    }
  }
  if (colours.length > 2) {
    return piecewise(inter, colours);
  } else
    return inter(colours[0], colours[1]);
};
var scale2 = (steps, opts, ...colours) => {
  number(steps, `aboveZero`, `steps`);
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  const inter = getInterpolator(opts, colours);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  const perStep = 1 / (steps - 1);
  const r = [];
  let amt = 0;
  for (let i = 0; i < steps; i++) {
    r.push(inter(amt));
    amt += perStep;
    if (amt > 1)
      amt = 1;
  }
  return r;
};
var isHsl = (p) => {
  if (p.h === void 0)
    return false;
  if (p.s === void 0)
    return false;
  if (p.l === void 0)
    return false;
  return true;
};
var isRgb = (p) => {
  if (p.r === void 0)
    return false;
  if (p.g === void 0)
    return false;
  if (p.b === void 0)
    return false;
  return true;
};
var rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  var min4 = Math.min(r, g, b), max4 = Math.max(r, g, b), delta = max4 - min4, h, s, l;
  h = 0;
  if (max4 === min4) {
    h = 0;
  } else if (r === max4) {
    h = (g - b) / delta;
  } else if (g === max4) {
    h = 2 + (b - r) / delta;
  } else if (b === max4) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min4 + max4) / 2;
  if (max4 === min4) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max4 + min4);
  } else {
    s = delta / (2 - max4 - min4);
  }
  return { h, s, l };
};

// src/Debug.ts
var logColourCount = 0;
var logColours = getOrGenerateSync(/* @__PURE__ */ new Map(), () => goldenAngleColour(++logColourCount));
var logSet = (prefix, verbose = true) => {
  if (verbose) {
    return {
      log: logger(prefix, `log`),
      warn: logger(prefix, `warn`),
      error: logger(prefix, `error`)
    };
  } else {
    return {
      log: (_) => {
      },
      warn: logger(prefix, `warn`),
      error: logger(prefix, `error`)
    };
  }
};
var logger = (prefix, kind = `log`) => (m) => {
  if (m === void 0) {
    m = `(undefined)`;
  } else if (typeof m === `object`) {
    m = JSON.stringify(m);
  }
  switch (kind) {
    case `log`:
      console.log(`%c${prefix} ${m}`, `color: ${logColours(prefix)}`);
      break;
    case `warn`:
      console.warn(prefix, m);
      break;
    case `error`:
      console.error(prefix, m);
      break;
  }
};

// src/Util.ts
var ifNaN = (v, fallback) => {
  if (Number.isNaN(v))
    return fallback;
  return v;
};
var mapObject = (object, mapFn) => {
  const mapped = Object.entries(object).map(([key, value], i) => [key, mapFn(value, key, i)]);
  return Object.fromEntries(mapped);
};
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
var relativeDifference = (initial) => (v) => v / initial;
var getFieldByPath = (o, path2 = ``) => {
  if (path2.length === 0)
    return o;
  if (path2 in o) {
    return o[path2];
  } else {
    const start3 = untilMatch(path2, `.`);
    if (start3 in o) {
      return getFieldByPath(o[start3], path2.substring(start3.length + 1));
    } else {
      return void 0;
    }
  }
};
var getFieldPaths = (o) => {
  const paths2 = [];
  const probe = (o2, prefix = ``) => {
    if (typeof o2 === `object`) {
      const keys = Object.keys(o2);
      if (prefix.length > 0)
        prefix += `.`;
      keys.forEach((k) => probe(o2[k], prefix + k));
    } else {
      paths2.push(prefix);
    }
  };
  probe(o);
  return paths2;
};
var roundUpToMultiple = (v, multiple) => {
  number(v, `nonZero`, `v`);
  number(multiple, `nonZero`, `muliple`);
  return Math.ceil(v / multiple) * multiple;
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document;
var defaultComparer = (x, y) => {
  if (x === void 0 && y === void 0)
    return 0;
  if (x === void 0)
    return 1;
  if (y === void 0)
    return -1;
  const xString = defaultToString(x);
  const yString = defaultToString(y);
  if (xString < yString)
    return -1;
  if (xString > yString)
    return 1;
  return 0;
};
var defaultToString = (obj) => {
  if (obj === null)
    return `null`;
  if (typeof obj === `boolean` || typeof obj === `number`)
    return obj.toString();
  if (typeof obj === `string`)
    return obj;
  if (typeof obj === `symbol`)
    throw new TypeError();
  return obj.toString();
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, getFieldByPath, getFieldPaths };
  }
} catch {
}

// src/collections/CircularArray.ts
var _capacity, _pointer;
var _CircularArrayImpl = class extends Array {
  constructor(capacity = 0) {
    super();
    __privateAdd(this, _capacity, void 0);
    __privateAdd(this, _pointer, void 0);
    integer(capacity, `positive`, `capacity`);
    __privateSet(this, _capacity, capacity);
    __privateSet(this, _pointer, 0);
  }
  add(thing) {
    const ca = _CircularArrayImpl.from(this);
    ca[__privateGet(this, _pointer)] = thing;
    __privateSet(ca, _capacity, __privateGet(this, _capacity));
    if (__privateGet(this, _capacity) > 0) {
      __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1 === __privateGet(this, _capacity) ? 0 : __privateGet(this, _pointer) + 1);
    } else {
      __privateSet(ca, _pointer, __privateGet(this, _pointer) + 1);
    }
    return ca;
  }
  get pointer() {
    return __privateGet(this, _pointer);
  }
  get isFull() {
    if (__privateGet(this, _capacity) === 0)
      return false;
    return this.length === __privateGet(this, _capacity);
  }
};
var CircularArrayImpl = _CircularArrayImpl;
_capacity = new WeakMap();
_pointer = new WeakMap();
var circularArray = (capacity) => new CircularArrayImpl(capacity);

// src/collections/MapMultiMutable.ts
var _map;
var MapOfMutableImpl = class extends SimpleEventEmitter {
  constructor(type, opts = {}) {
    super();
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    __publicField(this, "groupBy");
    __publicField(this, "type");
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  get typeName() {
    return this.type.name;
  }
  get lengthMax() {
    let m = 0;
    for (const v of __privateGet(this, _map).values()) {
      m = Math.max(m, this.type.count(v));
    }
    return m;
  }
  debugString() {
    const keys = Array.from(__privateGet(this, _map).keys());
    let r = `Keys: ${keys.join(`, `)}\r
`;
    keys.forEach((k) => {
      const v = __privateGet(this, _map).get(k);
      if (v !== void 0) {
        const asArray = this.type.toArray(v);
        if (asArray !== void 0) {
          r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(asArray)}\r
`;
        }
      } else
        r += ` - ${k} (undefined)\r
`;
    });
    return r;
  }
  get isEmpty() {
    return __privateGet(this, _map).size === 0;
  }
  clear() {
    __privateGet(this, _map).clear();
    super.fireEvent(`clear`, true);
  }
  addKeyedValues(key, ...values) {
    const set2 = __privateGet(this, _map).get(key);
    if (set2 === void 0) {
      __privateGet(this, _map).set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      __privateGet(this, _map).set(key, this.type.add(set2, values));
      super.fireEvent(`addedValues`, { values });
    }
  }
  addValue(...values) {
    values.forEach((v) => this.addKeyedValues(this.groupBy(v), v));
  }
  hasKeyValue(key, value) {
    const m = __privateGet(this, _map).get(key);
    if (m === void 0)
      return false;
    return this.type.has(m, value);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  deleteKeyValue(key, value) {
    const a = __privateGet(this, _map).get(key);
    if (a === void 0)
      return false;
    const preCount = this.type.count(a);
    const filtered = this.type.without(a, value);
    const postCount = filtered.length;
    __privateGet(this, _map).set(key, this.type.add(void 0, filtered));
    return preCount > postCount;
  }
  delete(key) {
    const a = __privateGet(this, _map).get(key);
    if (a === void 0)
      return false;
    __privateGet(this, _map).delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  findKeyForValue(value) {
    const keys = Array.from(__privateGet(this, _map).keys());
    const found = keys.find((key) => {
      const a = __privateGet(this, _map).get(key);
      if (a === void 0)
        throw Error(`Bug: map could not be accessed`);
      if (this.type.has(a, value))
        return true;
      return false;
    });
    return found;
  }
  count(key) {
    const e = __privateGet(this, _map).get(key);
    if (e === void 0)
      return 0;
    return this.type.count(e);
  }
  get(key) {
    const m = __privateGet(this, _map).get(key);
    if (m === void 0)
      return void 0;
    return this.type.toArray(m);
  }
  getSource(key) {
    return __privateGet(this, _map).get(key);
  }
  keys() {
    return Array.from(__privateGet(this, _map).keys());
  }
  keysAndCounts() {
    const keys = this.keys();
    const r = keys.map((k) => [k, this.count(k)]);
    return r;
  }
  merge(other) {
    const keys = other.keys();
    keys.forEach((key) => {
      const data = other.get(key);
      if (data !== void 0)
        this.addKeyedValues(key, ...data);
    });
  }
};
_map = new WeakMap();
var mapArray = (opts = {}) => {
  const comparer = opts.comparer === void 0 ? opts.toString === void 0 ? (a, b) => opts.toString(a) === opts.toString(b) : isEqualDefault : opts.comparer;
  const t4 = {
    get name() {
      return `array`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        return [...values];
      return [...dest, ...values];
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  const m = new MapOfMutableImpl(t4, opts);
  return m;
};
var mapSet = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t4 = {
    get name() {
      return `set`;
    },
    add: (dest, values) => addKeepingExisting(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find(source, predicate),
    filter: (source, predicate) => filter(source, predicate),
    toArray: (source) => toArray(source),
    has: (source, value) => hasAnyValue(source, value, comparer),
    without: (source, value) => without(toArray(source), value, comparer)
  };
  const m = new MapOfMutableImpl(t4, opts);
  return m;
};
var mapCircularMutable = (opts) => {
  const comparer = isEqualDefault;
  const t4 = {
    get name() {
      return `circular`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        dest = circularArray(opts.capacity);
      values.forEach((v) => dest = dest?.add(v));
      return dest;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  return new MapOfMutableImpl(t4, opts);
};

// src/collections/Stack.ts
var Stack_exports = {};
__export(Stack_exports, {
  stack: () => stack,
  stackMutable: () => stackMutable
});
var trimStack = (opts, stack2, toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug)
    console.log(`Stack.push: stackLen: ${stack2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`:
      if (opts.debug)
        console.log(`Stack.push:DiscardAdditions: stackLen: ${stack2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (stack2.length === opts.capacity) {
        return stack2;
      } else {
        return [...stack2, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    case `newer`:
      if (toRemove >= stack2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        if (opts.debug)
          console.log(` from orig: ${stack2.slice(0, stack2.length - toRemove)}`);
        return [...stack2.slice(0, stack2.length - toRemove), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
      }
    case `older`:
      return [...stack2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown discard policy ${policy}`);
  }
};
var push = (opts, stack2, ...toAdd) => {
  const potentialLength = stack2.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack2, toAdd) : [...stack2, ...toAdd];
  return toReturn;
};
var pop = (opts, stack2) => {
  if (stack2.length === 0)
    throw new Error(`Stack is empty`);
  return stack2.slice(0, stack2.length - 1);
};
var peek = (opts, stack2) => stack2[stack2.length - 1];
var isEmpty = (opts, stack2) => stack2.length === 0;
var isFull = (opts, stack2) => {
  if (opts.capacity) {
    return stack2.length >= opts.capacity;
  }
  return false;
};
var StackImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new StackImpl(this.opts, push(this.opts, this.data, ...toAdd));
  }
  pop() {
    return new StackImpl(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var StackMutableImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  pop() {
    const v = peek(this.opts, this.data);
    pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var stack = (opts = {}, ...startingItems) => new StackImpl({ ...opts }, [...startingItems]);
var stackMutable = (opts = {}, ...startingItems) => new StackMutableImpl({ ...opts }, [...startingItems]);

// src/collections/Queue.ts
var Queue_exports = {};
__export(Queue_exports, {
  queue: () => queue,
  queueMutable: () => queueMutable
});
var debug = (opts, msg) => {
  opts.debug ? console.log(`queue:${msg}`) : null;
};
var trimQueue = (opts, queue2, toAdd) => {
  const potentialLength = queue2.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  debug(opts, `queueLen: ${queue2.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`:
      debug(opts, `trimQueue:DiscardAdditions: queueLen: ${queue2.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (queue2.length === opts.capacity) {
        return queue2;
      } else {
        return [...queue2, ...toAdd.slice(0, toRemove - 1)];
      }
    case `newer`:
      if (toRemove >= queue2.length) {
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        const toAddFinal = toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1));
        const toKeep = queue2.slice(0, queue2.length - toRemove);
        debug(opts, `trimQueue: toRemove: ${toRemove} keeping: ${JSON.stringify(toKeep)} from orig: ${JSON.stringify(queue2)} toAddFinal: ${JSON.stringify(toAddFinal)}`);
        const t4 = [...toKeep, ...toAddFinal];
        debug(opts, `final: ${JSON.stringify(t4)}`);
        return t4;
      }
    case `older`:
      return [...queue2, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown overflow policy ${policy}`);
  }
};
var enqueue = (opts, queue2, ...toAdd) => {
  if (opts === void 0)
    throw new Error(`opts parameter undefined`);
  const potentialLength = queue2.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue2, toAdd) : [...queue2, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize)
    throw new Error(`Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`);
  if (!opts.capacity && toReturn.length !== potentialLength)
    throw new Error(`Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`);
  return toReturn;
};
var dequeue = (opts, queue2) => {
  if (queue2.length === 0)
    throw new Error(`Queue is empty`);
  return queue2.slice(1);
};
var peek2 = (opts, queue2) => queue2[0];
var isEmpty2 = (opts, queue2) => queue2.length === 0;
var isFull2 = (opts, queue2) => {
  if (opts.capacity) {
    return queue2.length >= opts.capacity;
  }
  return false;
};
var QueueImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  forEach(fn) {
    for (let i = this.data.length - 1; i >= 0; i--) {
      fn(this.data[i]);
    }
  }
  forEachFromFront(fn) {
    this.data.forEach((vv) => fn(vv));
  }
  enqueue(...toAdd) {
    return new QueueImpl(this.opts, enqueue(this.opts, this.data, ...toAdd));
  }
  dequeue() {
    return new QueueImpl(this.opts, dequeue(this.opts, this.data));
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
};
var QueueMutableImpl = class {
  constructor(opts, data) {
    __publicField(this, "opts");
    __publicField(this, "data");
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  dequeue() {
    const v = peek2(this.opts, this.data);
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty2(this.opts, this.data);
  }
  get isFull() {
    return isFull2(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek2(this.opts, this.data);
  }
};
var queue = (opts = {}, ...startingItems) => {
  opts = { ...opts };
  return new QueueImpl(opts, [...startingItems]);
};
var queueMutable = (opts = {}, ...startingItems) => new QueueMutableImpl({ ...opts }, [...startingItems]);

// src/collections/MapImmutable.ts
var addArray = (map3, data) => {
  const x = new Map(map3.entries());
  data.forEach((d) => {
    if (d[0] === void 0)
      throw new Error(`key cannot be undefined`);
    if (d[1] === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  });
  return x;
};
var addObjects = (map3, data) => {
  const x = new Map(map3.entries());
  data.forEach((d) => {
    if (d.key === void 0)
      throw new Error(`key cannot be undefined`);
    if (d.value === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  });
  return x;
};
var has = (map3, key) => map3.has(key);
var add = (map3, ...data) => {
  if (map3 === void 0)
    throw new Error(`map parameter is undefined`);
  if (data === void 0)
    throw new Error(`data parameter i.s undefined`);
  if (data.length === 0)
    return map3;
  const firstRecord = data[0];
  const isObj = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObj ? addObjects(map3, data) : addArray(map3, data);
};
var set = (map3, key, value) => {
  const x = new Map(map3.entries());
  x.set(key, value);
  return x;
};
var del = (map3, key) => {
  const x = new Map(map3.entries());
  x.delete(key);
  return x;
};
var map = (dataOrMap) => {
  if (dataOrMap === void 0)
    return map([]);
  if (Array.isArray(dataOrMap))
    return map(add(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add(data, ...itemsToAdd);
      return map(s);
    },
    get: (key) => data.get(key),
    delete: (key) => map(del(data, key)),
    clear: () => map(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    isEmpty: () => data.size === 0
  };
};

// src/collections/MapMutable.ts
var mapMutable = (...data) => {
  let m = add(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data2) => {
      m = add(m, ...data2);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add(/* @__PURE__ */ new Map());
    },
    set: (key, value) => {
      m = set(m, key, value);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};

// src/geometry/Line.ts
var Empty = Object.freeze({
  a: Object.freeze({ x: 0, y: 0 }),
  b: Object.freeze({ x: 0, y: 0 })
});
var Placeholder = Object.freeze({
  a: Object.freeze({ x: NaN, y: NaN }),
  b: Object.freeze({ x: NaN, y: NaN })
});
var isEmpty3 = (l) => Point_exports.isEmpty(l.a) && Point_exports.isEmpty(l.b);
var isPlaceholder = (l) => Point_exports.isPlaceholder(l.a) && Point_exports.isPlaceholder(l.b);
var isLine = (p) => {
  if (p === void 0)
    return false;
  if (p.a === void 0)
    return false;
  if (p.b === void 0)
    return false;
  if (!Point_exports.isPoint(p.a))
    return false;
  if (!Point_exports.isPoint(p.b))
    return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p))
    return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var isEqual = (a, b) => Point_exports.isEqual(a.a, b.a) && Point_exports.isEqual(a.b, b.b);
var apply = (line3, fn) => Object.freeze(
  {
    ...line3,
    a: fn(line3.a),
    b: fn(line3.b)
  }
);
var guard2 = (line3, paramName = `line`) => {
  if (line3 === void 0)
    throw new Error(`${paramName} undefined`);
  if (line3.a === void 0)
    throw new Error(`${paramName}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line3)}`);
  if (line3.b === void 0)
    throw new Error(`${paramName}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line3)}`);
};
var angleRadian = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var multiply = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.multiply(line3.a, point3),
  b: Point_exports.multiply(line3.b, point3)
});
var divide = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.divide(line3.a, point3),
  b: Point_exports.divide(line3.b, point3)
});
var sum = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.sum(line3.a, point3),
  b: Point_exports.sum(line3.b, point3)
});
var subtract = (line3, point3) => Object.freeze({
  ...line3,
  a: Point_exports.subtract(line3.a, point3),
  b: Point_exports.subtract(line3.b, point3)
});
var normaliseByRect = (line3, width, height4) => Object.freeze({
  ...line3,
  a: Point_exports.normaliseByRect(line3.a, width, height4),
  b: Point_exports.normaliseByRect(line3.b, width, height4)
});
var withinRange = (line3, point3, maxRange) => {
  const dist = distance(line3, point3);
  return dist <= maxRange;
};
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum5 = aOrLine.reduce((acc, v) => length(v) + acc, 0);
    return sum5;
  }
  const [a, b] = getPointsParam(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointsParam(aOrLine, pointB);
  return interpolate2(0.5, a, b);
};
var getPointsParam = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0)
      throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard(a, `a`);
  guard(a, `b`);
  return [a, b];
};
var nearest = (line3, point3) => {
  const n = (line4) => {
    const { a, b } = line4;
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: point3.x - a.x, y: point3.y - a.y };
    const len = atob.x * atob.x + atob.y * atob.y;
    let dot2 = atop.x * atob.x + atop.y * atob.y;
    const t4 = Math.min(1, Math.max(0, dot2 / len));
    dot2 = (b.x - a.x) * (point3.y - a.y) - (b.y - a.y) * (point3.x - a.x);
    return { x: a.x + atob.x * t4, y: a.y + atob.y * t4 };
  };
  if (Array.isArray(line3)) {
    const pts = line3.map((l) => n(l));
    const dists = pts.map((p) => Point_exports.distance(p, point3));
    return Object.freeze(pts[Arrays_exports.minIndex(...dists)]);
  } else {
    return Object.freeze(n(line3));
  }
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b parameter required`);
  }
  if (b !== void 0) {
    return (b.y - a.y) / (b.x - a.x);
  } else
    throw Error(`Second point missing`);
};
var directionVector = (line3) => ({
  x: line3.b.x - line3.a.x,
  y: line3.b.y - line3.a.y
});
var directionVectorNormalised = (line3) => {
  const l = length(line3);
  const v = directionVector(line3);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var perpendicularPoint = (line3, distance3, amount = 0) => {
  const origin = interpolate2(amount, line3);
  const dvn = directionVectorNormalised(line3);
  return {
    x: origin.x - dvn.y * distance3,
    y: origin.y + dvn.x * distance3
  };
};
var parallel = (line3, distance3) => {
  const dv = directionVector(line3);
  const dvn = directionVectorNormalised(line3);
  const a = {
    x: line3.a.x - dvn.y * distance3,
    y: line3.a.y + dvn.x * distance3
  };
  return {
    a,
    b: {
      x: a.x + dv.x,
      y: a.y + dv.y
    }
  };
};
var scaleFromMidpoint = (line3, factor) => {
  const a = interpolate2(factor / 2, line3);
  const b = interpolate2(0.5 + factor / 2, line3);
  return { a, b };
};
var pointAtX = (line3, x) => {
  const y = line3.a.y + (x - line3.a.x) * slope(line3);
  return Object.freeze({ x, y });
};
var extendFromA = (line3, distance3) => {
  const len = length(line3);
  return Object.freeze({
    ...line3,
    a: line3.a,
    b: Object.freeze({
      x: line3.b.x + (line3.b.x - line3.a.x) / len * distance3,
      y: line3.b.y + (line3.b.y - line3.a.y) / len * distance3
    })
  });
};
function* pointsOf(line3) {
  const { a, b } = line3;
  let x0 = Math.floor(a.x);
  let y0 = Math.floor(a.y);
  const x1 = Math.floor(b.x);
  const y1 = Math.floor(b.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield { x: x0, y: y0 };
    if (x0 === x1 && y0 === y1)
      break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}
var distance = (line3, point3) => {
  if (Array.isArray(line3)) {
    const distances = line3.map((l) => distanceSingleLine(l, point3));
    return minFast(distances);
  } else {
    return distanceSingleLine(line3, point3);
  }
};
var distanceSingleLine = (line3, point3) => {
  guard2(line3, `line`);
  guard(point3, `point`);
  if (length(line3) === 0) {
    return length(line3.a, point3);
  }
  const near = nearest(line3, point3);
  return length(near, point3);
};
function interpolate2(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow)
    percent(amount, `amount`);
  else
    number(amount, ``, `amount`);
  const [a, b] = getPointsParam(aOrLine, pointBOrAllowOverflow);
  const d = length(a, b);
  const d2 = d * (1 - amount);
  if (d === 0 && d2 === 0)
    return Object.freeze({ ...b });
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({
    ...b,
    x,
    y
  });
}
function toString(a, b) {
  if (isLine(a)) {
    guard2(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0)
    throw new Error(`Expect second point if first is a point`);
  return Point_exports.toString(a) + `-` + Point_exports.toString(b);
}
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1))
    throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2))
    throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1))
    throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2))
    throw new Error(`y2 is NaN`);
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  return fromPoints(a, b);
};
var toFlatArray = (a, b) => {
  if (isLine(a)) {
    return [a.a.x, a.a.y, a.b.x, a.b.y];
  } else if (Point_exports.isPoint(a) && Point_exports.isPoint(b)) {
    return [a.x, a.y, b.x, b.y];
  } else {
    throw new Error(`Expected single line parameter, or a and b points`);
  }
};
function* asPoints(lines) {
  for (const l of lines) {
    yield l.a;
    yield l.b;
  }
}
var toSvgString = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];
var fromFlatArray = (arr) => {
  if (!Array.isArray(arr))
    throw new Error(`arr parameter is not an array`);
  if (arr.length !== 4)
    throw new Error(`array is expected to have length four`);
  return fromNumbers(arr[0], arr[1], arr[2], arr[3]);
};
var fromPoints = (a, b) => {
  guard(a, `a`);
  guard(b, `b`);
  a = Object.freeze({ ...a });
  b = Object.freeze({ ...b });
  return Object.freeze({
    a,
    b
  });
};
var joinPointsToLines = (...points) => {
  const lines = [];
  let start3 = points[0];
  for (let i = 1; i < points.length; i++) {
    lines.push(fromPoints(start3, points[i]));
    start3 = points[i];
  }
  return lines;
};
var fromPointsToPath = (a, b) => toPath(fromPoints(a, b));
var bbox = (line3) => Point_exports.bbox(line3.a, line3.b);
var toPath = (line3) => {
  const { a, b } = line3;
  return Object.freeze({
    ...line3,
    length: () => length(a, b),
    interpolate: (amount) => interpolate2(amount, a, b),
    bbox: () => bbox(line3),
    toString: () => toString(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate(line3, amountRadian, origin)),
    nearest: (point3) => nearest(line3, point3),
    sum: (point3) => toPath(sum(line3, point3)),
    divide: (point3) => toPath(divide(line3, point3)),
    multiply: (point3) => toPath(multiply(line3, point3)),
    subtract: (point3) => toPath(subtract(line3, point3)),
    midpoint: () => midpoint(a, b),
    distance: (point3) => distanceSingleLine(line3, point3),
    parallel: (distance3) => parallel(line3, distance3),
    perpendicularPoint: (distance3, amount) => perpendicularPoint(line3, distance3, amount),
    slope: () => slope(line3),
    withinRange: (point3, maxRange) => withinRange(line3, point3, maxRange),
    isEqual: (otherLine) => isEqual(line3, otherLine),
    apply: (fn) => toPath(apply(line3, fn)),
    kind: `line`
  });
};
var rotate = (line3, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0)
    return line3;
  if (origin === void 0)
    origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate2(origin, line3.a, line3.b);
  }
  return Object.freeze({
    ...line3,
    a: Point_exports.rotate(line3.a, amountRadian, origin),
    b: Point_exports.rotate(line3.b, amountRadian, origin)
  });
};

// src/Numbers.ts
var Numbers_exports = {};
__export(Numbers_exports, {
  average: () => average2,
  averageWeighted: () => averageWeighted2,
  filter: () => filter2,
  isValid: () => isValid,
  linearSpace: () => linearSpace,
  max: () => max2,
  min: () => min2,
  quantiseEvery: () => quantiseEvery,
  round: () => round,
  rounder: () => rounder,
  total: () => total2,
  tracker: () => tracker
});

// src/data/TrackerBase.ts
var TrackerBase = class {
  constructor(opts = {}) {
    __publicField(this, "seenCount");
    __publicField(this, "storeIntermediate");
    __publicField(this, "resetAfterSamples");
    __publicField(this, "sampleLimit");
    __publicField(this, "id");
    this.id = opts.id ?? `tracker`;
    this.sampleLimit = opts.sampleLimit ?? -1;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
    this.seenCount = 0;
  }
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  seen(...p) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    } else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
      this.seenCount = this.trimStore(this.sampleLimit);
      this.onTrimmed();
    }
    this.seenCount += p.length;
    const t4 = this.seenImpl(p);
    this.onSeen(t4);
  }
  onSeen(_p) {
  }
};

// src/data/PrimitiveTracker.ts
var PrimitiveTracker = class extends TrackerBase {
  constructor(opts) {
    super(opts);
    __publicField(this, "values");
    __publicField(this, "timestamps");
    this.values = [];
    this.timestamps = [];
  }
  trimStore(limit) {
    if (limit >= this.values.length)
      return this.values.length;
    this.values = this.values.slice(-limit);
    this.timestamps = this.timestamps.slice(-limit);
    return this.values.length;
  }
  onTrimmed() {
  }
  get last() {
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    if (this.values.length < 0)
      throw new Error(`No values seen yet`);
    return Date.now() - this.timestamps[0];
  }
  onReset() {
    this.values = [];
    this.timestamps = [];
  }
  seenImpl(p) {
    const last = p.at(-1);
    const now = Date.now();
    if (this.storeIntermediate) {
      this.values.push(...p);
      this.timestamps.push(...repeat(p.length, () => now));
    } else if (this.values.length === 0) {
      this.values.push(last);
      this.timestamps.push(now);
    } else if (this.values.length === 2) {
      this.values[1] = last;
      this.timestamps[1] = now;
    } else if (this.values.length === 1) {
      this.values.push(last);
      this.timestamps.push(now);
    }
    return p;
  }
};

// src/data/NumberTracker.ts
var NumberTracker = class extends PrimitiveTracker {
  constructor() {
    super(...arguments);
    __publicField(this, "total", 0);
    __publicField(this, "min", Number.MAX_SAFE_INTEGER);
    __publicField(this, "max", Number.MIN_SAFE_INTEGER);
  }
  get avg() {
    return this.total / this.seenCount;
  }
  difference() {
    if (this.last === void 0)
      return;
    if (this.initial === void 0)
      return;
    return this.last - this.initial;
  }
  relativeDifference() {
    if (this.last === void 0)
      return;
    if (this.initial === void 0)
      return;
    return this.last / this.initial;
  }
  onReset() {
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.total = 0;
    super.onReset();
  }
  onTrimmed() {
    this.min = minFast(this.values);
    this.max = maxFast(this.values);
    this.total = totalFast(this.values);
  }
  onSeen(values) {
    if (values.some((v) => Number.isNaN(v)))
      throw Error(`Cannot add NaN`);
    this.total = values.reduce((acc, v) => acc + v, this.total);
    this.min = Math.min(...values, this.min);
    this.max = Math.max(...values, this.max);
  }
  getMinMaxAvg() {
    return {
      min: this.min,
      max: this.max,
      avg: this.avg
    };
  }
};
var numberTracker = (opts = {}) => new NumberTracker(opts);

// src/Numbers.ts
var average2 = (...numbers) => average(numbers);
var averageWeighted2 = (weightings, ...numbers) => averageWeighted(numbers, weightings);
var min2 = (...data) => min(data);
var max2 = (...data) => max(data);
var total2 = (...data) => total(data);
var isValid = (possibleNumber) => {
  if (typeof possibleNumber !== `number`)
    return false;
  if (Number.isNaN(possibleNumber))
    return false;
  return true;
};
var tracker = (opts) => numberTracker(opts);
function* filter2(it) {
  for (const v of it) {
    if (isValid(v))
      yield v;
  }
}
var quantiseEvery = (v, every, middleRoundsUp = true) => {
  number(v, ``, `v`);
  integer(every, ``, `every`);
  let div = v / every;
  const divMod = div % 1;
  div = Math.floor(div);
  if (divMod === 0.5 && middleRoundsUp || divMod > 0.5)
    div++;
  return every * div;
};
function* linearSpace(start3, end, steps, precision) {
  number(start3, ``, `start`);
  number(end, ``, `end`);
  number(steps, ``, `steps`);
  const r = precision ? rounder(precision) : (v) => v;
  const step = (end - start3) / (steps - 1);
  number(step, ``, `step`);
  if (!Number.isFinite(step))
    throw new Error(`Calculated step value is infinite`);
  for (let i = 0; i < steps; i++) {
    const v = start3 + step * i;
    yield r(v);
  }
}
var round = (v, decimalPlaces = 0) => {
  number(v, ``, `v`);
  return rounder(decimalPlaces)(v);
};
var rounder = (decimalPlaces = 0) => {
  integer(decimalPlaces, `positive`, `decimalPlaces`);
  if (decimalPlaces === 0)
    return Math.round;
  const p = Math.pow(10, decimalPlaces);
  return (v) => Math.floor(v * p) / p;
};

// src/geometry/Point.ts
function getPointParam(a, b, c) {
  if (a === void 0)
    return { x: 0, y: 0 };
  if (Point_exports.isPoint(a)) {
    return a;
  } else if (typeof a !== `number` || typeof b !== `number`) {
    throw new Error(`Expected point or x,y as parameters. Got: a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  if (typeof c === `number`) {
    return Object.freeze({ x: a, y: b, z: c });
  }
  return Object.freeze({ x: a, y: b });
}
var dotProduct2 = (...pts) => {
  const a = pts.map((p) => Point_exports.toArray(p));
  return Arrays_exports.dotProduct(a);
};
var Empty2 = Object.freeze({ x: 0, y: 0 });
var Placeholder2 = Object.freeze({ x: NaN, y: NaN });
var isEmpty4 = (p) => p.x === 0 && p.y === 0;
var isPlaceholder2 = (p) => Number.isNaN(p.x) && Number.isNaN(p.y);
var isNull = (p) => p.x === null && p.y === null;
var isNaN2 = (p) => Number.isNaN(p.x) || Number.isNaN(p.y);
var findMinimum = (compareFn, ...points) => {
  if (points.length === 0)
    throw new Error(`No points provided`);
  let min4 = points[0];
  points.forEach((p) => {
    min4 = compareFn(min4, p);
  });
  return min4;
};
var leftmost = (...points) => findMinimum((a, b) => a.x <= b.x ? a : b, ...points);
var rightmost = (...points) => findMinimum((a, b) => a.x >= b.x ? a : b, ...points);
function distance2(a, xOrB, y, z) {
  const pt = getPointParam(xOrB, y, z);
  guard(pt);
  if (isPoint3d(pt) && isPoint3d(a)) {
    return Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z);
  } else {
    return Math.hypot(pt.x - a.x, pt.y - a.y);
  }
}
var distanceToExterior = (a, shape) => {
  if (Rect_exports.isRectPositioned(shape)) {
    return Rect_exports.distanceFromExterior(shape, a);
  }
  if (Circle_exports.isCirclePositioned(shape)) {
    return Circle_exports.distanceFromExterior(shape, a);
  }
  if (isPoint(shape))
    return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var distanceToCenter = (a, shape) => {
  if (Rect_exports.isRectPositioned(shape)) {
    return Rect_exports.distanceFromExterior(shape, a);
  }
  if (Circle_exports.isCirclePositioned(shape)) {
    return Circle_exports.distanceFromExterior(shape, a);
  }
  if (isPoint(shape))
    return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
function guard(p, name = `Point`) {
  if (p === void 0)
    throw new Error(`'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p === null)
    throw new Error(`'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p.x === void 0)
    throw new Error(`'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p.y === void 0)
    throw new Error(`'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (typeof p.x !== `number`)
    throw new Error(`'${name}.x' must be a number. Got ${p.x}`);
  if (typeof p.y !== `number`)
    throw new Error(`'${name}.y' must be a number. Got ${p.y}`);
  if (p.x === null)
    throw new Error(`'${name}.x' is null`);
  if (p.y === null)
    throw new Error(`'${name}.y' is null`);
  if (Number.isNaN(p.x))
    throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p.y))
    throw new Error(`'${name}.y' is NaN`);
}
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard(pt, name);
  number(pt.x, `nonZero`, `${name}.x`);
  number(pt.y, `nonZero`, `${name}.y`);
  return true;
};
var abs = (pt) => ({
  ...pt,
  x: Math.abs(pt.x),
  y: Math.abs(pt.y)
});
var angle = (a, b, c) => {
  if (b === void 0) {
    return Math.atan2(a.y, a.x);
  } else if (c !== void 0) {
    return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var centroid = (...points) => {
  if (!Array.isArray(points))
    throw new Error(`Expected list of points`);
  const sum5 = points.reduce((prev, p) => {
    if (p === void 0)
      return prev;
    if (Array.isArray(p))
      throw new Error(`'points' list contains an array. Did you mean: centroid(...myPoints)?`);
    if (!isPoint(p))
      throw new Error(`'points' contains something which is not a point: ${JSON.stringify(p)}`);
    return {
      x: prev.x + p.x,
      y: prev.y + p.y
    };
  }, { x: 0, y: 0 });
  return Object.freeze({
    x: sum5.x / points.length,
    y: sum5.y / points.length
  });
};
var bbox2 = (...points) => {
  const leftMost = findMinimum((a, b) => {
    if (a.x < b.x)
      return a;
    else
      return b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    if (a.x > b.x)
      return a;
    else
      return b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    if (a.y < b.y)
      return a;
    else
      return b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    if (a.y > b.y)
      return a;
    else
      return b;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return Rect_exports.maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};
function isPoint(p) {
  if (p === void 0)
    return false;
  if (p === null)
    return false;
  if (p.x === void 0)
    return false;
  if (p.y === void 0)
    return false;
  return true;
}
var isPoint3d = (p) => {
  if (p === void 0)
    return false;
  if (p === null)
    return false;
  if (p.x === void 0)
    return false;
  if (p.y === void 0)
    return false;
  if (p.z === void 0)
    return false;
  return true;
};
var toArray2 = (p) => [p.x, p.y];
function toString2(p, digits) {
  if (p === void 0)
    return `(undefined)`;
  if (p === null)
    return `(null)`;
  const x = digits ? p.x.toFixed(digits) : p.x;
  const y = digits ? p.y.toFixed(digits) : p.y;
  if (p.z !== void 0) {
    const z = digits ? p.z.toFixed(digits) : p.z;
    return `(${x},${y},${z})`;
  } else {
    return `(${x},${y})`;
  }
}
var isEqual2 = (...p) => {
  if (p === void 0)
    throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2)
    return true;
  for (let i = 1; i < p.length; i++) {
    if (p[i].x !== p[0].x)
      return false;
    if (p[i].y !== p[0].y)
      return false;
  }
  return true;
};
var withinRange2 = (a, b, maxRange) => {
  if (typeof maxRange === `number`) {
    maxRange = { x: maxRange, y: maxRange };
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};
var interpolate3 = (amount, a, b, allowOverflow = false) => interpolate2(amount, a, b, allowOverflow);
var from = (xOrArray, y) => {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length !== 2)
      throw new Error(`Expected array of length two, got ` + xOrArray.length);
    return Object.freeze({
      x: xOrArray[0],
      y: xOrArray[1]
    });
  } else {
    if (xOrArray === void 0)
      xOrArray = 0;
    else if (Number.isNaN(xOrArray))
      throw new Error(`x is NaN`);
    if (y === void 0)
      y = 0;
    else if (Number.isNaN(y))
      throw new Error(`y is NaN`);
    return Object.freeze({ x: xOrArray, y });
  }
};
var fromNumbers2 = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    coords.forEach((coord) => {
      if (!(coord.length % 2 === 0))
        throw new Error(`coords array should be even-numbered`);
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    });
  } else {
    if (coords.length % 2 !== 0)
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    for (let i = 0; i < coords.length; i += 2) {
      pts.push(Object.freeze({ x: coords[i], y: coords[i + 1] }));
    }
  }
  return pts;
};
function subtract2(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      guard(b, `b`);
      return Object.freeze({
        ...a,
        x: a.x - b.x,
        y: a.y - b.y
      });
    } else {
      if (c === void 0)
        c = b;
      return Object.freeze({
        ...a,
        x: a.x - b,
        y: a.y - c
      });
    }
  } else {
    number(a, ``, `a`);
    if (typeof b !== `number`)
      throw new Error(`Second parameter is expected to by y value`);
    number(b, ``, `b`);
    if (Number.isNaN(c))
      throw new Error(`Third parameter is NaN`);
    if (Number.isNaN(d))
      throw new Error(`Fourth parameter is NaN`);
    if (c === void 0)
      c = 0;
    if (d === void 0)
      d = 0;
    return Object.freeze({
      x: a - c,
      y: b - d
    });
  }
}
var apply2 = (pt, fn) => Object.freeze({
  ...pt,
  x: fn(pt.x, `x`),
  y: fn(pt.y, `y`)
});
var pipelineApply = (pt, ...pipelineFns) => pipeline(...pipelineFns)(pt);
var pipeline = (...pipeline2) => (pt) => pipeline2.reduce((prev, curr) => curr(prev), pt);
var reduce = (pts, fn, initial = { x: 0, y: 0 }) => {
  let acc = initial;
  pts.forEach((p) => {
    acc = fn(p, acc);
  });
  return acc;
};
var sum2 = function(a, b, c, d) {
  if (a === void 0)
    throw new Error(`a missing. a: ${a}`);
  let ptA;
  let ptB;
  if (isPoint(a)) {
    ptA = a;
    if (b === void 0)
      b = Empty2;
    if (isPoint(b)) {
      ptB = b;
    } else {
      if (b === void 0)
        throw new Error(`Expects x coordinate`);
      ptB = { x: b, y: c === void 0 ? b : c };
    }
  } else if (!isPoint(b)) {
    if (b === void 0)
      throw new Error(`Expected number as second param`);
    ptA = { x: a, y: b };
    if (c === void 0)
      throw new Error(`Expects x coordiante`);
    ptB = { x: c, y: d === void 0 ? 0 : d };
  }
  if (ptA === void 0)
    throw new Error(`ptA missing. a: ${a}`);
  if (ptB === void 0)
    throw new Error(`ptB missing. b: ${b}`);
  guard(ptA, `a`);
  guard(ptB, `b`);
  return Object.freeze({
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  });
};
function multiply2(a, bOrX, y) {
  guard(a, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`)
      y = bOrX;
    number(y, ``, `y`);
    number(bOrX, ``, `x`);
    return Object.freeze({ x: a.x * bOrX, y: a.y * y });
  } else if (isPoint(bOrX)) {
    guard(bOrX, `b`);
    return Object.freeze({
      x: a.x * bOrX.x,
      y: a.y * bOrX.y
    });
  } else if (Rect_exports.isRect(bOrX)) {
    Rect_exports.guard(bOrX, `rect`);
    return Object.freeze({
      x: a.x * bOrX.width,
      y: a.y * bOrX.height
    });
  } else
    throw new Error(`Invalid arguments. a: ${JSON.stringify(a)} b: ${JSON.stringify(bOrX)}`);
}
var multiplyScalar = (pt, v) => {
  if (isPoint3d(pt)) {
    return Object.freeze({
      ...pt,
      x: pt.x * v,
      y: pt.y * v,
      z: pt.z * v
    });
  } else {
    return Object.freeze({
      ...pt,
      x: pt.x * v,
      y: pt.y * v
    });
  }
};
function divide2(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      guardNonZeroPoint(b);
      return Object.freeze({
        x: a.x / b.x,
        y: a.y / b.y
      });
    } else if (Rect_exports.isRect(b)) {
      Rect_exports.guard(b, `rect`);
      return Object.freeze({
        x: a.x / b.width,
        y: a.y / b.height
      });
    } else {
      if (c === void 0)
        c = b;
      guard(a);
      number(b, `nonZero`, `x`);
      number(c, `nonZero`, `y`);
      return Object.freeze({
        x: a.x / b,
        y: a.y / c
      });
    }
  } else {
    if (typeof b !== `number`)
      throw new Error(`expected second parameter to be y1 coord`);
    number(a, `positive`, `x1`);
    number(b, `positive`, `y1`);
    if (c === void 0)
      c = 1;
    if (d === void 0)
      d = c;
    number(c, `nonZero`, `x2`);
    number(d, `nonZero`, `y2`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
var quantiseEvery2 = (pt, snap, middleRoundsUp = true) => Object.freeze({
  x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
  y: quantiseEvery(pt.y, snap.y, middleRoundsUp)
});
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1)
    return sorted;
  const x = (points) => {
    const v = [];
    points.forEach((p) => {
      while (v.length >= 2) {
        const q = v[v.length - 1];
        const r = v[v.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) {
          v.pop();
        } else
          break;
      }
      v.push(p);
    });
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual2(lower[0], upper[0]))
    return upper;
  return upper.concat(lower);
};
var compare = (a, b) => {
  if (a.x < b.x && a.y < b.y)
    return -2;
  if (a.x > b.x && a.y > b.y)
    return 2;
  if (a.x < b.x || a.y < b.y)
    return -1;
  if (a.x > b.x || a.y > b.y)
    return 1;
  if (a.x === b.x && a.x === b.y)
    return 0;
  return NaN;
};
var compareByX = (a, b) => a.x - b.x || a.y - b.y;
var project = (origin, distance3, angle2) => {
  const x = Math.cos(angle2) * distance3 + origin.x;
  const y = Math.sin(angle2) * distance3 + origin.y;
  return { x, y };
};
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0)
    origin = { x: 0, y: 0 };
  guard(origin, `origin`);
  number(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0)
    return pt;
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  ptAr.forEach((p, index) => guard(p, `pt[${index}]`));
  const asPolar = ptAr.map((p) => Polar_exports.fromCartesian(p, origin));
  const rotated = asPolar.map((p) => Polar_exports.rotate(p, amountRadian));
  const asCartesisan = rotated.map((p) => Polar_exports.toCartesian(p, origin));
  if (arrayInput)
    return asCartesisan;
  else
    return asCartesisan[0];
}
var rotatePointArray = (v, amountRadian) => {
  const mat = [[Math.cos(amountRadian), -Math.sin(amountRadian)], [Math.sin(amountRadian), Math.cos(amountRadian)]];
  const result = [];
  for (let i = 0; i < v.length; ++i) {
    result[i] = [mat[0][0] * v[i][0] + mat[0][1] * v[i][1], mat[1][0] * v[i][0] + mat[1][1] * v[i][1]];
  }
  return result;
};
var length2 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0)
    throw new Error(`Expected y`);
  return Math.sqrt(ptOrX * ptOrX + y * y);
};
var normalise = (ptOrX, y) => {
  const pt = getPointParam(ptOrX, y);
  const l = length2(pt);
  if (l === 0)
    return Point_exports.Empty;
  return Object.freeze({
    x: pt.x / l,
    y: pt.y / l
  });
};
function normaliseByRect2(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) {
      number(b, `positive`, `width`);
      number(c, `positive`, `height`);
    } else {
      if (!Rect_exports.isRect(b))
        throw new Error(`Expected second parameter to be a rect`);
      c = b.height;
      b = b.width;
    }
    return Object.freeze({
      x: a.x / b,
      y: a.y / c
    });
  } else {
    number(a, `positive`, `x`);
    if (typeof b !== `number`)
      throw new Error(`Expecting second parameter to be a number (width)`);
    if (typeof c !== `number`)
      throw new Error(`Expecting third parameter to be a number (height)`);
    number(b, `positive`, `y`);
    number(c, `positive`, `width`);
    if (d === void 0)
      throw new Error(`Expected height parameter`);
    number(d, `positive`, `height`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
var random = (rando) => {
  if (rando === void 0)
    rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando()
  });
};
var wrap2 = (pt, ptMax = { x: 1, y: 1 }, ptMin = { x: 0, y: 0 }) => {
  guard(pt, `pt`);
  guard(ptMax, `ptMax`);
  guard(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap(pt.x, ptMin.x, ptMax.x),
    y: wrap(pt.y, ptMin.y, ptMax.y)
  });
};
var invert = (pt, what = `both`) => {
  switch (what) {
    case `both`:
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          x: pt.x * -1,
          y: pt.y * -1,
          z: pt.z * -1
        });
      } else {
        return Object.freeze({
          ...pt,
          x: pt.x * -1,
          y: pt.y * -1
        });
      }
    case `x`:
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    case `y`:
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    case `z`:
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          z: pt.z * -1
        });
      } else
        throw new Error(`pt parameter is missing z`);
    default:
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
  }
};
var toIntegerValues = (pt, rounder2 = Math.round) => {
  guard(pt, `pt`);
  return Object.freeze({
    x: rounder2(pt.x),
    y: rounder2(pt.y)
  });
};
var clampMagnitude = (pt, max4 = 1, min4 = 0) => {
  const length5 = distance2(pt);
  let ratio = 1;
  if (length5 > max4) {
    ratio = max4 / length5;
  } else if (length5 < min4) {
    ratio = min4 / length5;
  }
  return ratio === 1 ? pt : multiply2(pt, ratio, ratio);
};
function clamp2(a, b, c, d) {
  if (isPoint(a)) {
    if (b === void 0)
      b = 0;
    if (c === void 0)
      c = 1;
    number(b, ``, `min`);
    number(c, ``, `max`);
    return Object.freeze({
      x: clamp(a.x, b, c),
      y: clamp(a.y, b, c)
    });
  } else {
    if (b === void 0)
      throw new Error(`Expected y coordinate`);
    if (c === void 0)
      c = 0;
    if (d === void 0)
      d = 1;
    number(a, ``, `x`);
    number(b, ``, `y`);
    number(c, ``, `min`);
    number(d, ``, `max`);
    return Object.freeze({
      x: clamp(a, c, d),
      y: clamp(b, c, d)
    });
  }
}
var relation = (a, b) => {
  const start3 = getPointParam(a, b);
  let totalX = 0;
  let totalY = 0;
  let count = 0;
  let lastUpdate = performance.now();
  let lastPoint = start3;
  const update = (aa, bb) => {
    const p = getPointParam(aa, bb);
    totalX += p.x;
    totalY += p.y;
    count++;
    const distanceFromStart = distance2(p, start3);
    const distanceFromLast = distance2(p, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p;
    return Object.freeze({
      angle: angle(p, start3),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid(p, start3),
      average: {
        x: totalX / count,
        y: totalY / count
      }
    });
  };
  return update;
};
var progressBetween = (currentPos, from2, to) => {
  const a = Point_exports.subtract(currentPos, from2);
  const b = Point_exports.subtract(to, from2);
  if (Point_exports.isPoint3d(a) && Point_exports.isPoint3d(b)) {
    return (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z);
  } else {
    return (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
  }
};

// src/geometry/Arc.ts
var isArc = (p) => p.startRadian !== void 0 && p.endRadian !== void 0;
var isPositioned = (p) => p.x !== void 0 && p.y !== void 0;
var piPi = Math.PI * 2;
function fromDegrees(radius, startDegrees, endDegrees, origin) {
  const a = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees)
  };
  if (isPoint(origin)) {
    guard(origin);
    const ap = {
      ...a,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else {
    return Object.freeze(a);
  }
}
var toLine = (arc2) => Line_exports.fromPoints(
  point(arc2, arc2.startRadian),
  point(arc2, arc2.endRadian)
);
var point = (arc2, angleRadian2, origin) => {
  if (angleRadian2 > arc2.endRadian)
    throw new Error(`angleRadian beyond end angle of arc`);
  if (angleRadian2 < arc2.startRadian)
    throw new Error(`angleRadian beyond start angle of arc`);
  if (origin === void 0) {
    if (isPositioned(arc2)) {
      origin = arc2;
    } else {
      origin = { x: 0, y: 0 };
    }
  }
  return {
    x: Math.cos(angleRadian2) * arc2.radius + origin.x,
    y: Math.sin(angleRadian2) * arc2.radius + origin.y
  };
};
var guard3 = (arc2) => {
  if (arc2 === void 0)
    throw new Error(`Arc is undefined`);
  if (isPositioned(arc2)) {
    guard(arc2, `arc`);
  }
  if (arc2.radius === void 0)
    throw new Error(`Arc radius is undefined (${JSON.stringify(arc2)})`);
  if (typeof arc2.radius !== `number`)
    throw new Error(`Radius must be a number`);
  if (Number.isNaN(arc2.radius))
    throw new Error(`Radius is NaN`);
  if (arc2.radius <= 0)
    throw new Error(`Radius must be greater than zero`);
  if (arc2.startRadian === void 0)
    throw new Error(`Arc is missing 'startRadian' field`);
  if (arc2.endRadian === void 0)
    throw new Error(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc2.endRadian))
    throw new Error(`Arc endRadian is NaN`);
  if (Number.isNaN(arc2.startRadian))
    throw new Error(`Arc endRadian is NaN`);
  if (arc2.startRadian >= arc2.endRadian)
    throw new Error(`startRadian is expected to be les than endRadian`);
};
var interpolate4 = (amount, arc2, origin) => {
  guard3(arc2);
  return point(arc2, arc2.startRadian + (arc2.endRadian - arc2.startRadian) * amount, origin);
};
var toPath2 = (arc2) => {
  guard3(arc2);
  return Object.freeze({
    ...arc2,
    nearest: (point3) => {
      throw new Error(`not implemented`);
    },
    interpolate: (amount) => interpolate4(amount, arc2),
    bbox: () => bbox3(arc2),
    length: () => length3(arc2),
    toSvgString: () => toSvg(arc2),
    kind: `arc`
  });
};
var length3 = (arc2) => piPi * arc2.radius * ((arc2.startRadian - arc2.endRadian) / piPi);
var bbox3 = (arc2) => {
  if (isPositioned(arc2)) {
    const middle = interpolate4(0.5, arc2);
    const asLine = toLine(arc2);
    return Point_exports.bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc2.radius * 2,
      height: arc2.radius * 2
    };
  }
};
var toSvg = (a, b, c, d, e) => {
  if (isArc(a)) {
    if (isPositioned(a)) {
      return toSvgFull(a, a.radius, a.startRadian, a.endRadian, b);
    } else {
      if (isPoint(b)) {
        return toSvgFull(b, a.radius, a.startRadian, a.endRadian, c);
      } else {
        return toSvgFull({ x: 0, y: 0 }, a.radius, a.startRadian, a.endRadian);
      }
    }
  } else {
    if (c === void 0)
      throw new Error(`startAngle undefined`);
    if (d === void 0)
      throw new Error(`endAngle undefined`);
    if (isPoint(a)) {
      if (typeof b === `number` && typeof c === `number` && typeof d === `number`) {
        return toSvgFull(a, b, c, d, e);
      } else {
        throw new Error(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`)
    opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start3 = Polar_exports.toCartesian(radius, endRadian - 0.01, origin);
  const end = Polar_exports.toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start3.x} ${start3.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle)
    d.push(`z`);
  return d;
};
var distanceCenter = (a, b) => Point_exports.distance(a, b);
var isEqual3 = (a, b) => {
  if (a.radius !== b.radius)
    return false;
  if (isPositioned(a) && isPositioned(b)) {
    if (a.x !== b.x)
      return false;
    if (a.y !== b.y)
      return false;
    if (a.z !== b.z)
      return false;
    return true;
  } else if (!isPositioned(a) && !isPositioned(b)) {
  } else
    return false;
  if (a.endRadian !== b.endRadian)
    return false;
  if (a.startRadian !== b.startRadian)
    return false;
  return true;
};

// src/geometry/Bezier.ts
var Bezier_exports = {};
__export(Bezier_exports, {
  computeQuadraticSimple: () => computeQuadraticSimple,
  cubic: () => cubic,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticBend: () => quadraticBend,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath3
});

// node_modules/bezier-js/src/utils.js
var { abs: abs2, cos, sin, acos, atan2, sqrt, pow } = Math;
function crt(v) {
  return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi = Math.PI;
var tau = 2 * pi;
var quart = pi / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = { x: 0, y: 0, z: 0 };
var utils = {
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(t4, derivativeFn) {
    const d = derivativeFn(t4);
    let l = d.x * d.x + d.y * d.y;
    if (typeof d.z !== "undefined") {
      l += d.z * d.z;
    }
    return sqrt(l);
  },
  compute: function(t4, points, _3d) {
    if (t4 === 0) {
      points[0].t = 0;
      return points[0];
    }
    const order = points.length - 1;
    if (t4 === 1) {
      points[order].t = 1;
      return points[order];
    }
    const mt = 1 - t4;
    let p = points;
    if (order === 0) {
      points[0].t = t4;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p[0].x + t4 * p[1].x,
        y: mt * p[0].y + t4 * p[1].y,
        t: t4
      };
      if (_3d) {
        ret.z = mt * p[0].z + t4 * p[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t4 * t4, a, b, c, d = 0;
      if (order === 2) {
        p = [p[0], p[1], p[2], ZERO];
        a = mt2;
        b = mt * t4 * 2;
        c = t22;
      } else if (order === 3) {
        a = mt2 * mt;
        b = mt2 * t4 * 3;
        c = mt * t22 * 3;
        d = t4 * t22;
      }
      const ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
        t: t4
      };
      if (_3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      }
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t4,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t4
        };
        if (typeof dCpts[i].z !== "undefined") {
          dCpts[i] = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t4;
        }
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t4;
    return dCpts[0];
  },
  computeWithRatios: function(t4, points, ratios, _3d) {
    const mt = 1 - t4, r = ratios, p = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
    f1 *= mt;
    f2 *= t4;
    if (p.length === 2) {
      d = f1 + f2;
      return {
        x: (f1 * p[0].x + f2 * p[1].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
        t: t4
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t4 * t4;
    if (p.length === 3) {
      d = f1 + f2 + f3;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
        t: t4
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t4 * t4 * t4;
    if (p.length === 4) {
      d = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
        t: t4
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
      const list = [];
      for (let j = 0, dpt; j < c; j++) {
        dpt = {
          x: c * (p[j + 1].x - p[j].x),
          y: c * (p[j + 1].y - p[j].y)
        };
        if (_3d) {
          dpt.z = c * (p[j + 1].z - p[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p = list;
    }
    return dpoints;
  },
  between: function(v, m, M) {
    return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
  },
  approximately: function(a, b, precision) {
    return abs2(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum5 = 0;
    for (let i = 0, t4; i < len; i++) {
      t4 = z * utils.Tvalues[i] + z;
      sum5 += utils.Cvalues[i] * utils.arcfn(t4, derivativeFn);
    }
    return z * sum5;
  },
  map: function(v, ds, de, ts, te) {
    const d1 = de - ds, d2 = te - ts, v2 = v - ds, r = v2 / d1;
    return ts + d2 * r;
  },
  lerp: function(r, v1, v2) {
    const ret = {
      x: v1.x + r * (v2.x - v1.x),
      y: v1.y + r * (v2.y - v1.y)
    };
    if (v1.z !== void 0 && v2.z !== void 0) {
      ret.z = v1.z + r * (v2.z - v1.z);
    }
    return ret;
  },
  pointToString: function(p) {
    let s = p.x + "/" + p.y;
    if (typeof p.z !== "undefined") {
      s += "/" + p.z;
    }
    return s;
  },
  pointsToString: function(points) {
    return "[" + points.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot2 = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot2);
  },
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
  },
  closest: function(LUT, point3) {
    let mdist = pow(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point3, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t4, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    } else if (t4 === 0 || t4 === 1) {
      return t4;
    }
    const bottom = pow(t4, n) + pow(1 - t4, n), top = bottom - 1;
    return abs2(top / bottom);
  },
  projectionratio: function(t4, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    } else if (t4 === 0 || t4 === 1) {
      return t4;
    }
    const top = pow(1 - t4, n), bottom = pow(t4, n) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d == 0) {
      return false;
    }
    return { x: nx / d, y: ny / d };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(
      p1.x,
      p1.y,
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2,
      p2.x,
      p2.y
    );
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox7 = s.bbox();
      if (mx > bbox7.x.min)
        mx = bbox7.x.min;
      if (my > bbox7.y.min)
        my = bbox7.y.min;
      if (MX < bbox7.x.max)
        MX = bbox7.x.max;
      if (MY < bbox7.y.max)
        MY = bbox7.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox22, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox22))
      return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual)
        return;
      a2.forEach(function(l2) {
        if (l2.virtual)
          return;
        const iss = l1.intersects(l2, curveIntersectionThreshold);
        if (iss.length > 0) {
          iss.c1 = l1;
          iss.c2 = l2;
          iss.s1 = s1;
          iss.s2 = s2;
          intersections2.push(iss);
        }
      });
    });
    return intersections2;
  },
  makeshape: function(forward, back, curveIntersectionThreshold) {
    const bpl = back.points.length;
    const fpl = forward.points.length;
    const start3 = utils.makeline(back.points[bpl - 1], forward.points[0]);
    const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
    const shape = {
      startcap: start3,
      forward,
      back,
      endcap: end,
      bbox: utils.findbbox([start3, forward, back, end])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(
        shape,
        shape.bbox,
        s2,
        s2.bbox,
        curveIntersectionThreshold
      );
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list)
      return { min: 0, max: 0 };
    let min4 = nMax, max4 = nMin, t4, c;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t4 = list[i];
      c = curve.get(t4);
      if (c[d] < min4) {
        min4 = c[d];
      }
      if (c[d] > max4) {
        max4 = c[d];
      }
    }
    return { min: min4, mid: (min4 + max4) / 2, max: max4, size: max4 - min4 };
  },
  align: function(points, line3) {
    const tx = line3.p1.x, ty = line3.p1.y, a = -atan2(line3.p2.y - ty, line3.p2.x - tx), d = function(v) {
      return {
        x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
        y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
      };
    };
    return points.map(d);
  },
  roots: function(points, line3) {
    line3 = line3 || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points.length - 1;
    const aligned = utils.align(points, line3);
    const reduce2 = function(t4) {
      return 0 <= t4 && t4 <= 1;
    };
    if (order === 2) {
      const a2 = aligned[0].y, b2 = aligned[1].y, c2 = aligned[2].y, d2 = a2 - 2 * b2 + c2;
      if (d2 !== 0) {
        const m1 = -sqrt(b2 * b2 - a2 * c2), m2 = -a2 + b2, v12 = -(m1 + m2) / d2, v2 = -(-m1 + m2) / d2;
        return [v12, v2].filter(reduce2);
      } else if (b2 !== c2 && d2 === 0) {
        return [(2 * b2 - c2) / (2 * b2 - 2 * c2)].filter(reduce2);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
    if (utils.approximately(d, 0)) {
      if (utils.approximately(a, 0)) {
        if (utils.approximately(b, 0)) {
          return [];
        }
        return [-c / b].filter(reduce2);
      }
      const q3 = sqrt(b * b - 4 * a * c), a2 = 2 * a;
      return [(q3 - b) / a2, (-b - q3) / a2].filter(reduce2);
    }
    a /= d;
    b /= d;
    c /= d;
    const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p / 3, mp33 = mp3 * mp3 * mp3, r = sqrt(mp33), t4 = -q / (2 * r), cosphi = t4 < -1 ? -1 : t4 > 1 ? 1 : t4, phi = acos(cosphi), crtr = crt(r), t12 = 2 * crtr;
      x1 = t12 * cos(phi / 3) - a / 3;
      x2 = t12 * cos((phi + tau) / 3) - a / 3;
      x3 = t12 * cos((phi + 2 * tau) / 3) - a / 3;
      return [x1, x2, x3].filter(reduce2);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce2);
    } else {
      const sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce2);
    }
  },
  droots: function(p) {
    if (p.length === 3) {
      const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
      if (d !== 0) {
        const m1 = -sqrt(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
        return [v1, v2];
      } else if (b !== c && d === 0) {
        return [(2 * b - c) / (2 * (b - c))];
      }
      return [];
    }
    if (p.length === 2) {
      const a = p[0], b = p[1];
      if (a !== b) {
        return [a / (a - b)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t4, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d = utils.compute(t4, d1);
    const dd = utils.compute(t4, d2);
    const qdsum = d.x * d.x + d.y * d.y;
    if (_3d) {
      num = sqrt(
        pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2)
      );
      dnm = pow(qdsum + d.z * d.z, 3 / 2);
    } else {
      num = d.x * dd.y - d.y * dd.x;
      dnm = pow(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) {
      return { k: 0, r: 0 };
    }
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t4 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t4 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs2(nk - k) + abs2(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points) {
    if (points.length < 4)
      return [];
    const p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t4 = -v3 / v2;
        if (0 <= t4 && t4 <= 1)
          return [t4];
      }
      return [];
    }
    const d2 = 2 * v1;
    if (utils.approximately(d2, 0))
      return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0)
      return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t4, d; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t4 = b2[dim].mid;
      d = (b1[dim].size + b2[dim].size) / 2;
      if (abs2(l - t4) >= d)
        return false;
    }
    return true;
  },
  expandbox: function(bbox7, _bbox) {
    if (_bbox.x.min < bbox7.x.min) {
      bbox7.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox7.y.min) {
      bbox7.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox7.z.min) {
      bbox7.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox7.x.max) {
      bbox7.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox7.y.max) {
      bbox7.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox7.z.max) {
      bbox7.z.max = _bbox.z.max;
    }
    bbox7.x.mid = (bbox7.x.min + bbox7.x.max) / 2;
    bbox7.y.mid = (bbox7.y.min + bbox7.y.max) / 2;
    if (bbox7.z) {
      bbox7.z.mid = (bbox7.z.min + bbox7.z.max) / 2;
    }
    bbox7.x.size = bbox7.x.max - bbox7.x.min;
    bbox7.y.size = bbox7.y.max - bbox7.y.min;
    if (bbox7.z) {
      bbox7.z.size = bbox7.z.max - bbox7.z.min;
    }
  },
  pairiteration: function(c1, c2, curveIntersectionThreshold) {
    const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c1.split(0.5), cc2 = c2.split(0.5), pairs = [
      { left: cc1.left, right: cc2.left },
      { left: cc1.left, right: cc2.right },
      { left: cc1.right, right: cc2.right },
      { left: cc1.right, right: cc2.left }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0)
      return results;
    pairs.forEach(function(pair) {
      results = results.concat(
        utils.pairiteration(pair.left, pair.right, threshold)
      );
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos(quart) - dy1 * sin(quart), dy1p = dx1 * sin(quart) + dy1 * cos(quart), dx2p = dx2 * cos(quart) - dy2 * sin(quart), dy2p = dx2 * sin(quart) + dy2 * cos(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc2 = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc2, p1);
    let s = atan2(p1.y - arc2.y, p1.x - arc2.x), m = atan2(p2.y - arc2.y, p2.x - arc2.x), e = atan2(p3.y - arc2.y, p3.x - arc2.x), _;
    if (s < e) {
      if (s > m || m > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m && m < s) {
        _ = e;
        e = s;
        s = _;
      } else {
        e += tau;
      }
    }
    arc2.s = s;
    arc2.e = e;
    arc2.r = r;
    return arc2;
  },
  numberSort: function(a, b) {
    return a - b;
  }
};

// node_modules/bezier-js/src/poly-bezier.js
var PolyBezier = class {
  constructor(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(curve) {
      return utils.pointsToString(curve.points);
    }).join(", ") + "]";
  }
  addCurve(curve) {
    this.curves.push(curve);
    this._3d = this._3d || curve._3d;
  }
  length() {
    return this.curves.map(function(v) {
      return v.length();
    }).reduce(function(a, b) {
      return a + b;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c = this.curves;
    var bbox7 = c[0].bbox();
    for (var i = 1; i < c.length; i++) {
      utils.expandbox(bbox7, c[i].bbox());
    }
    return bbox7;
  }
  offset(d) {
    const offset2 = [];
    this.curves.forEach(function(v) {
      offset2.push(...v.offset(d));
    });
    return new PolyBezier(offset2);
  }
};

// node_modules/bezier-js/src/bezier.js
var { abs: abs3, min: min3, max: max3, cos: cos2, sin: sin2, acos: acos2, sqrt: sqrt2 } = Math;
var pi2 = Math.PI;
var Bezier = class {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point4) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point4[d] !== "undefined") {
            newargs.push(point4[d]);
          }
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point3 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point3.z = args[idx + 2];
      }
      points.push(point3);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d)
      dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, { p1: points[0], p2: points[order] });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t4, p) => t4 + abs3(p.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t4) {
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    }
    if (t4 === 0) {
      return new Bezier(p2, p2, p3);
    }
    if (t4 === 1) {
      return new Bezier(p1, p2, p2);
    }
    const abc = Bezier.getABC(2, p1, p2, p3, t4);
    return new Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S2, B2, E2, t4, d1) {
    if (typeof t4 === "undefined") {
      t4 = 0.5;
    }
    const abc = Bezier.getABC(3, S2, B2, E2, t4);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B2, abc.C);
    }
    const d2 = d1 * (1 - t4) / t4;
    const selen = utils.dist(S2, E2), lx = (E2.x - S2.x) / selen, ly = (E2.y - S2.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B2.x - bx1, y: B2.y - by1 }, e2 = { x: B2.x + bx2, y: B2.y + by2 }, A2 = abc.A, v1 = { x: A2.x + (e1.x - A2.x) / (1 - t4), y: A2.y + (e1.y - A2.y) / (1 - t4) }, v2 = { x: A2.x + (e2.x - A2.x) / t4, y: A2.y + (e2.y - A2.y) / t4 }, nc1 = { x: S2.x + (v1.x - S2.x) / t4, y: S2.y + (v1.y - S2.y) / t4 }, nc2 = {
      x: E2.x + (v2.x - E2.x) / (1 - t4),
      y: E2.y + (v2.y - E2.y) / (1 - t4)
    };
    return new Bezier(S2, nc1, nc2, E2);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return Bezier.getUtils();
  }
  static get PolyBezier() {
    return PolyBezier;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return utils.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d)
      return false;
    const p = this.points, x = p[0].x, y = p[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last = p.length; i < last; i++) {
      s.push(p[i].x);
      s.push(p[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) {
      throw new Error("incorrect number of ratio values");
    }
    this.ratios = ratios;
    this._lut = [];
  }
  verify() {
    const print = this.coordDigest();
    if (print !== this._print) {
      this._print = print;
      this.update();
    }
  }
  coordDigest() {
    return this.points.map(function(c, pos) {
      return "" + pos + c.x + c.y + (c.z ? c.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points = this.points;
    const angle2 = utils.angle(points[0], points[this.order], points[1]);
    this.clockwise = angle2 > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S2, B2, E2, t4 = 0.5) {
    const u = utils.projectionratio(t4, order), um = 1 - u, C2 = {
      x: u * S2.x + um * E2.x,
      y: u * S2.y + um * E2.y
    }, s = utils.abcratio(t4, order), A2 = {
      x: B2.x + (B2.x - C2.x) / s,
      y: B2.y + (B2.y - C2.y) / s
    };
    return { A: A2, B: B2, C: C2, S: S2, E: E2 };
  }
  getABC(t4, B2) {
    B2 = B2 || this.get(t4);
    let S2 = this.points[0];
    let E2 = this.points[this.order];
    return Bezier.getABC(this.order, S2, B2, E2, t4);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps) {
      return this._lut;
    }
    this._lut = [];
    steps++;
    this._lut = [];
    for (let i = 0, p, t4; i < steps; i++) {
      t4 = i / (steps - 1);
      p = this.compute(t4);
      p.t = t4;
      this._lut.push(p);
    }
    return this._lut;
  }
  on(point3, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t4 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point3) < error) {
        hits.push(c);
        t4 += i / lut.length;
      }
    }
    if (!hits.length)
      return false;
    return t /= hits.length;
  }
  project(point3) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point3), mpos = closest.mpos, t12 = (mpos - 1) / l, t22 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t4 = t12, ft = t4, p;
    mdist += 1;
    for (let d; t4 < t22 + step; t4 += step) {
      p = this.compute(t4);
      d = utils.dist(point3, p);
      if (d < mdist) {
        mdist = d;
        ft = t4;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.compute(ft);
    p.t = ft;
    p.d = mdist;
    return p;
  }
  get(t4) {
    return this.compute(t4);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t4) {
    if (this.ratios) {
      return utils.computeWithRatios(t4, this.points, this.ratios, this._3d);
    }
    return utils.compute(t4, this.points, this._3d, this.ratios);
  }
  raise() {
    const p = this.points, np = [p[0]], k = p.length;
    for (let i = 1, pi6, pim; i < k; i++) {
      pi6 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi6.x + i / k * pim.x,
        y: (k - i) / k * pi6.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new Bezier(np);
  }
  derivative(t4) {
    return utils.compute(t4, this.dpoints[0], this._3d);
  }
  dderivative(t4) {
    return utils.compute(t4, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new Bezier(utils.align(p, { p1: p[0], p2: p[p.length - 1] }));
  }
  curvature(t4) {
    return utils.curvature(t4, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t4) {
    return this._3d ? this.__normal3(t4) : this.__normal2(t4);
  }
  __normal2(t4) {
    const d = this.derivative(t4);
    const q = sqrt2(d.x * d.x + d.y * d.y);
    return { t: t4, x: -d.y / q, y: d.x / q };
  }
  __normal3(t4) {
    const r1 = this.derivative(t4), r2 = this.derivative(t4 + 0.01), q1 = sqrt2(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt2(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m = sqrt2(c.x * c.x + c.y * c.y + c.z * c.z);
    c.x /= m;
    c.y /= m;
    c.z /= m;
    const R = [
      c.x * c.x,
      c.x * c.y - c.z,
      c.x * c.z + c.y,
      c.x * c.y + c.z,
      c.y * c.y,
      c.y * c.z - c.x,
      c.x * c.z - c.y,
      c.y * c.z + c.x,
      c.z * c.z
    ];
    const n = {
      t: t4,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n;
  }
  hull(t4) {
    let p = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p[0];
    q[idx++] = p[1];
    q[idx++] = p[2];
    if (this.order === 3) {
      q[idx++] = p[3];
    }
    while (p.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p.length - 1; i < l; i++) {
        pt = utils.lerp(t4, p[i], p[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p = _p;
    }
    return q;
  }
  split(t12, t22) {
    if (t12 === 0 && !!t22) {
      return this.split(t22).left;
    }
    if (t22 === 1) {
      return this.split(t12).right;
    }
    const q = this.hull(t12);
    const result = {
      left: this.order === 2 ? new Bezier([q[0], q[3], q[5]]) : new Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new Bezier([q[5], q[4], q[2]]) : new Bezier([q[9], q[8], q[6], q[3]]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t12, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t12, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t22) {
      return result;
    }
    t22 = utils.map(t22, t12, 1, 0, 1);
    return result.right.split(t22).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(
      function(dim) {
        let mfn = function(v) {
          return v[dim];
        };
        let p = this.dpoints[0].map(mfn);
        result[dim] = utils.droots(p);
        if (this.order === 3) {
          p = this.dpoints[1].map(mfn);
          result[dim] = result[dim].concat(utils.droots(p));
        }
        result[dim] = result[dim].filter(function(t4) {
          return t4 >= 0 && t4 <= 1;
        });
        roots = roots.concat(result[dim].sort(utils.numberSort));
      }.bind(this)
    );
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(
      function(d) {
        result[d] = utils.getminmax(this, d, extrema[d]);
      }.bind(this)
    );
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t4, d) {
    if (typeof d !== "undefined") {
      const c = this.get(t4), n = this.normal(t4);
      const ret = {
        c,
        n,
        x: c.x + n.x * d,
        y: c.y + n.y * d
      };
      if (this._3d) {
        ret.z = c.z + n.z * d;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p) {
        const ret = {
          x: p.x + t4 * nv.x,
          y: p.y + t4 * nv.y
        };
        if (p.z && nv.z) {
          ret.z = p.z + t4 * nv.z;
        }
        return ret;
      });
      return [new Bezier(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) {
        return s.offset(t4)[0];
      }
      return s.scale(t4);
    });
  }
  simple() {
    if (this.order === 3) {
      const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
      const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0)
        return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs3(acos2(s)) < pi2 / 3;
  }
  reduce() {
    let i, t12 = 0, t22 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema);
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1);
    }
    for (t12 = extrema[0], i = 1; i < extrema.length; i++) {
      t22 = extrema[i];
      segment = this.split(t12, t22);
      segment._t1 = t12;
      segment._t2 = t22;
      pass1.push(segment);
      t12 = t22;
    }
    pass1.forEach(function(p1) {
      t12 = 0;
      t22 = 0;
      while (t22 <= 1) {
        for (t22 = t12 + step; t22 <= 1 + step; t22 += step) {
          segment = p1.split(t12, t22);
          if (!segment.simple()) {
            t22 -= step;
            if (abs3(t12 - t22) < step) {
              return [];
            }
            segment = p1.split(t12, t22);
            segment._t1 = utils.map(t12, 0, 1, p1._t1, p1._t2);
            segment._t2 = utils.map(t22, 0, 1, p1._t1, p1._t2);
            pass2.push(segment);
            t12 = t22;
            break;
          }
        }
      }
      if (t12 < 1) {
        segment = p1.split(t12, 1);
        segment._t1 = utils.map(t12, 0, 1, p1._t1, p1._t2);
        segment._t2 = p1._t2;
        pass2.push(segment);
      }
    });
    return pass2;
  }
  translate(v, d1, d2) {
    d2 = typeof d2 === "number" ? d2 : d1;
    const o = this.order;
    let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new Bezier(
      this.points.map((p, i) => ({
        x: p.x + v.x * d[i],
        y: p.y + v.y * d[i]
      }))
    );
  }
  scale(d) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d === "function") {
      distanceFn = d;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) {
      return this.translate(
        this.normal(0),
        distanceFn ? distanceFn(0) : d,
        distanceFn ? distanceFn(1) : d
      );
    }
    const r1 = distanceFn ? distanceFn(0) : d;
    const r2 = distanceFn ? distanceFn(1) : d;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t4) {
      const p = np[t4 * order] = utils.copy(points[t4 * order]);
      p.x += (t4 ? r2 : r1) * v[t4].n.x;
      p.y += (t4 ? r2 : r1) * v[t4].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t4) => {
        if (order === 2 && !!t4)
          return;
        const p = np[t4 * order];
        const d2 = this.derivative(t4);
        const p2 = { x: p.x + d2.x, y: p.y + d2.y };
        np[t4 + 1] = utils.lli4(p, p2, o, points[t4 + 1]);
      });
      return new Bezier(np);
    }
    [0, 1].forEach(function(t4) {
      if (order === 2 && !!t4)
        return;
      var p = points[t4 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t4 + 1) / order) : d;
      if (distanceFn && !clockwise)
        rc = -rc;
      var m = sqrt2(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t4 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n = this.normal(0);
      const start3 = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start3.x + n.x * d1, y: start3.y + n.y * d1 };
      e = { x: end.x + n.x * d3, y: end.y + n.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start3.x - n.x * d2, y: start3.y - n.y * d2 };
      e = { x: end.x - n.x * d4, y: end.y - n.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new Bezier(fline), le2, new Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d = e - s;
        return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(
          segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen))
        );
        bcurves.push(
          segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen))
        );
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p = s.points;
      if (p[3]) {
        s.points = [p[3], p[2], p[1], p[0]];
      } else {
        s.points = [p[2], p[1], p[0]];
      }
      return s;
    }).reverse();
    const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
    return new PolyBezier(segments);
  }
  outlineshapes(d1, d2, curveIntersectionThreshold) {
    d2 = d2 || d1;
    const outline = this.outline(d1, d2).curves;
    const shapes = [];
    for (let i = 1, len = outline.length; i < len / 2; i++) {
      const shape = utils.makeshape(
        outline[i],
        outline[len - i],
        curveIntersectionThreshold
      );
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve)
      return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(
      this.reduce(),
      curve,
      curveIntersectionThreshold
    );
  }
  lineIntersects(line3) {
    const mx = min3(line3.p1.x, line3.p2.x), my = min3(line3.p1.y, line3.p2.y), MX = max3(line3.p1.x, line3.p2.x), MY = max3(line3.p1.y, line3.p2.y);
    return utils.roots(this.points, line3).filter((t4) => {
      var p = this.get(t4);
      return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
    });
  }
  selfintersects(curveIntersectionThreshold) {
    const reduced = this.reduce(), len = reduced.length - 2, results = [];
    for (let i = 0, result, left, right; i < len; i++) {
      left = reduced.slice(i, i + 1);
      right = reduced.slice(i + 2);
      result = this.curveintersects(left, right, curveIntersectionThreshold);
      results.push(...result);
    }
    return results;
  }
  curveintersects(c1, c2, curveIntersectionThreshold) {
    const pairs = [];
    c1.forEach(function(l) {
      c2.forEach(function(r) {
        if (l.overlaps(r)) {
          pairs.push({ left: l, right: r });
        }
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(
        pair.left,
        pair.right,
        curveIntersectionThreshold
      );
      if (result.length > 0) {
        intersections2 = intersections2.concat(result);
      }
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
    return abs3(d1 - ref) + abs3(d2 - ref);
  }
  _iterate(errorThreshold, circles) {
    let t_s = 0, t_e = 1, safety;
    do {
      safety = 0;
      t_e = 1;
      let np1 = this.get(t_s), np2, np3, arc2, prev_arc;
      let curr_good = false, prev_good = false, done;
      let t_m = t_e, prev_e = 1, step = 0;
      do {
        prev_good = curr_good;
        prev_arc = arc2;
        t_m = (t_s + t_e) / 2;
        step++;
        np2 = this.get(t_m);
        np3 = this.get(t_e);
        arc2 = utils.getccenter(np1, np2, np3);
        arc2.interval = {
          start: t_s,
          end: t_e
        };
        let error = this._error(arc2, np1, t_s, t_e);
        curr_good = error <= errorThreshold;
        done = prev_good && !curr_good;
        if (!done)
          prev_e = t_e;
        if (curr_good) {
          if (t_e >= 1) {
            arc2.interval.end = prev_e = 1;
            prev_arc = arc2;
            if (t_e > 1) {
              let d = {
                x: arc2.x + arc2.r * cos2(arc2.e),
                y: arc2.y + arc2.r * sin2(arc2.e)
              };
              arc2.e += utils.angle({ x: arc2.x, y: arc2.y }, d, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else {
          t_e = t_m;
        }
      } while (!done && safety++ < 100);
      if (safety >= 100) {
        break;
      }
      prev_arc = prev_arc ? prev_arc : arc2;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};

// src/geometry/Bezier.ts
var isQuadraticBezier = (path2) => path2.quadratic !== void 0;
var isCubicBezier = (path2) => path2.cubic1 !== void 0 && path2.cubic2 !== void 0;
var quadraticBend = (a, b, bend = 0) => quadraticSimple(a, b, bend);
var quadraticSimple = (start3, end, bend = 0) => {
  if (isNaN(bend))
    throw Error(`bend is NaN`);
  if (bend < -1 || bend > 1)
    throw Error(`Expects bend range of -1 to 1`);
  const middle = Line_exports.interpolate(0.5, start3, end);
  let target = middle;
  if (end.y < start3.y) {
    target = bend > 0 ? { x: Math.min(start3.x, end.x), y: Math.min(start3.y, end.y) } : { x: Math.max(start3.x, end.x), y: Math.max(start3.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start3.x, end.x), y: Math.min(start3.y, end.y) } : { x: Math.min(start3.x, end.x), y: Math.max(start3.y, end.y) };
  }
  const handle = Line_exports.interpolate(Math.abs(bend), middle, target);
  return quadratic(start3, end, handle);
};
var computeQuadraticSimple = (start3, end, bend, amt) => {
  const q = quadraticSimple(start3, end, bend);
  const bzr = new Bezier(q.a, q.quadratic, q.b);
  return bzr.compute(amt);
};
var quadraticToSvgString = (start3, end, handle) => [`M ${start3.x} ${start3.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath3 = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) {
    return cubicToPath(cubicOrQuadratic);
  } else if (isQuadraticBezier(cubicOrQuadratic)) {
    return quadratictoPath(cubicOrQuadratic);
  } else {
    throw new Error(`Unknown bezier type`);
  }
};
var cubic = (start3, end, cubic1, cubic2) => ({
  a: Object.freeze(start3),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic2) => {
  const { a, cubic1, cubic2: cubic22, b } = cubic2;
  const bzr = new Bezier(a, cubic1, cubic22, b);
  return Object.freeze({
    ...cubic2,
    length: () => bzr.length(),
    interpolate: (t4) => bzr.compute(t4),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      return Rect_exports.fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    toString: () => bzr.toString(),
    toSvgString: () => [`brrup`],
    kind: `bezier/cubic`
  });
};
var quadratic = (start3, end, handle) => ({
  a: Object.freeze(start3),
  b: Object.freeze(end),
  quadratic: Object.freeze(handle)
});
var quadratictoPath = (quadraticBezier2) => {
  const { a, b, quadratic: quadratic2 } = quadraticBezier2;
  const bzr = new Bezier(a, quadratic2, b);
  return Object.freeze({
    ...quadraticBezier2,
    length: () => bzr.length(),
    interpolate: (t4) => bzr.compute(t4),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      return Rect_exports.fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/geometry/Circle.ts
var Circle_exports = {};
__export(Circle_exports, {
  area: () => area,
  bbox: () => bbox4,
  center: () => center,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter2,
  distanceFromExterior: () => distanceFromExterior,
  interpolate: () => interpolate5,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEqual: () => isEqual4,
  isIntersecting: () => isIntersecting,
  isNaN: () => isNaN3,
  isPositioned: () => isPositioned2,
  length: () => length4,
  multiplyScalar: () => multiplyScalar2,
  nearest: () => nearest2,
  point: () => point2,
  toPath: () => toPath4,
  toPositioned: () => toPositioned,
  toSvg: () => toSvg2
});
var piPi2 = Math.PI * 2;
var isPositioned2 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned2(p);
var point2 = (circle3, angleRadian2, origin) => {
  if (origin === void 0) {
    if (isPositioned2(circle3)) {
      origin = circle3;
    } else {
      origin = { x: 0, y: 0 };
    }
  }
  return {
    x: Math.cos(-angleRadian2) * circle3.radius + origin.x,
    y: Math.sin(-angleRadian2) * circle3.radius + origin.y
  };
};
var guard4 = (circle3, paramName = `circle`) => {
  if (isPositioned2(circle3)) {
    guard(circle3, `circle`);
  }
  if (Number.isNaN(circle3.radius))
    throw new Error(`${paramName}.radius is NaN`);
  if (circle3.radius <= 0)
    throw new Error(`${paramName}.radius must be greater than zero`);
};
var guardPositioned = (circle3, paramName = `circle`) => {
  if (!isPositioned2(circle3))
    throw new Error(`Expected a positioned circle with x,y`);
  return guard4(circle3, paramName);
};
var center = (circle3) => {
  if (isPositioned2(circle3))
    return Object.freeze({ x: circle3.x, y: circle3.y });
  else
    return Object.freeze({ x: circle3.radius, y: circle3.radius });
};
var interpolate5 = (circle3, t4) => point2(circle3, t4 * piPi2);
var length4 = (circle3) => circumference(circle3);
var circumference = (circle3) => {
  guard4(circle3);
  return piPi2 * circle3.radius;
};
var area = (circle3) => {
  guard4(circle3);
  return Math.PI * circle3.radius * circle3.radius;
};
var bbox4 = (circle3) => {
  if (isPositioned2(circle3)) {
    return Rect_exports.fromCenter(circle3, circle3.radius * 2, circle3.radius * 2);
  } else {
    return { width: circle3.radius * 2, height: circle3.radius * 2 };
  }
};
var isContainedBy = (a, b) => {
  const d = distanceCenter2(a, b);
  if (isCircle(b)) {
    return d < Math.abs(a.radius - b.radius);
  } else {
    return d <= a.radius;
  }
};
var isNaN3 = (a) => {
  if (Number.isNaN(a.radius))
    return true;
  if (isPositioned2(a)) {
    if (Number.isNaN(a.x))
      return true;
    if (Number.isNaN(a.y))
      return true;
  }
  return false;
};
var isIntersecting = (a, b) => {
  if (Point_exports.isEqual(a, b))
    return true;
  if (isContainedBy(a, b))
    return true;
  if (isCircle(b)) {
    return intersections(a, b).length === 2;
  }
  return false;
};
var intersections = (a, b) => {
  const vector = Point_exports.subtract(b, a);
  const centerD = Math.sqrt(vector.y * vector.y + vector.x * vector.x);
  if (centerD > a.radius + b.radius)
    return [];
  if (centerD < Math.abs(a.radius - b.radius))
    return [];
  if (isEqual4(a, b))
    return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid3 = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection2 = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    Point_exports.sum(centroid3, intersection2),
    Point_exports.subtract(centroid3, intersection2)
  ];
};
var isEqual4 = (a, b) => {
  if (a.radius !== b.radius)
    return false;
  if (isPositioned2(a) && isPositioned2(b)) {
    if (a.x !== b.x)
      return false;
    if (a.y !== b.y)
      return false;
    if (a.z !== b.z)
      return false;
    return true;
  } else if (!isPositioned2(a) && !isPositioned2(b)) {
  } else
    return false;
  return false;
};
function multiplyScalar2(a, value) {
  if (isPositioned2(a)) {
    const pt = Point_exports.multiplyScalar(a, value);
    return Object.freeze({
      ...a,
      ...pt,
      radius: a.radius * value
    });
  } else {
    return Object.freeze({
      ...a,
      radius: a.radius * value
    });
  }
}
var distanceCenter2 = (a, b) => {
  guardPositioned(a, `a`);
  if (isCirclePositioned(b)) {
    guardPositioned(b, `b`);
  }
  return Point_exports.distance(a, b);
};
var distanceFromExterior = (a, b) => {
  guardPositioned(a, `a`);
  if (isCirclePositioned(b)) {
    return Math.max(0, distanceCenter2(a, b) - a.radius - b.radius);
  } else if (Point_exports.isPoint(b)) {
    const dist = Point_exports.distance(a, b);
    if (dist < a.radius)
      return 0;
    return dist;
  } else
    throw new Error(`Second parameter invalid type`);
};
var toSvg2 = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) {
      return toSvgFull2(a.radius, origin, sweep);
    }
    if (isPositioned2(a)) {
      return toSvgFull2(a.radius, a, sweep);
    } else
      throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin !== void 0) {
      return toSvgFull2(a, origin, sweep);
    } else
      throw new Error(`origin parameter needed`);
  }
};
var toSvgFull2 = (radius, origin, sweep) => {
  const { x, y } = origin;
  const s = sweep ? `1` : `0`;
  return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`
`);
};
var nearest2 = (circle3, b) => {
  const n = (a) => {
    const l = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const x = a.x + a.radius * ((b.x - a.x) / l);
    const y = a.y + a.radius * ((b.y - a.y) / l);
    return { x, y };
  };
  if (Array.isArray(circle3)) {
    const pts = circle3.map((l) => n(l));
    const dists = pts.map((p) => Point_exports.distance(p, b));
    return Object.freeze(pts[Arrays_exports.minIndex(...dists)]);
  } else {
    return Object.freeze(n(circle3));
  }
};
var toPositioned = (circle3, defaultPositionOrX, y) => {
  if (isPositioned2(circle3))
    return circle3;
  const pt = Point_exports.getPointParam(defaultPositionOrX, y);
  return Object.freeze({
    ...circle3,
    ...pt
  });
};
var toPath4 = (circle3) => {
  guard4(circle3);
  return Object.freeze({
    ...circle3,
    nearest: (point3) => nearest2(circle3, point3),
    interpolate: (t4) => interpolate5(circle3, t4),
    bbox: () => bbox4(circle3),
    length: () => length4(circle3),
    toSvgString: (sweep = true) => toSvg2(circle3, sweep),
    kind: `circular`
  });
};
var intersectionLine = (circle3, line3) => {
  const v1 = {
    x: line3.b.x - line3.a.x,
    y: line3.b.y - line3.a.y
  };
  const v2 = {
    x: line3.a.x - circle3.x,
    y: line3.a.y - circle3.y
  };
  const b = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle3.radius * circle3.radius));
  if (Number.isNaN(d))
    return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const ret = [];
  if (u1 <= 1 && u1 >= 0) {
    ret.push({
      x: line3.a.x + v1.x * u1,
      y: line3.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    ret.push({
      x: line3.a.x + v1.x * u2,
      y: line3.a.y + v1.y * u2
    });
  }
  return ret;
};

// src/geometry/CompoundPath.ts
var CompoundPath_exports = {};
__export(CompoundPath_exports, {
  bbox: () => bbox5,
  computeDimensions: () => computeDimensions,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate6,
  setSegment: () => setSegment,
  toString: () => toString3,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path2) => {
  const existing = [...compoundPath.segments];
  existing[index] = path2;
  return fromPaths(...existing);
};
var interpolate6 = (paths2, t4, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths2);
  }
  const expected = t4 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (let i = 0; i < l.length; i++) {
    if (soFar + l[i] >= expected) {
      const relative = expected - soFar;
      let amt = relative / l[i];
      if (amt > 1)
        amt = 1;
      return paths2[i].interpolate(amt);
    } else
      soFar += l[i];
  }
  return { x: 0, y: 0 };
};
var computeDimensions = (paths2) => {
  const widths = paths2.map((l) => l.bbox().width);
  const lengths3 = paths2.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (let i = 0; i < lengths3.length; i++)
    totalLength += lengths3[i];
  for (let i = 0; i < widths.length; i++)
    totalWidth += widths[i];
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox5 = (paths2) => {
  const boxes = paths2.map((p) => p.bbox());
  const corners3 = boxes.map((b) => Rect_exports.corners(b)).flat();
  return Point_exports.bbox(...corners3);
};
var toString3 = (paths2) => paths2.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths2) => {
  let lastPos = Path_exports.getEnd(paths2[0]);
  for (let i = 1; i < paths2.length; i++) {
    const start3 = Path_exports.getStart(paths2[i]);
    if (!Point_exports.isEqual(start3, lastPos))
      throw new Error(`Path index ` + i + ` does not start at prior path end. Start: ` + start3.x + `,` + start3.y + ` expected: ` + lastPos.x + `,` + lastPos.y);
    lastPos = Path_exports.getEnd(paths2[i]);
  }
};
var toSvgString2 = (paths2) => paths2.flatMap((p) => p.toSvgString());
var fromPaths = (...paths2) => {
  guardContinuous(paths2);
  const dims = computeDimensions(paths2);
  return Object.freeze({
    segments: paths2,
    length: () => dims.totalLength,
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    interpolate: (t4, useWidth = false) => interpolate6(paths2, t4, useWidth, dims),
    bbox: () => bbox5(paths2),
    toString: () => toString3(paths2),
    toSvgString: () => toSvgString2(paths2),
    kind: `compound`
  });
};

// src/geometry/Grid.ts
var Grid_exports = {};
__export(Grid_exports, {
  allDirections: () => allDirections,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  cells: () => cells,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  inside: () => inside,
  isEqual: () => isEqual5,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
  rows: () => rows,
  simpleLine: () => simpleLine,
  visitFor: () => visitFor,
  visitor: () => visitor,
  visitorBreadth: () => visitorBreadth,
  visitorColumn: () => visitorColumn,
  visitorDepth: () => visitorDepth,
  visitorRandom: () => visitorRandom,
  visitorRandomContiguous: () => visitorRandomContiguous,
  visitorRow: () => visitorRow
});
var isCell = (cell) => {
  if (cell === void 0)
    return false;
  return `x` in cell && `y` in cell;
};
var isNeighbour = (n) => {
  if (n === void 0)
    return false;
  if (n[1] === void 0)
    return false;
  return true;
};
var isEqual5 = (a, b) => {
  if (`rows` in a && `cols` in a) {
    if (`rows` in b && `cols` in b) {
      if (a.rows !== b.rows || a.cols !== b.cols)
        return false;
    } else
      return false;
  }
  if (`size` in a) {
    if (`size` in b) {
      if (a.size !== b.size)
        return false;
    } else
      return false;
  }
  return true;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
var cellEquals = (a, b) => {
  if (b === void 0)
    return false;
  if (a === void 0)
    return false;
  return a.x === b.x && a.y === b.y;
};
var guardCell = (cell, paramName = `Param`, grid2) => {
  if (cell === void 0)
    throw new Error(paramName + ` is undefined. Expecting {x,y}`);
  if (cell.x === void 0)
    throw new Error(paramName + `.x is undefined`);
  if (cell.y === void 0)
    throw new Error(paramName + `.y is undefined`);
  if (!Number.isInteger(cell.x))
    throw new Error(paramName + `.x is non-integer`);
  if (!Number.isInteger(cell.y))
    throw new Error(paramName + `.y is non-integer`);
  if (grid2 !== void 0) {
    if (!inside(grid2, cell))
      throw new Error(`${paramName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid2.cols}, ${grid2.rows}`);
  }
};
var guardGrid = (grid2, paramName = `Param`) => {
  if (grid2 === void 0)
    throw new Error(`${paramName} is undefined. Expecting grid.`);
  if (!(`rows` in grid2))
    throw new Error(`${paramName}.rows is undefined`);
  if (!(`cols` in grid2))
    throw new Error(`${paramName}.cols is undefined`);
  if (!Number.isInteger(grid2.rows))
    throw new Error(`${paramName}.rows is not an integer`);
  if (!Number.isInteger(grid2.cols))
    throw new Error(`${paramName}.cols is not an integer`);
};
var inside = (grid2, cell) => {
  if (cell.x < 0 || cell.y < 0)
    return false;
  if (cell.x >= grid2.cols || cell.y >= grid2.rows)
    return false;
  return true;
};
var rectangleForCell = (cell, grid2) => {
  guardCell(cell);
  const size = grid2.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = Rect_exports.fromTopLeft({ x, y }, size, size);
  return r;
};
var cellAtPoint = (position, grid2) => {
  const size = grid2.size;
  if (position.x < 0 || position.y < 0)
    return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid2.cols)
    return;
  if (y >= grid2.rows)
    return;
  return { x, y };
};
var allDirections = Object.freeze([`n`, `ne`, `nw`, `e`, `s`, `se`, `sw`, `w`]);
var crossDirections = Object.freeze([`n`, `e`, `s`, `w`]);
var neighbours = (grid2, cell, bounds = `undefined`, directions) => {
  const dirs = directions ?? allDirections;
  const points = dirs.map((c) => offset(grid2, cell, getVectorFromCardinal(c), bounds));
  return zipKeyValue(dirs, points);
};
var cellMiddle = (cell, grid2) => {
  guardCell(cell);
  const size = grid2.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};
var getLine = (start3, end) => {
  guardCell(start3);
  guardCell(end);
  let startX = start3.x;
  let startY = start3.y;
  const dx = Math.abs(end.x - startX);
  const dy = Math.abs(end.y - startY);
  const sx = startX < end.x ? 1 : -1;
  const sy = startY < end.y ? 1 : -1;
  let err = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y)
      break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      startX += sx;
    }
    if (e2 < dx) {
      err += dx;
      startY += sy;
    }
  }
  return cells2;
};
var offsetCardinals = (grid2, start3, steps, bounds = `stop`) => {
  guardGrid(grid2, `grid`);
  guardCell(start3, `start`);
  integer(steps, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells2 = directions.map((d, i) => offset(grid2, start3, vectors[i], bounds));
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal, multiplier = 1) => {
  let v;
  switch (cardinal) {
    case `n`:
      v = { x: 0, y: -1 * multiplier };
      break;
    case `ne`:
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    case `e`:
      v = { x: 1 * multiplier, y: 0 };
      break;
    case `se`:
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    case `s`:
      v = { x: 0, y: 1 * multiplier };
      break;
    case `sw`:
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    case `w`:
      v = { x: -1 * multiplier, y: 0 };
      break;
    case `nw`:
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    default:
      v = { x: 0, y: 0 };
  }
  return Object.freeze(v);
};
var simpleLine = function(start3, end, endInclusive = false) {
  const cells2 = [];
  if (start3.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start3.y; y < lastY; y++) {
      cells2.push({ x: start3.x, y });
    }
  } else if (start3.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start3.x; x < lastX; x++) {
      cells2.push({ x, y: start3.y });
    }
  } else {
    throw new Error(`Only does vertical and horizontal: ${start3.x},${start3.y} - ${end.x},${end.y}`);
  }
  return cells2;
};
var offset = function(grid2, start3, vector, bounds = `undefined`) {
  guardCell(start3, `start`, grid2);
  guardCell(vector);
  guardGrid(grid2, `grid`);
  let x = start3.x;
  let y = start3.y;
  switch (bounds) {
    case `wrap`:
      x += vector.x % grid2.cols;
      y += vector.y % grid2.rows;
      if (x < 0)
        x = grid2.cols + x;
      else if (x >= grid2.cols) {
        x -= grid2.cols;
      }
      if (y < 0)
        y = grid2.rows + y;
      else if (y >= grid2.rows) {
        y -= grid2.rows;
      }
      break;
    case `stop`:
      x += vector.x;
      y += vector.y;
      x = clampIndex(x, grid2.cols);
      y = clampIndex(y, grid2.rows);
      break;
    case `undefined`:
      x += vector.x;
      y += vector.y;
      if (x < 0 || y < 0)
        return;
      if (x >= grid2.cols || y >= grid2.rows)
        return;
      break;
    case `unbounded`:
      x += vector.x;
      y += vector.y;
      break;
    default:
      throw new Error(`Unknown BoundsLogic case ${bounds}`);
  }
  return Object.freeze({ x, y });
};
var neighbourList = (grid2, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid2, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter(isNeighbour);
};
var visitor = function* (logic, grid2, start3, opts = {}) {
  guardGrid(grid2, `grid`);
  guardCell(start3, `start`, grid2);
  const v = opts.visited ?? setMutable((c) => cellKeyString(c));
  const possibleNeighbours = logic.options ? logic.options : (g, c) => neighbourList(g, c, crossDirections, `undefined`);
  if (!isCell(start3))
    throw new Error(`'start' parameter is undefined or not a cell`);
  let cellQueue = [start3];
  let moveQueue = [];
  let current = null;
  while (cellQueue.length > 0) {
    if (current === null) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid2, current).filter((step) => !v.has(step[1]));
      if (nextSteps.length === 0) {
        if (current !== null) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        moveQueue.push(...nextSteps);
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = null;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
};
var visitorDepth = (grid2, start3, opts = {}) => visitor(
  {
    select: (nbos) => nbos[nbos.length - 1]
  },
  grid2,
  start3,
  opts
);
var visitorBreadth = (grid2, start3, opts = {}) => visitor(
  {
    select: (nbos) => nbos[0]
  },
  grid2,
  start3,
  opts
);
var randomNeighbour = (nbos) => randomElement(nbos);
var visitorRandomContiguous = (grid2, start3, opts = {}) => visitor(
  {
    select: randomNeighbour
  },
  grid2,
  start3,
  opts
);
var visitorRandom = (grid2, start3, opts = {}) => visitor(
  {
    options: (grid3, cell) => {
      const t4 = [];
      for (const c of cells(grid3, cell)) {
        t4.push([`n`, c]);
      }
      return t4;
    },
    select: randomNeighbour
  },
  grid2,
  start3,
  opts
);
var visitorRow = (grid2, start3, opts = {}) => {
  const { reversed = false } = opts;
  const neighbourSelect = (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`));
  const possibleNeighbours = (grid3, cell) => {
    if (reversed) {
      if (cell.x > 0) {
        cell = { x: cell.x - 1, y: cell.y };
      } else {
        if (cell.y > 0) {
          cell = { x: grid3.cols - 1, y: cell.y - 1 };
        } else {
          cell = { x: grid3.cols - 1, y: grid3.rows - 1 };
        }
      }
    } else {
      if (cell.x < grid3.rows - 1) {
        cell = { x: cell.x + 1, y: cell.y };
      } else {
        if (cell.y < grid3.rows - 1) {
          cell = { x: 0, y: cell.y + 1 };
        } else {
          cell = { x: 0, y: 0 };
        }
      }
    }
    return [[reversed ? `w` : `e`, cell]];
  };
  const logic = {
    select: neighbourSelect,
    options: possibleNeighbours
  };
  return visitor(logic, grid2, start3, opts);
};
var visitFor = (grid2, start3, steps, visitor2) => {
  integer(steps, ``, `steps`);
  const opts = {
    reversed: steps < 0
  };
  steps = Math.abs(steps);
  let c = start3;
  let v = visitor2(grid2, start3, opts);
  v.next();
  let stepsMade = 0;
  while (stepsMade < steps) {
    stepsMade++;
    const { value } = v.next();
    if (value) {
      c = value;
      if (opts.debug)
        console.log(`stepsMade: ${stepsMade} cell: ${c.x}, ${c.y} reverse: ${opts.reversed}`);
    } else {
      if (steps >= grid2.cols * grid2.rows) {
        steps -= grid2.cols * grid2.rows;
        stepsMade = 0;
        v = visitor2(grid2, start3, opts);
        v.next();
        c = start3;
        if (opts.debug)
          console.log(`resetting visitor to ${steps}`);
      } else
        throw new Error(`Value not received by visitor`);
    }
  }
  return c;
};
var visitorColumn = (grid2, start3, opts = {}) => {
  const { reversed = false } = opts;
  const logic = {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
    options: (grid3, cell) => {
      if (reversed) {
        if (cell.y > 0) {
          cell = { x: cell.x, y: cell.y - 1 };
        } else {
          if (cell.x === 0) {
            cell = { x: grid3.cols - 1, y: grid3.rows - 1 };
          } else {
            cell = { x: cell.x - 1, y: grid3.rows - 1 };
          }
        }
      } else {
        if (cell.y < grid3.rows - 1) {
          cell = { x: cell.x, y: cell.y + 1 };
        } else {
          if (cell.x < grid3.cols - 1) {
            cell = { x: cell.x + 1, y: 0 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `n` : `s`, cell]];
    }
  };
  return visitor(logic, grid2, start3, opts);
};
var rows = function* (grid2, start3 = { x: 0, y: 0 }) {
  let row = start3.y;
  let rowCells = [];
  for (const c of cells(grid2, start3)) {
    if (c.y !== row) {
      yield rowCells;
      rowCells = [c];
      row = c.y;
    } else {
      rowCells.push(c);
    }
  }
  if (rowCells.length > 0)
    yield rowCells;
};
var cells = function* (grid2, start3 = { x: 0, y: 0 }) {
  guardGrid(grid2, `grid`);
  guardCell(start3, `start`, grid2);
  let { x, y } = start3;
  let canMove = true;
  do {
    yield { x, y };
    x++;
    if (x === grid2.cols) {
      y++;
      x = 0;
    }
    if (y === grid2.rows) {
      y = 0;
      x = 0;
    }
    if (x === start3.x && y === start3.y)
      canMove = false;
  } while (canMove);
};

// src/geometry/Path.ts
var Path_exports = {};
__export(Path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});
var getStart = function(path2) {
  if (Bezier_exports.isQuadraticBezier(path2))
    return path2.a;
  else if (Line_exports.isLine(path2))
    return path2.a;
  else
    throw new Error(`Unknown path type ${JSON.stringify(path2)}`);
};
var getEnd = function(path2) {
  if (Bezier_exports.isQuadraticBezier(path2))
    return path2.b;
  else if (Line_exports.isLine(path2))
    return path2.b;
  else
    throw new Error(`Unknown path type ${JSON.stringify(path2)}`);
};

// src/geometry/Rect.ts
var Rect_exports = {};
__export(Rect_exports, {
  area: () => area2,
  center: () => center2,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior2,
  edges: () => edges,
  empty: () => empty,
  emptyPositioned: () => emptyPositioned,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromNumbers: () => fromNumbers3,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  guard: () => guard5,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty5,
  isEqual: () => isEqual6,
  isEqualSize: () => isEqualSize,
  isPlaceholder: () => isPlaceholder3,
  isPositioned: () => isPositioned3,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply3,
  multiplyScalar: () => multiplyScalar3,
  normaliseByRect: () => normaliseByRect3,
  perimeter: () => perimeter,
  placeholder: () => placeholder,
  placeholderPositioned: () => placeholderPositioned,
  random: () => random2,
  subtract: () => subtract3,
  sum: () => sum3,
  toArray: () => toArray3
});
var empty = Object.freeze({ width: 0, height: 0 });
var emptyPositioned = Object.freeze({ x: 0, y: 0, width: 0, height: 0 });
var placeholder = Object.freeze({ width: Number.NaN, height: Number.NaN });
var placeholderPositioned = Object.freeze({ x: Number.NaN, y: Number.NaN, width: Number.NaN, height: Number.NaN });
var isEmpty5 = (rect2) => rect2.width === 0 && rect2.height === 0;
var isPlaceholder3 = (rect2) => Number.isNaN(rect2.width) && Number.isNaN(rect2.height);
var isPositioned3 = (p) => p.x !== void 0 && p.y !== void 0;
var isRect = (p) => {
  if (p === void 0)
    return false;
  if (p.width === void 0)
    return false;
  if (p.height === void 0)
    return false;
  return true;
};
var isRectPositioned = (p) => isRect(p) && isPositioned3(p);
var fromElement = (el) => ({ width: el.clientWidth, height: el.clientHeight });
var isEqualSize = (a, b) => {
  if (a === void 0)
    throw new Error(`a undefined`);
  if (b === void 0)
    throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
function fromNumbers3(xOrWidth, yOrHeight, width, height4) {
  if (width === void 0 || height4 === void 0) {
    if (typeof xOrWidth !== `number`)
      throw new Error(`width is not an number`);
    if (typeof yOrHeight !== `number`)
      throw new Error(`height is not an number`);
    return Object.freeze({ width: xOrWidth, height: yOrHeight });
  }
  if (typeof xOrWidth !== `number`)
    throw new Error(`x is not an number`);
  if (typeof yOrHeight !== `number`)
    throw new Error(`y is not an number`);
  if (typeof width !== `number`)
    throw new Error(`width is not an number`);
  if (typeof height4 !== `number`)
    throw new Error(`height is not an number`);
  return Object.freeze({ x: xOrWidth, y: yOrHeight, width, height: height4 });
}
function toArray3(rect2) {
  if (isPositioned3(rect2)) {
    return [rect2.x, rect2.y, rect2.width, rect2.height];
  } else if (isRect(rect2)) {
    return [rect2.width, rect2.height];
  } else
    throw new Error(`rect param is not a rectangle. Got: ${JSON.stringify(rect2)}`);
}
var isEqual6 = (a, b) => {
  if (isPositioned3(a) && isPositioned3(b)) {
    if (!Point_exports.isEqual(a, b))
      return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned3(a) && !isPositioned3(b)) {
    return a.width === b.width && a.height === b.height;
  } else {
    return false;
  }
};
function subtract3(a, b, c) {
  if (a === void 0)
    throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height4 = c === void 0 ? 0 : c;
    return Object.freeze({
      ...a,
      width: a.width - b,
      height: a.height - height4
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width - b.width,
      height: a.height - b.height
    });
  }
}
function sum3(a, b, c) {
  if (a === void 0)
    throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height4 = c === void 0 ? 0 : c;
    return Object.freeze({
      ...a,
      width: a.width + b,
      height: a.height + height4
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width + b.width,
      height: a.height + b.height
    });
  }
}
function intersectsPoint(rect2, a, b) {
  guard5(rect2, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0)
      throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
  }
  if (isPositioned3(rect2)) {
    if (x - rect2.x > rect2.width || x < rect2.x)
      return false;
    if (y - rect2.y > rect2.height || y < rect2.y)
      return false;
  } else {
    if (x > rect2.width || x < 0)
      return false;
    if (y > rect2.height || y < 0)
      return false;
  }
  return true;
}
var fromCenter = (origin, width, height4) => {
  Point_exports.guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height4, `height`);
  const halfW = width / 2;
  const halfH = height4 / 2;
  return { x: origin.x - halfW, y: origin.y - halfH, width, height: height4 };
};
var distanceFromExterior2 = (rect2, pt) => {
  guardPositioned2(rect2, `rect`);
  Point_exports.guard(pt, `pt`);
  if (intersectsPoint(rect2, pt))
    return 0;
  const dx = Math.max(rect2.x - pt.x, 0, pt.x - rect2.x + rect2.width);
  const dy = Math.max(rect2.y - pt.y, 0, pt.y - rect2.y + rect2.height);
  return Math.sqrt(dx * dx + dy * dy);
};
var distanceFromCenter = (rect2, pt) => Point_exports.distance(center2(rect2), pt);
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y)
    throw new Error(`topLeft.y greater than bottomRight.y`);
  if (topLeft.y > bottomLeft.y)
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  const w1 = topRight.x - topLeft.x;
  const w2 = bottomRight.x - bottomLeft.x;
  const h1 = Math.abs(bottomLeft.y - topLeft.y);
  const h2 = Math.abs(bottomRight.y - topRight.y);
  return {
    x: Math.min(topLeft.x, bottomLeft.x),
    y: Math.min(topRight.y, topLeft.y),
    width: Math.max(w1, w2),
    height: Math.max(h1, h2)
  };
};
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0)
    throw Error(`${name} is undefined`);
  if (isNaN(d))
    throw Error(`${name} is NaN`);
  if (d < 0)
    throw Error(`${name} cannot be negative`);
};
var guard5 = (rect2, name = `rect`) => {
  if (rect2 === void 0)
    throw Error(`{$name} undefined`);
  if (isPositioned3(rect2))
    Point_exports.guard(rect2, name);
  guardDim(rect2.width, name + `.width`);
  guardDim(rect2.height, name + `.height`);
};
var guardPositioned2 = (rect2, name = `rect`) => {
  if (!isPositioned3(rect2))
    throw new Error(`Expected ${name} to have x,y`);
  guard5(rect2, name);
};
var fromTopLeft = (origin, width, height4) => {
  guardDim(width, `width`);
  guardDim(height4, `height`);
  Point_exports.guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height: height4 };
};
var corners = (rect2, origin) => {
  guard5(rect2);
  if (origin === void 0 && Point_exports.isPoint(rect2))
    origin = rect2;
  else if (origin === void 0)
    throw new Error(`Unpositioned rect needs origin param`);
  return [
    { x: origin.x, y: origin.y },
    { x: origin.x + rect2.width, y: origin.y },
    { x: origin.x + rect2.width, y: origin.y + rect2.height },
    { x: origin.x, y: origin.y + rect2.height }
  ];
};
var getEdgeX = (rect2, edge) => {
  guard5(rect2);
  switch (edge) {
    case `top`:
      return Point_exports.isPoint(rect2) ? rect2.x : 0;
    case `bottom`:
      return Point_exports.isPoint(rect2) ? rect2.x : 0;
    case `left`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
    case `right`:
      return Point_exports.isPoint(rect2) ? rect2.x + rect2.width : rect2.width;
  }
};
var getEdgeY = (rect2, edge) => {
  guard5(rect2);
  switch (edge) {
    case `top`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
    case `bottom`:
      return Point_exports.isPoint(rect2) ? rect2.y + rect2.height : rect2.height;
    case `left`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
    case `right`:
      return Point_exports.isPoint(rect2) ? rect2.y : 0;
  }
};
var normaliseByRect3 = (rect2, normaliseByOrWidth, height4) => {
  let width;
  if (height4 === void 0) {
    if (isRect(normaliseByOrWidth)) {
      height4 = normaliseByOrWidth.height;
      width = normaliseByOrWidth.width;
    } else {
      throw new Error(`Expects rectangle or width and height parameters for normaliseBy`);
    }
  } else {
    if (typeof normaliseByOrWidth === `number`) {
      width = normaliseByOrWidth;
    } else {
      throw new Error(`Expects rectangle or width and height parameters for normaliseBy`);
    }
  }
  if (isPositioned3(rect2)) {
    return Object.freeze({
      x: rect2.x / width,
      y: rect2.y / height4,
      width: rect2.width / width,
      height: rect2.height / height4
    });
  } else {
    return Object.freeze({
      width: rect2.width / width,
      height: rect2.height / height4
    });
  }
};
function multiply3(a, b, c) {
  guard5(a, `a`);
  if (isRect(b)) {
    if (isRectPositioned(a)) {
      return Object.freeze({
        ...a,
        x: a.x * b.width,
        y: a.y * b.height,
        width: a.width * b.width,
        height: a.height * b.height
      });
    } else {
      return Object.freeze({
        ...a,
        width: a.width * b.width,
        height: a.height * b.height
      });
    }
  } else {
    if (typeof b !== `number`)
      throw new Error(`Expected second parameter of type Rect or number. Got ${JSON.stringify(b)}`);
    if (c === void 0)
      c = b;
    if (isRectPositioned(a)) {
      return Object.freeze({
        ...a,
        x: a.x * b,
        y: a.y * c,
        width: a.width * b,
        height: a.height * c
      });
    } else {
      return Object.freeze({
        ...a,
        width: a.width * b,
        height: a.height * c
      });
    }
  }
}
function multiplyScalar3(rect2, amount) {
  if (isPositioned3(rect2)) {
    return Object.freeze({
      ...rect2,
      x: rect2.x * amount,
      y: rect2.y * amount,
      width: rect2.width * amount,
      height: rect2.height * amount
    });
  } else {
    return Object.freeze({
      ...rect2,
      width: rect2.width * amount,
      height: rect2.height * amount
    });
  }
}
var center2 = (rect2, origin) => {
  guard5(rect2);
  if (origin === void 0 && Point_exports.isPoint(rect2))
    origin = rect2;
  else if (origin === void 0)
    origin = { x: 0, y: 0 };
  return Object.freeze({
    x: origin.x + rect2.width / 2,
    y: origin.y + rect2.height / 2
  });
};
var lengths = (rect2) => {
  guardPositioned2(rect2, `rect`);
  return edges(rect2).map((l) => Line_exports.length(l));
};
var edges = (rect2, origin) => {
  const c = corners(rect2, origin);
  return Line_exports.joinPointsToLines(...c, c[0]);
};
var perimeter = (rect2) => {
  guard5(rect2);
  return rect2.height + rect2.height + rect2.width + rect2.width;
};
var area2 = (rect2) => {
  guard5(rect2);
  return rect2.height * rect2.width;
};
var random2 = (rando) => {
  if (rando === void 0)
    rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando(),
    width: rando(),
    height: rando()
  });
};

// src/geometry/Ellipse.ts
var Ellipse_exports = {};
__export(Ellipse_exports, {
  fromDegrees: () => fromDegrees2
});
var fromDegrees2 = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});

// src/geometry/Shape.ts
var Shape_exports = {};
__export(Shape_exports, {
  arrow: () => arrow,
  center: () => center3,
  starburst: () => starburst
});

// src/geometry/Polar.ts
var Polar_exports = {};
__export(Polar_exports, {
  clampMagnitude: () => clampMagnitude2,
  divide: () => divide3,
  dotProduct: () => dotProduct3,
  fromCartesian: () => fromCartesian,
  guard: () => guard6,
  invert: () => invert2,
  isAntiParallel: () => isAntiParallel,
  isCoord: () => isCoord,
  isOpposite: () => isOpposite,
  isParallel: () => isParallel,
  multiply: () => multiply4,
  normalise: () => normalise2,
  rotate: () => rotate3,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian,
  toPoint: () => toPoint,
  toString: () => toString4
});
var piPi3 = Math.PI * 2;
var EmptyCartesian = Object.freeze({ x: 0, y: 0 });
var isCoord = (p) => {
  if (p.distance === void 0)
    return false;
  if (p.angleRadian === void 0)
    return false;
  return true;
};
var fromCartesian = (point3, origin) => {
  point3 = subtract2(point3, origin);
  const angle2 = Math.atan2(point3.y, point3.x);
  return Object.freeze({
    ...point3,
    angleRadian: angle2,
    distance: Math.sqrt(point3.x * point3.x + point3.y * point3.y)
  });
};
var toCartesian = (a, b, c) => {
  if (isCoord(a)) {
    if (b === void 0)
      b = Empty2;
    if (isPoint(b)) {
      return polarToCartesian(a.distance, a.angleRadian, b);
    }
    throw new Error(`Expecting (Coord, Point). Second parameter is not a point`);
  } else {
    if (typeof a === `number` && typeof b === `number`) {
      if (c === void 0)
        c = Empty2;
      if (!isPoint(c))
        throw new Error(`Expecting (number, number, Point). Point param wrong type`);
      return polarToCartesian(a, b, c);
    } else {
      throw new Error(`Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(a)}`);
    }
  }
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a = smoothness * step++;
    yield {
      distance: zoom * a,
      angleRadian: a,
      step
    };
  }
}
var rotate3 = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var normalise2 = (c) => {
  if (c.distance === 0)
    throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c,
    distance: 1
  });
};
var guard6 = (p, name = `Point`) => {
  if (p === void 0)
    throw new Error(`'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (p === null)
    throw new Error(`'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (p.angleRadian === void 0)
    throw new Error(`'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (p.distance === void 0)
    throw new Error(`'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (typeof p.angleRadian !== `number`)
    throw new Error(`'${name}.angleRadian' must be a number. Got ${p.angleRadian}`);
  if (typeof p.distance !== `number`)
    throw new Error(`'${name}.distance' must be a number. Got ${p.distance}`);
  if (p.angleRadian === null)
    throw new Error(`'${name}.angleRadian' is null`);
  if (p.distance === null)
    throw new Error(`'${name}.distance' is null`);
  if (Number.isNaN(p.angleRadian))
    throw new Error(`'${name}.angleRadian' is NaN`);
  if (Number.isNaN(p.distance))
    throw new Error(`'${name}.distance' is NaN`);
};
var dotProduct3 = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  return a.distance * b.distance * Math.cos(b.angleRadian - a.angleRadian);
};
var invert2 = (p) => {
  guard6(p, `c`);
  return Object.freeze({
    ...p,
    angleRadian: p.angleRadian - Math.PI
  });
};
var isOpposite = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  if (a.distance !== b.distance)
    return false;
  return a.angleRadian === -b.angleRadian;
};
var isParallel = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  return a.angleRadian === b.angleRadian;
};
var isAntiParallel = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  return a.angleRadian === -b.angleRadian;
};
var rotateDegrees = (c, amountDeg) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});
var spiralRaw = (step, smoothness, zoom) => {
  const a = smoothness * step;
  return Object.freeze({
    distance: zoom * a,
    angleRadian: a
  });
};
var multiply4 = (v, amt) => {
  guard6(v);
  number(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance * amt
  });
};
var divide3 = (v, amt) => {
  guard6(v);
  number(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance / amt
  });
};
var clampMagnitude2 = (v, max4 = 1, min4 = 0) => {
  let mag = v.distance;
  if (mag > max4)
    mag = max4;
  if (mag < min4)
    mag = min4;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var polarToCartesian = (distance3, angleRadians, origin = Empty2) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance3 * Math.cos(angleRadians),
    y: origin.y + distance3 * Math.sin(angleRadians)
  });
};
var toString4 = (p, digits) => {
  if (p === void 0)
    return `(undefined)`;
  if (p === null)
    return `(null)`;
  const angleDeg = radianToDegree(p.angleRadian);
  const d = digits ? p.distance.toFixed(digits) : p.distance;
  const a = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d},${a})`;
};
var toPoint = (v, origin = EmptyCartesian) => {
  guard6(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};

// src/geometry/Shape.ts
var center3 = (shape) => {
  if (shape === void 0) {
    return Object.freeze({ x: 0.5, y: 0.5 });
  } else if (Rect_exports.isRect(shape)) {
    return Rect_exports.center(shape);
  } else if (Triangle_exports.isTriangle(shape)) {
    return Triangle_exports.centroid(shape);
  } else if (Circle_exports.isCircle(shape)) {
    return Circle_exports.center(shape);
  } else {
    throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
};
var starburst = (outerRadius, points = 5, innerRadius, origin = { x: 0, y: 0 }, opts) => {
  integer(points, `positive`, `points`);
  const angle2 = Math.PI * 2 / points;
  const angleHalf = angle2 / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0)
    innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (i + 1 < points)
      pts.push(right);
    a += angle2;
  }
  return pts;
};
var arrow = (origin, from2, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian2 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from2 === `tip`) {
    tri = Triangle_exports.equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = Rect_exports.corners(Rect_exports.fromTopLeft(
      { x: tri.a.x - tailLength, y: origin.y - tailThickness / 2 },
      tailLength,
      tailThickness
    ));
  } else if (from2 === `middle`) {
    const midX = tailLength + arrowSize / 2;
    const midY = tailThickness / 2;
    tri = Triangle_exports.equilateralFromVertex({
      x: origin.x + arrowSize * 1.2,
      y: origin.y
    }, arrowSize, triAngle);
    tailPoints = Rect_exports.corners(Rect_exports.fromTopLeft(
      { x: origin.x - midX, y: origin.y - midY },
      tailLength + arrowSize,
      tailThickness
    ));
  } else {
    tailPoints = Rect_exports.corners(Rect_exports.fromTopLeft({ x: origin.x, y: origin.y - tailThickness / 2 }, tailLength, tailThickness));
    tri = Triangle_exports.equilateralFromVertex({ x: origin.x + tailLength + arrowSize * 0.7, y: origin.y }, arrowSize, triAngle);
  }
  const arrow2 = Point_exports.rotate([
    tailPoints[0],
    tailPoints[1],
    tri.a,
    tri.b,
    tri.c,
    tailPoints[2],
    tailPoints[3]
  ], angleRadian2, origin);
  return arrow2;
};

// src/geometry/Vector.ts
var Vector_exports = {};
__export(Vector_exports, {
  clampMagnitude: () => clampMagnitude3,
  divide: () => divide4,
  dotProduct: () => dotProduct4,
  fromLineCartesian: () => fromLineCartesian,
  fromLinePolar: () => fromLinePolar,
  fromPointPolar: () => fromPointPolar,
  multiply: () => multiply5,
  normalise: () => normalise3,
  quadrantOffsetAngle: () => quadrantOffsetAngle,
  subtract: () => subtract4,
  sum: () => sum4,
  toCartesian: () => toCartesian2,
  toPolar: () => toPolar,
  toString: () => toString5
});
var EmptyCartesian2 = Object.freeze({ x: 0, y: 0 });
var piPi4 = Math.PI * 2;
var pi3 = Math.PI;
var fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian2) => {
  pt = subtract2(pt, origin);
  let dir = Math.atan2(pt.y, pt.x);
  if (angleNormalisation === `unipolar` && dir < 0)
    dir += piPi4;
  else if (angleNormalisation === `bipolar`) {
    if (dir > pi3)
      dir -= piPi4;
    else if (dir <= -pi3)
      dir += piPi4;
  }
  return Object.freeze({
    distance: distance2(pt),
    angleRadian: dir
  });
};
var fromLineCartesian = (line3) => subtract2(line3.b, line3.a);
var fromLinePolar = (line3) => {
  guard2(line3, `line`);
  const pt = subtract2(line3.b, line3.a);
  return fromPointPolar(pt);
};
var isPolar = (v) => {
  if (Polar_exports.isCoord(v))
    return true;
  return false;
};
var isCartesian = (v) => {
  if (isPoint(v))
    return true;
  return false;
};
var normalise3 = (v) => {
  if (isPolar(v)) {
    return Polar_exports.normalise(v);
  } else if (isCartesian(v)) {
    return normalise(v);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var quadrantOffsetAngle = (p) => {
  if (p.x >= 0 && p.y >= 0)
    return 0;
  if (p.x < 0 && p.y >= 0)
    return pi3;
  if (p.x < 0 && p.y < 0)
    return pi3;
  return piPi4;
};
var toPolar = (v, origin = Empty2) => {
  if (isPolar(v)) {
    return v;
  } else if (isCartesian(v)) {
    return Polar_exports.fromCartesian(v, origin);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toCartesian2 = (v) => {
  if (isPolar(v)) {
    return Polar_exports.toPoint(v);
  } else if (isCartesian(v)) {
    return v;
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toString5 = (v, digits) => {
  if (isPolar(v)) {
    return Polar_exports.toString(v, digits);
  } else if (isCartesian(v)) {
    return toString2(v, digits);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var dotProduct4 = (a, b) => {
  if (isPolar(a) && isPolar(b)) {
    return Polar_exports.dotProduct(a, b);
  } else if (isCartesian(a) && isCartesian(b)) {
    return dotProduct2(a, b);
  }
  throw new Error(`Expected two polar/Cartesian vectors.`);
};
var clampMagnitude3 = (v, max4 = 1, min4 = 0) => {
  if (isPolar(v)) {
    return Polar_exports.clampMagnitude(v, max4, min4);
  } else if (isCartesian(v)) {
    return clampMagnitude(v, max4, min4);
  }
  throw new Error(`Expected either polar or Cartesian vector`);
};
var sum4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = sum2(a, b);
  return polar ? toPolar(c) : c;
};
var subtract4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = subtract2(a, b);
  return polar ? toPolar(c) : c;
};
var multiply5 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = multiply2(a, b);
  return polar ? toPolar(c) : c;
};
var divide4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = divide2(a, b);
  return polar ? toPolar(c) : c;
};

// src/geometry/Waypoint.ts
var Waypoint_exports = {};
__export(Waypoint_exports, {
  fromPoints: () => fromPoints2,
  init: () => init
});
var fromPoints2 = (waypoints, opts = {}) => {
  const lines = joinPointsToLines(...waypoints);
  return init(lines.map((l) => toPath(l)), opts);
};
var init = (paths2, opts = {}) => {
  const maxDistanceFromLine = opts.maxDistanceFromLine ?? 0.1;
  const checkUnordered = (pt) => {
    const results = paths2.map((p, index) => {
      const nearest3 = p.nearest(pt);
      const distance3 = distance2(pt, nearest3);
      return { path: p, index, nearest: nearest3, distance: distance3 };
    });
    const filtered = results.filter((v) => v.distance <= maxDistanceFromLine);
    const sorted = Arrays_exports.sortByNumericProperty(filtered, `distance`);
    return sorted;
  };
  return checkUnordered;
};

// src/geometry/Sphere.ts
var Sphere_exports = {};

// src/geometry/Scaler.ts
var Scaler_exports = {};
__export(Scaler_exports, {
  scaler: () => scaler
});
var scaler = (scaleBy = `both`, defaultRect) => {
  const defaultBounds = defaultRect ?? placeholder;
  let sw = 1;
  let sh = 1;
  let s = { x: 1, y: 1 };
  const computeScale = () => {
    switch (scaleBy) {
      case `height`:
        return { x: sh, y: sh };
      case `width`:
        return { x: sw, y: sw };
      case `min`:
        return { x: Math.min(sw, sh), y: Math.min(sw, sh) };
      case `max`:
        return { x: Math.max(sw, sh), y: Math.max(sw, sh) };
      default:
        return { x: sw, y: sh };
    }
  };
  const normalise4 = (a, b, c, d) => {
    let inX = Number.NaN;
    let inY = Number.NaN;
    let outW = defaultBounds.width;
    let outH = defaultBounds.height;
    if (typeof a === `number`) {
      inX = a;
      if (typeof b === `number`) {
        inY = b;
        if (c === void 0)
          return [inX, inY, outW, outH];
        if (isRect(c)) {
          outW = c.width;
          outH = c.height;
        } else if (typeof c === `number`) {
          outW = c;
          if (typeof d === `number`) {
            outH = d;
          } else {
            throw new Error(`Missing final height value`);
          }
        } else
          throw new Error(`Missing valid output range`);
      } else if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else
        throw new Error(`Expected input y or output Rect to follow first number parameter`);
    } else if (isPoint(a)) {
      inX = a.x;
      inY = a.y;
      if (b === void 0)
        return [inX, inY, outW, outH];
      if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else if (typeof b === `number`) {
        outW = b;
        if (typeof c === `number`) {
          outH = c;
        } else {
          throw new Error(`Expected height as third parameter after Point and output width`);
        }
      } else {
        throw new Error(`Expected Rect or width as second parameter when first parameter is a Point`);
      }
    } else {
      throw new Error(`Expected input Point or x value as first parameter`);
    }
    return [inX, inY, outW, outH];
  };
  const scaleAbs = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(true, ...n);
  };
  const scaleRel = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(false, ...n);
  };
  const scaleNormalised = (abs4, x, y, w, h) => {
    if (Number.isNaN(w))
      throw new Error(`Output width range missing`);
    if (Number.isNaN(h))
      throw new Error(`Output height range missing`);
    if (w !== sw || h !== sh) {
      sw = w;
      sh = h;
      s = computeScale();
    }
    if (abs4) {
      return {
        x: x * s.x,
        y: y * s.y
      };
    } else {
      return {
        x: x / s.x,
        y: y / s.y
      };
    }
  };
  return {
    rel: scaleRel,
    abs: scaleAbs
  };
};

// src/geometry/SurfacePoints.ts
var SurfacePoints_exports = {};
__export(SurfacePoints_exports, {
  circleRings: () => circleRings,
  circleVogelSpiral: () => circleVogelSpiral,
  sphereFibonacci: () => sphereFibonacci
});
var cos3 = Math.cos;
var sin3 = Math.sin;
var asin = Math.asin;
var sqrt3 = Math.sqrt;
var pow2 = Math.pow;
var pi4 = Math.PI;
var piPi5 = Math.PI * 2;
var goldenAngle = pi4 * (3 - sqrt3(5));
var goldenSection = (1 + sqrt3(5)) / 2;
function* circleVogelSpiral(circle3, opts = {}) {
  const maxPoints = opts.maxPoints ?? 5e3;
  const density = opts.density ?? 0.95;
  const rotationOffset = opts.rotation ?? 0;
  const c = toPositioned(circle3 ?? { radius: 1, x: 0, y: 0 });
  const max4 = c.radius;
  let spacing = c.radius * scale(density, 0, 1, 0.3, 0.01);
  if (opts.spacing)
    spacing = opts.spacing;
  let radius = 0;
  let count = 0;
  let angle2 = 0;
  while (count < maxPoints && radius < max4) {
    radius = spacing * count ** 0.5;
    angle2 = rotationOffset + count * 2 * pi4 / goldenSection;
    yield Object.freeze({
      x: c.x + radius * cos3(angle2),
      y: c.y + radius * sin3(angle2)
    });
    count++;
  }
}
function* circleRings(circle3, opts = {}) {
  const rings = opts.rings ?? 5;
  const c = toPositioned(circle3 ?? { radius: 1, x: 0, y: 0 });
  const ringR = 1 / rings;
  let ringCount = 1;
  yield Object.freeze({ x: c.x, y: c.y });
  for (let r = ringR; r <= 1; r += ringR) {
    const n = Math.round(pi4 / asin(1 / (2 * ringCount)));
    for (const theta of linearSpace(0, piPi5, n + 1)) {
      yield Object.freeze({
        x: c.x + r * cos3(theta) * c.radius,
        y: c.y + r * sin3(theta) * c.radius
      });
    }
    ringCount++;
  }
}
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
  const offset2 = 2 / samples;
  const s = sphere ?? { x: 0, y: 0, z: 0, radius: 1 };
  for (let i = 0; i < samples; i++) {
    const y = i * offset2 - 1 + offset2 / 2;
    const r = sqrt3(1 - pow2(y, 2));
    const a = (i + 1) % samples * goldenAngle + rotationRadians;
    const x = cos3(a) * r;
    const z = sin3(a) * r;
    yield Object.freeze({
      x: s.x + x * s.radius,
      y: s.y + y * s.radius,
      z: s.z + z * s.radius
    });
  }
}

// src/geometry/Triangle.ts
var Triangle_exports = {};
__export(Triangle_exports, {
  Empty: () => Empty3,
  Equilateral: () => TriangleEquilateral_exports,
  Isosceles: () => TriangleIsosceles_exports,
  Placeholder: () => Placeholder3,
  Right: () => TriangleRight_exports,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply3,
  area: () => area6,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox6,
  centroid: () => centroid2,
  corners: () => corners2,
  edges: () => edges2,
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints3,
  fromRadius: () => fromRadius,
  guard: () => guard7,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty6,
  isEqual: () => isEqual7,
  isEquilateral: () => isEquilateral,
  isIsosceles: () => isIsosceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder4,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter5,
  rotate: () => rotate4,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray2
});

// src/geometry/TriangleEquilateral.ts
var TriangleEquilateral_exports = {};
__export(TriangleEquilateral_exports, {
  area: () => area3,
  centerFromA: () => centerFromA,
  centerFromB: () => centerFromB,
  centerFromC: () => centerFromC,
  circumcircle: () => circumcircle,
  fromCenter: () => fromCenter2,
  height: () => height,
  incircle: () => incircle,
  perimeter: () => perimeter2
});
var pi4over3 = Math.PI * 4 / 3;
var pi2over3 = Math.PI * 2 / 3;
var resolveLength = (t4) => {
  if (typeof t4 === `number`)
    return t4;
  return t4.length;
};
var fromCenter2 = (t4, origin = { x: 0, y: 0 }, rotationRad) => {
  const r = resolveLength(t4) / Math.sqrt(3);
  const rot = rotationRad ?? Math.PI * 1.5;
  const b = {
    x: r * Math.cos(rot) + origin.x,
    y: r * Math.sin(rot) + origin.y
  };
  const a = {
    x: r * Math.cos(rot + pi4over3) + origin.x,
    y: r * Math.sin(rot + pi4over3) + origin.y
  };
  const c = {
    x: r * Math.cos(rot + pi2over3) + origin.x,
    y: r * Math.sin(rot + pi2over3) + origin.y
  };
  return Object.freeze({ a, b, c });
};
var centerFromA = (t4, ptA = { x: 0, y: 0 }) => {
  const r = resolveLength(t4);
  const { radius } = incircle(t4);
  return {
    x: ptA.x + r / 2,
    y: ptA.y - radius
  };
};
var centerFromB = (t4, ptB = { x: 0, y: 0 }) => {
  const { radius } = incircle(t4);
  return {
    x: ptB.x,
    y: ptB.y + radius * 2
  };
};
var centerFromC = (t4, ptC = { x: 0, y: 0 }) => {
  const r = resolveLength(t4);
  const { radius } = incircle(t4);
  return {
    x: ptC.x - r / 2,
    y: ptC.y - radius
  };
};
var height = (t4) => Math.sqrt(3) / 2 * resolveLength(t4);
var perimeter2 = (t4) => resolveLength(t4) * 3;
var area3 = (t4) => Math.pow(resolveLength(t4), 2) * Math.sqrt(3) / 4;
var circumcircle = (t4) => ({
  radius: Math.sqrt(3) / 3 * resolveLength(t4)
});
var incircle = (t4) => ({
  radius: Math.sqrt(3) / 6 * resolveLength(t4)
});

// src/geometry/TriangleRight.ts
var TriangleRight_exports = {};
__export(TriangleRight_exports, {
  adjacentFromHypotenuse: () => adjacentFromHypotenuse,
  adjacentFromOpposite: () => adjacentFromOpposite,
  angleAtPointA: () => angleAtPointA,
  angleAtPointB: () => angleAtPointB,
  area: () => area4,
  circumcircle: () => circumcircle2,
  fromA: () => fromA,
  fromB: () => fromB,
  fromC: () => fromC,
  height: () => height2,
  hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
  hypotenuseFromOpposite: () => hypotenuseFromOpposite,
  hypotenuseSegments: () => hypotenuseSegments,
  incircle: () => incircle2,
  medians: () => medians,
  oppositeFromAdjacent: () => oppositeFromAdjacent,
  oppositeFromHypotenuse: () => oppositeFromHypotenuse,
  perimeter: () => perimeter3,
  resolveLengths: () => resolveLengths
});
var fromA = (t4, origin = { x: 0, y: 0 }) => {
  const tt = resolveLengths(t4);
  const seg = hypotenuseSegments(t4);
  const h = height2(t4);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + tt.hypotenuse, y: origin.y };
  const c = { x: origin.x + seg[1], y: origin.y - h };
  return { a, b, c };
};
var fromB = (t4, origin = { x: 0, y: 0 }) => {
  const tt = resolveLengths(t4);
  const seg = hypotenuseSegments(t4);
  const h = height2(t4);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - tt.hypotenuse, y: origin.y };
  const c = { x: origin.x - seg[0], y: origin.y - h };
  return { a, b, c };
};
var fromC = (t4, origin = { x: 0, y: 0 }) => {
  const seg = hypotenuseSegments(t4);
  const h = height2(t4);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - seg[1], y: origin.y + h };
  const b = { x: origin.x + seg[0], y: origin.y + h };
  return { a, b, c };
};
var resolveLengths = (t4) => {
  const a = t4.adjacent;
  const o = t4.opposite;
  const h = t4.hypotenuse;
  if (a !== void 0 && o !== void 0) {
    return {
      ...t4,
      adjacent: a,
      opposite: o,
      hypotenuse: Math.sqrt(a * a + o * o)
    };
  } else if (a && h) {
    return {
      ...t4,
      adjacent: a,
      hypotenuse: h,
      opposite: h * h - a * a
    };
  } else if (o && h) {
    return {
      ...t4,
      hypotenuse: h,
      opposite: o,
      adjacent: h * h - o * o
    };
  } else if (t4.opposite && t4.hypotenuse && t4.adjacent) {
    return t4;
  }
  throw new Error(`Missing at least two edges`);
};
var height2 = (t4) => {
  const tt = resolveLengths(t4);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return Math.sqrt(p * q);
};
var hypotenuseSegments = (t4) => {
  const tt = resolveLengths(t4);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return [p, q];
};
var perimeter3 = (t4) => {
  const tt = resolveLengths(t4);
  return tt.adjacent + tt.hypotenuse + tt.opposite;
};
var area4 = (t4) => {
  const tt = resolveLengths(t4);
  return tt.opposite * tt.adjacent / 2;
};
var angleAtPointA = (t4) => {
  const tt = resolveLengths(t4);
  return Math.acos(
    (tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse)
  );
};
var angleAtPointB = (t4) => {
  const tt = resolveLengths(t4);
  return Math.acos(
    (tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse)
  );
};
var medians = (t4) => {
  const tt = resolveLengths(t4);
  const b = tt.adjacent * tt.adjacent;
  const c = tt.hypotenuse * tt.hypotenuse;
  const a = tt.opposite * tt.opposite;
  return [
    Math.sqrt(2 * (b + c) - a) / 2,
    Math.sqrt(2 * (c + a) - b) / 2,
    Math.sqrt(2 * (a + b) - c) / 2
  ];
};
var circumcircle2 = (t4) => {
  const tt = resolveLengths(t4);
  return { radius: tt.hypotenuse / 2 };
};
var incircle2 = (t4) => {
  const tt = resolveLengths(t4);
  return {
    radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2
  };
};
var oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
var oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
var adjacentFromHypotenuse = (angleRad, hypotenuse) => Math.cos(angleRad) * hypotenuse;
var adjacentFromOpposite = (angleRad, opposite) => opposite / Math.tan(angleRad);
var hypotenuseFromOpposite = (angleRad, opposite) => opposite / Math.sin(angleRad);
var hypotenuseFromAdjacent = (angleRad, adjacent) => adjacent / Math.cos(angleRad);

// src/geometry/TriangleIsosceles.ts
var TriangleIsosceles_exports = {};
__export(TriangleIsosceles_exports, {
  apexAngle: () => apexAngle,
  area: () => area5,
  baseAngle: () => baseAngle,
  circumcircle: () => circumcircle3,
  fromA: () => fromA2,
  fromB: () => fromB2,
  fromC: () => fromC2,
  fromCenter: () => fromCenter3,
  height: () => height3,
  incircle: () => incircle3,
  legHeights: () => legHeights,
  medians: () => medians2,
  perimeter: () => perimeter4
});
var baseAngle = (t4) => Math.acos(t4.base / (2 * t4.legs));
var apexAngle = (t4) => {
  const aa = t4.legs * t4.legs;
  const cc = t4.base * t4.base;
  return Math.acos((2 * aa - cc) / (2 * aa));
};
var height3 = (t4) => {
  const aa = t4.legs * t4.legs;
  const cc = t4.base * t4.base;
  return Math.sqrt((4 * aa - cc) / 4);
};
var legHeights = (t4) => {
  const b = baseAngle(t4);
  return t4.base * Math.sin(b);
};
var perimeter4 = (t4) => 2 * t4.legs + t4.base;
var area5 = (t4) => {
  const h = height3(t4);
  return h * t4.base / 2;
};
var circumcircle3 = (t4) => {
  const h = height3(t4);
  const hh = h * h;
  const cc = t4.base * t4.base;
  return { radius: (4 * hh + cc) / (8 * h) };
};
var incircle3 = (t4) => {
  const h = height3(t4);
  return { radius: t4.base * h / (2 * t4.legs + t4.base) };
};
var medians2 = (t4) => {
  const aa = t4.legs * t4.legs;
  const cc = t4.base * t4.base;
  const medianAB = Math.sqrt(aa + 2 * cc) / 2;
  const medianC = Math.sqrt(4 * aa - cc) / 2;
  return [medianAB, medianAB, medianC];
};
var fromCenter3 = (t4, origin = { x: 0, y: 0 }) => {
  const h = height3(t4);
  const incircleR = incircle3(t4).radius;
  const verticalToApex = h - incircleR;
  const a = { x: origin.x - t4.base / 2, y: origin.y + incircleR };
  const b = { x: origin.x + t4.base / 2, y: origin.y + incircleR };
  const c = { x: origin.x, y: origin.y - verticalToApex };
  return { a, b, c };
};
var fromA2 = (t4, origin = { x: 0, y: 0 }) => {
  const h = height3(t4);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + t4.base, y: origin.y };
  const c = { x: origin.x + t4.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromB2 = (t4, origin = { x: 0, y: 0 }) => {
  const h = height3(t4);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t4.base, y: origin.y };
  const c = { x: origin.x - t4.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromC2 = (t4, origin = { x: 0, y: 0 }) => {
  const h = height3(t4);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t4.base / 2, y: origin.y + h };
  const b = { x: origin.x + t4.base / 2, y: origin.y + h };
  return { a, b, c };
};

// src/geometry/Triangle.ts
var piPi6 = Math.PI * 2;
var Empty3 = Object.freeze({ a: { x: 0, y: 0 }, b: { x: 0, y: 0 }, c: { x: 0, y: 0 } });
var Placeholder3 = Object.freeze({ a: { x: NaN, y: NaN }, b: { x: NaN, y: NaN }, c: { x: NaN, y: NaN } });
var isEmpty6 = (t4) => isEmpty4(t4.a) && isEmpty4(t4.b) && isEmpty4(t4.c);
var isPlaceholder4 = (t4) => isPlaceholder2(t4.a) && isPlaceholder2(t4.b) && isPlaceholder2(t4.c);
var apply3 = (t4, fn) => Object.freeze(
  {
    ...t4,
    a: fn(t4.a, `a`),
    b: fn(t4.b, `b`),
    c: fn(t4.c, `c`)
  }
);
var guard7 = (t4, name = `t`) => {
  if (t4 === void 0)
    throw Error(`{$name} undefined`);
  guard(t4.a, name + `.a`);
  guard(t4.b, name + `.b`);
  guard(t4.c, name + `.c`);
};
var isTriangle = (p) => {
  if (p === void 0)
    return false;
  const tri = p;
  if (!isPoint(tri.a))
    return false;
  if (!isPoint(tri.b))
    return false;
  if (!isPoint(tri.c))
    return false;
  return true;
};
var isEqual7 = (a, b) => isEqual2(a.a, b.a) && isEqual2(a.b, b.b) && isEqual2(a.c, b.c);
var corners2 = (t4) => {
  guard7(t4);
  return [t4.a, t4.b, t4.c];
};
var edges2 = (t4) => {
  guard7(t4);
  return Line_exports.joinPointsToLines(t4.a, t4.b, t4.c, t4.a);
};
var lengths2 = (t4) => {
  guard7(t4);
  return [
    distance2(t4.a, t4.b),
    distance2(t4.b, t4.c),
    distance2(t4.c, t4.a)
  ];
};
var angles = (t4) => {
  guard7(t4);
  return [
    angle(t4.a, t4.b),
    angle(t4.b, t4.c),
    angle(t4.c, t4.a)
  ];
};
var anglesDegrees = (t4) => {
  guard7(t4);
  return radianToDegree(angles(t4));
};
var isEquilateral = (t4) => {
  guard7(t4);
  const [a, b, c] = lengths2(t4);
  return a === b && b === c;
};
var isIsosceles = (t4) => {
  const [a, b, c] = lengths2(t4);
  if (a === b)
    return true;
  if (b === c)
    return true;
  if (c === a)
    return true;
  return false;
};
var isRightAngle = (t4) => angles(t4).some((v) => v === Math.PI / 2);
var isOblique = (t4) => !isRightAngle(t4);
var isAcute = (t4) => !angles(t4).some((v) => v >= Math.PI / 2);
var isObtuse = (t4) => angles(t4).some((v) => v > Math.PI / 2);
var centroid2 = (t4) => {
  guard7(t4);
  const total3 = reduce([t4.a, t4.b, t4.c], (p, acc) => ({
    x: p.x + acc.x,
    y: p.y + acc.y
  }));
  const div = {
    x: total3.x / 3,
    y: total3.y / 3
  };
  return div;
};
var perimeter5 = (t4) => {
  guard7(t4);
  return edges2(t4).reduce((acc, v) => acc + Line_exports.length(v), 0);
};
var area6 = (t4) => {
  guard7(t4, `t`);
  const e = edges2(t4).map((l) => Line_exports.length(l));
  const p = (e[0] + e[1] + e[2]) / 2;
  return Math.sqrt(p * (p - e[0]) * (p - e[1]) * (p - e[2]));
};
var innerCircle = (t4) => {
  const c = centroid2(t4);
  const p = perimeter5(t4) / 2;
  const a = area6(t4);
  const radius = a / p;
  return { radius, ...c };
};
var outerCircle = (t4) => {
  const [a, b, c] = edges2(t4).map((l) => Line_exports.length(l));
  const cent = centroid2(t4);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};
var fromRadius = (origin, radius, opts = {}) => {
  number(radius, `positive`, `radius`);
  guard(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [initialAngleRadian, initialAngleRadian + piPi6 * 1 / 3, initialAngleRadian + piPi6 * 2 / 3];
  const points = angles2.map((a) => Polar_exports.toCartesian(radius, a, origin));
  return fromPoints3(points);
};
var rotateByVertex = (triangle3, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle3.a : vertex === `b` ? triangle3.b : triangle3.c;
  return Object.freeze({
    a: rotate2(triangle3.a, amountRadian, origin),
    b: rotate2(triangle3.b, amountRadian, origin),
    c: rotate2(triangle3.c, amountRadian, origin)
  });
};
var equilateralFromVertex = (origin = { x: 0, y: 0 }, length5 = 10, angleRadian2 = Math.PI / 2) => {
  const a = project(origin, length5, Math.PI - -angleRadian2 / 2);
  const c = project(origin, length5, Math.PI - angleRadian2 / 2);
  return { a, b: origin, c };
};
var toFlatArray2 = (t4) => {
  guard7(t4);
  return [
    t4.a.x,
    t4.a.y,
    t4.b.x,
    t4.b.y,
    t4.c.x,
    t4.c.y
  ];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords))
    throw new Error(`coords expected as array`);
  if (coords.length !== 6)
    throw new Error(`coords array expected with 6 elements. Got ${coords.length}`);
  return fromPoints3(fromNumbers2(...coords));
};
var fromPoints3 = (points) => {
  if (!Array.isArray(points))
    throw new Error(`points expected as array`);
  if (points.length !== 3)
    throw new Error(`points array expected with 3 elements. Got ${points.length}`);
  const t4 = {
    a: points[0],
    b: points[1],
    c: points[2]
  };
  return t4;
};
var bbox6 = (t4, inflation = 0) => {
  const { a, b, c } = t4;
  const xMin = Math.min(a.x, b.x, c.x) - inflation;
  const xMax = Math.max(a.x, b.x, c.x) + inflation;
  const yMin = Math.min(a.y, b.y, c.y) - inflation;
  const yMax = Math.max(a.y, b.y, c.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var barycentricCoord = (t4, a, b) => {
  const pt = getPointParam(a, b);
  const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
  const alpha = ab(pt.x, pt.y, t4.b, t4.c) / ab(t4.a.x, t4.a.y, t4.b, t4.c);
  const theta = ab(pt.x, pt.y, t4.c, t4.a) / ab(t4.b.x, t4.b.y, t4.c, t4.a);
  const gamma2 = ab(pt.x, pt.y, t4.a, t4.b) / ab(t4.c.x, t4.c.y, t4.a, t4.b);
  return {
    a: alpha,
    b: theta,
    c: gamma2
  };
};
var barycentricToCartestian = (t4, bc) => {
  guard7(t4);
  const { a, b, c } = t4;
  const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
  const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
  if (a.z && b.z && c.z) {
    const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
    return Object.freeze({ x, y, z });
  } else {
    return Object.freeze({ x, y });
  }
};
var intersectsPoint2 = (t4, a, b) => {
  const box = bbox6(t4);
  const pt = getPointParam(a, b);
  if (!Rect_exports.intersectsPoint(box, pt))
    return false;
  const bc = barycentricCoord(t4, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};
var rotate4 = (t4, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0)
    return t4;
  if (origin === void 0)
    origin = centroid2(t4);
  return Object.freeze({
    ...t4,
    a: rotate2(t4.a, amountRadian, origin),
    b: rotate2(t4.b, amountRadian, origin),
    c: rotate2(t4.c, amountRadian, origin)
  });
};

// src/geometry/index.ts
function degreeToRadian(angleInDegrees) {
  if (Array.isArray(angleInDegrees)) {
    return angleInDegrees.map((v) => v * (Math.PI / 180));
  } else {
    return angleInDegrees * (Math.PI / 180);
  }
}
function radianToDegree(angleInRadians) {
  if (Array.isArray(angleInRadians)) {
    return angleInRadians.map((v) => v * 180 / Math.PI);
  } else {
    return angleInRadians * 180 / Math.PI;
  }
}
var radiansFromAxisX = (point3) => Math.atan2(point3.x, point3.y);
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Geometry: { Circles: Circle_exports, Arcs: Arc_exports, Lines: Line_exports, Rects: Rect_exports, Points: Point_exports, Paths: Path_exports, Grids: Grid_exports, Beziers: Bezier_exports, Compound: CompoundPath_exports, Ellipses: Ellipse_exports, Polar: Polar_exports, Shapes: Shape_exports, radiansFromAxisX, radianToDegree, degreeToRadian } };
  }
} catch {
}

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
  VideoFile: () => VideoFile_exports
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
  async close() {
    const s = this.stream;
    if (!s)
      return;
    await s.abort();
    await s.close();
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
  async close() {
    const w = this.stream?.getWriter();
    w?.releaseLock();
    await w?.close();
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

// src/flow/Retry.ts
var retry = async (callback, attempts = 5, startingTimeoutMs = 200, cancelToken) => {
  integer(attempts, `positive`, `attempts`);
  integer(startingTimeoutMs, `positive`, `startingTimeoutMs`);
  let timeout = startingTimeoutMs;
  let totalSlept = 0;
  while (attempts > 0) {
    try {
      return await callback();
    } catch (ex) {
      attempts--;
    }
    totalSlept += timeout;
    if (cancelToken && cancelToken.cancel)
      throw new Error(`Cancelled`);
    await sleep(timeout);
    if (cancelToken && cancelToken.cancel)
      throw new Error(`Cancelled`);
    timeout *= 2;
  }
  throw new Error(`Retry failed after ${attempts} attempts over ${totalSlept} ms.`);
};

// src/io/BleDevice.ts
var BleDevice = class extends SimpleEventEmitter {
  constructor(device, config2) {
    super();
    this.device = device;
    this.config = config2;
    __publicField(this, "states");
    __publicField(this, "codec");
    __publicField(this, "rx");
    __publicField(this, "tx");
    __publicField(this, "gatt");
    __publicField(this, "verboseLogging", false);
    __publicField(this, "rxBuffer");
    __publicField(this, "txBuffer");
    this.verboseLogging = config2.debug;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config2.chunkSize);
    this.rxBuffer = new StringReceiveBuffer((line3) => {
      this.fireEvent(`data`, { data: line3 });
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
      const rx2 = await service.getCharacteristic(this.config.rxGattCharacteristic);
      const tx = await service.getCharacteristic(this.config.txGattCharacteristic);
      rx2.addEventListener(`characteristicvaluechanged`, (evt) => this.onRx(evt));
      this.rx = rx2;
      this.tx = tx;
      this.gatt = gatt;
      this.states.state = `connected`;
      await rx2.startNotifications();
    }, attempts, 200);
  }
  onRx(evt) {
    const rx2 = this.rx;
    if (rx2 === void 0)
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
      const height4 = Math.abs(canvasHeight * valueRelative);
      const offset2 = canvasHeight - height4;
      const hue2 = i / bins * 360;
      const left = i * width;
      g.fillStyle = `hsl(` + hue2 + `, 100%, 50%)`;
      if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= left && pointer.x <= left + width) {
        if (this.freqTracker.id !== i.toString()) {
          this.freqTracker = numberTracker({ id: i.toString() });
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
      g.fillRect(left, offset2, width, height4);
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
    const button2 = this.el.querySelector(`button`);
    if (button2 === null)
      throw new Error(`Button element not found`);
    if (contentsElem === null)
      throw new Error(`Contents element not found`);
    if (value) {
      contentsElem.style.display = ``;
      button2.innerText = `\u{1F53C}`;
    } else {
      contentsElem.style.display = `none`;
      button2.innerText = `\u{1F53D}`;
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
      const height4 = wave[i] * canvasHeight;
      const y = bipolar ? canvasHeight / 2 - height4 : canvasHeight - height4;
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
    const rect2 = elem.getBoundingClientRect();
    return {
      x: this.lastPointer.x - rect2.left - window.scrollX,
      y: this.lastPointer.y - rect2.top - window.scrollY
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
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream2) => {
      this.onMicSuccess(stream2);
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
  setup(audioCtx, stream2) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = this.fftSize;
    analyser.smoothingTimeConstant = this.smoothingTimeConstant;
    const micSource = audioCtx.createMediaStreamSource(stream2);
    micSource.connect(analyser);
    return analyser;
  }
  onMicSuccess(stream2) {
    try {
      const audioCtx = new AudioContext();
      audioCtx.addEventListener(`statechange`, () => {
        if (this.debug)
          console.log(`Audio context state: ${audioCtx.state}`);
      });
      this.audioCtx = audioCtx;
      this.analyserNode = this.setup(audioCtx, stream2);
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
    return Arrays_exports.max(samples);
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
  EspruinoBleDevice: () => EspruinoBleDevice,
  EspruinoSerialDevice: () => EspruinoSerialDevice,
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
  async eval(code, opts = {}, warn) {
    const debug2 = opts.debug ?? false;
    const warnCb = warn ?? ((m) => this.warn(m));
    return deviceEval(code, opts, this, `Bluetooth.println`, debug2, warnCb);
  }
};

// src/io/Serial.ts
var Serial_exports = {};
__export(Serial_exports, {
  Device: () => Device
});

// src/io/JsonDevice.ts
var JsonDevice = class extends SimpleEventEmitter {
  constructor(config2 = {}) {
    super();
    __publicField(this, "states");
    __publicField(this, "codec");
    __publicField(this, "verboseLogging", false);
    __publicField(this, "name");
    __publicField(this, "connectAttempts");
    __publicField(this, "chunkSize");
    __publicField(this, "rxBuffer");
    __publicField(this, "txBuffer");
    this.verboseLogging = config2.debug ?? false;
    this.chunkSize = config2.chunkSize ?? 1024;
    this.connectAttempts = config2.connectAttempts ?? 3;
    this.name = config2.name ?? `JsonDevice`;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config2.chunkSize);
    this.rxBuffer = new StringReceiveBuffer((line3) => {
      this.fireEvent(`data`, { data: line3 });
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
  async close() {
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
  constructor(config2 = {}) {
    super(config2);
    this.config = config2;
    __publicField(this, "port");
    __publicField(this, "tx");
    __publicField(this, "abort");
    __publicField(this, "baudRate");
    this.abort = new AbortController();
    const eol = config2.eol ?? `\r
`;
    this.baudRate = config2.baudRate ?? 9600;
    if (config2.name === void 0)
      super.name = `Serial.Device`;
    this.rxBuffer.separator = eol;
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
      txText.readable.pipeTo(txW, { signal: this.abort.signal }).catch((err) => {
        console.log(`Serial.onConnectAttempt txText pipe:`);
        console.log(err);
      });
      this.tx = txText.writable.getWriter();
    }
    const rxR = this.port.readable;
    const rxText = new TextDecoderStream();
    if (rxR !== null) {
      rxR.pipeTo(rxText.writable, { signal: this.abort.signal }).catch((err) => {
        console.log(`Serial.onConnectAttempt rxR pipe:`);
        console.log(err);
      });
      rxText.readable.pipeTo(this.rxBuffer.writable(), { signal: this.abort.signal }).catch((err) => {
        console.log(`Serial.onConnectAttempt rxText pipe:`);
        console.log(err);
        try {
          this.port?.close();
        } catch (ex) {
          console.log(ex);
        }
      });
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
  async disconnect() {
    return super.close();
  }
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  async eval(code, opts = {}, warn) {
    const debug2 = opts.debug ?? false;
    const warnCb = warn ?? ((m) => this.warn(m));
    return deviceEval(code, opts, this, `USB.println`, debug2, warnCb);
  }
};

// src/io/Espruino.ts
var puck = async (opts = {}) => {
  const name = opts.name ?? `Puck`;
  const debug2 = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts),
    optionalServices: [defaultOpts.service]
  });
  console.log(device.name);
  const d = new EspruinoBleDevice(device, { name, debug: debug2 });
  await d.connect();
  return d;
};
var serial = async (opts = {}) => {
  const d = new EspruinoSerialDevice(opts);
  await d.connect();
  return d;
};
var getFilters = (opts) => {
  const filters = [];
  if (opts.filters) {
    filters.push(...opts.filters);
  } else if (opts.name) {
    filters.push({ name: opts.name });
    console.info(`Filtering Bluetooth devices by name '${opts.name}'`);
  } else {
    filters.push({ namePrefix: `Puck.js` });
  }
  return filters;
};
var connectBle = async (opts = {}) => {
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts),
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name: `Espruino` });
  await d.connect();
  return d;
};
var deviceEval = async (code, opts = {}, device, evalReplyPrefix, debug2, warn) => {
  const timeoutMs = opts.timeoutMs ?? device.evalTimeoutMs;
  const assumeExclusive = opts.assumeExclusive ?? true;
  if (typeof code !== `string`)
    throw new Error(`code parameter should be a string`);
  return new Promise((resolve, reject) => {
    const id = string(5);
    const onData = (d) => {
      try {
        let cleaned = d.data;
        if (cleaned.startsWith(`>{`) && cleaned.endsWith(`}`))
          cleaned = cleaned.substring(1);
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
    if (debug2)
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
var startTimeoutMs = 1e4;
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
  videoEl.playsInline = true;
  videoEl.muted = true;
  videoEl.classList.add(`ixfx-camera`);
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
    return { videoEl, dispose };
  } catch (ex) {
    console.error(ex);
    dispose();
    throw ex;
  }
};
var startWithVideoEl = async (videoEl, constraints = {}) => {
  if (videoEl === void 0)
    throw new Error(`videoEl undefined`);
  if (videoEl === null)
    throw new Error(`videoEl null`);
  const maxRes = constraints.max;
  const minRes = constraints.min;
  const idealRes = constraints.ideal;
  const c = {
    audio: false,
    video: {
      width: {},
      height: {}
    }
  };
  if (constraints.facingMode === `front`)
    constraints = { ...constraints, facingMode: `user` };
  if (constraints.facingMode === `back`)
    constraints = { ...constraints, facingMode: `environment` };
  if (constraints.facingMode) {
    c.video.facingMode = constraints.facingMode;
  }
  if (constraints.deviceId) {
    c.video.deviceId = constraints.deviceId;
  }
  if (idealRes) {
    c.video.width = {
      ...c.video.width,
      ideal: idealRes.width
    };
    c.video.height = {
      ...c.video.height,
      ideal: idealRes.height
    };
  }
  if (maxRes) {
    c.video.width = {
      ...c.video.width,
      max: maxRes.width
    };
    c.video.height = {
      ...c.video.height,
      max: maxRes.height
    };
  }
  if (minRes) {
    c.video.width = {
      ...c.video.width,
      min: minRes.width
    };
    c.video.height = {
      ...c.video.height,
      min: minRes.height
    };
  }
  const done = waitFor(
    constraints.startTimeoutMs ?? startTimeoutMs,
    (reason) => {
      throw new Error(`Camera getUserMedia failed: ${reason}`);
    }
  );
  try {
    const stream2 = await navigator.mediaDevices.getUserMedia(c);
    const dispose = () => {
      videoEl.pause();
      const t4 = stream2.getTracks();
      t4.forEach((track) => track.stop());
    };
    videoEl.srcObject = stream2;
    done();
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
  } catch (ex) {
    done(ex.toString());
    throw ex;
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
  if (videoEl === void 0)
    throw new Error(`videoEl undefined`);
  if (videoEl === null)
    throw new Error(`videoEl null`);
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

// src/visual/Video.ts
var Video_exports = {};
__export(Video_exports, {
  capture: () => capture,
  frames: () => frames,
  manualCapture: () => manualCapture
});
async function* frames(sourceVideoEl, opts = {}) {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  let canvasEl = opts.canvasEl;
  let w, h;
  w = h = 0;
  if (canvasEl === void 0) {
    canvasEl = document.createElement(`CANVAS`);
    canvasEl.classList.add(`ixfx-frames`);
    if (!showCanvas) {
      canvasEl.style.display = `none`;
    }
    document.body.appendChild(canvasEl);
  }
  const updateSize = () => {
    if (canvasEl === void 0)
      return;
    w = sourceVideoEl.videoWidth;
    h = sourceVideoEl.videoHeight;
    canvasEl.width = w;
    canvasEl.height = h;
  };
  let c = null;
  const looper = delayLoop(maxIntervalMs);
  for await (const _ of looper) {
    if (w === 0 || h === 0)
      updateSize();
    if (w === 0 || h === 0)
      continue;
    if (c === null)
      c = canvasEl.getContext(`2d`);
    if (c === null)
      return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c.getImageData(
      0,
      0,
      w,
      h
    );
    yield pixels;
  }
}
var capture = (sourceVideoEl, opts = {}) => {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  const onFrame = opts.onFrame;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const canvasEl = document.createElement(`CANVAS`);
  canvasEl.classList.add(`ixfx-capture`);
  if (!showCanvas) {
    canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  let c = null;
  let worker;
  if (opts.workerScript) {
    worker = new Worker(opts.workerScript);
  }
  const getPixels = worker || onFrame;
  if (!getPixels && !showCanvas) {
    console.warn(`Video will be captured to hidden element without any processing. Is this what you want?`);
  }
  const loop = continuously(() => {
    if (c === null)
      c = canvasEl.getContext(`2d`);
    if (c === null)
      return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    let pixels;
    if (getPixels) {
      pixels = c.getImageData(
        0,
        0,
        w,
        h
      );
    }
    if (worker) {
      worker.postMessage({
        pixels: pixels.data.buffer,
        width: w,
        height: h,
        channels: 4
      }, [pixels.data.buffer]);
    }
    if (onFrame) {
      try {
        onFrame(pixels);
      } catch (e) {
        console.error(e);
      }
    }
  }, maxIntervalMs);
  return {
    start: () => loop.start(),
    cancel: () => loop.cancel(),
    canvasEl
  };
};
var manualCapture = (sourceVideoEl, opts = {}) => {
  const showCanvas = opts.showCanvas ?? false;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const definedCanvasEl = opts.canvasEl !== void 0;
  let canvasEl = opts.canvasEl;
  if (!canvasEl) {
    canvasEl = document.createElement(`CANVAS`);
    canvasEl.classList.add(`ixfx-capture`);
    document.body.append(canvasEl);
    if (!showCanvas)
      canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  const capture2 = () => {
    let c2;
    if (!c2)
      c2 = canvasEl?.getContext(`2d`, { willReadFrequently: true });
    if (!c2)
      throw new Error(`Could not create graphics context`);
    c2.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c2.getImageData(
      0,
      0,
      w,
      h
    );
    pixels.currentTime = sourceVideoEl.currentTime;
    if (opts.postCaptureDraw)
      opts.postCaptureDraw(c2, w, h);
    return pixels;
  };
  const dispose = () => {
    if (definedCanvasEl)
      return;
    try {
      canvasEl?.remove();
    } catch (_) {
    }
  };
  const c = {
    canvasEl,
    capture: capture2,
    dispose
  };
  return c;
};

// src/io/FrameProcessor.ts
var FrameProcessor = class {
  constructor(opts = {}) {
    __publicField(this, "_source");
    __publicField(this, "_state");
    __publicField(this, "_teardownNeeded", false);
    __publicField(this, "_cameraConstraints");
    __publicField(this, "_cameraStartResult");
    __publicField(this, "_videoSourceCapture");
    __publicField(this, "_videoFile");
    __publicField(this, "_videoStartResult");
    __publicField(this, "_showCanvas");
    __publicField(this, "_showPreview");
    __publicField(this, "_postCaptureDraw");
    __publicField(this, "_timer");
    __publicField(this, "_captureCanvasEl");
    this._state = `ready`;
    this._source = ``;
    this._timer = performance.now();
    this._showCanvas = opts.showCanvas ?? false;
    this._showPreview = opts.showPreview ?? false;
    this._cameraConstraints = opts.cameraConstraints ?? void 0;
    this._captureCanvasEl = opts.captureCanvasEl ?? void 0;
    this._postCaptureDraw = opts.postCaptureDraw;
  }
  showPreview(enabled) {
    if (this._state === `disposed`)
      throw new Error(`Disposed`);
    let el;
    switch (this._source) {
      case `camera`:
        el = this._cameraStartResult?.videoEl;
        if (el !== void 0)
          el.style.display = enabled ? `block` : `none`;
        break;
    }
    this._showPreview = enabled;
  }
  showCanvas(enabled) {
    if (this._state === `disposed`)
      throw new Error(`Disposed`);
    let el;
    if (this._source === `camera` || this._source === `video`) {
      el = this._videoSourceCapture?.canvasEl;
      if (el !== void 0)
        el.style.display = enabled ? `block` : `none`;
    } else
      throw new Error(`Source not implemented: ${this._source}`);
    this._showCanvas = enabled;
  }
  getCapturer() {
    if (this._state === `disposed`)
      throw new Error(`Disposed`);
    if (this._source === `camera` || this._source === `video`) {
      return this._videoSourceCapture;
    }
    throw new Error(`Source kind not supported ${this._source}`);
  }
  async useCamera(constraints) {
    if (this._state === `disposed`)
      throw new Error(`Disposed`);
    this._source = `camera`;
    if (this._teardownNeeded)
      this.teardown();
    if (constraints)
      this._cameraConstraints;
    await this.init();
  }
  async useVideo(file) {
    if (this._state === `disposed`)
      throw new Error(`Disposed`);
    this._source = `video`;
    if (this._teardownNeeded)
      this.teardown();
    this._videoFile = file;
    await this.init();
  }
  async initCamera() {
    const r = await start(this._cameraConstraints);
    if (r === void 0)
      throw new Error(`Could not start camera`);
    this._cameraStartResult = r;
    this.postInit(r);
  }
  async initVideo() {
    if (!this._videoFile)
      throw new Error(`Video file not defined`);
    const r = await start2(this._videoFile);
    this._videoStartResult = r;
    this.postInit(r);
  }
  async postInit(r) {
    if (this._showPreview)
      r.videoEl.style.display = `block`;
    this._videoSourceCapture = manualCapture(r.videoEl, {
      postCaptureDraw: this._postCaptureDraw,
      showCanvas: this._showCanvas,
      canvasEl: this._captureCanvasEl
    });
    this._teardownNeeded = true;
    this._cameraStartResult = r;
  }
  dispose() {
    if (this._state === `disposed`)
      return;
    this.teardown();
    this._state = `disposed`;
  }
  async init() {
    this._timer = performance.now();
    switch (this._source) {
      case `camera`:
        await this.initCamera();
        break;
      case `video`:
        await this.initVideo();
        break;
    }
    this._state = `initialised`;
  }
  teardown() {
    if (!this._teardownNeeded)
      return;
    if (this._source === `camera` || this._source === `video`) {
      this._videoSourceCapture?.dispose();
    }
    switch (this._source) {
      case `camera`:
        this._cameraStartResult?.dispose();
        break;
      case `video`:
        this._videoStartResult?.dispose();
        break;
    }
    this._teardownNeeded = false;
  }
  getFrame() {
    if (this._state === `disposed`)
      throw new Error(`Disposed`);
    switch (this._source) {
      case `camera`:
        return this.getFrameCamera();
      case `video`:
        return this.getFrameCamera();
      default:
        throw new Error(`source type unhandled ${this._source}`);
    }
  }
  getTimestamp() {
    return performance.now() - this._timer;
  }
  getFrameCamera() {
    return this._videoSourceCapture?.capture();
  }
};

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  Palette: () => Palette_exports,
  Plot: () => Plot_exports,
  Plot2: () => Plot2_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports
});

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  copyToImg: () => copyToImg,
  dot: () => dot,
  drawingStack: () => drawingStack,
  ellipse: () => ellipse,
  getCtx: () => getCtx,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle
});

// node_modules/rxjs/node_modules/tslib/modules/index.js
var import_tslib = __toESM(require_tslib(), 1);
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet
} = import_tslib.default;

// node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

// node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});

// node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}

// node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                _a.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
              _b.call(_finalizers_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty2 = new Subscription2();
    empty2.closed = true;
    return empty2;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

// node_modules/rxjs/dist/esm5/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

// node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {
}

// node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}

// node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

// node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();

// node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
  return x;
}

// node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}

// node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = function() {
  function Observable3(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable3.prototype.lift = function(operator) {
    var observable2 = new Observable3();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable3.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable3.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable3.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable3.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable3.prototype[observable] = function() {
    return this;
  };
  Observable3.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable3.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable3.create = function(subscribe) {
    return new Observable3(subscribe);
  };
  return Observable3;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}

// node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init2) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init2(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

// node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);

// node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return this;
  };
  return Action2;
}(Subscription);

// node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
var intervalProvider = {
  setInterval: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearInterval: function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay) {
    var _a;
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);

// node_modules/rxjs/dist/esm5/internal/Scheduler.js
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();

// node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);

// node_modules/rxjs/dist/esm5/internal/scheduler/async.js
var asyncScheduler = new AsyncScheduler(AsyncAction);

// node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};

// node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

// node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
  return isFunction(input[observable]);
}

// node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

// node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

// node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();

// node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

// node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          if (false)
            return [3, 8];
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done)
            return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

// node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable2(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array3) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array3.length && !subscriber.closed; i++) {
      subscriber.next(array3[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable2(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
          _a.call(iterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
            return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
            return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2)
            throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}

// node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat2) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat2 === void 0) {
    repeat2 = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat2) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat2) {
    return scheduleSubscription;
  }
}

// node_modules/rxjs/dist/esm5/internal/operators/map.js
function map2(project2, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project2.call(thisArg, value, index++));
    }));
  });
}

// node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray = Array.isArray;
function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map2(function(args) {
    return callOrApply(fn, args);
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function mergeInternals(source, subscriber, project2, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project2(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}

// node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function mergeMap(project2, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map2(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project2(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project2, concurrent);
  });
}

// node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add3 = _a[0], remove3 = _a[1];
  if (!add3) {
    if (isArrayLike(target)) {
      return mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom(target));
    }
  }
  if (!add3) {
    throw new TypeError("Invalid event target");
  }
  return new Observable(function(subscriber) {
    var handler = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    };
    add3(handler);
    return function() {
      return remove3(handler);
    };
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}

// node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js
function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return operate(function(source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;
    var emit = function() {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(void 0, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = activeTask = null;
    }));
  });
}

// src/dom/Util.ts
var import_json5 = __toESM(require_dist(), 1);
var fullSizeElement = (domQueryOrEl, onResized) => {
  const el = resolveEl(domQueryOrEl);
  const r = windowResize();
  const update = () => {
    const width = window.innerWidth;
    const height4 = window.innerHeight;
    el.setAttribute(`width`, width.toString());
    el.setAttribute(`height`, height4.toString());
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height4),
        max: Math.max(width, height4),
        width,
        height: height4,
        center: {
          x: width / 2,
          y: height4 / 2
        }
      };
      onResized({ el, bounds });
    }
  };
  r.subscribe(update);
  update();
  return r;
};
var canvasHelper = (domQueryOrEl, opts) => {
  if (!domQueryOrEl)
    throw new Error(`domQueryOrEl is null or undefined`);
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`)
    throw new Error(`Expected CANVAS HTML element. Got: ${el.nodeName}`);
  const fullSize = opts.fullSize ?? true;
  const ratio = Math.round(window.devicePixelRatio) || 1;
  const scaleBy = opts.scaleBy ?? `both`;
  let scaler2 = Scaler_exports.scaler(`both`);
  const updateDimensions = (rect2) => {
    scaler2 = Scaler_exports.scaler(scaleBy, rect2);
    const pixelScaled = Rect_exports.multiply(rect2, ratio, ratio);
    el.width = pixelScaled.width;
    el.height = pixelScaled.height;
    el.style.width = rect2.width + `px`;
    el.style.height = rect2.height + `px`;
  };
  const onWindowResize = () => {
    const innerWindow = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    updateDimensions(innerWindow);
  };
  const getContext = () => {
    const ctx = el.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Could not create drawing context`);
    ctx.scale(ratio, ratio);
  };
  if (fullSize) {
    const r = windowResize();
    r.subscribe(onWindowResize);
  }
  return {
    abs: scaler2.abs,
    rel: scaler2.rel,
    getContext
  };
};
var fullSizeCanvas = (domQueryOrEl, onResized, skipCss = false) => {
  if (domQueryOrEl === null || domQueryOrEl === void 0)
    throw new Error(`domQueryOrEl is null or undefined`);
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`)
    throw new Error(`Expected HTML element with node name CANVAS, not ${el.nodeName}`);
  const ctx = el.getContext(`2d`);
  if (ctx === null)
    throw new Error(`Could not create drawing context`);
  const update = () => {
    const width = window.innerWidth;
    const height4 = window.innerHeight;
    el.width = width;
    el.height = height4;
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height4),
        max: Math.max(width, height4),
        width,
        height: height4,
        center: { x: width / 2, y: height4 / 2 }
      };
      onResized({ ctx, el, bounds });
    }
  };
  if (!skipCss) {
    el.style.top = `0`;
    el.style.left = `0`;
    el.style.zIndex = `-100`;
    el.style.position = `fixed`;
  }
  const r = windowResize();
  r.subscribe(update);
  update();
  return r;
};
var cycleCssClass = (el, list) => {
  if (el === null || !el)
    return;
  if (!Array.isArray(list))
    throw new Error(`List should be an array of strings`);
  for (let i = 0; i < list.length; i++) {
    if (el.classList.contains(list[i])) {
      el.classList.remove(list[i]);
      if (i + 1 < list.length) {
        el.classList.add(list[i + 1]);
      } else {
        el.classList.add(list[0]);
      }
      return;
    }
  }
  el.classList.add(list[0]);
};
var parentSize = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el = resolveEl(domQueryOrEl);
  const parent = el.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ro = resizeObservable(parent, timeoutMs).subscribe((entries) => {
    const e = entries.find((v) => v.target === parent);
    if (e === void 0)
      return;
    const width = e.contentRect.width;
    const height4 = e.contentRect.height;
    el.setAttribute(`width`, width + `px`);
    el.setAttribute(`height`, height4 + `px`);
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height4),
        max: Math.max(width, height4),
        width,
        height: height4,
        center: { x: width / 2, y: height4 / 2 }
      };
      onResized({ el, bounds });
    }
  });
  return ro;
};
var getTranslation = (domQueryOrEl) => {
  const el = resolveEl(domQueryOrEl);
  const style = window.getComputedStyle(el);
  const matrix = style.transform;
  if (matrix === `none` || typeof matrix === `undefined`) {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  }
  const matrixType = matrix.includes(`3d`) ? `3d` : `2d`;
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(`, `);
  if (matrixType === `2d`) {
    return {
      x: parseFloat(matrixValues[4]),
      y: parseFloat(matrixValues[5]),
      z: 0
    };
  }
  if (matrixType === `3d`) {
    return {
      x: parseFloat(matrixValues[12]),
      y: parseFloat(matrixValues[13]),
      z: parseFloat(matrixValues[14])
    };
  }
  return { x: 0, y: 0, z: 0 };
};
var parentSizeCanvas = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`)
    throw new Error(`Expected HTML element with node name CANVAS, not ${el.nodeName}`);
  const parent = el.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ctx = el.getContext(`2d`);
  if (ctx === null)
    throw new Error(`Could not create drawing context`);
  el.style.width = `100%`;
  el.style.height = `100%`;
  const ro = resizeObservable(parent, timeoutMs).subscribe((entries) => {
    const e = entries.find((v) => v.target === parent);
    if (e === void 0)
      return;
    const width = e.contentRect.width;
    const height4 = e.contentRect.height;
    el.setAttribute(`width`, el.offsetWidth + `px`);
    el.setAttribute(`height`, el.offsetHeight + `px`);
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height4),
        max: Math.max(width, height4),
        width,
        height: height4,
        center: { x: width / 2, y: height4 / 2 }
      };
      onResized({ ctx, el, bounds });
    }
  });
  return ro;
};
var windowResize = (timeoutMs = 100) => fromEvent(window, `resize`).pipe(debounceTime(timeoutMs));
var resolveEl = (domQueryOrEl) => {
  if (typeof domQueryOrEl === `string`) {
    const d = document.querySelector(domQueryOrEl);
    if (d === null) {
      if (!domQueryOrEl.startsWith(`#`)) {
        throw new Error(`Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`);
      } else {
        throw new Error(`Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'`);
      }
    }
    domQueryOrEl = d;
  } else if (domQueryOrEl === null)
    throw new Error(`domQueryOrEl ${domQueryOrEl} is null`);
  else if (domQueryOrEl === void 0)
    throw new Error(`domQueryOrEl ${domQueryOrEl} is undefined`);
  const el = domQueryOrEl;
  return el;
};
var createAfter = (sibling, tagName) => {
  const el = document.createElement(tagName);
  sibling.parentElement?.insertBefore(el, sibling.nextSibling);
  return el;
};
var createIn = (parent, tagName) => {
  const el = document.createElement(tagName);
  parent.appendChild(el);
  return el;
};
var dataTableList = (parentOrQuery, data) => {
  const parent = resolveEl(parentOrQuery);
  const update = (data2) => {
    const seenTables = /* @__PURE__ */ new Set();
    for (const [key, value] of data2) {
      const tKey = `table-${key}`;
      seenTables.add(tKey);
      let t4 = parent.querySelector(`#${tKey}`);
      if (t4 === null) {
        t4 = document.createElement(`table`);
        t4.id = tKey;
        parent.append(t4);
      }
      updateDataTable(t4, value);
    }
    const tables = Array.from(parent.querySelectorAll(`table`));
    tables.forEach((t4) => {
      if (!seenTables.has(t4.id)) {
        t4.remove();
      }
    });
  };
  if (data)
    update(data);
  return (d) => {
    update(d);
  };
};
var updateDataTable = (t4, data, opts = {}) => {
  const precision = opts.precision ?? 2;
  if (data === void 0) {
    t4.innerHTML = ``;
    return;
  }
  const seenRows = /* @__PURE__ */ new Set();
  for (const [key, value] of Object.entries(data)) {
    const domKey = `row-${key}`;
    seenRows.add(domKey);
    let rowEl = t4.querySelector(`#${domKey}`);
    if (rowEl === null) {
      rowEl = document.createElement(`tr`);
      t4.append(rowEl);
      rowEl.id = domKey;
      const keyEl = document.createElement(`td`);
      keyEl.innerText = key;
      rowEl.append(keyEl);
    }
    let valEl = rowEl.querySelector(`#${domKey}-val`);
    if (valEl === null) {
      valEl = document.createElement(`td`);
      valEl.id = `${domKey}-val`;
      rowEl.append(valEl);
    }
    let valueHTML;
    if (opts.formatter) {
      valueHTML = opts.formatter(value, key);
    }
    if (valueHTML === void 0) {
      if (typeof value === `object`) {
        valueHTML = import_json5.default.stringify(value);
      } else if (typeof value === `number`) {
        if (opts.roundNumbers) {
          valueHTML = Math.round(value).toString();
        } else {
          valueHTML = value.toFixed(precision);
        }
      } else {
        valueHTML = value.toString();
      }
    }
    valEl.innerHTML = valueHTML;
  }
  const rows2 = Array.from(t4.querySelectorAll(`tr`));
  rows2.forEach((r) => {
    if (!seenRows.has(r.id)) {
      r.remove();
    }
  });
};
var dataTable = (parentOrQuery, data, opts) => {
  const parent = resolveEl(parentOrQuery);
  const t4 = document.createElement(`table`);
  parent.append(t4);
  if (data)
    updateDataTable(t4, data, opts);
  return (d) => {
    updateDataTable(t4, d, opts);
  };
};
var clear = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    parent.removeChild(c);
    c = parent.lastElementChild;
  }
};
var themeChangeObservable = () => {
  const o = new Observable((subscriber) => {
    const ro = new MutationObserver((entries) => {
      subscriber.next(entries);
    });
    const opts = {
      attributeFilter: [`class`],
      attributes: true
    };
    ro.observe(document.documentElement, opts);
    return function unsubscribe() {
      ro.disconnect();
    };
  });
  return o;
};
var resizeObservable = (elem, timeoutMs = 1e3) => {
  if (elem === null)
    throw new Error(`elem parameter is null. Expected element to observe`);
  if (elem === void 0)
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  const o = new Observable((subscriber) => {
    const ro = new ResizeObserver((entries) => {
      subscriber.next(entries);
    });
    ro.observe(elem);
    return function unsubscribe() {
      ro.unobserve(elem);
    };
  });
  return o.pipe(debounceTime(timeoutMs));
};
var copyToClipboard = (obj) => {
  const p = new Promise((resolve, reject) => {
    const str = import_json5.default.stringify(obj);
    navigator.clipboard.writeText(JSON.stringify(str)).then(
      () => {
        resolve(true);
      },
      (_err) => {
        console.warn(`Could not copy to clipboard`);
        console.log(str);
        reject(_err);
      }
    );
  });
  return p;
};
var reconcileChildren = (parentEl, list, createUpdate) => {
  if (parentEl === null)
    throw new Error(`parentEl is null`);
  if (parentEl === void 0)
    throw new Error(`parentEl is undefined`);
  const seen = /* @__PURE__ */ new Set();
  for (const [key, value] of list) {
    const id = `c-${key}`;
    const el = parentEl.querySelector(`#${id}`);
    const finalEl = createUpdate(value, el);
    if (el !== finalEl) {
      finalEl.id = id;
      parentEl.append(finalEl);
    }
    seen.add(id);
  }
  const prune = [];
  for (let i = 0; i < parentEl.children.length; i++) {
    const c = parentEl.children[i];
    if (!seen.has(c.id)) {
      prune.push(c);
    }
  }
  prune.forEach((p) => p.remove());
};

// src/visual/Drawing.ts
var PIPI = Math.PI * 2;
var getCtx = (canvasElCtxOrQuery) => {
  if (canvasElCtxOrQuery === null)
    throw Error(`canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`);
  if (canvasElCtxOrQuery === void 0)
    throw Error(`canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`);
  const ctx = canvasElCtxOrQuery instanceof CanvasRenderingContext2D ? canvasElCtxOrQuery : canvasElCtxOrQuery instanceof HTMLCanvasElement ? canvasElCtxOrQuery.getContext(`2d`) : typeof canvasElCtxOrQuery === `string` ? resolveEl(canvasElCtxOrQuery).getContext(`2d`) : canvasElCtxOrQuery;
  if (ctx === null)
    throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getCtx(ctxOrCanvasEl);
  return {
    paths(pathsToDraw, opts) {
      paths(ctx, pathsToDraw, opts);
    },
    line(lineToDraw, opts) {
      line(ctx, lineToDraw, opts);
    },
    rect(rectsToDraw, opts) {
      rect(ctx, rectsToDraw, opts);
    },
    bezier(bezierToDraw, opts) {
      bezier(ctx, bezierToDraw, opts);
    },
    connectedPoints(pointsToDraw, opts) {
      connectedPoints(ctx, pointsToDraw, opts);
    },
    pointLabels(pointsToDraw, opts) {
      pointLabels(ctx, pointsToDraw, opts);
    },
    dot(dotPosition, opts) {
      dot(ctx, dotPosition, opts);
    },
    circle(circlesToDraw, opts) {
      circle(ctx, circlesToDraw, opts);
    },
    arc(arcsToDraw, opts) {
      arc(ctx, arcsToDraw, opts);
    },
    textBlock(lines, opts) {
      if (opts.bounds === void 0 && canvasBounds !== void 0)
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}, ...additionalOps) => {
  if (ctx === void 0)
    throw Error(`ctx undefined`);
  const stack2 = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
  stack2.apply();
  return stack2;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  if (Array.isArray(arcs)) {
    arcs.forEach(draw2);
  } else
    draw2(arcs);
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply5 = (ctx) => {
    if (fillStyle)
      ctx.fillStyle = fillStyle;
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle;
  };
  return apply5;
};
var lineOp = (lineWidth, lineJoin, lineCap) => {
  const apply5 = (ctx) => {
    if (lineWidth)
      ctx.lineWidth = lineWidth;
    if (lineJoin)
      ctx.lineJoin = lineJoin;
    if (lineCap)
      ctx.lineCap = lineCap;
  };
  return apply5;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0)
    stk = stack();
  const push2 = (...ops) => {
    if (stk === void 0)
      stk = stack();
    const s = stk.push(...ops);
    ops.forEach((o) => o(ctx));
    return drawingStack(ctx, s);
  };
  const pop2 = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply5 = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    stk.forEach((op) => op(ctx));
    return drawingStack(ctx, stk);
  };
  return { push: push2, pop: pop2, apply: apply5 };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((p, index) => {
    if (index + 2 >= points.length)
      return;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  });
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(circlesToDraw))
    circlesToDraw.forEach(draw2);
  else
    draw2(circlesToDraw);
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (e) => {
    ctx.beginPath();
    const rotation = e.rotation ?? 0;
    const startAngle = e.startAngle ?? 0;
    const endAngle = e.endAngle ?? PIPI;
    ctx.ellipse(e.x, e.y, e.radiusX, e.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(ellipsesToDraw))
    ellipsesToDraw.forEach(draw2);
  else
    draw2(ellipsesToDraw);
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path2) => {
    if (isQuadraticBezier(path2))
      quadraticBezier(ctx, path2, opts);
    else if (isLine(path2))
      line(ctx, path2, opts);
    else
      throw new Error(`Unknown path type ${JSON.stringify(path2)}`);
  };
  if (Array.isArray(pathsToDraw))
    pathsToDraw.forEach(draw2);
  else
    draw2(pathsToDraw);
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  array(pts);
  if (pts.length === 0)
    return;
  pts.forEach((pt, i) => guard(pt, `Index ${i}`));
  applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach((pt) => ctx.lineTo(pt.x, pt.y));
  if (shouldLoop)
    ctx.lineTo(pts[0].x, pts[0].y);
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0)
    return;
  pts.forEach((pt, i) => guard(pt, `Index ${i}`));
  applyOpts(ctx, opts);
  pts.forEach((pt, i) => {
    const label = labels !== void 0 && i < labels.length ? labels[i] : i.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  });
};
var translatePoint = (ctx, point3) => {
  const m = ctx.getTransform();
  return {
    x: point3.x * m.a + point3.y * m.c + m.e,
    y: point3.x * m.b + point3.y * m.d + m.f
  };
};
var copyToImg = (canvasEl) => {
  const img = document.createElement(`img`);
  img.src = canvasEl.toDataURL(`image/jpeg`);
  return img;
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0)
    opts = {};
  const radius = opts.radius ?? 10;
  applyOpts(ctx, opts);
  ctx.beginPath();
  if (Array.isArray(pos)) {
    pos.forEach((p) => {
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    });
  } else {
    const p = pos;
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
  }
  if (opts.filled || !opts.outlined)
    ctx.fill();
  if (opts.outlined)
    ctx.stroke();
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack2 = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    stack2.apply();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic: quadratic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack2 = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic2.x, quadratic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    connectedPoints(ctx, [a, quadratic2, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic2.x + 5, quadratic2.y);
    dot(ctx, quadratic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o);
  const draw2 = (d) => {
    const { a, b } = d;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a.x, a.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a, { radius: 5, strokeStyle: `black` });
      dot(ctx, b, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t4) => {
    connectedPoints(ctx, corners2(t4), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t4), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (d) => {
    if (opts.filled)
      ctx.fillRect(d.x, d.y, d.width, d.height);
    ctx.strokeRect(d.x, d.y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var textWidth = (ctx, text2, padding = 0, widthMultiple) => {
  if (text2 === void 0 || text2 === null || text2.length === 0)
    return 0;
  const m = ctx.measureText(text2);
  if (widthMultiple)
    return roundUpToMultiple(m.width, widthMultiple) + padding;
  return m.width + padding;
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((acc, val) => acc + val, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width)
    x = bounds.width - (maxWidth + anchorPadding);
  else
    x -= anchorPadding;
  if (x < bounds.x)
    x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height)
    y = bounds.height - (totalHeight + anchorPadding);
  else
    y -= anchorPadding;
  if (y < bounds.y)
    y = bounds.y + anchorPadding;
  lines.forEach((line3, i) => {
    ctx.fillText(line3, x, y);
    y += heights[i];
  });
};
var textBlockAligned = (ctx, text2, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  let lines;
  if (typeof text2 === `string`)
    lines = [text2];
  else
    lines = text2;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
  const totalHeight = heights.reduce((acc, val) => acc + val, 0);
  let y = 0;
  if (vert === `center`)
    y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  lines.forEach((line3, i) => {
    let x = 0;
    if (horiz === `center`)
      x = middleX - blocks[i].width / 2;
    else if (horiz === `right`)
      x = bounds.width - blocks[i].width;
    ctx.fillText(lines[i], x, y);
    y += heights[i];
  });
  ctx.restore();
};

// src/visual/Svg.ts
var Svg_exports = {};
__export(Svg_exports, {
  Elements: () => SvgElements_exports,
  applyOpts: () => applyOpts2,
  applyPathOpts: () => applyPathOpts,
  applyStrokeOpts: () => applyStrokeOpts,
  clear: () => clear2,
  createEl: () => createEl,
  createOrResolve: () => createOrResolve,
  getBounds: () => getBounds,
  makeHelper: () => makeHelper2,
  remove: () => remove,
  setBounds: () => setBounds
});

// src/visual/SvgMarkers.ts
var createMarker = (id, opts, childCreator) => {
  const m = createEl(`marker`, id);
  if (opts.markerWidth)
    m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
  if (opts.markerHeight)
    m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
  if (opts.orient)
    m.setAttribute(`orient`, opts.orient.toString());
  else
    m.setAttribute(`orient`, `auto-start-reverse`);
  if (opts.viewBox)
    m.setAttribute(`viewBox`, opts.viewBox.toString());
  if (opts.refX)
    m.setAttribute(`refX`, opts.refX.toString());
  if (opts.refY)
    m.setAttribute(`refY`, opts.refY.toString());
  if (childCreator) {
    const c = childCreator();
    m.appendChild(c);
  }
  return m;
};
var markerPrebuilt = (elem, opts, _context) => {
  if (elem === null)
    return `(elem null)`;
  const parent = elem.ownerSVGElement;
  if (parent === null)
    throw new Error(`parent for elem is null`);
  const defsEl = createOrResolve(parent, `defs`, `defs`);
  let defEl = defsEl.querySelector(`#${opts.id}`);
  if (defEl !== null) {
    return `url(#${opts.id})`;
  }
  if (opts.id === `triangle`) {
    opts = { ...opts, strokeStyle: `transparent` };
    if (!opts.markerHeight)
      opts = { ...opts, markerHeight: 6 };
    if (!opts.markerWidth)
      opts = { ...opts, markerWidth: 6 };
    if (!opts.refX)
      opts = { ...opts, refX: opts.markerWidth };
    if (!opts.refY)
      opts = { ...opts, refY: opts.markerHeight };
    if (!opts.fillStyle || opts.fillStyle === `none`)
      opts = { ...opts, fillStyle: `black` };
    if (!opts.viewBox)
      opts = { ...opts, viewBox: `0 0 10 10` };
    defEl = createMarker(opts.id, opts, () => {
      const tri = createEl(`path`);
      tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
      if (opts)
        applyOpts2(tri, opts);
      return tri;
    });
  } else
    throw new Error(`Do not know how to make ${opts.id}`);
  defEl.id = opts.id;
  defsEl.appendChild(defEl);
  return `url(#${opts.id})`;
};

// src/visual/SvgElements.ts
var SvgElements_exports = {};
__export(SvgElements_exports, {
  circle: () => circle2,
  circleUpdate: () => circleUpdate,
  grid: () => grid,
  group: () => group,
  groupUpdate: () => groupUpdate,
  line: () => line2,
  lineUpdate: () => lineUpdate,
  path: () => path,
  pathUpdate: () => pathUpdate,
  text: () => text,
  textPath: () => textPath,
  textPathUpdate: () => textPathUpdate,
  textUpdate: () => textUpdate
});
var numOrPercentage = (v) => {
  if (v >= 0 && v <= 1)
    return v * 100 + `%`;
  return v.toString();
};
var path = (svgOrArray, parent, opts, queryOrExisting) => {
  const elem = createOrResolve(parent, `path`, queryOrExisting);
  const svg = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`
`);
  elem.setAttributeNS(null, `d`, svg);
  parent.appendChild(elem);
  return pathUpdate(elem, opts);
};
var pathUpdate = (elem, opts) => {
  if (opts)
    applyOpts2(elem, opts);
  if (opts)
    applyStrokeOpts(elem, opts);
  return elem;
};
var circleUpdate = (elem, circle3, opts) => {
  elem.setAttributeNS(null, `cx`, circle3.x.toString());
  elem.setAttributeNS(null, `cy`, circle3.y.toString());
  elem.setAttributeNS(null, `r`, circle3.radius.toString());
  if (opts)
    applyOpts2(elem, opts);
  if (opts)
    applyStrokeOpts(elem, opts);
  return elem;
};
var circle2 = (circle3, parent, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `circle`, queryOrExisting);
  return circleUpdate(p, circle3, opts);
};
var group = (children, parent, queryOrExisting) => {
  const p = createOrResolve(parent, `g`, queryOrExisting);
  return groupUpdate(p, children);
};
var groupUpdate = (elem, children) => {
  for (const c of children) {
    if (c.parentNode !== elem) {
      elem.appendChild(c);
    }
  }
  return elem;
};
var line2 = (line3, parent, opts, queryOrExisting) => {
  const lineEl = createOrResolve(parent, `line`, queryOrExisting);
  return lineUpdate(lineEl, line3, opts);
};
var lineUpdate = (lineEl, line3, opts) => {
  lineEl.setAttributeNS(null, `x1`, line3.a.x.toString());
  lineEl.setAttributeNS(null, `y1`, line3.a.y.toString());
  lineEl.setAttributeNS(null, `x2`, line3.b.x.toString());
  lineEl.setAttributeNS(null, `y2`, line3.b.y.toString());
  if (opts)
    applyOpts2(lineEl, opts);
  if (opts)
    applyPathOpts(lineEl, opts);
  if (opts)
    applyStrokeOpts(lineEl, opts);
  return lineEl;
};
var textPathUpdate = (el, text2, opts) => {
  if (opts?.method)
    el.setAttributeNS(null, `method`, opts.method);
  if (opts?.side)
    el.setAttributeNS(null, `side`, opts.side);
  if (opts?.spacing)
    el.setAttributeNS(null, `spacing`, opts.spacing);
  if (opts?.startOffset) {
    el.setAttributeNS(null, `startOffset`, numOrPercentage(opts.startOffset));
  }
  if (opts?.textLength)
    el.setAttributeNS(null, `textLength`, numOrPercentage(opts.textLength));
  if (text2) {
    el.textContent = text2;
  }
  if (opts)
    applyOpts2(el, opts);
  if (opts)
    applyStrokeOpts(el, opts);
  return el;
};
var textPath = (pathRef, text2, parent, opts, queryOrExisting) => {
  const textEl = createOrResolve(parent, `text`, queryOrExisting + `-text`);
  textUpdate(textEl, void 0, void 0, opts);
  const p = createOrResolve(textEl, `textPath`, queryOrExisting);
  p.setAttributeNS(null, `href`, pathRef);
  return textPathUpdate(p, text2, opts);
};
var textUpdate = (el, pos, text2, opts) => {
  if (pos) {
    el.setAttributeNS(null, `x`, pos.x.toString());
    el.setAttributeNS(null, `y`, pos.y.toString());
  }
  if (text2) {
    el.textContent = text2;
  }
  if (opts) {
    applyOpts2(el, opts);
    if (opts)
      applyStrokeOpts(el, opts);
    if (opts.anchor)
      el.setAttributeNS(null, `text-anchor`, opts.anchor);
    if (opts.align)
      el.setAttributeNS(null, `alignment-baseline`, opts.align);
    const userSelect = opts.userSelect ?? true;
    if (!userSelect) {
      el.style.userSelect = `none`;
      el.style.webkitUserSelect = `none`;
    }
  }
  return el;
};
var text = (text2, parent, pos, opts, queryOrExisting) => {
  const p = createOrResolve(parent, `text`, queryOrExisting);
  return textUpdate(p, pos, text2, opts);
};
var grid = (parent, center4, spacing, width, height4, opts = {}) => {
  if (!opts.strokeStyle)
    opts = { ...opts, strokeStyle: getCssVariable(`bg-dim`, `silver`) };
  if (!opts.strokeWidth)
    opts = { ...opts, strokeWidth: 1 };
  const g = createEl(`g`);
  applyOpts2(g, opts);
  applyPathOpts(g, opts);
  applyStrokeOpts(g, opts);
  let y = 0;
  while (y < height4) {
    const horiz = fromNumbers(0, y, width, y);
    line2(horiz, g);
    y += spacing;
  }
  let x = 0;
  while (x < width) {
    const vert = fromNumbers(x, 0, x, height4);
    line2(vert, g);
    x += spacing;
  }
  parent.appendChild(g);
  return g;
};

// src/visual/Svg.ts
var createOrResolve = (parent, type, queryOrExisting) => {
  let existing = null;
  if (queryOrExisting !== void 0) {
    if (typeof queryOrExisting === `string`)
      existing = parent.querySelector(queryOrExisting);
    else
      existing = queryOrExisting;
  }
  if (existing === null) {
    const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
    parent.appendChild(p);
    if (queryOrExisting && typeof queryOrExisting === `string`) {
      if (queryOrExisting.startsWith(`#`))
        p.id = queryOrExisting.substring(1);
    }
    return p;
  }
  return existing;
};
var remove = (parent, queryOrExisting) => {
  if (typeof queryOrExisting === `string`) {
    const e = parent.querySelector(queryOrExisting);
    if (e === null)
      return;
    e.remove();
  } else {
    queryOrExisting.remove();
  }
};
var clear2 = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    parent.removeChild(c);
    c = parent.lastElementChild;
  }
};
var createEl = (type, id) => {
  const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
  if (id) {
    m.id = id;
  }
  return m;
};
var applyPathOpts = (elem, opts) => {
  if (opts.markerEnd)
    elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerEnd, opts));
  if (opts.markerStart)
    elem.setAttribute(`marker-start`, markerPrebuilt(elem, opts.markerStart, opts));
  if (opts.markerMid)
    elem.setAttribute(`marker-mid`, markerPrebuilt(elem, opts.markerMid, opts));
};
var applyOpts2 = (elem, opts) => {
  if (opts.fillStyle)
    elem.setAttributeNS(null, `fill`, opts.fillStyle);
  if (opts.opacity)
    elem.setAttributeNS(null, `opacity`, opts.opacity.toString());
};
var applyStrokeOpts = (elem, opts) => {
  if (opts.strokeStyle)
    elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
  if (opts.strokeWidth)
    elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
  if (opts.strokeDash)
    elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
  if (opts.strokeLineCap)
    elem.setAttribute(`stroke-linecap`, opts.strokeLineCap);
};
var getBounds = (svg) => {
  const w = svg.getAttributeNS(null, `width`);
  const width = w === null ? 0 : parseFloat(w);
  const h = svg.getAttributeNS(null, `height`);
  const height4 = h === null ? 0 : parseFloat(h);
  return { width, height: height4 };
};
var setBounds = (svg, bounds) => {
  svg.setAttributeNS(null, `width`, bounds.width.toString());
  svg.setAttributeNS(null, `height`, bounds.height.toString());
};
var makeHelper2 = (parent, parentOpts) => {
  if (parentOpts) {
    applyOpts2(parent, parentOpts);
    applyStrokeOpts(parent, parentOpts);
  }
  const o = {
    remove: (queryOrExisting) => remove(parent, queryOrExisting),
    text: (text2, pos, opts, queryOrExisting) => text(text2, parent, pos, opts, queryOrExisting),
    textPath: (pathRef, text2, opts, queryOrExisting) => textPath(pathRef, text2, parent, opts, queryOrExisting),
    line: (line3, opts, queryOrExisting) => line2(line3, parent, opts, queryOrExisting),
    circle: (circle3, opts, queryOrExisting) => circle2(circle3, parent, opts, queryOrExisting),
    path: (svgStr, opts, queryOrExisting) => path(svgStr, parent, opts, queryOrExisting),
    grid: (center4, spacing, width, height4, opts) => grid(parent, center4, spacing, width, height4, opts),
    query: (selectors) => parent.querySelector(selectors),
    get width() {
      const w = parent.getAttributeNS(null, `width`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set width(width) {
      parent.setAttributeNS(null, `width`, width.toString());
    },
    get parent() {
      return parent;
    },
    get height() {
      const w = parent.getAttributeNS(null, `height`);
      if (w === null)
        return 0;
      return parseFloat(w);
    },
    set height(height4) {
      parent.setAttributeNS(null, `height`, height4.toString());
    },
    clear: () => {
      while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  };
  return o;
};

// src/visual/Plot.ts
var Plot_exports = {};
__export(Plot_exports, {
  add: () => add2,
  calcScale: () => calcScale,
  defaultAxis: () => defaultAxis,
  draw: () => draw,
  drawValue: () => drawValue,
  plot: () => plot
});
var piPi7 = Math.PI * 2;
var defaultAxis = (name) => ({
  endWith: `none`,
  lineWidth: 1,
  namePosition: "none",
  name,
  showLabels: name === `y`,
  showLine: true,
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const seriesNames = buffer.keys();
  const scales = [];
  seriesNames.forEach((s) => {
    const series = buffer.get(s);
    if (series === void 0)
      return;
    let { min: min4, max: max4 } = minMaxAvg(series);
    let range = max4 - min4;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      if (drawingOpts.defaultSeriesVariable)
        colour = Colour_exports.getCssVariable(`accent`, drawingOpts.defaultSeriesColour);
      else
        colour = drawingOpts.defaultSeriesColour;
    }
    if (range === 0) {
      range = min4;
      min4 = min4 - range / 2;
      max4 = max4 + range / 2;
    }
    scales.push({
      min: min4,
      max: max4,
      range,
      name: s,
      colour
    });
  });
  return scales;
};
var add2 = (buffer, value, series = "") => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c);
  drawing = {
    ...drawing,
    highlightIndex: index,
    leadingEdgeDot: true,
    translucentPlot: false,
    style: `none`,
    clearCanvas: false
  };
  draw(buffer, drawing);
};
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({ ...s, range: range[1] - range[0], min: range[0], max: range[1] }));
var draw = (buffer, drawing) => {
  const { x: xAxis, y: yAxis, ctx, canvasSize } = drawing;
  const margin = drawing.margin;
  const series = drawing.y.scaleRange ? scaleWithFixedRange(buffer, drawing.y.scaleRange, drawing) : calcScale(buffer, drawing, drawing.seriesColours);
  if (drawing.clearCanvas)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (drawing.debug) {
    ctx.strokeStyle = `orange`;
    ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
  }
  ctx.translate(margin, margin);
  const plotSize = drawing.plotSize ?? plotSizeFromBounds(canvasSize, drawing);
  const axisSize = { height: plotSize.height + margin + margin, width: plotSize.width };
  if (yAxis.showLabels || yAxis.showLine) {
    series.forEach((s) => {
      if (yAxis.allowedSeries !== void 0) {
        if (!yAxis.allowedSeries.includes(s.name))
          return;
      }
      drawYSeriesScale(s, axisSize, drawing);
    });
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(plotSize.width, calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth, drawing);
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  const ptr = Drawing_exports.translatePoint(ctx, drawing.pointer);
  series.forEach((s) => {
    const data = buffer.getSource(s.name);
    if (data === void 0)
      return;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  });
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    const legendSize = { width: plotSize.width, height: drawing.x.textSize + margin + margin };
    drawLegend(series, drawing, legendSize);
    ctx.restore();
  }
  ctx.resetTransform();
};
var drawYSeriesScale = (series, plotSize, drawing) => {
  const { ctx, y, digitsPrecision, margin } = drawing;
  const { height: height4 } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y.textSize, height4 + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y.colour)
    ctx.fillStyle = y.colour;
  const min4 = y.labelRange ? y.labelRange[0] : series.min;
  const max4 = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max4 - min4 : series.range;
  const mid = min4 + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(min4.toFixed(digitsPrecision), 0, calcYForValue(min4, series, height4) - halfHeight);
  ctx.fillText(mid.toFixed(digitsPrecision), 0, calcYForValue(mid, series, height4) - halfHeight);
  ctx.fillText(max4.toFixed(digitsPrecision), 0, calcYForValue(max4, series, height4) - margin);
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0)
    throw new Error(`series undefined`);
  const { ctx, y } = drawing;
  const { height: height4 } = plotSize;
  const min4 = y.labelRange ? y.labelRange[0] : series.min;
  const max4 = y.labelRange ? y.labelRange[1] : series.max;
  const minPos = calcYForValue(min4, series, height4);
  const maxPos = calcYForValue(max4, series, height4);
  ctx.translate(y.lineWidth, 0);
  ctx.lineWidth = y.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y.colour)
    ctx.strokeStyle = y.colour;
  ctx.stroke();
  ctx.translate(y.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  series.forEach((s) => {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += " " + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  });
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine)
    return;
  if (x.colour)
    ctx.strokeStyle = x.colour;
  ctx.lineWidth = x.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(width, yPos);
  ctx.stroke();
};
var drawSeriesData = (series, values, plotSize, drawing, leadingEdgeIndex) => {
  const { ctx, lineWidth, translucentPlot = false, margin, x: xAxis } = drawing;
  const style = drawing.style ?? `connected`;
  const height4 = plotSize.height - margin;
  let dataXScale = 1;
  if (xAxis.scaleRange) {
    const xAxisRange = xAxis.scaleRange[1] - xAxis.scaleRange[0];
    dataXScale = plotSize.width / xAxisRange;
  } else {
    if (drawing.capacity === 0)
      dataXScale = plotSize.width / values.length;
    else
      dataXScale = plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot)
      return Colour_exports.opacity(c, 0.2);
    return c;
  };
  if (style === `dots`) {
    ctx.fillStyle = colourTransform(series.colour);
  } else if (style === `none`) {
  } else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colourTransform(series.colour);
  }
  for (let i = 0; i < values.length; i += incrementBy) {
    let y = calcYForValue(values[i], series, height4) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi7);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (i == 0)
        ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (i === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[i];
    }
    x += dataXScale;
  }
  if (style === `connected`) {
    ctx.stroke();
  }
  if (leadingEdge !== void 0 && drawing.leadingEdgeDot) {
    ctx.beginPath();
    ctx.fillStyle = colourTransform(series.colour);
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var calcYForValue = (v, series, height4) => (1 - (v - series.min) / series.range) * height4;
var calcSizing = (margin, x, y, showLegend) => {
  let fromLeft = margin;
  if (y.showLabels)
    fromLeft += y.textSize;
  if (y.showLine)
    fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine)
    fromLeft += margin + margin;
  let fromRight = margin;
  let fromTop = margin + margin;
  let fromBottom = margin + margin;
  if (x.showLabels)
    fromBottom += x.textSize;
  else
    fromBottom += margin;
  if (x.showLine)
    fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine)
    fromBottom += margin;
  if (showLegend)
    fromBottom += x.textSize;
  return {
    left: fromLeft,
    right: fromRight,
    top: fromTop,
    bottom: fromBottom
  };
};
var plotSizeFromBounds = (bounds, opts) => {
  const { width, height: height4 } = bounds;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width - sizing.left - sizing.right,
    height: height4 - sizing.top - sizing.bottom
  };
};
var canvasSizeFromPlot = (plot2, opts) => {
  const { width, height: height4 } = plot2;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width + sizing.left + sizing.right,
    height: height4 + sizing.top + sizing.bottom
  };
};
var plot = (parentElOrQuery, opts) => {
  if (parentElOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  let plotSize = opts.plotSize;
  let canvasSize;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  } else {
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
    plotSize = opts.plotSize;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  }
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (evt) => {
    pointer.x = evt.offsetX;
    pointer.y = evt.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? mapCircularMutable({ capacity }) : mapArray();
  const metrics = ctx.measureText("Xy");
  const coalesce = opts.coalesce ?? true;
  if (ctx === null)
    throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x)
    xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y)
    yAxis = { ...yAxis, ...opts.y };
  let drawingOpts = {
    ...opts,
    y: yAxis,
    x: xAxis,
    pointer,
    capacity,
    coalesce,
    plotSize,
    canvasSize,
    ctx,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    style: opts.style ?? `connected`,
    defaultSeriesColour: opts.defaultSeriesColour ?? `yellow`,
    margin: 3,
    clearCanvas: true,
    leadingEdgeDot: true,
    debug: opts.debug ?? false,
    digitsPrecision: opts.digitsPrecision ?? 2,
    lineWidth: opts.lineWidth ?? 2,
    showLegend: opts.showLegend ?? false
  };
  if (plotSize) {
    const canvasSize2 = canvasSizeFromPlot(plotSize, drawingOpts);
    canvasEl.width = canvasSize2.width;
    canvasEl.height = canvasSize2.height;
    drawingOpts.canvasSize = canvasSize2;
  }
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = {
        ...drawingOpts,
        plotSize: plotSizeFromBounds(bounds, drawingOpts),
        canvasSize: bounds
      };
      draw(buffer, drawingOpts);
    });
  }
  return {
    drawValue: (index) => {
      drawValue(index, buffer, drawingOpts);
    },
    dispose: () => {
      canvasEl.removeEventListener(`pointermove`, onPointerMove);
      if (destroyCanvasEl)
        canvasEl.remove();
    },
    add: (value, series = "", skipDrawing = false) => {
      add2(buffer, value, series);
      if (skipDrawing)
        return;
      draw(buffer, drawingOpts);
    },
    draw: () => {
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
  };
};

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  AxisX: () => AxisX,
  AxisY: () => AxisY,
  Legend: () => Legend,
  Plot: () => Plot,
  PlotArea: () => PlotArea,
  Series: () => Series
});

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasMeasureState: () => CanvasMeasureState,
  MeasureState: () => MeasureState
});
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0)
    return true;
  if (a === void 0)
    return false;
  if (b === void 0)
    return false;
  if (a.x && b.x) {
    if (!unitIsEqual(a.x, b.x))
      return false;
  }
  if (a.y && b.y) {
    if (!unitIsEqual(a.y, b.y))
      return false;
  }
  if (a.width && b.width) {
    if (!unitIsEqual(a.width, b.width))
      return false;
  }
  if (a.height && b.height) {
    if (!unitIsEqual(a.height, b.height))
      return false;
  }
  return true;
};
var MeasureState = class {
  constructor(bounds) {
    __publicField(this, "bounds");
    __publicField(this, "pass");
    __publicField(this, "measurements");
    this.bounds = bounds;
    this.pass = 0;
    this.measurements = /* @__PURE__ */ new Map();
  }
  getSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0)
      return;
    if (isPlaceholder3(s.size))
      return;
    return s.size;
  }
  resolveToPx(u, defaultValue) {
    if (u === void 0)
      return defaultValue;
    if (u.type === `px`)
      return u.value;
    throw new Error(`Unknown unit type ${u.type}`);
  }
};
var Box = class {
  constructor(parent, id) {
    __publicField(this, "visual", placeholderPositioned);
    __publicField(this, "_desiredSize");
    __publicField(this, "_lastMeasure");
    __publicField(this, "children", []);
    __publicField(this, "_parent");
    __publicField(this, "_idMap", /* @__PURE__ */ new Map());
    __publicField(this, "debugLayout", false);
    __publicField(this, "_visible", true);
    __publicField(this, "_ready", true);
    __publicField(this, "takesSpaceWhenInvisible", false);
    __publicField(this, "needsDrawing", true);
    __publicField(this, "_needsLayout", true);
    __publicField(this, "debugHue", randomHue());
    __publicField(this, "id");
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  hasChild(box) {
    const byRef = this.children.find((c) => c === box);
    const byId = this.children.find((c) => c.id === box.id);
    return byRef !== void 0 || byId !== void 0;
  }
  notify(msg, source) {
    this.onNotify(msg, source);
    this.children.forEach((c) => c.notify(msg, source));
  }
  onNotify(msg, source) {
  }
  onChildAdded(child) {
    if (child.hasChild(this))
      throw new Error(`Recursive`);
    if (child === this)
      throw new Error(`Cannot add self as child`);
    if (this.hasChild(child))
      throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
  }
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      this.children.forEach((c) => c.setReady(ready, includeChildren));
    }
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    if (this._visible === v)
      return;
    this._visible = v;
    this.onLayoutNeeded();
  }
  get desiredSize() {
    return this._desiredSize;
  }
  set desiredSize(v) {
    if (boxRectIsEqual(v, this._desiredSize))
      return;
    this._desiredSize = v;
    this.onLayoutNeeded();
  }
  onLayoutNeeded() {
    this.notifyChildLayoutNeeded();
  }
  notifyChildLayoutNeeded() {
    this._needsLayout = true;
    this.needsDrawing = true;
    if (this._parent !== void 0) {
      this._parent.notifyChildLayoutNeeded();
    } else {
      this.update();
    }
  }
  get root() {
    if (this._parent === void 0)
      return this;
    return this._parent.root;
  }
  measurePreflight() {
  }
  measureApply(m, force) {
    let different = true;
    this._needsLayout = false;
    if (isEqual6(m.size, this.visual))
      different = false;
    if (isPositioned3(m.size)) {
      this.visual = m.size;
    } else {
      this.visual = {
        x: 0,
        y: 0,
        width: m.size.width,
        height: m.size.height
      };
    }
    m.children.forEach((c) => {
      if (c !== void 0)
        c.ref.measureApply(c, force);
    });
    if (different || force) {
      this.needsDrawing = true;
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  debugLog(m) {
    console.log(this.id, m);
  }
  measureStart(opts, force, parent) {
    this.measurePreflight();
    let m = {
      ref: this,
      size: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.size = emptyPositioned;
    } else {
      let size = this._lastMeasure;
      if (this._needsLayout || this._lastMeasure === void 0) {
        size = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (size === void 0)
        return;
      m.size = size;
      this._lastMeasure = size;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (Arrays_exports.without(m.children, void 0).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  measureSelf(opts, parent) {
    let size = placeholderPositioned;
    if (parent) {
      if (parent.size) {
        size = {
          x: 0,
          y: 0,
          width: parent.size.width,
          height: parent.size.height
        };
      }
    } else {
      size = {
        x: 0,
        y: 0,
        width: opts.bounds.width,
        height: opts.bounds.height
      };
    }
    if (isPlaceholder3(size))
      return;
    return size;
  }
  updateDone(state, force) {
    this.onUpdateDone(state, force);
    this.children.forEach((c) => c.updateDone(state, force));
  }
  update(force = false) {
    const state = this.updateBegin(force);
    let attempts = 5;
    let applied = false;
    while (attempts--) {
      const m = this.measureStart(state, force);
      if (m !== void 0) {
        this.measureApply(m, force);
        if (!this._ready)
          return;
        applied = true;
      }
    }
    this.updateDone(state, force);
    if (!applied)
      console.warn(`Ran out of measurement attempts`);
  }
};
var CanvasMeasureState = class extends MeasureState {
  constructor(bounds, ctx) {
    super(bounds);
    __publicField(this, "ctx");
    this.ctx = ctx;
  }
};
var CanvasBox = class extends Box {
  constructor(parent, canvasEl, id) {
    super(parent, id);
    __publicField(this, "canvasEl");
    if (canvasEl === void 0)
      throw new Error(`canvasEl undefined`);
    if (canvasEl === null)
      throw new Error(`canvasEl null`);
    this.canvasEl = canvasEl;
    if (parent === void 0)
      this.designateRoot();
  }
  designateRoot() {
    this.canvasEl.addEventListener(`pointermove`, (evt) => {
      const p = { x: evt.offsetX, y: evt.offsetY };
      this.notifyPointerMove(p);
    });
    this.canvasEl.addEventListener(`pointerleave`, (evt) => {
      this.notifyPointerLeave();
    });
    this.canvasEl.addEventListener(`click`, (evt) => {
      const p = { x: evt.offsetX, y: evt.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(p) {
  }
  notifyClick(p) {
    if (isPlaceholder3(this.visual))
      return;
    if (intersectsPoint(this.visual, p)) {
      const pp = Point_exports.subtract(p, this.visual.x, this.visual.y);
      this.onClick(pp);
      this.children.forEach((c) => c.notifyClick(pp));
    }
  }
  notifyPointerLeave() {
    this.onPointerLeave();
    this.children.forEach((c) => c.notifyPointerLeave());
  }
  notifyPointerMove(p) {
    if (isPlaceholder3(this.visual))
      return;
    if (intersectsPoint(this.visual, p)) {
      const pp = Point_exports.subtract(p, this.visual.x, this.visual.y);
      this.onPointerMove(pp);
      this.children.forEach((c) => c.notifyPointerMove(pp));
    }
  }
  onPointerLeave() {
  }
  onPointerMove(p) {
  }
  updateBegin() {
    const ctx = this.canvasEl.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Context unavailable`);
    const s = this.canvasEl.getBoundingClientRect();
    return new CanvasMeasureState({
      width: s.width,
      height: s.height
    }, ctx);
  }
  onUpdateDone(state, force) {
    if (!this.needsDrawing && !force)
      return;
    const ctx = this.canvasEl.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Context unavailable`);
    ctx.save();
    ctx.translate(this.visual.x, this.visual.y);
    const v = this.visual;
    if (this.debugLayout) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
      ctx.strokeRect(0, 0, v.width, v.height);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillText(this.id, 10, 10, v.width);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(v.width, v.height);
      ctx.stroke();
    }
    this.drawSelf(ctx);
    this.needsDrawing = false;
    ctx.restore();
  }
  drawSelf(ctx) {
  }
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  constructor(series) {
    __publicField(this, "data");
    __publicField(this, "series");
    __publicField(this, "dirty", false);
    __publicField(this, "type", `array`);
    __publicField(this, "_range");
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
    this._range = void 0;
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0)
      return this._range;
    this.dirty = false;
    this._range = Arrays_exports.minMaxAvg(this.data);
    return { ...this._range, changed: true };
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  constructor(series) {
    super(series);
    __publicField(this, "desiredDataPointMinWidth", 5);
  }
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else
      super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    __publicField(this, "name");
    __publicField(this, "colour");
    __publicField(this, "source");
    __publicField(this, "drawingStyle");
    __publicField(this, "width", 3);
    __publicField(this, "dataHitPoint");
    __publicField(this, "tooltip");
    __publicField(this, "precision", 2);
    __publicField(this, "axisRange");
    __publicField(this, "lastPxPerPt", -1);
    __publicField(this, "_visualRange");
    __publicField(this, "_visualRangeStretch");
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this.axisRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRange = { ...this.axisRange };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else
      throw new Error(`Unknown sourceType. Expected array|stream`);
  }
  formatValue(v) {
    return v.toFixed(this.precision);
  }
  get visualRange() {
    let vr = this._visualRange;
    const sourceRange = this.source.range;
    let changed = false;
    if (sourceRange.changed) {
      if (this._visualRangeStretch) {
        const rmin = Math.min(ifNaN(vr.min, sourceRange.min), sourceRange.min);
        const rmax = Math.max(ifNaN(vr.max, sourceRange.max), sourceRange.max);
        if (rmin !== vr.min || rmax !== vr.max) {
          vr = { min: rmin, max: rmax };
          changed = true;
        }
      } else {
        if (!isRangeEqual(sourceRange, vr)) {
          vr = sourceRange;
          changed = true;
        }
      }
    }
    this._visualRange = vr;
    return { ...vr, changed };
  }
  scaleValue(value) {
    if (this.source === void 0)
      return value;
    const r = this.visualRange;
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    number(value, ``, `value`);
    this.source.add(value);
    this.plot.plotArea.needsDrawing = true;
  }
  clear() {
    this.source.clear();
    this._visualRange = { ...this.axisRange };
    this.plot.plotArea.needsDrawing = true;
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `PlotArea`);
    this.plot = plot2;
    __publicField(this, "paddingPx", 3);
    __publicField(this, "piPi", Math.PI * 2);
    __publicField(this, "pointerDistanceThreshold", 20);
    __publicField(this, "lastRangeChange", 0);
    __publicField(this, "pointer");
  }
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, parent) {
    const axisY = opts.getSize(`AxisY`);
    if (axisY === void 0)
      return;
    const legend = opts.getSize(`Legend`);
    if (legend === void 0)
      return;
    const axisX = opts.getSize(`AxisX`);
    if (axisX === void 0)
      return;
    return {
      x: axisY.width,
      y: 0,
      width: opts.bounds.width - axisY.width,
      height: opts.bounds.height - legend.height - axisX.height
    };
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this.plot.axisY)
      this._needsLayout = true;
    if (msg === `measureApplied` && source === this.plot.legend)
      this._needsLayout = true;
  }
  onPointerLeave() {
    const series = [...this.plot.series.values()];
    series.forEach((series2) => {
      series2.tooltip = void 0;
    });
    this.pointer = void 0;
    this.plot.legend.onLayoutNeeded();
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.onLayoutNeeded();
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0)
      return;
    const series = [...this.plot.series.values()];
    series.forEach((series2) => {
      if (p === void 0) {
        series2.tooltip = void 0;
        return;
      }
      if (series2.dataHitPoint === void 0)
        return;
      const v = series2.dataHitPoint(p);
      if (v[0] === void 0)
        return;
      if (v[1] > this.pointerDistanceThreshold)
        return;
      series2.tooltip = series2.formatValue(v[0].value);
    });
    this.plot.legend.needsDrawing = true;
  }
  drawSelf(ctx) {
    if (this.plot.frozen)
      return;
    const series = this.plot.seriesArray();
    ctx.clearRect(0, 0, this.visual.width, this.visual.height);
    series.forEach((series2) => {
      if (series2.source.type === `array` || series2.source.type === `stream`) {
        const arraySeries = series2.source;
        if (arraySeries.data === void 0)
          return;
        const d = [...arraySeries.data];
        this.drawDataSet(series2, d, ctx);
      } else
        console.warn(`Unknown data source type ${series2.source.type}`);
    });
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.visual.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = Rect_exports.subtract(this.visual, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => Point_exports.distanceToExterior(pt, v2));
      const i = minIndex(...distances);
      const closest = shapes[i];
      if (closest === void 0)
        [void 0, 0];
      return [closest, distances[i]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let i = 0; i < d.length; i++) {
        const scaled = clamp(series.scaleValue(d[i]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index: i, value: d[i] });
        if (i == 0)
          ctx.moveTo(x + pxPerPt / 2, y);
        else
          ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.visual.height)
          console.warn(y + " h: " + this.visual.height);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let i = 0; i < d.length; i++) {
        const scaled = series.scaleValue(d[i]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index: i, value: d[i] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let i = 0; i < d.length; i++) {
        const scaled = series.scaleValue(d[i]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index: i,
          value: d[i]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `Legend`);
    this.plot = plot2;
    __publicField(this, "sampleSize", { width: 10, height: 10 });
    __publicField(this, "padding", 3);
    __publicField(this, "widthSnapping", 20);
  }
  clear() {
  }
  measureSelf(opts, parent) {
    const yAxis = opts.measurements.get(`AxisY`);
    const sample2 = this.sampleSize;
    const widthSnapping = this.widthSnapping;
    const padding = this.padding;
    const ctx = opts.ctx;
    if (yAxis === void 0)
      return;
    const usableWidth = opts.bounds.width - yAxis.size.width;
    const series = this.plot.seriesArray();
    let width = padding;
    for (let i = 0; i < series.length; i++) {
      width += sample2.width + padding;
      width += textWidth(ctx, series[i].name, padding, widthSnapping);
      width += textWidth(ctx, series[i].tooltip, padding, widthSnapping);
    }
    const rows2 = Math.max(1, Math.ceil(width / usableWidth));
    const h = rows2 * (this.sampleSize.height + this.padding + this.padding);
    return {
      x: yAxis.size.width,
      y: opts.bounds.height - h,
      width: usableWidth,
      height: h
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample2 = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    let x = padding;
    let y = padding;
    ctx.clearRect(0, 0, this.visual.width, this.visual.height);
    for (let i = 0; i < series.length; i++) {
      const s = series[i];
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, y, sample2.width, sample2.height);
      x += sample2.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillText(s.name, x, y + sample2.height / 2);
      x += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.axisColour;
        ctx.fillText(s.tooltip, x, y + sample2.height / 2);
        x += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      x += padding;
      if (x > this.visual.width - 100) {
        x = padding;
        y += sample2.height + padding + padding;
      }
    }
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this._parent.axisY)
      this._needsLayout = true;
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `AxisX`);
    this.plot = plot2;
    __publicField(this, "paddingPx", 2);
    __publicField(this, "colour");
  }
  clear() {
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this.plot.axisY)
      this._needsLayout = true;
    if (msg === `measureApplied` && source === this.plot.legend) {
      this.onLayoutNeeded();
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.visual;
    const width = plot2.axisWidth;
    const colour = this.colour ?? plot2.axisColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(0, width / 2);
    ctx.lineTo(v.width, width / 2);
    ctx.stroke();
  }
  measureSelf(opts, parent) {
    const plot2 = this.plot;
    const yAxis = opts.measurements.get(`AxisY`);
    if (yAxis === void 0)
      return;
    const legend = opts.measurements.get(`Legend`);
    if (legend === void 0)
      return;
    const h = plot2.axisWidth + this.paddingPx;
    return {
      x: yAxis.size.width,
      y: opts.bounds.height - h - legend.size.height,
      width: opts.bounds.width - yAxis.size.width,
      height: h
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `AxisY`);
    this.plot = plot2;
    __publicField(this, "_maxDigits", 1);
    __publicField(this, "seriesToShow");
    __publicField(this, "paddingPx", 2);
    __publicField(this, "colour");
    __publicField(this, "lastRange");
    __publicField(this, "lastPlotAreaHeight", 0);
    this.lastRange = { min: 0, max: 0 };
  }
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
    const series = this.getSeries();
    if (series !== void 0 && !isRangeEqual(series.visualRange, this.lastRange)) {
      this._needsLayout = true;
      this.needsDrawing = true;
    }
  }
  onNotify(msg, source) {
    const pa = this.plot.plotArea;
    if (msg === `measureApplied` && source === pa) {
      if (pa.visual.height !== this.lastPlotAreaHeight) {
        this.lastPlotAreaHeight = pa.visual.height;
        this.needsDrawing = true;
      }
    }
  }
  measureSelf(opts) {
    const copts = opts;
    const paddingPx = this.paddingPx;
    let width = this.plot.axisWidth + paddingPx;
    const series = this.getSeries();
    if (series !== void 0) {
      const r = series.visualRange;
      this._maxDigits = Math.ceil(r.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w = opts.resolveToPx(this.desiredSize?.width, width);
    return {
      x: 0,
      y: 0,
      width: w,
      height: opts.bounds.height
    };
  }
  drawSelf(ctx) {
    const s = this.getSeries();
    if (s !== void 0)
      this.seriesAxis(s, ctx);
    else {
      if (this.seriesToShow === void 0)
        return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    }
  }
  getSeries() {
    if (this.seriesToShow === void 0) {
      return this.plot.seriesArray()[0];
    } else {
      return this.plot.series.get(this.seriesToShow);
    }
  }
  seriesAxis(series, ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.visual;
    const paddingPx = this.paddingPx;
    const r = series.visualRange;
    const width = plot2.axisWidth;
    const colour = this.colour ?? plot2.axisColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r.min) && Number.isNaN(r.max))
      return;
    this.lastRange = r;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = width;
    const lineX = v.width - width / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + width);
    ctx.lineTo(lineX, plotArea.visual.height + width);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v.width - paddingPx * 4;
    if (isRangeSinglePoint(r)) {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) + width / 2
      ]);
      drawText(ctx, series.formatValue(r.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.min) - 5
      ]);
    }
  }
};
var drawText = (ctx, text2, position) => {
  const size = ctx.measureText(text2);
  const xy = position(size);
  ctx.fillText(text2, xy[0], xy[1]);
};
var Plot = class extends CanvasBox {
  constructor(canvasEl, opts = {}) {
    if (canvasEl === void 0)
      throw new Error(`canvasEl undefined`);
    super(void 0, canvasEl, `Plot`);
    __publicField(this, "plotArea");
    __publicField(this, "legend");
    __publicField(this, "axisX");
    __publicField(this, "axisY");
    __publicField(this, "axisColour");
    __publicField(this, "axisWidth");
    __publicField(this, "series");
    __publicField(this, "_frozen", false);
    __publicField(this, "defaultSeriesOpts");
    if (opts.autoSize) {
      parentSizeCanvas(canvasEl, (evt) => {
        this.update(true);
      });
    }
    this.axisColour = opts.axisColour ?? `black`;
    this.axisWidth = opts.axisWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this);
    this.legend = new Legend(this);
    this.axisX = new AxisX(this);
    this.axisY = new AxisY(this);
  }
  clearSeries() {
    for (const series of this.series.values()) {
      series.clear();
    }
  }
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.update(true);
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this.canvasEl.classList.add(`frozen`);
      this.canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this.canvasEl.title = ``;
      this.canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  plot(o) {
    const paths2 = getFieldPaths(o);
    paths2.forEach((p) => {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
      }
      s.add(getFieldByPath(o, p));
    });
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create5 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, prefix + key + ".");
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap(create5);
  }
  createSeries(name, type = `array`, seriesOpts) {
    const len = this.seriesLength;
    if (name === void 0)
      name = `series-${len}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${len * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts)
      opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.needsDrawing = true;
    return s;
  }
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create2
});
var create2 = (fallbacks) => new PaletteImpl(fallbacks);
var _store, _aliases, _lastFallback, _elementBase;
var PaletteImpl = class {
  constructor(fallbacks) {
    __privateAdd(this, _store, /* @__PURE__ */ new Map());
    __privateAdd(this, _aliases, /* @__PURE__ */ new Map());
    __publicField(this, "fallbacks");
    __privateAdd(this, _lastFallback, 0);
    __privateAdd(this, _elementBase, void 0);
    if (fallbacks !== void 0)
      this.fallbacks = fallbacks;
    else
      this.fallbacks = [`red`, `blue`, `green`, `orange`];
    __privateSet(this, _elementBase, document.body);
  }
  setElementBase(el) {
    __privateSet(this, _elementBase, el);
  }
  add(key, colour) {
    __privateGet(this, _store).set(key, colour);
  }
  alias(from2, to) {
    __privateGet(this, _aliases).set(from2, to);
  }
  get(key, fallback) {
    const alias = __privateGet(this, _aliases).get(key);
    if (alias !== void 0)
      key = alias;
    const c = __privateGet(this, _store).get(key);
    if (c !== void 0)
      return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(__privateGet(this, _elementBase)).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0)
        return fallback;
      fromCss = this.fallbacks[__privateGet(this, _lastFallback)];
      __privateWrapper(this, _lastFallback)._++;
      if (__privateGet(this, _lastFallback) === this.fallbacks.length)
        __privateSet(this, _lastFallback, 0);
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key))
      return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return __privateGet(this, _store).has(key);
  }
};
_store = new WeakMap();
_aliases = new WeakMap();
_lastFallback = new WeakMap();
_elementBase = new WeakMap();

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Visuals: { SceneGraph: SceneGraph_exports, Plot2: Plot2_exports, Drawing: Drawing_exports, Svg: Svg_exports, Plot: Plot_exports, Palette: Palette_exports, Colour: Colour_exports, Video: Video_exports } };
  }
} catch {
}

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  DragDrop: () => DragDrop_exports,
  Forms: () => Forms_exports,
  canvasHelper: () => canvasHelper,
  clear: () => clear,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  cycleCssClass: () => cycleCssClass,
  dataTable: () => dataTable,
  dataTableList: () => dataTableList,
  defaultErrorHandler: () => defaultErrorHandler2,
  fullSizeCanvas: () => fullSizeCanvas,
  fullSizeElement: () => fullSizeElement,
  getTranslation: () => getTranslation,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
  pointerVisualise: () => pointerVisualise,
  reconcileChildren: () => reconcileChildren,
  resizeObservable: () => resizeObservable,
  resolveEl: () => resolveEl,
  rx: () => rx,
  themeChangeObservable: () => themeChangeObservable,
  windowResize: () => windowResize
});

// src/dom/ShadowDom.ts
var addShadowCss = (parentEl, styles) => {
  const styleEl = document.createElement(`style`);
  styleEl.textContent = styles;
  let shadowRoot;
  if (parentEl.shadowRoot) {
    shadowRoot = parentEl.shadowRoot;
    shadowRoot.innerHTML = ``;
  } else {
    shadowRoot = parentEl.attachShadow({ mode: `open` });
  }
  shadowRoot.appendChild(styleEl);
  return shadowRoot;
};

// src/dom/Log.ts
var log = (domQueryOrEl, opts = {}) => {
  const { capacity = 0, monospaced = true, timestamp = false, collapseDuplicates = true, css = `` } = opts;
  let added = 0;
  let lastLog;
  let lastLogRepeats = 0;
  const parentEl = resolveEl(domQueryOrEl);
  const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
  const shadowRoot = addShadowCss(parentEl, `
  .log {
    font-family: ${fontFamily};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
    word-break: break-word;
  }
  ${css}
  `);
  const el = document.createElement(`div`);
  el.className = `log`;
  shadowRoot.append(el);
  const error = (msgOrError) => {
    const line3 = document.createElement(`div`);
    if (typeof msgOrError === `string`) {
      line3.innerHTML = msgOrError;
    } else if (msgOrError instanceof Error) {
      const stack2 = msgOrError.stack;
      if (stack2 === void 0) {
        line3.innerHTML = msgOrError.toString();
      } else {
        line3.innerHTML = stack2.toString();
      }
    } else {
      line3.innerHTML = msgOrError;
    }
    line3.classList.add(`error`);
    append(line3);
    lastLog = void 0;
    lastLogRepeats = 0;
  };
  let lastLogTime = 0;
  const log2 = (whatToLog = ``) => {
    let msg;
    const interval = window.performance.now() - lastLogTime;
    if (opts.minIntervalMs && interval < opts.minIntervalMs)
      return;
    lastLogTime = window.performance.now();
    if (typeof whatToLog === `object`) {
      msg = JSON.stringify(whatToLog);
    } else if (whatToLog === void 0) {
      msg = `(undefined)`;
    } else if (whatToLog === null) {
      msg = `(null)`;
    } else if (typeof whatToLog === `number`) {
      if (Number.isNaN(msg))
        msg = `(NaN)`;
      msg = whatToLog.toString();
    } else {
      msg = whatToLog;
    }
    if (msg.length === 0) {
      const rule = document.createElement(`hr`);
      lastLog = void 0;
      append(rule);
    } else if (msg === lastLog && collapseDuplicates) {
      const lastEl = el.firstElementChild;
      let lastBadge = lastEl.querySelector(`.badge`);
      if (lastBadge === null) {
        lastBadge = document.createElement(`div`);
        lastBadge.className = `badge`;
        lastEl.insertAdjacentElement(`beforeend`, lastBadge);
      }
      if (lastEl !== null) {
        lastBadge.textContent = (++lastLogRepeats).toString();
      }
      return lastEl;
    } else {
      const line3 = document.createElement(`div`);
      line3.innerText = msg;
      append(line3);
      lastLog = msg;
      return line3;
    }
  };
  const append = (line3) => {
    if (timestamp) {
      const wrapper = document.createElement(`div`);
      const timestamp2 = document.createElement(`div`);
      timestamp2.className = `timestamp`;
      timestamp2.innerText = new Date().toLocaleTimeString();
      wrapper.append(timestamp2, line3);
      line3.classList.add(`msg`);
      wrapper.classList.add(`line`);
      line3 = wrapper;
    } else {
      line3.classList.add(`line`, `msg`);
    }
    if (opts.reverse) {
      el.appendChild(line3);
    } else {
      el.insertBefore(line3, el.firstChild);
    }
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el.lastChild?.remove();
        added--;
      }
    }
    if (opts.reverse) {
      el.scrollTop = el.scrollHeight;
    }
    lastLogRepeats = 0;
  };
  const clear3 = () => {
    el.innerHTML = ``;
    lastLog = void 0;
    lastLogRepeats = 0;
    added = 0;
  };
  const dispose = () => {
    el.remove();
  };
  return {
    error,
    log: log2,
    append,
    clear: clear3,
    dispose,
    get isEmpty() {
      return added === 0;
    }
  };
};

// src/dom/DomRx.ts
var rx = (elOrQuery, event, opts) => {
  const el = resolveEl(elOrQuery);
  const ev = fromEvent(el, event);
  const value = {};
  const clear3 = () => {
    const keys = Object.keys(value);
    keys.forEach((key) => {
      delete value[key];
    });
  };
  const setup = (sub) => {
    sub.subscribe({
      next: (newValue) => {
        Object.assign(value, newValue);
      }
    });
    return {
      value,
      clear: clear3
    };
  };
  if (opts === void 0)
    return setup(ev);
  if (opts.pluck) {
    return setup(ev.pipe(map2((x) => x[opts.pluck])));
  } else if (opts.transform) {
    return setup(ev.pipe(map2((x) => opts.transform(x))));
  }
  return setup(ev);
};

// src/dom/Forms.ts
var Forms_exports = {};
__export(Forms_exports, {
  button: () => button,
  checkbox: () => checkbox,
  numeric: () => numeric,
  select: () => select,
  textAreaKeyboard: () => textAreaKeyboard
});
var textAreaKeyboard = (el) => {
  el.addEventListener(`keydown`, (evt) => {
    const val = el.value;
    const start3 = el.selectionStart;
    const end = el.selectionEnd;
    if (evt.key === `Tab` && evt.shiftKey) {
      if (el.value.substring(start3 - 2, start3) === `  `) {
        el.value = val.substring(0, start3 - 2) + val.substring(end);
      }
      el.selectionStart = el.selectionEnd = start3 - 2;
      evt.preventDefault();
      return false;
    } else if (evt.key === `Tab`) {
      el.value = val.substring(0, start3) + `  ` + val.substring(end);
      el.selectionStart = el.selectionEnd = start3 + 2;
      evt.preventDefault();
      return false;
    }
  });
};
var checkbox = (domIdOrEl, onChanged) => {
  const el = resolveEl(domIdOrEl);
  if (onChanged) {
    el.addEventListener(`change`, () => {
      onChanged(el.checked);
    });
  }
  return {
    get checked() {
      return el.checked;
    },
    set checked(val) {
      el.checked = val;
    }
  };
};
var numeric = (domIdOrEl, onChanged, live) => {
  const el = resolveEl(domIdOrEl);
  const evt = live ? `change` : `input`;
  if (onChanged) {
    el.addEventListener(evt, () => {
      onChanged(parseInt(el.value));
    });
  }
  return {
    get value() {
      return parseInt(el.value);
    },
    set value(val) {
      el.value = val.toString();
    }
  };
};
var button = (domQueryOrEl, onClick) => {
  const el = resolveEl(domQueryOrEl);
  if (onClick) {
    el.addEventListener(`click`, (_ev) => {
      onClick();
    });
  }
  return {
    click() {
      if (onClick)
        onClick();
    },
    set disabled(val) {
      el.disabled = val;
    }
  };
};
var select = (domQueryOrEl, onChanged, opts = {}) => {
  const el = resolveEl(domQueryOrEl);
  const { placeholderOpt, shouldAddChoosePlaceholder = false, autoSelectAfterChoice = -1 } = opts;
  const change = () => {
    if (onChanged !== void 0)
      onChanged(el.value);
    if (autoSelectAfterChoice >= 0)
      el.selectedIndex = autoSelectAfterChoice;
  };
  if (onChanged) {
    el.addEventListener(`change`, (_ev) => {
      change();
    });
  }
  return {
    set disabled(val) {
      el.disabled = val;
    },
    get value() {
      return el.value;
    },
    get index() {
      return el.selectedIndex;
    },
    get isSelectedPlaceholder() {
      return (shouldAddChoosePlaceholder || opts.placeholderOpt !== void 0) && el.selectedIndex === 0;
    },
    setOpts(opts2, preSelect) {
      el.options.length = 0;
      if (shouldAddChoosePlaceholder)
        opts2 = [`-- Choose --`, ...opts2];
      else if (placeholderOpt !== void 0)
        opts2 = [placeholderOpt, ...opts2];
      let toSelect = 0;
      opts2.forEach((o, index) => {
        const optEl = document.createElement(`option`);
        optEl.value = o;
        optEl.innerHTML = o;
        if (preSelect !== void 0 && o === preSelect)
          toSelect = index;
        el.options.add(optEl);
      });
      el.selectedIndex = toSelect;
    },
    select(index = 0, trigger = false) {
      el.selectedIndex = index;
      if (trigger && onChanged) {
        change();
      }
    }
  };
};

// src/data/TrackedValue.ts
var TrackedValueMap = class {
  constructor(creator) {
    __publicField(this, "store");
    __publicField(this, "gog");
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  get size() {
    return this.store.size;
  }
  has(id) {
    return this.store.has(id);
  }
  async seen(id, ...values) {
    const trackedValue = await this.getTrackedValue(id, ...values);
    return trackedValue.seen(...values);
  }
  async getTrackedValue(id, ...values) {
    if (id === null)
      throw new Error(`id parameter cannot be null`);
    if (id === void 0)
      throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
  }
  delete(id) {
    this.store.delete(id);
  }
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  *ids() {
    yield* this.store.keys();
  }
  *tracked() {
    yield* this.store.values();
  }
  *trackedByAge() {
    const tp = Array.from(this.store.values());
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa > bb)
        return -1;
      return 1;
    });
    for (const t4 of tp) {
      yield t4;
    }
  }
  *valuesByAge() {
    for (const tb of this.trackedByAge()) {
      yield tb.last;
    }
  }
  *last() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  *initialValues() {
    for (const p of this.store.values()) {
      yield p.initial;
    }
  }
  get(id) {
    return this.store.get(id);
  }
};

// src/data/ObjectTracker.ts
var ObjectTracker = class extends TrackerBase {
  constructor(opts = {}) {
    super(opts);
    __publicField(this, "values");
    this.values = [];
  }
  onTrimmed() {
  }
  trimStore(limit) {
    if (limit >= this.values.length)
      return this.values.length;
    this.values = this.values.slice(-limit);
    return this.values.length;
  }
  onReset() {
    this.values = [];
  }
  seenImpl(p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else if (this.values.length === 0) {
      this.values.push(last);
    } else if (this.values.length === 2) {
      this.values[1] = last;
    } else if (this.values.length === 1) {
      this.values.push(last);
    }
    return ts;
  }
  get last() {
    if (this.values.length === 1)
      return this.values[0];
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};

// src/data/PointTracker.ts
var PointTracker = class extends ObjectTracker {
  constructor(opts = {}) {
    super(opts);
    __publicField(this, "initialRelation");
    __publicField(this, "lastResult");
  }
  onTrimmed() {
    this.initialRelation = void 0;
  }
  get x() {
    return this.last.x;
  }
  get y() {
    return this.last.y;
  }
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
  }
  seen(...p) {
    const currentLast = this.last;
    super.seen(...p);
    const newLast = this.last;
    if (this.initialRelation === void 0 && this.initial) {
      this.initialRelation = relation(this.initial);
    } else if (this.initialRelation === void 0) {
      throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    }
    const lastRelation = relation(currentLast);
    const initialRel = {
      ...this.initialRelation(newLast)
    };
    const lastRel = {
      ...lastRelation(newLast),
      speed: this.values.length < 2 ? 0 : Line_exports.length(currentLast, newLast) / (newLast.at - currentLast.at)
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r;
    return r;
  }
  get line() {
    if (this.values.length === 1)
      return [];
    return Line_exports.joinPointsToLines(...this.values);
  }
  get vectorPolar() {
    return Vector_exports.fromLinePolar(this.lineStartEnd);
  }
  get vectorCartesian() {
    return Vector_exports.fromLineCartesian(this.lineStartEnd);
  }
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial)
      return Line_exports.Empty;
    return {
      a: initial,
      b: this.last
    };
  }
  distanceFromStart() {
    const initial = this.initial;
    if (this.values.length >= 2 && initial !== void 0) {
      return distance2(initial, this.last);
    } else {
      return 0;
    }
  }
  difference() {
    const initial = this.initial;
    if (this.values.length >= 2 && initial !== void 0) {
      return subtract2(this.last, initial);
    } else {
      return Placeholder2;
    }
  }
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angle(initial, this.last);
    }
  }
  get length() {
    if (this.values.length === 1)
      return 0;
    const l = this.line;
    return Line_exports.length(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start3) => {
      if (start3 === void 0)
        throw new Error(`Requires start point`);
      const p = new PointTracker({
        ...opts,
        id: key
      });
      p.seen(start3);
      return p;
    });
  }
};
var pointsTracker = (opts = {}) => new TrackedPointMap(opts);
var pointTracker = (opts = {}) => new PointTracker(opts);

// src/dom/PointerVisualise.ts
var pointerVisualise = (elOrQuery, opts = {}) => {
  const touchRadius = opts.touchRadius ?? 45;
  const mouseRadius = opts.touchRadius ?? 20;
  const trace = opts.trace ?? false;
  const hue2 = opts.hue ?? 100;
  const startFillStyle = `hsla(${hue2}, 100%, 10%, 10%)`;
  let currentHue = hue2;
  const el = resolveEl(elOrQuery);
  const tracker2 = pointsTracker({
    storeIntermediate: trace
  });
  const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
  svg.id = `pointerVis`;
  svg.style.zIndex = `-1000`;
  svg.style.position = `fixed`;
  svg.style.top = `0`;
  svg.style.left = `0`;
  svg.style.width = `100%`;
  svg.style.height = `100%`;
  svg.style.boxSizing = `border-box`;
  svg.style.border = `3px solid red`;
  svg.style.pointerEvents = `none`;
  svg.style.touchAction = `none`;
  fullSizeElement(svg);
  let pointerCount = 0;
  const lostPointer = async (ev) => {
    const id = ev.pointerId.toString();
    tracker2.delete(id);
    currentHue = hue2;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let i = 0; i < pointerCount + 10; i++) {
      svg.querySelector(`#pv-progress-${id}-${i}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (ev) => {
    const id = ev.pointerId.toString();
    const pt = { x: ev.x, y: ev.y };
    const type = ev.pointerType;
    if (ev.type === `pointermove` && !tracker2.has(id)) {
      return;
    }
    const info = await tracker2.seen(id, pt);
    if (info.values.length === 1) {
      const el3 = SvgElements_exports.circle({ ...info.values[0], radius: type === `touch` ? touchRadius : mouseRadius }, svg, {
        fillStyle: startFillStyle
      }, `#pv-start-${id}`);
      el3.style.pointerEvents = `none`;
      el3.style.touchAction = `none`;
    }
    const progressFillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
    const el2 = SvgElements_exports.circle({ ...pt, radius: type === `touch` ? touchRadius : mouseRadius }, svg, {
      fillStyle: progressFillStyle
    }, `#pv-progress-${id}-${info.values.length}`);
    el2.style.pointerEvents = `none`;
    el2.style.touchAction = `none`;
    currentHue += 1;
    pointerCount = info.values.length;
    return true;
  };
  document.body.appendChild(svg);
  el.addEventListener(`pointerdown`, trackPointer);
  el.addEventListener(`pointermove`, trackPointer);
  el.addEventListener(`pointerup`, lostPointer);
  el.addEventListener(`pointerleave`, lostPointer);
  el.addEventListener(`contextmenu`, (ev) => {
    ev.preventDefault();
  });
};

// src/dom/ErrorHandler.ts
var defaultErrorHandler2 = () => {
  let enabled = true;
  const container = document.createElement(`div`);
  container.style.color = `black`;
  container.style.border = `2px solid red`;
  container.style.backgroundColor = `hsl(0, 80%, 90%)`;
  container.style.padding = `1em`;
  container.style.display = `none`;
  container.style.top = `1em`;
  container.style.left = `1em`;
  container.style.position = `absolute`;
  container.style.fontFamily = `monospace`;
  const msgEl = document.createElement(`div`);
  msgEl.style.maxWidth = `50vw`;
  msgEl.style.maxHeight = `50vh`;
  msgEl.style.overflowY = `scroll`;
  container.innerHTML = `<h1>Error</h1>`;
  container.append(msgEl);
  const styleButton = (b) => {
    b.style.padding = `0.3em`;
    b.style.marginTop = `1em`;
  };
  const btnClose = document.createElement(`button`);
  btnClose.innerText = `Close`;
  btnClose.onclick = () => {
    hide();
  };
  const btnStop = document.createElement(`button`);
  btnStop.innerText = `Stop displaying errors`;
  btnStop.onclick = () => {
    enabled = false;
    hide();
  };
  styleButton(btnClose);
  styleButton(btnStop);
  container.append(btnClose);
  container.append(btnStop);
  document.body.append(container);
  const show = (ex) => {
    container.style.display = `inline`;
    if (ex.stack) {
      msgEl.innerHTML += `<pre>${ex.stack}</pre>`;
    } else {
      msgEl.innerHTML += `<p>${ex}</p>`;
    }
  };
  const hide = () => {
    container.style.display = `none`;
  };
  window.onerror = (msg, url, lineNo, colNo, error) => {
    if (enabled) {
      if (error) {
        console.log(error);
        show(error);
      } else {
        console.log(msg);
        show(msg);
      }
    }
  };
  window.addEventListener(`unhandledrejection`, (e) => {
    console.log(e.reason);
    if (enabled) {
      show(e.reason);
    }
  });
  return { show, hide };
};

// src/dom/DragDrop.ts
var DragDrop_exports = {};
__export(DragDrop_exports, {
  draggable: () => draggable
});
var draggable = (elem, listener) => {
  let initial = Point_exports.Placeholder;
  let token;
  const onParentClick = () => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    }
  };
  const onElementClick = (evt) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    } else {
      elem.classList.add(`drag-sel`);
    }
    evt.stopPropagation();
  };
  elem.ownerDocument.addEventListener(`click`, onParentClick);
  elem.addEventListener(`click`, onElementClick);
  const dragCleanup = () => {
    elem.classList.remove(`drag-progress`);
    elem.ownerDocument.removeEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.removeEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.removeEventListener(`pointercancel`, onDragCancel);
  };
  const dispose = () => {
    console.log(`drag dispose`);
    if (elem.classList.contains(`drag-progress`)) {
      onDragCancel(null, `dispose`);
    } else {
      dragCleanup();
    }
    elem.ownerDocument.removeEventListener(`click`, onParentClick);
    elem.removeEventListener(`click`, onElementClick);
  };
  const onPointerMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const offset2 = Point_exports.isPlaceholder(initial) ? { x: e.offsetX, y: e.offsetY } : {
      x: e.x - initial.x,
      y: e.y - initial.y
    };
    const state = {
      delta: offset2,
      initial,
      token
    };
    if (typeof listener.progress !== `undefined` && !listener.progress(state)) {
      onDragCancel(null, `discontinued`);
    }
  };
  const onPointerUp = (e) => {
    dragCleanup();
    const offset2 = {
      x: e.x - initial.x,
      y: e.y - initial.y
    };
    const state = {
      initial,
      token,
      delta: offset2
    };
    if (typeof listener.success !== `undefined`) {
      listener.success(state);
    }
  };
  const onDragCancel = (evt, reason = `pointercancel`) => {
    dragCleanup();
    const state = {
      token,
      initial,
      delta: { x: -1, y: -1 }
    };
    if (typeof listener.abort !== `undefined`) {
      listener.abort(reason, state);
    }
  };
  elem.addEventListener(`pointerdown`, (evt) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (!selected)
      return;
    initial = { x: evt.x, y: evt.y };
    const s = typeof listener.start !== `undefined` ? listener.start() : { allow: true, token };
    if (!s.allow)
      return;
    token = s.token;
    elem.classList.add(`drag-progress`);
    elem.ownerDocument.addEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.addEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.addEventListener(`pointercancel`, onDragCancel);
  });
  return dispose;
};

// src/modulation/index.ts
var modulation_exports = {};
__export(modulation_exports, {
  Easings: () => Easing_exports,
  Forces: () => Forces_exports,
  Oscillators: () => Oscillator_exports,
  adsr: () => adsr,
  adsrSample: () => adsrSample,
  defaultAdsrOpts: () => defaultAdsrOpts,
  jitter: () => jitter,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent
});

// src/modulation/Envelope.ts
var Envelope_exports = {};
__export(Envelope_exports, {
  adsr: () => adsr,
  adsrSample: () => adsrSample,
  defaultAdsrOpts: () => defaultAdsrOpts
});
var defaultAdsrOpts = () => ({
  attackBend: -1,
  decayBend: -0.3,
  releaseBend: -0.3,
  peakLevel: 1,
  initialLevel: 0,
  sustainLevel: 0.6,
  releaseLevel: 0,
  attackDuration: 600,
  decayDuration: 200,
  releaseDuration: 800,
  shouldLoop: false
});
var _sm, _timeSource, _timer, _holding, _holdingInitial;
var AdsrBase = class extends SimpleEventEmitter {
  constructor(opts) {
    super();
    __privateAdd(this, _sm, void 0);
    __privateAdd(this, _timeSource, void 0);
    __privateAdd(this, _timer, void 0);
    __privateAdd(this, _holding, void 0);
    __privateAdd(this, _holdingInitial, void 0);
    __publicField(this, "attackDuration");
    __publicField(this, "decayDuration");
    __publicField(this, "releaseDuration");
    __publicField(this, "decayDurationTotal");
    __publicField(this, "shouldLoop");
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
    const descr = {
      attack: [`decay`, `release`],
      decay: [`sustain`, `release`],
      sustain: [`release`],
      release: [`complete`],
      complete: null
    };
    __privateSet(this, _sm, new StateMachine(`attack`, descr));
    __privateGet(this, _sm).addEventListener(`change`, (ev) => {
      if (ev.newState === `release` && __privateGet(this, _holdingInitial)) {
        __privateGet(this, _timer)?.reset();
      }
      super.fireEvent(`change`, ev);
    });
    __privateGet(this, _sm).addEventListener(`stop`, (ev) => {
      super.fireEvent(`complete`, ev);
    });
    __privateSet(this, _timeSource, msElapsedTimer);
    __privateSet(this, _holding, __privateSet(this, _holdingInitial, false));
    this.decayDurationTotal = this.attackDuration + this.decayDuration;
  }
  switchState() {
    if (__privateGet(this, _timer) === void 0)
      return false;
    let elapsed = __privateGet(this, _timer).elapsed;
    const wasHeld = __privateGet(this, _holdingInitial) && !__privateGet(this, _holding);
    let hasChanged = false;
    do {
      hasChanged = false;
      switch (__privateGet(this, _sm).state) {
        case `attack`:
          if (elapsed > this.attackDuration || wasHeld) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `decay`:
          if (elapsed > this.decayDurationTotal || wasHeld) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `sustain`:
          if (!__privateGet(this, _holding) || wasHeld) {
            elapsed = 0;
            __privateGet(this, _sm).next();
            __privateGet(this, _timer)?.reset();
            hasChanged = true;
          }
          break;
        case `release`:
          if (elapsed > this.releaseDuration) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `complete`:
          if (this.shouldLoop) {
            this.trigger(__privateGet(this, _holdingInitial));
          }
      }
    } while (hasChanged);
    return hasChanged;
  }
  computeRaw(allowStateChange = true) {
    if (__privateGet(this, _timer) === void 0)
      return [void 0, 0, __privateGet(this, _sm).state];
    if (allowStateChange)
      this.switchState();
    const prevStage = __privateGet(this, _sm).state;
    const elapsed = __privateGet(this, _timer).elapsed;
    let relative = 0;
    const state = __privateGet(this, _sm).state;
    switch (state) {
      case `attack`:
        relative = elapsed / this.attackDuration;
        break;
      case `decay`:
        relative = (elapsed - this.attackDuration) / this.decayDuration;
        break;
      case `sustain`:
        relative = 1;
        break;
      case `release`:
        relative = Math.min(elapsed / this.releaseDuration, 1);
        break;
      case `complete`:
        return [void 0, 1, prevStage];
      default:
        throw new Error(`State machine in unknown state: ${state}`);
    }
    return [state, relative, prevStage];
  }
  get isDone() {
    return __privateGet(this, _sm).isDone;
  }
  onTrigger() {
  }
  trigger(hold = false) {
    this.onTrigger();
    __privateGet(this, _sm).reset();
    __privateSet(this, _timer, __privateGet(this, _timeSource).call(this));
    __privateSet(this, _holding, hold);
    __privateSet(this, _holdingInitial, hold);
  }
  compute() {
  }
  release() {
    if (this.isDone || !__privateGet(this, _holdingInitial))
      return;
    __privateSet(this, _holding, false);
    this.compute();
  }
};
_sm = new WeakMap();
_timeSource = new WeakMap();
_timer = new WeakMap();
_holding = new WeakMap();
_holdingInitial = new WeakMap();
var AdsrImpl = class extends AdsrBase {
  constructor(opts) {
    super(opts);
    __publicField(this, "attackPath");
    __publicField(this, "decayPath");
    __publicField(this, "releasePath");
    __publicField(this, "initialLevel");
    __publicField(this, "peakLevel");
    __publicField(this, "releaseLevel");
    __publicField(this, "sustainLevel");
    __publicField(this, "attackBend");
    __publicField(this, "decayBend");
    __publicField(this, "releaseBend");
    __publicField(this, "initialLevelOverride");
    __publicField(this, "retrigger");
    __publicField(this, "releasedAt");
    this.initialLevel = opts.initialLevel ?? 0;
    this.peakLevel = opts.peakLevel ?? 1;
    this.releaseLevel = opts.releaseLevel ?? 0;
    this.sustainLevel = opts.sustainLevel ?? 0.75;
    this.retrigger = opts.retrigger ?? true;
    this.attackBend = opts.attackBend ?? 0;
    this.releaseBend = opts.releaseBend ?? 0;
    this.decayBend = opts.decayBend ?? 0;
    const max4 = 1;
    this.attackPath = toPath3(quadraticSimple(
      { x: 0, y: this.initialLevel },
      { x: max4, y: this.peakLevel },
      -this.attackBend
    ));
    this.decayPath = toPath3(quadraticSimple(
      { x: 0, y: this.peakLevel },
      { x: max4, y: this.sustainLevel },
      -this.decayBend
    ));
    this.releasePath = toPath3(quadraticSimple(
      { x: 0, y: this.sustainLevel },
      { x: max4, y: this.releaseLevel },
      -this.releaseBend
    ));
  }
  onTrigger() {
    this.initialLevelOverride = void 0;
    if (!this.retrigger) {
      const [_stage, scaled, _raw] = this.compute();
      if (!Number.isNaN(scaled) && scaled > 0) {
        this.initialLevelOverride = scaled;
      }
    }
  }
  get value() {
    return this.compute(true)[1];
  }
  compute(allowStateChange = true) {
    const [stage, amt] = super.computeRaw(allowStateChange);
    if (stage === void 0)
      return [void 0, NaN, NaN];
    let v;
    switch (stage) {
      case `attack`:
        v = this.attackPath.interpolate(amt).y;
        if (this.initialLevelOverride !== void 0) {
          v = scale(v, 0, 1, this.initialLevelOverride, 1);
        }
        this.releasedAt = v;
        break;
      case `decay`:
        v = this.decayPath.interpolate(amt).y;
        this.releasedAt = v;
        break;
      case `sustain`:
        v = this.sustainLevel;
        this.releasedAt = v;
        break;
      case `release`:
        v = this.releasePath.interpolate(amt).y;
        if (this.releasedAt !== void 0)
          v = scale(v, 0, this.sustainLevel, 0, this.releasedAt);
        break;
      case `complete`:
        v = this.releaseLevel;
        this.releasedAt = void 0;
        break;
      default:
        throw new Error(`Unknown state: ${stage}`);
    }
    return [stage, v, amt];
  }
};
var adsr = (opts) => new AdsrImpl(opts);
async function* adsrSample(opts, sampleRateMs) {
  if (opts.shouldLoop)
    throw new Error(`Cannot sample a looping envelope`);
  const env = adsr(opts);
  env.trigger();
  while (true) {
    await sleep(sampleRateMs);
    const v = env.value;
    if (env.isDone)
      return;
    yield v;
  }
}

// src/modulation/Forces.ts
var Forces_exports = {};
__export(Forces_exports, {
  accelerationForce: () => accelerationForce,
  angleFromAccelerationForce: () => angleFromAccelerationForce,
  angleFromVelocityForce: () => angleFromVelocityForce,
  angularForce: () => angularForce,
  apply: () => apply4,
  attractionForce: () => attractionForce,
  computeAccelerationToTarget: () => computeAccelerationToTarget,
  computeAttractionForce: () => computeAttractionForce,
  computePositionFromAngle: () => computePositionFromAngle,
  computePositionFromVelocity: () => computePositionFromVelocity,
  computeVelocity: () => computeVelocity,
  constrainBounce: () => constrainBounce,
  guard: () => guard8,
  magnitudeForce: () => magnitudeForce,
  nullForce: () => nullForce,
  orientationForce: () => orientationForce,
  pendulumForce: () => pendulumForce,
  springForce: () => springForce,
  targetForce: () => targetForce,
  velocityForce: () => velocityForce
});
var guard8 = (t4, name = `t`) => {
  if (t4 === void 0)
    throw new Error(`Parameter ${name} is undefined. Expected ForceAffected`);
  if (t4 === null)
    throw new Error(`Parameter ${name} is null. Expected ForceAffected`);
  if (typeof t4 !== `object`)
    throw new Error(`Parameter ${name} is type ${typeof t4}. Expected object of shape ForceAffected`);
};
var constrainBounce = (bounds = { width: 1, height: 1 }, dampen = 1) => {
  const minX = getEdgeX(bounds, `left`);
  const maxX = getEdgeX(bounds, `right`);
  const minY = getEdgeY(bounds, `top`);
  const maxY = getEdgeY(bounds, `bottom`);
  return (t4) => {
    const position = computePositionFromVelocity(t4.position ?? Point_exports.Empty, t4.velocity ?? Point_exports.Empty);
    let velocity = t4.velocity ?? Point_exports.Empty;
    let { x, y } = position;
    if (x > maxX) {
      x = maxX;
      velocity = Point_exports.invert(Point_exports.multiply(velocity, dampen), `x`);
    } else if (x < minX) {
      x = minX;
      velocity = Point_exports.invert(Point_exports.multiply(velocity, dampen), `x`);
    }
    if (y > maxY) {
      y = maxY;
      velocity = Point_exports.multiply(Point_exports.invert(velocity, `y`), dampen);
    } else if (position.y < minY) {
      y = minY;
      velocity = Point_exports.invert(Point_exports.multiply(velocity, dampen), `y`);
    }
    return Object.freeze({
      ...t4,
      position: { x, y },
      velocity
    });
  };
};
var attractionForce = (attractors, gravity, distanceRange = {}) => (attractee) => {
  let accel = attractee.acceleration ?? Point_exports.Empty;
  attractors.forEach((a) => {
    if (a === attractee)
      return;
    const f = computeAttractionForce(a, attractee, gravity, distanceRange);
    accel = Point_exports.sum(accel, f);
  });
  return {
    ...attractee,
    acceleration: accel
  };
};
var computeAttractionForce = (attractor, attractee, gravity, distanceRange = {}) => {
  if (attractor.position === void 0)
    throw new Error(`attractor.position not set`);
  if (attractee.position === void 0)
    throw new Error(`attractee.position not set`);
  const distRangeMin = distanceRange.min ?? 0.01;
  const distRangeMax = distanceRange.max ?? 0.7;
  const f = Point_exports.normalise(Point_exports.subtract(attractor.position, attractee.position));
  const d = clamp(Point_exports.distance(f), distRangeMin, distRangeMax);
  return Point_exports.multiply(f, gravity * (attractor.mass ?? 1) * (attractee.mass ?? 1) / (d * d));
};
var targetForce = (targetPos, opts = {}) => {
  const fn = (t4) => {
    const accel = computeAccelerationToTarget(targetPos, t4.position ?? { x: 0.5, y: 0.5 }, opts);
    return {
      ...t4,
      acceleration: Point_exports.sum(t4.acceleration ?? Point_exports.Empty, accel)
    };
  };
  return fn;
};
var apply4 = (t4, ...accelForces) => {
  if (t4 === void 0)
    throw new Error(`t parameter is undefined`);
  accelForces.forEach((f) => {
    if (f === null || f === void 0)
      return;
    if (typeof f === `function`) {
      t4 = f(t4);
    } else {
      t4 = {
        ...t4,
        acceleration: Point_exports.sum(t4.acceleration ?? Point_exports.Empty, f)
      };
    }
  });
  const velo = computeVelocity(t4.acceleration ?? Point_exports.Empty, t4.velocity ?? Point_exports.Empty);
  const pos = computePositionFromVelocity(t4.position ?? Point_exports.Empty, velo);
  const ff = {
    ...t4,
    position: pos,
    velocity: velo,
    acceleration: Point_exports.Empty
  };
  return ff;
};
var accelerationForce = (vector, mass = `ignored`) => (t4) => Object.freeze({
  ...t4,
  acceleration: massApplyAccel(vector, t4, mass)
});
var massApplyAccel = (vector, thing, mass = `ignored`) => {
  let op;
  if (mass === `dampen`)
    op = (mass2) => Point_exports.divide(vector, mass2, mass2);
  else if (mass === `multiply`)
    op = (mass2) => Point_exports.multiply(vector, mass2, mass2);
  else if (mass === `ignored`) {
    op = (_mass) => vector;
  } else {
    throw new Error(`Unknown 'mass' parameter '${mass}. Expected 'dampen', 'multiply' or 'ignored'`);
  }
  return Point_exports.sum(thing.acceleration ?? Point_exports.Empty, op(thing.mass ?? 1));
};
var magnitudeForce = (force, mass = `ignored`) => (t4) => {
  if (t4.velocity === void 0)
    return t4;
  const mag = Point_exports.distance(Point_exports.normalise(t4.velocity));
  const magSq = force * mag * mag;
  const vv = Point_exports.multiply(Point_exports.invert(t4.velocity), magSq);
  return Object.freeze({
    ...t4,
    acceleration: massApplyAccel(vv, t4, mass)
  });
};
var nullForce = (t4) => t4;
var velocityForce = (force, mass) => {
  const pipeline2 = Point_exports.pipeline(
    Point_exports.invert,
    (v) => Point_exports.multiply(v, force)
  );
  return (t4) => {
    if (t4.velocity === void 0)
      return t4;
    const v = pipeline2(t4.velocity);
    return Object.freeze({
      ...t4,
      acceleration: massApplyAccel(v, t4, mass)
    });
  };
};
var angularForce = () => (t4) => {
  const acc = t4.angularAcceleration ?? 0;
  const vel = t4.angularVelocity ?? 0;
  const angle2 = t4.angle ?? 0;
  const v = vel + acc;
  const a = angle2 + v;
  return Object.freeze({
    ...t4,
    angle: a,
    angularVelocity: v,
    angularAcceleration: 0
  });
};
var angleFromAccelerationForce = (scaling = 20) => (t4) => {
  const accel = t4.acceleration ?? Point_exports.Empty;
  return Object.freeze({
    ...t4,
    angularAcceleration: accel.x * scaling
  });
};
var angleFromVelocityForce = (interpolateAmt = 1) => (t4) => {
  const a = Point_exports.angle(t4.velocity ?? Point_exports.Empty);
  return Object.freeze({
    ...t4,
    angle: interpolateAmt < 1 ? interpolateAngle(interpolateAmt, t4.angle ?? 0, a) : a
  });
};
var springForce = (pinnedAt, restingLength = 0.5, k = 2e-4, damping = 0.999) => (t4) => {
  const dir = Point_exports.subtract(t4.position ?? Point_exports.Empty, pinnedAt);
  const mag = Point_exports.distance(dir);
  const stretch = Math.abs(restingLength - mag);
  const f = Point_exports.pipelineApply(
    dir,
    Point_exports.normalise,
    (p) => Point_exports.multiply(p, -k * stretch)
  );
  const accel = massApplyAccel(f, t4, `dampen`);
  const velo = computeVelocity(accel ?? Point_exports.Empty, t4.velocity ?? Point_exports.Empty);
  const veloDamped = Point_exports.multiply(velo, damping, damping);
  return {
    ...t4,
    velocity: veloDamped,
    acceleration: Point_exports.Empty
  };
};
var pendulumForce = (pinnedAt = { x: 0.5, y: 0 }, opts = {}) => (t4) => {
  const length5 = opts.length ?? Point_exports.distance(pinnedAt, t4.position ?? Point_exports.Empty);
  const speed = opts.speed ?? 1e-3;
  const damping = opts.damping ?? 0.995;
  let angle2 = t4.angle;
  if (angle2 === void 0) {
    if (t4.position) {
      angle2 = Point_exports.angle(pinnedAt, t4.position) - Math.PI / 2;
    } else {
      angle2 = 0;
    }
  }
  const accel = -1 * speed / length5 * Math.sin(angle2);
  const v = (t4.angularVelocity ?? 0) + accel;
  angle2 += v;
  return Object.freeze({
    angularVelocity: v * damping,
    angle: angle2,
    position: computePositionFromAngle(length5, angle2 + Math.PI / 2, pinnedAt)
  });
};
var computeVelocity = (acceleration, velocity, velocityMax) => {
  const p = Point_exports.sum(velocity, acceleration);
  if (velocityMax !== void 0)
    return Point_exports.clampMagnitude(p, velocityMax);
  else
    return p;
};
var computeAccelerationToTarget = (targetPos, currentPos, opts = {}) => {
  const diminishBy = opts.diminishBy ?? 1e-3;
  const direction = Point_exports.subtract(targetPos, currentPos);
  if (opts.range) {
    if (Point_exports.compare(Point_exports.abs(direction), opts.range) === -2)
      return Point_exports.Empty;
  }
  return Point_exports.multiply(direction, diminishBy);
};
var computePositionFromVelocity = (position, velocity) => Point_exports.sum(position, velocity);
var computePositionFromAngle = (distance3, angleRadians, origin) => Polar_exports.toCartesian(distance3, angleRadians, origin);
var _angularForce = angularForce();
var _angleFromAccelerationForce = angleFromAccelerationForce();
var orientationForce = (interpolationAmt = 0.5) => {
  const angleFromVel = angleFromVelocityForce(interpolationAmt);
  return (t4) => {
    t4 = _angularForce(t4);
    t4 = _angleFromAccelerationForce(t4);
    t4 = angleFromVel(t4);
    return t4;
  };
};

// src/modulation/Oscillator.ts
var Oscillator_exports = {};
__export(Oscillator_exports, {
  saw: () => saw,
  sine: () => sine,
  sineBipolar: () => sineBipolar,
  spring: () => spring,
  square: () => square,
  triangle: () => triangle2
});
var piPi8 = Math.PI * 2;
var springRaw = (opts = {}, from2 = 0, to = 1) => {
  const mass = opts.mass ?? 1;
  const stiffness = opts.stiffness ?? 100;
  const soft = opts.soft ?? false;
  const damping = opts.damping ?? 10;
  const velocity = opts.velocity ?? 0.1;
  const delta = to - from2;
  if (true === soft || 1 <= damping / (2 * Math.sqrt(stiffness * mass))) {
    const angularFrequency = -Math.sqrt(stiffness / mass);
    const leftover = -angularFrequency * delta - velocity;
    return (t4) => to - (delta + t4 * leftover) * Math.E ** (t4 * angularFrequency);
  } else {
    const dampingFrequency = Math.sqrt(4 * mass * stiffness - damping ** 2);
    const leftover = (damping * delta - 2 * mass * velocity) / dampingFrequency;
    const dfm = 0.5 * dampingFrequency / mass;
    const dm = -(0.5 * damping) / mass;
    return (t4) => to - (Math.cos(t4 * dfm) * delta + Math.sin(t4 * dfm) * leftover) * Math.E ** (t4 * dm);
  }
};
function* spring(opts = {}, timerOrFreq) {
  if (timerOrFreq === void 0)
    timerOrFreq = msElapsedTimer();
  else if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  const fn = springRaw(opts, 0, 1);
  let doneCountdown = opts.countdown ?? 10;
  while (doneCountdown > 0) {
    const s = fn(timerOrFreq.elapsed / 1e3);
    yield s;
    if (s === 1) {
      doneCountdown--;
    } else {
      doneCountdown = 100;
    }
  }
}
function* sine(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield (Math.sin(timerOrFreq.elapsed * piPi8) + 1) / 2;
  }
}
function* sineBipolar(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield Math.sin(timerOrFreq.elapsed * piPi8);
  }
}
function* triangle2(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    let v = timerOrFreq.elapsed;
    if (v < 0.5) {
      v *= 2;
    } else {
      v = 2 - v * 2;
    }
    yield v;
  }
}
function* saw(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield timerOrFreq.elapsed;
  }
}
function* square(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield timerOrFreq.elapsed < 0.5 ? 0 : 1;
  }
}

// src/modulation/index.ts
var jitter = (value, jitter2, opts = {}) => {
  const type = opts.type ?? `abs`;
  const clamped = opts.clamped ?? true;
  const rand = opts.random ?? defaultRandom;
  number(value, clamped ? `percentage` : `bipolar`, `value`);
  number(jitter2, clamped ? `percentage` : `bipolar`, `jitter`);
  let v;
  if (type === `rel`) {
    jitter2 = value * jitter2;
    const j = jitter2 * 2 * rand();
    v = value - jitter2 + j;
  } else if (type === `abs`) {
    const j = jitter2 * 2 * rand();
    v = value - jitter2 + j;
  } else {
    throw new Error(`Unknown jitter type: ${type}.`);
  }
  if (clamped)
    return clamp(v);
  return v;
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, Modulation: { Forces: Forces_exports, jitter, Envelopes: Envelope_exports, Oscillators: Oscillator_exports, Easings: Easing_exports } };
  }
} catch {
}

// src/data/FrequencyMutable.ts
var _store2, _keyString;
var FrequencyMutable = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __privateAdd(this, _store2, void 0);
    __privateAdd(this, _keyString, void 0);
    __privateSet(this, _store2, /* @__PURE__ */ new Map());
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0)
          throw new Error(`Cannot create key for undefined`);
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    __privateSet(this, _keyString, keyString);
  }
  clear() {
    __privateGet(this, _store2).clear();
    this.fireEvent(`change`, void 0);
  }
  keys() {
    return __privateGet(this, _store2).keys();
  }
  values() {
    return __privateGet(this, _store2).values();
  }
  toArray() {
    return Array.from(__privateGet(this, _store2).entries());
  }
  debugString() {
    let t4 = ``;
    for (const [key, count] of __privateGet(this, _store2).entries()) {
      t4 += `${key}: ${count}, `;
    }
    if (t4.endsWith(`, `))
      return t4.substring(0, t4.length - 2);
    return t4;
  }
  frequencyOf(value) {
    if (typeof value === `string`)
      return __privateGet(this, _store2).get(value);
    const key = __privateGet(this, _keyString).call(this, value);
    return __privateGet(this, _store2).get(key);
  }
  relativeFrequencyOf(value) {
    let freq2;
    if (typeof value === `string`)
      freq2 = __privateGet(this, _store2).get(value);
    else {
      const key = __privateGet(this, _keyString).call(this, value);
      freq2 = __privateGet(this, _store2).get(key);
    }
    if (freq2 === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq2 / mma.total;
  }
  entries() {
    return Array.from(__privateGet(this, _store2).entries());
  }
  minMaxAvg() {
    return KeyValue_exports.minMaxAvg(this.entries());
  }
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map(__privateGet(this, _keyString));
    keys.forEach((key) => {
      const score = __privateGet(this, _store2).get(key) ?? 0;
      __privateGet(this, _store2).set(key, score + 1);
    });
    this.fireEvent(`change`, void 0);
  }
};
_store2 = new WeakMap();
_keyString = new WeakMap();
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  integer(scaling, `aboveZero`, `scaling`);
  let average3 = 0;
  let count = 0;
  let disposed = false;
  const ma = {
    dispose() {
      disposed = true;
    },
    get isDisposed() {
      return disposed;
    },
    add(v) {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot add`);
      count++;
      average3 = average3 + (v - average3) / Math.min(count, scaling);
      return average3;
    },
    clear() {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot clear`);
      average3 = 0;
      count = 0;
    },
    compute() {
      return average3;
    }
  };
  return ma;
};
var movingAverageTimed = (updateRateMs = 200, value = 0, scaling = 3) => {
  integer(scaling, `aboveZero`, `scaling`);
  integer(updateRateMs, `aboveZero`, `decayRateMs`);
  const mal = movingAverageLight(scaling);
  let timer = 0;
  const reschedule = () => {
    if (timer !== 0)
      clearTimeout(timer);
    timer = setTimeout(decay, updateRateMs);
  };
  const decay = () => {
    mal.add(value);
    if (!mal.isDisposed)
      setTimeout(decay, updateRateMs);
  };
  const ma = {
    add(v) {
      reschedule();
      return mal.add(v);
    },
    dispose() {
      mal.dispose();
    },
    clear: function() {
      mal.clear();
    },
    compute: function() {
      return mal.compute();
    },
    isDisposed: false
  };
  return ma;
};
var movingAverage = (samples = 100, weightingFn) => {
  let disposed = false;
  let q = queueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  const clear3 = () => {
    q = queueMutable({
      capacity: samples,
      discardPolicy: `older`
    });
  };
  const compute = () => {
    if (weightingFn === void 0) {
      return Arrays_exports.average(q.data);
    } else {
      return Arrays_exports.averageWeighted(q.data, weightingFn);
    }
  };
  const add3 = (v) => {
    q.enqueue(v);
    return compute();
  };
  const dispose = () => {
    disposed = true;
  };
  return { add: add3, compute, clear: clear3, dispose, isDisposed: disposed };
};

// src/data/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  constructor() {
    super(...arguments);
    __publicField(this, "lastMark", 0);
  }
  mark() {
    if (this.lastMark > 0) {
      this.seen(window.performance.now() - this.lastMark);
    }
    this.lastMark = window.performance.now();
  }
};
var intervalTracker = (opts) => new IntervalTracker(opts);

// src/data/Flip.ts
var flip = (v) => {
  if (typeof v === `function`)
    v = v();
  number(v, `percentage`, `v`);
  return 1 - v;
};

// src/data/Wrap.ts
var wrapInteger = (v, min4 = 0, max4 = 360) => {
  integer(v, void 0, `v`);
  integer(min4, void 0, `min`);
  integer(max4, void 0, `max`);
  if (v === min4)
    return min4;
  if (v === max4)
    return min4;
  if (v > 0 && v < min4)
    v += min4;
  v -= min4;
  max4 -= min4;
  v = v % max4;
  if (v < 0)
    v = max4 - Math.abs(v) + min4;
  return v + min4;
};
var wrap = (v, min4 = 0, max4 = 1) => {
  number(v, ``, `min`);
  number(min4, ``, `min`);
  number(max4, ``, `max`);
  if (v === min4)
    return min4;
  if (v === max4)
    return min4;
  while (v <= min4 || v >= max4) {
    if (v === max4)
      break;
    if (v === min4)
      break;
    if (v > max4) {
      v = min4 + (v - max4);
    } else if (v < min4) {
      v = max4 - (min4 - v);
    }
  }
  return v;
};
var wrapRange = (min4, max4, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max4 - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min4, max4);
};

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score)
    return -1;
  else if (a.score < b.score)
    return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, opts = {}) => {
  const matchThreshold = opts.matchThreshold ?? 0;
  const debug2 = opts.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0)
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug2)
        console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({ id: last.id, score: last === null ? -1 : similarityFn(last, newD), last }));
    if (scoredLastValues.length === 0) {
      if (debug2)
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug2)
        console.debug(`Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    if (debug2 && top.id !== newD.id)
      console.log(`Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`);
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t4) => results.set(t4.id, t4));
  return Array.from(results.values());
};
var alignById = (fn, opts = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, opts);
    return [...lastData];
  };
  return compute;
};

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create3
});
var PoolUser = class extends SimpleEventEmitter {
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    __publicField(this, "_lastUpdate");
    __publicField(this, "_pool");
    __publicField(this, "_state");
    __publicField(this, "_userExpireAfterMs");
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  toString() {
    if (this.isDisposed)
      return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  keepAlive() {
    if (this._state === `disposed`)
      throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  _dispose(reason) {
    if (this._state === `disposed`)
      return;
    const resource = this.resource;
    const data = resource.data;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  release(reason) {
    if (this.isDisposed)
      throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`);
  }
  get data() {
    if (this.isDisposed)
      throw new Error(`User disposed`);
    return this.resource.data;
  }
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  get isDisposed() {
    return this._state === `disposed`;
  }
  get isValid() {
    if (this.isDisposed || this.isExpired)
      return false;
    if (this.resource.isDisposed)
      return false;
    return true;
  }
};
var Resource = class {
  constructor(pool, data) {
    this.pool = pool;
    __publicField(this, "state");
    __publicField(this, "_data");
    __publicField(this, "users");
    __publicField(this, "capacityPerResource");
    __publicField(this, "resourcesWithoutUserExpireAfterMs");
    __publicField(this, "lastUsersChange");
    this._data = data;
    this.lastUsersChange = 0;
    this.resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.capacityPerResource = pool.capacityPerResource;
    this.users = [];
    this.state = `idle`;
  }
  get data() {
    if (this.state === `disposed`)
      throw new Error(`Resource disposed`);
    return this._data;
  }
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.users.length}, state: ${this.state}) data: ${JSON.stringify(this.data)}`;
  }
  _assign(user) {
    const existing = this.users.find((u) => u === user || u.key === user.key);
    if (existing)
      throw new Error(`User instance already assigned to resource`);
    this.users.push(user);
    this.lastUsersChange = performance.now();
  }
  _release(user) {
    this.users = this.users.filter((u) => u !== user);
    this.pool._release(user);
    this.lastUsersChange = performance.now();
  }
  get hasUserCapacity() {
    return this.usersCount < this.capacityPerResource;
  }
  get usersCount() {
    return this.users.length;
  }
  get isExpiredFromUsers() {
    if (this.resourcesWithoutUserExpireAfterMs <= 0)
      return false;
    if (this.users.length > 0)
      return false;
    return performance.now() > this.resourcesWithoutUserExpireAfterMs + this.lastUsersChange;
  }
  get isDisposed() {
    return this.state === `disposed`;
  }
  dispose(reason) {
    if (this.state === `disposed`)
      return;
    const data = this._data;
    this.state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.users) {
      u._dispose(`resource-${reason}`);
    }
    this.users = [];
    this.lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource)
      this.pool.freeResource(data);
  }
};
var Pool = class {
  constructor(opts = {}) {
    __publicField(this, "_resources");
    __publicField(this, "_users");
    __publicField(this, "capacity");
    __publicField(this, "userExpireAfterMs");
    __publicField(this, "resourcesWithoutUserExpireAfterMs");
    __publicField(this, "capacityPerResource");
    __publicField(this, "fullPolicy");
    __publicField(this, "generateResource");
    __publicField(this, "freeResource");
    __publicField(this, "log");
    this.capacity = opts.capacity ?? -1;
    this.fullPolicy = opts.fullPolicy ?? `error`;
    this.capacityPerResource = opts.capacityPerResource ?? 1;
    this.userExpireAfterMs = opts.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = opts.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = opts.generate;
    this.freeResource = opts.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, opts.debug ?? false);
    const timer = Math.max(this.userExpireAfterMs, this.resourcesWithoutUserExpireAfterMs);
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const res = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + res;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa < bb)
        return 1;
      return -1;
    });
  }
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount)
        return 0;
      if (a.usersCount < b.usersCount)
        return -1;
      return 1;
    });
  }
  addResource(resource) {
    if (resource === void 0)
      throw new Error(`Cannot add undefined resource`);
    if (resource === null)
      throw new Error(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity)
      throw new Error(`Capacity limit (${this.capacity}) reached. Cannot add more.`);
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi6 = new Resource(this, resource);
    this._resources.push(pi6);
    return pi6;
  }
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const res of nuke) {
        res.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(`Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`);
        userKeysToRemove.push(key);
        user._dispose(`invalid`);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(`End: resource len: ${this._resources.length} users: ${this.usersLength}`);
    }
  }
  *resources() {
    const res = [...this._resources];
    for (const r of res) {
      yield r;
    }
  }
  *values() {
    const res = [...this._resources];
    for (const r of res) {
      yield r.data;
    }
  }
  release(userKey, reason) {
    const pi6 = this._users.get(userKey);
    if (!pi6)
      return;
    pi6.release(reason ?? `Pool.release`);
  }
  _release(user) {
    this._users.delete(user.key);
  }
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  hasResource(res) {
    const found = this._resources.find((v) => v.data === res);
    return found !== void 0;
  }
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  _findUser(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      this.log.log(`resource has capacity: ${sorted[0].data}`);
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(`capacity: ${this.capacity} resources: ${this._resources.length}`);
      const newResource = this.addResource(this.generateResource());
      const u = this._assign(userKey, newResource);
      return u;
    }
  }
  get usersLength() {
    return [...this._users.values()].length;
  }
  useValue(userKey) {
    const res = this.use(userKey);
    return res.resource.data;
  }
  use(userKey) {
    const pi6 = this._users.get(userKey);
    if (pi6) {
      pi6.keepAlive();
      return pi6;
    }
    this.maintain();
    const match = this._findUser(userKey);
    if (match)
      return match;
    if (this.fullPolicy === `error`) {
      console.log(this.dumpToString());
      throw new Error(`Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`);
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this._findUser(userKey);
        if (match2)
          return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create3 = (opts = {}) => new Pool(opts);

// src/data/index.ts
var piPi9 = Math.PI * 2;

// src/data/Interpolate.ts
var interpolate7 = (amount, a, b) => {
  const v = (1 - amount) * a + amount * b;
  return v;
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t4 = wrap(bRadians - aRadians, 0, piPi9);
  return interpolate7(amount, aRadians, aRadians + (t4 > Math.PI ? t4 - piPi9 : t4));
};

// src/modulation/Easing.ts
var sqrt4 = Math.sqrt;
var pow3 = Math.pow;
var cos4 = Math.cos;
var pi5 = Math.PI;
var sin4 = Math.sin;
var time = function(nameOrFn, durationMs) {
  return create4(nameOrFn, durationMs, msElapsedTimer);
};
var tick = function(nameOrFn, durationTicks) {
  return create4(nameOrFn, durationTicks, ticksElapsedTimer);
};
var create4 = function(nameOrFn, duration, timerSource) {
  let fn;
  if (typeof nameOrFn === `function`)
    fn = nameOrFn;
  else
    fn = get(nameOrFn);
  if (fn === void 0)
    throw new Error(`Easing function not found: ${nameOrFn}`);
  const timer = relativeTimer(duration, timerSource(), true);
  return {
    get isDone() {
      return timer.isDone;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
    }
  };
};
var fromCubicBezier = (b, d) => (t4) => {
  const s = 1 - t4;
  const s2 = s * s;
  const t22 = t4 * t4;
  const t32 = t22 * t4;
  return 3 * b * s2 * t4 + 3 * d * s * t22 + t32;
};
var mix = (amt, balance, easingA, easingB) => interpolate7(balance, easingA(amt), easingB(amt));
var crossfade = (amt, easingA, easingB) => mix(amt, amt, easingA, easingB);
var get = function(easingName) {
  if (easingName === null)
    throw new Error(`easingName is null`);
  if (easingName === void 0)
    throw new Error(`easingName is undefined`);
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(([k, _v]) => k.toLocaleLowerCase() === name);
  if (found === void 0)
    return found;
  return found[1];
};
var getEasings = function() {
  return Array.from(Object.keys(functions));
};
var gaussian = (stdDev = 0.4) => {
  const a = 1 / sqrt4(2 * pi5);
  const mean = 0.5;
  return (t4) => {
    const f = a / stdDev;
    let p = -2.5;
    let c = (t4 - mean) / stdDev;
    c *= c;
    p *= c;
    const v = f * pow3(Math.E, p);
    if (v > 1)
      return 1;
    if (v < 0)
      return 0;
    return v;
  };
};
var bounceOut = function(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var quintIn = (x) => x * x * x * x * x;
var quintOut = (x) => 1 - pow3(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var functions = {
  arch,
  bell: gaussian(),
  sineIn: (x) => 1 - cos4(x * pi5 / 2),
  sineOut: (x) => sin4(x * pi5 / 2),
  quadIn: (x) => x * x,
  quadOut: (x) => 1 - (1 - x) * (1 - x),
  sineInOut: (x) => -(cos4(pi5 * x) - 1) / 2,
  quadInOut: (x) => x < 0.5 ? 2 * x * x : 1 - pow3(-2 * x + 2, 2) / 2,
  cubicIn: (x) => x * x * x,
  cubicOut: (x) => 1 - pow3(1 - x, 3),
  quartIn: (x) => x * x * x * x,
  quartOut: (x) => 1 - pow3(1 - x, 4),
  quintIn,
  quintOut,
  expoIn: (x) => x === 0 ? 0 : pow3(2, 10 * x - 10),
  expoOut: (x) => x === 1 ? 1 : 1 - pow3(2, -10 * x),
  quintInOut: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow3(-2 * x + 2, 5) / 2,
  expoInOut: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow3(2, 20 * x - 10) / 2 : (2 - pow3(2, -20 * x + 10)) / 2,
  circIn: (x) => 1 - sqrt4(1 - pow3(x, 2)),
  circOut: (x) => sqrt4(1 - pow3(x - 1, 2)),
  backIn: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  backOut: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow3(x - 1, 3) + c1 * pow3(x - 1, 2);
  },
  circInOut: (x) => x < 0.5 ? (1 - sqrt4(1 - pow3(2 * x, 2))) / 2 : (sqrt4(1 - pow3(-2 * x + 2, 2)) + 1) / 2,
  backInOut: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow3(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow3(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  elasticIn: (x) => {
    const c4 = 2 * pi5 / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow3(2, 10 * x - 10) * sin4((x * 10 - 10.75) * c4);
  },
  elasticOut: (x) => {
    const c4 = 2 * pi5 / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow3(2, -10 * x) * sin4((x * 10 - 0.75) * c4) + 1;
  },
  bounceIn: (x) => 1 - bounceOut(1 - x),
  bounceOut,
  elasticInOut: (x) => {
    const c5 = 2 * pi5 / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow3(2, 20 * x - 10) * sin4((20 * x - 11.125) * c5)) / 2 : pow3(2, -20 * x + 10) * sin4((20 * x - 11.125) * c5) / 2 + 1;
  },
  bounceInOut: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
};

// src/Random.ts
var defaultRandom = Math.random;
var weighted = (easingName = `quadIn`, rand = defaultRandom) => {
  const r = rand();
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing function '${easingName}' not found.`);
  return easingFn(r);
};
var weightedSkewed = (easingName = `quadIn`, rand = defaultRandom) => () => weighted(easingName, rand);
var weightedInteger = (minOrMax, maxOrEasing, easing, rand = defaultRandom) => {
  number(minOrMax);
  let min4, max4, easingName;
  easingName = `quadIn`;
  min4 = 0;
  if (maxOrEasing === void 0) {
    max4 = minOrMax;
  } else {
    if (typeof maxOrEasing === `number`) {
      min4 = minOrMax;
      max4 = maxOrEasing;
      if (easing !== void 0)
        easingName = easing;
    } else if (typeof maxOrEasing === `string`) {
      max4 = minOrMax;
      easingName = maxOrEasing;
    } else {
      throw new Error(`Unexpected value type for maxOrEasing: ${maxOrEasing}`);
    }
  }
  if (easing !== void 0)
    easingName = easing;
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing '${easingName}' not found`);
  number(min4);
  if (max4 <= min4)
    throw new Error(`Max should be greater than min`);
  const r = clamp(easingFn(rand()));
  return Math.floor(r * (max4 - min4)) + min4;
};
var gaussian2 = (skew = 1) => {
  const min4 = 0;
  const max4 = 1;
  let u = 0, v = 0;
  while (u === 0)
    u = Math.random();
  while (v === 0)
    v = Math.random();
  let num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  num = num / 10 + 0.5;
  if (num > 1 || num < 0) {
    num = gaussian2(skew);
  } else {
    num = Math.pow(num, skew);
    num *= max4 - min4;
    num += min4;
  }
  return num;
};
var gaussianSkewed = (skew = 1) => () => gaussian2(skew);
var integer2 = (max4, min4) => {
  let reverse = false;
  if (min4 === void 0) {
    if (max4 < 0) {
      max4 = Math.abs(max4);
      reverse = true;
    }
    min4 = 0;
  }
  const amt = max4 - min4;
  const r = Math.floor(Math.random() * amt) + min4;
  if (reverse)
    return -r;
  return r;
};
var float = (max4 = 1, min4 = 0) => Math.random() * (max4 - min4) + min4;
var string = (length5) => Math.random().toString(36).substring(2, length5 + 2);
var shortGuid = () => {
  const firstPart = Math.random() * 46656 | 0;
  const secondPart = Math.random() * 46656 | 0;
  const firstPartStr = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartStr = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartStr + secondPartStr;
};

// src/collections/Arrays.ts
var guardArray = (array3, paramName = `?`) => {
  if (array3 === void 0)
    throw new Error(`Param '${paramName}' is undefined. Expected array.`);
  if (array3 === null)
    throw new Error(`Param '${paramName}' is null. Expected array.`);
  if (!Array.isArray(array3))
    throw new Error(`Param '${paramName}' not an array as expected`);
};
var guardIndex = (array3, index, paramName = `index`) => {
  guardArray(array3);
  integer(index, `positive`, paramName);
  if (index > array3.length - 1)
    throw new Error(`'${paramName}' ${index} beyond array max of ${array3.length - 1}`);
};
var areValuesIdentical = (array3, equality) => {
  if (!Array.isArray(array3))
    throw new Error(`Param 'array' is not an array.`);
  if (array3.length === 0)
    return true;
  const eq = equality === void 0 ? isEqualValueDefault : equality;
  const a = array3[0];
  const r = array3.some((v) => !eq(a, v));
  if (r)
    return false;
  return true;
};
var intersection = (a1, a2, equality = isEqualDefault) => a1.filter((e1) => a2.some((e2) => equality(e1, e2)));
var flatten = (array3) => Array.prototype.concat.apply([], [...array3]);
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a)))
    throw new Error(`All parameters must be an array`);
  const lengths3 = arrays.map((a) => a.length);
  if (!areValuesIdentical(lengths3))
    throw new Error(`Arrays must be of same length`);
  const ret = [];
  const len = lengths3[0];
  for (let i = 0; i < len; i++) {
    ret.push(arrays.map((a) => a[i]));
  }
  return ret;
};
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a)))
    throw new Error(`All parameters must be an array`);
  const lengths3 = arrays.map((a) => a.length);
  if (!areValuesIdentical(lengths3))
    throw new Error(`Arrays must be of same length`);
  const ret = [];
  const len = lengths3[0];
  for (let i = 0; i < len; i++) {
    for (let p = 0; p < arrays.length; p++) {
      ret.push(arrays[p][i]);
    }
  }
  return ret;
};
var ensureLength = (data, length5, expand = `undefined`) => {
  if (data === void 0)
    throw new Error(`Data undefined`);
  if (!Array.isArray(data))
    throw new Error(`data is not an array`);
  if (data.length === length5)
    return [...data];
  if (data.length > length5) {
    return data.slice(0, length5);
  }
  const d = [...data];
  const add3 = length5 - d.length;
  for (let i = 0; i < add3; i++) {
    if (expand === `undefined`) {
      d.push(void 0);
    } else if (expand === `repeat`) {
      d.push(data[i % data.length]);
    } else if (expand === `first`) {
      d.push(data[0]);
    } else if (expand === `last`) {
      d.push(data[data.length - 1]);
    }
  }
  return d;
};
var filterBetween = (array3, predicate, startIndex, endIndex) => {
  guardArray(array3);
  if (typeof startIndex === `undefined`)
    startIndex = 0;
  if (typeof endIndex === `undefined`)
    endIndex = array3.length - 1;
  guardIndex(array3, startIndex, `startIndex`);
  guardIndex(array3, endIndex, `endIndex`);
  const t4 = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (predicate(array3[i], i, array3))
      t4.push(array3[i]);
  }
  return t4;
};
var randomIndex = (array3, rand = defaultRandom) => Math.floor(rand() * array3.length);
var randomElement = (array3, rand = defaultRandom) => {
  guardArray(array3, `array`);
  return array3[Math.floor(rand() * array3.length)];
};
var randomPluck = (array3, mutate = false, rand = defaultRandom) => {
  if (array3 === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array3))
    throw new Error(`'array' param is not an array`);
  if (array3.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array3, rand);
  if (mutate) {
    return {
      value: array3[index],
      array: array3.splice(index, 1)
    };
  } else {
    const t4 = [...array3];
    t4.splice(index, 1);
    return {
      value: array3[index],
      array: t4
    };
  }
};
var shuffle = (dataToShuffle, rand = defaultRandom) => {
  const array3 = [...dataToShuffle];
  for (let i = array3.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array3[i], array3[j]] = [array3[j], array3[i]];
  }
  return array3;
};
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv)
    return -1;
  if (av > bv)
    return 1;
  return 0;
});
var without = (data, value, comparer = isEqualDefault) => data.filter((v) => !comparer(v, value));
var until = (data, predicate, initial) => {
  const ret = [];
  let total3 = initial;
  for (let i = 0; i < data.length; i++) {
    const [stop, acc] = predicate(data[i], total3);
    if (stop)
      break;
    total3 = acc;
    ret.push(data[i]);
  }
  return ret;
};
var remove2 = (data, index) => {
  if (!Array.isArray(data))
    throw new Error(`'data' parameter should be an array`);
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};
var groupBy = (array3, grouper) => array3.reduce((store, item) => {
  const key = grouper(item);
  const val = store.get(key);
  if (val === void 0) {
    store.set(key, [item]);
  } else {
    val.push(item);
  }
  return store;
}, /* @__PURE__ */ new Map());
var sample = (array3, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array3.length * amount;
    subsampleSteps = Math.round(array3.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  integer(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array3.length - 1)
    throw new Error(`Subsample steps exceeds array length`);
  const r = [];
  for (let i = subsampleSteps - 1; i < array3.length; i += subsampleSteps) {
    r.push(array3[i]);
  }
  return r;
};
function chunks(arr, size) {
  const output = [];
  for (let i = 0; i < arr.length; i += size) {
    output.push(arr.slice(i, i + size));
  }
  return output;
}
var mergeByKey2 = (keyFn, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0)
        continue;
      const mk = keyFn(mv);
      let v = result.get(mk);
      if (v) {
        v = reconcile(v, mv);
      } else {
        v = mv;
      }
      result.set(mk, v);
    }
  }
  return [...result.values()];
};
var reducePairwise = (arr, reducer, initial) => {
  guardArray(arr, `arr`);
  if (arr.length < 2)
    return initial;
  for (let i = 0; i < arr.length - 1; i++) {
    initial = reducer(initial, arr[i], arr[i + 1]);
  }
  return initial;
};
var pushUnique = (input, values, comparer) => {
  const c = comparer ?? isEqualDefault;
  const ret = [...input];
  for (const v of values) {
    const found = ret.find((i) => c(i, v));
    if (found)
      continue;
    ret.push(v);
  }
  return ret;
};

// src/KeyValue.ts
var byKey = (reverse = false) => (0, import_function.pipe)(
  reverse ? (0, import_Ord.reverse)(S.Ord) : S.Ord,
  (0, import_Ord.contramap)((v) => v[0])
);
var byValueString = (reverse = false) => (0, import_function.pipe)(
  reverse ? (0, import_Ord.reverse)(S.Ord) : S.Ord,
  (0, import_Ord.contramap)((v) => v[1])
);
var byValueNumber = (reverse = false) => (0, import_function.pipe)(
  reverse ? (0, import_Ord.reverse)(N.Ord) : N.Ord,
  (0, import_Ord.contramap)((v) => v[1])
);
var sortByKey = (reverse = false) => (0, import_Array.sort)(byKey(reverse));
var sortByValueString = (reverse = false) => (0, import_Array.sort)(byValueString(reverse));
var sortByValueNumber = (reverse = false) => (0, import_Array.sort)(byValueNumber(reverse));
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`:
      return sortByValueNumber(false);
    case `valueReverse`:
      return sortByValueNumber(true);
    case `key`:
      return sortByKey(false);
    case `keyReverse`:
      return sortByKey(true);
    default:
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, valueReverse, key or keyReverse`);
  }
};
var minMaxAvg2 = (entries, conversionFn) => {
  if (conversionFn === void 0)
    conversionFn = (v) => v[1];
  const values = entries.map(conversionFn);
  return minMaxAvg(values);
};

export {
  weight,
  validNumbers,
  dotProduct,
  average,
  averageWeighted,
  min,
  maxIndex,
  minIndex,
  max,
  total,
  maxFast,
  totalFast,
  minFast,
  minMaxAvg,
  scale,
  scaleClamped,
  scalePercentages,
  scalePercent,
  Normalise_exports,
  byValueString,
  sortByKey,
  sortByValueString,
  sortByValueNumber,
  getSorter,
  minMaxAvg2,
  KeyValue_exports,
  between,
  indexOfCharCode,
  omitChars,
  splitByLength,
  untilMatch,
  unwrap,
  lineSpan,
  splitRanges,
  countCharsFromStart,
  startsEnds,
  htmlEntities,
  Text_exports,
  create,
  ExpiringMap,
  hasKeyValue,
  deleteByValue,
  getOrGenerate,
  getOrGenerateSync,
  addKeepingExisting,
  sortByValue,
  sortByValueProperty,
  hasAnyValue,
  filter,
  toArray,
  fromIterable,
  fromObject,
  addObject,
  find,
  mapToObjTransform,
  zipKeyValue,
  transformMap,
  toObject,
  mapToArray,
  mergeByKey,
  Map_exports,
  randomHue,
  Colour_exports,
  Debug_exports,
  ifNaN,
  mapObject,
  isPowerOfTwo,
  relativeDifference,
  getFieldByPath,
  getFieldPaths,
  roundUpToMultiple,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault,
  runningiOS,
  defaultComparer,
  Util_exports,
  circularArray,
  MapOfMutableImpl,
  mapArray,
  mapSet,
  mapCircularMutable,
  stack,
  stackMutable,
  Stack_exports,
  queue,
  queueMutable,
  Queue_exports,
  map,
  mapMutable,
  collections_exports,
  Line_exports,
  TrackerBase,
  NumberTracker,
  numberTracker,
  average2,
  averageWeighted2,
  min2,
  max2,
  total2,
  isValid,
  tracker,
  filter2,
  quantiseEvery,
  linearSpace,
  round,
  rounder,
  Numbers_exports,
  Point_exports,
  Arc_exports,
  Bezier_exports,
  Circle_exports,
  CompoundPath_exports,
  Grid_exports,
  Path_exports,
  Rect_exports,
  Ellipse_exports,
  Polar_exports,
  Shape_exports,
  Vector_exports,
  Waypoint_exports,
  Sphere_exports,
  Scaler_exports,
  SurfacePoints_exports,
  Triangle_exports,
  degreeToRadian,
  radianToDegree,
  radiansFromAxisX,
  geometry_exports,
  Codec,
  StringReceiveBuffer,
  StringWriteBuffer,
  NordicBleDevice_exports,
  AudioVisualiser_exports,
  AudioAnalyser_exports,
  Serial_exports,
  Espruino_exports,
  Camera_exports,
  VideoFile_exports,
  Video_exports,
  FrameProcessor,
  io_exports,
  fullSizeElement,
  canvasHelper,
  fullSizeCanvas,
  cycleCssClass,
  parentSize,
  getTranslation,
  parentSizeCanvas,
  windowResize,
  resolveEl,
  createAfter,
  createIn,
  dataTableList,
  dataTable,
  clear,
  themeChangeObservable,
  resizeObservable,
  copyToClipboard,
  reconcileChildren,
  Drawing_exports,
  SvgElements_exports,
  createOrResolve,
  remove,
  clear2,
  createEl,
  applyPathOpts,
  applyOpts2 as applyOpts,
  applyStrokeOpts,
  getBounds,
  setBounds,
  makeHelper2 as makeHelper,
  Svg_exports,
  Plot_exports,
  SceneGraph_exports,
  Plot2_exports,
  Palette_exports,
  visual_exports,
  log,
  rx,
  textAreaKeyboard,
  checkbox,
  numeric,
  button,
  select,
  Forms_exports,
  TrackedValueMap,
  PointTracker,
  TrackedPointMap,
  pointsTracker,
  pointTracker,
  pointerVisualise,
  defaultErrorHandler2 as defaultErrorHandler,
  DragDrop_exports,
  dom_exports,
  defaultAdsrOpts,
  adsr,
  adsrSample,
  Forces_exports,
  Oscillator_exports,
  jitter,
  modulation_exports,
  FrequencyMutable,
  frequencyMutable,
  movingAverageLight,
  movingAverageTimed,
  movingAverage,
  IntervalTracker,
  intervalTracker,
  flip,
  wrapInteger,
  wrap,
  wrapRange,
  Correlate_exports,
  Pool_exports,
  piPi9 as piPi,
  data_exports,
  interpolate7 as interpolate,
  interpolateAngle,
  Easing_exports,
  defaultRandom,
  weighted,
  weightedSkewed,
  weightedInteger,
  gaussian2 as gaussian,
  gaussianSkewed,
  integer2 as integer,
  float,
  string,
  shortGuid,
  Random_exports,
  guardArray,
  guardIndex,
  areValuesIdentical,
  intersection,
  flatten,
  zip,
  interleave,
  ensureLength,
  filterBetween,
  randomIndex,
  randomElement,
  randomPluck,
  shuffle,
  sortByNumericProperty,
  without,
  until,
  remove2,
  groupBy,
  sample,
  chunks,
  mergeByKey2,
  reducePairwise,
  pushUnique,
  Arrays_exports
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=chunk-2YPLNEPD.js.map