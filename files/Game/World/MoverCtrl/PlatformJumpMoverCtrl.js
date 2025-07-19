"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/Joystick"),
  r = e("../../../GameData/GameTypeDefine"),
  l = e("../Mover/PlatformJumpMover"),
  c = e("./BaseMoveCtrl"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.curWallFaceDir = 0;
    this._hitWllTimer = 0;
    this._onLandTimer = 0;
    this._jumpWllTimer = 0;
    this._beginJumpStamp = 0;
    this._pressJump = !1;
    this._holdJump = !1;
    this.joystick = null;
    this.btnA = null;
    this.btnB = null;
    this.joystickB = null;
    this.mover = null;
    this._tmpDir = cc.v2();
    this._tmpBDir = cc.v2();
    this._joystickBMag = 0;
    this._isReadyJoystickBFire = !1;
    this._jumpMaxVy = 0;
    this._jumpHoldTime = 0;
  }
  get isHitWall() {
    return cc.director.getTotalTime() < this._hitWllTimer;
  }
  get isOnLand() {
    return cc.director.getTotalTime() < this._onLandTimer;
  }
  get isInJumpWll() {
    return cc.director.getTotalTime() < this._jumpWllTimer;
  }
  onLoad() {
    this.joystick.node.on(s.default.TOUCH_BEGIN, this.onJoystickTouchBegin, this);
    this.joystick.node.on(s.default.TOUCHING, this.onJoystickTouching, this);
    this.joystick.node.on(s.default.TOUCH_END, this.onJoystickTouchEnd, this);
    this.joystick.node.on(s.default.ANGLE_CHANGE, this.onJoystickAngleChange, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartA, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndA, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndA, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartB, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndB, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndB, this);
    this.joystickB.node.on(s.default.TOUCH_BEGIN, this.onJoystickBTouchBegin, this);
    this.joystickB.node.on(s.default.TOUCHING, this.onJoystickBTouching, this);
    this.joystickB.node.on(s.default.TOUCH_END, this.onJoystickBTouchEnd, this);
  }
  setMover(e) {
    super.setMover(e);
    if (this.mover) {
      this.mover.node.off(l.default.Land, this.onMoverLand, this);
      this.mover.node.off(l.default.Roof, this.onMoverRoof, this);
      this.mover.node.off(l.default.InAir, this.onMoverInAir, this);
      this.mover.node.off(l.default.HitWall, this.onMoverWall, this);
      this.mover.node.off(l.default.LeaveWall, this.onMoverLeaveWall, this);
    }
    this.mover = e;
    if (this.mover) {
      this.mover.node.on(l.default.Land, this.onMoverLand, this);
      this.mover.node.on(l.default.Roof, this.onMoverRoof, this);
      this.mover.node.on(l.default.InAir, this.onMoverInAir, this);
      this.mover.node.on(l.default.HitWall, this.onMoverWall, this);
      this.mover.node.on(l.default.LeaveWall, this.onMoverLeaveWall, this);
      this.mover.curJumpTimes = 0;
    }
  }
  onMoverLand() {
    this.mover.curJumpTimes = 0;
    this._onLandTimer = cc.director.getTotalTime() + 50;
  }
  onMoverRoof() {
    this._holdJump && (this._holdJump = !1);
  }
  onMoverInAir() {
    this._onLandTimer = 0;
  }
  onMoverWall(e) {
    if (this.mover.actor.data.enableClimbWall) {
      this.curWallFaceDir = e;
      this._hitWllTimer = cc.director.getTotalTime() + 50;
      this.mover.curJumpTimes = 0;
    }
  }
  onMoverLeaveWall() {
    this.mover.actor.data.enableClimbWall && (this._hitWllTimer = 0);
  }
  onJoystickTouchBegin() {
    this._isTouchDir = !0;
  }
  onJoystickTouching(e) {
    if (this.mover && !this.mover.isInSpring && !this.isInJumpWll) {
      this._tmpDir.set(e);
      this._tmpDir.normalizeSelf();
      this.mover.setDir(this._tmpDir.x, this._tmpDir.y);
    }
  }
  onJoystickTouchEnd() {
    this._isTouchDir = !1;
    this.mover && this.mover.setDir(0, 0);
  }
  onJoystickAngleChange(e) {}
  readyJoystickBFire() {
    this._isReadyJoystickBFire = !0;
    this.mover.actor.gun.readyFire();
    this._joystickBMag = .65 * this.joystickB.maxR;
  }
  onJoystickBTouchBegin() {
    this.mover && this.mover.actor.gun && this.joystickB.node.active && this.readyJoystickBFire();
  }
  onJoystickBTouching(e) {
    if (!this.mover || !this.mover.actor.gun || !this.joystickB.node.active) return;
    if (this.mover.isInSpring) return;
    if (this.isInJumpWll) return;
    this._tmpBDir.set(e);
    this._joystickBMag = this._tmpBDir.mag();
    let t = this._joystickBMag / this.joystickB.maxR;
    t > 1 && (t = 1);
    this._tmpBDir.normalizeSelf();
    this.mover.actor.gun.updateFirePower(t);
    this.mover.actor.gun.updateFireDir(this._tmpBDir.x, this._tmpBDir.y);
  }
  onJoystickBTouchEnd() {
    if (!this.mover || !this.mover.actor.gun || !this.joystickB.node.active) return;
    this._isReadyJoystickBFire || this.readyJoystickBFire();
    this._isReadyJoystickBFire = !1;
    let e = this._joystickBMag / this.joystickB.maxR;
    e > 1 && (e = 1);
    this.mover.actor.gun.fire(e);
    this.mover.actor.gun.updateFireDir(0, 0);
  }
  onTouchStartA() {
    if (this.mover && !(this.mover.curJumpTimes >= this.mover.jumpTimesMax) && this.mover.actor) {
      this._pressJump = !0;
      this.mover.isInSpring ? this._holdJump = !1 : this._holdJump = !0;
      if (this.mover.actor.data.enableClimbWall && this.isHitWall && !this.isOnLand) {
        let e = this.mover.actor.data.jumpHight,
          t = e * this.curWallFaceDir,
          o = Math.sqrt(-2 * this.mover.g * e),
          i = -o / this.mover.g,
          n = t / i;
        this.mover.jumpBySpeed(n, o);
        this.mover.onJumpOnWall();
        this._jumpWllTimer = cc.director.getTotalTime() + 250 * i;
        this.mover.curJumpTimes = 0;
      } else {
        let e = -this.mover.g,
          t = 0,
          o = i.JumpHoldTime;
        if (0 == this.mover.curJumpTimes && this.mover.isInSpring) {
          t = this.mover.springBounceHeight;
          this._jumpMaxVy = this.mover.jumpByHeight(t);
        } else {
          if (0 == this.mover.curJumpTimes) {
            t = this.mover.actor.data.jumpHight;
            this.mover.isInSpring && (t = this.mover.springBounceHeight);
          } else {
            t = .5 * this.mover.actor.data.jumpHight;
            o *= .5;
          }
          this._jumpHoldTime = o;
          let i = t + 20,
            n = Math.sqrt(2 * e * i + e * e * o * o) - e * o;
          n < 0 && (n = 0);
          this._jumpMaxVy = n;
          this.mover.jumpBySpeed(this.mover.velocity.x, this._jumpMaxVy);
        }
      }
      this._beginJumpStamp = cc.director.getTotalTime();
      this.mover.curJumpTimes++;
      this._onLandTimer = 0;
    }
  }
  onTouchHoldA() {
    if (this.mover && this._holdJump) {
      let e = this._pressJump ? 1e3 * this._jumpHoldTime : 100;
      cc.director.getTotalTime() - this._beginJumpStamp <= e ? this.mover.setJumpSpeedY(this._jumpMaxVy) : this._holdJump = !1;
    }
  }
  onTouchEndA() {
    this._pressJump = !1;
  }
  onTouchStartB() {
    this.mover && (this.mover.actor.gun.firing = !0);
  }
  onTouchEndB() {
    this.mover && (this.mover.actor.gun.firing = !1);
  }
  setMoveDir(e) {
    e.equals(cc.Vec2.ZERO) ? this.onJoystickTouchEnd() : this.onJoystickTouching(e);
  }
  update() {
    super.update && super.update();
    this.onTouchHoldA();
    if (this.mover && this.mover.actor) if (this.mover.actor.gun && this.mover.actor.gun.conf && this.mover.actor.gun.conf.weaponType == r.WeaponType.Cast) {
      this.joystickB.node.active = !0;
      this.btnB.node.active = !1;
    } else {
      this.joystickB.node.active = !1;
      this.btnB.node.active = !0;
    }
  }
};
p.JumpHoldTime = .3;
n([h(s.default)], p.prototype, "joystick", void 0);
n([h(a.default)], p.prototype, "btnA", void 0);
n([h(a.default)], p.prototype, "btnB", void 0);
n([h(s.default)], p.prototype, "joystickB", void 0);
p = i = n([d], p);
exports.default = p;