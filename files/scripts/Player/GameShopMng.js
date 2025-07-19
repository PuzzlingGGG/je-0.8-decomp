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
const n = e("../../Frame/NetworkMgr"),
  a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../../scripts/_autogen/data/data"),
  r = e("./BaseConfMng"),
  l = e("../../GameData/GameTypeDefine");
exports.default = class extends r.BaseConfMng {
  constructor() {
    super();
    this.confType = l.CommonDataType.Shop;
    this.creativeConfType = s.CreativeConfType.shop;
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield n.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_GetGameShop,
          params: t
        }, a.Game_RGetGameShop);
      if (o) {
        let e = [];
        for (let t = 0; t < o.datas.length; t++) {
          let i = o.datas[t];
          i.conf.id = i.id;
          e.push(i.conf);
        }
        return e;
      }
    });
  }
  requestCreateConf(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
          gameId: t.id,
          id: e.id,
          data: e
        },
        i = yield n.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_SaveGameShop,
          params: o
        }, a.Game_RSaveGameShop);
      t.gameShopIds.push(i.id);
      return i.id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        gameId: null,
        id: e.id,
        data: e
      };
      yield n.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_SaveGameShop,
        params: t
      }, a.Game_RSaveGameShop);
    });
  }
  requestDeleteConf(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
        ids: [e.id]
      };
      yield n.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_DelGameShop,
        params: o
      }, a.Game_RDelGameShop);
      let i = t.gameShopIds.indexOf(e.id);
      i >= 0 && t.gameShopIds.splice(i, 1);
    });
  }
  getCostIconUrl(e) {
    return i(this, void 0, void 0, function* () {
      return e == l.GameGoodsCostType.Coin ? "Prop/coin" : "UI/coin";
    });
  }
};