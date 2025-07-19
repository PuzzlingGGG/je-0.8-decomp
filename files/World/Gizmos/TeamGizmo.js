"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../Frame/UIColor"),
  a = e("../../../GameData/GameTypeDefine"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.sprite = null;
  }
  setTeam(e) {
    if (e == a.Team.Hero) {
      this.label.string = "这是主角";
      this.label.node.color = this.sprite.node.color = n.UIColor.green;
    }
    if (e == a.Team.Enemy) {
      this.label.string = "这是敌人";
      this.label.node.color = this.sprite.node.color = n.UIColor.red;
    }
    if (e == a.Team.NPC) {
      this.label.string = "这是NPC";
      this.label.node.color = this.sprite.node.color = n.UIColor.blue;
    }
    if (e == a.Team.Ally) {
      this.label.string = "这是队友";
      this.label.node.color = this.sprite.node.color = n.UIColor.yellow;
    }
  }
};
i([r(cc.Label)], l.prototype, "label", void 0);
i([r(cc.Sprite)], l.prototype, "sprite", void 0);
l = i([s], l);
exports.default = l;