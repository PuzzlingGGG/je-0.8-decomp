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
  r = e("../../CustomUI/DropDownBox"),
  l = e("../../CustomUI/GameIcon"),
  c = e("../../CustomUI/ScrollList"),
  d = e("../../Frame/Scene"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/CreativeRankMng"),
  m = e("../../Game/Player/DynamicMng"),
  f = e("../../Game/Player/Mng"),
  g = e("../GameCoverScene/GameCoverScene"),
  y = e("../../Frame/Top"),
  v = e("../../Game/Player/GuideMng"),
  C = e("../../Role"),
  _ = e("../../Game/Hortor"),
  S = e("../../Game/OperationFlow"),
  I = e("../../../i18n/i18nMgr"),
  {
    ccclass: G,
    property: T
  } = cc._decorator;
let b = class extends d.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.gameIcon = null;
    this.gameNameLabel = null;
    this.followCntLabel = null;
    this.authorNameLabel = null;
    this.sortDropDown = null;
    this.scrollList = null;
    this.emptyNode = null;
    this.res = null;
    this.createBtn = null;
    this.previewBtn = null;
    this.detail = null;
    this.myGame = null;
    this.releaseGameData = null;
  }
  onLoad() {
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    this.createBtn.node.on(s.default.CLICK, this.onCreateBtn, this);
    this.previewBtn.node.on(s.default.CLICK, this.onPreviewBtn, this);
    this.scrollList.node.on(c.default.SELECT_ITEM, this.onSelectCell, this);
    this.sortDropDown.node.on(r.default.SELECT_CHANGE, this.onSortChange, this);
  }
  onBackBtn() {
    h.default.ins.Back(null, h.ShiftAnima.moveRightShift);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.detail = e;
      let t = e.creativeGameData;
      this.gameNameLabel.string = t.name;
      this.gameIcon.loadUrl(t.iconTextureName);
      this.authorNameLabel.string = `creator：${e.authorMsg.userName}`;
      this.followCntLabel.string = `${Math.max(t.secondaryCnt, 0)}${I.I18nMgr.getI18nStringByZh("人二次创作")}`;
      this.sortDropDown.setDataArr([{
        str: "综合",
        sort: a.CreativeGameSortType.comprehensive
      }, {
        str: "最新",
        sort: a.CreativeGameSortType.creativeGameUpStampDesc
      }]);
    });
  }
  onSortChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      let e = this.detail.creativeGameData,
        o = u.default.Ins.get(e.id, t.sort);
      o.length <= 0 && (o = yield u.default.Ins.appendLoad(e.id, t.sort));
      this.scrollList.setDataArr(o);
      this.emptyNode.active = 0 == o.length;
      this.scrollList.selectByIdx(0);
    });
  }
  onSelectCell(e, t) {
    this.setupCreate(t);
  }
  setupCreate(e) {
    this.releaseGameData = e;
    let t = e.openData.creativeResList || [];
    this.previewBtn.label.string = `All assets \n(Total ${t.length})`;
    t = t.slice(0, 10);
    p.Util.makeBro(this.res, t.length, (e, o) => {
      let i = e.getComponentInChildren(cc.Sprite),
        n = t[o];
      f.Mng.Ins.spriteMng.setSprite(i, n.textureName, 64);
    });
  }
  onCreateBtn() {
    return n(this, void 0, void 0, function* () {
      if (!v.default.Ins.isComplete(v.GuideId.EditWorld)) {
        y.default.showToast("暂未解锁，需要完成基础教程");
        return;
      }
      if (m.DynamicMng.Ins.isDisable(m.FunctionEnum.PublishGame, !0)) return;
      if (_.Hortor.isVisitor()) {
        S.OperationFlow.openVisitorPanel();
        return;
      }
      if ((yield f.Mng.Ins.gameMng.loadAll()).length > C.default.Ins.role.myGameMaxCnt) {
        y.default.showToast("游戏数量达到上限");
        return;
      }
      let e = this.releaseGameData;
      e && h.default.ins.OpenPanelByName("CreateGamePanel", t => n(this, void 0, void 0, function* () {
        t.setData("Modified " + e.name, {
          id: e.id,
          packUrl: e.gameDataCdnUrl,
          worldIds: e.openData.openWorldIds
        });
      }));
    });
  }
  onMyEditBtn() {
    this.myGame && h.default.ins.Enter("EditGameScene", e => n(this, void 0, void 0, function* () {
      e.setData(this.myGame);
    }));
  }
  onMyDetailBtn() {
    h.default.ins.Back(e => {
      e instanceof g.default && e.setData(this.myGame.id);
    });
  }
  onPreviewBtn() {
    let e = this.releaseGameData.openData.creativeResList || [];
    h.default.ins.OpenPanelByName("AssetPreviewPanel", t => {
      t.setData(e);
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          let e = this.sortDropDown.getCurData().sort,
            o = yield u.default.Ins.appendLoad(this.detail.creativeGameData.id, e);
          this.scrollList.setDataArr(o);
          this.emptyNode.active = 0 == o.length;
      }
    });
  }
};
i([T(s.default)], b.prototype, "backBtn", void 0);
i([T(l.default)], b.prototype, "gameIcon", void 0);
i([T(cc.Label)], b.prototype, "gameNameLabel", void 0);
i([T(cc.Label)], b.prototype, "followCntLabel", void 0);
i([T(cc.Label)], b.prototype, "authorNameLabel", void 0);
i([T(r.default)], b.prototype, "sortDropDown", void 0);
i([T(c.default)], b.prototype, "scrollList", void 0);
i([T(cc.Node)], b.prototype, "emptyNode", void 0);
i([T(cc.Node)], b.prototype, "res", void 0);
i([T(s.default)], b.prototype, "createBtn", void 0);
i([T(s.default)], b.prototype, "previewBtn", void 0);
b = i([G], b);
exports.default = b;