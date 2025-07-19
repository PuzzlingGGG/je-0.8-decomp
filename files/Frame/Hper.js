"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../GameData/GameTypeDefine"),
  a = e("./FightSystem"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.team = n.Team.Hero;
    this.emitTarget = null;
    this._hp = 3;
    this.hpMax = 3;
    this.lockHp = !1;
  }
  get hp() {
    return this._hp;
  }
  set hp(e) {
    this._hp = e;
    this.getEmitTarget().emit(a.FightSystem.Event.HpChange, e);
  }
  get HpMax() {
    return this.hpMax;
  }
  set HpMax(e) {
    this.hpMax = e;
    this.getEmitTarget().emit(a.FightSystem.Event.HpMaxChange, e);
  }
  onDestroy() {
    super.onDestroy && super.onDestroy();
    cc.Tween.stopAllByTarget(this.node);
  }
  isAlive() {
    return this._hp > 0;
  }
  getEmitTarget() {
    return this.emitTarget || this.node;
  }
};
i([r({
  type: cc.Enum(n.Team),
  displayName: "Team"
})], l.prototype, "team", void 0);
i([r(cc.Node)], l.prototype, "emitTarget", void 0);
i([r], l.prototype, "_hp", void 0);
i([r], l.prototype, "hpMax", void 0);
l = i([s], l);
exports.default = l;