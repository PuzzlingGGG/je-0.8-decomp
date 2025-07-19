"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../Frame/FightSystem"),
  a = e("../../../Frame/TweenUtil"),
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
let f = class extends p.default {
  constructor() {
    super(...arguments);
    this.actor = null;
    this.box = null;
    this.velocity = cc.Vec2.ZERO;
    this.resistanceCof = 3;
    this.frictionCof = 1;
    this.canFly = !1;
    this.beatenSpeedX = 300;
    this.moveDistance = 0;
    this._blockTimer = 0;
    this._blockedDuration = 0;
    this._moveDir = new cc.Vec2();
    this._moveVelocity = new cc.Vec2();
    this._v_t1 = new cc.Vec2();
    this._v_t2 = new cc.Vec2();
    this._v_t3 = new cc.Vec2();
    this._isFalling = !1;
    this._fallTween = null;
    this._lastFallPos = new cc.Vec2();
    this._vh = 0;
    this._isJumping = !1;
    this._jumpG = -1500;
    this._isJumpingOverBlock = !1;
    this._jumpOverStartX = 0;
    this._jumpOverStartY = 0;
    this._jumpOverMagSqr = 0;
    this._onPlatform = !1;
    this._inLadderTimer = 0;
    this._ladderSpeed = 0;
    this._ladderFriction = .25;
    this._inSpring = !1;
    this._springBounceHeight = 0;
  }
  get moveSpeed() {
    return this.actor && this.actor.data.moveSpeed || 300;
  }
  onDisable() {
    if (this.actor) {
      this.actor.onBlockedByTile = null;
      this.actor.onFallFromTile = null;
    }
  }
  get isBlocking() {
    return cc.director.getTotalTime() < this._blockTimer;
  }
  countBlockTime(e) {
    this.isBlocking && (this._blockedDuration += e);
  }
  setBlockState() {
    this.isBlocking || (this._blockedDuration = 0);
    this._blockTimer = cc.director.getTotalTime() + 100;
  }
  setDir(e, t, o) {
    if (!this._isJumpingOverBlock) {
      this._moveDir.x = e;
      this._moveDir.y = t;
      this.updateMoveVelocity(o);
      e > 0 ? this.actor.setScaleX(1) : e < 0 && this.actor.setScaleX(-1);
      0 == e && 0 == t || this.actor.setDir(e, t);
    }
  }
  updateMoveVelocity(e) {
    if (this._moveVelocity.equals(cc.Vec2.ZERO) && !this._moveDir.equals(cc.Vec2.ZERO)) {
      this.moveDistance = 0;
      this.emitActorMove();
    }
    let t = this.moveSpeed;
    if (this.inLadder) {
      e = !0;
      t = this._ladderSpeed;
    }
    if (e) {
      this.velocity.x * this._moveDir.x <= 0 && (this.velocity.x = 0);
      this.velocity.y * this._moveDir.y <= 0 && (this.velocity.y = 0);
    }
    cc.Vec2.multiplyScalar(this._moveVelocity, this._moveDir, t);
    if (Math.abs(this.velocity.x) < Math.abs(this._moveVelocity.x) || this.velocity.x * this._moveDir.x < 0) {
      let e = this.velocity.x + 1 * this._moveVelocity.x;
      e * this._moveDir.x > 0 && Math.abs(e) > Math.abs(this._moveVelocity.x) && (e = this._moveVelocity.x);
      this.velocity.x = e;
    }
    if (Math.abs(this.velocity.y) < Math.abs(this._moveVelocity.y) || this.velocity.y * this._moveDir.y < 0) {
      let e = this.velocity.y + 1 * this._moveVelocity.y;
      e * this._moveDir.y > 0 && Math.abs(e) > Math.abs(this._moveVelocity.y) && (e = this._moveVelocity.y);
      this.velocity.y = e;
    }
  }
  onLoad() {
    this.box = this.node.getComponent(cc.BoxCollider);
    this.node.on(n.FightSystem.Event.Beaten, this.onBeaten, this);
  }
  setActor(e) {
    this._fallTween && this._fallTween.stop();
    this._isFalling = !1;
    this._isJumping = !1;
    this._isJumpingOverBlock = !1;
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
      if (this._isJumpingOverBlock || this._isFalling) return;
      let t = e.moveBackX,
        o = e.moveBackY;
      this.actor.PositionMoveDelta(t, o);
      this.actor.LimitMoveDelta(this.moveSpeed / cc.game.getFrameRate());
      if (0 != this._moveDir.x || 0 != this._moveDir.y) {
        this.setBlockState();
        if (this._blockedDuration >= .3) {
          let e = this.world,
            t = this.actor.getRuntimeBoundingBox(),
            o = .5 * t.width,
            i = .5 * t.height;
          this._v_t1.x = t.x + o + this._moveDir.x * (o + 1);
          this._v_t1.y = t.y + i + this._moveDir.y * (i + 1);
          this._v_t2.x = this._v_t1.x + this._moveDir.x * d.default.SIZE;
          this._v_t2.y = this._v_t1.y + this._moveDir.y * d.default.SIZE;
          if (!this._onPlatform && !this.inLadder && e.tiledMap.getValidJumpOverTilePoint(this._v_t1, this._v_t2, this._v_t3)) {
            this._blockedDuration = 0;
            let e = 0 != this._moveDir.y ? this._moveDir.y > 0 ? this._moveDir.y * i * 2 + 10 : 5 : 2 * i;
            this.doJumpOver(this._v_t3.x + this._moveDir.x * o, this._v_t3.y + e);
          }
        }
      }
    };
    this.actor.onFallFromTile = (e, t) => {
      if (!this._onPlatform && !this.inLadder && !this._isFalling && this.actor.hper && this.actor.hper.isAlive()) {
        this.stopJump();
        this.doFall(e.x, e.y, t);
      }
    };
    void 0 !== this.actor.data.beatenBackRange && (this.beatenSpeedX = this.actor.data.beatenBackRange * d.default.SIZE);
  }
  addSpeed(e, t) {
    this.velocity.x += e;
    this.velocity.y += t;
  }
  doFall(e, t, o) {
    this._isFalling = !0;
    let i = this.actor;
    this._lastFallPos.x = i.historyValidTileCol * d.default.SIZE + .5 * d.default.SIZE;
    this._lastFallPos.y = i.historyValidTileRow * d.default.SIZE + .5 * d.default.SIZE;
    this._fallTween && this._fallTween.stop();
    this.actor.Angle = 0;
    this._fallTween = cc.tween(i).to(.7, {
      Move2PositionX: e,
      Move2PositionY: t,
      Scale: 0,
      Angle: 360
    }, {
      easing: a.Easing.quadIn
    }).to(1, {}).call(() => {
      this._isFalling = !1;
      this.actor.Angle = 0;
      i.onDamageByTile(o);
      if (i.hper.isAlive()) {
        i.SetPosition(this._lastFallPos.x, this._lastFallPos.y + 10);
        i.ApplyPosition();
        this.actor.Angle = 0;
        this.actor.Scale = 1;
      }
    });
    this._fallTween.start();
  }
  doJumpOver(e, t) {
    this._jumpOverStartX = this.actor.PositionX;
    this._jumpOverStartY = this.actor.PositionY;
    let o = e - this.actor.PositionX,
      i = t - this.actor.PositionY;
    this._v_t1.x = o;
    this._v_t1.y = i;
    let n = this._v_t1.mag();
    this._jumpOverMagSqr = n * n;
    this._v_t1.normalizeSelf();
    let a = n / .5;
    this.doJump(a, .5, this._v_t1.x, this._v_t1.y);
    this._isJumpingOverBlock = !0;
  }
  doJump(e, t, o, i) {
    this.setDir(o, o, !0);
    this._isJumping = !0;
    this.velocity.x = o * e;
    this.velocity.y = i * e;
    this._vh = -this._jumpG * t * .5;
  }
  updateJump(e) {
    if (this._isJumping) {
      let t = this._vh * e;
      this.actor.updateH(this.actor.h + t);
      this._vh += this._jumpG * e;
      this.actor.h <= 0 && this._vh < 0 && (this._isJumping = !1);
    } else if (this._isJumpingOverBlock) {
      let e = this.actor.node.x - this._jumpOverStartX,
        t = this.actor.node.y - this._jumpOverStartY;
      if (e * e + t * t > this._jumpOverMagSqr) {
        this._isJumpingOverBlock = !1;
        this.setDir(0, 0, !0);
      }
    }
  }
  stopJump() {
    if (this._isJumping || this._isJumpingOverBlock) {
      this._isJumping = !1;
      this._isJumpingOverBlock = !1;
      this.actor.updateH(0);
      this.setDir(0, 0, !0);
    }
  }
  update(e) {
    let t = this.world;
    if (!t.playing) return;
    if (!this.actor.hper.isAlive() || this._isFalling) return;
    e = Math.min(.2, e);
    this.countBlockTime(e);
    let o = this.velocity.x;
    o > 0 ? this.actor.setScaleX(1) : o < 0 && this.actor.setScaleX(-1);
    let i = o * e,
      n = this.velocity.y * e,
      a = t.tiledMap.nCol * d.default.SIZE + .5 * d.default.SIZE,
      s = t.tiledMap.nRow * d.default.SIZE + .5 * d.default.SIZE,
      r = this.actor.getRuntimeBoundingBox();
    (i < 0 && r.xMin + i < 0 || i > 0 && r.xMax + i > a) && (i = 0);
    (n < 0 && r.yMin + n < 0 || n > 0 && r.yMax + n > s) && (n = 0);
    this.actor.PositionMoveDelta(i, n);
    this.updateJump(e);
    if (this.inLadder) {
      if (0 == this._moveVelocity.x || Math.abs(this.velocity.x) > Math.abs(this._moveVelocity.x)) {
        let e = -this.velocity.x * this._ladderFriction;
        this.velocity.x += e;
      }
      if (0 == this._moveVelocity.y || Math.abs(this.velocity.y) > Math.abs(this._moveVelocity.y)) {
        let e = -this.velocity.y * this._ladderFriction;
        this.velocity.y += e;
      }
    } else if (!this._onPlatform && !this._isJumpingOverBlock) {
      let t = -this.velocity.x * this.resistanceCof,
        o = -this.velocity.y * this.resistanceCof,
        i = this.frictionCof,
        n = -this.velocity.x * i,
        a = -this.velocity.y * i;
      this.velocity.y += (o + a) * e;
      this.velocity.x += (t + n) * e;
      if (Math.abs(this.velocity.magSqr()) < .001) {
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }
    let l = this.actor.PositionX - this.node.x,
      c = this.actor.PositionY - this.node.y;
    this.moveDistance += Math.sqrt(l * l + c * c);
    if (this.moveDistance > 32) {
      this.moveDistance = 0;
      this.emitActorMove();
    }
  }
  emitActorMove() {
    this.node.emit(p.default.ActorMove, this.actor);
    c.default.Ins.emitTrigger(this.actor.data.onMove, this.node);
  }
  onBeaten(e) {
    let t = this.actor.data.beatenLockHpTime || 0;
    this.actor.hper.lockHp = !0;
    this.scheduleOnce(() => {
      this.actor.hper.lockHp = !1;
    }, t);
  }
  onPlatform() {
    this._onPlatform = this.actor.hasEnteredColliderType(h.WorldBodyColliderType.Platform);
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
      this._ladderSpeed = e;
      this._inLadderTimer = cc.director.getTotalTime() + 50;
    }
  }
  onOutLadder() {
    this.actor.hasEnteredColliderType(h.WorldBodyColliderType.Ladder) || (this._inLadderTimer = 0);
  }
  onSpringReBound(e) {
    this._inSpring = !1;
  }
  get isInSpring() {
    return this._inSpring;
  }
  get springBounceHeight() {
    return this._springBounceHeight;
  }
  onSpringEnter(e) {
    this._springBounceHeight = 2 * e;
    this._inSpring = !0;
    this.velocity.x = 0;
  }
  onSpringExist() {
    this._inSpring = !1;
  }
};
f = i([u], f);
exports.default = f;