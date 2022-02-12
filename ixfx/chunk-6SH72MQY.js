import {
  getCorners,
  guard,
  isCubicBezier,
  isLine,
  isQuadraticBezier
} from "./chunk-STXYU4QR.js";
import {
  stack
} from "./chunk-BM7C7PTS.js";
import {
  lerp,
  startsEnds,
  wrappedRange
} from "./chunk-M45UNPUS.js";
import {
  resolveEl
} from "./chunk-EGNKYH6P.js";
import {
  array,
  number
} from "./chunk-RKVT4IML.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  drawingStack: () => drawingStack,
  getCtx: () => getCtx,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock
});

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  getColourSpace: () => getColourSpace,
  getNamed: () => getNamed,
  hsl: () => Hsl_exports,
  lab: () => lab,
  opacity: () => opacity,
  parseNeutral: () => parseNeutral,
  parseToHsl: () => parseToHsl,
  resolve: () => resolve,
  rgb: () => Rgb_exports,
  scale: () => scale,
  toCss: () => toCss5,
  xyz: () => xyz
});

// src/visual/colour/Hsl.ts
var Hsl_exports = {};
__export(Hsl_exports, {
  fromRgb: () => fromRgb,
  fromRgba: () => fromRgba,
  guard: () => guard3,
  isHsl: () => isHsl,
  isHsla: () => isHsla,
  lerp: () => lerp3,
  toCss: () => toCss2
});

// src/visual/colour/Rgb.ts
var Rgb_exports = {};
__export(Rgb_exports, {
  fromArray: () => fromArray,
  guard: () => guard2,
  isRgb: () => isRgb,
  lerp: () => lerp2,
  rgbaFromArray: () => rgbaFromArray,
  toCss: () => toCss
});
var fromArray = (v) => {
  if (v.length === 3) {
    return { r: v[0], g: v[1], b: v[2] };
  } else if (v.length === 4) {
    return { r: v[0], g: v[1], b: v[2], a: v[3] };
  } else {
    throw new Error(`expected array of three or four (${v.length})`);
  }
};
var rgbaFromArray = (v) => {
  if (v.length !== 4)
    throw new Error(`expected array of four`);
  return { r: v[0], g: v[1], b: v[2], a: v[3] };
};
var guard2 = (rgb) => {
  if (`a` in rgb) {
    number(rgb.a, `percentage`, `rgb[3]`);
  }
  if (rgb.r < 0 || rgb.r > 255)
    throw new Error(`rgba.r expected to be 0-255`);
  if (rgb.g < 0 || rgb.g > 255)
    throw new Error(`rgba.g expected to be 0-255`);
  if (rgb.b < 0 || rgb.b > 255)
    throw new Error(`rgba.b expected to be 0-255`);
};
var lerp2 = (amount, a, b) => {
  number(amount, `percentage`, `amount`);
  return a;
};
var toCss = (v) => {
  if (`a` in v) {
    return `rgba(${v.r},${v.g},${v.b}, ${v.a})`;
  } else {
    return `rgb(${v.r},${v.g},${v.b})`;
  }
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

// src/visual/colour/Hsl.ts
var guard3 = (hsl) => {
  number(hsl.h, ``, `hsl.h`);
  if (hsl.h > 360)
    throw new Error(`hsl.h expected to be under 360`);
  if (hsl.h < 0)
    throw new Error(`hsl.h expected to be above 0`);
  number(hsl.s, `percentage`, `hsl.s`);
  number(hsl.l, `percentage`, `hsl.l`);
  if (`a` in hsl) {
    number(hsl.a, `percentage`, `hsl.a`);
  }
};
var fromRgba = (rgba) => {
  guard3;
  const hsl = fromRgb(rgba);
  const hsla = { ...hsl, a: rgba.a };
  return hsla;
};
var fromRgb = (rgb) => {
  guard2(rgb);
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  var min = Math.min(r, g, b), max2 = Math.max(r, g, b), delta = max2 - min, h, s, l;
  h = 0;
  if (max2 === min) {
    h = 0;
  } else if (r === max2) {
    h = (g - b) / delta;
  } else if (g === max2) {
    h = 2 + (b - r) / delta;
  } else if (b === max2) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min + max2) / 2;
  if (max2 === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max2 + min);
  } else {
    s = delta / (2 - max2 - min);
  }
  let result;
  if (`a` in rgb) {
    result = { h, s, l, a: rgb.a };
  } else {
    result = { h, s, l };
  }
  guard3(result);
  return result;
};
var lerp3 = (amount, a, b) => {
  number(amount, `percentage`, `amount`);
  const h = wrappedRange(0, 360, (max2) => lerp(amount, 0, max2), a.h, b.h);
  const s = lerp(amount, a.s, b.s);
  const l = lerp(amount, a.l, b.l);
  const hsl = Object.freeze({ h, s, l });
  guard3(hsl);
  return hsl;
};
var toCss2 = (hsl) => {
  if (`a` in hsl) {
    return `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%, ${hsl.a * 100}%)`;
  } else {
    return `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`;
  }
};
var isHsla = (p) => {
  if (p.h === void 0)
    return false;
  if (p.s === void 0)
    return false;
  if (p.l === void 0)
    return false;
  if (p.a === void 0)
    return false;
  return true;
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

// src/visual/colour/Lab.ts
var labToZyz = (lab2) => {
  let { l, a, b } = lab2;
  let x, y, z, y2;
  x = 0;
  z = 0;
  if (l <= 8) {
    y = l * 100 / 903.3;
    y2 = 7.787 * (y / 100) + 16 / 116;
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1 / 3);
  }
  x = x / 95.047 <= 8856e-6 ? x = 95.047 * (a / 500 + y2 - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + y2, 3);
  z = z / 108.883 <= 8859e-6 ? z = 108.883 * (y2 - b / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(y2 - b / 200, 3);
  return { x, y, z };
};
var xyzToLab = (xyz2) => {
  let { x, y, z } = xyz2;
  let l, a, b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return { l, a, b };
};
var lerp4 = (amount, a, b) => {
  number(amount, `percentage`, `amount`);
  return a;
};
var toCss3 = (v) => {
  return `lab(${v.l}, ${v.a}, ${v.b})`;
};
var lab = {
  name: `lab`,
  min: [0, -100, -100],
  max: [100, 100, 100],
  channel: [`lightness`, `a`, `b`],
  alias: [`LAB`, `cielab`],
  toXyz: labToZyz,
  fromXyz: xyzToLab,
  lerp: lerp4,
  toCss: toCss3
};

// src/visual/colour/Xyz.ts
var whitepoint = {
  2: {
    A: [109.85, 100, 35.585],
    C: [98.074, 100, 118.232],
    D50: [96.422, 100, 82.521],
    D55: [95.682, 100, 92.149],
    D65: [95.045592705167, 100, 108.9057750759878],
    D75: [94.972, 100, 122.638],
    F2: [99.187, 100, 67.395],
    F7: [95.044, 100, 108.755],
    F11: [100.966, 100, 64.37],
    E: [100, 100, 100]
  },
  10: {
    A: [111.144, 100, 35.2],
    C: [97.285, 100, 116.145],
    D50: [96.72, 100, 81.427],
    D55: [95.799, 100, 90.926],
    D65: [94.811, 100, 107.304],
    D75: [94.416, 100, 120.641],
    F2: [103.28, 100, 69.026],
    F7: [95.792, 100, 107.687],
    F11: [103.866, 100, 65.627],
    E: [100, 100, 100]
  }
};
var max = whitepoint[2].D65;
var lerp5 = (amount, a, b) => {
  return a;
};
var toCss4 = (v) => {
  return `xyz(${v.x}, ${v.y}, ${v.z})`;
};
var xyz = {
  name: `xyz`,
  min: [0, 0, 0],
  channel: [`X`, `Y`, `Z`],
  alias: [`XYZ`, `ciexyz`, `cie1931`],
  max,
  lerp: lerp5,
  toCss: toCss4
};

// src/visual/colour/Named.ts
var named = [
  {
    name: `indianred`,
    hexValue: `#cd5c5c`,
    rgbValues: [
      205,
      92,
      92
    ],
    hslValues: [
      0,
      0.531,
      0.582
    ]
  },
  {
    name: `lightcoral`,
    hexValue: `#f08080`,
    rgbValues: [
      240,
      128,
      128
    ],
    hslValues: [
      0,
      0.789,
      0.722
    ]
  },
  {
    name: `salmon`,
    hexValue: `#fa8072`,
    rgbValues: [
      250,
      128,
      114
    ],
    hslValues: [
      6.176,
      0.932,
      0.714
    ]
  },
  {
    name: `darksalmon`,
    hexValue: `#e9967a`,
    rgbValues: [
      233,
      150,
      122
    ],
    hslValues: [
      15.135,
      0.716,
      0.696
    ]
  },
  {
    name: `lightsalmon`,
    hexValue: `#ffa07a`,
    rgbValues: [
      255,
      160,
      122
    ],
    hslValues: [
      17.143,
      1,
      0.739
    ]
  },
  {
    name: `crimson`,
    hexValue: `#dc143c`,
    rgbValues: [
      220,
      20,
      60
    ],
    hslValues: [
      348,
      0.833,
      0.471
    ]
  },
  {
    name: `red`,
    hexValue: `#ff0000`,
    rgbValues: [
      255,
      0,
      0
    ],
    hslValues: [
      0,
      1,
      0.5
    ]
  },
  {
    name: `firebrick`,
    hexValue: `#b22222`,
    rgbValues: [
      178,
      34,
      34
    ],
    hslValues: [
      0,
      0.679,
      0.416
    ]
  },
  {
    name: `darkred`,
    hexValue: `#8b0000`,
    rgbValues: [
      139,
      0,
      0
    ],
    hslValues: [
      0,
      1,
      0.273
    ]
  },
  {
    name: `pink`,
    hexValue: `#ffc0cb`,
    rgbValues: [
      255,
      192,
      203
    ],
    hslValues: [
      349.524,
      1,
      0.876
    ]
  },
  {
    name: `lightpink`,
    hexValue: `#ffb6c1`,
    rgbValues: [
      255,
      182,
      193
    ],
    hslValues: [
      350.959,
      1,
      0.857
    ]
  },
  {
    name: `hotpink`,
    hexValue: `#ff69b4`,
    rgbValues: [
      255,
      105,
      180
    ],
    hslValues: [
      330,
      1,
      0.706
    ]
  },
  {
    name: `deeppink`,
    hexValue: `#ff1493`,
    rgbValues: [
      255,
      20,
      147
    ],
    hslValues: [
      327.574,
      1,
      0.539
    ]
  },
  {
    name: `mediumvioletred`,
    hexValue: `#c71585`,
    rgbValues: [
      199,
      21,
      133
    ],
    hslValues: [
      322.247,
      0.809,
      0.431
    ]
  },
  {
    name: `palevioletred`,
    hexValue: `#db7093`,
    rgbValues: [
      219,
      112,
      147
    ],
    hslValues: [
      340.374,
      0.598,
      0.649
    ]
  },
  {
    name: `lightsalmon`,
    hexValue: `#ffa07a`,
    rgbValues: [
      255,
      160,
      122
    ],
    hslValues: [
      17.143,
      1,
      0.739
    ]
  },
  {
    name: `coral`,
    hexValue: `#ff7f50`,
    rgbValues: [
      255,
      127,
      80
    ],
    hslValues: [
      16.114,
      1,
      0.657
    ]
  },
  {
    name: `tomato`,
    hexValue: `#ff6347`,
    rgbValues: [
      255,
      99,
      71
    ],
    hslValues: [
      9.13,
      1,
      0.639
    ]
  },
  {
    name: `orangered`,
    hexValue: `#ff4500`,
    rgbValues: [
      255,
      69,
      0
    ],
    hslValues: [
      16.235,
      1,
      0.5
    ]
  },
  {
    name: `darkorange`,
    hexValue: `#ff8c00`,
    rgbValues: [
      255,
      140,
      0
    ],
    hslValues: [
      32.941,
      1,
      0.5
    ]
  },
  {
    name: `orange`,
    hexValue: `#ffa500`,
    rgbValues: [
      255,
      165,
      0
    ],
    hslValues: [
      38.824,
      1,
      0.5
    ]
  },
  {
    name: `gold`,
    hexValue: `#ffd700`,
    rgbValues: [
      255,
      215,
      0
    ],
    hslValues: [
      50.588,
      1,
      0.5
    ]
  },
  {
    name: `yellow`,
    hexValue: `#ffff00`,
    rgbValues: [
      255,
      255,
      0
    ],
    hslValues: [
      60,
      1,
      0.5
    ]
  },
  {
    name: `lightyellow`,
    hexValue: `#ffffe0`,
    rgbValues: [
      255,
      255,
      224
    ],
    hslValues: [
      60,
      1,
      0.939
    ]
  },
  {
    name: `lemonchiffon`,
    hexValue: `#fffacd`,
    rgbValues: [
      255,
      250,
      205
    ],
    hslValues: [
      54,
      1,
      0.902
    ]
  },
  {
    name: `lightgoldenrodyellow`,
    hexValue: `#fafad2`,
    rgbValues: [
      250,
      250,
      210
    ],
    hslValues: [
      60,
      0.8,
      0.902
    ]
  },
  {
    name: `papayawhip`,
    hexValue: `#ffefd5`,
    rgbValues: [
      255,
      239,
      213
    ],
    hslValues: [
      37.143,
      1,
      0.918
    ]
  },
  {
    name: `moccasin`,
    hexValue: `#ffe4b5`,
    rgbValues: [
      255,
      228,
      181
    ],
    hslValues: [
      38.108,
      1,
      0.855
    ]
  },
  {
    name: `peachpuff`,
    hexValue: `#ffdab9`,
    rgbValues: [
      255,
      218,
      185
    ],
    hslValues: [
      28.286,
      1,
      0.863
    ]
  },
  {
    name: `palegoldenrod`,
    hexValue: `#eee8aa`,
    rgbValues: [
      238,
      232,
      170
    ],
    hslValues: [
      54.706,
      0.667,
      0.8
    ]
  },
  {
    name: `khaki`,
    hexValue: `#f0e68c`,
    rgbValues: [
      240,
      230,
      140
    ],
    hslValues: [
      54,
      0.769,
      0.745
    ]
  },
  {
    name: `darkkhaki`,
    hexValue: `#bdb76b`,
    rgbValues: [
      189,
      183,
      107
    ],
    hslValues: [
      55.61,
      0.383,
      0.58
    ]
  },
  {
    name: `lavender`,
    hexValue: `#e6e6fa`,
    rgbValues: [
      230,
      230,
      250
    ],
    hslValues: [
      240,
      0.667,
      0.941
    ]
  },
  {
    name: `thistle`,
    hexValue: `#d8bfd8`,
    rgbValues: [
      216,
      191,
      216
    ],
    hslValues: [
      300,
      0.243,
      0.798
    ]
  },
  {
    name: `plum`,
    hexValue: `#dda0dd`,
    rgbValues: [
      221,
      160,
      221
    ],
    hslValues: [
      300,
      0.473,
      0.747
    ]
  },
  {
    name: `violet`,
    hexValue: `#ee82ee`,
    rgbValues: [
      238,
      130,
      238
    ],
    hslValues: [
      300,
      0.761,
      0.722
    ]
  },
  {
    name: `orchid`,
    hexValue: `#da70d6`,
    rgbValues: [
      218,
      112,
      214
    ],
    hslValues: [
      302.264,
      0.589,
      0.647
    ]
  },
  {
    name: `fuchsia`,
    hexValue: `#ff00ff`,
    rgbValues: [
      255,
      0,
      255
    ],
    hslValues: [
      300,
      1,
      0.5
    ]
  },
  {
    name: `magenta`,
    hexValue: `#ff00ff`,
    rgbValues: [
      255,
      0,
      255
    ],
    hslValues: [
      300,
      1,
      0.5
    ]
  },
  {
    name: `mediumorchid`,
    hexValue: `#ba55d3`,
    rgbValues: [
      186,
      85,
      211
    ],
    hslValues: [
      288.095,
      0.589,
      0.58
    ]
  },
  {
    name: `mediumpurple`,
    hexValue: `#9370db`,
    rgbValues: [
      147,
      112,
      219
    ],
    hslValues: [
      259.626,
      0.598,
      0.649
    ]
  },
  {
    name: `rebeccapurple`,
    hexValue: `#663399`,
    rgbValues: [
      102,
      51,
      153
    ],
    hslValues: [
      270,
      0.5,
      0.4
    ]
  },
  {
    name: `blueviolet`,
    hexValue: `#8a2be2`,
    rgbValues: [
      138,
      43,
      226
    ],
    hslValues: [
      271.148,
      0.759,
      0.527
    ]
  },
  {
    name: `darkviolet`,
    hexValue: `#9400d3`,
    rgbValues: [
      148,
      0,
      211
    ],
    hslValues: [
      282.085,
      1,
      0.414
    ]
  },
  {
    name: `darkorchid`,
    hexValue: `#9932cc`,
    rgbValues: [
      153,
      50,
      204
    ],
    hslValues: [
      280.13,
      0.606,
      0.498
    ]
  },
  {
    name: `darkmagenta`,
    hexValue: `#8b008b`,
    rgbValues: [
      139,
      0,
      139
    ],
    hslValues: [
      300,
      1,
      0.273
    ]
  },
  {
    name: `purple`,
    hexValue: `#800080`,
    rgbValues: [
      128,
      0,
      128
    ],
    hslValues: [
      300,
      1,
      0.251
    ]
  },
  {
    name: `indigo`,
    hexValue: `#4b0082`,
    rgbValues: [
      75,
      0,
      130
    ],
    hslValues: [
      274.615,
      1,
      0.255
    ]
  },
  {
    name: `slateblue`,
    hexValue: `#6a5acd`,
    rgbValues: [
      106,
      90,
      205
    ],
    hslValues: [
      248.348,
      0.535,
      0.578
    ]
  },
  {
    name: `darkslateblue`,
    hexValue: `#483d8b`,
    rgbValues: [
      72,
      61,
      139
    ],
    hslValues: [
      248.462,
      0.39,
      0.392
    ]
  },
  {
    name: `mediumslateblue`,
    hexValue: `#7b68ee`,
    rgbValues: [
      123,
      104,
      238
    ],
    hslValues: [
      248.507,
      0.798,
      0.671
    ]
  },
  {
    name: `greenyellow`,
    hexValue: `#adff2f`,
    rgbValues: [
      173,
      255,
      47
    ],
    hslValues: [
      83.654,
      1,
      0.592
    ]
  },
  {
    name: `chartreuse`,
    hexValue: `#7fff00`,
    rgbValues: [
      127,
      255,
      0
    ],
    hslValues: [
      90.118,
      1,
      0.5
    ]
  },
  {
    name: `lawngreen`,
    hexValue: `#7cfc00`,
    rgbValues: [
      124,
      252,
      0
    ],
    hslValues: [
      90.476,
      1,
      0.494
    ]
  },
  {
    name: `lime`,
    hexValue: `#00ff00`,
    rgbValues: [
      0,
      255,
      0
    ],
    hslValues: [
      120,
      1,
      0.5
    ]
  },
  {
    name: `limegreen`,
    hexValue: `#32cd32`,
    rgbValues: [
      50,
      205,
      50
    ],
    hslValues: [
      120,
      0.608,
      0.5
    ]
  },
  {
    name: `palegreen`,
    hexValue: `#98fb98`,
    rgbValues: [
      152,
      251,
      152
    ],
    hslValues: [
      120,
      0.925,
      0.79
    ]
  },
  {
    name: `lightgreen`,
    hexValue: `#90ee90`,
    rgbValues: [
      144,
      238,
      144
    ],
    hslValues: [
      120,
      0.734,
      0.749
    ]
  },
  {
    name: `mediumspringgreen`,
    hexValue: `#00fa9a`,
    rgbValues: [
      0,
      250,
      154
    ],
    hslValues: [
      156.96,
      1,
      0.49
    ]
  },
  {
    name: `springgreen`,
    hexValue: `#00ff7f`,
    rgbValues: [
      0,
      255,
      127
    ],
    hslValues: [
      149.882,
      1,
      0.5
    ]
  },
  {
    name: `mediumseagreen`,
    hexValue: `#3cb371`,
    rgbValues: [
      60,
      179,
      113
    ],
    hslValues: [
      146.723,
      0.498,
      0.469
    ]
  },
  {
    name: `seagreen`,
    hexValue: `#2e8b57`,
    rgbValues: [
      46,
      139,
      87
    ],
    hslValues: [
      146.452,
      0.503,
      0.363
    ]
  },
  {
    name: `forestgreen`,
    hexValue: `#228b22`,
    rgbValues: [
      34,
      139,
      34
    ],
    hslValues: [
      120,
      0.607,
      0.339
    ]
  },
  {
    name: `green`,
    hexValue: `#008000`,
    rgbValues: [
      0,
      128,
      0
    ],
    hslValues: [
      120,
      1,
      0.251
    ]
  },
  {
    name: `darkgreen`,
    hexValue: `#006400`,
    rgbValues: [
      0,
      100,
      0
    ],
    hslValues: [
      120,
      1,
      0.196
    ]
  },
  {
    name: `yellowgreen`,
    hexValue: `#9acd32`,
    rgbValues: [
      154,
      205,
      50
    ],
    hslValues: [
      79.742,
      0.608,
      0.5
    ]
  },
  {
    name: `olivedrab`,
    hexValue: `#6b8e23`,
    rgbValues: [
      107,
      142,
      35
    ],
    hslValues: [
      79.626,
      0.605,
      0.347
    ]
  },
  {
    name: `olive`,
    hexValue: `#808000`,
    rgbValues: [
      128,
      128,
      0
    ],
    hslValues: [
      60,
      1,
      0.251
    ]
  },
  {
    name: `darkolivegreen`,
    hexValue: `#556b2f`,
    rgbValues: [
      85,
      107,
      47
    ],
    hslValues: [
      82,
      0.39,
      0.302
    ]
  },
  {
    name: `mediumaquamarine`,
    hexValue: `#66cdaa`,
    rgbValues: [
      102,
      205,
      170
    ],
    hslValues: [
      159.612,
      0.507,
      0.602
    ]
  },
  {
    name: `darkseagreen`,
    hexValue: `#8fbc8b`,
    rgbValues: [
      143,
      188,
      139
    ],
    hslValues: [
      115.102,
      0.268,
      0.641
    ]
  },
  {
    name: `lightseagreen`,
    hexValue: `#20b2aa`,
    rgbValues: [
      32,
      178,
      170
    ],
    hslValues: [
      176.712,
      0.695,
      0.412
    ]
  },
  {
    name: `darkcyan`,
    hexValue: `#008b8b`,
    rgbValues: [
      0,
      139,
      139
    ],
    hslValues: [
      180,
      1,
      0.273
    ]
  },
  {
    name: `teal`,
    hexValue: `#008080`,
    rgbValues: [
      0,
      128,
      128
    ],
    hslValues: [
      180,
      1,
      0.251
    ]
  },
  {
    name: `aqua`,
    hexValue: `#00ffff`,
    rgbValues: [
      0,
      255,
      255
    ],
    hslValues: [
      180,
      1,
      0.5
    ]
  },
  {
    name: `cyan`,
    hexValue: `#00ffff`,
    rgbValues: [
      0,
      255,
      255
    ],
    hslValues: [
      180,
      1,
      0.5
    ]
  },
  {
    name: `lightcyan`,
    hexValue: `#e0ffff`,
    rgbValues: [
      224,
      255,
      255
    ],
    hslValues: [
      180,
      1,
      0.939
    ]
  },
  {
    name: `paleturquoise`,
    hexValue: `#afeeee`,
    rgbValues: [
      175,
      238,
      238
    ],
    hslValues: [
      180,
      0.649,
      0.81
    ]
  },
  {
    name: `aquamarine`,
    hexValue: `#7fffd4`,
    rgbValues: [
      127,
      255,
      212
    ],
    hslValues: [
      159.844,
      1,
      0.749
    ]
  },
  {
    name: `turquoise`,
    hexValue: `#40e0d0`,
    rgbValues: [
      64,
      224,
      208
    ],
    hslValues: [
      174,
      0.721,
      0.565
    ]
  },
  {
    name: `mediumturquoise`,
    hexValue: `#48d1cc`,
    rgbValues: [
      72,
      209,
      204
    ],
    hslValues: [
      177.81,
      0.598,
      0.551
    ]
  },
  {
    name: `darkturquoise`,
    hexValue: `#00ced1`,
    rgbValues: [
      0,
      206,
      209
    ],
    hslValues: [
      180.861,
      1,
      0.41
    ]
  },
  {
    name: `cadetblue`,
    hexValue: `#5f9ea0`,
    rgbValues: [
      95,
      158,
      160
    ],
    hslValues: [
      181.846,
      0.255,
      0.5
    ]
  },
  {
    name: `steelblue`,
    hexValue: `#4682b4`,
    rgbValues: [
      70,
      130,
      180
    ],
    hslValues: [
      207.273,
      0.44,
      0.49
    ]
  },
  {
    name: `lightsteelblue`,
    hexValue: `#b0c4de`,
    rgbValues: [
      176,
      196,
      222
    ],
    hslValues: [
      213.913,
      0.411,
      0.78
    ]
  },
  {
    name: `powderblue`,
    hexValue: `#b0e0e6`,
    rgbValues: [
      176,
      224,
      230
    ],
    hslValues: [
      186.667,
      0.519,
      0.796
    ]
  },
  {
    name: `lightblue`,
    hexValue: `#add8e6`,
    rgbValues: [
      173,
      216,
      230
    ],
    hslValues: [
      194.737,
      0.533,
      0.79
    ]
  },
  {
    name: `skyblue`,
    hexValue: `#87ceeb`,
    rgbValues: [
      135,
      206,
      235
    ],
    hslValues: [
      197.4,
      0.714,
      0.725
    ]
  },
  {
    name: `lightskyblue`,
    hexValue: `#87cefa`,
    rgbValues: [
      135,
      206,
      250
    ],
    hslValues: [
      202.957,
      0.92,
      0.755
    ]
  },
  {
    name: `deepskyblue`,
    hexValue: `#00bfff`,
    rgbValues: [
      0,
      191,
      255
    ],
    hslValues: [
      195.059,
      1,
      0.5
    ]
  },
  {
    name: `dodgerblue`,
    hexValue: `#1e90ff`,
    rgbValues: [
      30,
      144,
      255
    ],
    hslValues: [
      209.6,
      1,
      0.559
    ]
  },
  {
    name: `cornflowerblue`,
    hexValue: `#6495ed`,
    rgbValues: [
      100,
      149,
      237
    ],
    hslValues: [
      218.54,
      0.792,
      0.661
    ]
  },
  {
    name: `mediumslateblue`,
    hexValue: `#7b68ee`,
    rgbValues: [
      123,
      104,
      238
    ],
    hslValues: [
      248.507,
      0.798,
      0.671
    ]
  },
  {
    name: `royalblue`,
    hexValue: `#4169e1`,
    rgbValues: [
      65,
      105,
      225
    ],
    hslValues: [
      225,
      0.727,
      0.569
    ]
  },
  {
    name: `blue`,
    hexValue: `#0000ff`,
    rgbValues: [
      0,
      0,
      255
    ],
    hslValues: [
      240,
      1,
      0.5
    ]
  },
  {
    name: `mediumblue`,
    hexValue: `#0000cd`,
    rgbValues: [
      0,
      0,
      205
    ],
    hslValues: [
      240,
      1,
      0.402
    ]
  },
  {
    name: `darkblue`,
    hexValue: `#00008b`,
    rgbValues: [
      0,
      0,
      139
    ],
    hslValues: [
      240,
      1,
      0.273
    ]
  },
  {
    name: `navy`,
    hexValue: `#000080`,
    rgbValues: [
      0,
      0,
      128
    ],
    hslValues: [
      240,
      1,
      0.251
    ]
  },
  {
    name: `midnightblue`,
    hexValue: `#191970`,
    rgbValues: [
      25,
      25,
      112
    ],
    hslValues: [
      240,
      0.635,
      0.269
    ]
  },
  {
    name: `cornsilk`,
    hexValue: `#fff8dc`,
    rgbValues: [
      255,
      248,
      220
    ],
    hslValues: [
      48,
      1,
      0.931
    ]
  },
  {
    name: `blanchedalmond`,
    hexValue: `#ffebcd`,
    rgbValues: [
      255,
      235,
      205
    ],
    hslValues: [
      36,
      1,
      0.902
    ]
  },
  {
    name: `bisque`,
    hexValue: `#ffe4c4`,
    rgbValues: [
      255,
      228,
      196
    ],
    hslValues: [
      32.542,
      1,
      0.884
    ]
  },
  {
    name: `navajowhite`,
    hexValue: `#ffdead`,
    rgbValues: [
      255,
      222,
      173
    ],
    hslValues: [
      35.854,
      1,
      0.839
    ]
  },
  {
    name: `wheat`,
    hexValue: `#f5deb3`,
    rgbValues: [
      245,
      222,
      179
    ],
    hslValues: [
      39.091,
      0.767,
      0.831
    ]
  },
  {
    name: `burlywood`,
    hexValue: `#deb887`,
    rgbValues: [
      222,
      184,
      135
    ],
    hslValues: [
      33.793,
      0.569,
      0.7
    ]
  },
  {
    name: `tan`,
    hexValue: `#d2b48c`,
    rgbValues: [
      210,
      180,
      140
    ],
    hslValues: [
      34.286,
      0.437,
      0.686
    ]
  },
  {
    name: `rosybrown`,
    hexValue: `#bc8f8f`,
    rgbValues: [
      188,
      143,
      143
    ],
    hslValues: [
      0,
      0.251,
      0.649
    ]
  },
  {
    name: `sandybrown`,
    hexValue: `#f4a460`,
    rgbValues: [
      244,
      164,
      96
    ],
    hslValues: [
      27.568,
      0.871,
      0.667
    ]
  },
  {
    name: `goldenrod`,
    hexValue: `#daa520`,
    rgbValues: [
      218,
      165,
      32
    ],
    hslValues: [
      42.903,
      0.744,
      0.49
    ]
  },
  {
    name: `darkgoldenrod`,
    hexValue: `#b8860b`,
    rgbValues: [
      184,
      134,
      11
    ],
    hslValues: [
      42.659,
      0.887,
      0.382
    ]
  },
  {
    name: `peru`,
    hexValue: `#cd853f`,
    rgbValues: [
      205,
      133,
      63
    ],
    hslValues: [
      29.577,
      0.587,
      0.525
    ]
  },
  {
    name: `chocolate`,
    hexValue: `#d2691e`,
    rgbValues: [
      210,
      105,
      30
    ],
    hslValues: [
      25,
      0.75,
      0.471
    ]
  },
  {
    name: `saddlebrown`,
    hexValue: `#8b4513`,
    rgbValues: [
      139,
      69,
      19
    ],
    hslValues: [
      25,
      0.759,
      0.31
    ]
  },
  {
    name: `sienna`,
    hexValue: `#a0522d`,
    rgbValues: [
      160,
      82,
      45
    ],
    hslValues: [
      19.304,
      0.561,
      0.402
    ]
  },
  {
    name: `brown`,
    hexValue: `#a52a2a`,
    rgbValues: [
      165,
      42,
      42
    ],
    hslValues: [
      0,
      0.594,
      0.406
    ]
  },
  {
    name: `maroon`,
    hexValue: `#800000`,
    rgbValues: [
      128,
      0,
      0
    ],
    hslValues: [
      0,
      1,
      0.251
    ]
  },
  {
    name: `white`,
    hexValue: `#ffffff`,
    rgbValues: [
      255,
      255,
      255
    ],
    hslValues: [
      0,
      0,
      1
    ]
  },
  {
    name: `snow`,
    hexValue: `#fffafa`,
    rgbValues: [
      255,
      250,
      250
    ],
    hslValues: [
      0,
      1,
      0.99
    ]
  },
  {
    name: `honeydew`,
    hexValue: `#f0fff0`,
    rgbValues: [
      240,
      255,
      240
    ],
    hslValues: [
      120,
      1,
      0.971
    ]
  },
  {
    name: `mintcream`,
    hexValue: `#f5fffa`,
    rgbValues: [
      245,
      255,
      250
    ],
    hslValues: [
      150,
      1,
      0.98
    ]
  },
  {
    name: `azure`,
    hexValue: `#f0ffff`,
    rgbValues: [
      240,
      255,
      255
    ],
    hslValues: [
      180,
      1,
      0.971
    ]
  },
  {
    name: `aliceblue`,
    hexValue: `#f0f8ff`,
    rgbValues: [
      240,
      248,
      255
    ],
    hslValues: [
      208,
      1,
      0.971
    ]
  },
  {
    name: `ghostwhite`,
    hexValue: `#f8f8ff`,
    rgbValues: [
      248,
      248,
      255
    ],
    hslValues: [
      240,
      1,
      0.986
    ]
  },
  {
    name: `whitesmoke`,
    hexValue: `#f5f5f5`,
    rgbValues: [
      245,
      245,
      245
    ],
    hslValues: [
      0,
      0,
      0.961
    ]
  },
  {
    name: `seashell`,
    hexValue: `#fff5ee`,
    rgbValues: [
      255,
      245,
      238
    ],
    hslValues: [
      24.706,
      1,
      0.967
    ]
  },
  {
    name: `beige`,
    hexValue: `#f5f5dc`,
    rgbValues: [
      245,
      245,
      220
    ],
    hslValues: [
      60,
      0.556,
      0.912
    ]
  },
  {
    name: `oldlace`,
    hexValue: `#fdf5e6`,
    rgbValues: [
      253,
      245,
      230
    ],
    hslValues: [
      39.13,
      0.852,
      0.947
    ]
  },
  {
    name: `floralwhite`,
    hexValue: `#fffaf0`,
    rgbValues: [
      255,
      250,
      240
    ],
    hslValues: [
      40,
      1,
      0.971
    ]
  },
  {
    name: `ivory`,
    hexValue: `#fffff0`,
    rgbValues: [
      255,
      255,
      240
    ],
    hslValues: [
      60,
      1,
      0.971
    ]
  },
  {
    name: `antiquewhite`,
    hexValue: `#faebd7`,
    rgbValues: [
      250,
      235,
      215
    ],
    hslValues: [
      34.286,
      0.778,
      0.912
    ]
  },
  {
    name: `linen`,
    hexValue: `#faf0e6`,
    rgbValues: [
      250,
      240,
      230
    ],
    hslValues: [
      30,
      0.667,
      0.941
    ]
  },
  {
    name: `lavenderblush`,
    hexValue: `#fff0f5`,
    rgbValues: [
      255,
      240,
      245
    ],
    hslValues: [
      340,
      1,
      0.971
    ]
  },
  {
    name: `mistyrose`,
    hexValue: `#ffe4e1`,
    rgbValues: [
      255,
      228,
      225
    ],
    hslValues: [
      6,
      1,
      0.941
    ]
  },
  {
    name: `gainsboro`,
    hexValue: `#dcdcdc`,
    rgbValues: [
      220,
      220,
      220
    ],
    hslValues: [
      0,
      0,
      0.863
    ]
  },
  {
    name: `lightgray`,
    hexValue: `#d3d3d3`,
    rgbValues: [
      211,
      211,
      211
    ],
    hslValues: [
      0,
      0,
      0.827
    ]
  },
  {
    name: `silver`,
    hexValue: `#c0c0c0`,
    rgbValues: [
      192,
      192,
      192
    ],
    hslValues: [
      0,
      0,
      0.753
    ]
  },
  {
    name: `darkgray`,
    hexValue: `#a9a9a9`,
    rgbValues: [
      169,
      169,
      169
    ],
    hslValues: [
      0,
      0,
      0.663
    ]
  },
  {
    name: `gray`,
    hexValue: `#808080`,
    rgbValues: [
      128,
      128,
      128
    ],
    hslValues: [
      0,
      0,
      0.502
    ]
  },
  {
    name: `dimgray`,
    hexValue: `#696969`,
    rgbValues: [
      105,
      105,
      105
    ],
    hslValues: [
      0,
      0,
      0.412
    ]
  },
  {
    name: `lightslategray`,
    hexValue: `#778899`,
    rgbValues: [
      119,
      136,
      153
    ],
    hslValues: [
      210,
      0.143,
      0.533
    ]
  },
  {
    name: `slategray`,
    hexValue: `#708090`,
    rgbValues: [
      112,
      128,
      144
    ],
    hslValues: [
      210,
      0.126,
      0.502
    ]
  },
  {
    name: `darkslategray`,
    hexValue: `#2f4f4f`,
    rgbValues: [
      47,
      79,
      79
    ],
    hslValues: [
      180,
      0.254,
      0.247
    ]
  },
  {
    name: `black`,
    hexValue: `#000000`,
    rgbValues: [
      0,
      0,
      0
    ],
    hslValues: [
      0,
      0,
      0
    ]
  }
];

// src/visual/Colour.ts
var getNamed = (name, space = `hsl`) => {
  const c = named.find((v) => v.name === name);
  if (c === void 0)
    return c;
  if (space === `hsl`) {
    return { h: c.hslValues[0], s: c.hslValues[1], l: c.hslValues[2] };
  } else if (space === `rgb`) {
    return { r: c.rgbValues[0], g: c.rgbValues[1], b: c.rgbValues[2] };
  }
};
var scale = (count, a, b, space = `hsl`) => {
  const ca = resolve(a);
  const cb = resolve(b);
  const s = getColourSpace(space);
  const r = [];
  const amtPerStep = 1 / (count - 1);
  let amt = 0;
  for (let i = 0; i < count; i++) {
    r.push(s.lerp(amt, ca, cb));
    amt += amtPerStep;
    if (amt > 1)
      amt = 1;
  }
  return r;
};
var opacity = (c, reduceBy) => {
  number(reduceBy, `percentage`, `reduceBy`);
  const parsed = parseToHsl(c);
  let a = 1;
  if (isHsla(parsed)) {
    a = parsed.a;
  }
  a = a * reduceBy;
  number(a, `percentage`, `alpha`);
  return toCss2({ ...parsed, a });
};
var toCss5 = (c) => {
  if (isRgb(c))
    return toCss(c);
  else if (isHsl(c))
    return toCss2(c);
  throw new Error(`Unknown colour`);
};
var parseCss = (c) => {
  const start = c.indexOf(`(`);
  const end = c.indexOf(`)`);
  if (start <= 0)
    throw new Error(`Expected (`);
  if (end <= 0)
    throw new Error(`Expected )`);
  if (end <= start)
    throw new Error(`Expected ( after )`);
  c = c.substring(start + 1, end);
  let cc = [];
  if (c.indexOf(`,`) >= 0) {
    cc = c.split(`,`);
  } else if (c.indexOf(` `) >= 0) {
    cc = c.split(` `);
  } else
    throw new Error(`Cannot parse (${c})`);
  const numbers = cc.map((v) => {
    if (v.endsWith(`%`)) {
      return parseFloat(v.substring(0, v.length - 1).trim()) / 100;
    } else {
      return parseFloat(v.trim());
    }
  });
  return numbers;
};
var parseToHsl = (c) => {
  const parsed = parseNeutral(c);
  if (isHsl(parsed))
    return parsed;
  if (isRgb(parsed))
    return fromRgb(parsed);
  throw new Error(`Unknown colour space (${c})`);
};
var resolve = (c) => {
  if (typeof c === `string`) {
    return parseNeutral(c);
  } else
    return c;
};
var parseNeutral = (c) => {
  if (startsEnds(c, `hsl(`, `)`)) {
    const cc = parseCss(c);
    if (cc.length !== 3)
      throw new Error(`hsl() Expected three numbers (${c})`);
    return { h: cc[0], s: cc[1], l: cc[2], a: 1 };
  } else if (startsEnds(c, `hsla(`, `)`)) {
    const cc = parseCss(c);
    if (cc.length !== 4)
      throw new Error(`hsla() Expected four numbers (${c})`);
    return { h: cc[0], s: cc[1], l: cc[2], a: cc[3] };
  } else if (startsEnds(c, `rgb(`, `)`)) {
    const cc = parseCss(c);
    if (cc.length !== 3)
      throw new Error(`rgb() Expected three numbers (${c})`);
    return fromArray(cc);
  } else if (startsEnds(c, `rgba(`, `)`)) {
    const cc = parseCss(c);
    if (cc.length !== 4)
      throw new Error(`rgba() Expected four numbers (${c})`);
    return fromArray(cc);
  } else {
    const n = getNamed(c);
    if (n !== void 0)
      return { ...n, a: 1 };
  }
  throw new Error(`Cannot parse as colour string (${c})`);
};
var getColourSpace = (name) => {
  switch (name) {
    case `hsl`:
      return Hsl_exports;
    case `rgb`:
      return Rgb_exports;
    case `lab`:
      return lab;
    default:
      throw new Error(`Unknown colour space: ${name}. Expected hsl, rgb, lab`);
  }
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
var applyOpts = (ctx, opts = {}) => {
  if (ctx === void 0)
    throw Error(`ctx undefined`);
  const stack2 = drawingStack(ctx).push(optsOp(opts));
  stack2.apply();
  return stack2;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  if (Array.isArray(arcs)) {
    arcs.forEach(draw);
  } else
    draw(arcs);
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply = (ctx) => {
    if (fillStyle)
      ctx.fillStyle = fillStyle;
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle;
  };
  return apply;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0)
    stk = stack();
  const push = (op) => {
    if (stk === void 0)
      stk = stack();
    const s = stk.push(op);
    op(ctx);
    return drawingStack(ctx, s);
  };
  const pop = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    stk.forEach((op) => op(ctx));
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
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
  const draw = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    ctx.stroke();
  };
  if (Array.isArray(circlesToDraw))
    circlesToDraw.forEach(draw);
  else
    draw(circlesToDraw);
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (path) => {
    if (isQuadraticBezier(path))
      quadraticBezier(ctx, path, opts);
    else if (isLine(path))
      line(ctx, path, opts);
    else
      throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw))
    pathsToDraw.forEach(draw);
  else
    draw(pathsToDraw);
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
  ctx.stroke();
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
  const { a, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack2 = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    connectedPoints(ctx, [a, quadratic, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  applyOpts(ctx, opts);
  const draw = (d) => {
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
    toDraw.forEach(draw);
  else
    draw(toDraw);
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (d) => {
    if (opts.filled)
      ctx.fillRect(d.x, d.y, d.width, d.height);
    ctx.strokeRect(d.x, d.y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, getCorners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw);
  else
    draw(toDraw);
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
  lines.forEach((line2, i) => {
    ctx.fillText(line2, x, y);
    y += heights[i];
  });
};

export {
  Colour_exports,
  getCtx,
  makeHelper,
  arc,
  drawingStack,
  lineThroughPoints,
  circle,
  paths,
  connectedPoints,
  pointLabels,
  bezier,
  line,
  rect,
  textBlock,
  Drawing_exports
};
