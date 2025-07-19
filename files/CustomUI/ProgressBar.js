"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const {
  ccclass: n,
  menu: a,
  property: s
} = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.maskWidget = null;
    this.barWidget = null;
    this.slot = null;
    this.isHor = !0;
    this.min = 0;
    this.max = 1;
    this.cur = 1;
    this.tw = null;
    this.onProgressChange = null;
  }
  onLoad() {
    this.maskWidget.enabled = !1;
    this.barWidget.enabled = !1;
  }
  setRange(e, t) {
    this.min = e;
    this.max = t;
  }
  setValue(e) {
    this.cur = e;
    let t = (this.cur - this.min) / (this.max - this.min);
    if (this.isHor) {
      this.maskWidget.node.width = this.barWidget.node.width * t;
      this.slot && (this.slot.x = this.maskWidget.node.x + this.maskWidget.node.width);
    } else {
      this.maskWidget.node.height = this.barWidget.node.height * t;
      this.slot && (this.slot.y = this.maskWidget.node.y + this.maskWidget.node.height);
    }
    this.onProgressChange && this.onProgressChange(this.min, this.max, this.cur, t);
  }
  stopAnim() {
    this.tw && this.tw.stop();
  }
  animaTo(e, t, o = () => {}) {
    this.stopAnim();
    this.tw = cc.tween(this).to(t, {
      cur: e
    }, {
      progress: (t, o, i, n) => {
        let a = t + n * (2 - n) * (o - t);
        this.setValue(a);
        return e;
      }
    }).call(o).start();
  }
};
i([s(cc.Widget)], r.prototype, "maskWidget", void 0);
i([s(cc.Widget)], r.prototype, "barWidget", void 0);
i([s(cc.Node)], r.prototype, "slot", void 0);
i([s], r.prototype, "isHor", void 0);
r = i([n, a("自定义UI/ProgressBar")], r);
exports.default = r;