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
const s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../../scripts/_autogen/data/data"),
  l = e("../../CustomUI/Button"),
  c = e("../../CustomUI/ScrollList"),
  d = e("../../Frame/Scene"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Top"),
  u = e("../../Frame/Util"),
  m = e("../../Game/OperationFlow"),
  f = e("../../Game/Player/CommentMng"),
  g = e("../../Game/Player/DynamicMng"),
  y = e("../../Game/Player/GameCoverMng"),
  v = e("../../Game/Player/Mng"),
  C = e("./CommentCell"),
  _ = e("./CommentMoreCell"),
  S = e("./GameCoverInfoCell"),
  I = e("./CommentHeadCell"),
  G = e("./GameTagFlow"),
  T = e("./GiftInfoCell"),
  b = e("../../Game/Player/GiftRankMng"),
  M = e("../../Game/PhyObj"),
  {
    ccclass: P,
    property: D
  } = cc._decorator;
let w = i = class extends d.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.scrollList = null;
    this.commmetBox = null;
    this.commentBtn = null;
    this.topBtn = null;
    this.blockInputBtn = null;
    this.gameId = "";
    this.detail = null;
    this.topCommentId = "";
    this.gameInfoData = null;
    this.aniTarget = null;
    this.backAnima = h.ShiftAnima.simpleShift;
  }
  reLoad() {
    y.default.Ins.deleteCache(this.gameId);
    this.setData(this.gameId);
  }
  onLoad() {
    super.onLoad();
    cc.game.on(i.GameCoverScene_ReLoad, this.reLoad, this);
    cc.game.on(i.GameCoverScene_Refresh, this.refreshList, this);
    this.node.on("showKeyBoard", () => {
      this.blockInputBtn.node.active = !0;
    }, this);
    this.node.on("showKeyBoardEnd", () => {
      this.blockInputBtn.node.active = !1;
    }, this);
    this.backBtn.node.on(l.default.CLICK, this.onBackBtn, this);
    this.blockInputBtn.node.on(l.default.CLICK, this.onBlockInputBtn, this);
    this.commentBtn.node.on(l.default.CLICK, this.onCommentBtn, this);
    this.topBtn.node.on(l.default.CLICK, this.onTopBtn, this);
    let e = u.Util.searchChild(this.scrollList.node, "GameCoverInfoCell").getComponent(S.default),
      t = u.Util.searchChild(this.scrollList.node, "CommentHeadCell").getComponent(I.default),
      o = u.Util.searchChild(this.scrollList.node, "CommentCell").getComponent(C.default),
      n = u.Util.searchChild(this.scrollList.node, "SubCommentCell").getComponent(C.default),
      a = u.Util.searchChild(this.scrollList.node, "CommentMoreCell").getComponent(_.default),
      c = u.Util.searchChild(this.scrollList.node, "GameTagFlow").getComponent(G.default),
      d = u.Util.searchChild(this.scrollList.node, "GiftInfoCell").getComponent(T.default);
    this.scrollList.getPrefabName = e => e instanceof s.Game_RGetGameDetail ? "GameCoverInfoCell" : e instanceof r.GameComment ? e.isSub ? "SubCommentCell" : "CommentCell" : e instanceof _.CommentMoreCellData ? "CommentMoreCell" : e instanceof I.CommentHeadCellData ? "CommentHeadCell" : e instanceof G.GameTagFlowData ? "GameTagFlow" : e instanceof T.GiftInfoData ? "GiftInfoCell" : void 0;
    this.scrollList.calculateSizeFunc = i => i instanceof s.Game_RGetGameDetail ? {
      w: 710,
      h: e.calcuHeight(i)
    } : i instanceof r.GameComment ? i.isSub ? {
      w: 710,
      h: n.calcuHeight(i)
    } : {
      w: 710,
      h: o.calcuHeight(i)
    } : i instanceof _.CommentMoreCellData ? {
      w: 710,
      h: a.node.height
    } : i instanceof I.CommentHeadCellData ? {
      w: 710,
      h: t.node.height
    } : i instanceof G.GameTagFlowData ? {
      w: 710,
      h: c.calcuHeight(i)
    } : i instanceof T.GiftInfoData ? {
      w: 710,
      h: d.node.height
    } : void 0;
    u.Util.updateAllWidget(this.node);
    this.updateCommentUI();
    this.blockInputBtn.node.active = !1;
    this.topBtn.node.active = !1;
  }
  onShow(e) {
    m.OperationFlow.deelOnShow(e);
    this.blockInputBtn.node.active = !1;
  }
  onDestroy() {
    cc.game.off(i.GameCoverScene_Refresh, this.refreshList, this);
  }
  onCommentBtn() {
    return a(this, void 0, void 0, function* () {
      let e = this.commmetBox.textLabel.string;
      "" != e ? yield this.sendComment(e) : p.default.showToast("不能发送空消息");
    });
  }
  onTopBtn() {
    this.scrollList.scrollToTop(.5);
  }
  onCommentEditBoxBegin() {
    return a(this, void 0, void 0, function* () {
      this.node.emit("showKeyBoard");
    });
  }
  onCommentEditBoxReturn() {
    return a(this, void 0, void 0, function* () {
      let e = this.commmetBox.textLabel.string;
      yield this.sendComment(e);
    });
  }
  updateCommentUI() {
    if (this.commmetBox.textLabel.string) {
      this.commentBtn.node.active = !0;
      this.commmetBox.node.width = 530;
    } else {
      this.commentBtn.node.active = !1;
      this.commmetBox.node.width = 730;
    }
  }
  sendComment(e) {
    return a(this, void 0, void 0, function* () {
      this.node.emit("showKeyBoardEnd");
      if ("" == e) return !1;
      if (yield f.CommentMng.Ins.sendComment(this.gameId, "", e)) {
        this.refreshList();
        this.commmetBox.string = "";
        this.scrollList.scrollToTop(.3);
        this.updateCommentUI();
      }
    });
  }
  onScrollEvt(e, t) {
    return a(this, void 0, void 0, function* () {
      let e = this.scrollList.getScrollOffset().y;
      this.topBtn.node.active = e > 600;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          yield f.CommentMng.Ins.loadGameComment(this.detail.releaseGameData.id);
          this.refreshList();
      }
    });
  }
  setData(e, t = null) {
    return a(this, void 0, void 0, function* () {
      this.gameId = e;
      this.topCommentId = t;
      let o = yield y.default.Ins.load(e);
      if (this.node) {
        this.detail = o;
        if (o) {
          f.CommentMng.Ins.init(o.gameTopComment);
          if (t) {
            let e = yield f.CommentMng.Ins.loadFirstLevelCommentById(t);
            if (e && e.comments.length > 0) {
              let o = e.comments.findIndex(e => e.id == t);
              if (o >= 0) {
                let t = e.comments[o];
                e.comments.splice(o, 1);
                e.comments.unshift(t);
                e.openCnt = 1;
              }
            }
            this.refreshList();
          } else this.refreshList();
        }
        cc.game.emit(i.GameCoverScene_Enterd, this);
      }
    });
  }
  onBlockInputBtn() {
    u.Util.hideKeyBoard();
    this.blockInputBtn.node.active = !1;
  }
  onBackBtn() {
    v.Mng.switchMine();
    h.default.ins.Back(null, this.backAnima);
  }
  refreshList() {
    let e = [];
    e.push(this.detail);
    let t = new G.GameTagFlowData();
    t.roleId = this.detail.authorMsg.id;
    t.gameId = this.gameId;
    t.tagList = this.detail.releaseGameData.tagList;
    e.push(t);
    this.gameInfoData = new T.GiftInfoData(this.detail);
    e.push(this.gameInfoData);
    if (g.DynamicMng.Ins.isDisable(g.FunctionEnum.GameComment, !1)) {
      this.scrollList.setDataArr(e);
      return;
    }
    let o = new I.CommentHeadCellData();
    exports.cnt = this.detail.gameTopComment.commentsCntSum;
    e.push(o);
    let i = f.CommentMng.Ins.gameTopComment.comments.concat(),
      n = i.findIndex(e => {
        if (e.id == this.topCommentId) return !0;
        for (let t = 0; t < e.commentIds.length; t++) if (e.commentIds[t] == this.topCommentId) return !0;
        return !1;
      });
    if (n >= 0) {
      let e = i[n];
      i.splice(n, 1);
      i.unshift(e);
    }
    for (let t = 0; t < i.length; t++) {
      let o = i[t];
      exports.isSub = !1;
      e.push(o);
      for (let t = 0; t < o.openCnt; t++) {
        let i = o.comments[t];
        i.isSub = !0;
        e.push(i);
      }
      if (o.subCommentsCnt > 0) {
        let t = new _.CommentMoreCellData();
        t.comment = o;
        e.push(t);
      }
    }
    this.scrollList.setDataArr(e);
    this.playGiftAnimation();
  }
  playGiftAnimation() {
    return a(this, void 0, void 0, function* () {
      if (y.default.Ins.isAlreadyLoadThisGame(this.gameId) || 0 == this.gameInfoData.rankList.length) return;
      let e = new Map();
      this.gameInfoData.rankList.forEach(t => {
        t.giftDatas.forEach(t => {
          let o = t.giftID + "",
            i = e.get(o) || 0;
          e.set(o, i + t.giftCount);
        });
      });
      const t = cc.winSize,
        o = t.width / 2,
        i = t.height / 2;
      let n = [];
      e.forEach((e, t) => {
        n.push(t);
      });
      u.Util.shuffle(n);
      for (let e = 0; e < n.length; e++) this.scheduleOnce(() => a(this, void 0, void 0, function* () {
        let t = n[e],
          a = new cc.Node();
        this.node.addChild(a);
        let s = a.addComponent(cc.Sprite);
        b.GiftRankMng.Ins.loadSF(t).then(e => {
          s.spriteFrame = e;
        });
        let r = 128 * (1 + Math.random());
        a.setContentSize(r, r);
        const l = r / 2;
        let c = [cc.v2(-1 * o - l, i - 615), cc.v2(o + l, i - 615)][e % 2],
          d = Math.random();
        c.y += 307.5 * d;
        a.setPosition(c);
        let h = a.addComponent(M.default);
        h.g = 2500;
        h.fly(u.Util.randomInt(500, 700) * (a.x < 0 ? 1 : -1), u.Util.randomInt(900, 1300), u.Util.randomInt(-360, 360));
        let p = cc.tween;
        p(a).parallel(p().to(1, {
          scale: .5
        }), p().delay(.6).to(.4, {
          opacity: 0
        })).call(() => {
          a.destroy();
        }).start();
      }), .1 * e);
    });
  }
};
w.GameCoverScene_Enterd = "GameCoverScene_Enterd";
w.GameCoverScene_GamePackLoaded = "GameCoverScene_GamePackLoaded";
w.GameCoverScene_Refresh = "GameCoverScene_RefreshComment";
w.GameCoverScene_ReLoad = "GameCoverScene_ReLoad";
w.PLAY_END = "PLAY_END";
n([D(l.default)], w.prototype, "backBtn", void 0);
n([D(c.default)], w.prototype, "scrollList", void 0);
n([D(cc.EditBox)], w.prototype, "commmetBox", void 0);
n([D(l.default)], w.prototype, "commentBtn", void 0);
n([D(l.default)], w.prototype, "topBtn", void 0);
n([D(l.default)], w.prototype, "blockInputBtn", void 0);
n([D(cc.Node)], w.prototype, "aniTarget", void 0);
w = i = n([P], w);
exports.default = w;