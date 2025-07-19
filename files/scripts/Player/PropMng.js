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
  s = e("../../Frame/Config"),
  r = e("../../../scripts/_autogen/data/data"),
  l = e("../../GameData/GameTypeDefine"),
  c = e("./BaseConfMng");
exports.default = class extends c.BaseConfMng {
  constructor() {
    super();
    this.confType = l.CommonDataType.Prop;
    this.creativeConfType = r.CreativeConfType.prop;
    this.appendBuildIn(s.Config.propConfs);
  }
  upgradeConf(e) {
    e && (e.type = l.CommonDataType.Prop);
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRolePropConf,
          params: t
        }, n.Game_RGetRolePropConf);
      if (o) {
        let e = [];
        for (let t = 0; t < o.datas.length; t++) {
          let i = o.datas[t],
            n = i.conf;
          n.id = i.id;
          n.goodsUId = i.goodsUId;
          e.push(i.conf);
        }
        return e;
      }
    });
  }
  requestCreateConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: null,
        data: e
      };
      return (yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRolePropConf,
        params: t
      }, n.Game_RSaveRolePropConf)).id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        data: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRolePropConf,
        params: t
      }, n.Game_RSaveRolePropConf);
    });
  }
  requestDeleteConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e.id]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelRolePropConf,
        params: t
      }, n.Game_RDelRolePropConf);
    });
  }
};