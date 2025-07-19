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
  s = e("./BaseConfMng"),
  r = e("../../Frame/Config"),
  l = e("../../GameData/GameTypeDefine"),
  c = e("../../../scripts/_autogen/data/data");
exports.default = class extends s.BaseConfMng {
  constructor() {
    super();
    this.confType = l.CommonDataType.Actor;
    this.creativeConfType = c.CreativeConfType.actor;
    this.appendBuildIn(r.Config.actorConfs);
  }
  upgradeConf(e) {
    if (e) {
      e.type = l.CommonDataType.Actor;
      e.rpgConf = e.rpgConf || {
        moveSpeed: 256,
        aiMoveType: l.AIMoveType.None,
        beatenLockHpTime: .8
      };
      e.jumpPlatformConf = e.jumpPlatformConf || {
        moveSpeed: 192,
        jumpStep: 2,
        jumpHight: 160,
        aiMoveType: l.AIMoveType.None,
        beatenLockHpTime: .8
      };
    }
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRoleActorConf,
          params: t
        }, n.Game_RGetRoleActorConf);
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
        cmd: n.CMDS.Game_SaveRoleActorConf,
        params: t
      }, n.Game_RSaveRoleActorConf)).id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        data: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleActorConf,
        params: t
      }, n.Game_RSaveRoleActorConf);
    });
  }
  requestDeleteConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e.id]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelRoleActorConf,
        params: t
      }, n.Game_RDelRoleActorConf);
    });
  }
};