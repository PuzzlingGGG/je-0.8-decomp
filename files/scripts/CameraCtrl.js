"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("./Util"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.target = null;
    this.useX = !1;
    this.useY = !1;
  }
  update() {
    if (!this.target || !this.target.isValid) return;
    let e = n.Util.convertPosition(this.target, this.node.parent);
    this.useX && (this.node.x = n.Util.lerp(this.node.x, e.x, .1));
    this.useY && (this.node.y = n.Util.lerp(this.node.y, e.y, .1));
  }
};
i([s(cc.Node)], r.prototype, "target", void 0);
i([s], r.prototype, "useX", void 0);
i([s], r.prototype, "useY", void 0);
r = i([a], r);
exports.default = r;