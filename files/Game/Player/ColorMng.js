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
exports.ColorMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../Frame/Top");
class r {
  constructor() {
    this.customColors = new Array();
  }
  save(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          colorDatas: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_SaveCustomColors,
          params: t
        }, n.Game_RSaveCustomColors);
      if (!o) {
        s.default.showToast("网路错误，创建失败！");
        return null;
      }
      for (let e = 0; e < o.colorDatas.length; e++) {
        let t = o.colorDatas[e],
          i = this.customColors.find(e => t.id == e.id);
        i ? i.data = t.data : this.customColors.push(t);
      }
      return o.colorDatas;
    });
  }
  saveAll(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          colorDatas: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_SaveAllCustomColors,
          params: t
        }, n.Game_RSaveAllCustomColors);
      if (!o) {
        s.default.showToast("网路错误，创建失败！");
        return null;
      }
      this.customColors = o.colorDatas;
      return o.colorDatas;
    });
  }
  delete(e) {
    return i(this, void 0, void 0, function* () {
      if (!e) return;
      let t = [];
      this.customColors.forEach(o => {
        o.id != e && t.push(o);
      });
      this.customColors = t;
      let o = {
        ids: [e]
      };
      if (!(yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelCustomColors,
        params: o
      }, n.Game_RDelCustomColors))) {
        s.default.showToast("网路错误，创建失败！");
        return null;
      }
    });
  }
}
exports.ColorMng = r;
r.Ins = new r();