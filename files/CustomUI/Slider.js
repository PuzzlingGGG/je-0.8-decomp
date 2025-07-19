"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../Frame/Util"),
  {
    ccclass: s,
    menu: r,
    property: l
  } = cc._decorator;
let c = i = class extends cc.Slider {
  constructor() {
    super(...arguments);
    this.step = 10;
    this.min = 1;
    this.max = 10;
    this._value = 0;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    e = a.Util.clamp(e, this.min, this.max);
    this.progress = (e - this.min) / (this.max - this.min);
    this._value = e;
    this._updateHandlePosition();
    this._onMove(this);
    this.node.emit(i.MOVE, e);
  }
  onLoad() {
    let e = new cc.Component.EventHandler();
    e.target = this.node;
    e.handler = "_onMove";
    e.component = "Slider";
    this.slideEvents.push(e);
  }
  setRange(e, t) {
    this.min = e;
    this.max = t;
  }
  _onMove(e) {
    let t = a.Util.lerp01(this.min, this.max, this.progress),
      o = this.value != t;
    this._value = t;
    o && this.node.emit(i.MOVE, t);
  }
  _updateProgress(e) {
    if (!this.handle) return;
    let t = this.node;
    var o = t.convertToNodeSpaceAR(e.getLocation());
    let i = this._offset,
      n = 0;
    n = 0 === this.direction ? a.Util.clamp01((o.x - i.x + t.anchorX * t.width) / t.width) : a.Util.clamp01((o.y - i.y + t.anchorY * t.height) / t.height);
    if (this.step >= 2) {
      let e = this.step - 1;
      n = Math.round(n * e) / e;
    }
    this.progress = n;
  }
  _updateHandlePosition() {
    if (this.handle) {
      var e;
      if (0 === this.direction) {
        let t = this.node.width - this.handle.node.width;
        e = cc.v2(-t * this.node.anchorX + this.progress * t, 0);
      } else {
        let t = this.node.height - this.handle.node.height;
        e = cc.v2(0, -t * this.node.anchorY + this.progress * t);
      }
      var t = this.node.convertToWorldSpaceAR(e);
      t = this.handle.node.parent.convertToNodeSpaceAR(t);
      this.handle.node.position = t;
    }
  }
};
n([l], c.prototype, "step", void 0);
n([l], c.prototype, "min", void 0);
n([l], c.prototype, "max", void 0);
c = i = n([s, r("自定义UI/Slider")], c);
exports.default = c;