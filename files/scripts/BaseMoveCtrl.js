"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Hortor"),
  a = e("./KeyInput"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this._keyInput = new a.default();
    this._isTouchDir = !1;
  }
  show() {
    if (!this.node) return;
    let e = this.node.getComponent(cc.Widget);
    e && e.updateAlignment();
    this._keyInput.Active(this);
  }
  hide() {
    this.node.x = 1e5;
    this._keyInput.DeActive();
  }
  onDestroy() {
    this.node.x = 1e5;
    this._keyInput.DeActive();
  }
  setMover(e) {}
  setMoveDir(e) {}
  onTouchStartA() {}
  onTouchEndA() {}
  onTouchStartB() {}
  onTouchEndB() {}
  update() {
    n.Hortor.isMiniGame() || n.Hortor.isApp() || this._isTouchDir || this._keyInput.update();
  }
};
l = i([s], l);
exports.default = l;