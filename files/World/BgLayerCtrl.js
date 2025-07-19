"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Util"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this._camera = null;
    this.speedScale = 1;
    this._startPos = new cc.Vec2();
    this._cameraPos = new cc.Vec2();
    this._moveDelta = new cc.Vec2();
  }
  lateUpdate(e) {
    if (this._camera) {
      this._camera.getPosition(this._cameraPos);
      this._cameraPos.subSelf(this._startPos);
      this._moveDelta.set(this._cameraPos);
      this._moveDelta.mulSelf(this.speedScale);
      this.node.setPosition(this._moveDelta);
    }
  }
  setCamera(e) {
    this._camera = e;
    let t = n.Util.convertPosition(this._camera, this.node.parent);
    this.node.position = t;
    this._startPos.set(t);
  }
};
i([s], r.prototype, "speedScale", void 0);
r = i([a], r);
exports.default = r;