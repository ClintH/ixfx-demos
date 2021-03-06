import { T as ToString } from './Util-e3ea7983.js';
import { S as SetMutable } from './Interfaces-72d49634.js';

/**
 * Creates a {@link SetMutable}.
 * @param keyString Function that produces a key for items. If unspecified uses JSON.stringify
 * @returns
 */
declare const setMutable: <V>(keyString?: ToString<V> | undefined) => SetMutable<V>;

declare const Set_setMutable: typeof setMutable;
declare namespace Set {
  export {
    Set_setMutable as setMutable,
  };
}

export { Set as S, setMutable as s };
