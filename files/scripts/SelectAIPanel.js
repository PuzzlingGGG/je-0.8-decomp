"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Util"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = i = class extends s.default {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.selectCall = null;
  }
  openAnim(e) {
    super.openAnim(() => {
      e && e();
      cc.game.emit(i.SelectAIPanel_Opend, this);
    });
  }
  setData(e, t) {
    r.Util.makeBro(this.btn.node, e.length, (t, o) => {
      let n = t.getComponent(a.default),
        s = e[o];
      n.label.string = s.str;
      n.node.on(a.default.CLICK, () => {
        this.closePanel();
        this.selectCall && this.selectCall(s);
        cc.game.emit(i.SelectAIPanel_Close, this);
      });
    });
  }
};
d.SelectAIPanel_Opend = "SelectAIPanel_Opend";
d.SelectAIPanel_Close = "SelectAIPanel_Close";
n([c(a.default)], d.prototype, "btn", void 0);
d = i = n([l], d);
exports.default = d;