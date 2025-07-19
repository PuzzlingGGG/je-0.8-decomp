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
exports.BaseConfMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../Frame/Top");
exports.BaseConfMng = class {
  constructor() {
    this.buildInIds = [];
    this.buildInCache = new Map();
    this.customIds = [];
    this.customCache = new Map();
    this.extraIds = [];
    this.extraCache = new Map();
  }
  appendBuildIn(e) {
    if (e) for (let t = 0; t < e.length; t++) {
      let o = e[t];
      this.buildInCache.set(o.id, o);
      this.buildInIds.includes(o.id) || o.disuse || this.buildInIds.push(o.id);
    }
  }
  appendCustom(e) {
    if (e) for (let t = 0; t < e.length; t++) {
      let o = e[t];
      this.customCache.set(o.id, o);
      this.customIds.includes(o.id) || this.customIds.unshift(o.id);
    }
  }
  appendExtra(e) {
    if (e) for (let t = 0; t < e.length; t++) {
      let o = e[t];
      this.extraCache.set(o.id, o);
      this.extraIds.includes(o.id) || this.extraIds.unshift(o.id);
    }
  }
  resetExtra() {
    this.extraIds = [];
    this.extraCache = new Map();
  }
  create(e, t) {
    return i(this, void 0, void 0, function* () {
      if (e.belongGameId) {
        e.id = `${e.belongGameId}+${orange.TimeUtil.serverTime}`;
        let t = {
          gameId: e.belongGameId,
          confType: this.creativeConfType,
          confId: e.id,
          data: e
        };
        if (!(yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_SaveRoleCreativeConf,
          params: t
        }, n.Game_RSaveRoleCreativeConf))) {
          s.default.showToast("网路错误，创建失败！");
          return null;
        }
        this.extraCache.set(e.id, e);
        this.extraIds.unshift(e.id);
        return e;
      }
      let o = yield this.requestCreateConf(e, t);
      if (o) {
        e.id = o;
        this.customCache.set(e.id, e);
        this.customIds.unshift(e.id);
        return e;
      }
    });
  }
  delete(e, t) {
    return i(this, void 0, void 0, function* () {
      if (!e) return;
      let o = e.id;
      if (e.belongGameId) {
        let t = {
          gameId: e.belongGameId,
          confType: this.creativeConfType,
          confId: e.id
        };
        if (!(yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_DelRoleCreativeConf,
          params: t
        }, n.Game_RDelRoleCreativeConf))) {
          s.default.showToast("网络错误，删除失败！");
          return;
        }
        let i = this.extraIds.indexOf(o);
        i >= 0 && this.extraIds.splice(i, 1);
        this.extraCache.delete(e.id);
        return;
      }
      yield this.requestDeleteConf(e, t);
      this.customCache.delete(o);
      let i = this.customIds.indexOf(o);
      i >= 0 && this.customIds.splice(i, 1);
    });
  }
  save(e) {
    return i(this, void 0, void 0, function* () {
      if (e.belongGameId) {
        let t = {
          gameId: e.belongGameId,
          confType: this.creativeConfType,
          confId: e.id,
          data: e
        };
        yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_SaveRoleCreativeConf,
          params: t
        }, n.Game_RSaveRoleCreativeConf);
        this.extraCache.set(e.id, e);
      } else {
        yield this.requestSaveConf(e);
        this.customCache.set(e.id, e);
      }
    });
  }
  loadOne(e) {
    return i(this, void 0, void 0, function* () {
      yield this.loadMany([e]);
      return this.getOne(e);
    });
  }
  getOne(e) {
    let t = this.extraCache.get(e);
    t || (t = this.customCache.get(e));
    t || (t = this.buildInCache.get(e));
    return t;
  }
  loadAll(e) {
    return i(this, void 0, void 0, function* () {
      return yield this.loadMany(this.getAllIds(e));
    });
  }
  getAllIds(e) {
    let t = this.extraIds.concat(this.customIds);
    e && (t = t.concat(this.buildInIds));
    for (let e = 0; e < t.length; e++) {
      let o = t[e];
      for (let i = e + 1; i < t.length; i++) if (t[i] == o) {
        t.splice(e, 1);
        e--;
        break;
      }
    }
    return t;
  }
  loadMany(e) {
    return i(this, void 0, void 0, function* () {
      let t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        !i || this.customCache.has(i) || this.extraCache.has(i) || this.buildInCache.has(i) || t.push(i);
      }
      if (t.length > 0) {
        let e = yield this.requestLoadConf(t);
        for (let o = 0; o < t.length; o++) {
          let i = t[o],
            n = e.find(e => e.id == i);
          n && this.upgradeConf(n);
          this.customCache.set(i, n);
        }
      }
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = e[t],
          n = this.getOne(i);
        n && o.push(n);
      }
      return o;
    });
  }
  upgradeConf(e) {}
  requestLoadConf(e) {
    return i(this, void 0, void 0, function* () {
      return [];
    });
  }
  requestCreateConf(e, t) {
    return i(this, void 0, void 0, function* () {
      return "";
    });
  }
  requestSaveConf(e) {
    return i(this, void 0, void 0, function* () {});
  }
  requestDeleteConf(e, t) {
    return i(this, void 0, void 0, function* () {});
  }
};