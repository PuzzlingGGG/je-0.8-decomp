"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../Frame/Config"),
  r = e("../../Frame/Damager"),
  l = e("../../Frame/FightSystem"),
  c = e("../../Frame/Hper"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/UIColor"),
  u = e("../../Frame/Util"),
  m = e("../../GameData/GameTypeDefine"),
  f = e("../../Scene/GameScene/GameScene"),
  g = e("../GameBoard"),
  y = e("../Player/GamePetMng"),
  v = e("../Player/GameSaveMng"),
  C = e("../Player/Mng"),
  _ = e("../Player/SpriteMng"),
  S = e("../Player/TriggerMng"),
  I = e("./AICtrl/Com/AiComDirLineMover"),
  G = e("./Gizmos/TeamGizmo"),
  T = e("./Tile"),
  b = e("./Weapon/Weapon"),
  M = e("./WorldNodeBody"),
  {
    ccclass: P,
    property: D
  } = cc._decorator;
let w = i = class extends M.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.gun = null;
    this.spFireCd = null;
    this.hper = null;
    this.damager = null;
    this.teamGizmo = null;
    this.data = null;
    this._isShowFireCd = !1;
    this._fireCdEndTime = 0;
    this.flashTime = 0;
    this.flashEndCall = null;
    this.hpBar = null;
    this._dir = new cc.Vec2();
    this._petList = [];
  }
  get dataId() {
    return this.data.id;
  }
  get gravity() {
    return this.data ? -this.data.g : 0;
  }
  static createActorData(e, t, o) {
    let i = "actor" + o.incId++,
      n = {
        confId: e.id,
        id: i,
        name: e.name,
        team: t,
        author: "",
        isBuildIn: e.isBuildIn,
        gunId: e.gunId,
        hp: e.hp,
        hpMax: e.hp,
        scale: e.scale,
        jumpHight: 0,
        jumpStep: 0,
        aiMoveType: m.AIMoveType.None,
        beatenLockHpTime: .8,
        moveSpeed: 3 * T.default.SIZE,
        faceX: 1,
        g: 1500
      };
    o.type == m.WorldType.Rpg ? s.FillActorDataHelper.fillActorDataByRpgConf(n, e.rpgConf) : o.type == m.WorldType.Jump && s.FillActorDataHelper.fillActorDataByJumpPlatformConf(n, e.jumpPlatformConf);
    return n;
  }
  onLoad() {
    super.onLoad();
    cc.game.on(_.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
    this.node.on(l.FightSystem.Event.Beaten, this.onBeaten, this);
    this.hper = this.node.getComponent(c.default);
    this.damager = this.node.getComponent(r.default);
    this.spFireCd && (this.spFireCd.node.parent.active = !1);
  }
  reset() {}
  setProperty(e, t, o, i, n) {
    let a = typeof this.data[e];
    if ("boolean" == a) {
      let o = "true" == t || "1" == t;
      this.data[e] = o;
      "isShow" == e && (this.node.active = o);
    } else if ("number" == a) {
      let a = parseFloat(t);
      Number.isNaN(a) && (a = 0);
      o && (a *= -1);
      n && (a *= T.default.SIZE);
      if ("team" == e) {
        this.data[e] = a;
        this.setTeam(a);
      } else {
        (i || o) && (a += this.data[e]);
        this.data[e] = a;
        if ("hp" == e) {
          this.hper.hp = a;
          a <= 0 && this.doDead();
        } else "hpMax" == e ? this.hper.HpMax = a : "scale" == e && (this.node.scale = a);
      }
    } else if ("string" == a) {
      this.data[e] = t;
      "gunId" == e && this.setupGun(this.data.gunId);
    } else console.error(`>>not support actor property[${e}] type[${a}]`);
  }
  onDisable() {
    super.onDisable && super.onDisable();
    this.setHpBar(null);
  }
  onDestroy() {
    super.onDestroy && super.onDestroy();
    this.setHpBar(null);
    cc.game.off(_.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
  }
  setCutting(e) {
    this.sprite.enabled = !e;
    this.gun && this.gun.setCutting(e);
  }
  showFireCd(e) {
    if (!(e <= 0 || this.data.team != m.Team.Hero)) {
      this._isShowFireCd = !0;
      this._fireCdTotolTime = 1e3 * e;
      this._fireCdEndTime = cc.director.getTotalTime() + this._fireCdTotolTime;
      if (this.spFireCd) {
        this.spFireCd.node.parent.active = !0;
        this.spFireCd.fillRange = 0;
      }
    }
  }
  updateFireCd() {
    if (!this._isShowFireCd) return;
    let e = 1 - (this._fireCdEndTime - cc.director.getTotalTime()) / this._fireCdTotolTime;
    if (e > 1) {
      e = 1;
      this._isShowFireCd = !1;
    }
    e < 0 && (e = 0);
    if (this.spFireCd) {
      this.spFireCd.fillRange = e;
      this._isShowFireCd || (this.spFireCd.node.parent.active = !1);
    }
  }
  onPixelsUpdate(e, t) {
    return a(this, void 0, void 0, function* () {
      this._conf && this._conf.id == e && C.Mng.Ins.spriteMng.setActorSprite(this.sprite, t, 64);
    });
  }
  initDataDefaultValue() {
    this.data.scale = this.data.scale || 1;
    this.data.onHeroEnter = this.data.onHeroEnter || [];
    this.data.onDie = this.data.onDie || [];
    this.data.onBeaten = this.data.onBeaten || [];
    this.data.onJump = this.data.onJump || [];
    this.data.onMove = this.data.onMove || [];
    this.data.onGroundMove = this.data.onGroundMove || [];
    this.data.onAirMove = this.data.onAirMove || [];
    this.data.aiMoveType = this.data.aiMoveType || m.AIMoveType.None;
    this.data.aiMoveType == m.AIMoveType.PlatformJump_DirLine && (this.data.dirLineMoveData = this.data.dirLineMoveData || {
      moveDir: m.MoveDirType.Up,
      speed: 2,
      distance: 2
    });
    this.data.team = this.data.team || m.Team.None;
    "string" == typeof this.data.beatenLockHpTime && (this.data.beatenLockHpTime = parseInt(this.data.beatenLockHpTime) || .8);
    this.data.beatenLockHpTime = this.data.beatenLockHpTime || 0;
    this.data.moveSpeed = this.data.moveSpeed || 3 * T.default.SIZE;
    this.data.jumpInterval = this.data.jumpInterval || 0;
    this.data.traceHeroRange = this.data.traceHeroRange || 5 * T.default.SIZE;
    null == this.data.beatenBackRange && (this.data.beatenBackRange = 1.8);
    this.data.enableClimbWall = this.data.enableClimbWall || !1;
    this.data.isShow = this.data.isShow || !0;
  }
  get conf() {
    return this._conf;
  }
  setData(e) {
    return a(this, void 0, void 0, function* () {
      this.spFireCd && (this.spFireCd.node.parent.active = !1);
      this._petList.length = 0;
      let t = this.world;
      t.isGameScene && (e = u.Util.deepCopy(e));
      this.data = e;
      e.hpMax = e.hpMax || e.hp;
      this.flashEndCall = null;
      this.initDataDefaultValue();
      this.node.active = e.isShow;
      e.faceX && this.setScaleX(e.faceX);
      this.setTeam(e.team);
      this._lastSyncHp = e.hp;
      this.hper.lockHp = !1;
      this.hper.hp = e.hp;
      this.hper.HpMax = e.hpMax;
      this.damager.enabled = e.team == m.Team.Enemy;
      this.node.scale = e.scale;
      if (t.worldLayout.type == m.WorldType.Rpg) {
        this._boundingBoxExtInTiledPhysics.x = 0;
        this._boundingBoxExtInTiledPhysics.y = -13;
        this._boundingBoxExtInTiledPhysics.width = 0;
        this._boundingBoxExtInTiledPhysics.height = -26;
      } else {
        this._boundingBoxExtInTiledPhysics.x = 0;
        this._boundingBoxExtInTiledPhysics.y = 0;
        this._boundingBoxExtInTiledPhysics.width = 0;
        this._boundingBoxExtInTiledPhysics.height = 0;
      }
      this.node.width = 48;
      this.node.height = 52;
      let o = yield C.Mng.Ins.actorMng.loadOne(e.confId);
      this._conf = o;
      if (o) {
        let e = o.collider || {
            offset: {
              x: 0,
              y: 0
            },
            size: {
              w: 48,
              h: 52
            }
          },
          t = this.node.getComponent(cc.BoxCollider);
        t.size = cc.size(e.size.w, e.size.h);
        t.offset = cc.v2(e.offset.x, e.offset.y);
        C.Mng.Ins.spriteMng.setActorSprite(this.sprite, o.textureName, 64);
      }
      yield this.setupGun(e.gunId);
    });
  }
  setTeam(e) {
    this.hper.team = e;
    this.damager.team = e;
    e == m.Team.Hero || e == m.Team.NPC || e == m.Team.Ally ? this.damager.dmg = 0 : e == m.Team.Enemy && (this.damager.dmg = 1);
    let t = this.world;
    t.isGameScene || t.hero != this && e != m.Team.Hero || t.onReCheckHero();
    this.LoadHpBar(e);
  }
  get weaponContext() {
    this._weaponContext || (this._weaponContext = {
      noticeFire: this.showFireCd.bind(this)
    });
    return this._weaponContext;
  }
  setupGun(e) {
    return a(this, void 0, void 0, function* () {
      this.gun.team = this.data.team;
      this.data.gunId = e;
      let t = yield C.Mng.Ins.weaponMng.loadOne(e);
      if (this.node) {
        this.gun.firing = !1;
        if (t) {
          yield this.gun.setData(t, this.weaponContext);
          this.gun.node.active = !0;
        } else {
          yield this.gun.setData(null, null);
          this.gun.node.active = !1;
        }
      }
    });
  }
  onCollisionEnter(e, t) {
    let o = this.world;
    o.playing && !o.isHeroActor(t.node) && o.isHeroActor(e.node) && this.data && S.default.Ins.emitTrigger(this.data.onHeroEnter, this.node);
  }
  onBeaten(e) {
    let t = this.world;
    this.data.hp = this.hper.hp;
    if (e.dmg > 0) {
      let o = this.node.position;
      exports.y += this.node.height / 2;
      t.playFloatLabel({
        str: "-" + e.dmg,
        pos: o,
        color: cc.Color.RED,
        anim: "JumpLabel",
        size: 60
      });
      S.default.Ins.emitTrigger(this.data.onBeaten, this.node);
      if (e.causeDeath) this.doDead();else {
        "string" == typeof this.data.beatenLockHpTime && (this.data.beatenLockHpTime = parseFloat(this.data.beatenLockHpTime));
        let e = this.data.beatenLockHpTime || 0;
        this.hper.lockHp = !0;
        this.playFlashAnim(e, () => {
          this.hper.lockHp = !1;
        });
      }
    }
  }
  doDead() {
    let e = this.world;
    this.data.onlyOnce && v.default.Ins.setActorFlag(e.worldData.id, this.data.id);
    this.hper.hp = 0;
    this.gun.firing = !1;
    this.damager.enabled = !1;
    this.data.hp = this.data.hpMax;
    this.playFlashAnim(1.5, () => {
      S.default.Ins.emitTrigger(this.data.onDie, this.node);
      if (this.data.team == m.Team.Hero) S.default.Ins.emitTrigger([{
        act: m.TriggerAct.GameOver
      }], this.node);else {
        e.removeActor(this);
        this.data.team == m.Team.Ally && e.hero && e.hero.removePet(this.world.id);
      }
    });
  }
  setScaleX(e) {
    this.sprite.node.scaleX = e;
    this.data.faceX = e;
  }
  getScaleX() {
    return this.sprite.node.scaleX;
  }
  getTeamGizmo() {
    return a(this, void 0, void 0, function* () {
      if (!this.teamGizmo) {
        let e = yield u.Util.loadBundleRes("Prefab/TeamGizmo"),
          t = cc.instantiate(e);
        this.node.addChild(t);
        let o = t.getComponent(G.default);
        this.teamGizmo = o;
      }
      return this.teamGizmo;
    });
  }
  initInspector(e) {
    let t = this.world.worldLayout.type;
    e.reset();
    i.initInspectHead(e, this.data, this._conf);
    t == m.WorldType.Rpg ? i.initInspectorRPG(e, this.data, this.data, this, this.gun.conf, () => {
      this.initInspector(e);
    }) : i.initInspectorPlatformJump(e, this.data, this.data, this, this.gun.conf, () => {
      this.initInspector(e);
    });
  }
  static displayConfInspector(e, t, o, n) {
    return a(this, void 0, void 0, function* () {
      let a = yield C.Mng.Ins.weaponMng.loadOne(o.gunId);
      e == m.WorldType.Rpg ? i.initInspectorRPG(t, o, o.rpgConf, null, a, n) : i.initInspectorPlatformJump(t, o, o.jumpPlatformConf, null, a, n);
    });
  }
  static initInspectorRPG(e, t, o, i, n, a) {
    exports.onHeroEnter = o.onHeroEnter || [];
    exports.onDie = o.onDie || [];
    exports.onBeaten = o.onBeaten || [];
    exports.onMove = o.onMove || [];
    t.team = t.team || m.Team.None;
    this.initInspectTeam(e, i, t, a);
    let s = t.team;
    if (s != m.Team.NPC) {
      s == m.Team.Enemy && this.initInspectMoverType(e, o, [{
        str: "静止",
        type: m.AIMoveType.Grid_Static
      }, {
        str: "随机移动",
        type: m.AIMoveType.Grid_Random
      }], a);
      s == m.Team.Ally && this.initInspectMoverType(e, o, [{
        str: "静止",
        type: m.AIMoveType.Grid_Static
      }, {
        str: "随机移动",
        type: m.AIMoveType.Grid_Random
      }, {
        str: "跟随主角",
        type: m.AIMoveType.PlatformJump_FollowHero
      }], a);
      this.initInspectHPMax(e, t);
      this.initInspectWeapon(e, i, n, t);
      this.initInspectScale(e, i, t);
      this.initInspectMoveSpeed(e, o);
      this.initInspectBeatenLockHpTime(e, o);
      s == m.Team.Ally && e.addTrigger("当主角接触此角色时：", o.onHeroEnter, !0);
      s == m.Team.Enemy && e.addToggle("防刷怪物：", t.onlyOnce, e => {
        t.onlyOnce = e;
      });
      e.addTrigger("当此角色死亡时：", o.onDie, !0);
      e.addTrigger("当此角色受击时：", o.onBeaten, !0);
      e.addTrigger("当此角色移动时：", o.onMove, !0);
    } else e.addTrigger("当主角接触此角色时：", o.onHeroEnter, !0);
  }
  static initInspectorPlatformJump(e, t, o, i, n, a) {
    exports.onHeroEnter = o.onHeroEnter || [];
    exports.onDie = o.onDie || [];
    exports.onBeaten = o.onBeaten || [];
    exports.onJump = o.onJump || [];
    exports.onMove = o.onMove || [];
    exports.onGroundMove = o.onGroundMove || [];
    exports.onAirMove = o.onAirMove || [];
    t.team = t.team || m.Team.None;
    this.initInspectTeam(e, i, t, a);
    let s = t.team;
    if (s == m.Team.NPC) {
      e.addTrigger("当主角接触此角色时：", o.onHeroEnter, !0);
      return;
    }
    this.initInspectHPMax(e, t);
    this.initInspectWeapon(e, i, n, t);
    let r = !1;
    s == m.Team.Hero && (r = !0);
    if (s == m.Team.Enemy) {
      let t = this.initInspectMoverType(e, o, [{
        str: "静止",
        type: m.AIMoveType.PlatformJump_Static
      }, {
        str: "痴呆",
        type: m.AIMoveType.PlatformJump_IDLE
      }, {
        str: "地面-遇墙折返",
        type: m.AIMoveType.PlatformJump_Ground_WallBack
      }, {
        str: "地面-踩空折返",
        type: m.AIMoveType.PlatformJump_Ground_MisstepBack
      }, {
        str: "蹦跳-遇墙折返",
        type: m.AIMoveType.PlatformJump_Jump_WallBack
      }, {
        str: "蹦跳-追逐主角",
        type: m.AIMoveType.PlatformJump_Jump_Trace
      }, {
        str: "飞行",
        type: m.AIMoveType.PlatformJump_DirLine
      }], a);
      t.type != m.AIMoveType.PlatformJump_Jump_WallBack && t.type != m.AIMoveType.PlatformJump_Jump_Trace || (r = !0);
      if (t.type == m.AIMoveType.PlatformJump_DirLine) {
        exports.dirLineMoveData = o.dirLineMoveData || {
          moveDir: m.MoveDirType.Up,
          speed: 2,
          distance: 2
        };
        I.AiComDirLineMover.displayInspector(e, o.dirLineMoveData);
      }
    } else if (s == m.Team.Ally) {
      let t = this.initInspectMoverType(e, o, [{
        str: "静止",
        type: m.AIMoveType.PlatformJump_Static
      }, {
        str: "痴呆",
        type: m.AIMoveType.PlatformJump_IDLE
      }, {
        str: "地面-遇墙折返",
        type: m.AIMoveType.PlatformJump_Ground_WallBack
      }, {
        str: "地面-踩空折返",
        type: m.AIMoveType.PlatformJump_Ground_MisstepBack
      }, {
        str: "蹦跳-遇墙折返",
        type: m.AIMoveType.PlatformJump_Jump_WallBack
      }, {
        str: "蹦跳-追逐主角",
        type: m.AIMoveType.PlatformJump_Jump_Trace
      }, {
        str: "宠物",
        type: m.AIMoveType.PlatformJump_FollowHero
      }, {
        str: "飞行",
        type: m.AIMoveType.PlatformJump_DirLine
      }], a);
      t.type != m.AIMoveType.PlatformJump_Jump_WallBack && t.type != m.AIMoveType.PlatformJump_Jump_Trace || (r = !0);
      if (t.type == m.AIMoveType.PlatformJump_DirLine) {
        exports.dirLineMoveData = o.dirLineMoveData || {
          moveDir: m.MoveDirType.Up,
          speed: 2,
          distance: 2
        };
        I.AiComDirLineMover.displayInspector(e, o.dirLineMoveData);
      }
    }
    this.initInspectScale(e, i, t);
    this.initInspectMoveSpeed(e, o);
    if (r) {
      this.initInspectJumpHeight(e, o);
      this.initInspectJumpInterval(e, o);
      if (s == m.Team.Hero) {
        this.initInspectJumpStep(e, o);
        this.initInspectEnableClimbWall(e, o);
      }
    }
    this.initInspectBeatenLockHpTime(e, o);
    this.initInspectBeatenBackRange(e, o);
    s == m.Team.Enemy && e.addToggle("死亡后不再出现？", t.onlyOnce, e => {
      t.onlyOnce = e;
    });
    e.addTrigger("当此角色死亡时：", o.onDie, !0);
    e.addTrigger("当此角色受击时：", o.onBeaten, !0);
    e.addTrigger("当此角色地面移动时：", o.onGroundMove, !0);
    e.addTrigger("当此角色空中移动时：", o.onAirMove, !0);
    r && e.addTrigger("当此角色跳跃时：", o.onJump, !0);
  }
  static initInspectHead(e, t, o) {
    e.addHead(t.name, o ? o.textureName : void 0);
  }
  static initInspectTeam(e, t, o, i) {
    exports.team = o.team || m.Team.None;
    let n = [{
        str: "主角",
        team: m.Team.Hero
      }, {
        str: "队友",
        team: m.Team.Ally
      }, {
        str: "NPC",
        team: m.Team.NPC
      }, {
        str: "敌人",
        team: m.Team.Enemy
      }],
      s = n.findIndex(e => o.team == e.team),
      r = e.addDropDownBox("阵营", n, s, (e, n, l) => a(this, void 0, void 0, function* () {
        if (l) {
          if (t && n.team == m.Team.Hero) {
            let e = t.world;
            if (e.hero && e.hero != t) {
              r.dropDownBox.selectByIdx(s);
              h.default.showToast("只能放置一个主角");
              return;
            }
          }
          let e = o.team != n.team;
          exports.team = n.team;
          if (t) {
            t.setTeam(o.team);
            (yield t.getTeamGizmo()).setTeam(o.team);
            e && l && i && i();
          } else e && l && i && i();
        }
      }));
  }
  static initInspectMoverType(e, t, o, i) {
    let n = o.findIndex(e => e.type == t.aiMoveType);
    -1 == n && (n = 0);
    let a = e.addButton("移动方式", o[n].str, () => {
      d.default.ins.OpenPanelByName("SelectAIPanel", e => {
        e.setData(o, n);
        e.selectCall = e => {
          t.aiMoveType = e.type;
          a.button.label.string = e.str;
          i && i();
        };
      });
    });
    return o[n];
  }
  static initInspectHPMax(e, t) {
    let o = t.hpMax || t.hp;
    e.addNumberEditBox("血量", o, 1, 999999, e => {
      t.hp = e;
      t.hpMax = e;
    });
  }
  static initInspectWeapon(e, t, o, i) {
    let n = "无武器";
    o && (n = o.name);
    let a = e.addButton("武器", n, () => {
      d.default.ins.OpenPanelByName("SelectWeaponPanel", e => {
        e.setData(i.gunId);
        e.selectCall = e => {
          i.gunId = e.id;
          a.button.label.string = e.name;
          t && t.setupGun(e.id);
        };
      });
    });
  }
  static initInspectScale(e, t, o) {
    exports.scale = o.scale || 1;
    e.addNumberEditBox("缩放", o.scale, .2, 8, e => {
      exports.scale = e;
      if (t) {
        t.node.scale = o.scale;
        t.world.placeGizmos.setScale(o.scale);
      }
    });
  }
  static initInspectMoveSpeed(e, t) {
    e.addNumberEditBox("移动速度(格/秒)", t.moveSpeed / T.default.SIZE, .1, 100, e => {
      t.moveSpeed = e * T.default.SIZE;
    });
  }
  static initInspectJumpHeight(e, t) {
    e.addNumberEditBox("跳跃高度(格)", t.jumpHight / T.default.SIZE, .01, 32, e => {
      t.jumpHight = e * T.default.SIZE;
    });
  }
  static initInspectJumpInterval(e, t) {
    t.jumpInterval = t.jumpInterval || 0;
    e.addNumberEditBox("跳跃间隔(秒)", t.jumpInterval, 0, 5, e => {
      t.jumpInterval = e;
    });
  }
  static initInspectJumpStep(e, t) {
    e.addNumberEditBox("跳跃段数", t.jumpStep, 1, 999999, e => {
      e = Math.floor(e);
      t.jumpStep = e;
    });
  }
  static initInspectEnableClimbWall(e, t) {
    t.enableClimbWall = t.enableClimbWall || !1;
    e.addToggle("爬墙跳", t.enableClimbWall, e => {
      t.enableClimbWall = e;
    });
  }
  static initInspectBeatenLockHpTime(e, t) {
    t.beatenLockHpTime = t.beatenLockHpTime || .8;
    e.addNumberEditBox("受击后无敌(秒)", t.beatenLockHpTime, 0, 999999, e => {
      t.beatenLockHpTime = e;
    });
  }
  static initInspectBeatenBackRange(e, t) {
    t.beatenBackRange = t.beatenBackRange || 1.8;
    e.addNumberEditBox("受击被击飞(格)", t.beatenBackRange, 0, 10, e => {
      t.beatenBackRange = e;
    });
  }
  onDamageByTile(e) {
    if (!this.hper.isAlive()) return;
    let t = Math.ceil(e * this.hper.HpMax),
      o = this.hper.hp - t;
    o < 0 && (o = 0);
    this.hper.hp = o;
    this.onBeaten({
      hper: this.hper,
      damager: null,
      dmg: t,
      isCrit: !1,
      causeDeath: o <= 0
    });
  }
  playFlashAnim(e, t) {
    this.flashTime = e;
    this.flashEndCall = t;
  }
  update(e) {
    this.updateHpBar();
    this.updateFireCd();
    if (this.flashTime >= 0) {
      this.flashTime -= e;
      let t = Math.floor(10 * this.flashTime) % 2;
      this.sprite.node.opacity = 0 == t ? 255 : 0;
      if (this.flashTime < 0) {
        this.sprite.node.opacity = 255;
        this.flashEndCall && this.flashEndCall();
        this.flashEndCall = null;
      }
    }
  }
  LoadHpBar(e) {
    if (g.GameBoard.IS_EDITOR_MODE) return;
    let t = !1;
    !this.hper || e != m.Team.Enemy && e != m.Team.Ally || (t = !0);
    t ? this.hpBar ? this.setHpBar(this.hpBar) : i.CreateHpBar(this.setHpBar.bind(this)) : this.hpBar && this.setHpBar(null);
  }
  setHpBar(e) {
    if (null != e) {
      this.hpBar = e;
      this.data.team == m.Team.Enemy && (e.barSprite.node.color = p.UIColor.red);
      this.data.team == m.Team.Ally && (e.barSprite.node.color = p.UIColor.yellow);
      this.node.on(l.FightSystem.Event.HpChange, this.refreshHpBar, this);
      this.updateHpBar();
    } else if (this.hpBar) {
      this.hpBar.node.parent = null;
      this.node.off(l.FightSystem.Event.HpChange, this.refreshHpBar, this);
    }
  }
  updateHpBar() {
    if (!g.GameBoard.IS_EDITOR_MODE && this.hpBar && this.hpBar.node.parent) {
      let e = this.hpBar.node.position;
      e.set(this.node.position);
      e.y += this.node.height;
      this.hpBar.node.position = e;
      this._refreshHpbarTimer < cc.director.getTotalTime() && (this.hpBar.node.parent = null);
    }
  }
  refreshHpBar(e) {
    if (!(g.GameBoard.IS_EDITOR_MODE || this._lastSyncHp <= e)) {
      this._lastSyncHp = e;
      if (this.hpBar) {
        this._refreshHpbarTimer = cc.director.getTotalTime() + 1e3;
        this.hpBar.node.parent || (this.hpBar.node.parent = this.world.headContent);
        this.hpBar.progress = this.hper.hp / this.hper.HpMax;
      }
    }
  }
  static CreateHpBar(e) {
    let t = (e, t) => a(this, void 0, void 0, function* () {
      var o = cc.instantiate(e);
      exports.position = cc.Vec2.ZERO;
      t(o.getComponent(cc.ProgressBar));
    });
    this._hpBarPrefab ? t(this._hpBarPrefab, e) : (e => a(this, void 0, void 0, function* () {
      let o = yield u.Util.loadBundleRes("Prefab/ActorUI/hpBar");
      this._hpBarPrefab = o;
      yield t(o, e);
    }))(e);
  }
  get dirx() {
    return this._dir.x;
  }
  get diry() {
    return this._dir.y;
  }
  setDir(e, t) {
    this._dir.x = e;
    this._dir.y = t;
    this.gun && this.gun.setDir(e, t);
  }
  get petList() {
    return this._petList;
  }
  addPet(e) {
    if (e && !(this._petList.length >= 3 || this._petList.findIndex(t => t.id == e.id) >= 0)) {
      this._petList.push(e);
      y.GamePetMng.Ins.RegPet(this.data.id, e.data);
      e.node.emit("onAddPet", this);
      cc.game.emit(f.default.HERO_PET_CHANGE);
    }
  }
  getPetPosIdx(e) {
    return this._petList.findIndex(t => t.id == e.id);
  }
  removePet(e) {
    let t = this._petList.findIndex(t => t.id == e),
      o = null;
    if (t >= 0) {
      o = this._petList[t];
      this._petList.splice(t, 1);
      y.GamePetMng.Ins.RemovePet(this.data.id, o.data.id);
    }
    o && o.node.emit("onRemovePet", this);
    cc.game.emit(f.default.HERO_PET_CHANGE);
  }
};
w.FOOT_CONTACT = "FOOT_CONTACT";
w.BODY_CONTACT = "BODY_CONTACT";
w.root = null;
w._hpBarPrefab = null;
n([D(cc.Sprite)], w.prototype, "sprite", void 0);
n([D(b.Weapon)], w.prototype, "gun", void 0);
n([D(cc.Sprite)], w.prototype, "spFireCd", void 0);
w = i = n([P], w);
exports.default = w;