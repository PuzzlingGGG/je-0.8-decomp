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
exports.ReportMng = exports.ReportType = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("./ShopMng");
(function (e) {
  e[e.game = 0] = "game";
  e[e.player = 1] = "player";
  e[e.goods = 2] = "goods";
  e[e.comment = 3] = "comment";
  e[e.talk = 4] = "talk";
})(o.ReportType || (exports.ReportType = {}));
class r {
  reportGame(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ReportGame,
        params: t
      }, n.Game_RReportGame);
    });
  }
  loadGames() {
    return i(this, void 0, void 0, function* () {
      let e = [],
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetReportGameIdList,
          params: {
            start: 0,
            end: 1e3
          }
        }, n.Game_RGetReportGameList);
      if (t && t.reportGameIdList && t.reportGameIdList.length > 0) {
        let o = {
          ids: t.reportGameIdList
        };
        e = (yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetBeReportGameData,
          params: o
        }, n.Game_RGetBeReportGameData)).gameDatas || [];
        for (let o = 0; o < e.length; o++) {
          let i = e[o];
          i.reportCnt = t.reportScoreMap.get(i.id);
        }
      }
      return e;
    });
  }
  banGame(e, t, o, s) {
    return i(this, void 0, void 0, function* () {
      let i = {
        id: e,
        score: t,
        reason: o,
        needDelSourceGame: s
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_OffGame,
        params: i
      }, n.Game_ROffGame);
    });
  }
  clearGame() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearReportGame,
        params: {}
      }, n.Game_RClearReportGame);
    });
  }
  reportPlayer(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e
      };
      a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ReportPlayer,
        params: t
      }, n.Game_RReportPlayer);
    });
  }
  loadPlayer() {
    return i(this, void 0, void 0, function* () {
      let e = [],
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetReportPlayerIdList,
          params: {
            start: 0,
            end: 1e3
          }
        }, n.Game_RGetReportPlayerList);
      if (t && t.reportPlayerIdList && t.reportPlayerIdList.length > 0) {
        let o = {
          ids: t.reportPlayerIdList
        };
        e = (yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetUserSimpleMsg,
          params: o
        }, n.Game_RGetUserSimpleMsg)).userSimpleMsgList;
        for (let o = 0; o < e.length; o++) {
          let i = e[o];
          i.reportCnt = t.reportScoreMap.get(i.playerId + "");
        }
      }
      return e;
    });
  }
  banPlayer(e, t, o, s, r, l) {
    return i(this, void 0, void 0, function* () {
      let i = {
        id: e,
        score: o,
        reason: t,
        needResetUserName: s,
        needResetUserImg: r,
        needResetIntro: l
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DealWithReportPlayer,
        params: i
      }, n.Game_RDealWithReportPlayer);
    });
  }
  clearPlayer() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearReportPlayer,
        params: {}
      }, n.Game_RClearReportPlayer);
    });
  }
  reportGoods(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e
      };
      a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ReportGoods,
        params: t
      }, n.Game_RReportGoods);
    });
  }
  loadGoods() {
    return i(this, void 0, void 0, function* () {
      let e = [],
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetReportGoodsIdList,
          params: {
            start: 0,
            end: 1e3
          }
        }, n.Game_RGetReportGoodsList);
      if (t && t.reportGoodsIdList && t.reportGoodsIdList.length > 0) {
        e = yield s.default.Ins.loadGoodsCellDatas(t.reportGoodsIdList);
        for (let o = 0; o < e.length; o++) {
          let i = e[o];
          i.reportCnt = t.reportScoreMap.get(i.id);
        }
      }
      return e;
    });
  }
  banGoods(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let i = {
        id: e,
        score: o,
        reason: t
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DealWithReportGoods,
        params: i
      }, n.Game_RDealWithReportGoods);
    });
  }
  clearGoods() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearReportGoods,
        params: {}
      }, n.Game_RClearReportGoods);
    });
  }
  reportComment(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        commentId: e
      };
      a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ReportGameComment,
        params: t
      }, n.Game_RReportGameComment);
    });
  }
  loadComments() {
    return i(this, void 0, void 0, function* () {
      let e = [],
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetReportGameCommentList,
          params: {
            start: 0,
            end: 1e3
          }
        }, n.Game_RGetReportGameCommentList);
      t && t.reportGameCommentList && t.reportGameCommentList.length > 0 && (e = t.reportGameCommentList);
      return e;
    });
  }
  banComments(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let i = {
        id: e,
        score: o,
        reason: t
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DealWithReportGameComment,
        params: i
      }, n.Game_RDealWithReportGameComment);
    });
  }
  clearComments() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearReportGameComment,
        params: {}
      }, n.Game_RClearReportGameComment);
    });
  }
  reportTalk(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ReportTalk,
        params: t
      }, n.Game_RReportTalk);
    });
  }
  loadTalks() {
    return i(this, void 0, void 0, function* () {
      let e = [],
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetReportTalkList,
          params: {
            start: 0,
            end: 1e3
          }
        }, n.Game_RGetReportTalkList);
      t && t.talkList && t.talkList.length > 0 && (e = t.talkList);
      return e;
    });
  }
  banTalk(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_OfficialDeleteTalk,
        params: t
      }, n.Game_ROfficialDeleteTalk);
    });
  }
  clearTalks() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearReportTalk,
        params: {}
      }, n.Game_RClearReportTalk);
    });
  }
}
exports.ReportMng = r;
r.Ins = new r();