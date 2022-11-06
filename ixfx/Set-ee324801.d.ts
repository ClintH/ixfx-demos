import { T as ToString } from './Util-55c68770.js';
import { m as SetImmutable, S as SetMutable } from './Interfaces-afd3b408.js';

/**
 * Immutable set that uses a `keyString` function to determine uniqueness
 *
 * @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`.
 * @returns
 */
declare const set: <V>(keyString: ToString<V>) => SetImmutable<V>;
/**
 * Creates a {@link SetMutable}.
 * @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`
 * @returns
 */
declare const setMutable: <V>(keyString?: ToString<V> | undefined) => SetMutable<V>;

declare const Set_set: typeof set;
declare const Set_setMutable: typeof setMutable;
declare namespace Set {
  export {
    Set_set as set,
    Set_setMutable as setMutable,
  };
}

export { Set as S, set as a, setMutable as s };
