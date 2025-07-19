"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../Frame/Util"),
  a = e("./AiCtrlBase"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends a.default {
  constructor() {
    super(...arguments);
    this.timer = 0;
    this.moveInterval = 2;
    this.mover = null;
  }
  setMover(e) {
    this.mover = e;
    this.mover.actor.gun.firing = !0;
  }
  update(e) {
    this.timer += e;
    if (this.timer > this.moveInterval) {
      this.timer = 0;
      let e = this.mover.world.tiledMap.getGridPos(this.node.x, this.node.y),
        t = [];
      this.mover.canMove(e.iCol + 1, e.iRow) && t.push(cc.v2(1, 0));
      this.mover.canMove(e.iCol - 1, e.iRow) && t.push(cc.v2(-1, 0));
      this.mover.canMove(e.iCol, e.iRow + 1) && t.push(cc.v2(0, 1));
      this.mover.canMove(e.iCol, e.iRow - 1) && t.push(cc.v2(0, -1));
      if (t.length > 0) {
        let e = t[n.Util.randomIdx(t.length)];
        this.mover.move(e);
      }
    }
  }
};
l = i([s], l);
exports.default = l;