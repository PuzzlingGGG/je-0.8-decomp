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
  s = e("../../Frame/NetworkMgr");
class r {
  constructor() {
    this.cache = new Map();
  }
  get(e, t) {
    let o = this.getKey(e, t);
    return this.cache.get(o) || [];
  }
  appendLoad(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = this.getKey(e, t),
        i = this.cache.get(o) || [],
        a = {
          gameId: e,
          sortType: t,
          start: i.length,
          end: i.length + 12
        },
        r = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetCreativeRank,
          params: a
        }, n.Game_RGetCreativeRank);
      if (0 == i.length && r.sourceReleaseGame) {
        i.push(r.sourceReleaseGame);
        r.sourceReleaseGame.isFirst = !0;
      }
      if (r && r.gameDatas) for (let e = 0; e < r.gameDatas.length; e++) i.push(r.gameDatas[e]);
      this.cache.set(o, i);
      return i;
    });
  }
  getKey(e, t) {
    return e + ":" + t;
  }
  deleteCache(e) {
    this.cache.delete(this.getKey(e, a.CreativeGameSortType.comprehensive));
    this.cache.delete(this.getKey(e, a.CreativeGameSortType.creativeGameUpStampDesc));
  }
}
exports.default = r;
r.Ins = new r();