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
  a = e("../../Frame/NetworkMgr"),
  s = e("./DynamicMng");
class r {
  constructor() {
    this.cache = new Map();
  }
  loadGames(e) {
    return i(this, void 0, void 0, function* () {
      let t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        this.cache.has(i) || t.push(i);
      }
      if (t.length > 0) {
        let e = {
            ids: t
          },
          o = yield a.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetHomepageGameData,
            params: e
          }, n.Game_RGetHomepageGameData);
        if (o) for (let e = 0; e < o.gameDatas.length; e++) {
          let t = o.gameDatas[e];
          this.cache.set(t.id, t);
        }
      }
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = this.cache.get(e[t]);
        if (i && !s.DynamicMng.Ins.isViolationsName(i.name)) {
          i.rank = t + 1;
          o.push(i);
        }
      }
      return o;
    });
  }
  deleteCache(e) {
    this.cache.delete(e);
  }
  deleteAllCache() {
    this.cache.clear();
  }
}
exports.default = r;
r.Ins = new r();