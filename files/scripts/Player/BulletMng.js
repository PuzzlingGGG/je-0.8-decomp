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
  r = e("../../GameData/GameTypeDefine"),
  l = e("../../../scripts/_autogen/data/data"),
  c = e("./BaseConfMng");
exports.default = class extends c.BaseConfMng {
  constructor() {
    super();
    this.confType = r.CommonDataType.Bullet;
    this.creativeConfType = l.CreativeConfType.weapon;
    this.appendBuildIn(s.Config.bulletConfs);
  }
  upgradeConf(e) {
    e && (e.type = r.CommonDataType.Bullet);
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRoleBulletConf,
          params: t
        }, n.Game_RGetRoleBulletConf);
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
        cmd: n.CMDS.Game_SaveRoleBulletConf,
        params: t
      }, n.Game_RSaveRoleBulletConf)).id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        data: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleBulletConf,
        params: t
      }, n.Game_RSaveRoleBulletConf);
    });
  }
  requestDeleteConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e.id]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelRoleBulletConf,
        params: t
      }, n.Game_RDelRoleBulletConf);
    });
  }
};