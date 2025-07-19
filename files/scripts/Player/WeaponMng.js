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
  l = e("../World/Tile"),
  c = e("../../../scripts/_autogen/data/data"),
  d = e("./BaseConfMng");
exports.default = class extends d.BaseConfMng {
  constructor() {
    super();
    this.confType = r.CommonDataType.Weapon;
    this.creativeConfType = c.CreativeConfType.weapon;
    this.appendBuildIn(s.Config.weaponConfs);
  }
  upgradeConf(e) {
    if (e) {
      e.type = r.CommonDataType.Weapon;
      e.weaponType != r.WeaponType.Gun || e.gun || (e.gun = {
        scatter: e.scatter,
        fireShake: e.fireShake,
        muzzles: e.muzzles,
        bulletId: e.bulletId,
        bulletSpeed: 5 * l.default.SIZE,
        bulletRange: 5 * l.default.SIZE
      });
      if (e.gun && e.weaponType == r.WeaponType.Gun) {
        (void 0 === e.gun.bulletSpeed || isNaN(e.gun.bulletSpeed)) && (e.gun.bulletSpeed = 5 * l.default.SIZE);
        (void 0 === e.gun.bulletRange || isNaN(e.gun.bulletRange)) && (e.gun.bulletRange = 5 * l.default.SIZE);
        void 0 === e.gun.fireShake && (e.gun.fireShake = !1);
        void 0 === e.gun.muzzles && (e.gun.muzzles = [cc.Vec2.ZERO]);
        void 0 === e.gun.scatter && (e.gun.scatter = 0);
      }
    }
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRoleWeaponConf,
          params: t
        }, n.Game_RGetRoleWeaponConf);
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
        cmd: n.CMDS.Game_SaveRoleWeaponConf,
        params: t
      }, n.Game_RSaveRoleWeaponConf)).id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        data: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleWeaponConf,
        params: t
      }, n.Game_RSaveRoleWeaponConf);
    });
  }
  requestDeleteConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e.id]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelRoleWeaponConf,
        params: t
      }, n.Game_RDelRoleWeaponConf);
    });
  }
};