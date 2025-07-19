"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const {
  ccclass: a,
  menu: s,
  property: r
} = cc._decorator;
let l = i = class extends cc.ToggleContainer {
  constructor() {
    super(...arguments);
    this.lastIdx = 0;
    this.idx = 0;
  }
  onLoad() {
    let e = new cc.Component.EventHandler();
    e.target = this.node;
    e.handler = "_stateChange";
    e.component = "ToggleGroup";
    this.checkEvents = [e];
    this.node.emit(i.TOGGLE_CHANGE, this.idx, this.lastIdx, !1);
  }
  _stateChange(e) {
    this.idx = this.toggleItems.indexOf(e);
    this.node.emit(i.TOGGLE_CHANGE, this.idx, this.lastIdx, !0);
    this.lastIdx = this.idx;
  }
  selectIdx(e) {
    let t = this.getComponentsInChildren(cc.Toggle);
    0 <= e && e < t.length && (t[e].isChecked = !0);
  }
};
l = i = n([a, s("自定义UI/ToggleGroup")], l);
exports.default = l;