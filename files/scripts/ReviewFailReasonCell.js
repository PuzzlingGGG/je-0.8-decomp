"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Game/GameEnv"),
  s = e("../../Game/Player/Mng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.resonLabel = null;
    this.sprite = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.resonLabel.string = e.reason;
    s.Mng.Ins.spriteMng.setSprite(this.sprite, e.imageUrl, 500);
    console.log(a.gameEnv.fileCDN + e.imageUrl);
  }
};
i([l(cc.Label)], c.prototype, "resonLabel", void 0);
i([l(cc.Sprite)], c.prototype, "sprite", void 0);
c = i([r], c);
exports.default = c;