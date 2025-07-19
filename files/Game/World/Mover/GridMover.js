"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../Frame/TweenUtil"),
  a = e("../../Player/TriggerMng"),
  s = e("./Mover"),
  r = e("../Tile"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends s.default {
  constructor() {
    super(...arguments);
    this.moving = !1;
    this.actor = null;
    this._targetPos = new cc.Vec2();
  }
  setActor(e) {
    this.actor = e;
  }
  onDestroy() {
    super.onDestroy && super.onDestroy();
    cc.Tween.stopAllByTarget(this.actor);
  }
  move(e) {
    if (!this.isValid || !this.node) return;
    if (this.moving) return;
    if (0 == e.x && 0 == e.y) return;
    let t = this.world;
    if (!t || !t.playing) return;
    if (!this.actor.hper.isAlive()) return;
    let o = t.tiledMap.getGridPos(this.node.x, this.node.y),
      i = o.iCol + e.x,
      l = o.iRow + e.y;
    e.x > 0 ? this.actor.setScaleX(1) : e.x < 0 && this.actor.setScaleX(-1);
    this.actor.setDir(e.x, e.y);
    if (this.canMove(i, l)) {
      this.moving = !0;
      this._targetPos.x = this.actor.PositionX;
      this._targetPos.y = this.actor.PositionY;
      let t = this._targetPos.add(e.mul(r.default.SIZE));
      cc.tween(this.actor).to(.2, {
        targetPosition: t
      }).call(() => {
        this.moving = !1;
        if (this.node) {
          this.node.emit(s.default.ActorMove, this.actor);
          a.default.Ins.emitTrigger(this.actor.data.onMove, this.node);
        }
      }).start();
    } else {
      this.moving = !0;
      this._targetPos.x = this.actor.PositionX;
      this._targetPos.y = this.actor.PositionY;
      let t = this._targetPos.add(e.mul(.55 * r.default.SIZE));
      cc.tween(this.actor).to(.2, {
        targetPosition: t
      }, {
        easing: n.Easing.quadOut
      }).to(.2, {
        targetPosition: this.node.position
      }, {
        easing: n.Easing.quadOut
      }).call(() => {
        this.moving = !1;
      }).start();
    }
  }
  canMove(e, t) {
    let o = this.world.tiledMap;
    if (e < 0 || t < 0 || e >= o.nCol || t >= o.nRow) return !1;
    let i = o.getTiles(e, t),
      n = !0;
    for (let e of i) if (!(n = !e || !e.block || !e.node.active)) break;
    return n;
  }
};
d = i([l], d);
exports.default = d;