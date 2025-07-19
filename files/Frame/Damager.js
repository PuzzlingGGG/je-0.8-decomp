"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../Game/World/WorldNodeBody"),
  a = e("../GameData/GameTypeDefine"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends n.default {
  constructor() {
    super(...arguments);
    this.team = 0;
    this.emitTarget = null;
    this.dmg = 1;
    this.remainTimes = 1;
    this.ignoreTeam = 0;
    this.avoidContinuesDmg = !1;
    this._damagedTargetRecords = [];
  }
  tryDmgTarget(e) {
    if (!this.avoidContinuesDmg) return !0;
    if (this._damagedTargetRecords.findIndex(t => t.target == e) < 0) {
      this._damagedTargetRecords.push({
        target: e
      });
      return !0;
    }
    return !1;
  }
  clearRecord() {
    this._damagedTargetRecords.length = 0;
  }
};
i([r({
  type: cc.Enum(a.Team),
  displayName: "Team"
})], l.prototype, "team", void 0);
i([r(cc.Node)], l.prototype, "emitTarget", void 0);
i([r], l.prototype, "dmg", void 0);
i([r], l.prototype, "remainTimes", void 0);
l = i([s], l);
exports.default = l;