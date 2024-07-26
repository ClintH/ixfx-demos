type StringOrNumber = string | number | bigint;
type Primitive = string | number | bigint | boolean;
type PrimitiveOrObject = Primitive | object;
type BasicType = StringOrNumber | object;
type KeyValue = readonly [key: string, value: StringOrNumber];

export type { BasicType as B, KeyValue as K, Primitive as P, StringOrNumber as S, PrimitiveOrObject as a };
