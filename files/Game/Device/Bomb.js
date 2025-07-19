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
const s = e("../../Frame/Damager"),
  r = e("../../Frame/FightSystem"),
  l = e("../../Frame/TweenUtil"),
  c = e("../../Frame/Util"),
  d = e("../../GameData/GameTypeDefine"),
  h = e("../CollisionEmiter"),
  p = e("../Player/GameSaveMng"),
  u = e("../Player/Mng"),
  m = e("../World/Device"),
  f = e("../World/Tile"),
  g = e("../World/World"),
  {
    ccclass: y,
    property: v
  } = cc._decorator;
let C = i = class extends m.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.damager = null;
    this.anim = null;
    this.detonated = !1;
    this.explored = !1;
    this.detonateTime = 0;
  }
  onLoad() {
    this.anim = this.node.getComponent(cc.Animation);
    this.node.on(r.FightSystem.Event.Beaten, this.onBeaten, this);
    this.node.on(r.FightSystem.Event.BeatHper, this.onBeatHper, this);
    this.node.on(h.default.onCollisionEnter, this.onCollisionEnter, this);
    this.damager.node.active = !1;
  }
  onEnable() {
    this.world.node.on(g.default.PAUSE, this.onWorldPause, this);
    this.world.node.on(g.default.RESUME, this.onWorldResume, this);
  }
  onDisable() {
    this.world.node.off(g.default.PAUSE, this.onWorldPause, this);
    this.world.node.off(g.default.RESUME, this.onWorldResume, this);
  }
  onWorldPause() {
    this.detonated && this.anim.pause();
  }
  onWorldResume() {
    this.detonated && this.anim.resume();
  }
  onBeaten() {
    this.world.playing && this.detonate();
  }
  onBeatHper(e) {
    0 == e.dmg && l.TweenUtil.applyShakeShort(e.hper.node);
  }
  onCollisionEnter(e, t) {
    this.world.playing && this.detonate();
  }
  detonate() {
    if (!this.detonated) {
      this.detonated = !0;
      this.detonateTime = this.data.extra.detonateTime;
      this.anim.play();
      c.Util.loadBundleRes("Prefab/Effect/BombSpark");
    }
  }
  update(e) {
    if (this.world.playing && this.detonated) {
      this.detonateTime -= e;
      this.detonateTime < 0 && this.explore();
    }
  }
  explore() {
    return a(this, void 0, void 0, function* () {
      if (this.explored) return;
      this.explored = !0;
      let e = this.world,
        t = this.data;
      this.sprite.node.active = !1;
      this.damager.node.active = !0;
      c.Util.moveNode(this.damager.node, this.node.parent);
      e.AddBody(this.damager);
      cc.tween(this.damager.node).to(.2, {
        opacity: 0
      }).call(() => {
        this.damager.node.parent = this.node;
        this.damager.node.x = 0;
        this.damager.node.y = 0;
        e.removeDevice(this);
        e.RemoveBody(this.damager);
        this.data.onlyOnce && p.default.Ins.setDeviceFlag(e.worldData.id, this.data.id);
      }).start();
      (yield e.playEffect({
        effectName: "BombSpark",
        pos: this.node.position
      })).scale = t.extra.scale;
    });
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    u.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      speed: 300,
      dmg: 1,
      scale: 1,
      exploreRange: 1.5 * f.default.SIZE,
      detonateTime: 1
    });
    this.damager.dmg = e.extra.dmg;
    this.damager.ignoreTeam = this.data.ignoreDmgEnemy ? d.Team.Enemy : d.Team.None;
    this.node.scale = e.extra.scale;
    this.setDamagerRadius(e.extra.exploreRange);
  }
  setDamagerRadius(e) {
    this.damager.getComponent(cc.CircleCollider).radius = e;
    this.damager.node.width = 2 * e;
    this.damager.node.height = 2 * e;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      speed: 300,
      dmg: 1,
      scale: 1,
      exploreRange: 1.5 * f.default.SIZE,
      detonateTime: 1
    };
    o && e.addHead(t.name, t.textureName);
    e.addToggle("伤害敌人", !n.ignoreDmgEnemy, e => {
      n.ignoreDmgEnemy = !e;
    });
    e.addNumberEditBox("伤害", n.extra.dmg, 0, 999999, e => {
      n.extra.dmg = e;
    });
    e.addNumberEditBox("爆炸半径(格)", n.extra.exploreRange / f.default.SIZE, 0, 64, e => {
      n.extra.exploreRange = e * f.default.SIZE;
      o && o.setDamagerRadius(e);
    });
    e.addNumberEditBox("引爆时间(秒)", n.extra.detonateTime, 0, 999999, e => {
      n.extra.detonateTime = e;
    });
    e.addToggle("爆炸后不再出现？", n.onlyOnce, e => {
      n.onlyOnce = e;
    });
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = e;
        o.world.placeGizmos.setScale(e);
      }
    });
  }
};
n([v({
  override: !0,
  type: cc.Sprite
})], C.prototype, "sprite", void 0);
n([v(s.default)], C.prototype, "damager", void 0);
C = i = n([y], C);
exports.default = C;