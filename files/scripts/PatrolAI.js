"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../Game/World/WorldChild"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends n.default {
  constructor() {
    super(...arguments);
    this.posArr = [];
    this.posIdx = 0;
    this.moveSpeed = 100;
    this.skin = null;
  }
  update(e) {
    if (!this.world.playing) return;
    if (this.posArr.length <= 0) return;
    let t = this.node.position,
      o = this.posArr[this.posIdx % this.posArr.length],
      i = o.sub(t),
      n = i.magSqr(),
      a = this.moveSpeed * e;
    if (n < a * a) {
      this.node.position = o;
      this.posIdx++;
    } else this.node.position = t.addSelf(i.normalizeSelf().mulSelf(a));
    this.skin && (i.x > 0 ? this.skin.scaleX = 1 : i.x < 0 && (this.skin.scaleX = -1));
  }
};
i([s(cc.Node)], r.prototype, "skin", void 0);
r = i([a], r);
exports.default = r;