"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
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
const a = e("../../../Frame/Damager"),
  s = e("../../../Frame/FightSystem"),
  r = e("../../../Frame/TweenUtil"),
  l = e("../../../Frame/Util"),
  c = e("../../../GameData/GameTypeDefine"),
  d = e("../../Player/Mng"),
  h = e("../../Player/TriggerMng"),
  p = e("../WorldNodeBody"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
new cc.Vec2();
let f = class extends p.default {
  constructor() {
    super(...arguments);
    this.skin = null;
    this.damager = null;
    this.box = null;
    this.conf = null;
    this._distance = 500;
    this._angleSpeed = 0;
    this._velocity = cc.Vec2.ZERO;
    this._vh = 0;
    this._acc = cc.Vec3.ZERO;
    this._airResistanceCof = 0;
    this._isPlay = !1;
  }
  onLoad() {
    super.onLoad();
    this.damager = this.getComponent(a.default);
    this.box = this.getComponent(cc.BoxCollider);
    this.node.on(s.FightSystem.Event.BeatHper, this.onBeatHper, this);
  }
  onBeatHper() {
    this._isPlay && this.damager.remainTimes <= 0 && this.onHit();
  }
  onHit() {
    this.conf.hitShake && r.TweenUtil.applyShakeShort(this.world.camera.node);
    this.conf.onHit && h.default.Ins.emitTrigger(this.conf.onHit, this.node);
    this._isPlay = !1;
    this.playSpark();
    this.scheduleOnce(() => {
      this.world.removeBullet(this);
      this.conf.onDestroy && h.default.Ins.emitTrigger(this.conf.onDestroy, this.node);
    });
  }
  setCutting(e) {
    this.skin.enabled = !e;
  }
  update(e) {
    if (!this.world.playing || !this._isPlay) return;
    let t = this._velocity.mul(e),
      o = this._vh * e;
    this.updateH(this.h + o);
    this.PositionMoveDelta(t.x, t.y);
    if (this.checkHitGround()) return;
    0 != this._angleSpeed ? this._velocity.x > 0 ? this.skin.node.angle -= this._angleSpeed * e : this.skin.node.angle += this._angleSpeed * e : this.skin.node.angle = l.Util.angle(t);
    this._distance -= t.mag();
    this._velocity.x += this._acc.x * e;
    this._velocity.y += this._acc.y * e;
    this._vh += this._acc.z * e;
    let i = this._airResistanceCof * e;
    i > 1 && (i = 1);
    0 != this._velocity.x && (this._velocity.x -= this._velocity.x * i);
    0 != this._velocity.y && (this._velocity.y -= this._velocity.y * i);
    if (this._distance < 0) {
      this.conf.hitShake && this.damager.team == c.Team.Hero && r.TweenUtil.applyShakeShort(this.world.camera.node);
      this._isPlay = !1;
      this.playSpark();
      this.world.removeBullet(this);
      this.conf.onDestroy && h.default.Ins.emitTrigger(this.conf.onDestroy, this.node);
    }
  }
  fly(e, t, o = 0, i, a) {
    return n(this, void 0, void 0, function* () {
      this._isPlay = !0;
      this.conf = t;
      this._velocity.x = e.x;
      this._velocity.y = e.y;
      this._vh = o;
      this.updateH(0);
      i ? this._acc.set(i) : this._acc.set(cc.Vec3.ZERO);
      this._airResistanceCof = a || 0;
      this._airResistanceCof < 0 && (this._airResistanceCof = 0);
      this.skin.node.angle = l.Util.angle(this._velocity);
      e.x > 0 ? this.skin.node.scaleY = 1 : this.skin.node.scaleY = -1;
      this._distance = t.range;
      this._angleSpeed = t.angleSpeed;
      this.damager.dmg = t.damage;
      this.damager.remainTimes = 1;
      this.box.size = cc.size(32, 32);
      d.Mng.Ins.spriteMng.setBullletSprite(this.skin, t.textureName, 32);
    });
  }
  playSpark() {
    this.world.playEffect({
      effectName: "BulletSpark",
      pos: this.node.position
    });
  }
  checkHitGround() {
    if (this.world.worldLayout.type == c.WorldType.Rpg && this.h <= 0 && this._vh < 0) {
      this.onHit();
      return !0;
    }
    return !1;
  }
};
i([m(cc.Sprite)], f.prototype, "skin", void 0);
f = i([u], f);
exports.default = f;