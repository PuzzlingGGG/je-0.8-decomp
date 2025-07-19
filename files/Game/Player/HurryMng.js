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
exports.HurryMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../Frame/Top");
class r {
  hurryGame(e) {
    return i(this, void 0, void 0, function* () {
      s.default.blockInput(!0, "hurryGame");
      let t = {
        ids: [e]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_HurryGames,
        params: t
      }, n.Game_RHurryGames);
      s.default.blockInput(!1, "hurryGame");
    });
  }
}
exports.HurryMng = r;
r.Ins = new r();