import {
  clamp,
  msElapsedTimer,
  progress,
  relativeTimer,
  ticksElapsedTimer
} from "./chunk-MJGMR6XO.js";
import {
  range
} from "./chunk-DI7TMLF6.js";
import {
  string
} from "./chunk-K45JUSCV.js";
import {
  randomElement,
  randomIndex,
  shuffle,
  weightedIndex
} from "./chunk-46GN7MZ3.js";
import {
  defaultRandom
} from "./chunk-JIUPCK6W.js";
import {
  integerTest,
  numberTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-WUN4GNAA.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/random/index.ts
var random_exports = {};
__export(random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  defaultRandom: () => defaultRandom,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian2,
  gaussianSource: () => gaussianSource,
  hue: () => randomHue,
  integer: () => integer,
  integerSource: () => integerSource,
  integerUniqueGen: () => integerUniqueGen,
  minutesMs: () => minutesMs,
  minutesMsSource: () => minutesMsSource,
  secondsMs: () => secondsMs,
  secondsMsSource: () => secondsMsSource,
  shortGuid: () => shortGuid,
  string: () => string,
  weighted: () => weighted,
  weightedIndex: () => weightedIndex,
  weightedInteger: () => weightedInteger,
  weightedIntegerSource: () => weightedIntegerSource,
  weightedSource: () => weightedSource
});

// src/random/FloatSource.ts
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = options.max;
  let min = options.min ?? 0;
  const source = options.source ?? defaultRandom;
  throwFromResult(numberTest(min, ``, `min`));
  throwFromResult(numberTest(max, ``, `max`));
  if (!options.min && max < 0) {
    min = max;
    max = 0;
  }
  if (min > max) {
    throw new Error(`Min is greater than max. Min: ${min} max: ${max}`);
  }
  return () => source() * (max - min) + min;
};

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  interpolate: () => interpolate,
  opacity: () => opacity,
  randomHue: () => randomHue,
  scale: () => scale,
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
  // Deprecated! Use color.formatHex.
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
  // Deprecated! Use color.formatHex.
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
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
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
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
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
  var color2 = gamma(y);
  function rgb2(start, end) {
    var r = color2((start = rgb(start)).r, (end = rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
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
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
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
  var d = /* @__PURE__ */ new Date();
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
function hsl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hsl(start)).h, (end = hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/lab.js
function lab2(start, end) {
  var l = nogamma((start = lab(start)).l, (end = lab(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity2(t);
    return start + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix3(start, end) {
      var h = hue2((start = cubehelix(start)).h, (end = cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity2(t);
        return start + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate3, values) {
  if (values === void 0)
    values = interpolate3, interpolate3 = value_default;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n)
    I[i] = interpolate3(v, v = values[++i]);
  return function(t) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i2](t - i2);
  };
}

// src/visual/Colour.ts
var toHsl = (colour) => {
  const c = resolveColour(colour);
  if (c === null)
    throw new Error(`Could not resolve colour ${colour}`);
  if (isHsl(c))
    return c;
  if (isRgb(c)) {
    const asHsl = hsl(c);
    if (c.opacity)
      return { ...asHsl, opacity: c.opacity };
    return asHsl;
  }
  throw new Error(`Could not resolve colour ${colour}`);
};
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75, alpha = 1) => {
  throwNumberTest(index, `positive`, `index`);
  throwNumberTest(saturation, `percentage`, `saturation`);
  throwNumberTest(lightness, `percentage`, `lightness`);
  throwNumberTest(alpha, `percentage`, `alpha`);
  const hue2 = index * 137.508;
  return alpha === 1 ? `hsl(${hue2},${saturation * 100}%,${lightness * 100}%)` : `hsl(${hue2},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};
var toRgb = (colour) => {
  const c = resolveColour(colour);
  const rgb2 = c.rgb();
  return c.opacity < 1 ? { r: rgb2.r, g: rgb2.g, b: rgb2.b, opacity: c.opacity } : { r: rgb2.r, g: rgb2.g, b: rgb2.b };
};
var resolveColour = (c) => {
  if (typeof c === `string`) {
    const css = color(c);
    if (css !== null)
      return css;
    const error = c.startsWith(`hsl`) && c.indexOf(`%`) <= 0 ? new Error(`Could not resolve CSS colour ${c}. HSL values should be in the form: hsl(0, 50%, 50%)`) : new Error(`Could not resolve CSS colour ${c}`);
    throw error;
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
var interpolate = (amount, from, to, optsOrSpace) => {
  throwNumberTest(amount, `percentage`, `amount`);
  if (typeof from !== `string`)
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
    case `lab`: {
      inter = lab2;
      break;
    }
    case `hsl`: {
      inter = long ? hslLong : hsl_default;
      break;
    }
    case `hcl`: {
      inter = long ? hclLong : hcl_default;
      break;
    }
    case `cubehelix`: {
      inter = long ? cubehelixLong : cubehelix_default;
      break;
    }
    case `rgb`: {
      inter = rgb_default;
    }
    default: {
      inter = rgb_default;
    }
  }
  if (opts.gamma && (space === `rgb` || space === `cubehelix`)) {
    inter = inter.gamma(
      opts.gamma
    );
  }
  return colours.length > 2 ? piecewise(inter, colours) : inter(colours[0], colours[1]);
};
var scale = (steps, opts, ...colours) => {
  throwNumberTest(steps, `aboveZero`, `steps`);
  if (!Array.isArray(colours))
    throw new Error(`Expected one or more colours as parameters`);
  const inter = getInterpolator(opts, colours);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  const perStep = 1 / (steps - 1);
  const r = [];
  let amt = 0;
  for (let index = 0; index < steps; index++) {
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
  time: () => time,
  weightedAverage: () => weightedAverage
});

// src/data/Wrap.ts
var wrapInteger = (v, min = 0, max = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min, void 0, `min`);
  throwIntegerTest(max, void 0, `max`);
  if (v === min)
    return min;
  if (v === max)
    return min;
  if (v > 0 && v < min)
    v += min;
  v -= min;
  max -= min;
  v = v % max;
  if (v < 0)
    v = max - Math.abs(v) + min;
  return v + min;
};
var wrap = (v, min = 0, max = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min, ``, `min`);
  throwNumberTest(max, ``, `max`);
  if (v === min)
    return min;
  if (v === max)
    return min;
  while (v <= min || v >= max) {
    if (v === max)
      break;
    if (v === min)
      break;
    if (v > max) {
      v = min + (v - max);
    } else if (v < min) {
      v = max - (min - v);
    }
  }
  return v;
};
var wrapRange = (min, max, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max - a + b);
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
  return wrapInteger(r, min, max);
};

// src/data/Interpolate.ts
var piPi = Math.PI * 2;
var interpolate2 = (amount, a, b) => {
  const v = (1 - amount) * a + amount * b;
  return v;
};
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0)
      b = retargetB;
    if (retargetA !== void 0)
      a = retargetA;
    if (amount >= 1)
      return b;
    const value = interpolate2(amount, a, b);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1) => {
  const durationProgression = progress(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0)
      b = retargetB;
    if (retargetA !== void 0)
      a = retargetA;
    if (amount >= 1)
      return b;
    const value = interpolate2(amount, a, b);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t = wrap(bRadians - aRadians, 0, piPi);
  return interpolate2(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t));
};

// src/modulation/Easing.ts
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var time = function(nameOrFunction, durationMs) {
  return create(nameOrFunction, durationMs, msElapsedTimer);
};
var tick = function(nameOrFunction, durationTicks) {
  return create(nameOrFunction, durationTicks, ticksElapsedTimer);
};
var create = function(nameOrFunction, duration, timerSource) {
  const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
  if (fn === void 0) {
    const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: ${nameOrFunction}`) : new Error(`Easing function not found`);
    throw error;
  }
  const timer = relativeTimer(duration, {
    timer: timerSource(),
    clampValue: true
  });
  let startCount = 1;
  return {
    get isDone() {
      return timer.isDone;
    },
    get runState() {
      if (timer.isDone)
        return `idle`;
      return `scheduled`;
    },
    /**
     * Returns 1 if it has been created, returns +1 for each additional time the timer has been reset.
     */
    get startCount() {
      return startCount;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
      startCount++;
    }
  };
};
var fromCubicBezier = (b, d) => (t) => {
  const s = 1 - t;
  const s2 = s * s;
  const t22 = t * t;
  const t32 = t22 * t;
  return 3 * b * s2 * t + 3 * d * s * t22 + t32;
};
var mix = (amt, balance, easingA, easingB) => interpolate2(balance, easingA(amt), easingB(amt));
var crossfade = (amt, easingA, easingB) => mix(amt, amt, easingA, easingB);
var get = function(easingName) {
  if (easingName === null)
    throw new Error(`easingName is null`);
  if (easingName === void 0)
    throw new Error(`easingName is undefined`);
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(
    ([k, _v]) => k.toLocaleLowerCase() === name
  );
  if (found === void 0)
    return found;
  return found[1];
};
function* getEasings() {
  yield* Object.keys(functions);
}
var gaussian = (standardDeviation = 0.4) => {
  const a = 1 / sqrt(2 * pi);
  const mean = 0.5;
  return (t) => {
    const f = a / standardDeviation;
    let p = -2.5;
    let c = (t - mean) / standardDeviation;
    c *= c;
    p *= c;
    const v = f * pow(Math.E, p);
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
var quintOut = (x) => 1 - pow(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var weightedAverage = (currentValue, targetValue, slowDownFactor) => {
  return (currentValue * (slowDownFactor - 1) + targetValue) / slowDownFactor;
};
var functions = {
  smoothstep: (x) => x * x * (3 - 2 * x),
  smootherstep: (x) => (x * (x * 6 - 15) + 10) * x * x * x,
  arch,
  bell: gaussian(),
  sineIn: (x) => 1 - cos(x * pi / 2),
  sineOut: (x) => sin(x * pi / 2),
  quadIn: (x) => x * x,
  quadOut: (x) => 1 - (1 - x) * (1 - x),
  sineInOut: (x) => -(cos(pi * x) - 1) / 2,
  quadInOut: (x) => x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2,
  cubicIn: (x) => x * x * x,
  cubicOut: (x) => 1 - pow(1 - x, 3),
  quartIn: (x) => x * x * x * x,
  quartOut: (x) => 1 - pow(1 - x, 4),
  quintIn,
  quintOut,
  //: (x: number): number => 1 - pow(1 - x, 5),
  expoIn: (x) => x === 0 ? 0 : pow(2, 10 * x - 10),
  expoOut: (x) => x === 1 ? 1 : 1 - pow(2, -10 * x),
  quintInOut: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2,
  expoInOut: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2,
  circIn: (x) => 1 - sqrt(1 - pow(x, 2)),
  circOut: (x) => sqrt(1 - pow(x - 1, 2)),
  backIn: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  backOut: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  circInOut: (x) => x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2,
  backInOut: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  elasticIn: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  elasticOut: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  bounceIn: (x) => 1 - bounceOut(1 - x),
  bounceOut,
  elasticInOut: (x) => {
    const c5 = 2 * pi / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
  },
  bounceInOut: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
};

// src/random/Weighted.ts
var weighted = (easingNameOrOptions = `quadIn`) => weightedSource(easingNameOrOptions)();
var weightedSource = (easingNameOrOptions = `quadIn`) => {
  const options = typeof easingNameOrOptions === `string` ? { easing: easingNameOrOptions } : easingNameOrOptions;
  const source = options.source ?? defaultRandom;
  const easingName = options.easing ?? `quadIn`;
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing function '${easingName}' not found.`);
  }
  const compute = () => {
    const r = source();
    return easingFunction(r);
  };
  return compute;
};

// src/random/WeightedInteger.ts
var weightedIntegerSource = (maxOrOptions) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const source = options.source ?? defaultRandom;
  const max = options.max;
  const min = options.min ?? 0;
  const easingName = options.easing ?? `quadIn`;
  if (typeof max === `undefined`)
    throw new Error(`max field is undefined`);
  if (typeof easingName !== `string`) {
    throw new TypeError(`easing field expected to be string`);
  }
  throwFromResult(numberTest(max));
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing '${easingName}' not found`);
  }
  throwFromResult(numberTest(min));
  if (max <= min)
    throw new Error(`Max should be greater than min`);
  const compute = () => {
    const r = clamp(easingFunction(source()));
    return Math.floor(r * (max - min)) + min;
  };
  return compute;
};
var weightedInteger = (maxOrOptions) => weightedIntegerSource(maxOrOptions)();

// src/random/index.ts
var gaussian2 = (skew = 1) => gaussianSource(skew)();
var gaussianSource = (skew = 1) => {
  const min = 0;
  const max = 1;
  const compute = () => {
    const u = calculateNonZero();
    const v = calculateNonZero();
    let result = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    result = result / 10 + 0.5;
    if (result > 1 || result < 0) {
      result = compute();
    } else {
      result = Math.pow(result, skew);
      result *= max - min;
      result += min;
    }
    return result;
  };
  return compute;
};
var calculateNonZero = (source = defaultRandom) => {
  let v = 0;
  while (v === 0) {
    v = source();
  }
  return v;
};
var integerSource = (maxOrOptions) => {
  if (typeof maxOrOptions === `undefined`) {
    throw new TypeError(`maxOrOptions is undefined`);
  }
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = Math.floor(options.max);
  let min = Math.floor(options.min ?? 0);
  if (!options.min && max < 0) {
    max = 1;
    min = options.max;
  }
  const randomSource = options.source ?? defaultRandom;
  if (min > max) {
    throw new Error(`Min value is greater than max (min: ${min} max: ${max})`);
  }
  throwFromResult(numberTest(min, ``, `min`));
  throwFromResult(numberTest(max, ``, `max`));
  if (max === min) {
    throw new Error(`Max and min values cannot be the same (${max})`);
  }
  const amt = Math.abs(max - min);
  return () => Math.floor(randomSource() * amt) + min;
};
var integer = (maxOrOptions) => integerSource(maxOrOptions)();
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();
var shortGuid = (options = {}) => {
  const source = options.source ?? defaultRandom;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};
var minutesMsSource = (maxMinutesOrOptions) => {
  const options = typeof maxMinutesOrOptions === `number` ? { max: maxMinutesOrOptions } : maxMinutesOrOptions;
  const min = (options.min ?? 0) * 60 * 1e3;
  const max = options.max * 60 * 1e3;
  return integerSource({ ...options, max, min });
};
var minutesMs = (maxMinutesOrOptions) => minutesMsSource(maxMinutesOrOptions)();
var secondsMsSource = (maxSecondsOrOptions) => {
  const options = typeof maxSecondsOrOptions === `number` ? { max: maxSecondsOrOptions } : maxSecondsOrOptions;
  const min = (options.min ?? 0) * 1e3;
  const max = options.max * 1e3;
  return () => integer({ ...options, max, min });
};
var secondsMs = (maxSecondsOrOptions) => secondsMsSource(maxSecondsOrOptions)();
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min = options.min ?? 0;
  const max = options.max;
  const source = options.source ?? defaultRandom;
  const loop = options.loop ?? false;
  throwFromResult(integerTest(min, ``, `min`));
  throwFromResult(integerTest(max, ``, `max`));
  if (min > max) {
    throw new Error(`Min value is greater than max. Min: ${min} Max: ${max}`);
  }
  const origRange = [...range(min, max - min)];
  let numberRange = shuffle(origRange);
  let index = 0;
  while (true) {
    if (index === numberRange.length) {
      if (loop)
        numberRange = shuffle(origRange, source);
      else
        return;
    }
    yield numberRange[index++];
  }
}

export {
  wrapInteger,
  wrap,
  wrapRange,
  interpolate2 as interpolate,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle,
  Easing_exports,
  randomHue,
  opacity,
  getCssVariable,
  Colour_exports,
  floatSource,
  weighted,
  weightedSource,
  weightedIntegerSource,
  weightedInteger,
  gaussian2 as gaussian,
  gaussianSource,
  integerSource,
  integer,
  float,
  shortGuid,
  minutesMsSource,
  minutesMs,
  secondsMsSource,
  secondsMs,
  integerUniqueGen,
  random_exports
};
//# sourceMappingURL=chunk-DIIBFUSS.js.map