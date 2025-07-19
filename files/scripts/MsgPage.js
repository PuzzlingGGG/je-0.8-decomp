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
  s = e("../../../../scripts/_autogen/data/data"),
  r = e("../../../CustomUI/Button"),
  l = e("../../../CustomUI/ScrollList"),
  c = e("../../../Frame/Top"),
  d = e("../../../Frame/UIColor"),
  h = e("../../../Frame/Util"),
  p = e("../../../Game/Player/FollowMng"),
  u = e("../../../Game/Player/MsgMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.fansBtn = null;
    this.msgBtn = null;
    this.commentBtn = null;
    this.scrollList = null;
    this.loadingNode = null;
    this.emptyLabel = null;
    this.idx = 0;
  }
  onLoad() {
    this.fansBtn.node.on(r.default.CLICK, this.onFansBtn, this);
    this.msgBtn.node.on(r.default.CLICK, this.onMsgBtn, this);
    this.commentBtn.node.on(r.default.CLICK, this.onCommentBtn, this);
    cc.game.on("refreshDot", this.refreshDot, this);
    this.refreshDot();
    this.onCommentBtn();
    this.scrollList.getPrefabName = e => e instanceof s.UserSimpleMsg ? "FansCell" : e instanceof s.AggregateMsgData ? "MsgCell" : e instanceof s.CommentMeData ? "CommentMeCell" : void 0;
    this.loadingNode.width = this.loadingNode.height = 0;
    h.Util.updateAllWidget(this.node);
  }
  onDestroy() {
    cc.game.off("refreshDot", this.refreshDot, this);
  }
  refreshDot() {
    this.fansBtn.dot.active = p.FollowMng.Ins.newFansCnt > 0;
    this.msgBtn.dot.active = u.MsgMng.Ins.newAggregateMsgCnt > 0;
    this.commentBtn.dot.active = u.MsgMng.Ins.newCommentCnt > 0;
    this.fansBtn.dotLabel.string = h.Util.dotLabelString(p.FollowMng.Ins.newFansCnt);
    this.msgBtn.dotLabel.string = h.Util.dotLabelString(u.MsgMng.Ins.newAggregateMsgCnt);
    this.commentBtn.dotLabel.string = h.Util.dotLabelString(u.MsgMng.Ins.newCommentCnt);
  }
  selectBtn(e) {
    this.idx = e;
    let t = [this.fansBtn, this.msgBtn, this.commentBtn];
    for (let o = 0; o < t.length; o++) {
      let i = o == e ? d.UIColor.blue : d.UIColor.white;
      t[o].background.node.color = i;
    }
  }
  onFansBtn() {
    return n(this, void 0, void 0, function* () {
      this.selectBtn(0);
      this.refresh();
    });
  }
  onMsgBtn() {
    return n(this, void 0, void 0, function* () {
      this.selectBtn(1);
      this.refresh();
    });
  }
  onCommentBtn() {
    return n(this, void 0, void 0, function* () {
      this.selectBtn(2);
      this.refresh();
    });
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = 0,
        t = [];
      if (0 == this.idx) {
        this.emptyLabel.string = a.I18nMgr.getI18nStringByZh("暂无粉丝");
        if ((e = p.FollowMng.Ins.newFansCnt) > 0) {
          yield p.FollowMng.Ins.clearFansDot();
          cc.game.emit("refreshDot");
        }
        let o = p.FollowMng.Ins.fansIds;
        o.length < 10 && (o = yield p.FollowMng.Ins.appendLoadFansIds());
        t = yield p.FollowMng.Ins.loadInfos(o);
      }
      if (1 == this.idx) {
        this.emptyLabel.string = a.I18nMgr.getI18nStringByZh("暂无消息");
        if ((e = u.MsgMng.Ins.newAggregateMsgCnt) > 0) {
          yield u.MsgMng.Ins.clearMsgDot();
          cc.game.emit("refreshDot");
        }
        (t = u.MsgMng.Ins.msgs).length < 10 && (t = yield u.MsgMng.Ins.appendLoadMsgs());
      }
      if (2 == this.idx) {
        this.emptyLabel.string = a.I18nMgr.getI18nStringByZh("暂无评论");
        if ((e = u.MsgMng.Ins.newCommentCnt) > 0) {
          yield u.MsgMng.Ins.clearCommentMeDot();
          cc.game.emit("refreshDot");
        }
        (t = u.MsgMng.Ins.commentMeList).length < 10 && (t = yield u.MsgMng.Ins.appendLoadCommentMe());
      }
      for (let o = 0; o < t.length; o++) {
        let i = t[o];
        i && (i.isNew = o < e);
      }
      this.scrollList.setDataArr(t);
      this.emptyLabel.node.active = 0 == t.length;
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      let o = -e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          if (o > 100) {
            0 == this.idx && (p.FollowMng.Ins.fansIds = []);
            1 == this.idx && (u.MsgMng.Ins.msgs = []);
            if (2 == this.idx) {
              u.MsgMng.Ins.commentMeStartIdx = 0;
              u.MsgMng.Ins.commentMeList = [];
            }
            yield this.refresh();
            c.default.showToast("已刷新");
          }
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          0 == this.idx && (yield p.FollowMng.Ins.appendLoadFansIds());
          1 == this.idx && (yield u.MsgMng.Ins.appendLoadMsgs());
          2 == this.idx && (yield u.MsgMng.Ins.appendLoadCommentMe());
          this.refresh();
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (o > 0) {
            this.loadingNode.width = this.loadingNode.height = Math.min(o, 100);
            this.loadingNode.angle = o;
          } else this.loadingNode.width = this.loadingNode.height = 0;
      }
    });
  }
};
i([f(r.default)], g.prototype, "fansBtn", void 0);
i([f(r.default)], g.prototype, "msgBtn", void 0);
i([f(r.default)], g.prototype, "commentBtn", void 0);
i([f(l.default)], g.prototype, "scrollList", void 0);
i([f(cc.Node)], g.prototype, "loadingNode", void 0);
i([f(cc.Label)], g.prototype, "emptyLabel", void 0);
g = i([m], g);
exports.default = g;