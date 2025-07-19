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
  s = e("../../Role"),
  r = e("../../../scripts/_autogen/data/data"),
  l = e("../OperationFlow");
exports.default = class {
  constructor() {
    this.gameIds = [];
    this.cache = new Map();
  }
  appendCustom(e) {
    this.cache.set(e.id, e);
  }
  create(e, t = null) {
    return i(this, void 0, void 0, function* () {
      let o = {
          id: "",
          name: e,
          playerId: s.default.Ins.role.id,
          advert: "",
          worldIds: [],
          gameShopIds: [],
          gameRankIds: [],
          variableIds: [],
          variableDatas: [],
          firstWorldId: "",
          version: "0.0.0",
          iconTextureName: "icon1",
          lastPublishStamp: 0,
          firstPublishStamp: 0,
          tags: [],
          coinPropId: "1",
          status: r.GameStatus.noPublish,
          offReason: [],
          creativeOp: {
            isOpenAll: !1,
            isClose: !0,
            openWorldIds: []
          },
          parnetGame: t
        },
        i = {
          id: null,
          creativeSourceUId: t ? t.id : null,
          data: o
        },
        l = yield n.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_SaveRoleGameData,
          params: i
        }, a.Game_RSaveRoleGameData);
      if (!l) return null;
      exports.id = l.id;
      this.cache.set(o.id, o);
      this.gameIds.unshift(o.id);
      return o;
    });
  }
  delete(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e]
      };
      if (!(yield n.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_DelRoleGameData,
        params: t
      }, a.Game_RDelRoleGameData))) return;
      this.cache.delete(e);
      let o = this.gameIds.indexOf(e);
      o >= 0 && this.gameIds.splice(o, 1);
    });
  }
  off(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e
      };
      if (!(yield n.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_OwnOffGame,
        params: t
      }, a.Game_ROwnOffGame))) return;
      let o = this.cache.get(e);
      o && (exports.status = r.GameStatus.off);
    });
  }
  save(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e.id,
        creativeSourceUId: null,
        data: e
      };
      if (!(yield n.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_SaveRoleGameData,
        params: t
      }, a.Game_RSaveRoleGameData))) return null;
      let o = this.cache.get(e.id);
      o ? Object.assign(o, e) : this.cache.set(e.id, e);
      cc.game.emit("GameDataChange", e);
      return e;
    });
  }
  loadOne(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.cache.get(e);
      if (!t) {
        yield this.requestConf([e]);
        t = this.cache.get(e);
      }
      return t;
    });
  }
  getOne(e) {
    return this.cache.get(e);
  }
  loadMany(e) {
    return i(this, void 0, void 0, function* () {
      let t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        this.cache.has(i) || t.push(i);
      }
      t.length > 0 && (yield this.requestConf(t));
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = e[t],
          n = this.getOne(i);
        n && o.push(n);
      }
      return o;
    });
  }
  loadAll() {
    return i(this, void 0, void 0, function* () {
      return yield this.loadMany(this.gameIds);
    });
  }
  requestConf(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          ids: e
        },
        o = yield n.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_GetRoleGameData,
          params: t
        }, a.Game_RGetRoleGameData);
      if (o) for (let t = 0; t < e.length; t++) {
        let i = o.datas[t];
        if (!i) continue;
        let n = i.data;
        n.id = i.id;
        n.lastPublishStamp = i.lastPublishTime;
        n.firstPublishStamp = i.firstPublishTime;
        n.thumbCnt = i.thumbCnt;
        n.collectionCnt = i.collectionCnt;
        n.hurryCnt = i.hurryCnt;
        n.playCnt = i.playCnt;
        n.worldIds = i.worldIds;
        n.gameShopIds = i.gameShopIds || [];
        n.gameRankIds = i.gameRankIds || [];
        n.isOff = i.isOff;
        n.thawTime = i.thawTime;
        n.status = i.status;
        n.offReason = l.OperationFlow.makeOffReason(i.offReason);
        n.creativeOp || (n.creativeOp = {
          isOpenAll: !1,
          isClose: !0,
          openWorldIds: []
        });
        if (i.variableIds && i.variableDatas) {
          let e = i.variableIds.length;
          for (let t = 0; t < e; ++t) i.variableDatas[t] && (i.variableDatas[t].id = i.variableIds[t]);
        }
        n.variableDatas = i.variableDatas;
        i.isOldTangData && (n.isOldTangData = !0);
        this.cache.set(e[t], n);
      }
    });
  }
};