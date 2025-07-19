"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Game/Player/Mng"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.sprite = null;
    this.selectNode = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.data = e;
    this.nameLabel.string = e.name;
    a.Mng.Ins.spriteMng.setSprite(this.sprite, e.textureName, 120);
    this.selectNode.active = e.selected;
  }
};
i([r(cc.Label)], l.prototype, "nameLabel", void 0);
i([r(cc.Sprite)], l.prototype, "sprite", void 0);
i([r(cc.Node)], l.prototype, "selectNode", void 0);
l = i([s], l);
exports.default = l;