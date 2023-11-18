import {
  minMaxAvg
} from "./chunk-HR35CHTB.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-VE7DK22H.js";

// node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/fp-ts/lib/function.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dual = exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
    var getBooleanAlgebra = function(B) {
      return function() {
        return {
          meet: function(x, y) {
            return function(a) {
              return B.meet(x(a), y(a));
            };
          },
          join: function(x, y) {
            return function(a) {
              return B.join(x(a), y(a));
            };
          },
          zero: function() {
            return B.zero;
          },
          one: function() {
            return B.one;
          },
          implies: function(x, y) {
            return function(a) {
              return B.implies(x(a), y(a));
            };
          },
          not: function(x) {
            return function(a) {
              return B.not(x(a));
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
    var apply = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports.apply = apply;
    function identity(a) {
      return a;
    }
    exports.identity = identity;
    exports.unsafeCoerce = identity;
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
    function flip(f) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (args.length > 1) {
          return f(args[1], args[0]);
        }
        return function(a) {
          return f(a)(args[0]);
        };
      };
    }
    exports.flip = flip;
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
      var t = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
      }
      return t;
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
        empty: identity
      };
    };
    exports.getEndomorphismMonoid = getEndomorphismMonoid;
    var dual = function(arity, body) {
      var isDataFirst = typeof arity === "number" ? function(args) {
        return args.length >= arity;
      } : arity;
      return function() {
        var args = Array.from(arguments);
        if (isDataFirst(arguments)) {
          return body.apply(this, args);
        }
        return function(self) {
          return body.apply(void 0, __spreadArray([self], args, false));
        };
      };
    };
    exports.dual = dual;
  }
});

// node_modules/fp-ts/lib/internal.js
var require_internal = __commonJS({
  "node_modules/fp-ts/lib/internal.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.flatMapReader = exports.flatMapTask = exports.flatMapIO = exports.flatMapEither = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
    var function_1 = require_function();
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
      return __spreadArray([as[0]], as.slice(1), true);
    };
    exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
    var liftNullable = function(F) {
      return function(f, onNullable) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither(o == null ? (0, exports.left)(onNullable.apply(void 0, a)) : (0, exports.right)(o));
        };
      };
    };
    exports.liftNullable = liftNullable;
    var liftOption = function(F) {
      return function(f, onNone) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither((0, exports.isNone)(o) ? (0, exports.left)(onNone.apply(void 0, a)) : (0, exports.right)(o.value));
        };
      };
    };
    exports.liftOption = liftOption;
    var flatMapNullable = function(F, M) {
      return (0, function_1.dual)(3, function(self, f, onNullable) {
        return M.flatMap(self, (0, exports.liftNullable)(F)(f, onNullable));
      });
    };
    exports.flatMapNullable = flatMapNullable;
    var flatMapOption = function(F, M) {
      return (0, function_1.dual)(3, function(self, f, onNone) {
        return M.flatMap(self, (0, exports.liftOption)(F)(f, onNone));
      });
    };
    exports.flatMapOption = flatMapOption;
    var flatMapEither = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromEither(f(a));
        });
      });
    };
    exports.flatMapEither = flatMapEither;
    var flatMapIO = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromIO(f(a));
        });
      });
    };
    exports.flatMapIO = flatMapIO;
    var flatMapTask = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromTask(f(a));
        });
      });
    };
    exports.flatMapTask = flatMapTask;
    var flatMapReader = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromReader(f(a));
        });
      });
    };
    exports.flatMapReader = flatMapReader;
  }
});

// node_modules/fp-ts/lib/Apply.js
var require_Apply = __commonJS({
  "node_modules/fp-ts/lib/Apply.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
    var function_1 = require_function();
    var _ = __importStar(require_internal());
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
    function apFirst(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function(a) {
            return function() {
              return a;
            };
          }), second);
        };
      };
    }
    exports.apFirst = apFirst;
    function apSecond(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function() {
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
    exports.bind = exports.tap = exports.chainFirst = void 0;
    function chainFirst(M) {
      var tapM = tap(M);
      return function(f) {
        return function(first) {
          return tapM(first, f);
        };
      };
    }
    exports.chainFirst = chainFirst;
    function tap(M) {
      return function(first, f) {
        return M.chain(first, function(a) {
          return M.map(f(a), function() {
            return a;
          });
        });
      };
    }
    exports.tap = tap;
    function bind(M) {
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
    exports.bind = bind;
  }
});

// node_modules/fp-ts/lib/FromEither.js
var require_FromEither = __commonJS({
  "node_modules/fp-ts/lib/FromEither.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tapEither = exports.filterOrElse = exports.chainFirstEitherK = exports.chainEitherK = exports.fromEitherK = exports.chainOptionK = exports.fromOptionK = exports.fromPredicate = exports.fromOption = void 0;
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    var _ = __importStar(require_internal());
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
        var from = fromOptionF(onNone);
        return function(f) {
          return (0, function_1.flow)(f, from);
        };
      };
    }
    exports.fromOptionK = fromOptionK;
    function chainOptionK(F, M) {
      var fromOptionKF = fromOptionK(F);
      return function(onNone) {
        var from = fromOptionKF(onNone);
        return function(f) {
          return function(ma) {
            return M.chain(ma, from(f));
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
      var tapEitherM = tapEither(F, M);
      return function(f) {
        return function(ma) {
          return tapEitherM(ma, f);
        };
      };
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
    function tapEither(F, M) {
      var fromEither = fromEitherK(F);
      var tapM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return tapM(self, fromEither(f));
      };
    }
    exports.tapEither = tapEither;
  }
});

// node_modules/fp-ts/lib/Functor.js
var require_Functor = __commonJS({
  "node_modules/fp-ts/lib/Functor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asUnit = exports.as = exports.getFunctorComposition = exports.let = exports.bindTo = exports.flap = exports.map = void 0;
    var function_1 = require_function();
    function map(F, G) {
      return function(f) {
        return function(fa) {
          return F.map(fa, function(ga) {
            return G.map(ga, f);
          });
        };
      };
    }
    exports.map = map;
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
    function let_(F) {
      return function(name, f) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
          });
        };
      };
    }
    exports.let = let_;
    function getFunctorComposition(F, G) {
      var _map = map(F, G);
      return {
        map: function(fga, f) {
          return (0, function_1.pipe)(fga, _map(f));
        }
      };
    }
    exports.getFunctorComposition = getFunctorComposition;
    function as(F) {
      return function(self, b) {
        return F.map(self, function() {
          return b;
        });
      };
    }
    exports.as = as;
    function asUnit(F) {
      var asM = as(F);
      return function(self) {
        return asM(self, void 0);
      };
    }
    exports.asUnit = asUnit;
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
        return eqs.every(function(E, i) {
          return E.equals(first[i], second[i]);
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
    var empty = {
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
        empty
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
    var equalsDefault = function(compare2) {
      return function(first, second) {
        return first === second || compare2(first, second) === 0;
      };
    };
    exports.equalsDefault = equalsDefault;
    var fromCompare = function(compare2) {
      return {
        equals: (0, exports.equalsDefault)(compare2),
        compare: function(first, second) {
          return first === second ? 0 : compare2(first, second);
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
    var min = function(O) {
      return function(first, second) {
        return first === second || O.compare(first, second) < 1 ? first : second;
      };
    };
    exports.min = min;
    var max = function(O) {
      return function(first, second) {
        return first === second || O.compare(first, second) > -1 ? first : second;
      };
    };
    exports.max = max;
    var clamp = function(O) {
      var minO = (0, exports.min)(O);
      var maxO = (0, exports.max)(O);
      return function(low, hi) {
        return function(a) {
          return maxO(minO(a, hi), low);
        };
      };
    };
    exports.clamp = clamp;
    var between = function(O) {
      var ltO = (0, exports.lt)(O);
      var gtO = (0, exports.gt)(O);
      return function(low, hi) {
        return function(a) {
          return ltO(a, low) || gtO(a, hi) ? false : true;
        };
      };
    };
    exports.between = between;
    exports.getTupleOrd = exports.tuple;
    exports.getDualOrd = exports.reverse;
    exports.ord = exports.Contravariant;
    function compare(first, second) {
      return first < second ? -1 : first > second ? 1 : 0;
    }
    var strictOrd = {
      equals: Eq_1.eqStrict.equals,
      compare
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
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.semigroupProduct = exports.semigroupSum = exports.semigroupString = exports.getFunctionSemigroup = exports.semigroupAny = exports.semigroupAll = exports.fold = exports.getIntercalateSemigroup = exports.getMeetSemigroup = exports.getJoinSemigroup = exports.getDualSemigroup = exports.getStructSemigroup = exports.getTupleSemigroup = exports.getFirstSemigroup = exports.getLastSemigroup = exports.getObjectSemigroup = exports.semigroupVoid = exports.concatAll = exports.last = exports.first = exports.intercalate = exports.tuple = exports.struct = exports.reverse = exports.constant = exports.max = exports.min = void 0;
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    var M = __importStar(require_Magma());
    var Or = __importStar(require_Ord());
    var min = function(O) {
      return {
        concat: Or.min(O)
      };
    };
    exports.min = min;
    var max = function(O) {
      return {
        concat: Or.max(O)
      };
    };
    exports.max = max;
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
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reduceRight = exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
    exports.groupSort = exports.chain = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = void 0;
    exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = exports.filter = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var Eq_1 = require_Eq();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var Ord_1 = require_Ord();
    var Se = __importStar(require_Semigroup());
    exports.empty = _.emptyReadonlyArray;
    exports.isNonEmpty = _.isNonEmpty;
    var isOutOfBound = function(i, as) {
      return i < 0 || i >= as.length;
    };
    exports.isOutOfBound = isOutOfBound;
    var prependW = function(head) {
      return function(tail) {
        return __spreadArray([head], tail, true);
      };
    };
    exports.prependW = prependW;
    exports.prepend = exports.prependW;
    var appendW = function(end) {
      return function(init2) {
        return __spreadArray(__spreadArray([], init2, true), [end], false);
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
    var uniq = function(E) {
      return function(as) {
        if (as.length === 1) {
          return as;
        }
        var out = [(0, exports.head)(as)];
        var rest = (0, exports.tail)(as);
        var _loop_1 = function(a2) {
          if (out.every(function(o) {
            return !E.equals(o, a2);
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
    var union = function(E) {
      var uniqE = (0, exports.uniq)(E);
      return function(second) {
        return function(first) {
          return uniqE((0, function_1.pipe)(first, concat(second)));
        };
      };
    };
    exports.union = union;
    var rotate = function(n) {
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
    exports.rotate = rotate;
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
    var range = function(start, end) {
      return start <= end ? (0, exports.makeBy)(function(i) {
        return start + i;
      })(end - start + 1) : [start];
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
      return as.length === 1 ? as : __spreadArray([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
    };
    exports.reverse = reverse;
    function group(E) {
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
          if (E.equals(a, head)) {
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
    exports.group = group;
    var groupBy = function(f) {
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
    exports.groupBy = groupBy;
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
    function zip(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip;
    var unzip = function(abs) {
      var fa = [abs[0][0]];
      var fb = [abs[0][1]];
      for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
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
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
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
      return (0, exports.flatMap)(function(f) {
        return (0, function_1.pipe)(as, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    exports.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function(i, a) {
        return f(a, i);
      }));
    });
    var extend = function(f) {
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
    exports.extend = extend;
    exports.duplicate = /* @__PURE__ */ (0, exports.extend)(function_1.identity);
    exports.flatten = /* @__PURE__ */ (0, exports.flatMap)(function_1.identity);
    var map = function(f) {
      return (0, exports.mapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.map = map;
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
    var reduce = function(b, f) {
      return (0, exports.reduceWithIndex)(b, function(_2, b2, a) {
        return f(b2, a);
      });
    };
    exports.reduce = reduce;
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
    var getEq = function(E) {
      return (0, Eq_1.fromEquals)(function(xs, ys) {
        return xs.length === ys.length && xs.every(function(x, i) {
          return E.equals(x, ys[i]);
        });
      });
    };
    exports.getEq = getEq;
    var getUnionSemigroup = function(E) {
      var unionE = (0, exports.union)(E);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    exports.Functor = {
      URI: exports.URI,
      map: _map
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: exports.flatMap
    };
    exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
    exports.Monad = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap
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
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map,
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
      map: _map,
      alt: _alt
    };
    exports.Comonad = {
      URI: exports.URI,
      map: _map,
      extend: _extend,
      extract: exports.extract
    };
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports.Functor);
    exports.let = let_;
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.head = exports.extract;
    exports.tail = _.tail;
    var last = function(as) {
      return as[as.length - 1];
    };
    exports.last = last;
    var init = function(as) {
      return as.slice(0, -1);
    };
    exports.init = init;
    var min = function(O) {
      var S2 = Se.min(O);
      return function(as) {
        return as.reduce(S2.concat);
      };
    };
    exports.min = min;
    var max = function(O) {
      var S2 = Se.max(O);
      return function(as) {
        return as.reduce(S2.concat);
      };
    };
    exports.max = max;
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
        return __spreadArray([f((0, exports.head)(as))], (0, exports.tail)(as), true);
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
    exports.chain = exports.flatMap;
    function groupSort(O) {
      var sortO = (0, exports.sort)(O);
      var groupO = group(O);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : exports.empty;
      };
    }
    exports.groupSort = groupSort;
    function filter(predicate) {
      return (0, exports.filterWithIndex)(function(_2, a) {
        return predicate(a);
      });
    }
    exports.filter = filter;
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
    var snoc = function(init2, end) {
      return (0, function_1.pipe)(init2, concat([end]));
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
      map: _map,
      mapWithIndex: _mapWithIndex,
      ap: _ap,
      chain: exports.flatMap,
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
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.foldMap = exports.foldMapWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.of = exports.copy = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromArray = exports.fromReadonlyNonEmptyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = void 0;
    exports.chain = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = void 0;
    exports.nonEmptyArray = exports.fold = exports.prependToAll = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = exports.filter = exports.groupSort = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var Ord_1 = require_Ord();
    var RNEA = __importStar(require_ReadonlyNonEmptyArray());
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
        return __spreadArray([head], tail2, true);
      };
    };
    exports.prependW = prependW;
    exports.prepend = exports.prependW;
    var appendW = function(end) {
      return function(init2) {
        return __spreadArray(__spreadArray([], init2, true), [end], false);
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
    var uniq = function(E) {
      return function(as) {
        if (as.length === 1) {
          return (0, exports.copy)(as);
        }
        var out = [(0, exports.head)(as)];
        var rest = (0, exports.tail)(as);
        var _loop_1 = function(a2) {
          if (out.every(function(o) {
            return !E.equals(o, a2);
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
    var union = function(E) {
      var uniqE = (0, exports.uniq)(E);
      return function(second) {
        return function(first) {
          return uniqE((0, function_1.pipe)(first, concat(second)));
        };
      };
    };
    exports.union = union;
    var rotate = function(n) {
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
    exports.rotate = rotate;
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
    var range = function(start, end) {
      return start <= end ? (0, exports.makeBy)(function(i) {
        return start + i;
      })(end - start + 1) : [start];
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
      return __spreadArray([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
    };
    exports.reverse = reverse;
    function group(E) {
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
          if (E.equals(a, head)) {
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
    exports.group = group;
    var groupBy = function(f) {
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
    exports.groupBy = groupBy;
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
    function zip(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip;
    var unzip = function(abs) {
      var fa = [abs[0][0]];
      var fb = [abs[0][1]];
      for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
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
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
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
      return (0, exports.flatMap)(function(f) {
        return (0, function_1.pipe)(as, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    exports.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function(i, a) {
        return f(a, i);
      }));
    });
    var extend = function(f) {
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
    exports.extend = extend;
    exports.duplicate = (0, exports.extend)(function_1.identity);
    exports.flatten = (0, exports.flatMap)(function_1.identity);
    var map = function(f) {
      return (0, exports.mapWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.map = map;
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
    var getUnionSemigroup = function(E) {
      var unionE = (0, exports.union)(E);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    exports.Functor = {
      URI: exports.URI,
      map: _map
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: exports.flatMap
    };
    exports.chainFirst = /* @__PURE__ */ (0, Chain_1.chainFirst)(exports.Chain);
    exports.Monad = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap
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
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map,
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
      map: _map,
      alt: _alt
    };
    exports.Comonad = {
      URI: exports.URI,
      map: _map,
      extend: _extend,
      extract: exports.extract
    };
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports.Functor);
    exports.let = let_;
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.head = RNEA.head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports.tail = tail;
    exports.last = RNEA.last;
    var init = function(as) {
      return as.slice(0, -1);
    };
    exports.init = init;
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
        return __spreadArray([f((0, exports.head)(as))], (0, exports.tail)(as), true);
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
    exports.chain = exports.flatMap;
    function groupSort(O) {
      var sortO = (0, exports.sort)(O);
      var groupO = group(O);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : [];
      };
    }
    exports.groupSort = groupSort;
    function filter(predicate) {
      return (0, exports.filterWithIndex)(function(_2, a) {
        return predicate(a);
      });
    }
    exports.filter = filter;
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
    var snoc = function(init2, end) {
      return (0, function_1.pipe)(init2, (0, exports.append)(end));
    };
    exports.snoc = snoc;
    exports.prependToAll = exports.prependAll;
    exports.fold = RNEA.concatAll;
    exports.nonEmptyArray = {
      URI: exports.URI,
      of: exports.of,
      map: _map,
      mapWithIndex: _mapWithIndex,
      ap: _ap,
      chain: exports.flatMap,
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
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f));
    };
    var _bimap = function(fa, g, f) {
      return (0, function_1.pipe)(fa, (0, exports.bimap)(g, f));
    };
    var map = function(f) {
      return function(fa) {
        return (0, exports.separated)((0, exports.left)(fa), f((0, exports.right)(fa)));
      };
    };
    exports.map = map;
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
      map: _map
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
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterE = exports.witherDefault = exports.wiltDefault = void 0;
    var _ = __importStar(require_internal());
    function wiltDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.separate);
        };
      };
    }
    exports.wiltDefault = wiltDefault;
    function witherDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.compact);
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
    function guard(F, P) {
      return function(b) {
        return b ? P.of(void 0) : F.zero();
      };
    }
    exports.guard = guard;
  }
});

// node_modules/fp-ts/lib/ReadonlyArray.js
var require_ReadonlyArray = __commonJS({
  "node_modules/fp-ts/lib/ReadonlyArray.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
    exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.foldMap = exports.reduce = exports.foldMapWithIndex = exports.duplicate = exports.extend = exports.filterWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.flatten = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.zero = exports.of = exports._chainRecBreadthFirst = exports._chainRecDepthFirst = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = void 0;
    exports.toArray = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.Witherable = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.chainFirst = exports.Monad = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = void 0;
    exports.readonlyArray = exports.prependToAll = exports.snoc = exports.cons = exports.range = exports.chain = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.intercalate = exports.exists = exports.some = exports.every = exports.empty = exports.fromArray = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var Eq_1 = require_Eq();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var N2 = __importStar(require_number());
    var Ord_1 = require_Ord();
    var RNEA = __importStar(require_ReadonlyNonEmptyArray());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    var Zero_1 = require_Zero();
    var isEmpty = function(as) {
      return as.length === 0;
    };
    exports.isEmpty = isEmpty;
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
    var init = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(RNEA.init(as)) : _.none;
    };
    exports.init = init;
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
        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init2 = _a[0], rest = _a[1];
        return { init: init2, rest };
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
    function zip(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip;
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
    var rotate = function(n) {
      var f = RNEA.rotate(n);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : as;
      };
    };
    exports.rotate = rotate;
    function elem(E) {
      return function(a, as) {
        if (as === void 0) {
          var elemE_1 = elem(E);
          return function(as2) {
            return elemE_1(a, as2);
          };
        }
        var predicate = function(element) {
          return E.equals(element, a);
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
    var uniq = function(E) {
      var f = RNEA.uniq(E);
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
        return (0, exports.isNonEmpty)(input2) ? (0, exports.flatMap)(RNEA.head(input2), function(a) {
          return go((0, function_1.pipe)(scope, (0, exports.append)(a)), RNEA.tail(input2));
        }) : g.apply(void 0, scope) ? [f.apply(void 0, scope)] : exports.empty;
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
    function union(E) {
      var unionE = RNEA.union(E);
      return function(first, second) {
        if (second === void 0) {
          var unionE_1 = union(E);
          return function(second2) {
            return unionE_1(second2, first);
          };
        }
        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second) ? unionE(second)(first) : (0, exports.isNonEmpty)(first) ? first : second;
      };
    }
    exports.union = union;
    function intersection(E) {
      var elemE = elem(E);
      return function(xs, ys) {
        if (ys === void 0) {
          var intersectionE_1 = intersection(E);
          return function(ys2) {
            return intersectionE_1(ys2, xs);
          };
        }
        return xs.filter(function(a) {
          return elemE(a, ys);
        });
      };
    }
    exports.intersection = intersection;
    function difference(E) {
      var elemE = elem(E);
      return function(xs, ys) {
        if (ys === void 0) {
          var differenceE_1 = difference(E);
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
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
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
    var zero = function() {
      return exports.empty;
    };
    exports.zero = zero;
    var altW = function(that) {
      return function(fa) {
        return fa.concat(that());
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    var ap = function(fa) {
      return (0, exports.flatMap)(function(f) {
        return (0, function_1.pipe)(fa, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    exports.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function(i, a) {
        return f(a, i);
      }));
    });
    exports.flatten = (0, exports.flatMap)(function_1.identity);
    var map = function(f) {
      return function(fa) {
        return fa.map(function(a) {
          return f(a);
        });
      };
    };
    exports.map = map;
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
    var filter = function(predicate) {
      return function(as) {
        return as.filter(predicate);
      };
    };
    exports.filter = filter;
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
    var extend = function(f) {
      return function(wa) {
        return wa.map(function(_2, i) {
          return f(wa.slice(i));
        });
      };
    };
    exports.extend = extend;
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
    var reduce = function(b, f) {
      return (0, exports.reduceWithIndex)(b, function(_2, b2, a) {
        return f(b2, a);
      });
    };
    exports.reduce = reduce;
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
    var getEq = function(E) {
      return (0, Eq_1.fromEquals)(function(xs, ys) {
        return xs.length === ys.length && xs.every(function(x, i) {
          return E.equals(x, ys[i]);
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
    var getUnionSemigroup = function(E) {
      var unionE = union(E);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    var getUnionMonoid = function(E) {
      return {
        concat: (0, exports.getUnionSemigroup)(E).concat,
        empty: exports.empty
      };
    };
    exports.getUnionMonoid = getUnionMonoid;
    var getIntersectionSemigroup = function(E) {
      var intersectionE = intersection(E);
      return {
        concat: function(first, second) {
          return intersectionE(second)(first);
        }
      };
    };
    exports.getIntersectionSemigroup = getIntersectionSemigroup;
    var getDifferenceMagma = function(E) {
      var differenceE = difference(E);
      return {
        concat: function(first, second) {
          return differenceE(second)(first);
        }
      };
    };
    exports.getDifferenceMagma = getDifferenceMagma;
    exports.Functor = {
      URI: exports.URI,
      map: _map
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: exports.flatMap
    };
    exports.Monad = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap
    };
    exports.chainFirst = /* @__PURE__ */ (0, Chain_1.chainFirst)(exports.Chain);
    exports.Unfoldable = {
      URI: exports.URI,
      unfold: exports.unfold
    };
    exports.Alt = {
      URI: exports.URI,
      map: _map,
      alt: _alt
    };
    exports.Zero = {
      URI: exports.URI,
      zero: exports.zero
    };
    exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
    exports.Alternative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      alt: _alt,
      zero: exports.zero
    };
    exports.Extend = {
      URI: exports.URI,
      map: _map,
      extend: _extend
    };
    exports.Compactable = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate
    };
    exports.Filterable = {
      URI: exports.URI,
      map: _map,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap
    };
    exports.FilterableWithIndex = {
      URI: exports.URI,
      map: _map,
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
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map,
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
        var todo = __spreadArray([], f(a), true);
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
      map: _map,
      ap: _ap,
      chain: exports.flatMap,
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
      map: _map,
      ap: _ap,
      chain: exports.flatMap,
      chainRec: exports._chainRecBreadthFirst
    };
    var _wither = /* @__PURE__ */ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
    var _wilt = /* @__PURE__ */ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
    exports.Witherable = {
      URI: exports.URI,
      map: _map,
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
    var toArray = function(as) {
      return as.slice();
    };
    exports.toArray = toArray;
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
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports.Functor);
    exports.let = let_;
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.chain = exports.flatMap;
    exports.range = RNEA.range;
    exports.cons = RNEA.cons;
    exports.snoc = RNEA.snoc;
    exports.prependToAll = exports.prependAll;
    exports.readonlyArray = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap,
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
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.copy = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
    exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.foldMapWithIndex = exports.foldMap = exports.duplicate = exports.extend = exports.filterWithIndex = exports.alt = exports.altW = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.filter = exports.separate = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.mapWithIndex = exports.flatten = exports.flatMap = exports.ap = exports.map = exports.zero = exports.of = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.sort = void 0;
    exports.some = exports.every = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = void 0;
    exports.array = exports.prependToAll = exports.snoc = exports.cons = exports.empty = exports.range = exports.chain = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.intercalate = exports.exists = void 0;
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var NEA = __importStar(require_NonEmptyArray());
    var RA = __importStar(require_ReadonlyArray());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    var Zero_1 = require_Zero();
    var isEmpty = function(as) {
      return as.length === 0;
    };
    exports.isEmpty = isEmpty;
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
    var init = function(as) {
      return (0, exports.isNonEmpty)(as) ? _.some(NEA.init(as)) : _.none;
    };
    exports.init = init;
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
        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init2 = _a[0], rest = _a[1];
        return { init: init2, rest };
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
    function zip(as, bs) {
      if (bs === void 0) {
        return function(bs2) {
          return zip(bs2, as);
        };
      }
      return (0, exports.zipWith)(as, bs, function(a, b) {
        return [a, b];
      });
    }
    exports.zip = zip;
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
    var rotate = function(n) {
      var f = NEA.rotate(n);
      return function(as) {
        return (0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as);
      };
    };
    exports.rotate = rotate;
    exports.elem = RA.elem;
    var uniq = function(E) {
      var f = NEA.uniq(E);
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
        return (0, exports.isNonEmpty)(input2) ? (0, exports.flatMap)(NEA.head(input2), function(a) {
          return go((0, function_1.pipe)(scope, (0, exports.append)(a)), NEA.tail(input2));
        }) : g.apply(void 0, scope) ? [f.apply(void 0, scope)] : [];
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
    function union(E) {
      var unionE = NEA.union(E);
      return function(first, second) {
        if (second === void 0) {
          var unionE_1 = union(E);
          return function(second2) {
            return unionE_1(second2, first);
          };
        }
        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second) ? unionE(second)(first) : (0, exports.isNonEmpty)(first) ? (0, exports.copy)(first) : (0, exports.copy)(second);
      };
    }
    exports.union = union;
    function intersection(E) {
      var elemE = (0, exports.elem)(E);
      return function(xs, ys) {
        if (ys === void 0) {
          var intersectionE_1 = intersection(E);
          return function(ys2) {
            return intersectionE_1(ys2, xs);
          };
        }
        return xs.filter(function(a) {
          return elemE(a, ys);
        });
      };
    }
    exports.intersection = intersection;
    function difference(E) {
      var elemE = (0, exports.elem)(E);
      return function(xs, ys) {
        if (ys === void 0) {
          var differenceE_1 = difference(E);
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
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapWithIndex = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
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
    var zero = function() {
      return [];
    };
    exports.zero = zero;
    var map = function(f) {
      return function(fa) {
        return fa.map(function(a) {
          return f(a);
        });
      };
    };
    exports.map = map;
    var ap = function(fa) {
      return (0, exports.flatMap)(function(f) {
        return (0, function_1.pipe)(fa, (0, exports.map)(f));
      });
    };
    exports.ap = ap;
    exports.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function(i, a) {
        return f(a, i);
      }));
    });
    exports.flatten = (0, exports.flatMap)(function_1.identity);
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
    var filter = function(predicate) {
      return function(as) {
        return as.filter(predicate);
      };
    };
    exports.filter = filter;
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
    var extend = function(f) {
      return function(wa) {
        return wa.map(function(_2, i) {
          return f(wa.slice(i));
        });
      };
    };
    exports.extend = extend;
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
    var getUnionSemigroup = function(E) {
      var unionE = union(E);
      return {
        concat: function(first, second) {
          return unionE(second)(first);
        }
      };
    };
    exports.getUnionSemigroup = getUnionSemigroup;
    var getUnionMonoid = function(E) {
      return {
        concat: (0, exports.getUnionSemigroup)(E).concat,
        empty: []
      };
    };
    exports.getUnionMonoid = getUnionMonoid;
    var getIntersectionSemigroup = function(E) {
      var intersectionE = intersection(E);
      return {
        concat: function(first, second) {
          return intersectionE(second)(first);
        }
      };
    };
    exports.getIntersectionSemigroup = getIntersectionSemigroup;
    var getDifferenceMagma = function(E) {
      var differenceE = difference(E);
      return {
        concat: function(first, second) {
          return differenceE(second)(first);
        }
      };
    };
    exports.getDifferenceMagma = getDifferenceMagma;
    exports.Functor = {
      URI: exports.URI,
      map: _map
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    exports.FunctorWithIndex = {
      URI: exports.URI,
      map: _map,
      mapWithIndex: _mapWithIndex
    };
    exports.Apply = {
      URI: exports.URI,
      map: _map,
      ap: _ap
    };
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.Applicative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: exports.flatMap
    };
    exports.chainFirst = /* @__PURE__ */ (0, Chain_1.chainFirst)(exports.Chain);
    exports.Monad = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap
    };
    exports.Unfoldable = {
      URI: exports.URI,
      unfold: exports.unfold
    };
    exports.Alt = {
      URI: exports.URI,
      map: _map,
      alt: _alt
    };
    exports.Zero = {
      URI: exports.URI,
      zero: exports.zero
    };
    exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
    exports.Alternative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      alt: _alt,
      zero: exports.zero
    };
    exports.Extend = {
      URI: exports.URI,
      map: _map,
      extend: _extend
    };
    exports.Compactable = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate
    };
    exports.Filterable = {
      URI: exports.URI,
      map: _map,
      compact: exports.compact,
      separate: exports.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap
    };
    exports.FilterableWithIndex = {
      URI: exports.URI,
      map: _map,
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
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    exports.TraversableWithIndex = {
      URI: exports.URI,
      map: _map,
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
      map: _map,
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
      map: _map,
      ap: _ap,
      chain: exports.flatMap,
      chainRec: _chainRecDepthFirst
    };
    exports.chainRecBreadthFirst = RA.chainRecBreadthFirst;
    exports.ChainRecBreadthFirst = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: exports.flatMap,
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
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports.Functor);
    exports.let = let_;
    exports.bind = (0, Chain_1.bind)(exports.Chain);
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.chain = exports.flatMap;
    exports.range = NEA.range;
    exports.empty = [];
    exports.cons = NEA.cons;
    exports.snoc = NEA.snoc;
    exports.prependToAll = exports.prependAll;
    exports.array = {
      URI: exports.URI,
      compact: exports.compact,
      separate: exports.separate,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap,
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
    var slice = function(start, end) {
      return function(s) {
        return s.slice(start, end);
      };
    };
    exports.slice = slice;
    var isEmpty = function(s) {
      return s.length === 0;
    };
    exports.isEmpty = isEmpty;
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

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  byValueString: () => byValueString,
  getSorter: () => getSorter,
  isPrimitive: () => isPrimitive,
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
function isPrimitive(v) {
  if (typeof v == `number`)
    return true;
  if (typeof v === `string`)
    return true;
  if (typeof v == `bigint`)
    return true;
  if (typeof v === `boolean`)
    return true;
  return false;
}
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
    case `value`: {
      return sortByValueNumber(false);
    }
    case `valueReverse`: {
      return sortByValueNumber(true);
    }
    case `key`: {
      return sortByKey(false);
    }
    case `keyReverse`: {
      return sortByKey(true);
    }
    default: {
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, valueReverse, key or keyReverse`);
    }
  }
};
var minMaxAvg2 = (entries, conversionFunction) => {
  const converter = conversionFunction ?? ((v) => v[1]);
  const values = entries.map((entry) => converter(entry));
  return minMaxAvg(values);
};

export {
  isPrimitive,
  byValueString,
  sortByKey,
  sortByValueString,
  sortByValueNumber,
  getSorter,
  minMaxAvg2 as minMaxAvg,
  KeyValue_exports
};
//# sourceMappingURL=chunk-FQHO5ZXN.js.map