"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Frame/Config"),
  s = e("../../Game/Player/Mng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
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
    this.label.string = a.Config.getDeviceTypeName(e.deviceType);
    s.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, e.textureName, 100);
  }
};
i([l(cc.Sprite)], c.prototype, "sprite", void 0);
i([l(cc.Label)], c.prototype, "label", void 0);
c = i([r], c);
exports.default = c;