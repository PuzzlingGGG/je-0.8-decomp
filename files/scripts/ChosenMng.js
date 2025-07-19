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
  s = e("../../Frame/Top"),
  r = e("./DynamicMng");
class l {
  constructor() {
    this.gameDatas = null;
  }
  loadGames(e) {
    return i(this, void 0, void 0, function* () {
      r.DynamicMng.Ins.isInspectVersion() && (e = r.DynamicMng.Ins.inspectGameIds);
      if (!this.gameDatas) {
        let t = {
            ids: e
          },
          o = yield a.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetHomepageGameData,
            params: t
          }, n.Game_RGetHomepageGameData);
        o || s.default.showToast("网络错误，加载失败！");
        this.gameDatas = o ? o.gameDatas : null;
      }
      return this.gameDatas;
    });
  }
  clear() {
    this.gameDatas = null;
  }
}
exports.default = l;
l.Ins = new l();