"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ColorBox"),
  r = e("../../Frame/Config"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Util"),
  h = e("../../Scene/EditWorldScene/Inspector/TriggerItem"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.saveBtn = null;
    this.cameraRatioBtn = null;
    this.colorBox = null;
    this.triggerItem = null;
    this.worldData = null;
    this.worldLayout = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.saveBtn.node.on(a.default.CLICK, this.onSave, this);
    this.cameraRatioBtn.node.on(a.default.CLICK, this.onCameraRatioBtn, this);
  }
  setData(e, t) {
    this.worldData = e;
    this.worldLayout = t;
    this.cameraRatioBtn.label.string = "" + (t.cameraRatio || 1);
    let o = r.Config.colors.findIndex(e => {
      let o = e.color,
        i = t.bgColor;
      return o.r == i.r && o.g == i.g && o.b == i.b && o.a == i.a;
    });
    o < 0 && (o = 0);
    this.colorBox.setDataArr(r.Config.colors);
    this.colorBox.select(o);
    t.onStart = t.onStart || [];
    this.triggerItem.setData("当进入地图时：", t.onStart, !0);
  }
  onCameraRatioBtn() {
    let e = Number.parseFloat(this.cameraRatioBtn.label.string);
    c.default.ins.OpenPanelByName("NumberInputPanel", t => {
      t.setData("摄像机缩放", e, e => n(this, void 0, void 0, function* () {
        e = d.Util.clamp(e, .5, 10);
        this.cameraRatioBtn.label.string = e;
      }));
    });
  }
  onSave() {
    return n(this, void 0, void 0, function* () {
      let e = this.colorBox.getColor();
      this.worldLayout.bgColor.r = e.r;
      this.worldLayout.bgColor.g = e.g;
      this.worldLayout.bgColor.b = e.b;
      this.worldLayout.bgColor.a = e.a;
      this.worldLayout.cameraRatio = Number.parseFloat(this.cameraRatioBtn.label.string);
      this.closePanel();
      this.call && this.call();
    });
  }
};
i([u(a.default)], m.prototype, "saveBtn", void 0);
i([u(a.default)], m.prototype, "cameraRatioBtn", void 0);
i([u(s.default)], m.prototype, "colorBox", void 0);
i([u(h.default)], m.prototype, "triggerItem", void 0);
m = i([p], m);
exports.default = m;