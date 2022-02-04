import { M as MutableStringSet, m as mutableStringSet } from './Set-620796b6';

declare const randomElement: <V>(array: ArrayLike<V>) => V;

declare const index_MutableStringSet: typeof MutableStringSet;
declare const index_mutableStringSet: typeof mutableStringSet;
declare const index_randomElement: typeof randomElement;
declare namespace index {
  export {
    index_MutableStringSet as MutableStringSet,
    index_mutableStringSet as mutableStringSet,
    index_randomElement as randomElement,
  };
}

export { index as i, randomElement as r };
