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
    this.confType = l.CommonDataType.Device;
    this.creativeConfType = r.CreativeConfType.device;
    this.appendBuildIn(s.Config.deviceConfs);
  }
  upgradeConf(e) {
    if (e) {
      e.type = l.CommonDataType.Device;
      "Door" == e.prefabName && (e.prefabName = "DeviceButton");
      "Device/Door" == e.textureName && (e.textureName = "Device/DeviceButton");
      "ToggleThorn" == e.prefabName && (e.prefabName = "Lurker");
      "Device/ToggleThorn" == e.textureName && (e.textureName = "Device/Lurker");
    }
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRoleDeviceConf,
          params: t
        }, n.Game_RGetRoleDeviceConf);
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
        cmd: n.CMDS.Game_SaveRoleDeviceConf,
        params: t
      }, n.Game_RSaveRoleDeviceConf)).id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        data: e
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleDeviceConf,
        params: t
      }, n.Game_RSaveRoleDeviceConf);
    });
  }
  requestDeleteConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e.id]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelRoleDeviceConf,
        params: t
      }, n.Game_RDelRoleDeviceConf);
    });
  }
};