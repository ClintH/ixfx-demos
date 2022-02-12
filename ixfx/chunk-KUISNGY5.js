import {
  number
} from "./chunk-RKVT4IML.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  getCssVariable: () => getCssVariable,
  interpolate: () => interpolate,
  opacity: () => opacity,
  scale: () => scale,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb
});
import * as d3Colour from "d3-color";

// node_modules/d3-interpolate/src/value.js
import { color } from "d3-color";

// node_modules/d3-interpolate/src/rgb.js
import { rgb as colorRgb } from "d3-color";

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
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
  var color3 = gamma(y);
  function rgb2(start, end) {
    var r = color3((start = colorRgb(start)).r, (end = colorRgb(end)).r), g = color3(start.g, end.g), b = color3(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color3;
    for (i = 0; i < n; ++i) {
      color3 = colorRgb(colors[i]);
      r[i] = color3.r || 0;
      g[i] = color3.g || 0;
      b[i] = color3.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color3.opacity = 1;
    return function(t) {
      color3.r = r(t);
      color3.g = g(t);
      color3.b = b(t);
      return color3 + "";
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
  return function(t) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t) + b[i] * t;
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
  return function(t) {
    for (i = 0; i < na; ++i)
      c[i] = x[i](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
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
  return function(t) {
    for (k in i)
      c[k] = i[k](t);
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
  return function(t) {
    return b(t) + "";
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
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/hsl.js
import { hsl as colorHsl } from "d3-color";
function hsl(hue2) {
  return function(start, end) {
    var h = hue2((start = colorHsl(start)).h, (end = colorHsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hsl_default = hsl(hue);
var hslLong = hsl(nogamma);

// node_modules/d3-interpolate/src/lab.js
import { lab as colorLab } from "d3-color";
function lab(start, end) {
  var l = nogamma((start = colorLab(start)).l, (end = colorLab(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity2(t);
    return start + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
import { hcl as colorHcl } from "d3-color";
function hcl(hue2) {
  return function(start, end) {
    var h = hue2((start = colorHcl(start)).h, (end = colorHcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hcl_default = hcl(hue);
var hclLong = hcl(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
import { cubehelix as colorCubehelix } from "d3-color";
function cubehelix(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix2(start, end) {
      var h = hue2((start = colorCubehelix(start)).h, (end = colorCubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity2(t);
        return start + "";
      };
    }
    cubehelix2.gamma = cubehelixGamma;
    return cubehelix2;
  }(1);
}
var cubehelix_default = cubehelix(hue);
var cubehelixLong = cubehelix(nogamma);

// node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate2, values) {
  if (values === void 0)
    values = interpolate2, interpolate2 = value_default;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n)
    I[i] = interpolate2(v, v = values[++i]);
  return function(t) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i2](t - i2);
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
    const css = d3Colour.color(c);
    if (css !== null)
      return css;
  } else {
    if (isHsl(c))
      return d3Colour.hsl(c.h, c.s, c.l);
    if (isRgb(c))
      return d3Colour.rgb(c.r, c.g, c.b);
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
var interpolate = (amount, from, to, optsOrSpace) => {
  number(amount, `percentage`, `amount`);
  if (typeof from === `string`)
    throw new Error(`Expected string for 'from' param`);
  if (typeof to === `string`)
    throw new Error(`Expected string for 'to' param`);
  let opts;
  if (typeof optsOrSpace === `undefined`)
    opts = {};
  else if (typeof optsOrSpace === `string`)
    opts = { space: optsOrSpace };
  else
    opts = optsOrSpace;
  const inter = getInterpolator(opts, [from, to]);
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
      inter = lab;
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
var scale = (steps, opts, ...colours) => {
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
  var min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, l;
  h = 0;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return { h, s, l };
};

export {
  opacity,
  getCssVariable,
  Colour_exports
};
