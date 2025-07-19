"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Pool"),
  a = e("../../Frame/TweenUtil"),
  s = e("../../Frame/Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.bg = null;
    this.label = null;
  }
  show(e) {
    this.label.string = e;
    s.Util.updateLabel(this.label);
    this.bg.height = this.label.node.height + 40;
    s.Util.updateAllWidget(this.node);
    a.TweenUtil.applyAppear({
      node: this.bg,
      fromScale: .5,
      toScale: this.node.scale
    });
  }
  hide(e = null) {
    a.TweenUtil.applyDisappear({
      node: this.bg,
      callback: () => {
        e && e();
        this.node.emit(n.default.PUT);
      }
    });
  }
};
i([l(cc.Node)], c.prototype, "bg", void 0);
i([l(cc.Label)], c.prototype, "label", void 0);
c = i([r], c);
exports.default = c;