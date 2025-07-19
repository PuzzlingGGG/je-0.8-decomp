"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Panel"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends n.default {
  constructor() {
    super(...arguments);
    this.noUpgradeNode = null;
    this.titleLabel = null;
    this.lvlLabel = null;
    this.addExpLabel = null;
    this.needExpLabel = null;
    this.upgradeNode = null;
    this.addExpLabel2 = null;
    this.oldLvlLabel = null;
    this.newLvlLabel = null;
  }
  setData(e) {
    this.noUpgradeNode.active = !1;
    this.upgradeNode.active = !1;
    this.titleLabel.string = `    <color=#EF657E>${e.incPlayCount}</color> Players played your game\n when you away，and <color=#EF657E>${e.incThumbCount}</color> likes you got.`;
    if (e.oldLevel == e.level) {
      this.noUpgradeNode.active = !0;
      this.lvlLabel.string = `${e.level}`;
      this.addExpLabel.string = `Exp +${e.incExp}`;
      this.needExpLabel.string = `Need ${e.levelUpNeedExp} Exp to upgrade！`;
    } else {
      this.upgradeNode.active = !0;
      this.addExpLabel2.string = `Exp +${e.incExp}`;
      this.oldLvlLabel.string = `${e.oldLevel}`;
      this.newLvlLabel.string = `${e.level}`;
      this.upgradeNode.getComponent(cc.Animation).play();
    }
  }
  onOkBtn() {
    this.closePanel();
  }
};
i([s(cc.Node)], r.prototype, "noUpgradeNode", void 0);
i([s(cc.RichText)], r.prototype, "titleLabel", void 0);
i([s(cc.Label)], r.prototype, "lvlLabel", void 0);
i([s(cc.Label)], r.prototype, "addExpLabel", void 0);
i([s(cc.RichText)], r.prototype, "needExpLabel", void 0);
i([s(cc.Node)], r.prototype, "upgradeNode", void 0);
i([s(cc.Label)], r.prototype, "addExpLabel2", void 0);
i([s(cc.Label)], r.prototype, "oldLvlLabel", void 0);
i([s(cc.Label)], r.prototype, "newLvlLabel", void 0);
r = i([a], r);
exports.default = r;