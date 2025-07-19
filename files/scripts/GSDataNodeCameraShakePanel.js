"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Util"),
  l = e("../../Scene/EditWorldScene/Inspector/NumberEditBoxItem"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends s.default {
  constructor() {
    super(...arguments);
    this.speedItem = null;
    this.rangeItem = null;
    this.timesItem = null;
    this.okBtn = null;
    this._editData = null;
    this._speed = 200;
    this._range = 6;
    this._times = 3;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    if (this._editData) {
      this._speed = this._editData.speed;
      this._range = this._editData.range;
      this._times = this._editData.times;
    }
    this.speedItem.setData("震动速度", this._speed, e => {
      let t = Number.parseFloat(e) || 0;
      t = r.Util.clamp(t, 0, 1e3);
      this.speedItem.label_num.string = t + "";
    });
    this.rangeItem.setData("震动幅度", this._range, e => {
      let t = Number.parseFloat(e) || 0;
      t = r.Util.clamp(t, 0, 100);
      this.rangeItem.label_num.string = t + "";
    });
    this.timesItem.setData("震动次数", this._times, e => {
      let t = Number.parseFloat(e) || 0;
      t = r.Util.clamp(t, 0, 10);
      this.timesItem.label_num.string = t + "";
    });
  }
  onOkBtn() {
    this.closePanel();
    this._speed = Number.parseFloat(this.speedItem.label_num.string) || 0;
    this._range = Number.parseFloat(this.rangeItem.label_num.string) || 0;
    this._times = Number.parseFloat(this.timesItem.label_num.string) || 0;
    if (this._opCallBack) {
      let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GSCREEN_CameraShake);
      e.speed = this._speed;
      e.range = this._range;
      e.times = this._times;
      this._opCallBack(e);
    }
  }
};
i([d(l.default)], h.prototype, "speedItem", void 0);
i([d(l.default)], h.prototype, "rangeItem", void 0);
i([d(l.default)], h.prototype, "timesItem", void 0);
i([d(a.default)], h.prototype, "okBtn", void 0);
h = i([c], h);
exports.default = h;