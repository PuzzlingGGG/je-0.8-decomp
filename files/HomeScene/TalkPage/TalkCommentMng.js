"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.TalkCommentMng = void 0;
const n = e("../../../../scripts/_autogen/cmd/cmd"),
  a = e("../../../Frame/CrossPlatform"),
  s = e("../../../Frame/NetworkMgr"),
  r = e("../../../Frame/Top"),
  l = e("../../../Game/Hortor"),
  c = e("../../../Game/OperationFlow"),
  d = e("../../../Game/Player/CreditMng"),
  h = e("../../../Game/Player/DynamicMng"),
  p = e("../../../Game/Player/TalkMng"),
  u = e("../../../TGA");
class m {
  constructor() {
    this.newCommentCnt = 0;
    this.lastCommentStamp = 0;
    this.talkData = null;
    this.likeMap = new Map();
  }
  init(e) {
    this.talkData = e;
  }
  sendComment(e, t, o) {
    return i(this, void 0, void 0, function* () {
      if (h.DynamicMng.Ins.isDisable(h.FunctionEnum.PublishTalkComment, !0)) return !1;
      if (l.Hortor.isVisitor()) {
        c.OperationFlow.openVisitorPanel();
        return;
      }
      if (orange.TimeUtil.serverTime - this.lastCommentStamp < 1e4) {
        r.default.showToast("你发消息太快了！");
        return !1;
      }
      if (d.CreditMng.Ins.credit < 2) {
        r.default.showToast("近期违规，不能发表评论");
        return !1;
      }
      r.default.showLoading("发送中");
      let i = null;
      if (t) {
        let a = {
          talkId: e,
          commentId: t,
          content: o,
          reviewStr: o.msg,
          reviewImageMap: new Map()
        };
        i = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_ReplyTalkComment,
          params: a
        }, n.Game_RReplyTalkComment);
      } else {
        let t = {
          talkId: e,
          content: o,
          reviewStr: o.msg,
          reviewImageMap: new Map()
        };
        i = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_CommentTalk,
          params: t
        }, n.Game_RCommentTalk);
      }
      if (i) {
        u.TGA.track("Talk", {
          step: "comment"
        });
        let e = i.comment;
        if (i.sensitiveWords && i.sensitiveWords.length > 0) {
          r.default.hideLoading("发现敏感词：" + i.sensitiveWords.join(","));
          return !1;
        }
        this.lastCommentStamp = orange.TimeUtil.serverTime;
        if (t) for (let o = 0; o < this.talkData.comments.length; o++) {
          let i = this.talkData.comments[o];
          if (i.id == t) {
            this.talkData.commentsCntSum++;
            i.subCommentsCnt++;
            i.openCnt++;
            i.comments.unshift(e);
            p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCntSum", this.talkData.commentsCntSum);
            break;
          }
          for (let o = 0; o < i.comments.length; o++) if (i.comments[o].id == t) {
            this.talkData.commentsCntSum++;
            i.subCommentsCnt++;
            i.openCnt++;
            i.comments.splice(o + 1, 0, e);
            p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCntSum", this.talkData.commentsCntSum);
            break;
          }
        } else {
          this.talkData.commentsCntSum++;
          this.talkData.commentsCnt++;
          this.talkData.comments.unshift(e);
          p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCntSum", this.talkData.commentsCntSum);
          p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCnt", this.talkData.commentsCnt);
        }
        r.default.hideLoading();
        return !0;
      }
      r.default.hideLoading("发送失败");
      return !1;
    });
  }
  deleteComment(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        commentId: e
      };
      if (yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelTalkComment,
        params: t
      }, n.Game_RDelTalkComment)) for (let t = 0; t < this.talkData.comments.length; t++) {
        let o = this.talkData.comments[t];
        if (o.id == e) {
          this.talkData.commentsCntSum -= o.subCommentsCnt + 1;
          this.talkData.commentsCnt--;
          this.talkData.comments.splice(t, 1);
          p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCntSum", this.talkData.commentsCntSum);
          p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCnt", this.talkData.commentsCnt);
          p.default.Ins.deleteCacheComment(e);
          break;
        }
        for (let t = 0; t < o.comments.length; t++) if (o.comments[t].id == e) {
          this.talkData.commentsCntSum--;
          o.subCommentsCnt--;
          o.openCnt--;
          o.comments.splice(t, 1);
          p.default.Ins.updateCacheProperty(this.talkData.uId, "commentsCntSum", this.talkData.commentsCntSum);
          p.default.Ins.deleteCacheComment(e);
          break;
        }
      }
    });
  }
  loadComment(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.talkData.comments.length,
        o = t + 6;
      if (t >= this.talkData.commentsCnt) return;
      let i = {
          talkId: e,
          start: t,
          end: o
        },
        a = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_LoadTalkComment,
          params: i
        }, n.Game_RLoadTalkComment);
      if (a) for (let e = 0; e < a.comments.length; e++) {
        let t = a.comments[e];
        this.talkData.comments.find(e => e.id == t.id) || this.talkData.comments.push(t);
      }
    });
  }
  loadSubTalkComment(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.talkData.comments.find(t => t.id == e);
      if (t) {
        let o = t.comments,
          i = o.length,
          a = i + 5;
        if (i >= t.subCommentsCnt) return t.comments;
        let r = {
            commentId: e,
            start: i,
            end: a
          },
          l = yield s.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_LoadTalkSubComment,
            params: r
          }, n.Game_RLoadTalkSubComment);
        if (l) for (let e = 0; e < l.comments.length; e++) {
          let t = l.comments[e];
          o.find(e => e.id == t.id) || o.push(t);
        }
        return o;
      }
      return [];
    });
  }
  loadFirstLevelCommentById(e) {
    return i(this, void 0, void 0, function* () {
      for (let t = 0; t < this.talkData.comments.length; t++) {
        let o = this.talkData.comments[t];
        if (o.id == e) return o;
        let i = o.comments;
        for (let t = 0; t < i.length; t++) if (i[t].id == e) return o;
      }
      let t = {
          commentId: e
        },
        o = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_LoadFirstLevelTalkComment,
          params: t
        }, n.Game_RLoadFirstLevelTalkComment);
      if (o && o.comment) {
        let t = this.talkData.comments.findIndex(t => t.id == e);
        t >= 0 && this.talkData.comments.splice(t, 1);
        this.talkData.comments.unshift(o.comment);
        return o.comment;
      }
      return null;
    });
  }
  isLike(e, t) {
    return !!this.loadLikeData(e)[t];
  }
  loadLikeData(e) {
    let t = this.likeMap.get(e);
    if (!t) {
      t = a.crossPlatform.getStorageSync("talkCommentLikeData" + e) || {};
      this.likeMap.set(e, t);
    }
    return t;
  }
  saveLikeData(e, t) {
    a.crossPlatform.setStorageSync("talkCommentLikeData" + e, t);
  }
  like(e, t) {
    return i(this, void 0, void 0, function* () {
      r.default.blockInput(!0, "likeComment");
      let o = {
        commentId: t
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ThumbTalkComment,
        params: o
      }, n.Game_RThumbTalkComment);
      let i = this.loadLikeData(e);
      i[t] = !0;
      this.saveLikeData(e, i);
      r.default.blockInput(!1, "likeComment");
    });
  }
  unlike(e, t) {
    return i(this, void 0, void 0, function* () {
      r.default.blockInput(!0, "unlikeComment");
      let o = {
        commentId: t
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_CancelThumbTalkComment,
        params: o
      }, n.Game_RCancelThumbTalkComment);
      let i = this.loadLikeData(e);
      delete i[t];
      this.saveLikeData(e, i);
      r.default.blockInput(!1, "unlikeComment");
    });
  }
}
exports.TalkCommentMng = m;
m.Ins = new m();