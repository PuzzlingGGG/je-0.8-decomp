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
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/DynamicMng"),
  u = e("../../Game/Player/Mng"),
  m = e("../../Game/Player/PlayerDetailMng"),
  f = e("../../Game/Player/TalkMng"),
  g = e("../HomeScene/TalkPage/TalkCommentCell"),
  y = e("../HomeScene/TalkPage/TalkCommentMng"),
  v = e("../HomeScene/TalkPage/TalkCommentMoreCell"),
  C = e("../HomeScene/TalkPage/TalkSectionGame"),
  _ = e("../HomeScene/TalkPage/TalkSectionGoods"),
  S = e("../HomeScene/TalkPage/TalkSectionHead"),
  I = e("../HomeScene/TalkPage/TalkSectionImgs"),
  G = e("../HomeScene/TalkPage/TalkSectionProject"),
  T = e("../HomeScene/TalkPage/TalkSectionText"),
  b = e("../HomeScene/TalkPage/TalkStateBar"),
  {
    ccclass: M,
    property: P
  } = cc._decorator;
let D = class extends l.default {
  constructor() {
    super(...arguments);
    this.sectionPrefabs = [];
    this.backBtn = null;
    this.scrollList = null;
    this.blockInputBtn = null;
    this.menuBtn = null;
    this.commmetBox = null;
    this.commentBtn = null;
    this.titleLabel = null;
    this.data = null;
    this.player = null;
    this.loading = !1;
  }
  onLoad() {
    cc.game.on(f.default.Talk_Del, this.onBackBtn, this);
    cc.game.on(f.default.Talk_Refresh, () => {
      this.setData(this.data.uId);
    }, this);
    this.node.on("showKeyBoard", () => {
      this.blockInputBtn.node.active = !0;
    }, this);
    this.node.on("showKeyBoardEnd", () => {
      this.blockInputBtn.node.active = !1;
    }, this);
    this.blockInputBtn.node.on(s.default.CLICK, this.onBlockInputBtn, this);
    this.commentBtn.node.on(s.default.CLICK, this.onCommentBtn, this);
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    for (let e = 0; e < this.sectionPrefabs.length; e++) {
      let t = this.sectionPrefabs[e],
        o = cc.instantiate(t);
      exports.x = -2e3;
      this.scrollList.node.addChild(o);
      this.scrollList.prefabs.push(o);
    }
    let e = this.scrollList.node.getComponentInChildren(S.default),
      t = this.scrollList.node.getComponentInChildren(T.default),
      o = this.scrollList.node.getComponentInChildren(I.default),
      i = this.scrollList.node.getComponentInChildren(C.default),
      n = this.scrollList.node.getComponentInChildren(_.default),
      r = this.scrollList.node.getComponentInChildren(G.default),
      l = this.scrollList.node.getComponentInChildren(b.default),
      c = h.Util.searchChild(this.scrollList.node, "TalkCommentCell").getComponent(g.default),
      d = h.Util.searchChild(this.scrollList.node, "SubTalkCommentCell").getComponent(g.default),
      p = this.scrollList.node.getComponentInChildren(v.default);
    this.updateCommentUI();
    this.blockInputBtn.node.active = !1;
    this.titleLabel.node.active = !1;
    this.scrollList.getPrefabName = e => {
      if (e instanceof a.TalkComment) return e.isSub ? "SubTalkCommentCell" : "TalkCommentCell";
      if (e instanceof v.TalkCommentMoreCellData) return "TalkCommentMoreCell";
      switch (e.type) {
        case "TalkStateBar":
          return "TalkStateBar";
        case "TalkSectionHead":
          return "TalkSectionHead";
        case f.TalkSectionType.Text:
          return "TalkSectionText";
        case f.TalkSectionType.Imgs:
          return "TalkSectionImgs";
        case f.TalkSectionType.Game:
          return "TalkSectionGame";
        case f.TalkSectionType.Goods:
          return "TalkSectionGoods";
        case f.TalkSectionType.Project:
          return "TalkSectionProject";
      }
    };
    this.scrollList.calculateSizeFunc = s => {
      let h = 0;
      if (s instanceof a.TalkComment) return s.isSub ? {
        w: 710,
        h: d.calcuHeight(s)
      } : {
        w: 710,
        h: c.calcuHeight(s)
      };
      if (s instanceof v.TalkCommentMoreCellData) return {
        w: 710,
        h: p.node.height
      };
      switch (s.type) {
        case "TalkStateBar":
          h = l.node.height;
          break;
        case "TalkSectionHead":
          h = e.node.height;
          break;
        case f.TalkSectionType.Text:
          t.node.active = !0;
          h = t.calcuH(s);
          break;
        case f.TalkSectionType.Imgs:
          o.node.active = !0;
          h = o.calcuH(s);
          break;
        case f.TalkSectionType.Game:
          i.node.active = !0;
          h = i.calcuH(s);
          break;
        case f.TalkSectionType.Goods:
          n.node.active = !0;
          h = n.calcuH(s);
          break;
        case f.TalkSectionType.Project:
          r.node.active = !0;
          h = r.calcuH(s);
      }
      return {
        w: 750,
        h: h
      };
    };
    h.Util.updateAllWidget(this.node);
    this.menuBtn.node.on(s.default.CLICK, () => {
      f.default.Ins.onMenuBtn(this.data, this.menuBtn);
    }, this);
  }
  onDestroy() {
    cc.game.off(f.default.Talk_Del, this.onBackBtn, this);
    cc.game.off(f.default.Talk_Refresh, this.refreshList, this);
  }
  setData(e, t = null) {
    return n(this, void 0, void 0, function* () {
      d.default.showLoading("加载中");
      this.data = yield f.default.Ins.loadTalkDetail(e);
      y.TalkCommentMng.Ins.init(this.data);
      this.player = yield m.default.Ins.load(this.data.playerId);
      d.default.hideLoading();
      if (t) {
        let e = yield y.TalkCommentMng.Ins.loadFirstLevelCommentById(t);
        if (e && e.comments.length > 0) {
          let o = e.comments.findIndex(e => e.id == t);
          if (o >= 0) {
            let t = e.comments[o];
            e.comments.splice(o, 1);
            e.comments.unshift(t);
            e.openCnt = 1;
          }
          this.refreshList();
        } else this.refreshList();
      } else this.refreshList();
    });
  }
  onBackBtn() {
    u.Mng.switchMine();
    c.default.ins.Back(null, c.ShiftAnima.moveRightShift);
  }
  onBlockInputBtn() {
    h.Util.hideKeyBoard();
    this.blockInputBtn.node.active = !1;
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = this.data,
        t = e.content,
        o = [],
        i = {
          type: "TalkSectionHead",
          player: this.player,
          playerId: e.playerId,
          userLevel: e.userLevel,
          userImg: e.userImg,
          userName: e.userName,
          userIntro: e.userIntro,
          talkData: e
        };
      o.push(i);
      let n = {
        type: f.TalkSectionType.Text,
        text: e.title,
        isTitle: !0
      };
      o.push(n);
      if (t && t.sections) {
        for (let o = 0; o < t.sections.length; o++) {
          let i = t.sections[o];
          i.talkId = e.uId;
          if (i.type == f.TalkSectionType.Project) {
            let e = yield u.Mng.Ins.gameMng.loadOne(i.gameId);
            e && (yield u.Mng.Ins.worldMng.loadMany(e.worldIds));
          }
        }
        o = o.concat(t.sections);
      }
      let a = {
        type: "TalkStateBar",
        talkData: this.data
      };
      o.push(a);
      if (!p.DynamicMng.Ins.isDisable(p.FunctionEnum.TalkComment, !1)) for (let t = 0; t < e.comments.length; t++) {
        let i = e.comments[t];
        i.isSub = !1;
        o.push(i);
        for (let e = 0; e < i.openCnt; e++) {
          let t = i.comments[e];
          t.isSub = !0;
          o.push(t);
        }
        if (i.subCommentsCnt > 0) {
          let e = new v.TalkCommentMoreCellData();
          e.comment = i;
          o.push(e);
        }
      }
      this.scrollList.setDataArr(o);
    });
  }
  onCommentBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.commmetBox.textLabel.string;
      "" != e ? yield this.sendComment(e) : d.default.showToast("不能发送空消息");
    });
  }
  onCommentEditBoxBegin() {
    return n(this, void 0, void 0, function* () {
      this.node.emit("showKeyBoard");
    });
  }
  onCommentEditBoxReturn() {
    return n(this, void 0, void 0, function* () {
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
    return n(this, void 0, void 0, function* () {
      this.node.emit("showKeyBoardEnd");
      if ("" == e) return !1;
      let t = {
        msg: e
      };
      if (yield y.TalkCommentMng.Ins.sendComment(this.data.uId, "", t)) {
        yield this.refreshList();
        this.commmetBox.string = "";
        this.updateCommentUI();
        let e = this.scrollList.getDataArr().findIndex(e => e instanceof a.TalkComment);
        e >= 0 && this.scrollList.centerToIdx(e, .3);
      }
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      let o = e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          if (this.loading) return;
          this.loading = !0;
          yield y.TalkCommentMng.Ins.loadComment(this.data.uId);
          this.loading = !1;
          this.refreshList();
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (o < 100) this.titleLabel.node.active = !1;else {
            this.titleLabel.node.active = !0;
            let e = 255 * (o - 100) / 50;
            this.titleLabel.node.opacity = e;
            this.titleLabel.string = h.Util.clampStr(this.data.title, 12, "..");
          }
      }
    });
  }
};
i([P([cc.Prefab])], D.prototype, "sectionPrefabs", void 0);
i([P(s.default)], D.prototype, "backBtn", void 0);
i([P(r.default)], D.prototype, "scrollList", void 0);
i([P(s.default)], D.prototype, "blockInputBtn", void 0);
i([P(s.default)], D.prototype, "menuBtn", void 0);
i([P(cc.EditBox)], D.prototype, "commmetBox", void 0);
i([P(s.default)], D.prototype, "commentBtn", void 0);
i([P(cc.Label)], D.prototype, "titleLabel", void 0);
D = i([M], D);
exports.default = D;