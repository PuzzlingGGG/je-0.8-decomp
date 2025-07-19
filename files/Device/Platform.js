"use strict";

exports.Platform = void 0;
const i = e("../../GameData/GameTypeDefine"),
  n = e("../CollisionEmiter"),
  a = e("../World/Actor"),
  s = e("../World/Device"),
  r = e("../World/WorldNodeBody");
var l;
(function (e) {
  e[e.Btm = 1] = "Btm";
  e[e.Top = 2] = "Top";
  e[e.Left = 4] = "Left";
  e[e.Right = 8] = "Right";
})(l || (l = {}));
const c = new cc.Vec2();
class d extends s.default {
  constructor() {
    super(...arguments);
    this._isTopView = !1;
    this._blockBackVector = new cc.Vec2();
    this._testRect = cc.rect();
    this._blockMask = l.Btm;
  }
  get isBlockBtm() {
    return (this._blockMask & l.Btm) > 0;
  }
  get isBlockTop() {
    return (this._blockMask & l.Top) > 0;
  }
  get isBlockRight() {
    return (this._blockMask & l.Right) > 0;
  }
  get isBlockLeft() {
    return (this._blockMask & l.Left) > 0;
  }
  onLoad() {
    super.onLoad();
    this.initCollider();
    this.registCollider();
  }
  registCollider() {
    this.node.on(n.default.onCollisionEnter, this.onCollisionStay, this);
    this.node.on(n.default.onCollisionStay, this.onCollisionStay, this);
    this.node.on(n.default.onCollisionExit, this.onCollisionExit, this);
  }
  onCollisionStay(e, t) {
    this.world.worldLayout.type == i.WorldType.Rpg ? this._isTopView = !0 : this._isTopView = !1;
    let o = e.getComponent(a.default);
    if (o) {
      let i = e.world.aabb,
        n = t.world.aabb,
        a = this._testRect;
      n.intersection(a, i);
      let s = c;
      cc.Vec2.subtract(s, o.node.position, o.lastPosition);
      this._blockBackVector.set(cc.Vec2.ZERO);
      let l = o.hasEnteredCollider(r.WorldBodyColliderType.Platform, t);
      if (this._isTopView) {
        let e = .5 * (i.xMin + i.xMax),
          a = e - 5,
          s = e + 5,
          c = i.yMin,
          h = c + 5;
        if (a <= n.xMax && s >= n.xMin && c <= n.yMax && h >= n.yMin) {
          if (!l) {
            o.enterCollider(r.WorldBodyColliderType.Platform, t);
            o.node.emit(d.ONPLATFORM);
            this.onActorOnPlatform(o);
          }
        } else if (l) {
          o.existCollider(r.WorldBodyColliderType.Platform, t);
          o.node.emit(d.EXISTPLATFORM);
          this.onActorExistPlatform(o);
        }
      } else {
        if (a.height > 0) {
          if (this.isBlockBtm && s.y <= 0 && i.yMin + 10 - s.y >= n.yMax) {
            this._blockBackVector.y += a.height - .1;
            if (!l) {
              o.enterCollider(r.WorldBodyColliderType.Platform, t);
              o.node.emit(d.ONPLATFORM, this);
              this.onActorOnPlatform(o);
            }
          }
          this.isBlockTop && s.y >= 0 && i.yMax - 10 - s.y < n.yMin && (this._blockBackVector.y += .1 - a.height);
        }
        if (0 == this._blockBackVector.y && a.width > 0) {
          this.isBlockRight && i.xMin + 10 - s.x > n.xMax && (this._blockBackVector.x += a.width - .1);
          this.isBlockLeft && i.xMax - 10 - s.x < n.xMin && (this._blockBackVector.x += .1 - a.width);
        }
        if (this._blockBackVector.equals(cc.Vec2.ZERO)) {
          if (Math.abs(i.yMin - n.yMax) > 5 && l) {
            o.existCollider(r.WorldBodyColliderType.Platform, t);
            o.node.emit(d.EXISTPLATFORM);
            this.onActorExistPlatform(o);
          }
        } else o.node.emit(d.BLOCKBYPLATFORM, this._blockBackVector);
      }
    }
  }
  onCollisionExit(e, t) {
    let o = e.getComponent(a.default);
    if (o) {
      o.existCollider(r.WorldBodyColliderType.Platform, t);
      o.node.emit(d.EXISTPLATFORM);
      this.onActorExistPlatform(o);
    }
  }
}
exports.Platform = d;
d.ONPLATFORM = "ONPLATFORM";
d.EXISTPLATFORM = "EXISTPLATFORM";
d.BLOCKBYPLATFORM = "BLOCKBYPLATFORM";