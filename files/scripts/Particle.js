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
    this.speedX = 0;
    this.speedY = 0;
    this.lifeTime = 0;
  }
};
s = i([n], s);
exports.default = s;