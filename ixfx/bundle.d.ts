export { i as Data } from './index-xBGsVQzo.js';
export { i as Debug } from './index-QAIl5wDe.js';
export { i as Geometry } from './Types-3Iwe7Gja.js';
export { T as Text } from './Text--W9w1n_f.js';
export { N as Numbers } from './Numbers-QnBlxqkc.js';
export { i as Io } from './index-TXoSO1PW.js';
export { i as Flow } from './index-ZhwOU8yi.js';
export { G as Generators } from './Generators-h1ucj3IJ.js';
export { i as Visual } from './index-nJPbBXMT.js';
export { i as Dom } from './index-ZMsDaJKf.js';
export { E as Events } from './Events-Nrj5kd7m.js';
export { i as Modulation } from './index-59X7GKMR.js';
export { i as Collections } from './MakeGlobal-_36cgUqn.js';
export { i as Random } from './index-GJwOSjol.js';
export { K as KeyValues } from './KeyValue-6zP_QgTW.js';
export { U as Util } from './Util-Voz0dRxX.js';
export { I as IsEqual, i as isEqualDefault, d as isEqualTrace, b as isEqualValueDefault, e as isEqualValueIgnoreOrder, c as isEqualValuePartial, t as toStringDefault, a as toStringOrdered } from './IsEqual-FYvx3mfi.js';
export { I as Immutable } from './Immutable-UPIeGnMb.js';
import './MinMaxAvg-X_wBRrCz.js';
import './NumberTracker-UFa0HdgL.js';
import './GetOrGenerate-HGpLQwnB.js';
import './index-hzykKOZZ.js';
import './Types-ATA4eXqe.js';
import './index-zrxduB_i.js';
import 'bezier-js';
import './Polar-d4ZsOE9z.js';
import './Reactive-WdMIvCQe.js';
import './IntervalType-zqeNLRm6.js';
import './Types-Yc1lP6QG.js';
import './Logger-3Dx4p_J4.js';
import './index-lHZaM2qZ.js';
import './Types-Dp38nROC.js';
import './Scaler-Omk1IaZJ.js';
import './Colour-H0rutTnP.js';
import 'd3-color';
import './String-0_Mbtxci.js';
import './Easing-wT3yQyiZ.js';
import './Types-WqS2k5P9.js';
import './StateMachine-I1bLnwhl.js';
import './QueueMutable-yoYJUNSp.js';
import './Continuously-Cy5rFTxd.js';
import './Video-HeCB2pcQ.js';
import './Timer-UhFryL5Q.js';
import './Delay-7aGEWbie.js';
import './PingPong-_5d7nj3a.js';
import './IMapOfMutableExtended-FYs7kpPg.js';
import './Svg-ANnXMMuO.js';
import './Forms-L7Bq41nz.js';
import './index-lZDksnZ7.js';
import './index-dCWqpzL4.js';
import './index-JvLnxXU2.js';

type ChangeKind = `mutate` | `add` | `del`;
type ChangeRecord = [kind: ChangeKind, path: string, value: any];
/**
 * Result of {@link compareData}
 */
type CompareChangeSet = {
    /**
     * _True_ if there are any changes
     */
    hasChanged: boolean;
    /**
     * Results for child objects
     */
    children: Record<string, CompareChangeSet>;
    /**
     * Values that have changed
     */
    changed: Record<string, any>;
    /**
     * Fields that have been added
     */
    added: Record<string, any>;
    /**
     * Fields that have been removed
     */
    removed: Array<string>;
    isArray: boolean;
    summary: Array<ChangeRecord>;
};
/**
 * Returns the changed fields from A -> B. It's assumed that A and B have the same shape.
 * ie. returns an object that only consists of fields which have changed in B compared to A.
 *
 * ```js
 * const a = { msg: `hi`, v: 10 };
 *
 * changedDataFields(a, { msg: `hi`,   v: 10 }); // {}
 * changedDataFields(a, { msg: `hi!!`, v: 10 }); // { msg: `hi!!` }
 * changedDataFields(a, { msg: `hi!!` });       // { msg: `hi!!`, v: undefined }
 * ```
 *
 * Under the hood, we use `{@link compareData}(a, b, true)`. If B has additional or removed fields,
 * this is considered an error.
 *
 * If a field is an array, the whole array is returned, rather than a diff.
 * @param a
 * @param b
 */
declare const changedDataFields: (a: object, b: object) => any[] | Record<string, any>;
/**
 * Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the values are primitive values or other simple objects.
 *
 * @param a
 * @param b
 */
declare const compareData: (a: object, b: object, assumeSameShape?: boolean) => CompareChangeSet;

export { type ChangeKind, type ChangeRecord, type CompareChangeSet, changedDataFields, compareData };
