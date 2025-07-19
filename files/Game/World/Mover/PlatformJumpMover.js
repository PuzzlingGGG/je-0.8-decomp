"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../../Frame/FightSystem"),
  s = e("../../Device/Ladder"),
  r = e("../../Device/Platform"),
  l = e("../../Device/Spring"),
  c = e("../../Player/TriggerMng"),
  d = e("../Tile"),
  h = e("../WorldNodeBody"),
  p = e("./Mover"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = i = class extends p.default {
  constructor() {
    super(...arguments);
    this.actor = null;
    this.box = null;
    this.velocity = cc.Vec2.ZERO;
    this.canFly = !1;
    this.beatenSpeedX = 300;
    this.g = -2500;
    this.resistanceCof = 2;
    this.frictionCof = 1;
    this._touchWallTimer = 0;
    this._slidingOnWall = !1;
    this._jumpOnWallTimer = 0;
    this.moveDistance = 0;
    this._onGroundTimer = 0;
    this.forceVelocityX = 0;
    this.useForceVelocityX = !1;
    this.groundGroupNames = ["Tile", "Ground"];
    this._moveDir = new cc.Vec2();
    this._moveVelocity = new cc.Vec2();
    this._jumpTimer = 0;
    this.jumpTimesMax = 2;
    this.curJumpTimes = 0;
    this.lastPos = cc.Vec2.ZERO;
    this._onPlatform = !1;
    this._inLadderTimer = 0;
    this._ladderSpeed = 0;
    this._ladderFriction = .25;
    this.isInSpring = !1;
    this.springBounceHeight = 0;
  }
  get moveSpeedX() {
    return this.actor && this.actor.data.moveSpeed || 300;
  }
  onDestroy() {
    this.actor && (this.actor.onBlockedByTile = null);
  }
  get isTouchWall() {
    let e = cc.director.getTotalTime() < this._touchWallTimer;
    e || (this._slidingOnWall = !1);
    return e;
  }
  get isJumpOnWall() {
    return cc.director.getTotalTime() < this._jumpOnWallTimer;
  }
  onJumpOnWall() {
    this._jumpOnWallTimer = cc.director.getTotalTime() + 300;
  }
  get isGround() {
    return cc.director.getTotalTime() < this._onGroundTimer;
  }
  get isInAir() {
    return !this.isGround;
  }
  setDirX(e) {
    this._moveDir.x = e;
    this.updateMoveVelocity();
    let t = e;
    t > 0 ? this.actor.setScaleX(1) : t < 0 && this.actor.setScaleX(-1);
    this.isGround ? this.actor.setDir(t, 0) : (this.canFly, this.actor.setDir(t, 0));
  }
  setDirY(e) {
    this.inLadder || this.canFly ? this._moveDir.y = e : this._moveDir.y = 0;
    this.updateMoveVelocity();
  }
  setDir(e, t) {
    if (this.actor) {
      !this.isJumping && this.actor.gun && this.actor.gun.firing && 0 != e && Math.abs(t / e) > 8.144 && (e = 0);
      this._moveDir.x = e;
      if (this.inLadder || this.canFly) this._moveDir.y = t;else {
        this._moveDir.y = 0;
        this._moveDir.x > 0 ? this._moveDir.x = 1 : this._moveDir.x < 0 && (this._moveDir.x = -1);
      }
      this.updateMoveVelocity();
      e > 0 ? this.actor.setScaleX(1) : e < 0 && this.actor.setScaleX(-1);
      this.isGround ? this.actor.setDir(e, t < 0 ? 0 : t) : this.canFly ? this.actor.setDir(e, 0) : this.actor.setDir(e, t);
    }
  }
  updateMoveVelocity() {
    let e = this.moveSpeedX,
      t = 1;
    this.isJumpOnWall && (t = .2);
    if (this.inLadder) {
      e = this._ladderSpeed;
      this.velocity.x * this._moveDir.x < 0 && (this.velocity.x = 0);
      this.velocity.y * this._moveDir.y < 0 && (this.velocity.y = 0);
    } else {
      this.isJumpOnWall || (this.velocity.x = 0);
      this.canFly && (this.velocity.y = 0);
    }
    cc.Vec2.multiplyScalar(this._moveVelocity, this._moveDir, e);
    if (Math.abs(this.velocity.x) < Math.abs(this._moveVelocity.x) || this.velocity.x * this._moveDir.x < 0) {
      let e = this.velocity.x + this._moveVelocity.x * t;
      e * this._moveDir.x > 0 && Math.abs(e) > Math.abs(this._moveVelocity.x) && (e = this._moveVelocity.x);
      this.velocity.x = e;
    }
    if (Math.abs(this.velocity.y) < Math.abs(this._moveVelocity.y)) {
      let e = this.velocity.y + this._moveVelocity.y;
      Math.abs(e) > Math.abs(this._moveVelocity.y) && (e = this._moveVelocity.y);
      this.isJumping || (this.velocity.y = e);
    }
  }
  onLoad() {
    this.box = this.node.getComponent(cc.BoxCollider);
    this.node.on(a.FightSystem.Event.Beaten, this.onBeaten, this);
  }
  setActor(e) {
    if (this.actor) {
      e.ignoreTile = !1;
      this.actor.node.off(r.Platform.ONPLATFORM, this.onPlatform, this);
      this.actor.node.off(r.Platform.EXISTPLATFORM, this.onPlatformExist, this);
      this.actor.node.off(r.Platform.BLOCKBYPLATFORM, this.onPlatformBlock, this);
      this.actor.node.off(s.default.INLADDER, this.onInLadder, this);
      this.actor.node.off(s.default.OUTLADDER, this.onOutLadder, this);
      this.node.off(l.default.REBOUND, this.onSpringReBound, this);
      this.node.off(l.default.ENTERSPRING, this.onSpringEnter, this);
      this.node.off(l.default.EXISTSPRING, this.onSpringExist, this);
    }
    this.actor = e;
    if (this.actor) {
      this.actor.node.on(r.Platform.ONPLATFORM, this.onPlatform, this);
      this.actor.node.on(r.Platform.EXISTPLATFORM, this.onPlatformExist, this);
      this.actor.node.on(r.Platform.BLOCKBYPLATFORM, this.onPlatformBlock, this);
      this.actor.node.on(s.default.INLADDER, this.onInLadder, this);
      this.actor.node.on(s.default.OUTLADDER, this.onOutLadder, this);
      this.node.on(l.default.REBOUND, this.onSpringReBound, this);
      this.node.on(l.default.ENTERSPRING, this.onSpringEnter, this);
      this.node.on(l.default.EXISTSPRING, this.onSpringExist, this);
    }
    this.actor.onBlockedByTile = e => {
      let t = e.moveBackX,
        o = e.moveBackY;
      this.actor.PositionMoveDelta(t, o);
      this.isGround && !this.isTouchWall && this.actor.LimitMoveDelta(this.moveSpeedX / cc.game.getFrameRate());
      if (this.velocity.y < 0 && o > 0) {
        this.velocity.y = 0;
        this.node.emit(i.Land);
        this._onGroundTimer = cc.director.getTotalTime() + 50;
      } else this.isGround || this.node.emit(i.InAir);
      if (this.velocity.y > 0 && o < 0) {
        this.velocity.y = 0;
        this.node.emit(i.Roof);
      }
      if (this.velocity.x * t < 0) {
        this._touchWallTimer = cc.director.getTotalTime() + 50;
        this.node.emit(i.HitWall, t > 0 ? 1 : -1);
      } else if (!this.isTouchWall) {
        this._touchWallTimer = 0;
        this._slidingOnWall = !1;
        this.node.emit(i.LeaveWall);
      }
    };
    void 0 !== this.actor.data.beatenBackRange && (this.beatenSpeedX = this.actor.data.beatenBackRange * d.default.SIZE);
  }
  get isJumping() {
    return cc.director.getTotalTime() < this._jumpTimer;
  }
  jumpBySpeed(e, t) {
    this.velocity.x = e;
    this.velocity.y = t;
    let o = t > 0 ? t / Math.abs(this.g) : 0;
    console.log("upDuration=" + o);
    this._jumpTimer = cc.director.getTotalTime() + 1e3 * o;
    c.default.Ins.emitTrigger(this.actor.data.onJump, this.node);
  }
  jumpByHeight(e) {
    c.default.Ins.emitTrigger(this.actor.data.onJump, this.node);
    let t = Math.sqrt(-2 * this.g * e);
    this.velocity.y = t;
    let o = t > 0 ? t / Math.abs(this.g) : 0;
    this._jumpTimer = cc.director.getTotalTime() + 1e3 * o;
    c.default.Ins.emitTrigger(this.actor.data.onJump, this.node);
    return t;
  }
  setJumpSpeedY(e) {
    this.velocity.y = e;
  }
  addSpeed(e, t) {
    this.velocity.x += e;
    this.velocity.y += t;
  }
  update(e) {
    let t = this.world;
    if (!t.playing) return;
    if (!this.actor.hper.isAlive()) return;
    this.jumpTimesMax = this.actor.data.jumpStep;
    e = Math.min(.2, e);
    let o = 0;
    this.useForceVelocityX ? o = this.forceVelocityX : (o = this.velocity.x) > 0 ? this.actor.setScaleX(1) : o < 0 && this.actor.setScaleX(-1);
    this.actor.PositionMoveDelta(o * e, this.velocity.y * e);
    if (this.inLadder) {
      if (!this.isJumping) {
        if (0 == this._moveVelocity.x || Math.abs(this.velocity.x) > Math.abs(this._moveVelocity.x)) {
          let e = -this.velocity.x * this._ladderFriction;
          this.velocity.x += e;
        }
        if (0 == this._moveVelocity.y || Math.abs(this.velocity.y) > Math.abs(this._moveVelocity.y)) {
          let e = -this.velocity.y * this._ladderFriction;
          this.velocity.y += e;
        }
      }
    } else if (!this._onPlatform) {
      let o = this.canFly ? 0 : this.g,
        i = -this.velocity.x * this.resistanceCof,
        n = this.velocity.y < 0 ? -this.velocity.y * this.resistanceCof : 0,
        a = this.isInAir ? 0 : this.frictionCof,
        s = -this.velocity.x * a;
      if (this.actor.data.enableClimbWall && this.isTouchWall && this.velocity.y < 0) {
        if (!this._slidingOnWall) {
          this._slidingOnWall = !0;
          let e = this.actor.PositionX,
            o = this.actor.PositionY,
            i = t.tiledMap.getGridPos(e, o),
            n = 0;
          for (; n <= 2;) {
            let e = t.tiledMap.getTiles(i.iCol, i.iRow - n);
            ++n;
            for (let t of e) if (t && t.block) {
              this._slidingOnWall = !1;
              break;
            }
            if (!this._slidingOnWall) break;
          }
        }
        this._slidingOnWall && (n = -this.velocity.y * Math.abs(o) / 100);
      }
      this.velocity.y += (o + n) * e;
      this.velocity.x += (i + s) * e;
      Math.abs(this.velocity.x) < .001 && (this.velocity.x = 0);
    }
    let i = this.node.position.sub(this.lastPos).mag();
    this.moveDistance += i;
    this.lastPos = this.node.position;
    if (this.moveDistance > 32) {
      this.moveDistance = 0;
      this.emitActorMove();
    }
  }
  emitActorMove() {
    this.world;
    this.node.emit(p.default.ActorMove, this.actor);
    this.isGround ? c.default.Ins.emitTrigger(this.actor.data.onGroundMove, this.node) : c.default.Ins.emitTrigger(this.actor.data.onAirMove, this.node);
  }
  onBeaten(e) {
    if (this.actor.data.beatenBackRange > 0) {
      let t = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x,
        o = e.damager.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
      this.useForceVelocityX = !0;
      if (t < o) {
        this.forceVelocityX = -this.beatenSpeedX;
        this.actor.setScaleX(1);
      } else if (t > o) {
        this.forceVelocityX = this.beatenSpeedX;
        this.actor.setScaleX(-1);
      }
      this.velocity.x = 0;
      this.velocity.y = 300;
      this.scheduleOnce(() => {
        this.useForceVelocityX = !1;
      }, .4);
    }
    let t = this.actor.data.beatenLockHpTime || 0;
    this.actor.hper.lockHp = !0;
    this.scheduleOnce(() => {
      this.actor.hper.lockHp = !1;
    }, t);
  }
  onPlatform() {
    this._onPlatform = this.actor.hasEnteredColliderType(h.WorldBodyColliderType.Platform);
    this._onPlatform && this.node.emit(i.Land);
  }
  onPlatformExist() {
    this._onPlatform = this.actor.hasEnteredColliderType(h.WorldBodyColliderType.Platform);
  }
  onPlatformBlock(e) {
    if (this._onPlatform && e.y < 0 && this.velocity.y > 0) return;
    let t = 0 != e.x ? this.actor.node.x : this.actor.PositionX,
      o = 0 != e.y ? this.actor.node.y : this.actor.PositionY;
    (e.y > 0 && this.actor.PositionY > o || e.y < 0 && this.actor.PositionY < o) && (o = this.actor.PositionY);
    (e.x > 0 && this.actor.PositionX > t || e.x < 0 && this.actor.PositionX < t) && (t = this.actor.PositionX);
    this.actor.SetPosition(t, o);
    this.actor.onBlockedByTile({
      moveBackX: e.x,
      moveBackY: e.y
    });
  }
  get inLadder() {
    return cc.director.getTotalTime() < this._inLadderTimer;
  }
  onInLadder(e) {
    if (this.actor.hasEnteredColliderType(h.WorldBodyColliderType.Ladder)) {
      this.isJumping || this.node.emit(i.Land);
      this._ladderSpeed = e;
      this._inLadderTimer = cc.director.getTotalTime() + 50;
    }
  }
  onOutLadder() {
    this.actor.hasEnteredColliderType(h.WorldBodyColliderType.Ladder) || (this._inLadderTimer = 0);
  }
  onSpringEnter(e) {
    console.log("onSpringEnter");
    this.springBounceHeight = e;
    this.isInSpring = !0;
    this.velocity.x = 0;
    this.node.emit(i.Land);
  }
  onSpringExist() {
    console.log("onSpringExist");
    this.isInSpring = !1;
  }
  onSpringReBound(e) {
    this.isInSpring = !1;
    this.curJumpTimes = this.jumpTimesMax - 1;
    this.jumpByHeight(e);
  }
};
f.Land = "Land";
f.InAir = "InAir";
f.Roof = "Roof";
f.HitWall = "HitWall";
f.LeaveWall = "LeaveWall";
f.GroundMove = "GroundMove";
f.AirMove = "AirMove";
f = i = n([u], f);
exports.default = f;