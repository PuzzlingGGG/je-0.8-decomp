"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../CustomUI/ToggleGroup"),
  s = e("../../Frame/Panel"),
  r = e("../../Game/Player/GuideMng"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends s.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.toggleGroup = null;
  }
  onLoad() {
    super.onLoad();
    this.node.on("closePanel", this.closePanel, this);
    this.toggleGroup.node.on(a.default.TOGGLE_CHANGE, this.onToggleChange, this);
  }
  onEnable() {
    let e = this.getUnAllCompleteIdx();
    this.toggleGroup.selectIdx(e);
  }
  getUnAllCompleteIdx() {
    let e = e => 0 == e.filter(e => !r.default.Ins.isComplete(e.id)).length;
    return e(r.default.Ins.basicCourses) ? 1 : e(r.default.Ins.middleCourses) ? 2 : e(r.default.Ins.highCourses) ? 3 : e(r.default.Ins.actualCourses) ? 4 : void 0;
  }
  onToggleChange(e) {
    let t = [];
    switch (e) {
      case 0:
        t = r.default.Ins.basicCourses;
        break;
      case 1:
        t = r.default.Ins.middleCourses;
        break;
      case 2:
        t = r.default.Ins.highCourses;
        break;
      case 3:
        t = r.default.Ins.actualCourses;
    }
    this.list.setDataArr(t);
  }
};
i([c(n.default)], d.prototype, "list", void 0);
i([c(a.default)], d.prototype, "toggleGroup", void 0);
d = i([l], d);
exports.default = d;