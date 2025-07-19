"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/SceneManager"),
  s = e("./PaintScene"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  onLoad() {
    this.node.on(n.default.CLICK, this.onClick, this);
  }
  onClick() {
    let e = cc.color(128, 128, 128),
      t = a.default.ins.findScene(s.default);
    t && (e = t.pencilColor);
    a.default.ins.OpenPanelByName("CreateColorPanel", t => {
      t.setColor(0, e);
      t.setSaveStyle(!0);
    });
  }
};
c = i([r], c);
exports.default = c;