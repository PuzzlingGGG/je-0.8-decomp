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
  a = e("../../../scripts/_autogen/data/data"),
  s = e("../../Frame/CrossPlatform"),
  r = e("../../Frame/NetworkMgr"),
  l = e("./DynamicMng"),
  c = e("./GameCellDataMng"),
  d = e("./GameCoverMng");
class h {
  constructor() {
    this.tagMap = new Map();
  }
  getTagsByMe(e) {
    return (s.crossPlatform.getStorageSync("tagsByMe") || {})[e] || [];
  }
  saveTagsByMe(e, t) {
    let o = s.crossPlatform.getStorageSync("tagsByMe") || {};
    exports.e = t;
    s.crossPlatform.setStorageSync("tagsByMe", o);
  }
  gmSetTagCnt(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let i = {
        gameID: e,
        addTagMsg: t,
        tagCount: o
      };
      (yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_GMSetGameTage,
        params: i
      }, n.Game_RGMSetGameTage)) && this.syncCacheGameTagCnt(e, t, o, "set");
    });
  }
  uploadGameTag(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let i = {
          gameID: e,
          addTagMsg: t,
          removeTagMsg: o
        },
        a = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_AddGameTage,
          params: i
        }, n.Game_RAddGameTage);
      if (a && 0 == a.sensitiveWords.length) {
        let i = l.DynamicMng.Ins.isGmPlayer() ? 5 : 1;
        for (let o = 0; o < t.length; o++) {
          let n = t[o];
          this.syncCacheGameTagCnt(e, n, i, "add");
        }
        for (let t = 0; t < o.length; t++) {
          let n = o[t];
          this.syncCacheGameTagCnt(e, n, -i, "add");
        }
        return !0;
      }
      return !1;
    });
  }
  syncCacheGameTagCnt(e, t, o, i = "add") {
    let n = d.default.Ins.cache.get(e);
    if (n && n.releaseGameData) {
      let e = n.releaseGameData.tagList,
        s = e.find(e => e.tagMsg == t);
      if (s) "add" == i ? s.recommendTimes += o : "set" == i && (s.recommendTimes = o);else {
        let i = new a.GameTagaData();
        i.tagMsg = t;
        i.recommendTimes = o;
        i.lastEditTime = orange.TimeUtil.serverTime;
        e.push(i);
      }
    }
  }
  getGames(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.tagMap.get(e) || [];
      return yield c.default.Ins.loadGames(t);
    });
  }
  appendLoadGame(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = this.tagMap.get(e) || [],
        i = o.length,
        a = {
          tagMsg: e,
          start: i,
          end: i + t
        },
        s = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_SearchGameByTag,
          params: a
        }, n.Game_RSearchGameByTag);
      if (s) for (let e = 0; e < s.gameDatas.length; e++) {
        let t = s.gameDatas[e];
        o.includes(t.id) || o.push(t.id);
        c.default.Ins.cache.set(t.id, t);
      }
      this.tagMap.set(e, o);
    });
  }
}
exports.default = h;
h.Ins = new h();