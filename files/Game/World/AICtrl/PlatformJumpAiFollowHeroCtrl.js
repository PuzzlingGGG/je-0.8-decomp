"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("./AiCtrlBase"),
  a = e("./Com/AiComPlatformJumpFollow"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends n.default {
  constructor() {
    super(...arguments);
    this._aicoms = [];
  }
  onDestroy() {
    for (let e of this._aicoms) e.onDestroy();
  }
  setActor(e) {
    this._actor = e;
    e.ignoreTile = !0;
    this._comFollow = new a.AiComPlatformJumpFollow();
    this._comFollow.setActor(e);
    this._aicoms.push(this._comFollow);
    this.node.on("onAddPet", this.onAddTarget, this);
    this.node.on("onRemovePet", this.onRemoveTarget, this);
  }
  update(e) {
    if (!this._actor) return;
    let t = this._actor.world;
    if (t.playing && this._actor.hper.isAlive()) {
      for (let t of this._aicoms) t.run(e);
      if (t.hero && !this._comFollow.hasTarget()) {
        let e = this._actor.node.x - t.hero.node.x,
          o = this._actor.node.y - t.hero.node.y;
        e * e + o * o <= 4096 && t.hero.addPet(this._actor);
      }
    }
  }
  onAddTarget(e) {
    this._comFollow.setTarget(e);
  }
  onRemoveTarget() {
    this._comFollow.clearTarget();
  }
};
l = i([s], l);
exports.default = l;