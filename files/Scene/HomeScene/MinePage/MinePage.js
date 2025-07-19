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
  r = e("../../../CustomUI/Button"),
  l = e("../../../CustomUI/ScrollList"),
  c = e("../../../CustomUI/ToggleGroup"),
  d = e("../../../Frame/CrossPlatform"),
  h = e("../../../Frame/SceneManager"),
  p = e("../../../Frame/Top"),
  u = e("../../../Frame/Util"),
  m = e("../../../Game/Player/Mng"),
  f = e("../../../Game/Player/ShopMng"),
  g = e("../../../Game/Player/TalkMng"),
  y = e("../../../Role"),
  v = e("./CreateTalkCell"),
  C = e("./MyTalkCell"),
  {
    ccclass: _,
    property: S
  } = cc._decorator;
let I = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.settingBtn = null;
    this.settingDotNode = null;
    this.toggleGroup = null;
    this.gameList = null;
    this.goodsList = null;
    this.talkList = null;
    this.idLabel = null;
  }
  onLoad() {
    this.settingBtn.node.on(r.default.CLICK, this.onClickSetting, this);
    this.idLabel.string = "ID:" + y.default.Ins.role.id;
    this.toggleGroup.node.on(c.default.TOGGLE_CHANGE, this.onToggleChange, this);
    cc.game.on("MyGameChange", this.refreshList, this);
    cc.game.on("MyGoodsChange", this.refreshList, this);
    cc.game.on("GameStatusChange", this.refreshList, this);
    cc.game.on("GoodsStatusChange", this.refreshList, this);
    cc.game.on(g.default.Talk_StatusChange, this.refreshList, this);
    cc.game.on(i.MinePage_Refresh, this.refreshList, this);
    cc.game.on(g.default.Talk_Refresh, this.refreshList, this);
    cc.game.on("refreshPasswordDot", this.refreshDot, this);
    this.gameList.getPrefabName = e => {
      if (e.id) return "MyGameCell";
      if (e) {
        if ("create" == e.type) return "CreateGameCell";
        if ("lock" == e.type) return "LockGameCell";
      }
    };
    this.goodsList.getPrefabName = e => {
      if (e.id) return "MyGoodsCell";
      if (e) {
        if ("create" == e.type) return "CreateGoodsCell";
        if ("lock" == e.type) return "LockGoodsCell";
      }
    };
    this.talkList.getPrefabName = e => "create" == e.type ? "CreateTalkCell" : "MyTalkCell";
    let e = this.talkList.getComponentInChildren(v.default),
      t = this.talkList.getComponentInChildren(C.default);
    t.node.active = !0;
    this.talkList.calculateSizeFunc = o => "create" == o.type ? {
      w: 700,
      h: e.node.height
    } : {
      w: 700,
      h: t.calcuHeight(o)
    };
  }
  onEnable() {
    return a(this, void 0, void 0, function* () {
      u.Util.updateAllWidget(this.node);
      this.refreshList();
      this.refreshDot();
    });
  }
  onDestroy() {
    cc.game.off("MyGameChange", this.refreshList, this);
    cc.game.off("MyGoodsChange", this.refreshList, this);
    cc.game.off("GameStatusChange", this.refreshList, this);
    cc.game.off("GoodsStatusChange", this.refreshList, this);
    cc.game.off(g.default.Talk_StatusChange, this.refreshList, this);
    cc.game.off(i.MinePage_Refresh, this.refreshList, this);
    cc.game.off("refreshPasswordDot", this.refreshDot, this);
  }
  onToggleChange(e, t, o) {
    if (o) {
      C.default.calcuHeightCache.clear();
      this.refreshList();
    }
  }
  refreshList() {
    return a(this, void 0, void 0, function* () {
      let e = this.toggleGroup.idx;
      this.gameList.node.active = !1;
      this.goodsList.node.active = !1;
      this.talkList.node.active = !1;
      switch (e) {
        case 0:
          {
            p.default.showLoading("加载中");
            let e = [];
            if ((e = yield m.Mng.Ins.gameMng.loadAll()).length < y.default.Ins.role.myGameMaxCnt) e.push({
              type: "create"
            });else {
              let t = y.default.Ins.gameSlotUnlockLvls[y.default.Ins.role.myGameMaxCnt];
              e.push({
                type: "lock",
                str: s.I18nMgr.exceI18nStringByZh("等级${lvl}解锁新栏位", [{
                  paramName: "lvl",
                  param: t
                }])
              });
            }
            p.default.hideLoading();
            this.gameList.node.active = !0;
            this.gameList.setDataArr(e);
            cc.game.emit(i.GAME_LIST_LOADED);
            break;
          }
        case 1:
          {
            p.default.showLoading("加载中");
            this.goodsList.node.active = !0;
            let e = [];
            e = yield f.default.Ins.loadMyGoodsInfos();
            p.default.hideLoading();
            if (e.length < y.default.Ins.role.myGoodsMaxCnt) e.push({
              type: "create"
            });else {
              let t = y.default.Ins.goodsSlotUnlockLvls[y.default.Ins.role.myGoodsMaxCnt];
              e.push({
                type: "lock",
                str: s.I18nMgr.exceI18nStringByZh("等级${lvl}解锁新栏位", [{
                  paramName: "lvl",
                  param: t
                }])
              });
            }
            this.goodsList.setDataArr(e);
            break;
          }
        case 2:
          {
            this.talkList.node.active = !0;
            p.default.showLoading("加载中");
            let e = [];
            e.unshift({
              type: "create"
            });
            let t = yield g.default.Ins.loadTalksByUserId();
            e = e.concat(t);
            p.default.hideLoading();
            this.talkList.setDataArr(e);
            break;
          }
      }
    });
  }
  refreshDot() {
    let e = d.crossPlatform.getStorageSync("isSetPassword");
    this.settingDotNode.active = !e;
  }
  onClickSetting() {
    h.default.ins.OpenPanelByName("SettingPanel");
  }
};
I.GAME_LIST_LOADED = "GAME_LIST_LOADED";
I.MinePage_Refresh = "MinePage_Refresh";
n([S(r.default)], I.prototype, "settingBtn", void 0);
n([S(cc.Node)], I.prototype, "settingDotNode", void 0);
n([S(c.default)], I.prototype, "toggleGroup", void 0);
n([S(l.default)], I.prototype, "gameList", void 0);
n([S(l.default)], I.prototype, "goodsList", void 0);
n([S(l.default)], I.prototype, "talkList", void 0);
n([S(cc.Label)], I.prototype, "idLabel", void 0);
I = i = n([_], I);
exports.default = I;