"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../CustomUI/DirBtn"),
  s = e("./BaseMoveCtrl"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends s.default {
  constructor() {
    super(...arguments);
    this.jumpTimesMax = 2;
    this.curJumpTimes = 0;
    this.dirBtn = null;
    this.btnA = null;
    this.btnB = null;
    this.mover = null;
  }
  onLoad() {
    this.dirBtn.node.on(a.default.DIR, this.onDirBtn, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartA, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndA, this);
    this.btnA.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndA, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartB, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndB, this);
    this.btnB.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndB, this);
  }
  setMover(e) {
    this.mover = e;
  }
  onDirBtn(e) {
    this.mover && this.mover.move(e);
  }
  setMoveDir(e) {
    this.mover && this.mover.move(e);
  }
  onTouchStartA() {}
  onTouchEndA() {}
  onTouchStartB() {
    this.mover && (this.mover.actor.gun.firing = !0);
  }
  onTouchEndB() {
    this.mover && (this.mover.actor.gun.firing = !1);
  }
};
i([l(a.default)], c.prototype, "dirBtn", void 0);
i([l(n.default)], c.prototype, "btnA", void 0);
i([l(n.default)], c.prototype, "btnB", void 0);
c = i([r], c);
exports.default = c;