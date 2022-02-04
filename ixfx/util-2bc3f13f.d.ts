declare type ToString<V> = (itemToMakeStringFor: V) => string;
declare type IsEqual<V> = (a: V, b: V) => boolean;

export { IsEqual as I, ToString as T };
