import { D as Drawing } from './Drawing-22d7def5';
import { S as Svg } from './Svg-5efd2130';
import { M as MapOfMutable, C as CircularArray } from './Interfaces-99011dee';
import * as d3Colour from 'd3-color';

/**
 * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
 *
 */
declare type Palette = {
    setElementBase(el: Element): void;
    has(key: string): boolean;
    /**
     * Returns a colour by name.
     *
     * If the colour is not found:
     *  1. Try to use a CSS variable `--key`, or
     *  2. The next fallback colour is used (array cycles)
     *
     * @param key
     * @returns
     */
    get(key: string, fallback?: string): string;
    /**
     * Gets a colour by key, adding and returning fallback if not present
     * @param key Key of colour
     * @param fallback Fallback colour if key is not found
     */
    getOrAdd(key: string, fallback?: string): string;
    /**
     * Adds a colour with a given key
     *
     * @param key
     * @param colour
     */
    add(key: string, value: string): void;
    alias(from: string, to: string): void;
};
declare const create: (fallbacks?: readonly string[] | undefined) => Palette;

type Palette$1_Palette = Palette;
declare const Palette$1_create: typeof create;
declare namespace Palette$1 {
  export {
    Palette$1_Palette as Palette,
    Palette$1_create as create,
  };
}

declare type Series = {
    min: number;
    max: number;
    range: number;
    name: string;
};
declare type DrawingOpts = PlotOpts & {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    dataXScale?: number;
    yLabelWidth: number;
    palette: Palette;
    textHeight: number;
    capacity: number;
    coalesce: boolean;
};
declare type PlotOpts = {
    autoSizeCanvas?: boolean;
    style?: `connected` | `dots`;
    palette?: Palette;
    capacity?: number;
    showYAxis?: boolean;
    yAxes?: string[] | string;
    textHeight?: number;
    lineWidth?: number;
    coalesce?: boolean;
    fixedRange?: [number, number];
    dataXScale?: number;
};
declare const createScales: (buffer: MapOfMutable<number, CircularArray<number>>) => Series[];
declare const add: (buffer: MapOfMutable<number, CircularArray<number>>, value: number, series?: string) => void;
declare const draw: (buffer: MapOfMutable<number, CircularArray<number>>, drawing: DrawingOpts) => void;
declare const drawSeriesAxis: (series: Series, drawing: DrawingOpts) => void;
declare const drawSeries: (series: Series, values: CircularArray<number>, drawing: DrawingOpts) => void;
/**
 * Creates a simple horizontal data plot within a DIV.
 *
 * ```
 * const plot = plot2(`#parentDiv`);
 * plot.add(10);
 * plot.clear();
 *
 * // Plot data using series
 * plot.add(-1, `temp`);
 * plot.add(0.4, `humidty`);
 * ```
 *
 * Options can be specified to customise plot
 * ```
 * const plot = plot2(`#parentDiv`, {
 *  capacity: 100,     // How many data points to store (default: 10)
 *  showYAxis: false,  // Toggle whether y axis is shown (default: true)
 *  lineWidth: 2,      // Width of plot line (default: 2)
 *  yAxes:  [`temp`],  // Only show these y axes (by default all are shown)
 *  palette: Palette,  // Colour palette instance to use
 *  coalesce: true,    // If true, sub-pixel data points are skipped, improving performance for dense plots at the expense of plot precision
 * });
 * ```
 *
 * By default, will attempt to use CSS variable `--series[seriesName]` for axis colours. -axis for titles.
 * @param {string} parentElOrQuery
 * @param {PlotOpts} opts
 * @return {*}
 */
declare const plot: (parentElOrQuery: string | HTMLElement, opts: PlotOpts) => Plotter;
declare type Plotter = {
    add(value: number, series?: string, skipDrawing?: boolean): void;
    clear(): void;
    dispose(): void;
};

type Plot_PlotOpts = PlotOpts;
declare const Plot_createScales: typeof createScales;
declare const Plot_add: typeof add;
declare const Plot_draw: typeof draw;
declare const Plot_drawSeriesAxis: typeof drawSeriesAxis;
declare const Plot_drawSeries: typeof drawSeries;
declare const Plot_plot: typeof plot;
type Plot_Plotter = Plotter;
declare namespace Plot {
  export {
    Plot_PlotOpts as PlotOpts,
    Plot_createScales as createScales,
    Plot_add as add,
    Plot_draw as draw,
    Plot_drawSeriesAxis as drawSeriesAxis,
    Plot_drawSeries as drawSeries,
    Plot_plot as plot,
    Plot_Plotter as Plotter,
  };
}

declare type Cmyk = readonly [number, number, number, number];
declare type Lab = readonly [number, number, number];
declare type Rgb$1 = readonly [number, number, number];
declare type DictColour = {
    readonly name: string;
    readonly combinations: ReadonlyArray<number>;
    readonly swatch: number;
    readonly cmyk: Cmyk;
    readonly lab: Lab;
    readonly rgb: Rgb$1;
    readonly hex: string;
};
declare const randomPalette: (minColours?: number) => readonly DictColour[];

type DictionaryOfColourCombinations_DictColour = DictColour;
declare const DictionaryOfColourCombinations_randomPalette: typeof randomPalette;
declare namespace DictionaryOfColourCombinations {
  export {
    DictionaryOfColourCombinations_DictColour as DictColour,
    DictionaryOfColourCombinations_randomPalette as randomPalette,
  };
}

declare type Hsl = {
    h: number;
    s: number;
    l: number;
    opacity?: number;
};
declare type Rgb = {
    r: number;
    g: number;
    b: number;
    opacity?: number;
};
declare type Spaces = `hsl` | `rgb` | `lab` | `hcl` | `cubehelix`;
/**
 * @private
 */
declare type Colour = d3Colour.RGBColor | d3Colour.HSLColor;
declare type Colourish = string | d3Colour.ColorCommonInstance;
/**
 * Options for interpolation
 */
declare type InterpolationOpts = {
    /**
     * Gamma correction. Eg 4 brightens values. Only applies to rgb and cubehelix
     * [Read more](https://github.com/d3/d3-interpolate#interpolate_gamma)
     */
    gamma?: number;
    /**
     * Colour space
     */
    space?: Spaces;
    /**
     * If true, interpolation happens the longer distance. Only applies to hsl, hcl and cubehelix
     */
    long?: boolean;
};
/**
 * Parses colour to {h,s,l}. `opacity` field is added if it exists on source.
 * @param colour
 * @returns
 */
declare const toHsl: (colour: Colourish) => Hsl;
/**
 * Parses colour to {r,g,b}. `opacity` field is added if it exists on source.
 * @param colour
 * @returns
 */
declare const toRgb: (colour: Colourish) => Rgb;
/**
 * Returns a colour in hex format `#000000`
 * @param colour
 * @returns Hex format, including #
 */
declare const toHex: (colour: Colourish) => string;
/**
 * Returns a variation of colour with its opacity multiplied by `amt`.
 *
 * ```js
 * opacity(`blue`, 0.5);
 * ```
 * @param colour
 * @param amt
 * @returns
 */
declare const opacity: (colour: Colourish, amt: number) => string;
/**
 * Gets a CSS variable.
 * @example Fetch --accent variable, or use `yellow` if not found.
 * ```
 * getCssVariable(`accent`, `yellow`);
 * ```
 * @param name Name of variable. Do not starting `--`
 * @param fallbackColour Fallback colour if not found
 * @param root  Element to search variable from
 * @returns Colour or fallback.
 */
declare const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement | undefined) => string;
/**
 * Interpolates between two colours, returning a string
 *
 * @example
 * ```js
 * // Get 50% between blue and red
 * interpolate(0.5, `blue`, `red`);
 *
 * // Get midway point, with specified colour space
 * interpolate(0.5, `hsl(200, 100%, 50%)`, `pink`, {space: `hcl`});
 * ```
 * @param amount Amount (0 = from, 0.5 halfway, 1= to)
 * @param from Starting colour
 * @param to Final colour
 * @param optsOrSpace Options for interpolation, or string name for colour space, eg `hsl`.
 * @returns String representation of colour, eg. `rgb(x,x,x)`
 */
declare const interpolate: (amount: number, from: Colourish, to: Colourish, optsOrSpace?: string | InterpolationOpts | undefined) => string;
/**
 * Produces a scale of colours as a string array
 *
 * @example
 * ```js
 * // Yields array of 5 colour strings
 * const s = scale(5, {space:`hcl`}, `blue`, `red`);
 * // Produces scale between three colours
 * const s = scale(5, {space:`hcl`}, `blue`, `yellow`, `red`);
 * ```
 * @param steps Number of colours
 * @param opts Options for interpolation, or string colour space eg `hsl`
 * @param colours From/end colours (or more)
 * @returns
 */
declare const scale: (steps: number, opts: InterpolationOpts | string, ...colours: Colourish[]) => string[];

type Colour$1_Hsl = Hsl;
type Colour$1_Rgb = Rgb;
type Colour$1_Spaces = Spaces;
type Colour$1_Colour = Colour;
type Colour$1_Colourish = Colourish;
type Colour$1_InterpolationOpts = InterpolationOpts;
declare const Colour$1_toHsl: typeof toHsl;
declare const Colour$1_toRgb: typeof toRgb;
declare const Colour$1_toHex: typeof toHex;
declare const Colour$1_opacity: typeof opacity;
declare const Colour$1_getCssVariable: typeof getCssVariable;
declare const Colour$1_interpolate: typeof interpolate;
declare const Colour$1_scale: typeof scale;
declare namespace Colour$1 {
  export {
    Colour$1_Hsl as Hsl,
    Colour$1_Rgb as Rgb,
    Colour$1_Spaces as Spaces,
    Colour$1_Colour as Colour,
    Colour$1_Colourish as Colourish,
    Colour$1_InterpolationOpts as InterpolationOpts,
    Colour$1_toHsl as toHsl,
    Colour$1_toRgb as toRgb,
    Colour$1_toHex as toHex,
    Colour$1_opacity as opacity,
    Colour$1_getCssVariable as getCssVariable,
    Colour$1_interpolate as interpolate,
    Colour$1_scale as scale,
  };
}

declare const index_Drawing: typeof Drawing;
declare const index_Svg: typeof Svg;
declare const index_Plot: typeof Plot;
declare const index_DictionaryOfColourCombinations: typeof DictionaryOfColourCombinations;
declare namespace index {
  export {
    Colour$1 as Colour,
    Palette$1 as Palette,
    index_Drawing as Drawing,
    index_Svg as Svg,
    index_Plot as Plot,
    index_DictionaryOfColourCombinations as DictionaryOfColourCombinations,
  };
}

export { Colour$1 as C, DictionaryOfColourCombinations as D, Palette$1 as P, Plot as a, index as i };
