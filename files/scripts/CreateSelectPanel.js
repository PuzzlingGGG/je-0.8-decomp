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
const a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Game/Hortor"),
  d = e("../../Game/OperationFlow"),
  h = e("../../Game/Player/CreditMng"),
  p = e("../../Game/Player/DynamicMng"),
  u = e("../../Game/Player/GuideMng"),
  m = e("../../Game/Player/Mng"),
  f = e("../../Role"),
  g = e("../../TGA"),
  y = e("../../../i18n/i18nMgr"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = class extends s.default {
  constructor() {
    super(...arguments);
    this.closeBg = null;
    this.gameBtn = null;
    this.assetBtn = null;
    this.discussBtn = null;
  }
  onLoad() {
    super.onLoad();
    this.closeBg.on(a.default.CLICK, this.closePanel, this);
    this.gameBtn.node.on(a.default.CLICK, this.onTapGame, this);
    this.assetBtn.node.on(a.default.CLICK, this.onTapAsset, this);
  }
  onTapGame() {
    return n(this, void 0, void 0, function* () {
      g.TGA.track("click", {
        btn: "CreateBtn"
      });
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
        e = y.I18nMgr.getI18nStringByZh("我的游戏") + o;
        o++;
      } while (t.findIndex(t => t.name == e) >= 0);
      if (t.length < f.default.Ins.role.myGameMaxCnt) r.default.ins.OpenPanelByName("CreateGamePanel", t => {
        t.setData(e, null);
      });else {
        let e = f.default.Ins.gameSlotUnlockLvls[f.default.Ins.role.myGameMaxCnt];
        l.default.showToast(y.I18nMgr.exceI18nStringByZh("等级${lvl}解锁新栏位", [{
          paramName: "lvl",
          param: e
        }]));
      }
    });
  }
  onTapAsset() {
    c.Hortor.isVisitor() ? d.OperationFlow.openVisitorPanel() : h.CreditMng.Ins.credit <= 2 ? l.default.showToast("近期违规，不能创造或编辑") : r.default.ins.OpenPanelByName("AssetCategoryPanel", () => {});
  }
};
i([C(cc.Node)], _.prototype, "closeBg", void 0);
i([C(a.default)], _.prototype, "gameBtn", void 0);
i([C(a.default)], _.prototype, "assetBtn", void 0);
i([C(a.default)], _.prototype, "discussBtn", void 0);
_ = i([v], _);
exports.default = _;