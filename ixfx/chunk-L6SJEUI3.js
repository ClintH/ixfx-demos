import {
  minMaxAvg
} from "./chunk-B26XWH2Y.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

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

// node_modules/fp-ts/es6/function.js
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
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
    default:
      var ret = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
  }
}

// node_modules/fp-ts/es6/Eq.js
var eqStrict = {
  equals: function(a, b) {
    return a === b;
  }
};
var strictEqual = eqStrict.equals;

// node_modules/fp-ts/es6/Ord.js
var equalsDefault = function(compare2) {
  return function(first, second) {
    return first === second || compare2(first, second) === 0;
  };
};
var fromCompare = function(compare2) {
  return {
    equals: equalsDefault(compare2),
    compare: function(first, second) {
      return first === second ? 0 : compare2(first, second);
    }
  };
};
var reverse = function(O) {
  return fromCompare(function(first, second) {
    return O.compare(second, first);
  });
};
var contramap = function(f) {
  return function(fa) {
    return fromCompare(function(first, second) {
      return fa.compare(f(first), f(second));
    });
  };
};
function compare(first, second) {
  return first < second ? -1 : first > second ? 1 : 0;
}
var strictOrd = {
  equals: eqStrict.equals,
  compare
};

// node_modules/fp-ts/es6/number.js
var Eq = {
  equals: function(first, second) {
    return first === second;
  }
};
var Ord = {
  equals: Eq.equals,
  compare: function(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
  }
};
var Bounded = {
  equals: Eq.equals,
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
};
var MagmaSub = {
  concat: function(first, second) {
    return first - second;
  }
};
var SemigroupSum = {
  concat: function(first, second) {
    return first + second;
  }
};
var SemigroupProduct = {
  concat: function(first, second) {
    return first * second;
  }
};
var MonoidSum = {
  concat: SemigroupSum.concat,
  empty: 0
};
var MonoidProduct = {
  concat: SemigroupProduct.concat,
  empty: 1
};
var Field = {
  add: SemigroupSum.concat,
  zero: 0,
  mul: SemigroupProduct.concat,
  one: 1,
  sub: MagmaSub.concat,
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

// node_modules/fp-ts/es6/Array.js
var copy = function(as) {
  return as.slice();
};
var sort = function(O) {
  return function(as) {
    return as.length <= 1 ? copy(as) : as.slice().sort(O.compare);
  };
};

// node_modules/fp-ts/es6/string.js
var Eq2 = {
  equals: function(first, second) {
    return first === second;
  }
};
var Semigroup = {
  concat: function(first, second) {
    return first + second;
  }
};
var Monoid = {
  concat: Semigroup.concat,
  empty: ""
};
var Ord2 = {
  equals: Eq2.equals,
  compare: function(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
  }
};

// src/KeyValue.ts
var byKey = (reverse2 = false) => pipe(reverse2 ? reverse(Ord2) : Ord2, contramap((v) => v[0]));
var byValueString = (reverse2 = false) => pipe(reverse2 ? reverse(Ord2) : Ord2, contramap((v) => v[1]));
var byValueNumber = (reverse2 = false) => pipe(reverse2 ? reverse(Ord) : Ord, contramap((v) => v[1]));
var sortByKey = (reverse2 = false) => sort(byKey(reverse2));
var sortByValueString = (reverse2 = false) => sort(byValueString(reverse2));
var sortByValueNumber = (reverse2 = false) => sort(byValueNumber(reverse2));
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
  byValueString,
  sortByKey,
  sortByValueString,
  sortByValueNumber,
  getSorter,
  minMaxAvg2 as minMaxAvg,
  KeyValue_exports
};
