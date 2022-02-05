import { T as ToString } from './util-ca5031db';
import { S as SetMutable } from './Interfaces-1af00b23';

/**
 * Returns a {@link SetMutable}. Sets are useful when you want to ignore duplicate values.
 *
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
