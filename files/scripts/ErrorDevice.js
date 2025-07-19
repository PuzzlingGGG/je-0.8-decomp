"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../World/Device"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends n.default {
  onLoad() {
    super.onLoad();
  }
  setData(e, t) {
    super.setData(e, t);
  }
  initInspector(e) {
    e.addHead("错误装置", "UI/error");
    e.addLabel("装置模版已被删除");
  }
};
r = i([a], r);
exports.default = r;