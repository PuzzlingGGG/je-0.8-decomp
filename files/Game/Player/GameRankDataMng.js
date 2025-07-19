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
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/CrossPlatform"),
  s = e("../../Frame/NetworkMgr");
class r {
  constructor() {
    this.max = 99;
  }
  loadRank(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: [e]
        },
        o = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetReleaseGameRank,
          params: t
        }, n.Game_RGetReleaseGameRank);
      if (o && o.datas && o.datas[0]) {
        let e = o.datas[0];
        for (let t = 0; t < e.rankList.length; t++) e.rankList[t].rank = t + 1;
        return o.datas[0];
      }
      return null;
    });
  }
  uploadScore(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
        gameId: e,
        scores: t
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_UploadGameRankScore,
        params: o
      }, n.Game_RUploadGameRankScore);
    });
  }
  deleteScore(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
        id: e,
        targetId: t
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DeleteGameRankScore,
        params: o
      }, n.Game_RDeleteGameRankScore);
      this.deleteHistoryScore(e);
    });
  }
  getHistoryScore(e) {
    return (a.crossPlatform.getStorageSync("rankHistoryScroeMap") || {})[e];
  }
  saveHistoryScore(e, t) {
    let o = a.crossPlatform.getStorageSync("rankHistoryScroeMap") || {};
    exports.e = t;
    a.crossPlatform.setStorageSync("rankHistoryScroeMap", o);
  }
  deleteHistoryScore(e) {
    let t = a.crossPlatform.getStorageSync("rankHistoryScroeMap") || {};
    if ("number" == typeof t[e]) {
      delete t[e];
      a.crossPlatform.setStorageSync("rankHistoryScroeMap", t);
    }
  }
}
exports.default = r;
r.Ins = new r();