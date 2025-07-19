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
const a = e("../../../i18n/i18nMgr"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/HeadIcon"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../CustomUI/ToggleGroup"),
  d = e("../../Frame/Scene"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Top"),
  u = e("../../Frame/UIColor"),
  m = e("../../Frame/Util"),
  f = e("../../Game/OperationFlow"),
  g = e("../../Game/Player/DynamicMng"),
  y = e("../../Game/Player/FollowMng"),
  v = e("../../Game/Player/PlayerDetailMng"),
  C = e("../../Game/Player/ShopMng"),
  _ = e("../../Game/Player/TalkMng"),
  S = e("../../Role"),
  I = e("../../TGA"),
  G = e("../HomeScene/TalkPage/TalkCell"),
  {
    ccclass: T,
    property: b
  } = cc._decorator;
let M = class extends d.default {
  constructor() {
    super(...arguments);
    this.idLabel = null;
    this.nameLabel = null;
    this.introLabel = null;
    this.headIcon = null;
    this.followBtn = null;
    this.fansBtn = null;
    this.menuBtn = null;
    this.followHeBtn = null;
    this.toggleGroup = null;
    this.gameList = null;
    this.goodsList = null;
    this.talksList = null;
    this.emptyLabel = null;
    this.backBtn = null;
    this.detail = null;
    this.playerId = 0;
    this.followChangeCall = null;
  }
  onLoad() {
    super.onLoad();
    cc.game.on(_.default.Talk_Refresh, this.refreshList, this);
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    this.menuBtn.node.on(s.default.CLICK, this.onMenuBtn, this);
    this.followHeBtn.node.on(s.default.CLICK, this.onFollowBtn, this);
    this.toggleGroup.node.on(c.default.TOGGLE_CHANGE, this.refreshList, this);
    this.headIcon.node.on(s.default.CLICK, this.onHeadIcon, this);
    this.fansBtn.node.on(s.default.CLICK, this.onShowFansBtn, this);
    this.followBtn.node.on(s.default.CLICK, this.onShowFollowsBtn, this);
  }
  onShow(e) {
    f.OperationFlow.deelOnShow(e);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      if (g.DynamicMng.Ins.isDisable(g.FunctionEnum.FriendScene, !0)) return;
      this.playerId = e;
      this.idLabel.string = "ID:" + e;
      let t = yield v.default.Ins.load(e);
      this.detail = t;
      this.nameLabel.string = m.Util.clampStr(t.userName, 12, "..");
      this.introLabel.string = t.userIntro || a.I18nMgr.getI18nStringByZh("这个人很懒，什么也没有留下");
      this.headIcon.loadUrl(t.userImg);
      this.headIcon.setLevel(t.level);
      this.followBtn.label.string = t.followCount + "";
      this.fansBtn.label.string = t.fansCount + "";
      this.followHeBtn.node.active = e != S.default.Ins.role.id;
      this.followHeBtn.label.string = t.isFollow ? "已关注" : "关注";
      this.refreshList();
    });
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      if (!this.detail) return;
      let e = this.toggleGroup.idx;
      this.talksList.node.active = !1;
      this.gameList.node.active = !1;
      this.goodsList.node.active = !1;
      switch (e) {
        case 0:
          this.gameList.node.active = !0;
          this.gameList.setDataArr(this.detail.gameDatas);
          this.emptyLabel.node.active = 0 == this.detail.gameDatas.length;
          this.emptyLabel.string = "暂无游戏";
          break;
        case 1:
          {
            this.goodsList.node.active = !0;
            let e = yield C.default.Ins.loadGoodsInfos(this.detail.goodsIds);
            this.goodsList.setDataArr(e);
            this.emptyLabel.node.active = 0 == e.length;
            this.emptyLabel.string = "暂无素材";
            break;
          }
        case 2:
          {
            this.talksList.node.active = !0;
            if (0 == this.talksList.prefabs.length) {
              p.default.showLoading("加载中");
              let e = yield m.Util.loadBundleRes("Scene/HomeScene/TalkCell"),
                t = cc.instantiate(e);
              this.talksList.node.addChild(t);
              t.x = -2e3;
              let o = t.getComponent(G.default);
              this.talksList.prefabs.push(t);
              this.talksList.calculateSizeFunc = e => ({
                w: 710,
                h: o.calcuHeight(e)
              });
              p.default.hideLoading();
            }
            let e = yield _.default.Ins.loadTalksByUserId(this.playerId);
            this.talksList.setDataArr(e);
            this.emptyLabel.node.active = 0 == e.length;
            this.emptyLabel.string = "暂无帖子";
            break;
          }
      }
    });
  }
  onFollowBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.detail.isFollow) {
        if (1 == (yield y.FollowMng.Ins.unFollow(this.detail.playerId))) {
          this.detail.isFollow = !1;
          this.followHeBtn.label.string = "关注";
          this.fansBtn.label.string = this.detail.fansCount.toString();
        }
      } else if (1 == (yield y.FollowMng.Ins.follow(this.detail.playerId))) {
        this.detail.isFollow = !0;
        this.followHeBtn.label.string = "已关注";
        this.fansBtn.label.string = this.detail.fansCount.toString();
        I.TGA.track("follow", {
          target: this.detail.playerId
        });
      }
      this.followChangeCall && this.followChangeCall();
    });
  }
  onMenuBtn() {
    let e = [];
    S.default.Ins.role.id != this.playerId && e.push({
      str: "举报",
      icon: {
        url: "Atlas/UI/reportBtn",
        color: u.UIColor.white,
        w: 50,
        h: 40
      },
      call: () => {
        this.onReportBtn();
      }
    });
    g.DynamicMng.Ins.isGmPlayer() && e.push({
      str: "封号",
      color: u.UIColor.pink,
      icon: {
        url: "Atlas/UI/closeBtn",
        color: u.UIColor.green,
        w: 40,
        h: 40
      },
      call: () => {
        h.default.ins.OpenPanelByName("BanPlayerPanel", e => {
          e.setData(this.playerId);
        });
      }
    });
    p.default.showMenu(this.menuBtn.node, e);
  }
  onReportBtn() {
    h.default.ins.Enter("ReportScene", e => {
      e.initReportPlayer(this.playerId);
    }, h.ShiftAnima.moveLeftShift);
    I.TGA.track("reportPlayer", {
      target: this.playerId,
      name: this.nameLabel.string,
      step: "clickBtn"
    });
  }
  onBackBtn() {
    h.default.ins.Back(() => {}, h.ShiftAnima.moveRightShift);
  }
  onHeadIcon() {
    this.detail.userImg && h.default.ins.OpenPanelByName("ImagePreviewPanel", e => {
      e.setData(this.detail.userName, this.detail.userImg);
    });
  }
  onShowFansBtn() {
    h.default.ins.Enter("FollowScene", e => n(this, void 0, void 0, function* () {
      e.init("fans", this.playerId);
    }), h.ShiftAnima.moveLeftShift);
  }
  onShowFollowsBtn() {
    h.default.ins.Enter("FollowScene", e => n(this, void 0, void 0, function* () {
      e.init("follow", this.playerId);
    }), h.ShiftAnima.moveLeftShift);
  }
};
i([b(cc.Label)], M.prototype, "idLabel", void 0);
i([b(cc.Label)], M.prototype, "nameLabel", void 0);
i([b(cc.Label)], M.prototype, "introLabel", void 0);
i([b(r.default)], M.prototype, "headIcon", void 0);
i([b(s.default)], M.prototype, "followBtn", void 0);
i([b(s.default)], M.prototype, "fansBtn", void 0);
i([b(s.default)], M.prototype, "menuBtn", void 0);
i([b(s.default)], M.prototype, "followHeBtn", void 0);
i([b(c.default)], M.prototype, "toggleGroup", void 0);
i([b(l.default)], M.prototype, "gameList", void 0);
i([b(l.default)], M.prototype, "goodsList", void 0);
i([b(l.default)], M.prototype, "talksList", void 0);
i([b(cc.Label)], M.prototype, "emptyLabel", void 0);
i([b(s.default)], M.prototype, "backBtn", void 0);
M = i([T], M);
exports.default = M;