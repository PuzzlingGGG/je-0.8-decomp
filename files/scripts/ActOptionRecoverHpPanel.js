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
  s = e("../../Frame/Util"),
  r = e("../../Scene/EditWorldScene/Inspector/NumberEditBoxItem"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends a.default {
  constructor() {
    super(...arguments);
    this.editBox = null;
    this.okBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.onOkBtn, this);
  }
  setData(e) {
    this.evt = s.Util.deepCopy(e);
    this.evt.extra || (this.evt.extra = {
      cnt: 1
    });
    this.editBox.setData("数值:", this.evt.extra.cnt, e => {
      this.evt.extra.cnt = Number.parseInt(e);
    });
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call(this.evt);
  }
};
i([c(r.default)], d.prototype, "editBox", void 0);
i([c(n.default)], d.prototype, "okBtn", void 0);
d = i([l], d);
exports.default = d;