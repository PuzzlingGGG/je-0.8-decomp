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
exports.MeleeCtl = void 0;
const n = e("../../../Frame/TweenUtil"),
  a = e("../../../Frame/Util"),
  s = e("../../../GameData/GameTypeDefine"),
  r = e("../../Player/TriggerMng"),
  l = e("./WeaponCtl");
exports.MeleeCtl = class extends l.WeaponCtl {
  constructor() {
    super(...arguments);
    this._actDataList = [];
    this._resetAngle = 0;
    this._resetX = -20;
    this._resetY = -35;
    this._resetAnchorX = -.25;
    this._resetAnchorY = -.25;
    this._worldMat = new cc.Mat4();
    this._worldScale = new cc.Vec3();
    this._angle = 0;
    this._faceDir = new cc.Vec2();
  }
  reset(e) {
    let t = this.weapon.conf && this.weapon.conf.melee && this.weapon.conf.melee.scale > 0 ? 1 / this.weapon.conf.melee.scale : 0;
    if (e) {
      let e = 1 / this.weapon.conf.ROF;
      cc.tween(this.weapon.skin.node).to(.1 * e, {
        angle: 0,
        x: this._resetX * t,
        y: this._resetY * t
      }, {
        easing: n.Easing.backOut
      }).start();
    } else {
      this.weapon.skin.node.x = this._resetX * t;
      this.weapon.skin.node.y = this._resetY * t;
      this.weapon.skin.node.anchorX = this._resetAnchorX * t;
      this.weapon.skin.node.anchorY = this._resetAnchorY * t;
      this.weapon.skin.node.angle = this._resetAngle;
    }
    if (this.weapon.boxDamager) {
      this.weapon.boxDamager.clearRecord();
      this.weapon.boxDamager.node.active = !1;
      this.weapon.boxDamager.node.angle = 45;
      let e = (.5 - this._resetAnchorX * t) * this.weapon.skin.node.width;
      this.weapon.boxDamager.SetPosition(e, e);
      this.weapon.boxDamager.ApplyPosition();
    }
  }
  init() {
    return i(this, void 0, void 0, function* () {
      this.weapon.conf && (this.timer = 1 / this.weapon.conf.ROF);
      this.weapon.boxDamager && (this.weapon.boxDamager.avoidContinuesDmg = !0);
      this.weapon.node.scale = this.weapon.conf.melee.scale;
      this.reset(!1);
      this._actDataList.length = 0;
      this._actDataIdx = 0;
      let e = 1 / this.weapon.conf.ROF,
        t = this.weapon.conf.melee.scale > 0 ? 1 / this.weapon.conf.melee.scale : 0;
      if (this.weapon.conf.melee.actType == s.MeleeActType.Swing) {
        let o = {
          reset: {
            angle: 45,
            x: -25 * t,
            y: -35 * t,
            anchorX: -.25,
            anchorY: -.25
          },
          tween: cc.tween(this.weapon.skin.node).call(() => {
            if (this.weapon.boxDamager) {
              this.weapon.boxDamager.clearRecord();
              this.weapon.boxDamager.node.active = !0;
            }
          }).to(.3 * e, {
            angle: -90
          }, {
            easing: n.Easing.backIn
          }).to(.5 * e, {
            angle: this._resetAngle,
            x: this._resetX * t,
            y: this._resetY * t
          }, {
            easing: n.Easing.backOut
          }).call(() => {
            this.reset(!0);
          })
        };
        this._actDataList.push(o);
      } else if (this.weapon.conf.melee.actType == s.MeleeActType.Jab) {
        let o = {
          reset: {
            angle: -45,
            x: this._resetX * t,
            y: 0,
            anchorX: this._resetAnchorX * t,
            anchorY: this._resetAnchorY * t
          },
          tween: cc.tween(this.weapon.skin.node).to(0 * e, {
            x: -40
          }, {
            easing: n.Easing.backOut
          }).call(() => {
            if (this.weapon.boxDamager) {
              this.weapon.boxDamager.clearRecord();
              this.weapon.boxDamager.node.active = !0;
            }
          }).to(.3 * e, {
            x: 60
          }, {
            easing: n.Easing.backIn
          }).call(() => {
            this.reset(!0);
          })
        };
        this._actDataList.push(o);
      }
    });
  }
  run(e) {
    let t = this.weapon.world;
    if (t && t.playing && this.weapon.conf) {
      this.timer += e;
      if (this.weapon.firing && this.timer > 1 / this.weapon.conf.ROF) {
        this.timer = 0;
        this.playAct();
        t.camera.node.position = cc.Vec2.ZERO;
        this.weapon.conf.melee.onAttack && r.default.Ins.emitTrigger(this.weapon.conf.melee.onAttack, this.weapon.node);
      }
    }
  }
  readyFire() {}
  updateFirePower(e) {}
  fire(e) {}
  setFireDir(e, t) {}
  setDir(e, t) {
    let o = 0;
    if (this.weapon.world.worldLayout.type == s.WorldType.Rpg) {
      this.weapon.node.getWorldMatrix(this._worldMat);
      this._worldMat.getScale(this._worldScale);
      this._worldScale.x < 0 && (e = -e);
      this._faceDir.x = e;
      this._faceDir.y = t;
      o = a.Util.angle(this._faceDir);
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
    this.weapon.node.angle = this._angle = o;
  }
  playAct() {
    if (0 == this._actDataList.length) return;
    this._actDataIdx >= this._actDataList.length && (this._actDataIdx = 0);
    let e = this._actDataList[this._actDataIdx++];
    if (e.reset) {
      let t = this.weapon.conf.melee.scale > 0 ? 1 / this.weapon.conf.melee.scale : 0;
      this.weapon.skin.node.x = e.reset.x * t;
      this.weapon.skin.node.y = e.reset.y * t;
      this.weapon.skin.node.anchorX = e.reset.anchorX * t;
      this.weapon.skin.node.anchorY = e.reset.anchorY * t;
      this.weapon.skin.node.angle = e.reset.angle;
      if (this.weapon.boxDamager) {
        let o = (.5 - e.reset.anchorX * t) * this.weapon.skin.node.width;
        this.weapon.boxDamager.SetPosition(o, o);
        this.weapon.boxDamager.ApplyPosition();
      }
    }
    if (e.tween) {
      cc.Tween.stopAllByTarget(this.weapon.skin.node);
      e.tween.start();
    }
  }
};