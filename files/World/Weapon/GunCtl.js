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
exports.GunCtl = void 0;
const n = e("../../../Frame/Util"),
  a = e("../../../GameData/GameTypeDefine"),
  s = e("../../Player/Mng"),
  r = e("../../Player/TriggerMng"),
  l = e("../Tile"),
  c = e("./WeaponCtl");
exports.GunCtl = class extends c.WeaponCtl {
  constructor() {
    super(...arguments);
    this.bulletConf = null;
    this._worldMat = new cc.Mat4();
    this._worldScale = new cc.Vec3();
    this._faceDir = new cc.Vec2();
  }
  init() {
    return i(this, void 0, void 0, function* () {
      if (this.weapon.conf) {
        this.weapon.conf.gun.bulletId && (this.bulletConf = yield s.Mng.Ins.bulletMng.loadOne(this.weapon.conf.gun.bulletId));
        this.timer = 1 / this.weapon.conf.ROF;
      } else this.bulletConf = null;
      this.weapon.skin.node.x = 21;
      this.weapon.skin.node.y = 0;
      this.weapon.skin.node.anchorX = .5;
      this.weapon.skin.node.anchorY = .5;
      this.weapon.skin.node.angle = 0;
      this.weapon.skin.node.getWorldMatrix(this._worldMat);
      this._worldMat.getScale(this._worldScale);
    });
  }
  run(e) {
    let t = this.weapon.world;
    if (!t || !t.playing) return;
    if (!this.bulletConf) return;
    if (!this.weapon.conf) return;
    this.timer += e;
    if (!this.weapon.firing) return;
    let o = 1 / this.weapon.conf.ROF;
    if (this.timer > o) {
      this.timer = 0;
      let e = n.Util.convertPosition(this.weapon.node, t.node),
        i = t.addBullet(e);
      if (!i) return;
      let s = n.Util.getNoteRight(this.weapon.node),
        c = n.Util.angle(s);
      c += n.Util.randomFloat(-this.weapon.conf.gun.scatter / 2, this.weapon.conf.gun.scatter / 2);
      s = n.Util.angleToVec2(c);
      (null == this.weapon.conf.gun.bulletSpeed || isNaN(this.weapon.conf.gun.bulletSpeed)) && (this.weapon.conf.gun.bulletSpeed = this.bulletConf.speed || 5 * l.default.SIZE);
      (null == this.weapon.conf.gun.bulletRange || isNaN(this.weapon.conf.gun.bulletRange)) && (this.weapon.conf.gun.bulletRange = this.bulletConf.range || 5 * l.default.SIZE);
      let d = s.mul(this.weapon.conf.gun.bulletSpeed);
      this.bulletConf.range = this.weapon.conf.gun.bulletRange;
      i.fly(d, this.bulletConf);
      i.damager.dmg = this.bulletConf.damage;
      this.weapon.team == a.Team.Hero ? i.damager.team = a.Team.HeroBullet : this.weapon.team == a.Team.Enemy ? i.damager.team = a.Team.EnemyBullet : this.weapon.team == a.Team.Ally && (i.damager.team = a.Team.AllyBullet);
      i.node.scale = Math.abs(this._worldScale.x);
      this.weapon.spark.node.active = !0;
      let h = o > .1 ? .1 : .5 * o;
      this.weapon.scheduleOnce(() => {
        this.weapon.spark.node.active = !1;
      }, h);
      t.camera.node.position = cc.Vec2.ZERO;
      if (this.weapon.conf.gun.onFire) {
        let e = this.weapon.conf.gun.onFire;
        this.weapon.team != a.Team.Hero && (e = e.filter(e => e.act !== a.TriggerAct.CameraShake));
        r.default.Ins.emitTrigger(e, this.weapon.node);
      }
    }
  }
  readyFire() {}
  updateFirePower(e) {}
  fire(e) {}
  setFireDir(e, t) {}
  setDir(e, t) {
    let o = 0;
    if (this.weapon.world.worldLayout.type == a.WorldType.Rpg) {
      this.weapon.node.getWorldMatrix(this._worldMat);
      this._worldMat.getScale(this._worldScale);
      this._worldScale.x < 0 && (e = -e);
      this._faceDir.x = e;
      this._faceDir.y = t;
      o = n.Util.angle(this._faceDir);
    } else if (0 == t) o = 0;else if (0 == e) o = t > 0 ? 90 : 270;else {
      this.weapon.node.getWorldMatrix(this._worldMat);
      this._worldMat.getScale(this._worldScale);
      let i = this._worldScale.x < 0,
        n = Math.sqrt(e * e + t * t),
        a = e / n,
        s = t / n;
      o = 180 * Math.atan(s / a) / Math.PI;
      (o %= 360) < 0 && (o += 360);
      o = o > 45 && o < 135 ? i ? 270 : 90 : o >= 135 && o <= 225 ? i ? 0 : 180 : o > 225 && o < 315 ? i ? 90 : 270 : 0;
    }
    this.weapon.node.angle = o;
  }
};