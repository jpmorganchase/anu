import {
  init_core
} from "./chunk-CIXCNVD5.js";
import "./chunk-CHIHTB2R.js";
import "./chunk-2VG5SISC.js";
import {
  ShaderMaterial
} from "./chunk-NXGNFVPM.js";
import {
  Mesh,
  Texture,
  VertexData
} from "./chunk-MADDKXJQ.js";
import "./chunk-AD5M3D2V.js";
import {
  VertexBuffer
} from "./chunk-A4OKAQEU.js";
import {
  Vector3
} from "./chunk-MZH63JEL.js";
import {
  Color3
} from "./chunk-KSTZC6MF.js";
import "./chunk-YK7R2M7K.js";
import "./chunk-R3MONVPG.js";
import "./chunk-BMKUQ6K3.js";
import "./chunk-JVYIJCPB.js";
import "./chunk-WM5N7J5Q.js";
import {
  Effect
} from "./chunk-GEMGH3AZ.js";
import "./chunk-AD6Y6P3L.js";
import "./chunk-CF3WPAMV.js";

// node_modules/babylon-msdf-text/dist/babylon-msdf-text.es.js
init_core();
var W = ({ engine: e, data: t, kind: n, stride: a, mesh: c }) => {
  const l = new VertexBuffer(e, t, n, true, false, a);
  c.setVerticesBuffer(l);
};
var ie = `
precision highp float; 

attribute vec3 position; 
attribute vec2 uv; 
attribute vec2 center; 

uniform mat4 worldViewProjection; 

varying vec2 vUv;
varying vec2 vCenter; 

void main(void) { 
  gl_Position = worldViewProjection * vec4(position, 1.0); 
  vUv = uv; 
  vCenter = center;
}
`;
var se = `
precision highp float;

varying vec2 vUv; 
varying vec2 vCenter; 

uniform sampler2D uFontAtlas;

uniform vec3 uStrokeColor;
uniform vec3 uColor;

uniform float uThreshold;
uniform float uStrokeOutsetWidth;
uniform float uStrokeInsetWidth;
uniform float  uOpacity;
uniform float uAlphaTest;

uniform int uLinesTotal;
uniform int uWordsTotal;
uniform int uLettersTotal;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}


void main(void) { 

  float thickness = 0.5;
  float softness = 0.5;

  vec3 s = texture2D(uFontAtlas, vUv).rgb;
  float sigDist = median(s.r, s.g, s.b) - 0.5;
  float afwidth = 1.4142135623730951 / 2.0;

  #ifdef IS_SMALL
  float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
  #else
  float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
  #endif
  
  float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;
  
  // Inset
  float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;
  
  #ifdef IS_SMALL
  float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
  float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
  #else
  float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
  float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
  #endif
  
  float border = outset * inset;
  
  // Alpha Test
  if (alpha < uAlphaTest) discard;

  // Output: Common
  vec4 filledFragColor = vec4(uColor, uOpacity * alpha);
  
  // Output: Strokes
  vec4 strokedFragColor = vec4(uStrokeColor, uOpacity * border);
  
  gl_FragColor = filledFragColor; 
}
`;
function $(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var oe = function(e) {
  switch (e) {
    case "int8":
      return Int8Array;
    case "int16":
      return Int16Array;
    case "int32":
      return Int32Array;
    case "uint8":
      return Uint8Array;
    case "uint16":
      return Uint16Array;
    case "uint32":
      return Uint32Array;
    case "float32":
      return Float32Array;
    case "float64":
      return Float64Array;
    case "array":
      return Array;
    case "uint8_clamped":
      return Uint8ClampedArray;
  }
};
var ae = Object.prototype.toString;
var le = ce;
function ce(e) {
  return e.BYTES_PER_ELEMENT && ae.call(e.buffer) === "[object ArrayBuffer]" || Array.isArray(e);
}
var he = function(e) {
  return e != null && (q(e) || ue(e) || !!e._isBuffer);
};
function q(e) {
  return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function ue(e) {
  return typeof e.readFloatLE == "function" && typeof e.slice == "function" && q(e.slice(0, 0));
}
var de = oe;
var fe = le;
var ge = he;
var we = [0, 2, 3];
var pe = [2, 1, 3];
var ve = function(t, n) {
  (!t || !(fe(t) || ge(t))) && (n = t || {}, t = null), typeof n == "number" ? n = { count: n } : n = n || {};
  for (var a = typeof n.type == "string" ? n.type : "uint16", c = typeof n.count == "number" ? n.count : 1, l = n.start || 0, v = n.clockwise !== false ? we : pe, g = v[0], p = v[1], f = v[2], i = c * 6, r = t || new (de(a))(i), h = 0, s = 0; h < i; h += 6, s += 4) {
    var u = h + l;
    r[u + 0] = s + 0, r[u + 1] = s + 1, r[u + 2] = s + 2, r[u + 3] = s + g, r[u + 4] = s + p, r[u + 5] = s + f;
  }
  return r;
};
var me = $(ve);
var K = { exports: {} };
(function(e) {
  var t = /\n/, n = `
`, a = /\s/;
  e.exports = function(f, i) {
    var r = e.exports.lines(f, i);
    return r.map(function(h) {
      return f.substring(h.start, h.end);
    }).join(`
`);
  }, e.exports.lines = function(i, r) {
    if (r = r || {}, r.width === 0 && r.mode !== "nowrap")
      return [];
    i = i || "";
    var h = typeof r.width == "number" ? r.width : Number.MAX_VALUE, s = Math.max(0, r.start || 0), u = typeof r.end == "number" ? r.end : i.length, d = r.mode, w = r.measure || p;
    return d === "pre" ? v(w, i, s, u, h) : g(w, i, s, u, h, d);
  };
  function c(f, i, r, h) {
    var s = f.indexOf(i, r);
    return s === -1 || s > h ? h : s;
  }
  function l(f) {
    return a.test(f);
  }
  function v(f, i, r, h, s) {
    for (var u = [], d = r, w = r; w < h && w < i.length; w++) {
      var x = i.charAt(w), m = t.test(x);
      if (m || w === h - 1) {
        var o = m ? w : w + 1, I = f(i, d, o, s);
        u.push(I), d = w + 1;
      }
    }
    return u;
  }
  function g(f, i, r, h, s, u) {
    var d = [], w = s;
    for (u === "nowrap" && (w = Number.MAX_VALUE); r < h && r < i.length; ) {
      for (var x = c(i, n, r, h); r < x && l(i.charAt(r)); )
        r++;
      var m = f(i, r, x, w), o = r + (m.end - m.start), I = o + n.length;
      if (o < x) {
        for (; o > r && !l(i.charAt(o)); )
          o--;
        if (o === r)
          I > r + n.length && I--, o = I;
        else
          for (I = o; o > r && l(i.charAt(o - n.length)); )
            o--;
      }
      if (o >= r) {
        var T = f(i, r, o, w);
        d.push(T);
      }
      r = I;
    }
    return d;
  }
  function p(f, i, r, h) {
    var s = Math.min(h, r - i);
    return {
      start: i,
      end: i + s
    };
  }
})(K);
var Te = K.exports;
var xe = $(Te);
var E = [
  "x",
  "e",
  "a",
  "o",
  "n",
  "s",
  "r",
  "c",
  "u",
  "m",
  "v",
  "w",
  "z"
];
var V = ["m", "w"];
var P = [
  "H",
  "I",
  "N",
  "E",
  "F",
  "K",
  "L",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
var N = "	".charCodeAt(0);
var C = " ".charCodeAt(0);
var Ie = 0;
var Y = 1;
var j = 2;
var ye = class {
  constructor(t = {}) {
    this.glyphs = [], this._measure = this.computeMetrics.bind(this), this.update(t);
  }
  /**
   * Getters
   */
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get descender() {
    return this._descender;
  }
  get ascender() {
    return this._ascender;
  }
  get xHeight() {
    return this._xHeight;
  }
  get baseline() {
    return this._baseline;
  }
  get capHeight() {
    return this._capHeight;
  }
  get lineHeight() {
    return this._lineHeight;
  }
  get linesTotal() {
    return this._linesTotal;
  }
  get lettersTotal() {
    return this._lettersTotal;
  }
  get wordsTotal() {
    return this._wordsTotal;
  }
  update(t) {
    if (t = Object.assign({ measure: this._measure }, t), this._options = t, this._options.tabSize = Se(this._options.tabSize, 4), !t.font)
      throw new Error("must provide a valid bitmap font");
    const n = this.glyphs, a = t.text || "", c = t.font;
    this._setupSpaceGlyphs(c);
    const l = xe.lines(a, t), v = t.width || 0, g = a.split(" ").filter((T) => T !== `
`).length, p = a.split("").filter((T) => T !== `
` && T !== " ").length;
    n.length = 0;
    const f = l.reduce(function(T, y) {
      return Math.max(T, y.width, v);
    }, 0);
    let i = 0, r = 0;
    const h = t.lineHeight ? t.lineHeight : 1, s = c.common.lineHeight * Math.max(h, 1), u = c.common.base, d = s - u, w = t.letterSpacing || 0, x = s * l.length - d, m = ke(this._options.align);
    r -= x, this._width = f, this._height = x, this._descender = s - u, this._baseline = u, this._xHeight = _e(c), this._capHeight = We(c), this._lineHeight = s, this._ascender = s - d - this._xHeight;
    let o = 0, I = 0;
    l.forEach((T, y) => {
      const A = T.start, _ = T.end, b = T.width, Q = a.slice(A, _).split(" ").filter((S) => S !== "").length, Z = a.slice(A, _).split(" ").join("").length;
      let H = 0, M = 0, L;
      for (let S = A; S < _; S++) {
        const J = a.charCodeAt(S), k = this.getGlyph(c, J);
        if (k) {
          L && (i += X(c, L.id, k.id));
          let D = i;
          m === Y ? D += (f - b) / 2 : m === j && (D += f - b), n.push({
            position: [D, r],
            data: k,
            index: S,
            // Line
            linesTotal: l.length,
            lineIndex: y,
            lineLettersTotal: Z,
            lineLetterIndex: H,
            lineWordsTotal: Q,
            lineWordIndex: M,
            // Word
            wordsTotal: g,
            wordIndex: o,
            // Letter
            lettersTotal: p,
            letterIndex: I
          }), k.id === C && L.id !== C && (M++, o++), k.id !== C && (H++, I++), i += k.xadvance + w, L = k;
        }
      }
      r += s, i = 0;
    }), this._lettersTotal = p, this._wordsTotal = g, this._linesTotal = l.length;
  }
  getGlyph(t, n) {
    const a = z(t, n);
    return a || (n === N ? this._fallbackTabGlyph : n === C ? this._fallbackSpaceGlyph : null);
  }
  computeMetrics(t, n, a, c) {
    const l = this._options.letterSpacing || 0, v = this._options.font;
    let g = 0, p = 0, f = 0, i, r;
    if (!v.chars || v.chars.length === 0)
      return {
        start: n,
        end: n,
        width: 0
      };
    a = Math.min(t.length, a);
    for (let h = n; h < a; h++) {
      const s = t.charCodeAt(h);
      if (i = this.getGlyph(v, s), i) {
        i.char = t[h], i.xoffset;
        const u = r ? X(v, r.id, i.id) : 0;
        g += u;
        const d = g + i.xadvance + l, w = g + i.width;
        if (w >= c || d >= c)
          break;
        g = d, p = w, r = i;
      }
      f++;
    }
    return r && (p += r.xoffset), {
      start: n,
      end: n + f,
      width: p
    };
  }
  /**
   * Private
   */
  _setupSpaceGlyphs(t) {
    if (this._fallbackSpaceGlyph = null, this._fallbackTabGlyph = null, !t.chars || t.chars.length === 0)
      return;
    const n = z(t, C) || be(t) || t.chars[0], a = this._options.tabSize * n.xadvance;
    this._fallbackSpaceGlyph = n;
    const c = Object.assign({}, n);
    this._fallbackTabGlyph = Object.assign(c, {
      x: 0,
      y: 0,
      xadvance: a,
      id: N,
      xoffset: 0,
      yoffset: 0,
      width: 0,
      height: 0
    });
  }
};
function Ae(e) {
  return new ye(e);
}
function z(e, t) {
  if (!e.chars || e.chars.length === 0)
    return null;
  const n = O(e.chars, t);
  return n >= 0 ? e.chars[n] : null;
}
function _e(e) {
  for (let t = 0; t < E.length; t++) {
    const n = E[t].charCodeAt(0), a = O(e.chars, n);
    if (a >= 0)
      return e.chars[a].height;
  }
  return 0;
}
function be(e) {
  for (let t = 0; t < V.length; t++) {
    const n = V[t].charCodeAt(0), a = O(e.chars, n);
    if (a >= 0)
      return e.chars[a];
  }
  return 0;
}
function We(e) {
  for (let t = 0; t < P.length; t++) {
    const n = P[t].charCodeAt(0), a = O(e.chars, n);
    if (a >= 0)
      return e.chars[a].height;
  }
  return 0;
}
function X(e, t, n) {
  if (!e.kernings || e.kernings.length === 0)
    return 0;
  const a = e.kernings;
  for (let c = 0; c < a.length; c++) {
    const l = a[c];
    if (l.first === t && l.second === n)
      return l.amount;
  }
  return 0;
}
function ke(e) {
  return e === "center" ? Y : e === "right" ? j : Ie;
}
function O(e, t, n) {
  n = n || 0;
  for (let a = n; a < e.length; a++)
    if (e[a].id === t)
      return a;
  return -1;
}
function Se(e, t) {
  return typeof e == "number" ? e : typeof t == "number" ? t : 0;
}
function Ce(e) {
  const t = new Float32Array(e.length * 4 * 1);
  let n = 0;
  return e.forEach(function(a) {
    const c = a.data.page || 0;
    t[n++] = c, t[n++] = c, t[n++] = c, t[n++] = c;
  }), t;
}
function Le(e, t, n, a, c) {
  const l = new Float32Array(e.length * 4 * 2), v = new Float32Array(e.length * 4 * 2), g = new Float32Array(e.length * 4 * 3), p = new Float32Array(e.length * 4 * 2);
  let f = 0, i = 0, r = 0, h = 0;
  return e.forEach(function(s) {
    const u = s.data, d = u.x + u.width, w = u.y + u.height, x = u.x / t;
    let m = u.y / n;
    const o = d / t;
    let I = w / n;
    a && (m = (n - u.y) / n, I = (n - w) / n), l[f++] = x, l[f++] = m, l[f++] = x, l[f++] = I, l[f++] = o, l[f++] = I, l[f++] = o, l[f++] = m, v[h++] = s.position[0] / c.width, v[h++] = (s.position[1] + c.height) / c.height, v[h++] = s.position[0] / c.width, v[h++] = (s.position[1] + c.height + u.height) / c.height, v[h++] = (s.position[0] + u.width) / c.width, v[h++] = (s.position[1] + c.height + u.height) / c.height, v[h++] = (s.position[0] + u.width) / c.width, v[h++] = (s.position[1] + c.height) / c.height;
    const T = s.position[0] + u.xoffset, y = s.position[1] + u.yoffset, A = 0, _ = u.width, b = u.height;
    g[i++] = T, g[i++] = y, g[i++] = A, g[i++] = T, g[i++] = y + b, g[i++] = A, g[i++] = T + _, g[i++] = y + b, g[i++] = A, g[i++] = T + _, g[i++] = y, g[i++] = A, p[r++] = T + _ / 2, p[r++] = y + b / 2, p[r++] = T + _ / 2, p[r++] = y + b / 2, p[r++] = T + _ / 2, p[r++] = y + b / 2, p[r++] = T + _ / 2, p[r++] = y + b / 2;
  }), { uvs: l, layoutUvs: v, positions: g, centers: p };
}
function Fe(e) {
  const t = new Float32Array(e.length * 4), n = new Float32Array(e.length * 4), a = new Float32Array(e.length * 4), c = new Float32Array(e.length * 4), l = new Float32Array(e.length * 4), v = new Float32Array(e.length * 4), g = new Float32Array(e.length * 4);
  let p, f, i, r = 0, h = 0, s = 0, u = 0, d = 0, w = 0, x = 0;
  for (let m = 0; m < e.length; m++) {
    const o = e[m];
    t[r++] = o.lineIndex, t[r++] = o.lineIndex, t[r++] = o.lineIndex, t[r++] = o.lineIndex, n[h++] = o.lineLettersTotal, n[h++] = o.lineLettersTotal, n[h++] = o.lineLettersTotal, n[h++] = o.lineLettersTotal, a[s++] = o.lineLetterIndex, a[s++] = o.lineLetterIndex, a[s++] = o.lineLetterIndex, a[s++] = o.lineLetterIndex, c[u++] = o.lineWordsTotal, c[u++] = o.lineWordsTotal, c[u++] = o.lineWordsTotal, c[u++] = o.lineWordsTotal, l[d++] = o.lineWordIndex, l[d++] = o.lineWordIndex, l[d++] = o.lineWordIndex, l[d++] = o.lineWordIndex, v[w++] = o.wordIndex, v[w++] = o.wordIndex, v[w++] = o.wordIndex, v[w++] = o.wordIndex, g[x++] = o.letterIndex, g[x++] = o.letterIndex, g[x++] = o.letterIndex, g[x++] = o.letterIndex, i = o.lettersTotal, p = o.wordsTotal, f = o.linesTotal;
  }
  return {
    linesTotal: f,
    lineIndex: t,
    lineLettersTotal: n,
    lineLetterIndex: a,
    lineWordsTotal: c,
    lineWordIndex: l,
    wordsTotal: p,
    wordIndex: v,
    lettersTotal: i,
    letterIndex: g
  };
}
var R = {
  pages: Ce,
  attributes: Le,
  infos: Fe
};
var Ge = ({
  color: e = new Color3(0, 0, 0),
  stroke: t,
  strokeColor: n = new Color3(0, 0, 0),
  opacity: a = 1,
  strokeWidth: c = 0.5,
  ...l
}) => {
  const v = Ae(l), g = l.font;
  l.engine && console.warn(
    "Warning: The engine argument is no longer required and will be ignored."
  ), l.atlas instanceof Texture || console.warn(
    "Please provide the atlas as texture instead of image so each text mesh won't have a seperate texture instance"
  );
  const p = l.scene.getEngine(), f = g.common.scaleW, i = g.common.scaleH, r = v.glyphs.filter((y) => {
    const A = y.data;
    return A.width * A.height > 0;
  }), h = R.attributes(
    r,
    f,
    i,
    true,
    v
  ), s = R.infos(r, v), u = me([], {
    clockwise: true,
    type: "uint16",
    count: r.length
  }), d = new Mesh(l.text || "text", l.scene), w = new VertexData();
  w.positions = h.positions, w.indices = u, w.uvs = h.uvs;
  const x = [];
  VertexData.ComputeNormals(h.positions, u, x), w.normals = x, W({
    engine: p,
    data: h.centers,
    kind: "center",
    stride: 2,
    mesh: d
  }), W({
    engine: p,
    data: h.layoutUvs,
    kind: "layoutUv",
    stride: 2,
    mesh: d
  }), W({
    engine: p,
    data: s.lineIndex,
    kind: "lineIndex",
    stride: 1,
    mesh: d
  }), W({
    engine: p,
    data: s.lineLettersTotal,
    kind: "lineLettersTotal",
    stride: 1,
    mesh: d
  }), W({
    engine: p,
    data: s.lineLetterIndex,
    kind: "lineLetterIndex",
    stride: 1,
    mesh: d
  }), W({
    engine: p,
    data: s.lineWordsTotal,
    kind: "lineWordsTotal",
    stride: 1,
    mesh: d
  }), W({
    engine: p,
    data: s.lineWordIndex,
    kind: "lineWordIndex",
    stride: 1,
    mesh: d
  }), W({
    engine: p,
    data: s.wordIndex,
    kind: "wordIndex",
    stride: 1,
    mesh: d
  }), W({
    engine: p,
    data: s.letterIndex,
    kind: "letterIndex",
    stride: 1,
    mesh: d
  }), w.applyToMesh(d), d.scaling = new Vector3(0.5, 0.5, 0.5), d.rotation.y = 0, d.rotation.x = 3.14, Effect.ShadersStore.customVertexShader = ie, Effect.ShadersStore.customFragmentShader = se;
  const m = new ShaderMaterial(
    "shader",
    l.scene,
    {
      vertex: "custom",
      fragment: "custom"
    },
    {
      attributes: [
        "position",
        "normal",
        "uv",
        "center",
        "layoutUv",
        "lineIndex",
        "lineLettersTotal",
        "lineLetterIndex",
        "lineWordsTotal",
        "lineWordIndex",
        "wordIndex",
        "letterIndex"
      ],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "uColor",
        "uThreshold",
        "uStrokeOutsetWidth",
        "uStrokeInsetWidth",
        "uOpacity",
        "uAlphaTest",
        "uStrokeColor",
        "uLinesTotal",
        "uWordsTotal",
        "uLettersTotal"
      ],
      needAlphaBlending: true
    }
  ), o = l.atlas instanceof Texture ? l.atlas : new Texture(l.atlas, l.scene);
  m.setTexture("uFontAtlas", o);
  const I = new Color3(e.r, e.g, e.b);
  m.setColor3("uColor", I);
  const T = new Color3(n.r, n.g, n.b);
  return m.setColor3("uStrokeColor", T), m.setFloat("uThreshold", 0.05), m.setFloat("uStrokeOutsetWidth", 0), m.setFloat("uStrokeInsetWidth", 0.3), m.setFloat("uOpacity", a), m.setFloat("uAlphaTest", 0.01), m.setInt("uLinesTotal", s.linesTotal), m.setInt("uWordsTotal", s.wordsTotal), m.setInt("uLettersTotal", s.lettersTotal), m.backFaceCulling = false, d.material = m, d;
};
export {
  Ge as createTextMesh
};
/*! Bundled license information:

babylon-msdf-text/dist/babylon-msdf-text.es.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=babylon-msdf-text.js.map
