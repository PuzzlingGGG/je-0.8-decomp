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
  s = e("./DynamicMng"),
  r = e("./GameCellDataMng");
class l {
  constructor() {
    this.games = [];
    this._startMember = "";
    this.fakeGames = [];
  }
  loadIds(e) {
    return i(this, void 0, void 0, function* () {
      if (s.DynamicMng.Ins.isInspectVersion()) return [];
      let t = this.games || [],
        o = t.length,
        i = o + 100;
      if (o >= (i = Math.min(i, 1999))) return t;
      let l = this._startMember;
      e && (l = "");
      let c = {
          start: o,
          end: i,
          startMember: l
        },
        d = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetNewGameList,
          params: c
        }, n.Game_RGetNewGameList);
      if (d) {
        this._startMember = d.startMember;
        for (let e = 0; e < d.gameDatas.length; e++) {
          let t = d.gameDatas[e];
          this.games.push(t);
          r.default.Ins.cache.set(t.id, t);
        }
      }
      return this.games;
    });
  }
  clear() {
    this.games = [];
  }
}
exports.default = l;
l.Ins = new l();