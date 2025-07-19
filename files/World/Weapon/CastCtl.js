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
exports.CastCtl = void 0;
const n = e("../../../Frame/Util"),
  a = e("../../../GameData/GameTypeDefine"),
  s = e("../../Player/Mng"),
  r = e("../../Player/TriggerMng"),
  l = e("../Tile"),
  c = e("./WeaponCtl");
exports.CastCtl = class extends c.WeaponCtl {
  constructor() {
    super(...arguments);
    this.bulletConf = null;
    this._worldMat = new cc.Mat4();
    this._worldScale = new cc.Vec3();
    this._acc = cc.Vec3.ZERO;
    this._defaultDir = cc.Vec2.ZERO;
    this._useGraphics = !1;
    this._isReadyFire = !1;
    this._faceDir = new cc.Vec2();
    this._fireDir = cc.Vec2.ZERO;
  }
  init() {
    return i(this, void 0, void 0, function* () {
      if (this.weapon.conf) {
        this.weapon.conf.cast.bulletId && (this.bulletConf = yield s.Mng.Ins.bulletMng.loadOne(this.weapon.conf.cast.bulletId));
        this.timer = 1 / this.weapon.conf.ROF;
      } else this.bulletConf = null;
      this.weapon.conf.cast.defaultAngle = this.weapon.conf.cast.defaultAngle || 0;
      this._acc.x = 0;
      this._acc.y = 0;
      this._acc.z = 0;
      this.weapon.world.worldLayout.type == a.WorldType.Rpg ? this._acc.z = -1500 : this._acc.y = -1500;
      this.weapon.skin.node.x = 21;
      this.weapon.skin.node.y = 0;
      this.weapon.skin.node.anchorX = .5;
      this.weapon.skin.node.anchorY = .5;
      this.weapon.skin.node.getWorldMatrix(this._worldMat);
      this._worldMat.getScale(this._worldScale);
      this.weapon.node.angle = this.weapon.conf.cast.defaultAngle;
      let e = this.weapon.conf.cast.defaultAngle * Math.PI / 180;
      this._defaultDir.x = Math.cos(e);
      this._defaultDir.y = Math.sin(e);
      this._faceDir.set(this._defaultDir);
      this.reset2FireDefaultDir();
    });
  }
  run(e) {
    let t = this.weapon.world;
    if (t && t.playing && this.bulletConf && this.weapon.conf) {
      this.timer += e;
      this.weapon.firing && this.timer > 1 / this.weapon.conf.ROF && this.fire(1);
    }
  }
  get fireGraphics() {
    if (!this._fireGraphics) {
      this._fireGraphics = this.weapon.node.getComponent(cc.Graphics);
      this._fireGraphics || (this._fireGraphics = this.weapon.node.addComponent(cc.Graphics));
      this._fireGraphics.lineWidth = 3;
    }
    return this._fireGraphics;
  }
  drawAimLine(e) {
    if (!(this.timer <= 1 / this.weapon.conf.ROF)) if (this._useGraphics) {
      this.fireGraphics.clear();
      let t = 30,
        o = 0,
        i = e;
      this.fireGraphics.moveTo(t, o);
      this.fireGraphics.lineTo(i, o);
      this.fireGraphics.strokeColor = cc.Color.GREEN;
      this.fireGraphics.stroke();
    } else if (this.weapon.spLine) {
      this.weapon.spLine.node.active = !0;
      let t = 30,
        o = 0,
        i = e = 32 * Math.ceil(e / 32);
      this.weapon.spLine.drawLine(t, o, i, o, 32, e);
    }
  }
  hideAimLine() {
    this._useGraphics ? this.fireGraphics.clear() : this.weapon.spLine && (this.weapon.spLine.node.active = !1);
  }
  reset2FireDefaultDir() {
    this.weapon.world.worldLayout.type == a.WorldType.Jump ? this._fireDir.set(this._defaultDir) : this._fireDir.set(this._faceDir);
    this.weapon.node.getWorldMatrix(this._worldMat);
    this._worldMat.getScale(this._worldScale);
    this._worldScale.x < 0 && (this._fireDir.x *= -1);
  }
  readyFire() {
    this._isReadyFire = !0;
    this.reset2FireDefaultDir();
    this.drawAimLine(0);
  }
  updateFirePower(e) {
    this._isReadyFire = !0;
    e < 0 && (e = 0);
    e > 1 && (e = 1);
    this.drawAimLine(200 * e);
  }
  fire(e) {
    this._isReadyFire || this.reset2FireDefaultDir();
    this._isReadyFire = !1;
    e < 0 && (e = 0);
    e > 1 && (e = 1);
    this.hideAimLine();
    let t = 1 / this.weapon.conf.ROF;
    if (this.timer <= t) return;
    this.weapon.context && this.weapon.context.noticeFire(1 / this.weapon.conf.ROF);
    let o = this.weapon.world;
    this.timer = 0;
    let i = n.Util.convertPosition(this.weapon.node, o.node),
      s = o.addBullet(i);
    if (!s) return;
    let c = this._fireDir,
      d = n.Util.angle(c);
    c = n.Util.angleToVec2(d);
    (null == this.weapon.conf.cast.outSpeed || isNaN(this.weapon.conf.cast.outSpeed)) && (this.weapon.conf.cast.outSpeed = this.bulletConf.speed || 10 * l.default.SIZE);
    (null == this.weapon.conf.cast.flyDistance || isNaN(this.weapon.conf.cast.flyDistance)) && (this.weapon.conf.cast.flyDistance = this.bulletConf.range || 10 * l.default.SIZE);
    let h = this.weapon.conf.cast.outSpeed * e,
      p = c.mul(h);
    this.bulletConf.range = this.weapon.conf.cast.flyDistance;
    s.fly(p, this.bulletConf, h, this._acc, this.weapon.conf.cast.airResistanceCof);
    s.damager.dmg = this.bulletConf.damage;
    this.weapon.team == a.Team.Hero ? s.damager.team = a.Team.HeroBullet : this.weapon.team == a.Team.Enemy ? s.damager.team = a.Team.EnemyBullet : this.weapon.team == a.Team.Ally && (s.damager.team = a.Team.AllyBullet);
    s.node.scale = Math.abs(this._worldScale.x);
    let u = t > .1 ? .1 : .5 * t;
    this.weapon.spark.node.active = !0;
    this.weapon.scheduleOnce(() => {
      this.weapon.spark.node.active = !1;
    }, u);
    o.camera.node.position = cc.Vec2.ZERO;
    if (this.weapon.conf.cast.onFire) {
      let e = this.weapon.conf.cast.onFire;
      this.weapon.team != a.Team.Hero && (e = e.filter(e => e.act !== a.TriggerAct.CameraShake));
      r.default.Ins.emitTrigger(e, this.weapon.node);
    }
  }
  setDir(e, t) {
    if (0 != e || 0 != t) {
      this._faceDir.x = e;
      this._faceDir.y = t;
    }
    if (!this._isReadyFire) if (this.weapon.world.worldLayout.type == a.WorldType.Rpg) {
      this.weapon.node.getWorldMatrix(this._worldMat);
      this._worldMat.getScale(this._worldScale);
      this._worldScale.x < 0 && (this._faceDir.x *= -1);
      let e = n.Util.angle(this._faceDir);
      this.weapon.node.angle = e;
    } else {
      this._faceDir.set(this._defaultDir);
      let e = n.Util.angle(this._faceDir);
      this.weapon.node.angle = e;
    }
  }
  setFireDir(e, t) {
    let o = 0;
    if (0 == e && 0 == t) {
      this.weapon.world.worldLayout.type == a.WorldType.Jump && this._faceDir.set(this._defaultDir);
      o = n.Util.angle(this._faceDir);
      this.reset2FireDefaultDir();
    } else {
      if (this.weapon.conf.cast.dragInverse) {
        e = -e;
        t = -t;
      }
      this._fireDir.x = e;
      this._fireDir.y = t;
      o = n.Util.angle(this._fireDir);
      if (0 != e) {
        this.weapon.node.getWorldMatrix(this._worldMat);
        this._worldMat.getScale(this._worldScale);
        this._worldScale.x < 0 && (o = 180 - o);
      }
      this.weapon.node.angle = o;
    }
  }
};