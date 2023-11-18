/**
 * A random source.
 *
 * Predefined sources: {@link defaultRandom}, {@link gaussianSource}, {@link weightedSource}
 */
type RandomSource = () => number;
type StringOptions = Readonly<{
    length: number;
    source?: RandomSource;
}>;
/**
 * Default random number generator: `Math.random`.
 */
declare const defaultRandom: () => number;
type RandomOptions = Readonly<{
    max: number;
    min?: number;
    source?: RandomSource;
}>;

export { RandomOptions as R, StringOptions as S, RandomSource as a, defaultRandom as d };
