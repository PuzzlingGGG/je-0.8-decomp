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
    this.map = new Map();
    this.hotIds = [];
  }
  load(e) {
    return i(this, void 0, void 0, function* () {
      if (s.DynamicMng.Ins.isInspectVersion()) return "ZongBang" == e ? s.DynamicMng.Ins.inspectGameIds : [];
      let t = this.map.get(e) || [],
        o = t.length,
        i = o + 20;
      if (o >= (i = Math.min(i, 999))) return t;
      let r = {
          gameTag: e,
          start: 0,
          end: i
        },
        l = (yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetGameIdListByGameTag,
          params: r
        }, n.Game_RGetGameIdListByGameTag)).gameIdList || [];
      this.map.set(e, l);
      return l;
    });
  }
  clearTag(e) {
    this.map.delete(e);
  }
  clearAll() {
    this.map.clear();
  }
  loadHotIds() {
    return i(this, void 0, void 0, function* () {
      if (0 == this.hotIds.length) {
        let e = {
            gameTag: "ZongBang",
            start: 0,
            end: 500
          },
          t = yield a.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetGameIdListByGameTag,
            params: e
          }, n.Game_RGetGameIdListByGameTag);
        this.hotIds = t.gameIdList || [];
      }
      return this.hotIds;
    });
  }
}
exports.default = r;
r.Ins = new r();