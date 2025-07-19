"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../BaseGainPanel/BaseGainPanel"),
  {
    ccclass: a,
    menu: s,
    property: r
  } = cc._decorator;
let l = class extends n.default {
  constructor() {
    super(...arguments);
    this.cnt = 0;
    this.cntLabel = null;
  }
  onLoad() {
    super.onLoad();
  }
  setData(e, t = "恭喜获得", o = null) {
    this.cnt = e;
    this.gainCallback = o;
    this.titleLabel.string = t;
    this.cntLabel.string = e;
  }
};
i([r(cc.Label)], l.prototype, "cntLabel", void 0);
l = i([a, s("面板/RewardPanel")], l);
exports.default = l;