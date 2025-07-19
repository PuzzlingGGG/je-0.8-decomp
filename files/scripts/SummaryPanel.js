"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/CoinBar"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../Frame/Panel"),
  d = e("../../Game/Player/Mng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends c.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.okBtn = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(s.default.CLICK, this.onOkBtn, this);
    this.list.getPrefabName = e => e instanceof a.SaleSummary ? "SummaryCell" : "SummaryTitleCell";
  }
  onEnable() {
    r.default.Ins.show(50);
  }
  onDisable() {
    r.default.Ins.hide();
  }
  setData(e, t, o, i) {
    return n(this, void 0, void 0, function* () {
      yield d.Mng.Ins.gameMng.loadAll();
      let n = [];
      if (e.length) {
        n.push({
          title: "售卖素材："
        });
        n = n.concat(e);
      }
      if (t.length) {
        n.push({
          title: "游戏内购："
        });
        n = n.concat(t);
      }
      if (o.length) {
        n.push({
          title: "玩家复活："
        });
        n = n.concat(o);
      }
      if (i.length) {
        n.push({
          title: "激励广告："
        });
        n = n.concat(i);
      }
      this.list.setDataArr(n);
    });
  }
  onOkBtn() {
    this.closePanel();
  }
};
i([p(l.default)], u.prototype, "list", void 0);
i([p(s.default)], u.prototype, "okBtn", void 0);
u = i([h], u);
exports.default = u;