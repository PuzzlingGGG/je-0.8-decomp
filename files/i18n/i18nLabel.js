"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("./i18nMgr"),
  {
    ccclass: a,
    property: s,
    executeInEditMode: r,
    menu: l,
    inspector: c
  } = cc._decorator;
let d = class extends cc.Label {
  constructor() {
    super(...arguments);
    this._tid = "";
  }
  set tid(e) {
    this._tid = e;
    let t = n.I18nMgr.getI18nString(this._tid);
    t && (this.string = t);
  }
  get tid() {
    return this._tid;
  }
  onLoad() {
    super.onLoad();
    n.I18nMgr.addLabel(this);
    this.tid = this._tid;
  }
  onDestroy() {
    super.onDestroy();
    n.I18nMgr.delLabel(this);
  }
  refreshLabel() {
    this.tid = this._tid;
  }
};
i([s()], d.prototype, "_tid", void 0);
i([s({
  multiline: !0,
  tooltip: "多语言 text id"
})], d.prototype, "tid", null);
d = i([a, r(), c("packages://i18n_peimin/inspectors/i18nLabel.js")], d);
exports.default = d;