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
const n = e("../../GameScript/index"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../../scripts/_autogen/data/data");
exports.default = class {
  constructor() {
    this.extraIds = [];
    this.extraCache = new Map();
    this.gameData = null;
  }
  resetExtra() {
    this.extraIds = [];
    this.extraCache = new Map();
  }
  initWithGamePackage(e) {}
  switchGame(e) {
    return i(this, void 0, void 0, function* () {
      this.gameData = e;
      let t = Array.from(this.extraCache.values()),
        o = [].concat(t, e.variableDatas);
      n.GSVariableMng.instance.load(o);
    });
  }
  create(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          gameId: this.gameData.id,
          id: null,
          data: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_SaveVariable,
          params: t
        }, s.Game_RSaveVariable);
      if (!o) return null;
      e.id = o.id;
      this.gameData.variableDatas.push(e);
      return e;
    });
  }
  delete(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e]
      };
      if (!(yield a.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_DelVariable,
        params: t
      }, s.Game_RDelVariable))) return null;
      let o = this.gameData.variableDatas.indexOf(t => t.id == e);
      o >= 0 && this.gameData.variableDatas.splice(o, 1);
    });
  }
  save(e, t) {
    return i(this, void 0, void 0, function* () {
      if (t.belongGameId) {
        let e = {
          gameId: t.belongGameId,
          confType: r.CreativeConfType.variable,
          confId: t.id,
          data: t
        };
        yield a.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_SaveRoleCreativeConf,
          params: e
        }, s.Game_RSaveRoleCreativeConf);
        this.extraCache.set(t.id, t);
      } else {
        let o = {
          gameId: this.gameData.id,
          id: e,
          data: t
        };
        yield a.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_SaveVariable,
          params: o
        }, s.Game_RSaveVariable);
      }
    });
  }
  saveAll() {
    return i(this, void 0, void 0, function* () {
      let e = n.GSVariableMng.instance.getSaveData(),
        t = [];
      for (let o of e) {
        let e = new r.VariableData();
        e.gameId = this.gameData.id;
        e.id = o.id;
        e.data = o;
        t.push(e);
      }
      let o = {
        variableDatas: t
      };
      yield a.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_SaveAllVariable,
        params: o
      }, s.Game_RSaveAllVariable);
    });
  }
  loadOne(e) {
    return i(this, void 0, void 0, function* () {
      return this.gameData.variableDatas.find(t => t.id == e);
    });
  }
  loadAll() {
    return i(this, void 0, void 0, function* () {
      return this.gameData.variableDatas;
    });
  }
  getData(e) {
    return this.gameData.variableDatas.find(t => t.id == e);
  }
};