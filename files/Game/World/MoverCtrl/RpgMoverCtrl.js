"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../CustomUI/Joystick"),
  s = e("../../../GameData/GameTypeDefine"),
  r = e("./BaseMoveCtrl"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends r.default {
  constructor() {
    super(...arguments);
    this.joystick = null;
    this.btnA = null;
    this.btnB = null;
    this.joystickB = null;
    this.mover = null;
    this._tmpDir = cc.v2();
    this._tmpBDir = cc.v2();
    this._joystickBMag = 0;
    this._isReadyJoystickBFire = !1;
  }
  onLoad() {
    this.joystick.node.on(a.default.TOUCH_BEGIN, this.onJoystickTouchBegin, this);
    this.joystick.node.on(a.default.TOUCHING, this.onJoystickTouching, this);
    this.joystick.node.on(a.default.TOUCH_END, this.onJoystickTouchEnd, this);
    this.joystick.node.on(a.default.ANGLE_CHANGE, this.onJoystickAngleChange, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartA, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndA, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndA, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartB, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndB, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndB, this);
    this.joystickB.node.on(a.default.TOUCH_BEGIN, this.onJoystickBTouchBegin, this);
    this.joystickB.node.on(a.default.TOUCHING, this.onJoystickBTouching, this);
    this.joystickB.node.on(a.default.TOUCH_END, this.onJoystickBTouchEnd, this);
  }
  setMover(e) {
    this.mover = e;
    this.mover && this.mover.actor && (this.mover.actor.ignoreTile = !1);
  }
  setMoveDir(e) {
    this.mover && this.mover.setDir(e.x, e.y, !0);
  }
  onTouchStartA() {}
  onTouchEndA() {}
  onTouchHoldA() {
    this.mover;
  }
  onTouchStartB() {
    this.mover && (this.mover.actor.gun.firing = !0);
  }
  onTouchEndB() {
    this.mover && (this.mover.actor.gun.firing = !1);
  }
  onJoystickTouchBegin() {}
  onJoystickTouching(e) {
    if (this.mover) {
      this._isTouchDir = !0;
      this._tmpDir.set(e);
      this._tmpDir.normalizeSelf();
      this.setMoveDir(this._tmpDir);
    }
  }
  onJoystickTouchEnd() {
    this._isTouchDir = !1;
    this._tmpDir.x = 0;
    this._tmpDir.y = 0;
    this.mover && this.setMoveDir(this._tmpDir);
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
  update() {
    super.update && super.update();
    this.onTouchHoldA();
    if (this.mover && this.mover.actor) if (this.mover.actor.gun && this.mover.actor.gun.conf && this.mover.actor.gun.conf.weaponType == s.WeaponType.Cast) {
      this.joystickB.node.active = !0;
      this.btnB.node.active = !1;
    } else {
      this.joystickB.node.active = !1;
      this.btnB.node.active = !0;
    }
  }
};
i([c(a.default)], d.prototype, "joystick", void 0);
i([c(n.default)], d.prototype, "btnA", void 0);
i([c(n.default)], d.prototype, "btnB", void 0);
i([c(a.default)], d.prototype, "joystickB", void 0);
d = i([l], d);
exports.default = d;