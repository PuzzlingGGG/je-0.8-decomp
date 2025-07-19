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
exports.GameRankType = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../../scripts/_autogen/data/data"),
  s = e("../../Frame/NetworkMgr"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("./BaseConfMng");
(function (e) {
  e[e.ShortTime = 0] = "ShortTime";
  e[e.LongTime = 1] = "LongTime";
  e[e.PropRank = 2] = "PropRank";
  e[e.CustomRank = 3] = "CustomRank";
})(o.GameRankType || (exports.GameRankType = {}));
exports.default = class extends l.BaseConfMng {
  constructor() {
    super();
    this.confType = r.CommonDataType.Rank;
    this.creativeConfType = a.CreativeConfType.shop;
  }
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetGameRank,
          params: t
        }, n.Game_RGetGameRank);
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
          cycleType: e.cycleType,
          sortType: e.sortType,
          data: e
        },
        i = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_SaveGameRank,
          params: o
        }, n.Game_RSaveGameRank);
      t.gameRankIds.push(i.id);
      return i.id;
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        gameId: e.belongGameId,
        confType: a.CreativeConfType.rank,
        confId: e.id,
        data: e
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveRoleCreativeConf,
        params: t
      }, n.Game_RSaveRoleCreativeConf);
    });
  }
  requestDeleteConf(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
        ids: [e.id]
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelGameRank,
        params: o
      }, n.Game_RDelGameRank);
      let i = t.gameRankIds.indexOf(e.id);
      i >= 0 && t.gameRankIds.splice(i, 1);
    });
  }
  getCostIconUrl(e) {
    return i(this, void 0, void 0, function* () {
      return e == r.GameGoodsCostType.Coin ? "Prop/coin" : "UI/coin";
    });
  }
};