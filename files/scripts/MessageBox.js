"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../CustomUI/Button"),
  a = e("./Panel"),
  {
    ccclass: s,
    menu: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.label = null;
    this.leftBtn = null;
    this.rightBtn = null;
    this.onLeft = null;
    this.onRight = null;
  }
  onLoad() {
    super.onLoad();
    this.leftBtn.node.on("click", this.onLeftBtnClick, this);
    this.rightBtn.node.on("click", this.onRightBtnClick, this);
  }
  onDestroy() {
    super.onDestroy();
    this.onLeft = null;
    this.onRight = null;
  }
  onLeftBtnClick() {
    this.closePanel();
    this.onLeft && this.onLeft();
    this.onLeft = null;
    this.onRight = null;
  }
  onRightBtnClick() {
    this.closePanel();
    this.onRight && this.onRight();
    this.onLeft = null;
    this.onRight = null;
  }
  setLeftBtn(e) {
    this.leftBtn.label.string = e.text || "";
    this.leftBtn.background.node.color = e.color || cc.Color.WHITE;
    this.onLeft = e.call;
  }
  setRightBtn(e) {
    this.rightBtn.label.string = e.text || "";
    this.rightBtn.background.node.color = e.color || cc.Color.WHITE;
    this.onRight = e.call;
  }
};
i([l(cc.Label)], c.prototype, "titleLabel", void 0);
i([l(cc.Label)], c.prototype, "label", void 0);
i([l(n.default)], c.prototype, "leftBtn", void 0);
i([l(n.default)], c.prototype, "rightBtn", void 0);
c = i([s, r("面板/MessageBox")], c);
exports.default = c;