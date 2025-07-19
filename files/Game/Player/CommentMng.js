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
exports.CommentMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/CrossPlatform"),
  s = e("../../Frame/NetworkMgr"),
  r = e("../../Frame/Top"),
  l = e("../Hortor"),
  c = e("../OperationFlow"),
  d = e("./CreditMng"),
  h = e("./DynamicMng");
class p {
  constructor() {
    this.lastCommentStamp = 0;
    this.tempStr = "";
    this.tempId = "";
    this.gameTopComment = null;
    this.likeMap = new Map();
  }
  init(e) {
    this.gameTopComment = e;
  }
  sendComment(e, t, o) {
    return i(this, void 0, void 0, function* () {
      if (h.DynamicMng.Ins.isDisable(h.FunctionEnum.PublishGameComment, !0)) return !1;
      if (l.Hortor.isVisitor()) {
        c.OperationFlow.openVisitorPanel();
        return !1;
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
      let i = {
          gameId: e,
          commentId: t,
          msg: o
        },
        a = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_CommentGame,
          params: i
        }, n.Game_RCommentGame);
      if (a) {
        let e = a.comment;
        if (a.sensitiveWords && a.sensitiveWords.length > 0) {
          r.default.hideLoading("发现敏感词：" + a.sensitiveWords.join(","));
          return !1;
        }
        this.lastCommentStamp = orange.TimeUtil.serverTime;
        if (t) for (let o = 0; o < this.gameTopComment.comments.length; o++) {
          let i = this.gameTopComment.comments[o];
          if (i.id == t) {
            this.gameTopComment.commentsCntSum++;
            i.subCommentsCnt++;
            i.openCnt++;
            i.comments.unshift(e);
            break;
          }
          for (let o = 0; o < i.comments.length; o++) if (i.comments[o].id == t) {
            this.gameTopComment.commentsCntSum++;
            i.subCommentsCnt++;
            i.openCnt++;
            i.comments.splice(o + 1, 0, e);
            break;
          }
        } else {
          this.gameTopComment.commentsCntSum++;
          this.gameTopComment.commentsCnt++;
          this.gameTopComment.comments.unshift(e);
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
        cmd: n.CMDS.Game_DelGameComment,
        params: t
      }, n.Game_RDelGameComment)) for (let t = 0; t < this.gameTopComment.comments.length; t++) {
        let o = this.gameTopComment.comments[t];
        if (o.id == e) {
          this.gameTopComment.commentsCntSum -= o.subCommentsCnt + 1;
          this.gameTopComment.commentsCnt--;
          this.gameTopComment.comments.splice(t, 1);
          break;
        }
        for (let t = 0; t < o.comments.length; t++) if (o.comments[t].id == e) {
          this.gameTopComment.commentsCntSum--;
          o.subCommentsCnt--;
          o.openCnt--;
          o.comments.splice(t, 1);
          break;
        }
      }
    });
  }
  loadGameComment(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.gameTopComment.comments.length,
        o = t + 10;
      if (t >= this.gameTopComment.commentsCnt) return;
      let i = {
          gameId: e,
          start: t,
          end: o
        },
        a = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_LoadGameComment,
          params: i
        }, n.Game_RLoadGameComment);
      if (a) for (let e = 0; e < a.comments.length; e++) {
        let t = a.comments[e];
        this.gameTopComment.comments.find(e => e.id == t.id) || this.gameTopComment.comments.push(t);
      }
    });
  }
  loadSubGameComment(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.gameTopComment.comments.find(t => t.id == e);
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
            cmd: n.CMDS.Game_LoadGameSubComment,
            params: r
          }, n.Game_RLoadGameSubComment);
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
      for (let t = 0; t < this.gameTopComment.comments.length; t++) {
        let o = this.gameTopComment.comments[t];
        if (o.id == e) return o;
        let i = o.comments;
        for (let t = 0; t < i.length; t++) if (i[t].id == e) return o;
      }
      let t = {
          commentId: e
        },
        o = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_LoadFirstLevelGameComment,
          params: t
        }, n.Game_RLoadFirstLevelGameComment);
      if (o && o.comment) {
        let t = this.gameTopComment.comments.findIndex(t => t.id == e);
        t >= 0 && this.gameTopComment.comments.splice(t, 1);
        this.gameTopComment.comments.unshift(o.comment);
        return o.comment;
      }
      return null;
    });
  }
  loadLikeData(e) {
    let t = this.likeMap.get(e);
    if (!t) {
      t = a.crossPlatform.getStorageSync("commentLikeData" + e) || {};
      this.likeMap.set(e, t);
    }
    return t;
  }
  saveLikeData(e, t) {
    a.crossPlatform.setStorageSync("commentLikeData" + e, t);
  }
  isLike(e, t) {
    return !!this.loadLikeData(e)[t];
  }
  like(e, t) {
    return i(this, void 0, void 0, function* () {
      r.default.blockInput(!0, "likeComment");
      let o = {
        commentId: t
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ThumbGameComment,
        params: o
      }, n.Game_RThumbGameComment);
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
        cmd: n.CMDS.Game_CancelThumbGameComment,
        params: o
      }, n.Game_RCancelThumbGameComment);
      let i = this.loadLikeData(e);
      delete i[t];
      this.saveLikeData(e, i);
      r.default.blockInput(!1, "unlikeComment");
    });
  }
}
exports.CommentMng = p;
p.Ins = new p();