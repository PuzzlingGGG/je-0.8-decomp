"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("./Button"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.addBtn = null;
    this.subBtn = null;
    this.valueLabel = null;
    this.nameLabel = null;
    this.value = 0;
    this.min = 0;
    this.max = 9999;
  }
  onLoad() {
    this.addBtn.node.on(a.default.CLICK, this.onAddBtnTap, this);
    this.subBtn.node.on(a.default.CLICK, this.onSubBtnTap, this);
  }
  onAddBtnTap() {
    this.value = Math.min(this.max, this.value + 1);
    this.updateLabel();
    this.node.emit(i.VALUE_CAHNGE, this.value);
  }
  onSubBtnTap() {
    this.value = Math.max(this.min, this.value - 1);
    this.updateLabel();
    this.node.emit(i.VALUE_CAHNGE, this.value);
  }
  setRange(e, t) {
    this.min = e;
    this.max = t;
  }
  setValue(e) {
    this.value = e;
    this.updateLabel();
  }
  getValue() {
    return this.value;
  }
  updateLabel() {
    this.valueLabel.string = "" + this.value;
  }
};
l.VALUE_CAHNGE = "VALUE_CAHNGE";
n([r(a.default)], l.prototype, "addBtn", void 0);
n([r(a.default)], l.prototype, "subBtn", void 0);
n([r(cc.Label)], l.prototype, "valueLabel", void 0);
n([r(cc.Label)], l.prototype, "nameLabel", void 0);
l = i = n([s], l);
exports.default = l;