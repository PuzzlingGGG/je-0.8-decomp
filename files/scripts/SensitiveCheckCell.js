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
  s = e("../../Frame/Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
    this.label = this.node.getComponent(cc.Label);
  }
  setData(e) {
    this.label.string = e.str;
    this.label.node.color = e.hasSens ? a.UIColor.red : a.UIColor.black;
    console.log(e);
  }
  calcuHeight(e) {
    this.label.string = e.str;
    s.Util.updateLabel(this.label);
    return this.label.node.height;
  }
};
i([l(cc.Label)], c.prototype, "label", void 0);
c = i([r], c);
exports.default = c;