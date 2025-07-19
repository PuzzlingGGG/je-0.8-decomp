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
cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0);
let l = i = class extends cc.Toggle {
  constructor() {
    super(...arguments);
    this.label = null;
    this.background = null;
    this.dot = null;
    this.dotLabel = null;
  }
  onLoad() {
    let e = new cc.Component.EventHandler();
    e.target = this.node;
    e.handler = "_stateChange";
    e.component = "Toggle";
    this.checkEvents = [e];
    this.node.emit(i.STATE_CHANGE, this.isChecked, !1);
  }
  _stateChange(e) {
    this.node.emit(i.STATE_CHANGE, this.isChecked, !0);
  }
};
n([r(cc.Label)], l.prototype, "label", void 0);
n([r(cc.Sprite)], l.prototype, "background", void 0);
n([r(cc.Node)], l.prototype, "dot", void 0);
n([r(cc.Label)], l.prototype, "dotLabel", void 0);
l = i = n([a, s("自定义UI/Toggle")], l);
exports.default = l;