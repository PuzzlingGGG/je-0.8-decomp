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
  c = e("../../Frame/CrossPlatform"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/UIColor"),
  u = e("../../Frame/Util"),
  m = e("../../Frame/Vibrate"),
  f = e("../../Game/OperationFlow"),
  g = e("../../Game/Player/CommentMng"),
  y = e("../../Game/Player/DynamicMng"),
  v = e("../../Game/Player/GameCoverMng"),
  C = e("../../Role"),
  _ = e("../../TGA"),
  S = e("./GameCoverScene"),
  {
    ccclass: I,
    property: G
  } = cc._decorator;
let T = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.headIcon = null;
    this.nameLabel = null;
    this.pointer = null;
    this.targetNameLabel = null;
    this.commentLabel = null;
    this.timeLabel = null;
    this.likeBtn = null;
    this.data = null;
    this.touching = !1;
    this.moved = !1;
    this.popMenu = !1;
  }
  onLoad() {
    this.node.on(l.default.SET_DATA, this.setData, this);
    this.likeBtn.node.on(s.default.CLICK, this.onLikeBtn, this);
    this.headIcon.node.on(s.default.CLICK, this.onHeadIcon, this);
    this.nameLabel.node.on(s.default.CLICK, this.onHeadIcon, this);
    this.targetNameLabel && this.targetNameLabel.node.on(s.default.CLICK, this.onTargetNameLabel, this);
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }
  setData(e) {
    this.unscheduleAllCallbacks();
    this.data = e;
    let t = e.reportCnt < 5 ? e.msg : "给大佬递茶！";
    this.commentLabel.string = t;
    this.headIcon.loadUrl(e.userImg);
    this.headIcon.setLevel(e.userLevel);
    u.Util.updateLabel(this.commentLabel);
    f.OperationFlow.setNameLabel(this.nameLabel, e.userName, e.playerId);
    u.Util.updateLabel(this.nameLabel);
    if (this.targetNameLabel && this.pointer) if (e.targetPlayerId) {
      this.targetNameLabel.node.active = !0;
      this.pointer.active = !0;
      f.OperationFlow.setNameLabel(this.targetNameLabel, e.targetPlayerName, e.targetPlayerId);
      u.Util.updateLabel(this.targetNameLabel);
    } else {
      this.pointer.active = !1;
      this.targetNameLabel.node.active = !1;
    }
    u.Util.updateAllLayout(this.nameLabel.node.parent);
    this.timeLabel.node.y = -this.commentLabel.node.height + this.commentLabel.node.y - 10;
    this.node.height = this.commentLabel.node.height + 80;
    this.timeLabel.string = u.Util.parseDataString(e.stamp) + a.I18nMgr.getI18nStringByZh("    回复");
    this.refreshLikeBtn();
  }
  refreshLikeBtn() {
    this.likeBtn.label.string = this.data.likeCnt + "";
    let e = g.CommentMng.Ins.isLike(this.data.gameId, this.data.id);
    this.likeBtn.background.node.color = e ? p.UIColor.red : p.UIColor.gray;
  }
  onLikeBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.data.gameId,
        t = this.data.id;
      if (g.CommentMng.Ins.isLike(e, t)) {
        yield g.CommentMng.Ins.unlike(e, t);
        this.data.likeCnt--;
      } else {
        yield g.CommentMng.Ins.like(e, t);
        this.data.likeCnt++;
        _.TGA.track("commentThumb", {
          gameId: this.data.gameId,
          commentId: this.data.id
        });
      }
      this.refreshLikeBtn();
    });
  }
  onHeadIcon() {
    this.enterFriendScene(this.data.playerId);
  }
  onTargetNameLabel() {
    this.enterFriendScene(this.data.targetPlayerId);
  }
  enterFriendScene(e) {
    d.default.ins.Enter("FriendScene", t => {
      t.setData(e);
    }, d.ShiftAnima.moveLeftShift);
  }
  onTouchStart(e) {
    this.touching = !0;
    this.moved = !1;
    this.popMenu = !1;
    this.scheduleOnce(() => {
      if (!this.moved && this.touching) {
        this.touching = !1;
        this.popMenu = !0;
        this.onHold();
      }
    }, .5);
  }
  onTouchMove(e) {
    e.getLocation().sub(e.getStartLocation()).magSqr() > 100 && (this.moved = !0);
  }
  onTouchEnd(e) {
    this.touching = !1;
    this.moved || this.popMenu || this.onCommentBtn();
  }
  onHold() {
    m.Vibrate.short();
    d.default.ins.OpenPanelByName("MenuPanel", e => n(this, void 0, void 0, function* () {
      let t = [{
          name: "复制",
          call: () => {
            c.crossPlatform.setClipboardData({
              data: this.data.msg,
              success: () => {
                h.default.showToast("已复制到剪贴板");
              }
            });
          }
        }, {
          name: "举报",
          call: () => {
            d.default.ins.Enter("ReportScene", e => {
              e.initReportComments(this.data.id);
            }, d.ShiftAnima.moveLeftShift);
          }
        }],
        o = yield v.default.Ins.load(this.data.gameId);
      (this.data.playerId == C.default.Ins.role.id || o.authorMsg.id == C.default.Ins.role.id || y.DynamicMng.Ins.isGmPlayer()) && t.push({
        name: "删除",
        call: () => n(this, void 0, void 0, function* () {
          yield g.CommentMng.Ins.deleteComment(this.data.id);
          h.default.showToast("已删除");
          cc.game.emit(S.default.GameCoverScene_Refresh);
        })
      });
      e.setData(t);
    }));
  }
  onCommentBtn() {
    this.node.dispatchEvent(u.Util.customEvent("showKeyBoard"));
    u.Util.showKeyBoard("", e => n(this, void 0, void 0, function* () {
      this.node.dispatchEvent(u.Util.customEvent("showKeyBoardEnd"));
      if ("" != e && (yield g.CommentMng.Ins.sendComment("", this.data.id, e))) {
        cc.game.emit(S.default.GameCoverScene_Refresh);
        _.TGA.track("comment", {
          gameId: this.data.gameId,
          commentId: this.data.id,
          cnt: e.length
        });
      }
    }));
  }
  calcuHeight(e) {
    let t = e.reportCnt < 5 ? e.msg : "给大佬递茶！";
    this.calcuHeightCache || (this.calcuHeightCache = new Map());
    let o = this.calcuHeightCache.get(t);
    if (!o) {
      this.commentLabel.string = t;
      u.Util.updateLabel(this.commentLabel);
      o = this.commentLabel.node.height + 80;
      this.calcuHeightCache.set(t, o);
    }
    return o;
  }
};
i([G(r.default)], T.prototype, "headIcon", void 0);
i([G(cc.Label)], T.prototype, "nameLabel", void 0);
i([G(cc.Node)], T.prototype, "pointer", void 0);
i([G(cc.Label)], T.prototype, "targetNameLabel", void 0);
i([G(cc.Label)], T.prototype, "commentLabel", void 0);
i([G(cc.Label)], T.prototype, "timeLabel", void 0);
i([G(s.default)], T.prototype, "likeBtn", void 0);
T = i([I], T);
exports.default = T;