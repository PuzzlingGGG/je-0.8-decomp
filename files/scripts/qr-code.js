"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.QRCodeComponent = void 0;
let n = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8
  },
  a = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  },
  s = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
class r {
  constructor(e) {
    this.data = e;
    this.mode = n.MODE_8BIT_BYTE;
  }
  getLength(e) {
    return this.data.length;
  }
  write(e) {
    for (let t = 0; t < this.data.length; t++) e.put(this.data.charCodeAt(t), 8);
  }
}
class l {
  static getBCHTypeInfo(e) {
    let t = e << 10;
    for (; l.getBCHDigit(t) - l.getBCHDigit(l.G15) >= 0;) t ^= l.G15 << l.getBCHDigit(t) - l.getBCHDigit(l.G15);
    return (e << 10 | t) ^ l.G15_MASK;
  }
  static getBCHTypeNumber(e) {
    let t = e << 12;
    for (; l.getBCHDigit(t) - l.getBCHDigit(l.G18) >= 0;) t ^= l.G18 << l.getBCHDigit(t) - l.getBCHDigit(l.G18);
    return e << 12 | t;
  }
  static getBCHDigit(e) {
    let t = 0;
    for (; 0 != e;) {
      t++;
      e >>>= 1;
    }
    return t;
  }
  static getPatternPosition(e) {
    return l.PATTERN_POSITION_TABLE[e - 1];
  }
  static getMask(e, t, o) {
    switch (e) {
      case s.PATTERN000:
        return (t + o) % 2 == 0;
      case s.PATTERN001:
        return t % 2 == 0;
      case s.PATTERN010:
        return o % 3 == 0;
      case s.PATTERN011:
        return (t + o) % 3 == 0;
      case s.PATTERN100:
        return (Math.floor(t / 2) + Math.floor(o / 3)) % 2 == 0;
      case s.PATTERN101:
        return t * o % 2 + t * o % 3 == 0;
      case s.PATTERN110:
        return (t * o % 2 + t * o % 3) % 2 == 0;
      case s.PATTERN111:
        return (t * o % 3 + (t + o) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + e);
    }
  }
  static getErrorCorrectPolynomial(e) {
    let t = new d([1], 0);
    for (let o = 0; o < e; o++) t = t.multiply(new d([1, c.gexp(o)], 0));
    return t;
  }
  static getLengthInBits(e, t) {
    if (1 <= t && t < 10) switch (e) {
      case n.MODE_NUMBER:
        return 10;
      case n.MODE_ALPHA_NUM:
        return 9;
      case n.MODE_8BIT_BYTE:
      case n.MODE_KANJI:
        return 8;
      default:
        throw new Error("mode:" + e);
    } else if (t < 27) switch (e) {
      case n.MODE_NUMBER:
        return 12;
      case n.MODE_ALPHA_NUM:
        return 11;
      case n.MODE_8BIT_BYTE:
        return 16;
      case n.MODE_KANJI:
        return 10;
      default:
        throw new Error("mode:" + e);
    } else {
      if (!(t < 41)) throw new Error("type:" + t);
      switch (e) {
        case n.MODE_NUMBER:
          return 14;
        case n.MODE_ALPHA_NUM:
          return 13;
        case n.MODE_8BIT_BYTE:
          return 16;
        case n.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + e);
      }
    }
  }
  static getLostPoint(e) {
    let t = e.getModuleCount(),
      o = 0;
    for (let i = 0; i < t; i++) for (let n = 0; n < t; n++) {
      let a = 0,
        s = e.isDark(i, n);
      for (let o = -1; o <= 1; o++) if (!(i + o < 0 || t <= i + o)) for (let r = -1; r <= 1; r++) n + r < 0 || t <= n + r || 0 == o && 0 == r || s == e.isDark(i + o, n + r) && a++;
      a > 5 && (o += 3 + a - 5);
    }
    for (let i = 0; i < t - 1; i++) for (let n = 0; n < t - 1; n++) {
      let t = 0;
      e.isDark(i, n) && t++;
      e.isDark(i + 1, n) && t++;
      e.isDark(i, n + 1) && t++;
      e.isDark(i + 1, n + 1) && t++;
      0 != t && 4 != t || (o += 3);
    }
    for (let i = 0; i < t; i++) for (let n = 0; n < t - 6; n++) e.isDark(i, n) && !e.isDark(i, n + 1) && e.isDark(i, n + 2) && e.isDark(i, n + 3) && e.isDark(i, n + 4) && !e.isDark(i, n + 5) && e.isDark(i, n + 6) && (o += 40);
    for (let i = 0; i < t; i++) for (let n = 0; n < t - 6; n++) e.isDark(n, i) && !e.isDark(n + 1, i) && e.isDark(n + 2, i) && e.isDark(n + 3, i) && e.isDark(n + 4, i) && !e.isDark(n + 5, i) && e.isDark(n + 6, i) && (o += 40);
    let i = 0;
    for (let o = 0; o < t; o++) for (let n = 0; n < t; n++) e.isDark(n, o) && i++;
    return o + Math.abs(100 * i / t / t - 50) / 5 * 10;
  }
}
l.PATTERN_POSITION_TABLE = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];
l.G15 = 1335;
l.G18 = 7973;
l.G15_MASK = 21522;
let c = {
  glog: function (e) {
    if (e < 1) throw new Error("glog(" + e + ")");
    return c.LOG_TABLE[e];
  },
  gexp: function (e) {
    for (; e < 0;) e += 255;
    for (; e >= 256;) e -= 255;
    return c.EXP_TABLE[e];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
for (let e = 0; e < 8; e++) c.EXP_TABLE[e] = 1 << e;
for (let e = 8; e < 256; e++) c.EXP_TABLE[e] = c.EXP_TABLE[e - 4] ^ c.EXP_TABLE[e - 5] ^ c.EXP_TABLE[e - 6] ^ c.EXP_TABLE[e - 8];
for (let e = 0; e < 255; e++) c.LOG_TABLE[c.EXP_TABLE[e]] = e;
class d {
  constructor(e, t) {
    if (null == e.length) throw new Error(e.length + "/" + t);
    let o = 0;
    for (; o < e.length && 0 == e[o];) o++;
    this.num = new Array(e.length - o + t);
    for (let t = 0; t < e.length - o; t++) this.num[t] = e[t + o];
  }
  get(e) {
    return this.num[e];
  }
  getLength() {
    return this.num.length;
  }
  multiply(e) {
    let t = new Array(this.getLength() + e.getLength() - 1);
    for (let o = 0; o < this.getLength(); o++) for (let i = 0; i < e.getLength(); i++) t[o + i] ^= c.gexp(c.glog(this.get(o)) + c.glog(e.get(i)));
    return new d(t, 0);
  }
  mod(e) {
    if (this.getLength() - e.getLength() < 0) return this;
    let t = c.glog(this.get(0)) - c.glog(e.get(0)),
      o = new Array(this.getLength());
    for (let e = 0; e < this.getLength(); e++) exports.e = this.get(e);
    for (let i = 0; i < e.getLength(); i++) exports.i ^= c.gexp(c.glog(e.get(i)) + t);
    return new d(o, 0).mod(e);
  }
}
class h {
  constructor(e, t) {
    this.totalCount = e;
    this.dataCount = t;
  }
  static getRSBlocks(e, t) {
    let o = h.getRsBlockTable(e, t);
    if (null == o) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
    let i = o.length / 3,
      n = new Array();
    for (let e = 0; e < i; e++) {
      let t = o[3 * e + 0],
        i = o[3 * e + 1],
        a = o[3 * e + 2];
      for (let e = 0; e < t; e++) n.push(new h(i, a));
    }
    return n;
  }
  static getRsBlockTable(e, t) {
    switch (t) {
      case a.L:
        return h.RS_BLOCK_TABLE[4 * (e - 1) + 0];
      case a.M:
        return h.RS_BLOCK_TABLE[4 * (e - 1) + 1];
      case a.Q:
        return h.RS_BLOCK_TABLE[4 * (e - 1) + 2];
      case a.H:
        return h.RS_BLOCK_TABLE[4 * (e - 1) + 3];
      default:
        return;
    }
  }
}
h.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
class p {
  constructor() {
    this.buffer = [];
    this.length = 0;
  }
  get(e) {
    let t = Math.floor(e / 8);
    return 1 == (this.buffer[t] >>> 7 - e % 8 & 1);
  }
  put(e, t) {
    for (let o = 0; o < t; o++) this.putBit(1 == (e >>> t - o - 1 & 1));
  }
  getLengthInBits() {
    return this.length;
  }
  putBit(e) {
    let t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0);
    e && (this.buffer[t] |= 128 >>> this.length % 8);
    this.length++;
  }
}
class u {
  constructor(e, t) {
    this.typeNumber = e;
    this.errorCorrectLevel = t;
    this.moduleCount = 0;
    this.dataList = [];
  }
  static createData(e, t, o) {
    let i = h.getRSBlocks(e, t),
      n = new p();
    for (let t = 0; t < o.length; t++) {
      let i = o[t];
      n.put(i.mode, 4);
      n.put(i.getLength(), l.getLengthInBits(i.mode, e));
      i.write(n);
    }
    let a = 0;
    for (let e = 0; e < i.length; e++) a += i[e].dataCount;
    if (n.getLengthInBits() > 8 * a) throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * a + ")");
    n.getLengthInBits() + 4 <= 8 * a && n.put(0, 4);
    for (; n.getLengthInBits() % 8 != 0;) n.putBit(!1);
    for (; !(n.getLengthInBits() >= 8 * a);) {
      n.put(u.PAD0, 8);
      if (n.getLengthInBits() >= 8 * a) break;
      n.put(u.PAD1, 8);
    }
    return u.createBytes(n, i);
  }
  static createBytes(e, t) {
    let o = 0,
      i = 0,
      n = 0,
      a = new Array(t.length),
      s = new Array(t.length);
    for (let r = 0; r < t.length; r++) {
      let c = t[r].dataCount,
        h = t[r].totalCount - c;
      i = Math.max(i, c);
      n = Math.max(n, h);
      a[r] = new Array(c);
      for (let t = 0; t < a[r].length; t++) a[r][t] = 255 & e.buffer[t + o];
      o += c;
      let p = l.getErrorCorrectPolynomial(h),
        u = new d(a[r], p.getLength() - 1).mod(p);
      s[r] = new Array(p.getLength() - 1);
      for (let e = 0; e < s[r].length; e++) {
        let t = e + u.getLength() - s[r].length;
        s[r][e] = t >= 0 ? u.get(t) : 0;
      }
    }
    let r = 0;
    for (let e = 0; e < t.length; e++) r += t[e].totalCount;
    let c = new Array(r),
      h = 0;
    for (let e = 0; e < i; e++) for (let o = 0; o < t.length; o++) e < a[o].length && (c[h++] = a[o][e]);
    for (let e = 0; e < n; e++) for (let o = 0; o < t.length; o++) e < s[o].length && (c[h++] = s[o][e]);
    return c;
  }
  addData(e) {
    let t = new r(e);
    this.dataList.push(t);
    this.dataCache = null;
  }
  isDark(e, t) {
    if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t);
    return this.modules[e][t];
  }
  getModuleCount() {
    return this.moduleCount;
  }
  make() {
    if (this.typeNumber < 1) {
      let e = 1;
      for (e = 1; e < 40; e++) {
        let t = h.getRSBlocks(e, this.errorCorrectLevel),
          o = new p(),
          i = 0;
        for (let e = 0; e < t.length; e++) i += t[e].dataCount;
        for (let t = 0; t < this.dataList.length; t++) {
          let i = this.dataList[t];
          o.put(i.mode, 4);
          o.put(i.getLength(), l.getLengthInBits(i.mode, e));
          i.write(o);
        }
        if (o.getLengthInBits() <= 8 * i) break;
      }
      this.typeNumber = e;
    }
    this.makeImpl(!1, this.getBestMaskPattern());
  }
  makeImpl(e, t) {
    this.moduleCount = 4 * this.typeNumber + 17;
    this.modules = new Array(this.moduleCount);
    for (let e = 0; e < this.moduleCount; e++) {
      this.modules[e] = new Array(this.moduleCount);
      for (let t = 0; t < this.moduleCount; t++) this.modules[e][t] = null;
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(e, t);
    this.typeNumber >= 7 && this.setupTypeNumber(e);
    null == this.dataCache && (this.dataCache = u.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
    this.mapData(this.dataCache, t);
  }
  setupPositionProbePattern(e, t) {
    for (let o = -1; o <= 7; o++) if (!(e + o <= -1 || this.moduleCount <= e + o)) for (let i = -1; i <= 7; i++) t + i <= -1 || this.moduleCount <= t + i || (this.modules[e + o][t + i] = 0 <= o && o <= 6 && (0 == i || 6 == i) || 0 <= i && i <= 6 && (0 == o || 6 == o) || 2 <= o && o <= 4 && 2 <= i && i <= 4);
  }
  getBestMaskPattern() {
    let e = 0,
      t = 0;
    for (let o = 0; o < 8; o++) {
      this.makeImpl(!0, o);
      let i = l.getLostPoint(this);
      if (0 == o || e > i) {
        e = i;
        t = o;
      }
    }
    return t;
  }
  createMovieClip(e, t, o) {
    let i = e.createEmptyMovieClip(t, o);
    this.make();
    for (let e = 0; e < this.modules.length; e++) {
      let t = 1 * e;
      for (let o = 0; o < this.modules[e].length; o++) {
        let n = 1 * o;
        if (this.modules[e][o]) {
          i.beginFill(0, 100);
          i.moveTo(n, t);
          i.lineTo(n + 1, t);
          i.lineTo(n + 1, t + 1);
          i.lineTo(n, t + 1);
          i.endFill();
        }
      }
    }
    return i;
  }
  setupTimingPattern() {
    for (let e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
    for (let e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
  }
  setupPositionAdjustPattern() {
    let e = l.getPatternPosition(this.typeNumber);
    for (let t = 0; t < e.length; t++) for (let o = 0; o < e.length; o++) {
      let i = e[t],
        n = e[o];
      if (null == this.modules[i][n]) for (let e = -2; e <= 2; e++) for (let t = -2; t <= 2; t++) this.modules[i + e][n + t] = -2 == e || 2 == e || -2 == t || 2 == t || 0 == e && 0 == t;
    }
  }
  setupTypeNumber(e) {
    let t = l.getBCHTypeNumber(this.typeNumber);
    for (let o = 0; o < 18; o++) {
      let i = !e && 1 == (t >> o & 1);
      this.modules[Math.floor(o / 3)][o % 3 + this.moduleCount - 8 - 3] = i;
    }
    for (let o = 0; o < 18; o++) {
      let i = !e && 1 == (t >> o & 1);
      this.modules[o % 3 + this.moduleCount - 8 - 3][Math.floor(o / 3)] = i;
    }
  }
  setupTypeInfo(e, t) {
    let o = this.errorCorrectLevel << 3 | t,
      i = l.getBCHTypeInfo(o);
    for (let t = 0; t < 15; t++) {
      let o = !e && 1 == (i >> t & 1);
      t < 6 ? this.modules[t][8] = o : t < 8 ? this.modules[t + 1][8] = o : this.modules[this.moduleCount - 15 + t][8] = o;
    }
    for (let t = 0; t < 15; t++) {
      let o = !e && 1 == (i >> t & 1);
      t < 8 ? this.modules[8][this.moduleCount - t - 1] = o : t < 9 ? this.modules[8][15 - t - 1 + 1] = o : this.modules[8][15 - t - 1] = o;
    }
    this.modules[this.moduleCount - 8][8] = !e;
  }
  mapData(e, t) {
    let o = -1,
      i = this.moduleCount - 1,
      n = 7,
      a = 0;
    for (let s = this.moduleCount - 1; s > 0; s -= 2) {
      6 == s && s--;
      for (;;) {
        for (let o = 0; o < 2; o++) if (null == this.modules[i][s - o]) {
          let r = !1;
          a < e.length && (r = 1 == (e[a] >>> n & 1));
          l.getMask(t, i, s - o) && (r = !r);
          this.modules[i][s - o] = r;
          if (-1 == --n) {
            a++;
            n = 7;
          }
        }
        if ((i += o) < 0 || this.moduleCount <= i) {
          i -= o;
          o = -o;
          break;
        }
      }
    }
  }
}
u.PAD0 = 236;
u.PAD1 = 17;
const {
  ccclass: m,
  property: f
} = cc._decorator;
let g = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.string = "Hello World!";
    this.backColor = cc.Color.WHITE;
    this.foreColor = cc.Color.BLACK;
    this.margin = 10;
    this.size = 200;
  }
  onLoad() {
    this.graphics = this.addComponent(cc.Graphics);
  }
  setContent() {
    this.node.setContentSize(this.size, this.size);
    this.graphics.clear();
    this.graphics.fillColor = this.backColor;
    let e = this.node.width;
    this.graphics.rect(-e / 2, -e / 2, e, e);
    this.graphics.fill();
    this.graphics.close();
    let t = new u(-1, a.H);
    t.addData(this.string);
    t.make();
    this.graphics.fillColor = this.foreColor;
    let o = e - 2 * this.margin,
      i = t.getModuleCount(),
      n = o / i,
      s = o / i,
      r = Math.ceil(n),
      l = Math.ceil(s);
    for (let a = 0; a < i; a++) for (let c = 0; c < i; c++) if (t.isDark(a, c)) {
      this.graphics.rect(this.margin + c * n - e / 2, o - s - Math.round(a * s) + this.margin - e / 2, r, l);
      this.graphics.fill();
    }
  }
};
i([f], g.prototype, "string", void 0);
i([f(cc.Color)], g.prototype, "backColor", void 0);
i([f(cc.Color)], g.prototype, "foreColor", void 0);
i([f], g.prototype, "margin", void 0);
i([f], g.prototype, "size", void 0);
g = i([m], g);
exports.QRCodeComponent = g;