"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/Toggle"),
  s = e("../../Frame/Panel"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends s.default {
  constructor() {
    super(...arguments);
    this.toggle = null;
    this.btn = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.btn.node.on(n.default.CLICK, this.onBtn, this);
  }
  onBtn() {
    this.closePanel();
    this.call && this.call(this.toggle.isChecked);
  }
};
i([l(a.default)], c.prototype, "toggle", void 0);
i([l(n.default)], c.prototype, "btn", void 0);
c = i([r], c);
exports.default = c;