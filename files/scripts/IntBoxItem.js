"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/IntBox"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.intBox = null;
    this.data = null;
    this.onChange = null;
  }
  onLoad() {
    this.intBox.node.on(n.default.VALUE_CAHNGE, this.onValueChange, this);
  }
  setData(e, t, o) {
    this.data = t;
    this.onChange = o;
    this.nameLabel.string = e;
    this.intBox.setRange(t.min, t.max);
    this.intBox.setValue(t.value);
  }
  onValueChange(e) {
    this.onChange && this.onChange(e);
  }
};
i([s(cc.Label)], r.prototype, "nameLabel", void 0);
i([s(n.default)], r.prototype, "intBox", void 0);
r = i([a], r);
exports.default = r;