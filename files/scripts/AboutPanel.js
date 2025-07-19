"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../i18n/i18nMgr"),
  a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends s.default {
  constructor() {
    super(...arguments);
    this.okBtn = null;
    this.titleLabel = null;
    this.label = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.closePanel, this);
  }
  setData(e, t) {
    this.titleLabel.string = n.I18nMgr.getI18nStringByZh(e);
    this.label.string = n.I18nMgr.getI18nStringByZh(t);
  }
};
i([l(a.default)], c.prototype, "okBtn", void 0);
i([l(cc.Label)], c.prototype, "titleLabel", void 0);
i([l(cc.Label)], c.prototype, "label", void 0);
c = i([r], c);
exports.default = c;