"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
exports.WorldBodyColliderType = void 0;
const a = e("../../GameData/GameTypeDefine"),
  s = e("./Tile"),
  r = e("./WorldChild"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
(function (e) {
  e[e.Platform = 0] = "Platform";
  e[e.Ladder = 1] = "Ladder";
})(o.WorldBodyColliderType || (exports.WorldBodyColliderType = {}));
let d = i = class extends r.default {
  constructor() {
    super(...arguments);
    this._position = new cc.Vec2();
    this._h = 0;
    this._lastPosition = new cc.Vec2();
    this._tmp_v = new cc.Vec2();
    this._boundingBox = new cc.Rect();
    this._boundingBoxExtInTiledPhysics = new cc.Rect();
    this.isDebugCutting = !1;
    this.useObb = !1;
    this.collider = null;
    this.ignoreTile = !1;
    this._enteredCollidersMap = new Map();
  }
  static ResetId() {
    this._s_id = 0;
  }
  static _GetNewId() {
    return ++this._s_id;
  }
  onDestroy() {
    super.onDestroy && super.onDestroy();
    this.onBlockedByTile = null;
    this.doCollisionTile = null;
    cc.Tween.stopAllByTarget(this.node);
  }
  get dataId() {}
  set targetPosition(e) {
    this.SetPosition(e.x, e.y);
  }
  get targetPosition() {
    return this._position;
  }
  SetPosition(e, t) {
    this._position.x = e;
    this._position.y = t;
  }
  get PositionX() {
    return this._position.x;
  }
  get PositionY() {
    return this._position.y;
  }
  get Scale() {
    return this.node.scale;
  }
  get Angle() {
    return this.node.angle;
  }
  set Scale(e) {
    this.node.scale = e;
  }
  set Angle(e) {
    this.node.angle = e;
  }
  get Move2PositionX() {
    return this._position.x;
  }
  get Move2PositionY() {
    return this._position.y;
  }
  set Move2PositionX(e) {
    if (this.setScaleX) {
      let t = e - this._position.x;
      t > 0 && this.setScaleX(1);
      t < 0 && this.setScaleX(-1);
    }
    this._position.x = e;
  }
  set Move2PositionY(e) {
    this._position.y = e;
  }
  get h() {
    return this._h;
  }
  updateH(e) {
    this._h = e;
  }
  get lastPosition() {
    return this._lastPosition;
  }
  PositionMoveDelta(e, t) {
    this._position.x += e;
    this._position.y += t;
  }
  LimitMoveDelta(e) {
    let t = this._position.x - this.node.position.x,
      o = this._position.y - this.node.position.y,
      i = Math.sqrt(t * t + o * o);
    if (i > 0 && i > e) {
      t = Math.ceil(t / i * e);
      o = Math.ceil(o / i * e);
    }
    this._position.x = t + this.node.position.x;
    this._position.y = o + this.node.position.y;
  }
  ApplyPosition() {
    this._lastPosition.set(this.node.position);
    let e = this.inverseWorldTransH(this._h);
    this._lastPosition.x += e[0];
    this._lastPosition.y += e[1];
    let t = this._position.x,
      o = this._position.y;
    e = this.worldTransH(this._h);
    this._tmp_v.x = t + e[0];
    this._tmp_v.y = o + e[1];
    this.node.position = this._tmp_v;
    let i = this.world,
      n = Math.floor(this.PositionX / s.default.SIZE),
      a = Math.floor(this.PositionY / s.default.SIZE);
    i.tiledMap.canPass(n, a) && this.registTile(n, a);
  }
  worldTransH(e) {
    let t = 0;
    this.world.worldLayout.type == a.WorldType.Rpg && e > 0 && (t += .5 * e);
    return [0, t];
  }
  inverseWorldTransH(e) {
    let t = 0;
    this.world.worldLayout.type == a.WorldType.Rpg && e > 0 && (t += .5 * e);
    return [0, t];
  }
  getPhyPos() {
    let e = this.inverseWorldTransH(this._h);
    return {
      x: this.PositionX + e[0],
      y: this.PositionY + e[1]
    };
  }
  get gravity() {
    return 0;
  }
  get useGravity() {
    return this.world.useGravity;
  }
  get width() {
    return this.node.width * Math.abs(this.node.scaleX);
  }
  get height() {
    return this.node.height * Math.abs(this.node.scaleY);
  }
  getBoundingBox() {
    let e = this.width,
      t = this.height,
      o = this.node.x - this.node.width * Math.abs(this.node.scaleX) * this.node.anchorX,
      i = this.node.y - this.node.height * Math.abs(this.node.scaleY) * this.node.anchorY;
    this._boundingBox.x = o;
    this._boundingBox.y = i;
    this._boundingBox.width = e;
    this._boundingBox.height = t;
    return this._boundingBox;
  }
  getRuntimeBoundingBox() {
    let e = this.getBoundingBox();
    e.width += Math.abs(this.node.scaleX) * this.boundingBoxExtInTiledPhysics.width;
    e.height += Math.abs(this.node.scaleY) * this.boundingBoxExtInTiledPhysics.height;
    e.x += Math.abs(this.node.scaleX) * this.boundingBoxExtInTiledPhysics.x;
    e.y += Math.abs(this.node.scaleY) * this.boundingBoxExtInTiledPhysics.y;
    return e;
  }
  get boundingBoxExtInTiledPhysics() {
    return this._boundingBoxExtInTiledPhysics;
  }
  get historyValidTileCol() {
    return this._tileCol;
  }
  get historyValidTileRow() {
    return this._tileRow;
  }
  registTile(e, t) {
    this._tileCol = e;
    this._tileRow = t;
  }
  onLoad() {
    super.onLoad();
    this.init();
  }
  init() {
    if (!this._inited) {
      this._inited = !0;
      this.useObb = !1;
      this.ignoreTile = !1;
      this.id = i._GetNewId();
      this.collider = this.node.getComponent(cc.Collider);
      this.collider || (this.collider = this.node.getComponentInChildren(cc.Collider));
    }
  }
  resetPhysicsState() {
    this.useObb = !1;
    this.ignoreTile = !1;
    this._enteredCollidersMap && this._enteredCollidersMap.clear();
  }
  hasEnteredColliderType(e) {
    return (this._enteredCollidersMap.get(e) || []).length > 0;
  }
  hasEnteredCollider(e, t) {
    let o = this._enteredCollidersMap.get(e);
    return o && o.length > 0;
  }
  enterCollider(e, t) {
    let o = this._enteredCollidersMap.get(e);
    if (o) o.push(t);else {
      o = [t];
      this._enteredCollidersMap.set(e, o);
    }
  }
  existCollider(e, t) {
    let o = this._enteredCollidersMap.get(e);
    if (o) {
      let e = o.indexOf(t);
      e >= 0 && o.splice(e, 1);
    }
  }
};
d._s_id = 0;
d = i = n([l], d);
exports.default = d;