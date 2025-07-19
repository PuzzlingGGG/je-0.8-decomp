"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../../i18n/i18nMgr"),
  a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/Util"),
  c = e("../DiscoverPage"),
  d = e("../HomeScene"),
  h = e("../RankSubPage/GiftRankCell"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.moreBtn = null;
    this.cell = null;
    this.titleLabel = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.moreBtn.node.on(a.default.CLICK, this.onClick, this);
  }
  setData(e) {
    this.titleLabel.string = n.I18nMgr.getI18nStringByZh(e.name);
    let t = Math.min(e.ranks.length, 3);
    l.Util.makeBro(this.cell.node, t, (t, o) => {
      let i = e.ranks[o];
      t.getComponent(h.default).setData(i);
    });
  }
  onClick() {
    let e = r.default.ins.findScene(d.default);
    e && e.getComponentInChildren(c.default).selectPage(3);
  }
};
i([u(a.default)], m.prototype, "moreBtn", void 0);
i([u(h.default)], m.prototype, "cell", void 0);
i([u(cc.Label)], m.prototype, "titleLabel", void 0);
m = i([p], m);
exports.default = m;