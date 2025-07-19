"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/Panel"),
  s = e("../../Frame/Top"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.editBox = null;
    this.btn = null;
    this.minChar = 20;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.btn.node.on(n.default.CLICK, this.onOk, this);
  }
  onOk() {
    let e = this.editBox.textLabel.string || "";
    if (e.length < this.minChar) s.default.showToast(`最少${this.minChar}个字`);else {
      this.closePanel();
      this.call && this.call(e);
    }
  }
};
i([l(cc.Label)], c.prototype, "titleLabel", void 0);
i([l(cc.EditBox)], c.prototype, "editBox", void 0);
i([l(n.default)], c.prototype, "btn", void 0);
c = i([r], c);
exports.default = c;