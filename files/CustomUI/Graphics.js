"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../Frame/Util"),
  a = e("../Scene/PaintScene/GraphicsSelectBox"),
  s = e("./Button"),
  {
    ccclass: r,
    menu: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.tempSprite = null;
    this.selectBox = null;
    this.flipXBtn = null;
    this.flipYBtn = null;
    this.deleteSelectAreaBtn = null;
    this.copySelectAreaBtn = null;
    this.sizeSliderNode = null;
    this.renderTexture = null;
    this.pixels = null;
    this.tempRenderTexture = null;
    this.tempPixels = null;
    this.width = 0;
    this.height = 0;
    this.color = cc.Color.BLACK;
    this._lineWidth = 5;
    this.v2Pool = [];
    this.uint8ArrayPool = [];
    this.braushMap = new Map();
    this.lineOp = null;
    this.lastPos = cc.Vec2.ZERO;
    this.opStack = [];
    this.touchStartPos = null;
    this.touchLastPos = null;
  }
  set lineWidth(e) {
    this._lineWidth = Math.floor(e);
  }
  get lineWidth() {
    return this._lineWidth;
  }
  onLoad() {
    this.hideSelectBox();
    cc.game.on("cutPixelsToSelectBox", this.cutPixelsToSelectBox, this);
    this.flipXBtn.node.on(s.default.CLICK, this.onFlipXBtn, this);
    this.flipYBtn.node.on(s.default.CLICK, this.onFlipYBtn, this);
    this.deleteSelectAreaBtn.node.on(s.default.CLICK, this.onDeleteSelectAreaBtn, this);
    this.copySelectAreaBtn.node.on(s.default.CLICK, this.onCopySelectAreaBtn, this);
  }
  onDestroy() {
    cc.game.off("cutPixelsToSelectBox", this.cutPixelsToSelectBox, this);
  }
  setSize(e, t) {
    this.width = e;
    this.height = t;
    let o = cc.game._renderContext;
    this.sprite.node.width = this.node.width = e;
    this.sprite.node.height = this.node.height = t;
    this.sprite.spriteFrame = new cc.SpriteFrame();
    let i = new cc.RenderTexture();
    i.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    i.initWithSize(e, t, o.STENCIL_INDEX8);
    this.renderTexture = i;
    this.pixels = this._getUint8Array();
    this.selectBox.setParentSize(e, t);
    this.tempSprite.node.width = this.node.width = e;
    this.tempSprite.node.height = this.node.height = t;
    this.tempSprite.spriteFrame = new cc.SpriteFrame();
    let n = new cc.RenderTexture();
    n.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    n.initWithSize(e, t, o.STENCIL_INDEX8);
    this.tempRenderTexture = n;
    this.tempPixels = this._getUint8Array();
  }
  _drawPixels(e) {
    let t = Math.floor(e.length / 4);
    for (let o = 0; o < t; o++) {
      let t = 4 * o,
        i = e[t],
        n = e[t + 1],
        a = e[t + 2],
        s = e[t + 3];
      if (0 != s) {
        this.pixels[t] = i;
        this.pixels[t + 1] = n;
        this.pixels[t + 2] = a;
        this.pixels[t + 3] = s;
      }
    }
  }
  _drawLine(e, t, o, i, n) {
    t.x = Math.floor(t.x);
    t.y = Math.floor(t.y);
    exports.x = Math.floor(o.x);
    exports.y = Math.floor(o.y);
    if (t.x > o.x) {
      let e = t;
      t = o;
      o = e;
    }
    let a = this._getBrush(i),
      s = [],
      r = t.x,
      l = o.x,
      c = Math.min(t.y, o.y),
      d = Math.max(t.y, o.y);
    if (Math.abs(r - l) < 1e-5) for (let e in a) {
      let t = Number.parseInt(e),
        o = a[t];
      if (o) {
        let e = {
          ymin: c + o.ymin,
          ymax: d + o.ymax
        };
        s[r + t] = e;
      }
    } else {
      let e = (o.y - t.y) / (l - r),
        i = Math.floor(t.y),
        n = 0,
        h = (e, t) => {
          for (let o in a) {
            let i = Number.parseInt(o),
              n = e + i;
            if (n < 0 || n >= this.width) continue;
            let r = a[i];
            if (!r) continue;
            let l = s[n];
            if (null == l) {
              l = {
                ymin: t,
                ymax: t
              };
              s[n] = l;
            }
            t + r.ymin < l.ymin && (l.ymin = t + r.ymin);
            t + r.ymax > l.ymax && (l.ymax = t + r.ymax);
          }
        };
      for (let t = r; t <= l; t++) {
        if (t != r) {
          n += e / 2;
          for (; n >= 1;) {
            n -= 1;
            h(t, ++i);
          }
          for (; n <= -1;) {
            n += 1;
            h(t, --i);
          }
        }
        h(t, i);
        n += e / 2;
        for (; n >= 1;) {
          n -= 1;
          if (++i > d) break;
          h(t, i);
        }
        for (; n <= -1;) {
          n += 1;
          if (--i < c) break;
          h(t, i);
        }
      }
    }
    this.fillRange(e, s, n);
  }
  _drawRect(e, t, o, i, n, a) {
    exports.x = Math.floor(o.x);
    exports.y = Math.floor(o.y);
    i.x = Math.floor(i.x);
    i.y = Math.floor(i.y);
    if (o.x > i.x) {
      let e = o;
      o = i;
      i = e;
    }
    let s = o.x,
      r = i.x,
      l = Math.min(o.y, i.y),
      c = Math.max(o.y, i.y),
      d = cc.v2(s, l),
      h = cc.v2(r, l),
      p = cc.v2(s, c),
      u = cc.v2(r, c);
    this._drawLine(e, d, h, n, a);
    this._drawLine(e, p, u, n, a);
    this._drawLine(e, d, p, n, a);
    this._drawLine(e, h, u, n, a);
    if (t) for (let t = s; t < r; t++) for (let o = l; o < c; o++) {
      let i = this._getStart(t, o);
      e[i] = a.r;
      e[i + 1] = a.g;
      e[i + 2] = a.b;
      e[i + 3] = a.a;
    }
  }
  _drawCircle(e, t, o, i, n, a) {
    exports.x = Math.floor(o.x);
    exports.y = Math.floor(o.y);
    i.x = Math.floor(i.x);
    i.y = Math.floor(i.y);
    if (o.x > i.x) {
      let e = o;
      o = i;
      i = e;
    }
    let s = o.x,
      r = i.x,
      l = Math.min(o.y, i.y),
      c = Math.max(o.y, i.y),
      d = Math.floor((r + s) / 2),
      h = Math.floor((c + l) / 2),
      p = Math.floor((r - s) / 2),
      u = Math.floor((c - l) / 2),
      m = t => {
        let o,
          i = t[0];
        for (let s = 1; s < t.length; s++) {
          o = t[s];
          this._drawLine(e, i, o, n, a);
          i = o;
        }
      },
      f = [],
      g = [],
      y = [],
      v = [],
      C = [];
    for (let e = 0; e <= p; e++) {
      let t = Math.sqrt(u * u * (p * p - e * e)) / p;
      t = Math.round(t);
      f.push(cc.v2(d + e, h + t));
      g.push(cc.v2(d + e, h - t));
      y.push(cc.v2(d - e, h + t));
      v.push(cc.v2(d - e, h - t));
      C[d + e] = {
        ymin: h - t,
        ymax: h + t
      };
      C[d - e] = {
        ymin: h - t,
        ymax: h + t
      };
    }
    m(f);
    m(g);
    m(y);
    m(v);
    t && this.fillRange(e, C, a);
  }
  _bucketFill(e, t) {
    let o = this.pixels;
    e = this._getV2(Math.floor(e.x), Math.floor(e.y));
    let i = this._getStart(e.x, e.y),
      n = this.width,
      a = this.height,
      s = t.getR(),
      r = t.getG(),
      l = t.getB(),
      c = t.getA(),
      d = o[i],
      h = o[i + 1],
      p = o[i + 2],
      u = o[i + 3];
    if (s == d && r == h && l == p && c == u) return;
    let m = (e, t) => {
        i = this._getStart(e, t);
        if (e >= 0 && t >= 0 && e < n && t < a && o[i] == d && o[i + 1] == h && o[i + 2] == p && o[i + 3] == u) {
          exports.i = s;
          o[i + 1] = r;
          o[i + 2] = l;
          o[i + 3] = c;
          f.push(this._getV2(e, t));
        }
      },
      f = [],
      g = n * a;
    m(e.x, e.y);
    for (; f.length > 0 && g--;) {
      m((e = f.pop()).x - 1, e.y);
      m(e.x, e.y - 1);
      m(e.x + 1, e.y);
      m(e.x, e.y + 1);
      this.v2Pool.push(e);
    }
  }
  _getV2(e, t) {
    let o = null;
    if (this.v2Pool.length > 0) {
      (o = this.v2Pool.pop()).x = e;
      exports.y = t;
    } else o = cc.v2(e, t);
    return o;
  }
  _getUint8Array(e = null) {
    let t = null;
    t = this.uint8ArrayPool.length > 0 ? this.uint8ArrayPool.pop() : new Uint8Array(this.width * this.height * 4);
    e && t.set(e);
    return t;
  }
  _clear(e, t, o, i) {
    let n = this.pixels;
    for (let i = e; i < o; i++) for (let e = t; e < this.height; e++) {
      let t = this._getStart(i, e);
      n[t] = 0;
      n[t + 1] = 0;
      n[t + 2] = 0;
      n[t + 3] = 0;
    }
  }
  _clearTemp(e, t, o, i) {
    let n = this.tempPixels;
    for (let i = e; i < o; i++) for (let e = t; e < this.height; e++) {
      let t = this._getStart(i, e);
      n[t] = 0;
      n[t + 1] = 0;
      n[t + 2] = 0;
      n[t + 3] = 0;
    }
  }
  _getStart(e, t) {
    return 4 * ((this.height - t - 1) * this.width + e);
  }
  _getBrush(e) {
    if (this.braushMap.has(e)) return this.braushMap.get(e);
    {
      let t = [];
      if (1 == e) t[0] = {
        ymin: 0,
        ymax: 0
      };else if (2 == e) {
        t[-1] = {
          ymin: 0,
          ymax: 1
        };
        t[0] = {
          ymin: 0,
          ymax: 1
        };
      } else if (3 == e) {
        t[-1] = {
          ymin: 0,
          ymax: 0
        };
        t[0] = {
          ymin: -1,
          ymax: 1
        };
        t[1] = {
          ymin: 0,
          ymax: 0
        };
      } else {
        let o = e / 2;
        if (e % 2 == 0) for (let e = -o; e < o; e++) {
          let i = Math.sqrt(o * o - Math.pow(e + .5, 2));
          i -= .5;
          t[e] = {
            ymin: -Math.floor(i),
            ymax: Math.ceil(i)
          };
        } else for (let e = -Math.floor(o); e <= Math.floor(o); e++) {
          let i = Math.sqrt(o * o - Math.pow(e, 2));
          t[e] = {
            ymin: -Math.floor(i),
            ymax: Math.floor(i)
          };
        }
      }
      this.braushMap.set(e, t);
      return t;
    }
  }
  fillRange(e, t, o) {
    let i = o.getR(),
      n = o.getG(),
      a = o.getB(),
      s = o.getA();
    t.forEach((t, o) => {
      if (o < 0 || o >= this.width) return;
      let r = Math.max(t.ymin, 0),
        l = Math.min(t.ymax, this.height);
      for (let t = r; t <= l; t++) {
        let r = this._getStart(o, t);
        e[r] = i;
        e[r + 1] = n;
        e[r + 2] = a;
        e[r + 3] = s;
      }
    });
  }
  updateTexture() {
    let e = this.pixels;
    this.renderTexture.initWithData(e, cc.Texture2D.PixelFormat.RGBA8888, this.width, this.height);
    this.sprite.spriteFrame.setTexture(this.renderTexture);
  }
  updateTempTexture() {
    let e = this.tempPixels;
    this.tempRenderTexture.initWithData(e, cc.Texture2D.PixelFormat.RGBA8888, this.width, this.height);
    this.tempSprite.spriteFrame.setTexture(this.tempRenderTexture);
  }
  drawPixels(e) {
    if (e) {
      this._drawPixels(e);
      this.updateTexture();
      this.pushOp({
        type: "drawPixels",
        pixels: e
      });
    }
  }
  importPixels(e) {
    let t = n.Util.getPixelTirmBounds(e, 256, 256),
      o = t.xmax - t.xmin + 1,
      i = t.ymax - t.ymin + 1,
      a = new Uint8Array(o * i * 4);
    for (let n = 0; n < o; n++) for (let s = 0; s < i; s++) {
      let i = 4 * (s * o + n),
        r = 4 * (256 * (s + 256 - t.ymax - 1) + n + t.xmin);
      a[i] = e[r];
      a[i + 1] = e[r + 1];
      a[i + 2] = e[r + 2];
      a[i + 3] = e[r + 3];
    }
    this.selectBox.node.x = Math.floor((256 - o) / 2);
    this.selectBox.node.y = Math.floor((256 - i) / 2);
    this.selectBox.node.width = o;
    this.selectBox.node.height = i;
    this.selectBox.clearSrc = !1;
    this.showSelectBox();
    this.selectBox.setOriPixels(a, o, i);
    this.selectBox.saveSrcPosSize();
    this.selectBox.refreshGrashice();
  }
  beginLine(e) {
    e.x = Math.floor(e.x);
    e.y = Math.floor(e.y);
    this.lastPos = e;
    this.updateTexture();
    this.lineOp = {
      type: "line",
      lineWidth: this.lineWidth,
      color: this.color,
      posList: [e]
    };
  }
  lineTo(e) {
    e.x = Math.floor(e.x);
    e.y = Math.floor(e.y);
    this._drawLine(this.pixels, this.lastPos, e, this.lineWidth, this.color);
    this.lastPos = e;
    this.updateTexture();
    this.lineOp && this.lineOp.posList.push(e);
  }
  endLine() {
    if (this.lineOp) {
      this.pushOp(this.lineOp);
      this.lineOp = null;
    }
  }
  clear(e = 0, t = 0, o = this.width, i = this.height) {
    this._clear(e, t, o, i);
    this.updateTexture();
    this.opStack = [];
  }
  bucketFill(e, t) {
    this._bucketFill(e, t);
    this.updateTexture();
    this.pushOp({
      type: "bucket",
      pos: e,
      color: t
    });
  }
  pushOp(e) {
    if (this.opStack.length % 5 == 0 && 0 != this.opStack.length) {
      let t = new Uint8Array(this.width * this.height * 4);
      for (let e = 0, o = this.pixels.length; e < o; e++) t[e] = this.pixels[e];
      e.snapshot = t;
    }
    this.opStack.push(e);
  }
  apllyStack(e) {
    cc.log(e);
    let t = 0;
    for (let o = e.length - 1; o >= 0; o--) {
      let i = e[o];
      if (i.snapshot) {
        this.pixels = this._getUint8Array(i.snapshot);
        t = o + 1;
        break;
      }
    }
    cc.log(`从第${t}开始恢复, ${e.length}`);
    for (let o = t; o < e.length; o++) {
      let t = e[o];
      switch (t.type) {
        case "line":
          {
            let e,
              o = t.color,
              i = t.lineWidth,
              n = t.posList,
              a = n[0];
            for (let t = 1; t < n.length; t++) {
              e = n[t];
              this._drawLine(this.pixels, a, e, i, o);
              a = e;
            }
            break;
          }
        case "bucket":
          this._bucketFill(t.pos, t.color);
          break;
        case "clear":
          this._clear(t.x, t.y, t.w, t.h);
          break;
        case "drawPixels":
          this._drawPixels(t.pixels);
          break;
        case "selectBox":
          t.clearSrc && this._clearArea(t.srcX, t.srcY, t.srcW, t.srcH);
          this._drawAreaPixles(t.pixels, t.newX, t.newY, t.newW, t.newH);
          this.updateTexture();
          break;
        case "deleteSelectArea":
          this._clearArea(t.x, t.y, t.w, t.h);
          this.updateTexture();
          break;
        case "copySelectArea":
          this._drawAreaPixles(t.pixels, t.newX, t.newY, t.newW, t.newH);
          this.updateTexture();
          break;
        case "rect":
          this._drawRect(this.pixels, t.fill, t.pos1, t.pos2, t.lineWidth, t.color);
          break;
        case "circle":
          this._drawCircle(this.pixels, t.fill, t.pos1, t.pos2, t.lineWidth, t.color);
      }
    }
    this.updateTexture();
  }
  revert() {
    this._clear(0, 0, this.width, this.height);
    this.opStack.length > 0 && this.opStack.pop();
    this.apllyStack(this.opStack);
  }
  _drawAreaPixles(e, t, o, i, n) {
    for (let a = 0; a < i; a++) if (!(a + t < 0 || a + t >= this.width)) for (let s = 0; s < n; s++) {
      let r = 4 * ((n - s - 1) * i + a),
        l = this._getStart(a + t, s + o);
      if (0 !== e[r + 3]) {
        this.pixels[l] = e[r];
        this.pixels[l + 1] = e[r + 1];
        this.pixels[l + 2] = e[r + 2];
        this.pixels[l + 3] = e[r + 3];
      }
    }
    this.updateTexture();
  }
  _clearArea(e, t, o, i) {
    for (let n = 0; n < o; n++) for (let o = 0; o < i; o++) {
      let i = this._getStart(n + e, o + t);
      this.pixels[i] = 0;
      this.pixels[i + 1] = 0;
      this.pixels[i + 2] = 0;
      this.pixels[i + 3] = 0;
    }
    this.updateTexture();
  }
  _getAreaPixels(e, t, o, i) {
    let n = new Uint8Array(o * i * 4);
    for (let a = 0; a < o; a++) for (let s = 0; s < i; s++) {
      let r = 4 * ((i - s - 1) * o + a),
        l = this._getStart(a + e, s + t);
      n[r] = this.pixels[l];
      n[r + 1] = this.pixels[l + 1];
      n[r + 2] = this.pixels[l + 2];
      n[r + 3] = this.pixels[l + 3];
    }
    return n;
  }
  showSelectBox() {
    this.selectBox.node.active = !0;
    this.flipXBtn.node.active = !0;
    this.flipYBtn.node.active = !0;
    this.deleteSelectAreaBtn.node.active = !0;
    this.copySelectAreaBtn.node.active = !0;
    this.sizeSliderNode.active = !1;
  }
  hideSelectBox() {
    this.selectBox.node.active = !1;
    this.flipXBtn.node.active = !1;
    this.flipYBtn.node.active = !1;
    this.deleteSelectAreaBtn.node.active = !1;
    this.copySelectAreaBtn.node.active = !1;
    this.sizeSliderNode.active = !0;
  }
  onFlipXBtn() {
    if (!this.selectBox.pixels) {
      this.cutPixelsToSelectBox(!0);
      this.selectBox.clearSrc = !0;
    }
    let e = this.selectBox.pixels,
      t = this.selectBox.pixelsW,
      o = this.selectBox.pixelsH,
      i = t / 2,
      n = (t, o) => {
        let i = e[t];
        e[t] = e[o];
        e[o] = i;
      };
    for (let e = 0; e < o; e++) for (let o = 0; o < i; o++) {
      let i = 4 * (e * t + o),
        a = 4 * (e * t + t - o - 1);
      n(i, a);
      n(i + 1, a + 1);
      n(i + 2, a + 2);
      n(i + 3, a + 3);
    }
    this.selectBox.updateScalePixles();
  }
  onFlipYBtn() {
    if (!this.selectBox.pixels) {
      this.cutPixelsToSelectBox(!0);
      this.selectBox.clearSrc = !0;
    }
    let e = this.selectBox.pixels,
      t = this.selectBox.pixelsW,
      o = this.selectBox.pixelsH,
      i = o / 2,
      n = (t, o) => {
        let i = e[t];
        e[t] = e[o];
        e[o] = i;
      };
    for (let e = 0; e < t; e++) for (let a = 0; a < i; a++) {
      let i = 4 * (a * t + e),
        s = 4 * ((o - 1 - a) * t + e);
      n(i, s);
      n(i + 1, s + 1);
      n(i + 2, s + 2);
      n(i + 3, s + 3);
    }
    this.selectBox.updateScalePixles();
  }
  onDeleteSelectAreaBtn() {
    if (this.selectBox.pixels) this.selectBox.clearPixels();else {
      let e = this.selectBox.node.x,
        t = this.selectBox.node.y,
        o = this.selectBox.node.width,
        i = this.selectBox.node.height;
      this._clearArea(e, t, o, i);
    }
    this.hideSelectBox();
    this.pushOp({
      type: "deleteSelectArea",
      x: this.selectBox.srcX,
      y: this.selectBox.srcY,
      w: this.selectBox.srcW,
      h: this.selectBox.srcH
    });
  }
  onCopySelectAreaBtn() {
    if (this.selectBox.scaledPixels) {
      this._drawAreaPixles(this.selectBox.scaledPixels, this.selectBox.node.x, this.selectBox.node.y, this.selectBox.scaledW, this.selectBox.scaledH);
      this.pushOp({
        type: "copySelectArea",
        srcX: this.selectBox.srcX,
        srcY: this.selectBox.srcY,
        srcW: this.selectBox.srcW,
        srcH: this.selectBox.srcH,
        newX: this.selectBox.node.x,
        newY: this.selectBox.node.y,
        newW: this.selectBox.scaledW,
        newH: this.selectBox.scaledH,
        pixels: this.selectBox.scaledPixels
      });
    } else if (this.selectBox.pixels) {
      this._drawAreaPixles(this.selectBox.pixels, this.selectBox.node.x, this.selectBox.node.y, this.selectBox.srcW, this.selectBox.srcH);
      this.pushOp({
        type: "copySelectArea",
        srcX: this.selectBox.srcX,
        srcY: this.selectBox.srcY,
        srcW: this.selectBox.srcW,
        srcH: this.selectBox.srcH,
        newX: this.selectBox.node.x,
        newY: this.selectBox.node.y,
        newW: this.selectBox.srcW,
        newH: this.selectBox.srcH,
        pixels: this.selectBox.pixels
      });
    }
    this.updateTexture();
    this.selectBox.pixels || this.cutPixelsToSelectBox(!1);
    this.selectBox.node.x += 10;
    this.selectBox.node.y += 10;
  }
  selectBoxTouchStart(e) {
    e.x = Math.floor(e.x);
    e.y = Math.floor(e.y);
    this.touchStartPos = e;
    this.touchLastPos = e;
    if (this.selectBox.node.active && this.selectBox.node.getBoundingBox().contains(e)) this.selectBox.state = a.GraphicsSelectBoxState.move;else {
      this.putSelectBoxPixelsToGraphics();
      this.selectBox.clearPixels();
      this.selectBox.state = a.GraphicsSelectBoxState.resize;
      this.showSelectBox();
      this.selectBox.node.position = e;
      this.selectBox.node.width = 0;
      this.selectBox.node.height = 0;
      this.selectBox.saveSrcPosSize();
    }
    this.selectBox.refreshGrashice();
  }
  selectBoxTouchMove(e) {
    e.x = Math.floor(e.x);
    e.y = Math.floor(e.y);
    if (this.selectBox.state == a.GraphicsSelectBoxState.move) {
      if (!this.selectBox.pixels) {
        this.cutPixelsToSelectBox(!0);
        this.selectBox.clearSrc = !0;
      }
      this.selectBox.node.x += e.x - this.touchLastPos.x;
      this.selectBox.node.y += e.y - this.touchLastPos.y;
    } else if (this.selectBox.state == a.GraphicsSelectBoxState.resize) {
      this.selectBox.dragSize(this.touchStartPos, e);
      this.selectBox.saveSrcPosSize();
    }
    this.touchLastPos = e;
    this.selectBox.refreshGrashice();
  }
  selectBoxTouchEnd() {
    0 != this.selectBox.node.width && 0 != this.selectBox.node.height || this.hideSelectBox();
  }
  cutPixelsToSelectBox(e) {
    let t = this.selectBox.node.x,
      o = this.selectBox.node.y,
      i = this.selectBox.node.width,
      n = this.selectBox.node.height,
      a = this._getAreaPixels(t, o, i, n);
    e && this._clearArea(t, o, i, n);
    this.selectBox.setOriPixels(a, i, n);
  }
  putSelectBoxPixelsToGraphics() {
    if (this.selectBox.node.active) {
      if (this.selectBox.scaledPixels) {
        this._drawAreaPixles(this.selectBox.scaledPixels, this.selectBox.node.x, this.selectBox.node.y, this.selectBox.scaledW, this.selectBox.scaledH);
        this.pushOp({
          type: "selectBox",
          clearSrc: this.selectBox.clearSrc,
          srcX: this.selectBox.srcX,
          srcY: this.selectBox.srcY,
          srcW: this.selectBox.srcW,
          srcH: this.selectBox.srcH,
          newX: this.selectBox.node.x,
          newY: this.selectBox.node.y,
          newW: this.selectBox.scaledW,
          newH: this.selectBox.scaledH,
          pixels: this.selectBox.scaledPixels
        });
      } else if (this.selectBox.pixels) {
        this._drawAreaPixles(this.selectBox.pixels, this.selectBox.node.x, this.selectBox.node.y, this.selectBox.srcW, this.selectBox.srcH);
        this.pushOp({
          type: "selectBox",
          clearSrc: this.selectBox.clearSrc,
          srcX: this.selectBox.srcX,
          srcY: this.selectBox.srcY,
          srcW: this.selectBox.srcW,
          srcH: this.selectBox.srcH,
          newX: this.selectBox.node.x,
          newY: this.selectBox.node.y,
          newW: this.selectBox.srcW,
          newH: this.selectBox.srcH,
          pixels: this.selectBox.pixels
        });
      }
      this.updateTexture();
    }
  }
  checkFinishSelectBox() {
    this.putSelectBoxPixelsToGraphics();
    this.selectBox.clearPixels();
    this.hideSelectBox();
  }
  setScale(e) {
    this.node.scale = e;
    this.selectBox.setParentScale(e);
  }
  applyTempPixels() {
    for (let e = 0; e < this.tempPixels.length; e += 4) if (0 !== this.tempPixels[e + 3]) {
      this.pixels[e] = this.tempPixels[e];
      this.pixels[e + 1] = this.tempPixels[e + 1];
      this.pixels[e + 2] = this.tempPixels[e + 2];
      this.pixels[e + 3] = this.tempPixels[e + 3];
    }
    this.updateTexture();
    this.tempSprite.node.active = !1;
    this._clearTemp(0, 0, this.width, this.height);
    this.updateTempTexture();
  }
  beginStraightLine(e) {
    this.tempSprite.node.active = !0;
    this.touchStartPos = e;
  }
  dragStraightLine(e) {
    this.touchLastPos = e;
    this._clearTemp(0, 0, this.width, this.height);
    this._drawLine(this.tempPixels, this.touchStartPos, e, this.lineWidth, this.color);
    this.updateTempTexture();
  }
  endStraightLine() {
    this.applyTempPixels();
    this.pushOp({
      type: "line",
      lineWidth: this.lineWidth,
      color: this.color,
      posList: [this.touchStartPos, this.touchLastPos]
    });
  }
  beginRect(e, t) {
    this.tempSprite.node.active = !0;
    this.touchStartPos = t;
  }
  dragRect(e, t) {
    this.touchLastPos = t;
    this._clearTemp(0, 0, this.width, this.height);
    this._drawRect(this.tempPixels, e, this.touchStartPos, t, this.lineWidth, this.color);
    this.updateTempTexture();
  }
  endRect(e) {
    this.applyTempPixels();
    this.pushOp({
      type: "rect",
      lineWidth: this.lineWidth,
      color: this.color,
      fill: e,
      pos1: this.touchStartPos,
      pos2: this.touchLastPos
    });
  }
  beginCircle(e, t) {
    this.tempSprite.node.active = !0;
    this.touchStartPos = t;
  }
  dragCircle(e, t) {
    this.touchLastPos = t;
    this._clearTemp(0, 0, this.width, this.height);
    this._drawCircle(this.tempPixels, e, this.touchStartPos, t, this.lineWidth, this.color);
    this.updateTempTexture();
  }
  endCircle(e) {
    this.applyTempPixels();
    this.pushOp({
      type: "circle",
      lineWidth: this.lineWidth,
      color: this.color,
      fill: e,
      pos1: this.touchStartPos,
      pos2: this.touchLastPos
    });
  }
};
i([c(cc.Sprite)], d.prototype, "sprite", void 0);
i([c(cc.Sprite)], d.prototype, "tempSprite", void 0);
i([c(a.default)], d.prototype, "selectBox", void 0);
i([c(s.default)], d.prototype, "flipXBtn", void 0);
i([c(s.default)], d.prototype, "flipYBtn", void 0);
i([c(s.default)], d.prototype, "deleteSelectAreaBtn", void 0);
i([c(s.default)], d.prototype, "copySelectAreaBtn", void 0);
i([c(cc.Node)], d.prototype, "sizeSliderNode", void 0);
d = i([r, l("自定义UI/Graphics")], d);
exports.default = d;