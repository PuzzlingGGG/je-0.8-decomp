"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../GameData/GameTypeDefine"),
  s = e("../../Game/Player/Mng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator,
  c = new Map([[a.Team.Hero, {
    textureName: "Actor/astro/astro",
    name: "主角"
  }], [a.Team.Enemy, {
    textureName: "Actor/monster1/monster1",
    name: "敌人"
  }], [a.Team.NPC, {
    textureName: "Actor/chick/chick",
    name: "NPC"
  }], [a.Team.Ally, {
    textureName: "Actor/sheep/sheep",
    name: "队友"
  }]]);
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.label = null;
    this.call = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    let t = c.get(e);
    this.label.string = t.name;
    s.Mng.Ins.spriteMng.setActorSprite(this.sprite, t.textureName, 100);
  }
};
i([l(cc.Sprite)], d.prototype, "sprite", void 0);
i([l(cc.Label)], d.prototype, "label", void 0);
d = i([r], d);
exports.default = d;