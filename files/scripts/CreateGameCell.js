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
const a = e("../../../../i18n/i18nMgr"),
  s = e("../../../CustomUI/Button"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/Top"),
  c = e("../../../Game/Hortor"),
  d = e("../../../Game/OperationFlow"),
  h = e("../../../Game/Player/CreditMng"),
  p = e("../../../Game/Player/DynamicMng"),
  u = e("../../../Game/Player/GuideMng"),
  m = e("../../../Game/Player/Mng"),
  f = e("../../../Role"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends cc.Component {
  onLoad() {
    this.node.on(s.default.CLICK, this.onClick, this);
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      if (!u.default.Ins.isComplete(u.GuideId.Intro)) {
        l.default.showToast("暂未解锁，先去体验别人的游戏吧！");
        return;
      }
      if (p.DynamicMng.Ins.isDisable(p.FunctionEnum.PublishGame, !0)) return;
      if (c.Hortor.isVisitor()) {
        d.OperationFlow.openVisitorPanel();
        return;
      }
      if (h.CreditMng.Ins.credit <= 2) {
        l.default.showToast("近期违规，不能创造或编辑");
        return;
      }
      let e,
        t = yield m.Mng.Ins.gameMng.loadAll(),
        o = 1;
      do {
        e = a.I18nMgr.getI18nStringByZh("我的游戏") + o;
        o++;
      } while (t.findIndex(t => t.name == e) >= 0);
      if (t.length < f.default.Ins.role.myGameMaxCnt) r.default.ins.OpenPanelByName("CreateGamePanel", t => {
        t.setData(e, null);
      });else {
        let e = f.default.Ins.gameSlotUnlockLvls[f.default.Ins.role.myGameMaxCnt];
        l.default.showToast(a.I18nMgr.exceI18nStringByZh("等级${lvl}解锁新栏位", [{
          paramName: "lvl",
          param: e
        }]));
      }
    });
  }
};
v = i([g], v);
exports.default = v;