"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../../../i18n/i18nMgr"),
  r = e("../../../../scripts/_autogen/data/data"),
  l = e("../../../CustomUI/Button"),
  c = e("../../../CustomUI/GameIcon"),
  d = e("../../../CustomUI/ScrollList"),
  h = e("../../../Frame/SceneManager"),
  p = e("../../../Frame/Top"),
  u = e("../../../Frame/UIColor"),
  m = e("../../../Frame/Util"),
  f = e("../../../Game/Player/CreditMng"),
  g = e("../../../Game/Player/DynamicMng"),
  y = e("../../../TGA"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label_name = null;
    this.label_playNum = null;
    this.label_thumbNum = null;
    this.label_collectNum = null;
    this.label_hurryNum = null;
    this.stateLabel = null;
    this.editBtn = null;
    this.detailBtn = null;
    this.gameIcon = null;
    this.publishBtn = null;
    this.parentGameBtn = null;
    this.gameData = null;
  }
  onLoad() {
    this.publishBtn.node.on(l.default.CLICK, this.onPublishBtn, this);
    this.node.on(l.default.CLICK, this.onClickCell, this);
    this.node.on(d.default.SET_DATA, this.setData, this);
    this.editBtn.node.on(l.default.CLICK, this.onClickEdit, this);
    this.detailBtn.node.on(l.default.CLICK, this.onClickDetail, this);
    this.parentGameBtn.node.on(l.default.CLICK, this.onParentBtn, this);
    this.stateLabel.node.on(l.default.CLICK, this.onStateBtn, this);
  }
  setData(e) {
    return a(this, void 0, void 0, function* () {
      this.gameData = e;
      this.label_name.string = m.Util.clampStr(e.name, 6, "..");
      this.label_playNum.string = "" + (e.playCnt || 0);
      this.label_thumbNum.string = "" + (e.thumbCnt || 0);
      this.label_collectNum.string = "" + (e.collectionCnt || 0);
      this.label_hurryNum.string = "" + (e.hurryCnt || 0);
      this.parentGameBtn.node.active = !1;
      this.detailBtn.node.active = !1;
      this.stateLabel.node.getComponent(l.default).interactable = !1;
      this.stateLabel.node.color = u.UIColor.gray;
      switch (e.status) {
        case r.GameStatus.noPublish:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("未发布");
          this.node.color = u.UIColor.lightOrange;
          this.publishBtn.node.active = !0;
          this.parentGameBtn.node.active = !!e.parnetGame;
          break;
        case r.GameStatus.inReview:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("审核中");
          this.stateLabel.node.color = u.UIColor.black;
          break;
        case r.GameStatus.success:
          this.detailBtn.node.active = !0;
          this.node.color = u.UIColor.white;
          this.publishBtn.node.active = !1;
          this.stateLabel.string = m.Util.parseDataString(e.lastPublishStamp);
          break;
        case r.GameStatus.fail:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("审核未通过");
          this.stateLabel.node.color = u.UIColor.red;
          this.stateLabel.node.getComponent(l.default).interactable = !0;
          break;
        case r.GameStatus.off:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("已下架");
      }
      this.gameIcon.loadUrl(e.iconTextureName);
    });
  }
  onPublishBtn() {
    g.DynamicMng.Ins.isDisable(g.FunctionEnum.PublishGame, !0) || (this.gameData.worldIds.length <= 0 ? p.default.showToast("游戏至少包含一个地图") : h.default.ins.OpenPanelByName("PublishGamePanel", e => {
      e.setData(this.gameData);
    }));
  }
  onClickCell() {
    return a(this, void 0, void 0, function* () {
      g.DynamicMng.Ins.isDisable(g.FunctionEnum.PublishGame, !0) || (f.CreditMng.Ins.credit <= 2 ? p.default.showToast("近期违规，不能创造或编辑") : this.onClickEdit());
    });
  }
  onClickEdit() {
    return a(this, void 0, void 0, function* () {
      if (!g.DynamicMng.Ins.isDisable(g.FunctionEnum.PublishGame, !0)) if (f.CreditMng.Ins.credit <= 2) p.default.showToast("近期违规，不能创造或编辑");else if (!i.clickLock) {
        i.clickLock = !0;
        h.default.ins.Enter("EditGameScene", e => a(this, void 0, void 0, function* () {
          i.clickLock = !1;
          let t = this.gameData;
          e.setData(t);
        }));
      }
    });
  }
  onClickDetail() {
    return a(this, void 0, void 0, function* () {
      if (!this.gameData.isOff && !i.clickLock) {
        i.clickLock = !0;
        if (this.gameData && this.gameData.lastPublishStamp) {
          h.default.ins.Enter("GameCoverScene", e => {
            i.clickLock = !1;
            e.setData(this.gameData.id);
          });
          y.TGA.track("clickGameCell", {
            gameId: this.gameData.id,
            from: "MineGameCell"
          });
        } else i.clickLock = !1;
      }
    });
  }
  onParentBtn() {
    return a(this, void 0, void 0, function* () {
      h.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.gameData.parnetGame.id);
      }, h.ShiftAnima.moveLeftShift);
    });
  }
  onStateBtn() {
    return a(this, void 0, void 0, function* () {
      h.default.ins.OpenPanelByName("ReviewFailReasonPanel", e => {
        e.setData(this.gameData.offReason);
      });
    });
  }
};
_.clickLock = !1;
n([C(cc.Label)], _.prototype, "label_name", void 0);
n([C(cc.Label)], _.prototype, "label_playNum", void 0);
n([C(cc.Label)], _.prototype, "label_thumbNum", void 0);
n([C(cc.Label)], _.prototype, "label_collectNum", void 0);
n([C(cc.Label)], _.prototype, "label_hurryNum", void 0);
n([C(cc.Label)], _.prototype, "stateLabel", void 0);
n([C(l.default)], _.prototype, "editBtn", void 0);
n([C(l.default)], _.prototype, "detailBtn", void 0);
n([C(c.default)], _.prototype, "gameIcon", void 0);
n([C(l.default)], _.prototype, "publishBtn", void 0);
n([C(l.default)], _.prototype, "parentGameBtn", void 0);
_ = i = n([v], _);
exports.default = _;