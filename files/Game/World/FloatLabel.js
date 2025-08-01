"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Pool"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.anim = null;
  }
  onLoad() {
    this.label = this.node.getComponentInChildren(cc.Label);
    this.anim = this.node.getComponent(cc.Animation);
    this.anim.on(cc.Animation.EventType.FINISHED, this.onAnimFinish, this);
  }
  play(e) {
    this.anim.play(e);
  }
  onAnimFinish() {
    this.node.emit(n.default.PUT);
  }
};
r = i([a], r);
exports.default = r;