"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/ScrollList"),
  a = e("../../../Frame/Util"),
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
  }
  setData(e) {
    if (e.isTitle) {
      this.label.enableBold = !0;
      this.label.fontSize = 40;
      this.label.lineHeight = 80;
    } else {
      this.label.enableBold = !1;
      this.label.fontSize = 30;
      this.label.lineHeight = 50;
    }
    this.label.string = e.text;
    a.Util.updateLabel(this.label);
  }
  calcuH(e) {
    this.setData(e);
    return this.node.height;
  }
};
i([r(cc.Label)], l.prototype, "label", void 0);
l = i([s], l);
exports.default = l;