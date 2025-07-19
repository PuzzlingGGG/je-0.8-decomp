"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/Panel"),
  s = e("../../Frame/Util"),
  r = e("../../Scene/EditWorldScene/Inspector/NumberEditBoxItem"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends a.default {
  constructor() {
    super(...arguments);
    this.speedItem = null;
    this.rangeItem = null;
    this.timesItem = null;
    this.okBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.onOkBtn, this);
  }
  setData(e) {
    this.evt = s.Util.deepCopy(e);
    let t;
    if (this.evt.extra) t = this.evt.extra;else {
      t = {
        speed: 200,
        range: 6,
        times: 3
      };
      this.evt.extra = t;
    }
    this.speedItem.setData("震动速度", t.speed, e => {
      let t = Number.parseFloat(e) || 0;
      t = s.Util.clamp(t, 0, 1e3);
      this.speedItem.label_num.string = t + "";
    });
    this.rangeItem.setData("震动幅度", t.range, e => {
      let t = Number.parseFloat(e) || 0;
      t = s.Util.clamp(t, 0, 100);
      this.rangeItem.label_num.string = t + "";
    });
    this.timesItem.setData("震动次数", t.times, e => {
      let t = Number.parseFloat(e) || 0;
      t = s.Util.clamp(t, 0, 10);
      this.timesItem.label_num.string = t + "";
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = this.evt.extra;
    e.speed = Number.parseFloat(this.speedItem.label_num.string) || 0;
    e.range = Number.parseFloat(this.rangeItem.label_num.string) || 0;
    e.times = Number.parseFloat(this.timesItem.label_num.string) || 0;
    this.call && this.call(this.evt);
  }
};
i([c(r.default)], d.prototype, "speedItem", void 0);
i([c(r.default)], d.prototype, "rangeItem", void 0);
i([c(r.default)], d.prototype, "timesItem", void 0);
i([c(n.default)], d.prototype, "okBtn", void 0);
d = i([l], d);
exports.default = d;