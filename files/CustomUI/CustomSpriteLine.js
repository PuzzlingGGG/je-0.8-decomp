"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const {
  ccclass: n,
  menu: a,
  property: s
} = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sp = null;
    this._isReady = !1;
    this._sx = 0;
    this._sy = 0;
    this._dir = new cc.Vec2();
    this._lineWidth = 0;
    this._lineLen = 0;
    this._tilingOffset = new cc.Vec4();
  }
  onLoad() {
    this.node.anchorX = 0;
    this.node.anchorY = .5;
    this._mat = this.sp.getMaterial(0);
  }
  start() {
    this._isReady = !0;
    this.onRender();
  }
  drawLine(e, t, o, i, n, a) {
    this._sx = e;
    this._sy = t;
    let s = o - e,
      r = i - t,
      l = Math.sqrt(s * s + r * r);
    if (l > 0) {
      this._dir.x = s / l;
      this._dir.y = r / l;
    }
    this._lineWidth = n;
    this._lineLen = a;
    this._isReady && this.onRender();
  }
  onRender() {
    this.node.x = this._sx;
    this.node.y = this._sy;
    let e = 180 * this._dir.angle(cc.Vec2.RIGHT) / Math.PI;
    this.node.angle = e;
    this.node.height = this._lineWidth;
    this.node.width = this._lineLen;
    let t = this.sp.spriteFrame.getTexture().height / this.sp.spriteFrame.getTexture().width;
    if (this._mat && this._lineWidth > 0) {
      this._tilingOffset.x = this._lineLen / this._lineWidth * t;
      this._tilingOffset.y = 1;
      this._mat.setProperty("tilingOffset", this._tilingOffset);
    }
  }
};
i([s(cc.Sprite)], r.prototype, "sp", void 0);
r = i([n, a("自定义UI/Line")], r);
exports.default = r;