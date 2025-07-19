"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("./Tile"),
  {
    ccclass: s
  } = cc._decorator;
let r = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.worldCamera = null;
    this.world = null;
    this.lastTouchPosInfo = null;
  }
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove4, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd5, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd5, this);
  }
  setWorld(e) {
    this.world = e;
    this.worldCamera = e.camera;
  }
  onTouchStart(e) {
    let t = this.touchToGrid(e);
    this.node.emit(i.BRUSH_TILE, t);
    this.lastTouchPosInfo = t;
  }
  onTouchMove4(e) {
    let t = this.touchToGrid(e);
    this.lastTouchPosInfo && t && (this.lastTouchPosInfo.iCol === t.iCol && this.lastTouchPosInfo.iRow === t.iRow || this.node.emit(i.BRUSH_TILE, t));
    this.lastTouchPosInfo = t;
  }
  onTouchEnd5(e) {
    let t = this.touchToGrid(e);
    e.getLocation().sub(e.getStartLocation()).magSqr() < 100 && cc.game.emit(i.CLICK_WORLD, t);
    this.lastTouchPosInfo = null;
  }
  touchToGrid(e) {
    if (!this.worldCamera) return;
    let t = e.getLocation();
    this.worldCamera.getScreenToWorldPoint(t, t);
    this.world.node.convertToNodeSpaceAR(t, t);
    let o = Math.floor(t.x / a.default.SIZE),
      i = Math.floor(t.y / a.default.SIZE);
    return {
      x: t.x,
      y: t.y,
      iCol: o,
      iRow: i
    };
  }
};
r.CLICK_WORLD = "CLICK_WORLD";
r.BRUSH_TILE = "BRUSH_TILE";
r = i = n([s], r);
exports.default = r;