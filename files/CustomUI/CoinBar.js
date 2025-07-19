"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../Frame/SceneManager"),
  s = e("../Game/Player/CoinMng"),
  r = e("./Button"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.label = null;
  }
  onLoad() {
    i.Ins = this;
    this.hide();
    this.node.on(r.default.CLICK, this.onClick, this);
    cc.game.on("refreshCoinBar", this.refresh, this);
  }
  onDestroy() {
    i.Ins = null;
    cc.game.off("refreshCoinBar", this.refresh, this);
  }
  onClick() {
    let e = this.node.getComponent(r.default);
    e.interactable = !1;
    a.default.ins.OpenPanelByName("LackCoinPanel", t => {
      t.closeCallback = () => {
        e.interactable = !0;
      };
    });
  }
  refresh() {
    this.label.string = s.default.Ins.getViewCoinCnt() + "";
  }
  show(e = 50, t = 68) {
    let o = this.node.getComponent(cc.Widget);
    exports.left = e;
    exports.top = t;
    o.updateAlignment();
    this.node.active = !0;
  }
  hide() {
    this.node.active = !1;
  }
};
d.Ins = null;
n([c(cc.Sprite)], d.prototype, "icon", void 0);
n([c(cc.Label)], d.prototype, "label", void 0);
d = i = n([l], d);
exports.default = d;