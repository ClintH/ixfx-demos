export { i as Data } from './index-kN9UjBzt.js';
export { i as Debug } from './index-QAIl5wDe.js';
export { i as Rx } from './index-EcyTCwaw.js';
export { i as Geometry } from './Types-z1qR3CFi.js';
export { T as Text } from './Text-xrn6LOT4.js';
export { N as Numbers } from './Numbers-AAQeoIvV.js';
export { i as Io } from './index-lkiCPFz0.js';
export { i as Flow } from './index-akG0xQKA.js';
export { i as Generators } from './index-wLt3jLsu.js';
export { i as Visual } from './index-3G5bikq8.js';
export { i as Dom } from './index-Kpcdf3i1.js';
export { E as Events } from './Events-Nrj5kd7m.js';
export { i as Modulation } from './index-irCZu2vy.js';
export { i as Collections } from './MakeGlobal-z1h_w5em.js';
export { i as Random } from './index-i--9bAMg.js';
export { K as KeyValues } from './KeyValue-6zP_QgTW.js';
export { U as Util } from './Util-lqHq7HUO.js';
export { I as IsEqual, i as isEqualDefault, b as isEqualValueDefault, d as isEqualValueIgnoreOrder, c as isEqualValuePartial, t as toStringDefault, a as toStringOrdered } from './IsEqual-f56NWa68.js';
export { I as Immutable } from './Immutable-be36LyLq.js';
import './MinMaxAvg-X_wBRrCz.js';
import './NumberTracker-UFa0HdgL.js';
import './GetOrGenerate-HGpLQwnB.js';
import './index-jU6_fzOJ.js';
import './Types-ATA4eXqe.js';
import './index-XsioXNLe.js';
import 'bezier-js';
import './Polar-KUNFQseW.js';
import './Types-Yc1lP6QG.js';
import './Logger-3Dx4p_J4.js';
import './Types-gJGozn7r.js';
import './IntervalType-zqeNLRm6.js';
import './index-eVnw7dUK.js';
import './Types-Dp38nROC.js';
import './Scaler-gJEiwpI0.js';
import './Colour-H0rutTnP.js';
import 'd3-color';
import './Easing-6Rck5sJB.js';
import './Types-WqS2k5P9.js';
import './StateMachine-I1bLnwhl.js';
import './QueueMutable-y9N20W8a.js';
import './Continuously-Cy5rFTxd.js';
import './Video-HeCB2pcQ.js';
import './Timer-UhFryL5Q.js';
import './Delay-hF1EMMFA.js';
import './PingPong-_5d7nj3a.js';
import './IMapOfMutableExtended-1zto7GSn.js';
import './Svg-KBIBSbVV.js';
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
