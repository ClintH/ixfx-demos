export { i as Flow, R as Result, b as ResultError, a as ResultOk } from './index-SKxM4K87.js';
export { i as Data } from './index-6Y46UWYR.js';
export { i as Debug } from './index-QAIl5wDe.js';
export { i as Rx } from './index-j6DaWrQG.js';
export { i as Geometry } from './Types-ctEnA-DU.js';
export { T as Text } from './Text-6KxZu_Py.js';
export { N as Numbers } from './Numbers-YfC46Iox.js';
export { i as Io } from './index-Bes3cTSK.js';
export { i as Generators } from './index-vO0PdLZF.js';
export { i as Visual } from './index-1olwmA4N.js';
export { i as Dom } from './index-QIMs6tVQ.js';
export { E as Events } from './Events-nue2G3Li.js';
export { i as Modulation } from './index-BP9oer8j.js';
export { i as Collections } from './MakeGlobal-NPFPy2NR.js';
export { i as Random } from './index-rTszY0HY.js';
export { K as KeyValues } from './KeyValue-oNBp4v46.js';
export { U as Util } from './Util-lqHq7HUO.js';
export { I as IsEqual, i as isEqualDefault, b as isEqualValueDefault, d as isEqualValueIgnoreOrder, c as isEqualValuePartial, t as toStringDefault, a as toStringOrdered } from './IsEqual-f56NWa68.js';
export { I as Immutable } from './Immutable-jSEGJG3T.js';
import './IntervalType-CQa4mlKV.js';
import './Types-WqS2k5P9.js';
import './StateMachine-l747nwxG.js';
import './Logger-3Dx4p_J4.js';
import './Types-Yc1lP6QG.js';
import './Timer-wJkOCIXz.js';
import './Delay-PO9jy0yJ.js';
import './Continuously-0k92J-5Q.js';
import './MinMaxAvg-X_wBRrCz.js';
import './NumberTracker-cMpfgIFE.js';
import './GetOrGenerate-HGpLQwnB.js';
import './index-s45AP2Rl.js';
import './Types-ATA4eXqe.js';
import './index-ESkpRsmo.js';
import 'bezier-js';
import './Polar-3T23WzQa.js';
import './Types-MxrOXUFX.js';
import './index-fhAjN_Cu.js';
import './Types-Dp38nROC.js';
import './Scaler-zpwNP-Ej.js';
import './Colour-evWjV2of.js';
import 'd3-color';
import './String-0_Mbtxci.js';
import './Easing-wT3yQyiZ.js';
import './QueueMutable-y9N20W8a.js';
import './Video-HeCB2pcQ.js';
import './PingPong-_5d7nj3a.js';
import './IMapOfMutableExtended-OxnNM6u4.js';
import './Svg-Wwj6-Hfp.js';
import './Forms-L7Bq41nz.js';
import './index-WOQU6Vla.js';
import './index-POwx0MHI.js';
import './index-02SnR_hB.js';

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
