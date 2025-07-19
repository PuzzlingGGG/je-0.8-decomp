"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../Frame/Util"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.bg = null;
    this.handle = null;
    this.isDynamic = !1;
    this.maxR = 100;
    this.triggerR = 10;
    this.angleStep = 10;
    this.curAngle = -1;
    this.beginMove = !1;
    this.touching = !1;
  }
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove2, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd2, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd2, this);
    this.isDynamic && this.bg && (this.bg.active = !1);
  }
  onDisable() {
    this.touching && this.onTouchEnd2(null);
  }
  update() {
    this.beginMove && this.node.emit(i.TOUCHING, this.handle.position);
  }
  onTouchStart(e) {
    let t = e.getLocation();
    t = this.node.convertToNodeSpaceAR(t);
    this.touching = !0;
    if (this.isDynamic) {
      if (this.bg) {
        this.bg.active = !0;
        this.bg.x = t.x;
        this.bg.y = t.y;
      }
    } else this.dealStaticJoystick(t);
  }
  onTouchMove2(e) {
    let t = this.node.convertToNodeSpaceAR(e.getStartLocation()),
      o = this.node.convertToNodeSpaceAR(e.getLocation());
    if (this.isDynamic) {
      let e = o.sub(t),
        n = e.mag();
      n = a.Util.clamp(n, 0, this.maxR);
      e.normalizeSelf().mulSelf(n);
      this.handle.x = e.x;
      this.handle.y = e.y;
      let s = a.Util.angle(e);
      s = Math.round(s / this.angleStep) * this.angleStep;
      if (this.curAngle !== s) {
        this.curAngle = s;
        this.node.emit(i.ANGLE_CHANGE, s);
      }
      if (this.beginMove) {
        if (n < this.triggerR) {
          this.beginMove = !1;
          this.node.emit(i.TOUCH_END);
        }
      } else if (n >= this.triggerR) {
        this.beginMove = !0;
        this.node.emit(i.TOUCH_BEGIN);
      }
    } else this.dealStaticJoystick(o);
  }
  onTouchEnd2(e) {
    this.touching = !1;
    if (this.isDynamic) {
      this.bg && (this.bg.active = !1);
      this.handle.position = cc.Vec2.ZERO;
      this.beginMove = !1;
      this.curAngle = -1;
      this.node.emit(i.TOUCH_END);
    } else this.dealStaticJoystick(cc.Vec2.ZERO);
  }
  dealStaticJoystick(e) {
    let t = e.mag();
    t = a.Util.clamp(t, 0, this.maxR);
    e.normalizeSelf().mulSelf(t);
    this.handle.x = e.x;
    this.handle.y = e.y;
    let o = a.Util.angle(e);
    o = Math.round(o / this.angleStep) * this.angleStep;
    if (this.curAngle !== o) {
      this.curAngle = o;
      this.node.emit(i.ANGLE_CHANGE, o);
    }
    if (this.beginMove) {
      if (t < this.triggerR) {
        this.beginMove = !1;
        this.node.emit(i.TOUCH_END);
      }
    } else if (t >= this.triggerR) {
      this.beginMove = !0;
      this.node.emit(i.TOUCH_BEGIN);
    }
  }
};
l.ANGLE_CHANGE = "ANGLE_CHANGE";
l.TOUCH_BEGIN = "TOUCH_BEGIN";
l.TOUCHING = "TOUCHING";
l.TOUCH_END = "TOUCH_END";
n([r(cc.Node)], l.prototype, "bg", void 0);
n([r(cc.Node)], l.prototype, "handle", void 0);
n([r], l.prototype, "isDynamic", void 0);
n([r], l.prototype, "maxR", void 0);
n([r], l.prototype, "triggerR", void 0);
n([r], l.prototype, "angleStep", void 0);
l = i = n([s], l);
exports.default = l;