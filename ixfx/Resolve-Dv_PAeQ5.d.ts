import { e as ReactiveNonInitial } from './Types-wAi1hdUW.js';
import { V as ValueType } from './Types-AjpgZy7P.js';

/**
 * Something that can resolve to a value
 */
type ResolveToValueSync<V> = ValueType | ReactiveNonInitial<V> | Generator<V> | IterableIterator<V> | ((args: any) => V);
type ResolveToValueAsync<V> = AsyncGenerator<V> | AsyncIterableIterator<V> | Promise<V> | ((args: any) => Promise<V>);
type ResolveToValue<V> = ResolveToValueAsync<V> | ResolveToValueSync<V>;
/**
 * Resolves `r` to a value, where `r` is:
 * * primitive value
 * * a/sync function
 * * a/sync generator/iterator
 * * ReactiveNonInitial
 * ```js
 * await resolve(10);       // 10
 * await resolve(() => 10); // 10
 * await resole(async () => {
 *  sleep(100);
 *  return 10;
 * });                // 10
 * ```
 *
 * To resolve an object's properties, use {@link resolveFields}.
 *
 * Resolve is not recursive. So if `r` is an object, it will be returned, even
 * though its properties may be resolvable.
 * @param r
 * @param args
 * @returns
 */
declare function resolve<V extends ValueType>(r: ResolveToValue<V>, ...args: any): Promise<V>;
declare function resolveSync<V extends ValueType>(r: ResolveToValueSync<V>, ...args: any): V;
/**
 * Resolves a value as per {@link resolve}, however
 * If an error is thrown or the resolution results in _undefined_
 * or NaN, `fallbackValue` is returned instead.
 *
 * `null` is an allowed return value.
 *
 * ```js
 * // Function returns undefined 50% of the time or 0
 * const fn = () => {
 *  if (Math.random() >= 0.5) return; // undefined
 *  return 0;
 * }
 * const r = resolveWithFallback(fn, 1);
 * const value = r(); // Always 0 or 1
 * ```
 * @param p Thing to resolve
 * @param fallback Fallback value if an error happens, undefined or NaN
 * @param args
 * @returns
 */
declare function resolveWithFallback<T extends ValueType>(p: ResolveToValue<T>, fallback: ResolveFallbackOpts<T>, ...args: any): Promise<T>;
declare function resolveWithFallbackSync<T extends ValueType>(p: ResolveToValueSync<T>, fallback: ResolveFallbackOpts<T>, ...args: any): T;
type ResolveFallbackOpts<T> = {
    value: T;
    overrideWithLast?: boolean;
};

export { type ResolveToValue as R, type ResolveFallbackOpts as a, type ResolveToValueAsync as b, type ResolveToValueSync as c, resolveSync as d, resolveWithFallback as e, resolveWithFallbackSync as f, resolve as r };
