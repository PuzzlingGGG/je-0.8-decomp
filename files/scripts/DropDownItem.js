"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../Frame/UIColor"),
  a = e("../Game/Player/Mng"),
  s = e("./ScrollList"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.icon = null;
  }
  onLoad() {
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    let t = this.node.getComponent(cc.Widget);
    t && (t.enabled = !1);
    if (this.label) {
      this.label.node.active = !!e.str;
      this.label.string = e.str;
    }
    if (this.icon) {
      let t = e.img;
      this.icon.node.active = !!t;
      t && a.Mng.Ins.spriteMng.setSprite(this.icon, t, 50, 1);
    }
  }
  onStateChange(e) {
    this.node.color = e ? n.UIColor.blue : n.UIColor.white;
  }
};
i([l(cc.Label)], c.prototype, "label", void 0);
i([l(cc.Sprite)], c.prototype, "icon", void 0);
c = i([r], c);
exports.default = c;