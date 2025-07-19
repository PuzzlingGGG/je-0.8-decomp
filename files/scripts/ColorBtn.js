"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.alphaSprite = null;
    this.selectBox = null;
    this.holding = !1;
    this.colorData = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
    this.node.on(n.default.ITEM_STATE_CHANGE, this.stateChange, this);
  }
  setData(e) {
    this.colorData = e;
    this.holding = !1;
    let t = e.color;
    if (0 === t.getA()) {
      this.node.color = cc.Color.WHITE;
      this.alphaSprite.node.active = !0;
    } else {
      this.node.color = t;
      this.alphaSprite.node.active = !1;
    }
  }
  stateChange(e) {
    this.selectBox.node.active = e;
  }
};
i([s(cc.Sprite)], r.prototype, "alphaSprite", void 0);
i([s(cc.Sprite)], r.prototype, "selectBox", void 0);
r = i([a], r);
exports.default = r;