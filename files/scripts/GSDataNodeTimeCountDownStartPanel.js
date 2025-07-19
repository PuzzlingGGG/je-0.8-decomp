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
const a = e("../../GameScript/index"),
  s = e("../../Frame/Panel"),
  r = e("../../CustomUI/Button"),
  l = e("../../Scene/EditWorldScene/Inspector/TriggerItem"),
  c = e("../../Frame/SceneManager"),
  d = e("../../CustomUI/ToggleGroup"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.secondBtn = null;
    this.triggerItem = null;
    this.toggleGroup = null;
    this.btnOk = null;
    this._second = 0;
    this._editData = null;
  }
  onLoad() {
    super.onLoad();
    this.secondBtn.node.on(r.default.CLICK, this.onSecondBtn, this);
    this.btnOk.node.on(r.default.CLICK, this.onClickOk, this);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    if (this._editData) {
      this._evts = this._editData.evts;
      this._second = this._editData.timer;
      let e = 0;
      e = null != this._editData.timerType ? this._editData.timerType : this._editData.type || 0;
      this.toggleGroup.selectIdx(e);
    } else {
      this._evts = [];
      this._second = 10;
    }
    this.onRefresh();
  }
  onRefresh() {
    return n(this, void 0, void 0, function* () {
      this.secondBtn.label.string = this._second + "";
      this.triggerItem.setData("计时结束时", this._evts, !1);
    });
  }
  onSecondBtn() {
    c.default.ins.OpenPanelByName("NumberInputPanel", e => {
      e.setData("时间（秒）", this.secondBtn.label.string, e => n(this, void 0, void 0, function* () {
        e = Math.max(e, 1);
        this.secondBtn.label.string = e;
        this._second = e;
      }));
    });
  }
  onClickOk() {
    this._evts = this.triggerItem.evts;
    this.closePanel();
    let e = this._editData || a.GSDataNodeBuildHelper.NewGSDataNode(a.GSDataNodeType.GSYS_TimeCountDownStart);
    e.evts = this._evts;
    e.timer = this._second;
    e.timerType = this.toggleGroup.idx;
    this._opCallBack && this._opCallBack(e);
  }
};
i([p(r.default)], u.prototype, "secondBtn", void 0);
i([p(l.default)], u.prototype, "triggerItem", void 0);
i([p(d.default)], u.prototype, "toggleGroup", void 0);
i([p(r.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;