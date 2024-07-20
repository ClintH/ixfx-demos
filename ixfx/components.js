import {
  getSorter
} from "./chunk-NBBVKVFQ.js";
import "./chunk-BXWBMVS6.js";
import "./chunk-TZZOFPLH.js";
import "./chunk-2XNNMGQC.js";
import "./chunk-UH4IORRN.js";
import "./chunk-N37UR7MZ.js";
import "./chunk-KQLC3QPI.js";
import "./chunk-3ZEQSJPN.js";
import "./chunk-5VWJ6TUI.js";
import "./chunk-QZ7DQTW7.js";
import "./chunk-HOGLR6UM.js";
import "./chunk-SGQC7FGM.js";
import "./chunk-JIDOUNL5.js";
import {
  __decorateClass,
  __publicField
} from "./chunk-AFNFQUHK.js";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t6, e5, o5) {
    if (this._$cssResult$ = true, o5 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e5;
  }
  get styleSheet() {
    let t6 = this.o;
    const s5 = this.t;
    if (e && void 0 === t6) {
      const e5 = void 0 !== s5 && 1 === s5.length;
      e5 && (t6 = o.get(s5)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s5, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var i = (t6, ...e5) => {
  const o5 = 1 === t6.length ? t6[0] : e5.reduce((e6, s5, o6) => e6 + ((t7) => {
    if (true === t7._$cssResult$) return t7.cssText;
    if ("number" == typeof t7) return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t6[o6 + 1], t6[0]);
  return new n(o5, t6, s);
};
var S = (s5, o5) => {
  if (e) s5.adoptedStyleSheets = o5.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else for (const e5 of o5) {
    const o6 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o6.setAttribute("nonce", n5), o6.textContent = e5.cssText, s5.appendChild(o6);
  }
};
var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e5 = "";
  for (const s5 of t7.cssRules) e5 += s5.cssText;
  return r(e5);
})(t6) : t6;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t6, s5) => t6;
var u = { toAttribute(t6, s5) {
  switch (s5) {
    case Boolean:
      t6 = t6 ? l : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, s5) {
  let i5 = t6;
  switch (s5) {
    case Boolean:
      i5 = null !== t6;
      break;
    case Number:
      i5 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t6);
      } catch (t7) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t6, s5) => !i2(t6, s5);
var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
  static addInitializer(t6) {
    this._$Ei(), (this.l ??= []).push(t6);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t6, s5 = y) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t6, s5), !s5.noAccessor) {
      const i5 = Symbol(), r7 = this.getPropertyDescriptor(t6, i5, s5);
      void 0 !== r7 && e2(this.prototype, t6, r7);
    }
  }
  static getPropertyDescriptor(t6, s5, i5) {
    const { get: e5, set: h4 } = r2(this.prototype, t6) ?? { get() {
      return this[s5];
    }, set(t7) {
      this[s5] = t7;
    } };
    return { get() {
      return e5?.call(this);
    }, set(s6) {
      const r7 = e5?.call(this);
      h4.call(this, s6), this.requestUpdate(t6, r7, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t6 = n2(this);
    t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t7 = this.properties, s5 = [...h(t7), ...o2(t7)];
      for (const i5 of s5) this.createProperty(i5, t7[i5]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s5 = litPropertyMetadata.get(t6);
      if (void 0 !== s5) for (const [t7, i5] of s5) this.elementProperties.set(t7, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s5] of this.elementProperties) {
      const i5 = this._$Eu(t7, s5);
      void 0 !== i5 && this._$Eh.set(i5, t7);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i5 = [];
    if (Array.isArray(s5)) {
      const e5 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e5) i5.unshift(c(s6));
    } else void 0 !== s5 && i5.push(c(s5));
    return i5;
  }
  static _$Eu(t6, s5) {
    const i5 = s5.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
  }
  addController(t6) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
  }
  removeController(t6) {
    this._$EO?.delete(t6);
  }
  _$E_() {
    const t6 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i5 of s5.keys()) this.hasOwnProperty(i5) && (t6.set(i5, this[i5]), delete this[i5]);
    t6.size > 0 && (this._$Ep = t6);
  }
  createRenderRoot() {
    const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t6, this.constructor.elementStyles), t6;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t6) => t6.hostDisconnected?.());
  }
  attributeChangedCallback(t6, s5, i5) {
    this._$AK(t6, i5);
  }
  _$EC(t6, s5) {
    const i5 = this.constructor.elementProperties.get(t6), e5 = this.constructor._$Eu(t6, i5);
    if (void 0 !== e5 && true === i5.reflect) {
      const r7 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s5, i5.type);
      this._$Em = t6, null == r7 ? this.removeAttribute(e5) : this.setAttribute(e5, r7), this._$Em = null;
    }
  }
  _$AK(t6, s5) {
    const i5 = this.constructor, e5 = i5._$Eh.get(t6);
    if (void 0 !== e5 && this._$Em !== e5) {
      const t7 = i5.getPropertyOptions(e5), r7 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
      this._$Em = e5, this[e5] = r7.fromAttribute(s5, t7.type), this._$Em = null;
    }
  }
  requestUpdate(t6, s5, i5) {
    if (void 0 !== t6) {
      if (i5 ??= this.constructor.getPropertyOptions(t6), !(i5.hasChanged ?? f)(this[t6], s5)) return;
      this.P(t6, s5, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t6, s5, i5) {
    this._$AL.has(t6) || this._$AL.set(t6, s5), true === i5.reflect && this._$Em !== t6 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t6);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t8, s6] of this._$Ep) this[t8] = s6;
        this._$Ep = void 0;
      }
      const t7 = this.constructor.elementProperties;
      if (t7.size > 0) for (const [s6, i5] of t7) true !== i5.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.P(s6, this[s6], i5);
    }
    let t6 = false;
    const s5 = this._$AL;
    try {
      t6 = this.shouldUpdate(s5), t6 ? (this.willUpdate(s5), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s5)) : this._$EU();
    } catch (s6) {
      throw t6 = false, this._$EU(), s6;
    }
    t6 && this._$AE(s5);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    this._$Ej &&= this._$Ej.forEach((t7) => this._$EC(t7, this[t7])), this._$EU();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var a2 = Array.isArray;
var u2 = (t6) => a2(t6) || "function" == typeof t6?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t6) => (i5, ...s5) => ({ _$litType$: t6, strings: i5, values: s5 });
var x = y2(1);
var b2 = y2(2);
var w = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var E = r3.createTreeWalker(r3, 129);
function C(t6, i5) {
  if (!Array.isArray(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i5) : i5;
}
var P = (t6, i5) => {
  const s5 = t6.length - 1, o5 = [];
  let r7, l3 = 2 === i5 ? "<svg>" : "", c5 = f2;
  for (let i6 = 0; i6 < s5; i6++) {
    const s6 = t6[i6];
    let a3, u5, d3 = -1, y3 = 0;
    for (; y3 < s6.length && (c5.lastIndex = y3, u5 = c5.exec(s6), null !== u5); ) y3 = c5.lastIndex, c5 === f2 ? "!--" === u5[1] ? c5 = v : void 0 !== u5[1] ? c5 = _ : void 0 !== u5[2] ? ($.test(u5[2]) && (r7 = RegExp("</" + u5[2], "g")), c5 = m) : void 0 !== u5[3] && (c5 = m) : c5 === m ? ">" === u5[0] ? (c5 = r7 ?? f2, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? m : '"' === u5[3] ? g : p2) : c5 === g || c5 === p2 ? c5 = m : c5 === v || c5 === _ ? c5 = f2 : (c5 = m, r7 = void 0);
    const x2 = c5 === m && t6[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c5 === f2 ? s6 + n3 : d3 >= 0 ? (o5.push(a3), s6.slice(0, d3) + e3 + s6.slice(d3) + h2 + x2) : s6 + h2 + (-2 === d3 ? i6 : x2);
  }
  return [C(t6, l3 + (t6[s5] || "<?>") + (2 === i5 ? "</svg>" : "")), o5];
};
var V = class _V {
  constructor({ strings: t6, _$litType$: s5 }, n5) {
    let r7;
    this.parts = [];
    let c5 = 0, a3 = 0;
    const u5 = t6.length - 1, d3 = this.parts, [f3, v3] = P(t6, s5);
    if (this.el = _V.createElement(f3, n5), E.currentNode = this.el.content, 2 === s5) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r7 = E.nextNode()) && d3.length < u5; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t7 of r7.getAttributeNames()) if (t7.endsWith(e3)) {
          const i5 = v3[a3++], s6 = r7.getAttribute(t7).split(h2), e5 = /([.?@])?(.*)/.exec(i5);
          d3.push({ type: 1, index: c5, name: e5[2], strings: s6, ctor: "." === e5[1] ? k : "?" === e5[1] ? H : "@" === e5[1] ? I : R }), r7.removeAttribute(t7);
        } else t7.startsWith(h2) && (d3.push({ type: 6, index: c5 }), r7.removeAttribute(t7));
        if ($.test(r7.tagName)) {
          const t7 = r7.textContent.split(h2), s6 = t7.length - 1;
          if (s6 > 0) {
            r7.textContent = i3 ? i3.emptyScript : "";
            for (let i5 = 0; i5 < s6; i5++) r7.append(t7[i5], l2()), E.nextNode(), d3.push({ type: 2, index: ++c5 });
            r7.append(t7[s6], l2());
          }
        }
      } else if (8 === r7.nodeType) if (r7.data === o3) d3.push({ type: 2, index: c5 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = r7.data.indexOf(h2, t7 + 1)); ) d3.push({ type: 7, index: c5 }), t7 += h2.length - 1;
      }
      c5++;
    }
  }
  static createElement(t6, i5) {
    const s5 = r3.createElement("template");
    return s5.innerHTML = t6, s5;
  }
};
function N(t6, i5, s5 = t6, e5) {
  if (i5 === w) return i5;
  let h4 = void 0 !== e5 ? s5._$Co?.[e5] : s5._$Cl;
  const o5 = c3(i5) ? void 0 : i5._$litDirective$;
  return h4?.constructor !== o5 && (h4?._$AO?.(false), void 0 === o5 ? h4 = void 0 : (h4 = new o5(t6), h4._$AT(t6, s5, e5)), void 0 !== e5 ? (s5._$Co ??= [])[e5] = h4 : s5._$Cl = h4), void 0 !== h4 && (i5 = N(t6, h4._$AS(t6, i5.values), h4, e5)), i5;
}
var S2 = class {
  constructor(t6, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    const { el: { content: i5 }, parts: s5 } = this._$AD, e5 = (t6?.creationScope ?? r3).importNode(i5, true);
    E.currentNode = e5;
    let h4 = E.nextNode(), o5 = 0, n5 = 0, l3 = s5[0];
    for (; void 0 !== l3; ) {
      if (o5 === l3.index) {
        let i6;
        2 === l3.type ? i6 = new M(h4, h4.nextSibling, this, t6) : 1 === l3.type ? i6 = new l3.ctor(h4, l3.name, l3.strings, this, t6) : 6 === l3.type && (i6 = new L(h4, this, t6)), this._$AV.push(i6), l3 = s5[++n5];
      }
      o5 !== l3?.index && (h4 = E.nextNode(), o5++);
    }
    return E.currentNode = r3, e5;
  }
  p(t6) {
    let i5 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t6, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t6[i5])), i5++;
  }
};
var M = class _M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t6, i5, s5, e5) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t6, this._$AB = i5, this._$AM = s5, this.options = e5, this._$Cv = e5?.isConnected ?? true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t6?.nodeType && (t6 = i5.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i5 = this) {
    t6 = N(this, t6, i5), c3(t6) ? t6 === T || null == t6 || "" === t6 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t6 !== this._$AH && t6 !== w && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : u2(t6) ? this.k(t6) : this._(t6);
  }
  S(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  T(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.S(t6));
  }
  _(t6) {
    this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(r3.createTextNode(t6)), this._$AH = t6;
  }
  $(t6) {
    const { values: i5, _$litType$: s5 } = t6, e5 = "number" == typeof s5 ? this._$AC(t6) : (void 0 === s5.el && (s5.el = V.createElement(C(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e5) this._$AH.p(i5);
    else {
      const t7 = new S2(e5, this), s6 = t7.u(this.options);
      t7.p(i5), this.T(s6), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i5 = A.get(t6.strings);
    return void 0 === i5 && A.set(t6.strings, i5 = new V(t6)), i5;
  }
  k(t6) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s5, e5 = 0;
    for (const h4 of t6) e5 === i5.length ? i5.push(s5 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s5 = i5[e5], s5._$AI(h4), e5++;
    e5 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e5), i5.length = e5);
  }
  _$AR(t6 = this._$AA.nextSibling, i5) {
    for (this._$AP?.(false, true, i5); t6 && t6 !== this._$AB; ) {
      const i6 = t6.nextSibling;
      t6.remove(), t6 = i6;
    }
  }
  setConnected(t6) {
    void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
  }
};
var R = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t6, i5, s5, e5, h4) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t6, this.name = i5, this._$AM = e5, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = T;
  }
  _$AI(t6, i5 = this, s5, e5) {
    const h4 = this.strings;
    let o5 = false;
    if (void 0 === h4) t6 = N(this, t6, i5, 0), o5 = !c3(t6) || t6 !== this._$AH && t6 !== w, o5 && (this._$AH = t6);
    else {
      const e6 = t6;
      let n5, r7;
      for (t6 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r7 = N(this, e6[s5 + n5], i5, n5), r7 === w && (r7 = this._$AH[n5]), o5 ||= !c3(r7) || r7 !== this._$AH[n5], r7 === T ? t6 = T : t6 !== T && (t6 += (r7 ?? "") + h4[n5 + 1]), this._$AH[n5] = r7;
    }
    o5 && !e5 && this.j(t6);
  }
  j(t6) {
    t6 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
  }
};
var k = class extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === T ? void 0 : t6;
  }
};
var H = class extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    this.element.toggleAttribute(this.name, !!t6 && t6 !== T);
  }
};
var I = class extends R {
  constructor(t6, i5, s5, e5, h4) {
    super(t6, i5, s5, e5, h4), this.type = 5;
  }
  _$AI(t6, i5 = this) {
    if ((t6 = N(this, t6, i5, 0) ?? T) === w) return;
    const s5 = this._$AH, e5 = t6 === T && s5 !== T || t6.capture !== s5.capture || t6.once !== s5.once || t6.passive !== s5.passive, h4 = t6 !== T && (s5 === T || e5);
    e5 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var L = class {
  constructor(t6, i5, s5) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    N(this, t6);
  }
};
var z = { P: e3, A: h2, C: o3, M: 1, L: P, R: S2, D: u2, V: N, I: M, H: R, N: H, U: I, B: k, F: L };
var Z = t2.litHtmlPolyfillSupport;
Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.4");
var j = (t6, i5, s5) => {
  const e5 = s5?.renderBefore ?? i5;
  let h4 = e5._$litPart$;
  if (void 0 === h4) {
    const t7 = s5?.renderBefore ?? null;
    e5._$litPart$ = h4 = new M(i5.insertBefore(l2(), t7), t7, void 0, s5 ?? {});
  }
  return h4._$AI(t6), h4;
};

// node_modules/lit-element/lit-element.js
var s3 = class extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t6 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t6.firstChild, t6;
  }
  update(t6) {
    const i5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = j(i5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return w;
  }
};
s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
var r4 = globalThis.litElementPolyfillSupport;
r4?.({ LitElement: s3 });
(globalThis.litElementVersions ??= []).push("4.0.4");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t6) => (e5, o5) => {
  void 0 !== o5 ? o5.addInitializer(() => {
    customElements.define(t6, e5);
  }) : customElements.define(t6, e5);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o4 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r5 = (t6 = o4, e5, r7) => {
  const { kind: n5, metadata: i5 } = r7;
  let s5 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i5, s5 = /* @__PURE__ */ new Map()), s5.set(r7.name, t6), "accessor" === n5) {
    const { name: o5 } = r7;
    return { set(r8) {
      const n6 = e5.get.call(this);
      e5.set.call(this, r8), this.requestUpdate(o5, n6, t6);
    }, init(e6) {
      return void 0 !== e6 && this.P(o5, void 0, t6), e6;
    } };
  }
  if ("setter" === n5) {
    const { name: o5 } = r7;
    return function(r8) {
      const n6 = this[o5];
      e5.call(this, r8), this.requestUpdate(o5, n6, t6);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t6) {
  return (e5, o5) => "object" == typeof o5 ? r5(t6, e5, o5) : ((t7, e6, o6) => {
    const r7 = e6.hasOwnProperty(o6);
    return e6.constructor.createProperty(o6, r7 ? { ...t7, wrapped: true } : t7), r7 ? Object.getOwnPropertyDescriptor(e6, o6) : void 0;
  })(t6, e5, o5);
}

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e4 = (t6) => (...e5) => ({ _$litDirective$: t6, values: e5 });
var i4 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e5, i5) {
    this._$Ct = t6, this._$AM = e5, this._$Ci = i5;
  }
  _$AS(t6, e5) {
    return this.update(t6, e5);
  }
  update(t6, e5) {
    return this.render(...e5);
  }
};

// node_modules/lit-html/directive-helpers.js
var { I: t5 } = z;
var s4 = () => document.createComment("");
var r6 = (o5, i5, n5) => {
  const e5 = o5._$AA.parentNode, l3 = void 0 === i5 ? o5._$AB : i5._$AA;
  if (void 0 === n5) {
    const i6 = e5.insertBefore(s4(), l3), c5 = e5.insertBefore(s4(), l3);
    n5 = new t5(i6, c5, o5, o5.options);
  } else {
    const t6 = n5._$AB.nextSibling, i6 = n5._$AM, c5 = i6 !== o5;
    if (c5) {
      let t7;
      n5._$AQ?.(o5), n5._$AM = o5, void 0 !== n5._$AP && (t7 = o5._$AU) !== i6._$AU && n5._$AP(t7);
    }
    if (t6 !== l3 || c5) {
      let o6 = n5._$AA;
      for (; o6 !== t6; ) {
        const t7 = o6.nextSibling;
        e5.insertBefore(o6, l3), o6 = t7;
      }
    }
  }
  return n5;
};
var v2 = (o5, t6, i5 = o5) => (o5._$AI(t6, i5), o5);
var u3 = {};
var m2 = (o5, t6 = u3) => o5._$AH = t6;
var p3 = (o5) => o5._$AH;
var h3 = (o5) => {
  o5._$AP?.(false, true);
  let t6 = o5._$AA;
  const i5 = o5._$AB.nextSibling;
  for (; t6 !== i5; ) {
    const o6 = t6.nextSibling;
    t6.remove(), t6 = o6;
  }
};

// node_modules/lit-html/directives/repeat.js
var u4 = (e5, s5, t6) => {
  const r7 = /* @__PURE__ */ new Map();
  for (let l3 = s5; l3 <= t6; l3++) r7.set(e5[l3], l3);
  return r7;
};
var c4 = e4(class extends i4 {
  constructor(e5) {
    if (super(e5), e5.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e5, s5, t6) {
    let r7;
    void 0 === t6 ? t6 = s5 : void 0 !== s5 && (r7 = s5);
    const l3 = [], o5 = [];
    let i5 = 0;
    for (const s6 of e5) l3[i5] = r7 ? r7(s6, i5) : i5, o5[i5] = t6(s6, i5), i5++;
    return { values: o5, keys: l3 };
  }
  render(e5, s5, t6) {
    return this.dt(e5, s5, t6).values;
  }
  update(s5, [t6, r7, c5]) {
    const d3 = p3(s5), { values: p4, keys: a3 } = this.dt(t6, r7, c5);
    if (!Array.isArray(d3)) return this.ut = a3, p4;
    const h4 = this.ut ??= [], v3 = [];
    let m3, y3, x2 = 0, j2 = d3.length - 1, k2 = 0, w2 = p4.length - 1;
    for (; x2 <= j2 && k2 <= w2; ) if (null === d3[x2]) x2++;
    else if (null === d3[j2]) j2--;
    else if (h4[x2] === a3[k2]) v3[k2] = v2(d3[x2], p4[k2]), x2++, k2++;
    else if (h4[j2] === a3[w2]) v3[w2] = v2(d3[j2], p4[w2]), j2--, w2--;
    else if (h4[x2] === a3[w2]) v3[w2] = v2(d3[x2], p4[w2]), r6(s5, v3[w2 + 1], d3[x2]), x2++, w2--;
    else if (h4[j2] === a3[k2]) v3[k2] = v2(d3[j2], p4[k2]), r6(s5, d3[x2], d3[j2]), j2--, k2++;
    else if (void 0 === m3 && (m3 = u4(a3, k2, w2), y3 = u4(h4, x2, j2)), m3.has(h4[x2])) if (m3.has(h4[j2])) {
      const e5 = y3.get(a3[k2]), t7 = void 0 !== e5 ? d3[e5] : null;
      if (null === t7) {
        const e6 = r6(s5, d3[x2]);
        v2(e6, p4[k2]), v3[k2] = e6;
      } else v3[k2] = v2(t7, p4[k2]), r6(s5, d3[x2], t7), d3[e5] = null;
      k2++;
    } else h3(d3[j2]), j2--;
    else h3(d3[x2]), x2++;
    for (; k2 <= w2; ) {
      const e5 = r6(s5, v3[w2 + 1]);
      v2(e5, p4[k2]), v3[k2++] = e5;
    }
    for (; x2 <= j2; ) {
      const e5 = d3[x2++];
      null !== e5 && h3(e5);
    }
    return this.ut = a3, m2(s5, v3), w;
  }
});

// src/components/HistogramVis.ts
var jsonData = (object) => {
  if (object === null || object === void 0 || object === `undefined`) return;
  try {
    if (typeof object === `string`) {
      if (object.length === 0) return;
      const o5 = JSON.parse(object);
      if (!Array.isArray(o5)) {
        console.error(`Histogram innerText should be JSON array`);
        return;
      }
      for (const [index, element] of o5.entries()) {
        if (!Array.isArray(element)) {
          console.error(`Histogram array should consist of inner arrays`);
          return;
        }
        if (element.length !== 2) {
          console.error(
            `Histogram inner arrays should consist of two elements`
          );
          return;
        }
        if (typeof element[0] !== `string`) {
          console.error(
            `First element of inner array should be a string (index ${index})`
          );
          return;
        }
        if (typeof element[1] !== `number`) {
          console.error(
            `Second element of inner array should be a number (index ${index})`
          );
          return;
        }
      }
      return o5;
    }
  } catch (error) {
    console.log(object);
    console.error(error);
  }
  return;
};
var HistogramVis = class extends s3 {
  constructor() {
    super();
    this.data = [];
    this.showDataLabels = true;
    this.height = `100%`;
    this.showXAxis = true;
    this.json = void 0;
  }
  connectedCallback() {
    if (!this.hasAttribute(`json`)) {
      this.setAttribute(`json`, this.innerText);
    }
    super.connectedCallback();
  }
  barTemplate(bar, index, _totalBars) {
    const { percentage } = bar;
    const [key, freq] = bar.data;
    const rowStart = 1;
    const rowEnd = 2;
    const colStart = index + 1;
    const colEnd = colStart + 1;
    const dataLabel = x`<div class="data">${freq}</div>`;
    const xAxis = x`${key}`;
    return x`
      <div
             class="bar"
             style="grid-area: ${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}"
           >
             <div class="barTrack" style="height: ${(percentage ?? 0) * 100}%"></div>
             ${this.showDataLabels ? dataLabel : ``}
           </div>
           <div
             class="xAxisLabels"
             style="grid-area: ${rowStart + 2} / ${colStart} / ${rowEnd + 2} / ${colEnd}"
           >
             ${this.showXAxis ? xAxis : ``}
           </div>
    `;
  }
  render() {
    if ((this.data === void 0 || this.data.length === 0) && this.json === void 0) {
      return x``;
    }
    const d3 = this.data ?? this.json;
    const length = d3.length;
    const highestCount = Math.max(...d3.map((d4) => d4[1]));
    const bars = d3.map((kv) => ({
      data: kv,
      percentage: kv[1] / highestCount
    }));
    const xAxis = x`
      <div
            class="xAxis"
            style="grid-area: 2 / 1 / 3 / ${d3.length + 1}"
          ></div>
    `;
    const height = this.height ? `height: ${this.height};` : ``;
    const h4 = x`
      <style>
             div.chart {
               grid-template-columns: repeat(${d3.length}, minmax(2px, 1fr));
             }
           </style>
           <div class="container" style="${height}">
             <div class="chart">
               ${c4(
      bars,
      (bar) => bar.data[0],
      (b3, index) => this.barTemplate(b3, index, length)
    )}
               ${this.showXAxis ? xAxis : ``}
             </div>
           </div>
    `;
    return h4;
  }
};
__publicField(HistogramVis, "styles", i`
    :host {
    }
    div.container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    div.chart {
      display: grid;
      flex: 1;
      grid-template-rows: 1fr 1px min-content;
      justify-items: center;
    }
    div.bar {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-self: normal;
      padding-left: 0.3vw;
      padding-right: 0.3vw;
    }
    div.bar > div.barTrack {
      background-color: var(--histogram-bar-color, gray);
      align-self: stretch;
    }
    div.xAxisLabels,
    div.data {
      font-size: min(1vw, 1em);
      color: var(--histogram-label-color, currentColor);
    }
    div.xAxisLabels {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }
    div.xAxis {
      background-color: var(--histogram-axis-color, silver);
      width: 100%;
      height: 100%;
    }
  `);
__decorateClass([
  n4()
], HistogramVis.prototype, "data", 2);
__decorateClass([
  n4()
], HistogramVis.prototype, "showDataLabels", 2);
__decorateClass([
  n4()
], HistogramVis.prototype, "height", 2);
__decorateClass([
  n4()
], HistogramVis.prototype, "showXAxis", 2);
__decorateClass([
  n4({ converter: jsonData, type: Object })
], HistogramVis.prototype, "json", 2);
HistogramVis = __decorateClass([
  t3(`histogram-vis`)
], HistogramVis);

// src/components/FrequencyHistogramPlot.ts
var FrequencyHistogramPlot = class {
  el;
  #sorter;
  constructor(el) {
    this.el = el;
  }
  setAutoSort(sortStyle) {
    this.#sorter = getSorter(sortStyle);
  }
  clear() {
    if (this.el === void 0) return;
    this.el.data = [];
  }
  // init() {
  //   if (this.el !== undefined) return; // already inited
  //   // eslint-disable-next-line functional/immutable-data
  //   this.el = document.createElement(`histogram-vis`);
  //   this.parentEl.appendChild(this.el);
  // }
  dispose() {
    const el = this.el;
    if (el === void 0) return;
    el.remove();
  }
  update(data) {
    if (this.el === void 0) {
      console.warn(`FrequencyHistogramPlot this.el undefined`);
      return;
    }
    this.el.data = this.#sorter === void 0 ? [...data] : this.#sorter(data);
  }
};
export {
  FrequencyHistogramPlot,
  HistogramVis
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=components.js.map