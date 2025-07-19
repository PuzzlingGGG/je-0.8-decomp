"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("./Mover/Mover"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.actor = null;
    this.oldTile = null;
  }
  setHero(e) {
    this.clear();
    this.actor && this.actor.node && this.actor.node.off(a.default.ActorMove, this.onHeroMove, this);
    this.actor = e;
    this.actor && this.actor.node.on(a.default.ActorMove, this.onHeroMove, this);
  }
  onHeroMove() {
    if (!this.actor) return;
    let e = this.actor.world.tiledMap,
      t = e.getGridPos(this.actor.node.x, this.actor.node.y),
      o = e.getTiles(t.iCol, t.iRow);
    for (let e of o) if (e != this.oldTile) {
      this.oldTile && this.oldTile.node.emit(i.HERO_LEAFE_TILE);
      this.oldTile = e;
      e && e.node.emit(i.HERO_ENTER_TILE);
    }
  }
  clear() {
    this.oldTile = null;
    this.actor = null;
  }
};
l.HERO_LEAFE_TILE = "HERO_LEAFE_TILE";
l.HERO_ENTER_TILE = "HERO_ENTER_TILE";
l = i = n([s], l);
exports.default = l;