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
    this.velocity = cc.Vec2.ZERO;
    this.angleSpeed = 0;
    this.flying = !1;
    this.g = 1500;
    this.needDestroy = !0;
  }
  update(e) {
    if (this.flying) {
      this.velocity.y -= e * this.g;
      this.node.x += this.velocity.x * e;
      this.node.y += this.velocity.y * e;
      this.node.angle += this.angleSpeed * e;
    }
  }
  fly(e, t, o) {
    this.flying = !0;
    this.velocity.x = e;
    this.velocity.y = t;
    this.angleSpeed = o;
  }
  fadeOut() {
    this.node.active = !0;
    cc.tween(this.node).delay(1).to(.5, {
      opacity: 0
    }).call(() => {
      this.flying = !1;
      this.needDestroy ? this.node.destroy() : this.node.active = !1;
    }).start();
  }
};
s = i([n], s);
exports.default = s;