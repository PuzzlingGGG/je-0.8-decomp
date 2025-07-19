"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const {
    ccclass: n,
    property: a
  } = cc._decorator,
  s = "W".charCodeAt(0),
  r = "S".charCodeAt(0),
  l = "A".charCodeAt(0),
  c = "D".charCodeAt(0),
  d = ("C".charCodeAt(0), "J".charCodeAt(0)),
  h = "K".charCodeAt(0),
  p = {
    W: !1,
    S: !1,
    A: !1,
    D: !1
  },
  u = new cc.Vec2();
let m = class {
  Active(e) {
    this._ctrl = e;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
  DeActive() {
    this._ctrl = null;
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    p.A = p.D = p.S = p.W = !1;
  }
  onKeyDown(e) {
    e.keyCode !== s && e.keyCode !== l && e.keyCode !== r && e.keyCode !== c || (e.keyCode === s ? p.W = !0 : e.keyCode === r ? p.S = !0 : e.keyCode === l ? p.A = !0 : e.keyCode === c && (p.D = !0));
    e.keyCode === h && this._ctrl.onTouchStartA();
    e.keyCode === d && this._ctrl.onTouchStartB();
  }
  onKeyUp(e) {
    e.keyCode !== s && e.keyCode !== l && e.keyCode !== r && e.keyCode !== c || (e.keyCode === s ? p.W = !1 : e.keyCode === r ? p.S = !1 : e.keyCode === l ? p.A = !1 : e.keyCode === c && (p.D = !1));
    e.keyCode === h && this._ctrl.onTouchEndA();
    e.keyCode === d && this._ctrl.onTouchEndB();
  }
  update() {
    if (!this._ctrl) return;
    const e = u;
    e.set(cc.Vec2.ZERO);
    p.W && e.y++;
    p.S && e.y--;
    p.A && e.x--;
    p.D && e.x++;
    this._ctrl.setMoveDir(e.normalizeSelf());
  }
};
m = i([n], m);
exports.default = m;