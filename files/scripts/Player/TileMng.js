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
  a = e("../../../scripts/_autogen/data/data"),
  s = e("../../Frame/Config"),
  r = e("../../Frame/NetworkMgr"),
  l = e("../../GameData/GameTypeDefine"),
  c = e("./BaseConfMng");
exports.default = class extends c.BaseConfMng {
  constructor() {
    super();
    this.errorTile = {
      tileType: l.TileType.All,
      id: "error",
      type: l.CommonDataType.Tile,
      name: "error",
      textureName: "UI/error",
      block: !1,
      shape: l.TileShape.Normal,
      tilePhyType: l.TilePhysicType.Pass
    };
    this.confType = l.CommonDataType.Tile;
    this.creativeConfType = a.CreativeConfType.tile;
    this.appendBuildIn(s.Config.tileConfs);
  }
  upgradeConf(e) {
    e && (e.type = l.CommonDataType.Tile);
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRoleTileConf,
          params: t
        }, n.Game_RGetRoleTileConf);
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
      return (yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleTileConf,
        params: t
      }, n.Game_RSaveRoleTileConf)).id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        data: e
      };
      yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleTileConf,
        params: t
      }, n.Game_RSaveRoleTileConf);
    });
  }
  requestDeleteConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e.id]
      };
      yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelRoleTileConf,
        params: t
      }, n.Game_RDelRoleTileConf);
    });
  }
};