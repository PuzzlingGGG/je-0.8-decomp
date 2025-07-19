"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/ScrollList"),
  a = e("../../../Frame/Util"),
  s = e("../GameCell"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameCell = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    let t = orange.TimeUtil.serverTime;
    a.Util.makeBro(this.gameCell.node, e.games.length, (o, i) => {
      let n = o.getComponent(s.default),
        a = e.games[i];
      if (a) {
        n.node.active = !0;
        n.setData(a, t);
      } else n.node.active = !1;
    });
  }
};
i([l(s.default)], c.prototype, "gameCell", void 0);
c = i([r], c);
exports.default = c;