import { T as ToString } from './Util-2fe444f8.js';
import { S as SetMutable } from './Interfaces-24e46713.js';

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
