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
  r = e("../../../CustomUI/HeadIcon"),
  l = e("../../../CustomUI/ScrollList"),
  c = e("../../../Frame/CrossPlatform"),
  d = e("../../../Frame/SceneManager"),
  h = e("../../../Frame/Top"),
  p = e("../../../Frame/UIColor"),
  u = e("../../../Frame/Util"),
  m = e("../../../Frame/Vibrate"),
  f = e("../../../Game/OperationFlow"),
  g = e("../../../Game/Player/DynamicMng"),
  y = e("../../../Game/Player/LifeMng"),
  v = e("../../../Game/Player/Mng"),
  C = e("../../../Game/Player/TalkMng"),
  _ = e("../../../Game/World/Actor"),
  S = e("../../../GameData/GameTypeDefine"),
  I = e("../../../Role"),
  G = e("../../../TGA"),
  T = e("./TalkCommentMng"),
  {
    ccclass: b,
    property: M
  } = cc._decorator;
let P = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.isSub = !1;
    this.headIcon = null;
    this.nameLabel = null;
    this.pointer = null;
    this.targetNameLabel = null;
    this.commentLabel = null;
    this.timeLabel = null;
    this.worldNode = null;
    this.worldNameLabel = null;
    this.playBtn = null;
    this.editBtn = null;
    this.likeBtn = null;
    this.data = null;
    this.touching = !1;
    this.moved = !1;
    this.popMenu = !1;
    this.touchStartStamp = 0;
  }
  onLoad() {
    this.node.on(l.default.SET_DATA, this.setData, this);
    this.likeBtn.node.on(s.default.CLICK, this.onLikeBtn, this);
    this.playBtn.node.on(s.default.CLICK, this.onPlayBtn, this);
    this.editBtn.node.on(s.default.CLICK, this.onEditBtn, this);
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
    let t = e.content,
      o = e.reportCnt < 5 ? t.msg : "给大佬递茶！";
    this.commentLabel.string = o;
    u.Util.updateLabel(this.commentLabel);
    this.headIcon.loadUrl(e.userImg);
    this.headIcon.setLevel(e.userLevel);
    this.nameLabel.string = e.userName;
    u.Util.updateLabel(this.nameLabel);
    if (this.pointer && this.targetNameLabel) if (e.targetPlayerId) {
      this.targetNameLabel.node.active = !0;
      this.pointer.active = !0;
      f.OperationFlow.setNameLabel(this.targetNameLabel, e.targetPlayerName, e.targetPlayerId);
      u.Util.updateLabel(this.targetNameLabel);
      u.Util.updateAllLayout(this.targetNameLabel.node.parent);
    } else {
      this.pointer.active = !1;
      this.targetNameLabel.node.active = !1;
    }
    let i = -this.commentLabel.node.y + this.commentLabel.node.height + 10,
      n = t.worldData;
    if (n) {
      this.worldNode.active = !0;
      this.worldNode.y = -i;
      i += this.worldNode.height;
      i += 10;
      this.worldNameLabel.string = n.info.name;
    } else this.worldNode.active = !1;
    this.timeLabel.node.y = -i;
    i += this.timeLabel.node.height;
    this.node.height = i;
    this.timeLabel.string = u.Util.parseDataString(e.stamp) + a.I18nMgr.getI18nStringByZh("    回复");
    this.refreshLikeBtn();
  }
  refreshLikeBtn() {
    this.likeBtn.label.string = this.data.thumbCnt + "";
    let e = T.TalkCommentMng.Ins.isLike(this.data.talkId, this.data.id);
    this.likeBtn.background.node.color = e ? p.UIColor.red : p.UIColor.gray;
  }
  onLikeBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.data.talkId,
        t = this.data.id;
      if (T.TalkCommentMng.Ins.isLike(e, t)) {
        yield T.TalkCommentMng.Ins.unlike(e, t);
        this.data.thumbCnt--;
      } else {
        yield T.TalkCommentMng.Ins.like(e, t);
        this.data.thumbCnt++;
        G.TGA.track("commentThumb", {
          gameId: this.data.talkId,
          commentId: this.data.id
        });
      }
      this.refreshLikeBtn();
    });
  }
  onHeadIcon() {
    this.data && d.default.ins.Enter("FriendScene", e => {
      e.setData(this.data.playerId);
    }, d.ShiftAnima.moveLeftShift);
  }
  onTargetNameLabel() {
    this.data && d.default.ins.Enter("FriendScene", e => {
      e.setData(this.data.targetPlayerId);
    }, d.ShiftAnima.moveLeftShift);
  }
  onTouchStart(e) {
    this.touching = !0;
    this.moved = !1;
    this.popMenu = !1;
    this.touchStartStamp = orange.TimeUtil.serverTime;
    this.scheduleOnce(() => {
      if (!this.moved && this.touching) {
        this.touching = !1;
        this.popMenu = !0;
        this.onHold();
      }
    }, .5);
  }
  onTouchMove(e) {
    if (e.getLocation().sub(e.getStartLocation()).magSqr() > 100) {
      this.moved = !0;
      this.node.color = cc.color(255, 255, 255);
    }
  }
  onTouchEnd(e) {
    this.touching = !1;
    this.moved || this.popMenu || this.onCommentBtn();
    this.node.color = cc.color(255, 255, 255);
  }
  onHold() {
    m.Vibrate.short();
    d.default.ins.OpenPanelByName("MenuPanel", e => n(this, void 0, void 0, function* () {
      let t = [{
          name: "复制",
          call: () => {
            c.crossPlatform.setClipboardData({
              data: this.data.content.msg,
              success: () => {
                h.default.showToast("已复制到剪贴板");
              }
            });
          }
        }, {
          name: "举报",
          call: () => {
            d.default.ins.Enter("ReportScene", e => {
              e.initReportTalk(this.data.id);
            }, d.ShiftAnima.moveLeftShift);
          }
        }],
        o = yield C.default.Ins.loadTalkDetail(this.data.talkId);
      (this.data.playerId == I.default.Ins.role.id || o.playerId == I.default.Ins.role.id || g.DynamicMng.Ins.isGmPlayer()) && t.push({
        name: "删除",
        call: () => n(this, void 0, void 0, function* () {
          yield T.TalkCommentMng.Ins.deleteComment(this.data.id);
          h.default.showToast("已删除");
          cc.game.emit(C.default.Talk_Refresh);
        })
      });
      e.setData(t);
    }));
  }
  update() {
    if (this.touching && !this.moved) {
      let e = 255 - 20 * (orange.TimeUtil.serverTime - this.touchStartStamp) / 1e3 / .5;
      this.node.color = cc.color(e, e, e);
    }
  }
  onCommentBtn() {
    this.node.dispatchEvent(u.Util.customEvent("showKeyBoard"));
    u.Util.showKeyBoard("", e => n(this, void 0, void 0, function* () {
      this.node.dispatchEvent(u.Util.customEvent("showKeyBoardEnd"));
      if ("" == e) return;
      let t = {
        msg: e
      };
      if (yield T.TalkCommentMng.Ins.sendComment(this.data.talkId, this.data.id, t)) {
        cc.game.emit(C.default.Talk_Refresh);
        G.TGA.track("comment", {
          gameId: this.data.talkId,
          commentId: this.data.id,
          cnt: e.length
        });
      }
    }));
  }
  onPlayBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.data.content;
      yield v.Mng.switchTalkProject(e.gameId);
      let t = yield v.Mng.Ins.gameMng.loadOne(e.gameId),
        o = e.worldData,
        i = o.worldLayout,
        n = null;
      for (let e = 0; e < i.actors.length; e++) {
        let t = i.actors[e];
        if (t && t.data.team == S.Team.Hero) {
          n = t;
          break;
        }
      }
      n ? this.play(t, o, n) : d.default.ins.OpenPanelByName("SelectHeroPanel", e => {
        e.titleLabel.string = "选择主角，开始测试";
        e.setData(null);
        e.selectCall = e => {
          n = _.default.createActorData(e, S.Team.Hero, o.worldLayout);
          this.play(t, o, n);
        };
      });
    });
  }
  play(e, t, o) {
    v.Mng.Ins.worldMng.tempCache.set(t.id, t);
    d.default.ins.Enter("GameScene", i => {
      i.mode = "Test";
      y.LifeMng.Ins.setLife(e.id, y.LifeMng.Ins.max);
      i.play(e, t.id, o);
    });
  }
  onEditBtn() {
    return n(this, void 0, void 0, function* () {
      let e = (yield C.default.Ins.loadTalkDetail(this.data.talkId)).playerId == I.default.Ins.role.id,
        t = this.data.content;
      yield v.Mng.switchTalkProject(t.gameId);
      let o = yield v.Mng.Ins.gameMng.loadOne(t.gameId),
        i = t.worldData;
      i.info.selectedActorGroup = o.name;
      d.default.ins.Enter("EditWorldScene", t => {
        t.setDataByTalkProject(e, o, i);
        t.submitCall = (e, t) => n(this, void 0, void 0, function* () {
          (i = u.Util.deepCopy(i)).worldLayout = t;
          let n = {
            msg: e,
            gameId: o.id,
            worldData: i
          };
          yield T.TalkCommentMng.Ins.sendComment(this.data.talkId, this.data.id, n);
          cc.game.emit(C.default.Talk_Refresh);
        });
        t.applyCall = (e, t) => n(this, void 0, void 0, function* () {
          (i = u.Util.deepCopy(i)).worldLayout = t;
          i.layoutMin = u.Util.zip(t);
          if ("test" == i.id) {
            i.id = "";
            yield v.Mng.Ins.worldMng.create(i, o);
          } else yield v.Mng.Ins.worldMng.save(i, !0);
          let n = {
            msg: e
          };
          yield T.TalkCommentMng.Ins.sendComment(this.data.talkId, this.data.id, n);
          cc.game.emit(C.default.Talk_Refresh);
        });
      });
    });
  }
  onDownloadBtn() {
    return n(this, void 0, void 0, function* () {
      d.default.ins.OpenPanelByName("");
    });
  }
  calcuHeight(e) {
    let t = e.content,
      o = e.reportCnt < 5 ? t.msg : "给大佬递茶！";
    this.calcuHeightCache || (this.calcuHeightCache = new Map());
    let i = this.calcuHeightCache.get(o);
    if (!i) {
      i = 80;
      this.commentLabel.string = o;
      u.Util.updateLabel(this.commentLabel);
      i = -this.commentLabel.node.y + this.commentLabel.node.height + 10;
      if (t.worldData) {
        i += this.worldNode.height;
        i += 10;
      }
      i += this.timeLabel.node.height;
      this.calcuHeightCache.set(o, i);
    }
    return i;
  }
};
i([M], P.prototype, "isSub", void 0);
i([M(r.default)], P.prototype, "headIcon", void 0);
i([M(cc.Label)], P.prototype, "nameLabel", void 0);
i([M(cc.Node)], P.prototype, "pointer", void 0);
i([M(cc.Label)], P.prototype, "targetNameLabel", void 0);
i([M(cc.Label)], P.prototype, "commentLabel", void 0);
i([M(cc.Label)], P.prototype, "timeLabel", void 0);
i([M(cc.Node)], P.prototype, "worldNode", void 0);
i([M(cc.Label)], P.prototype, "worldNameLabel", void 0);
i([M(s.default)], P.prototype, "playBtn", void 0);
i([M(s.default)], P.prototype, "editBtn", void 0);
i([M(s.default)], P.prototype, "likeBtn", void 0);
P = i([b], P);
exports.default = P;