"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../Tile"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  show(e) {
    this.node.active = !0;
    this.node.position = e.position;
    this.node.y += n.default.SIZE / 2;
  }
  hide() {
    this.node.active = !1;
  }
};
r = i([a], r);
exports.default = r;