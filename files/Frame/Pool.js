"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const {
  ccclass: a,
  property: s
} = cc._decorator;
let r = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.prefab = null;
    this.nodePool = new cc.NodePool();
  }
  onLoad() {
    this.prefab.active = !1;
  }
  get() {
    let e = null;
    this.nodePool.size() > 0 ? e = this.nodePool.get() : (e = cc.instantiate(this.prefab)).on(i.PUT, () => {
      this.put(e);
    });
    e.active = !0;
    return e;
  }
  put(e) {
    this.nodePool.put(e);
  }
};
r.PUT = "PUT";
n([s(cc.Node)], r.prototype, "prefab", void 0);
r = i = n([a], r);
exports.default = r;