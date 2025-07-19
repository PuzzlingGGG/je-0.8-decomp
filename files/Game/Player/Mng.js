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
exports.Mng = void 0;
const n = e("./../../GameScript/index"),
  a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../../scripts/_autogen/data/data"),
  r = e("../../Frame/NetworkMgr"),
  l = e("../../Frame/Top"),
  c = e("./AssetGroupMng"),
  d = e("./ActorMng"),
  h = e("./BulletMng"),
  p = e("./DeviceMng"),
  u = e("./GameMng"),
  m = e("./GameShopMng"),
  f = e("./GameRankMng"),
  g = e("./PropMng"),
  y = e("./PublishMng"),
  v = e("./SpriteMng"),
  C = e("./TileMng"),
  _ = e("./VariableMng"),
  S = e("./WeaponMng"),
  I = e("./WorldMng"),
  G = e("../../GameData/GameTypeDefine"),
  T = e("./GamePackageMng");
class b {
  constructor() {
    this.assetGroupMng = null;
    this.actorMng = null;
    this.bulletMng = null;
    this.gameMng = null;
    this.spriteMng = null;
    this.propMng = null;
    this.tileMng = null;
    this.weaponMng = null;
    this.deviceMng = null;
    this.worldMng = null;
    this.variableMng = null;
    this.gameShopMng = null;
    this.gameRankMng = null;
    this.actorMng = new d.default();
    this.bulletMng = new h.default();
    this.gameMng = new u.default();
    this.spriteMng = new v.default();
    this.propMng = new g.default();
    this.tileMng = new C.default();
    this.weaponMng = new S.default();
    this.worldMng = new I.default();
    this.deviceMng = new p.default();
    this.variableMng = new _.default();
    this.gameShopMng = new m.default();
    this.gameRankMng = new f.default();
    this.assetGroupMng = new c.default();
  }
  static initMine(e) {
    this.mine.gameMng.gameIds = e.role.games || [];
    this.mine.tileMng.customIds = e.roleGameConf.tileConfIds || [];
    this.mine.actorMng.customIds = e.roleGameConf.actorConfIds || [];
    this.mine.deviceMng.customIds = e.roleGameConf.deviceConfIds || [];
    this.mine.propMng.customIds = e.roleGameConf.propConfIds || [];
    this.mine.weaponMng.customIds = e.roleGameConf.weaponConfIds || [];
    this.mine.bulletMng.customIds = e.roleGameConf.bulletConfIds || [];
    this.mine.assetGroupMng.customGroups = e.customActorGroups || [];
  }
  static switchMine() {
    this.Ins = this.mine;
    this.resetExtra();
  }
  static switchMineGame(e) {
    return i(this, void 0, void 0, function* () {
      this.switchMine();
      let t = yield this.Ins.gameMng.loadOne(e);
      if (t.parnetGame) {
        l.default.showLoading("加载模版中..");
        let e = [],
          o = yield T.default.Ins.load(t.parnetGame.packUrl);
        if (o) {
          t.projectLayout || (t.projectLayout = o.gameData.projectLayout);
          let i = (e, o) => {
            e.forEach(e => {
              e.belongGameId = t.id;
              o.extraCache.set(e.id, e);
            });
          };
          i(o.tileConfs, this.Ins.tileMng);
          i(o.actorConfs, this.Ins.actorMng);
          i(o.deviceConfs, this.Ins.deviceMng);
          i(o.propConfs, this.Ins.propMng);
          i(o.weaponConfs, this.Ins.weaponMng);
          i(o.bulletConfs, this.Ins.bulletMng);
          i(o.gameShopConfs, this.Ins.gameShopMng);
          i(o.gameRankConfs, this.Ins.gameRankMng);
          for (let e of o.worldDatas) {
            this.Ins.worldMng.extraCache.set(e.id, e);
            e.info.selectedActorGroup = t.name;
            e.belongGameId = t.id;
            if (e.worldLayout && e.worldLayout.gsData) {
              e.worldLayout.gsData.worldId = e.id;
              n.GSMng.instance.load(e.worldLayout.gsData);
            }
          }
          for (let e = 0; e < o.gameData.variableDatas.length; e++) {
            let t = o.gameData.variableDatas[e];
            this.Ins.variableMng.extraCache.set(t.id, t);
            this.Ins.variableMng.extraIds.push(t.id);
          }
          let a = yield y.default.Ins.makeGamePackRaw(t.parnetGame.worldIds),
            s = (t, o, i) => {
              o.forEach(o => {
                t.extraIds.push(o.id);
                e.push({
                  confType: i,
                  confId: o.id
                });
              });
            };
          s(b.Ins.tileMng, a.tileConfs, G.CommonDataType.Tile);
          s(b.Ins.actorMng, a.actorConfs, G.CommonDataType.Actor);
          s(b.Ins.deviceMng, a.deviceConfs, G.CommonDataType.Device);
          s(b.Ins.propMng, a.propConfs, G.CommonDataType.Prop);
          s(b.Ins.weaponMng, a.weaponConfs, G.CommonDataType.Weapon);
          s(b.Ins.bulletMng, a.bulletConfs, G.CommonDataType.Bullet);
          a.worldDatas.forEach(e => {
            b.Ins.worldMng.extraIds.push(e.id);
          });
          a.gameShopConfs.forEach(e => {
            b.Ins.gameShopMng.extraIds.push(e.id);
          });
          a.gameRankConfs.forEach(e => {
            b.Ins.gameRankMng.extraIds.push(e.id);
          });
        } else l.default.hideLoading("加载模版失败");
        l.default.showLoading("加载数据中..");
        let i = {
            gameId: t.id
          },
          c = yield r.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_GetRoleCreativeConf,
            params: i
          }, a.Game_RGetRoleCreativeConf);
        if (c) {
          let t = (t, o, i) => {
            let n = c.confMap.get(o);
            if (n) for (let o in n) {
              i.extraCache.set(o, n[o]);
              i.extraIds.unshift(o);
              if (t >= 0) {
                let i = e.findIndex(e => e.confId == o);
                i >= 0 ? e[i] = {
                  confType: t,
                  confId: o
                } : e.unshift({
                  confType: t,
                  confId: o
                });
              }
            }
          };
          t(G.CommonDataType.Tile, s.CreativeAttrType.tile, b.Ins.tileMng);
          t(G.CommonDataType.Actor, s.CreativeAttrType.actor, b.Ins.actorMng);
          t(G.CommonDataType.Device, s.CreativeAttrType.device, b.Ins.deviceMng);
          t(G.CommonDataType.Prop, s.CreativeAttrType.prop, b.Ins.propMng);
          t(G.CommonDataType.Weapon, s.CreativeAttrType.weapon, b.Ins.weaponMng);
          t(G.CommonDataType.Bullet, s.CreativeAttrType.bullet, b.Ins.bulletMng);
          t(G.CommonDataType.Shop, s.CreativeAttrType.shop, b.Ins.gameShopMng);
          l.default.hideLoading();
        } else l.default.hideLoading("加载数据失败");
        b.Ins.assetGroupMng.initExtraGroup(t.name, e);
      }
    });
  }
  static switchGamePackage(e) {
    this.resetExtra();
    let t = this.mngCache.find(t => t.id == e.id),
      o = null;
    if (t) {
      o = t.mng;
      this.Ins = o;
    } else {
      o = new b();
      this.Ins = o;
      o.gameMng.appendCustom(e.gameData);
      o.worldMng.initWithGamePackage(e);
      o.tileMng.appendCustom(e.tileConfs);
      o.actorMng.appendCustom(e.actorConfs);
      o.deviceMng.appendCustom(e.deviceConfs);
      o.propMng.appendCustom(e.propConfs);
      o.weaponMng.appendCustom(e.weaponConfs);
      o.bulletMng.appendCustom(e.bulletConfs);
      o.gameShopMng.appendCustom(e.gameShopConfs);
      o.gameRankMng.appendCustom(e.gameRankConfs);
      this.mngCache.unshift({
        id: e.id,
        mng: o
      });
      this.mngCache = this.mngCache.slice(0, 3);
    }
  }
  static switchTalkProject(e) {
    return i(this, void 0, void 0, function* () {
      this.switchMine();
      let t = this.extraCache.find(t => t.id == e),
        o = [],
        i = yield this.Ins.gameMng.loadOne(e);
      yield this.Ins.variableMng.switchGame(i);
      if (t) {
        let e = (e, t, i) => {
          e.extraIds = t.extraIds || [];
          e.extraCache = t.extraCache || new Map();
          for (let t = 0; t < e.extraIds.length; t++) {
            let n = e.extraIds[t];
            o.push({
              confType: i,
              confId: n
            });
          }
        };
        e(b.Ins.tileMng, t.tileMng, G.CommonDataType.Tile);
        e(b.Ins.actorMng, t.actorMng, G.CommonDataType.Actor);
        e(b.Ins.deviceMng, t.deviceMng, G.CommonDataType.Device);
        e(b.Ins.propMng, t.propMng, G.CommonDataType.Prop);
        e(b.Ins.weaponMng, t.weaponMng, G.CommonDataType.Weapon);
        e(b.Ins.bulletMng, t.bulletMng, G.CommonDataType.Bullet);
        e(b.Ins.gameRankMng, t.gameRankMng, G.CommonDataType.Rank);
        e(b.Ins.gameShopMng, t.gameShopMng, G.CommonDataType.Shop);
      } else {
        let t = yield y.default.Ins.makeGamePackRaw(i.worldIds),
          a = (t, i, n) => {
            for (let a = 0; a < i.length; a++) {
              let s = i[a];
              s.belongGameId = e;
              t.extraIds.unshift(s.id);
              t.extraCache.set(s.id, s);
              o.push({
                confType: n,
                confId: s.id
              });
            }
          };
        a(b.Ins.tileMng, t.tileConfs, G.CommonDataType.Tile);
        a(b.Ins.actorMng, t.actorConfs, G.CommonDataType.Actor);
        a(b.Ins.deviceMng, t.deviceConfs, G.CommonDataType.Device);
        a(b.Ins.propMng, t.propConfs, G.CommonDataType.Prop);
        a(b.Ins.weaponMng, t.weaponConfs, G.CommonDataType.Weapon);
        a(b.Ins.bulletMng, t.bulletConfs, G.CommonDataType.Bullet);
        a(b.Ins.gameRankMng, t.gameRankConfs, G.CommonDataType.Rank);
        a(b.Ins.gameShopMng, t.gameShopConfs, G.CommonDataType.Shop);
        for (let e of t.worldDatas) {
          e.info.selectedActorGroup = i.name;
          this.Ins.worldMng.extraCache.set(e.id, e);
          if (e.worldLayout && e.worldLayout.gsData) {
            e.worldLayout.gsData.worldId = e.id;
            n.GSMng.instance.load(e.worldLayout.gsData);
          }
        }
        for (let e = 0; e < i.variableDatas.length; e++) {
          let t = i.variableDatas[e];
          this.Ins.variableMng.extraCache.set(t.id, t);
          this.Ins.variableMng.extraIds.push(t.id);
        }
        this.extraCache.unshift({
          id: e,
          tileMng: {
            extraIds: b.Ins.tileMng.extraIds,
            extraCache: b.Ins.tileMng.extraCache
          },
          actorMng: {
            extraIds: b.Ins.actorMng.extraIds,
            extraCache: b.Ins.actorMng.extraCache
          },
          deviceMng: {
            extraIds: b.Ins.deviceMng.extraIds,
            extraCache: b.Ins.deviceMng.extraCache
          },
          propMng: {
            extraIds: b.Ins.propMng.extraIds,
            extraCache: b.Ins.propMng.extraCache
          },
          weaponMng: {
            extraIds: b.Ins.weaponMng.extraIds,
            extraCache: b.Ins.weaponMng.extraCache
          },
          bulletMng: {
            extraIds: b.Ins.bulletMng.extraIds,
            extraCache: b.Ins.bulletMng.extraCache
          },
          gameRankMng: {
            extraIds: b.Ins.gameRankMng.extraIds,
            extraCache: b.Ins.gameRankMng.extraCache
          },
          gameShopMng: {
            extraIds: b.Ins.gameShopMng.extraIds,
            extraCache: b.Ins.gameShopMng.extraCache
          }
        });
        this.extraCache = this.extraCache.slice(0, 3);
      }
      b.Ins.assetGroupMng.initExtraGroup(i.name, o);
    });
  }
  static resetExtra() {
    return i(this, void 0, void 0, function* () {
      this.Ins.worldMng.tempCache.clear();
      this.Ins.worldMng.resetExtra();
      this.Ins.tileMng.resetExtra();
      this.Ins.actorMng.resetExtra();
      this.Ins.deviceMng.resetExtra();
      this.Ins.propMng.resetExtra();
      this.Ins.weaponMng.resetExtra();
      this.Ins.bulletMng.resetExtra();
      this.Ins.gameShopMng.resetExtra();
      this.Ins.variableMng.resetExtra();
      this.Ins.assetGroupMng.resetExtra();
    });
  }
}
exports.Mng = b;
b.Ins = null;
b.mine = new b();
b.mngCache = [];
b.extraCache = [];