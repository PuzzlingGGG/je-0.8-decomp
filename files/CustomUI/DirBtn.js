"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const {
  ccclass: a,
  property: s
} = cc._decorator;
let r = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.up = null;
    this.left = null;
    this.down = null;
    this.right = null;
    this.touching = !1;
    this.dir = cc.Vec2.ZERO;
  }
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove1, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd1, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd1, this);
  }
  onTouchStart(e) {
    this.touching = !0;
    this.dir = this.getDir(e);
  }
  onTouchMove1(e) {
    this.dir = this.getDir(e);
  }
  onTouchEnd1(e) {
    this.dir.x = 0;
    this.dir.y = 0;
    this.touching = !1;
  }
  update() {
    this.touching && this.node.emit(i.DIR, this.dir);
  }
  getDir(e) {
    let t = e.getLocation();
    this.node.convertToNodeSpaceAR(t, t);
    let o = t.x,
      i = t.y,
      n = Math.abs(o),
      a = Math.abs(i);
    if (o > 0 && n > a) {
      this.dir.x = 1;
      this.dir.y = 0;
      return this.dir;
    }
    if (o < 0 && n > a) {
      this.dir.x = -1;
      this.dir.y = 0;
      return this.dir;
    }
    if (i > 0 && n < a) {
      this.dir.x = 0;
      this.dir.y = 1;
      return this.dir;
    }
    if (i < 0 && n < a) {
      this.dir.x = 0;
      this.dir.y = -1;
      return this.dir;
    }
    this.dir.x = 0;
    this.dir.y = 0;
    return this.dir;
  }
};
r.DIR = "DIR";
n([s(cc.Node)], r.prototype, "up", void 0);
n([s(cc.Node)], r.prototype, "left", void 0);
n([s(cc.Node)], r.prototype, "down", void 0);
n([s(cc.Node)], r.prototype, "right", void 0);
r = i = n([a], r);
exports.default = r;