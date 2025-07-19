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
  s = e("../../Frame/UIColor"),
  r = e("../../Frame/Util"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends a.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.tipLabel = null;
    this.starBtn = null;
    this.okBtn = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.onOkBtn, this);
    let e = this.starBtn.node.parent,
      t = ["额...", "还行", "平均水平", "好玩", "精品！"];
    this.okBtn.node.active = !1;
    r.Util.makeBro(this.starBtn.node, t.length, (o, i) => {
      o.on(n.default.CLICK, () => {
        for (let o = 0; o < t.length; o++) e.children[o].color = o <= i ? s.UIColor.yellow : s.UIColor.gray;
        this.tipLabel.string = t[i];
        this.okBtn.node.active = !0;
      });
    });
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call();
  }
};
i([c(cc.Label)], d.prototype, "titleLabel", void 0);
i([c(cc.Label)], d.prototype, "tipLabel", void 0);
i([c(n.default)], d.prototype, "starBtn", void 0);
i([c(n.default)], d.prototype, "okBtn", void 0);
d = i([l], d);
exports.default = d;