"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Frame/UIColor"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
    this.node.on(n.default.ITEM_STATE_CHANGE, this.onStateChange, this);
  }
  setData(e) {
    this.label.string = e.name;
  }
  onStateChange(e) {
    this.node.color = e ? a.UIColor.blue : a.UIColor.white;
  }
};
i([r(cc.Label)], l.prototype, "label", void 0);
l = i([s], l);
exports.default = l;