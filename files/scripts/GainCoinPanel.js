"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../BaseGainPanel/BaseGainPanel"),
  a = e("../../Game/OperationFlow"),
  s = e("../../CustomUI/CoinBar"),
  r = e("../../Game/Player/CoinMng"),
  {
    ccclass: l,
    menu: c,
    property: d
  } = cc._decorator;
let h = class extends n.default {
  constructor() {
    super(...arguments);
    this.cnt = 0;
    this.cntLabel = null;
  }
  onLoad() {
    super.onLoad();
  }
  setData(e, t = "恭喜获得", o = "", i = null) {
    this.cnt = e;
    this.gainCallback = i;
    this.titleLabel.string = t;
    this.subTitleLabel.string = o;
    this.cntLabel.string = e;
  }
  onGainBtnTap() {
    let e = null;
    s.default.Ins && (e = s.default.Ins.icon.node);
    e ? a.OperationFlow.flyCoin({
      cnt: this.cnt,
      fromNode: this.node,
      toNode: e,
      onArrive: e => {
        r.default.Ins.coinArrive(e);
      }
    }) : r.default.Ins.coinArrive(this.cnt);
    super.onGainBtnTap();
  }
};
i([d(cc.Label)], h.prototype, "cntLabel", void 0);
h = i([l, c("面板/RewardPanel")], h);
exports.default = h;