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
  s = e("../../Frame/NetworkMgr"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("./Mng");
class c {
  constructor() {
    this.curGroupName = "";
    this.customGroups = [];
    this.rpg = new a.ActorGroupData();
    this.jump = new a.ActorGroupData();
    this.all = new a.ActorGroupData();
    this.extra = new a.ActorGroupData();
  }
  isGroupNameExist(e) {
    return e == c.RpgGroupName || e == c.JumpGroupName || e == c.AllGroupName || !!this.customGroups.find(t => t.groupName == e);
  }
  updateBuildInGroup() {
    return i(this, void 0, void 0, function* () {
      let e = this.getAllActorConfs();
      this.all.groupName = c.AllGroupName;
      this.rpg.groupName = c.RpgGroupName;
      this.jump.groupName = c.JumpGroupName;
      yield l.Mng.Ins.tileMng.loadAll();
      yield l.Mng.Ins.actorMng.loadAll();
      yield l.Mng.Ins.deviceMng.loadAll();
      yield l.Mng.Ins.propMng.loadAll();
      yield l.Mng.Ins.weaponMng.loadAll();
      yield l.Mng.Ins.bulletMng.loadAll();
      this.all.refDataList = [];
      this.rpg.refDataList = [];
      this.jump.refDataList = [];
      for (let t of e) {
        let e = new a.ActorGroupRefData();
        e.confId = t.confId;
        e.confType = t.confType;
        this.all.refDataList.push(e);
        if (t.confType == r.CommonDataType.Tile) {
          let o = l.Mng.Ins.tileMng.getOne(t.confId);
          if (o) if (o.tileType == r.TileType.Jump) this.jump.refDataList.push(e);else if (o.tileType == r.TileType.RPG) this.rpg.refDataList.push(e);else if (o.tileType == r.TileType.All) {
            this.jump.refDataList.push(e);
            this.rpg.refDataList.push(e);
          }
        } else {
          this.rpg.refDataList.push(e);
          this.jump.refDataList.push(e);
        }
      }
    });
  }
  getAllActorConfs() {
    let e = [],
      t = l.Mng.Ins.tileMng.getAllIds(!0);
    for (let o of t) e.push({
      confType: r.CommonDataType.Tile,
      confId: o
    });
    t = l.Mng.Ins.actorMng.getAllIds(!0);
    for (let o of t) e.push({
      confType: r.CommonDataType.Actor,
      confId: o
    });
    t = l.Mng.Ins.deviceMng.getAllIds(!0);
    for (let o of t) e.push({
      confType: r.CommonDataType.Device,
      confId: o
    });
    t = l.Mng.Ins.propMng.getAllIds(!0);
    for (let o of t) e.push({
      confType: r.CommonDataType.Prop,
      confId: o
    });
    t = l.Mng.Ins.weaponMng.getAllIds(!0);
    for (let o of t) e.push({
      confType: r.CommonDataType.Weapon,
      confId: o
    });
    t = l.Mng.Ins.bulletMng.getAllIds(!0);
    for (let o of t) e.push({
      confType: r.CommonDataType.Bullet,
      confId: o
    });
    return e;
  }
  initExtraGroup(e, t) {
    return i(this, void 0, void 0, function* () {
      this.extra.groupName = e;
      this.extra.refDataList = t;
      this.curGroupName = e;
    });
  }
  findGroup(e) {
    return i(this, void 0, void 0, function* () {
      if (e == c.AllGroupName) {
        yield this.updateBuildInGroup();
        return this.all;
      }
      if (e == c.RpgGroupName) {
        yield this.updateBuildInGroup();
        return this.rpg;
      }
      if (e == c.JumpGroupName) {
        yield this.updateBuildInGroup();
        return this.jump;
      }
      return e == this.extra.groupName ? this.extra : this.customGroups.find(t => t.groupName == e);
    });
  }
  save(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        groupName: e.groupName,
        refDataList: e.refDataList
      };
      if (yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveActorGroups,
        params: t
      }, n.Game_RSaveActorGroups)) {
        this.customGroups.find(t => t.groupName == e.groupName) || this.customGroups.unshift(e);
        return e;
      }
    });
  }
  delete(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.customGroups.findIndex(t => t.groupName == e);
      if (t < 0) return;
      let o = {
        groupName: e
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_DelActorGroups,
        params: o
      }, n.Game_RDelActorGroups);
      this.customGroups.splice(t, 1);
    });
  }
  curGroupAppend(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.curGroupName;
      if (t == this.extra.groupName || e.belongGameId) {
        let t = new a.ActorGroupRefData();
        t.confId = e.id;
        t.confType = e.type;
        this.extra.refDataList.unshift(t);
      } else if (t !== c.RpgGroupName && t !== c.JumpGroupName && t !== c.AllGroupName) {
        let t = yield this.findGroup(this.curGroupName);
        if (t) {
          let o = new a.ActorGroupRefData();
          exports.confId = e.id;
          exports.confType = e.type;
          t.refDataList.unshift(o);
          yield this.save(t);
        }
      }
    });
  }
  resetExtra() {
    this.extra.groupName = "";
    this.extra.refDataList = [];
  }
}
exports.default = c;
c.RpgGroupName = "俯视冒险";
c.JumpGroupName = "平台跳跃";
c.AllGroupName = "所有素材";