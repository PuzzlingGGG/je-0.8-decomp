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
    this.target = null;
    this.boundBox = null;
    this._follower = null;
  }
  setCamera(e, t) {
    this._follower = t;
    this._follower.setCamera(e, this.node, this.boundBox);
  }
  lateUpdate(e) {
    this._follower && this._follower.doFollow();
  }
  setTarget(e) {
    this.target = e;
    this._follower && this._follower.setTarget(e);
  }
  centerOnTarget() {
    this._follower && this._follower.centerOnTarget();
  }
};
i([a(cc.Node)], s.prototype, "boundBox", void 0);
s = i([n], s);
exports.default = s;