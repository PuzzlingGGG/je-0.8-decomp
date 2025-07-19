"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/Scene"),
  s = e("../../Frame/SceneManager"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.contentLabel = null;
    this.backBtn = null;
  }
  onLoad() {
    this.backBtn.node.on(n.default.CLICK, this.onBackBtn, this);
  }
  onBackBtn() {
    s.default.ins.Back(() => {}, s.ShiftAnima.moveRightShift);
  }
  setData(e, t) {
    this.titleLabel.string = e;
    this.contentLabel.string = t;
  }
};
i([l(cc.Label)], c.prototype, "titleLabel", void 0);
i([l(cc.Label)], c.prototype, "contentLabel", void 0);
i([l(n.default)], c.prototype, "backBtn", void 0);
c = i([r], c);
exports.default = c;