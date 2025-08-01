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
  a = e("../../Frame/NetworkMgr");
class s {
  constructor() {
    this.cache = new Map();
  }
  load(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.cache.get(e);
      if (!t) {
        let o = {
            id: e
          },
          i = yield a.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetUserDetailMsg,
            params: o
          }, n.Game_RGetUserDetailMsg);
        if (i) {
          t = i.userDetailMsg;
          this.cache.set(e, t);
        }
      }
      return t;
    });
  }
  deleteCache(e) {
    this.cache.delete(e);
  }
}
exports.default = s;
s.Ins = new s();