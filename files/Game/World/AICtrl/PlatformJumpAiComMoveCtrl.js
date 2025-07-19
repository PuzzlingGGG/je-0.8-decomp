"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../GameData/GameTypeDefine"),
  a = e("./AiCtrlBase"),
  s = e("./Com/AiComDirLineMover"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this._aicoms = [];
  }
  onDestroy() {
    for (let e of this._aicoms) e.onDestroy();
  }
  setActor(e) {
    this._actor = e;
    this._actor.gun.firing = !0;
    if (e.data.aiMoveType == n.AIMoveType.PlatformJump_DirLine) {
      e.ignoreTile = !0;
      let t = new s.AiComDirLineMover();
      t.setData(e, e.data.dirLineMoveData, !0);
      this._aicoms.push(t);
    }
  }
  update(e) {
    if (this._actor && this._actor.world.playing && this._actor.hper.isAlive()) for (let t of this._aicoms) t.run(e);
  }
};
c = i([r], c);
exports.default = c;