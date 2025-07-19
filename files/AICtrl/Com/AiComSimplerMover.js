"use strict";

exports.AiComSimplerMover = exports.GameActorDeadSubstitute = void 0;
const i = e("../../../../Frame/TweenUtil");
class n extends cc.Component {
  constructor() {
    super(...arguments);
    this._position = new cc.Vec2();
    this.useGravity = !1;
    this._timer = 0;
    this._isRun = !1;
  }
  static Create() {
    let e = this._pool.get() || new cc.Node(),
      t = e.getComponent(n);
    t || (t = e.addComponent(n));
    return t;
  }
  static Back(e) {
    e && this._pool.put(e.node);
  }
  unuse() {
    this.node.active = !1;
  }
  reuse() {
    this.node.active = !0;
  }
  onLoad() {
    this._mover = new a();
    this._mover.setBody(this);
  }
  PositionMoveDelta(e, t) {
    this._position.set(this.node.position);
    this._position.x += e;
    this._position.y += t;
    this.node.position = this._position;
  }
  addImpulse(e, t, o) {
    this._isRun = !0;
    this._timer = o + .5;
    this.node.scale = 1;
    this.node.opacity = 255;
    cc.Tween.stopAllByTarget(this.node);
    cc.tween(this.node).to(.5 * o, {
      scale: 1
    }, {
      easing: i.Easing.linear
    }).to(.5 * o, {}).to(.2, {
      opacity: 0
    }, {
      easing: i.Easing.linear
    }).start();
    this._mover.addForceMover({
      impulse: !0,
      sx: e,
      sy: t,
      duration: o
    });
  }
  update(e) {
    if (this._isRun) {
      if (this._timer >= 0) this._timer -= e;else {
        this._isRun = !1;
        n.Back(this);
      }
      this._mover.run(e);
    }
  }
}
exports.GameActorDeadSubstitute = n;
n._pool = new cc.NodePool(n);
class a {
  constructor() {
    this._body = null;
    this._velocity = new cc.Vec2();
    this._onGroundTimer = 0;
    this._touchWallTimer = 0;
    this._forces = [];
  }
  onDestroy() {}
  get isGround() {
    return cc.director.getTotalTime() < this._onGroundTimer;
  }
  get isInAir() {
    return !this.isGround;
  }
  get isTouchWall() {
    return cc.director.getTotalTime() < this._touchWallTimer;
  }
  setBody(e) {
    this._body = e;
    this._body.onBlockedByTile = this.onBlockedByTile.bind(this);
  }
  onBlockedByTile(e) {
    let t = e.moveBackX,
      o = e.moveBackY;
    this._body.PositionMoveDelta(t, o);
    this._velocity.y < 0 && o > 0 ? this._onGroundTimer = cc.director.getTotalTime() + 50 : this._onGroundTimer = 0;
    this._velocity.y > 0 && o < 0 && (this._velocity.y = 0);
    if (this._velocity.x * t < 0) {
      this._touchWallTimer = cc.director.getTotalTime() + 50;
      let e = t < 0 ? -1 : 1,
        o = .5 * Math.abs(this._velocity.x),
        i = 0;
      this._velocity.x = 0;
      for (let e = 0; e < this._forces.length; ++e) this._forces[e].accx = 0;
      this.addForceMover({
        impulse: !0,
        sx: e * o,
        sy: i,
        duration: .2
      });
    } else this._touchWallTimer = 0;
  }
  addForceMover(e) {
    e.duration <= 0 && (e.duration = 1 / 60);
    if (e.impulse) {
      this._velocity.x += e.sx;
      this._velocity.y += e.sy;
      e.accx = -e.sx / e.duration;
      0 != this._body.gravity ? this._body.useGravity ? e.accy = -2 * e.sy / e.duration : e.accy = -1.8 * e.sy / e.duration : e.accy = -e.sy / e.duration;
    } else {
      let t = e.duration * e.duration;
      e.accx = 2 * e.sx / t;
      e.accy = 2 * e.sy / t;
    }
    this._forces.push(e);
  }
  run(e) {
    let t = 0,
      o = 0;
    for (let i = 0; i < this._forces.length; ++i) {
      let n = this._forces[i];
      if (n.duration > 0) {
        n.duration -= e;
        t += n.accx;
        o += n.accy;
      } else {
        this._forces.splice(i, 1);
        --i;
      }
    }
    0 == o && this._body.useGravity && (o += this._body.gravity);
    if (e > 0) {
      0 == t && 0 != this._velocity.x && (t -= .5 * this._velocity.x / e);
      0 == o && 0 != this._velocity.y && (o -= .5 * this._velocity.y / e);
    }
    this._velocity.x += t * e;
    this._velocity.y += o * e;
    this._body.PositionMoveDelta(this._velocity.x * e, this._velocity.y * e);
  }
}
exports.AiComSimplerMover = a;