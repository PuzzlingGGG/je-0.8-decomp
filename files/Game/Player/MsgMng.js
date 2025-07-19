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
exports.MsgMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("./DynamicMng");
class r {
  constructor() {
    this.msgs = [];
    this.newAggregateMsgCnt = 0;
    this.commentMeList = [];
    this.newCommentCnt = 0;
    this.commentMeStartIdx = 0;
  }
  appendLoadMsgs() {
    return i(this, void 0, void 0, function* () {
      if (s.DynamicMng.Ins.isInspectVersion()) return [];
      let e = this.msgs.length,
        t = e + 10;
      if (e >= (t = Math.min(t, 999))) return this.msgs;
      let o = {
          startIndex: e,
          endIndex: t
        },
        i = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetAggregateMsgList,
          params: o
        }, n.Game_RGetAggregateMsgList);
      if (i) {
        this.newAggregateMsgCnt = i.newAggregateMsgCnt;
        for (let e = 0; e < i.aggregateMsgList.length; e++) {
          let t = i.aggregateMsgList[e];
          this.msgs.push(t);
        }
      }
      return this.msgs;
    });
  }
  clearMsgDot() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearNewMsg,
        params: {}
      }, n.Game_RClearNewMsg);
      this.newAggregateMsgCnt = 0;
    });
  }
  appendLoadCommentMe() {
    return i(this, void 0, void 0, function* () {
      if (s.DynamicMng.Ins.isInspectVersion()) return [];
      let e = {
          startIndex: this.commentMeStartIdx,
          count: 8
        },
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetNewCommentListV2,
          params: e
        }, n.Game_RGetNewCommentListV2);
      if (t) {
        this.commentMeStartIdx = t.startIndex;
        this.newCommentCnt = t.newCommentCnt;
        for (let e = 0; e < t.commentList.length; e++) {
          let o = t.commentList[e];
          this.commentMeList.push(o);
        }
        this.commentMeList.sort((e, t) => t.stamp - e.stamp);
      }
      return this.commentMeList;
    });
  }
  clearCommentMeDot() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearNewComment,
        params: {}
      }, n.Game_RClearNewComment);
      this.newCommentCnt = 0;
    });
  }
}
exports.MsgMng = r;
r.Ins = new r();