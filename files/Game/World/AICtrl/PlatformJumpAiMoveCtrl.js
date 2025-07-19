"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../GameData/GameTypeDefine"),
  a = e("../Mover/PlatformJumpMover"),
  s = e("../Tile"),
  r = e("./AiCtrlBase"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends r.default {
  constructor() {
    super(...arguments);
    this._isMisstepBack = !1;
    this._isJump = !1;
    this._isTraceHero = !1;
    this._traceRange = 0;
    this._jumpInterval = 0;
    this._nextJumpTimer = 0;
    this._doJump = !1;
    this.dir = -1;
    this.mover = null;
  }
  setMover(e) {
    this._isMisstepBack = e.actor.data.aiMoveType == n.AIMoveType.PlatformJump_Ground_MisstepBack;
    this._isJump = e.actor.data.aiMoveType == n.AIMoveType.PlatformJump_Jump_WallBack || e.actor.data.aiMoveType == n.AIMoveType.PlatformJump_Jump_Trace;
    if (this._isJump) {
      this._jumpInterval = e.actor.data.jumpInterval;
      this._nextJumpTimer = 0;
    }
    this._isTraceHero = e.actor.data.aiMoveType == n.AIMoveType.PlatformJump_Jump_Trace;
    if (this._isTraceHero) {
      this._traceRange = e.actor.data.traceHeroRange;
      this._isMisstepBack = !1;
    }
    this.mover && this.mover.node.off(a.default.HitWall, this.onHitWall, this);
    this.mover = e;
    if (this.mover) {
      this.mover.node.on(a.default.HitWall, this.onHitWall, this);
      this.mover.curJumpTimes = 0;
      this.mover.jumpTimesMax = this.mover.actor.data.jumpStep;
    }
    this.dir = this.mover.actor.getScaleX();
    this.mover.actor.gun.firing = !0;
  }
  onHitWall() {
    if (!this._isTraceHero) {
      this.dir *= -1;
      this.mover.setDirX(this.dir);
    }
  }
  update(e) {
    if (!this.mover) return;
    if (this.mover.isInSpring) return;
    let t = this.mover.world,
      o = this.mover.actor.getRuntimeBoundingBox(),
      i = !0;
    if (!this.mover.isInAir && !this.mover.isJumping) {
      let e = !1;
      if (this._isMisstepBack) {
        let i = o.xMin + 10 * this.dir,
          n = i + o.width,
          a = o.yMin - 10,
          r = a + o.height,
          l = Math.floor(i / s.default.SIZE),
          c = Math.floor(n / s.default.SIZE),
          d = Math.floor(a / s.default.SIZE),
          h = Math.floor(r / s.default.SIZE);
        for (let o = l; o <= c; ++o) for (let i = d; i <= h; ++i) {
          let n = t.tiledMap.getTiles(o, i);
          if (n.length > 0) for (let t of n) if (t.block) {
            e = !0;
            break;
          }
        }
        e || (this.dir *= -1);
      }
      if (this._isTraceHero && t.hero) {
        let e = t.hero.node.x - this.mover.node.x,
          o = t.hero.node.y - this.mover.node.y;
        Math.abs(e) > this._traceRange || Math.abs(o) > this._traceRange ? i = !1 : this.dir = e >= 0 ? 1 : -1;
      }
    }
    if (i) {
      this.mover.setDirX(this.dir);
      if (this._isJump && this.mover.isGround) {
        if (this._doJump) {
          this._doJump = !1;
          this._nextJumpTimer = cc.director.getTotalTime() + 1e3 * this._jumpInterval;
        }
        if (!this._doJump && this._nextJumpTimer <= cc.director.getTotalTime()) {
          let e = this.mover.actor.data.jumpHight;
          this.mover.isInSpring && (e = this.mover.springBounceHeight);
          this.mover.jumpByHeight(e);
          this._doJump = !0;
        }
      }
    } else this.mover.setDirX(0);
  }
};
d = i([l], d);
exports.default = d;