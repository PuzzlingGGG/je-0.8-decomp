"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Config"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.onShiftBegin = null;
    this.onShiftEnd = null;
    this.anim = null;
    this.animReady = !1;
    this.worldReady = !1;
  }
  shiftBegin() {
    this.onShiftBegin && this.onShiftBegin();
  }
  shiftEnd() {
    this.animReady = !0;
    this.checkShiftEnd();
  }
  worldIsReady() {
    this.worldReady = !0;
    this.checkShiftEnd();
  }
  checkShiftEnd() {
    if (this.animReady && this.worldReady && this.onShiftEnd) {
      this.onShiftEnd();
      this.onShiftEnd = null;
      this.node.active = !1;
    }
  }
  play(e, t, o, i) {
    this.onShiftBegin = o;
    this.onShiftEnd = i;
    this.worldReady = !1;
    this.animReady = !1;
    this.node.active = !0;
    t = t || 2;
    this.nameLabel.string = e.info.name;
    let a = n.Config.shiftWorldAnims.find(e => e.id == t);
    this.anim.play(a.animName);
  }
};
i([s(cc.Label)], r.prototype, "nameLabel", void 0);
i([s(cc.Animation)], r.prototype, "anim", void 0);
r = i([a], r);
exports.default = r;