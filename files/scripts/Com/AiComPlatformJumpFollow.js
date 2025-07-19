"use strict";

exports.AiComPlatformJumpFollow = void 0;
const i = e("../../../../Frame/FightSystem"),
  n = e("../../../../Frame/TweenUtil"),
  a = e("../../Tile");
exports.AiComPlatformJumpFollow = class {
  constructor() {
    this._inBeaten = !1;
    this._forceVelocityX = 0;
    this._velocity = new cc.Vec2();
    this._beatenSpeedX = 300;
  }
  onDestroy() {
    this._idleAnim && this._idleAnim.stop();
  }
  setActor(e) {
    e.node.on(i.FightSystem.Event.Beaten, this.onBeaten, this);
    this._self = e;
    let t = this._self.sprite.node;
    this._idleAnim = cc.tween(t).repeatForever(cc.tween(t).to(.5, {
      y: -20
    }, {
      easing: n.Easing.sineOut
    }).to(.5, {
      y: 0
    }, {
      easing: n.Easing.sineIn
    }).to(.5, {
      y: 20
    }, {
      easing: n.Easing.sineOut
    }).to(.5, {
      y: 0
    }, {
      easing: n.Easing.sineIn
    }));
    this._idleAnim.start();
  }
  setTarget(e) {
    this._target = e;
    this._posIdx = this._target.getPetPosIdx(this._self);
    this._idleAnim.stop();
    let t = 0;
    1 == this._posIdx ? t = .4 : 2 == this._posIdx && (t = .2);
    this._self.scheduleOnce(() => {
      this._idleAnim.start();
    }, t);
  }
  clearTarget() {
    this._target = null;
  }
  hasTarget() {
    return !!this._target;
  }
  run(e) {
    if (this._inBeaten) {
      this.updateBeaten(e);
      return;
    }
    if (!this._target || !this._self || this._posIdx < 0) return;
    this._self.gun.firing = this._target.gun.firing;
    this._self.setDir(this._target.dirx, this._target.diry);
    let t = this._target.sprite.node.scaleX,
      o = this._self.node.position,
      i = this._target.node.position;
    i.x - o.x > 0 ? this._self.setScaleX(1) : this._self.setScaleX(-1);
    let n = 64,
      a = 32;
    if (1 == this._posIdx) {
      n += 54;
      a -= 20;
    } else if (2 == this._posIdx) {
      n += 32;
      a += 24;
    }
    let s = i.x + (t < 0 ? n : -n),
      r = i.y + a,
      l = s - o.x,
      c = r - o.y,
      d = o.x + .1 * l,
      h = o.y + .1 * c;
    this._self.SetPosition(d, h);
  }
  onBeaten(e) {
    if (this._self.data.beatenBackRange > 0) {
      this._beatenSpeedX = this._self.data.beatenBackRange * a.default.SIZE;
      let t = this._self.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x,
        o = e.damager.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
      this._inBeaten = !0;
      if (t < o) {
        this._forceVelocityX = -this._beatenSpeedX;
        this._self.setScaleX(1);
      } else if (t > o) {
        this._forceVelocityX = this._beatenSpeedX;
        this._self.setScaleX(-1);
      }
      this._velocity.x = 0;
      this._velocity.y = 300;
      this._self.scheduleOnce(() => {
        this._inBeaten = !1;
      }, .4);
    }
    let t = this._self.data.beatenLockHpTime || 0;
    this._self.hper.lockHp = !0;
    this._self.scheduleOnce(() => {
      this._self.hper.lockHp = !1;
    }, t);
  }
  updateBeaten(e) {
    if (!this._inBeaten) return;
    let t = 0;
    t = this._forceVelocityX;
    this._self.PositionMoveDelta(t * e, 0);
  }
};