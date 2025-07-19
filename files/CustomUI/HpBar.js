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
  property: a
} = cc._decorator;
let s = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.mask = null;
    this.hp = 0;
    this.hpMax = 1;
  }
  refresh() {
    this.label.string = `${this.hp}/${this.hpMax}`;
    this.mask.node.width = this.hp / this.hpMax * this.node.width;
  }
  show() {
    this.node.active = !0;
  }
  hide() {
    this.node.active = !1;
  }
};
i([a(cc.Label)], s.prototype, "label", void 0);
i([a(cc.Mask)], s.prototype, "mask", void 0);
s = i([n], s);
exports.default = s;