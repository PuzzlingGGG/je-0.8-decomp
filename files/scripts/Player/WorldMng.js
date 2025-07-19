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
const n = e("./../../GameScript/index"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../Frame/Util");
exports.default = class {
  constructor() {
    this.cache = new Map();
    this.tempCache = new Map();
    this.extraIds = [];
    this.extraCache = new Map();
    this._effectPoolMap = new Map();
  }
  initWithGamePackage(e) {
    if (e && e.worldDatas) for (let t = 0; t < e.worldDatas.length; t++) {
      let o = e.worldDatas[t];
      this.cache.set(o.id, o);
      o.worldLayout.gsData && (o.worldLayout.gsData.worldId = o.id);
      n.GSMng.instance.load(o.worldLayout.gsData);
    }
  }
  create(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
          id: null,
          gameId: t.id,
          info: e.info,
          layoutMin: e.layoutMin
        },
        i = yield a.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_SaveWorldData,
          params: o
        }, s.Game_RSaveWorldData);
      if (!i) return null;
      e.id = i.id;
      t.worldIds.push(e.id);
      this.cache.set(e.id, e);
      e.layoutMin = void 0;
      return e;
    });
  }
  delete(e, t) {
    return i(this, void 0, void 0, function* () {
      if (t) {
        t.projectLayout && delete t.projectLayout.worldCellPos[e];
        let o = t.worldIds.indexOf(e);
        o >= 0 && t.worldIds.splice(o, 1);
      }
      this.cache.delete(e);
      let o = {
        ids: [e]
      };
      yield a.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_DelWorldData,
        params: o
      }, s.Game_RDelWorldData);
    });
  }
  save(e, t = !1) {
    return i(this, void 0, void 0, function* () {
      let o = {
        id: e.id,
        info: e.info,
        layoutMin: t ? e.layoutMin : null,
        gameId: null
      };
      if (!(yield a.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_SaveWorldData,
        params: o
      }, s.Game_RSaveWorldData))) return null;
      this.cache.set(e.id, e);
      cc.game.emit("WorldDataChange", e);
      return e;
    });
  }
  loadOne(e, t = !1) {
    return i(this, void 0, void 0, function* () {
      yield this.loadMany([e], t);
      return this.getOne(e);
    });
  }
  getOne(e) {
    let t = this.tempCache.get(e);
    t || (t = this.extraCache.get(e));
    t || (t = this.cache.get(e));
    return t;
  }
  loadMany(e, t = !1) {
    return i(this, void 0, void 0, function* () {
      let o = [];
      for (let i = 0; i < e.length; i++) {
        let n = e[i],
          a = this.getOne(n);
        t ? a && (a.layoutMin || a.worldLayout) || o.push(n) : a || o.push(n);
      }
      o.length > 0 && (yield this.requestConf(o, t));
      let i = [];
      for (let t = 0; t < e.length; t++) {
        let o = e[t],
          n = this.getOne(o);
        n && i.push(n);
      }
      return i;
    });
  }
  getMany(e) {
    let t = [];
    for (let o = 0; o < e.length; o++) {
      let i = this.cache.get(e[o]);
      i && t.push(i);
    }
    return t;
  }
  requestConf(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
          ids: e,
          needData: t
        },
        i = yield a.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_GetWorldData,
          params: o
        }, s.Game_RGetWorldData);
      if (i) for (let o = 0; o < e.length; o++) {
        let a = i.datas[o];
        if (a) {
          let i = {
            id: a.id,
            info: a.info,
            layoutMin: a.layoutMin
          };
          if (t) {
            if (i.layoutMin) {
              i.worldLayout = r.Util.unzip(i.layoutMin);
              for (let e = 0; e < i.worldLayout.tiles.length; e++) {
                let t = i.worldLayout.tiles[e].data;
                delete t.name;
                delete t.author;
                delete t.textureName;
              }
              i.layoutMin = void 0;
            }
            i.worldLayout.gsData && (i.worldLayout.gsData.worldId = i.id);
            n.GSMng.instance.load(i.worldLayout.gsData);
            i.worldLayout.cameraRatio = i.worldLayout.cameraRatio || 1;
          }
          this.cache.set(e[o], i);
        }
      }
    });
  }
  getTileData(e, t) {
    let o = this.getOne(e);
    if (!o.worldLayout || !o.worldLayout.tiles) return null;
    let i = o.worldLayout.tiles;
    for (let e of i) if (e.data.id == t) return e;
    return null;
  }
  getActorData(e, t) {
    let o = this.getOne(e);
    if (!o.worldLayout || !o.worldLayout.actors) return null;
    let i = o.worldLayout.actors;
    for (let e of i) if (e.data.id == t) return e;
    return null;
  }
  getDeviceData(e, t) {
    let o = this.getOne(e);
    if (!o.worldLayout || !o.worldLayout.devices) return null;
    let i = o.worldLayout.devices;
    for (let e of i) if (e.data.id == t) return e;
    return null;
  }
  getEffect(e) {
    return i(this, void 0, void 0, function* () {
      this._effectPoolMap.has(e) || this._effectPoolMap.set(e, {
        prefab: null,
        pool: []
      });
      let t = this._effectPoolMap.get(e);
      t.prefab || (t.prefab = yield r.Util.loadBundleRes("Prefab/Effect/" + e));
      return t.pool.length > 0 ? t.pool.shift() : cc.instantiate(t.prefab);
    });
  }
  backEffect(e, t) {
    this._effectPoolMap.has(e) || this._effectPoolMap.set(e, {
      prefab: null,
      pool: []
    });
    let o = this._effectPoolMap.get(e);
    o.pool.indexOf(t) < 0 && o.pool.push(t);
  }
  resetExtra() {
    this.extraCache.clear();
    this.extraIds = [];
  }
};