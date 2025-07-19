"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../Frame/Util"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.data = null;
  }
  show(e) {
    this.data = e;
    this.node.active = !0;
    a.Util.makeBro(this.btn.node, e.nodes.length, (t, o) => {
      let i = e.nodes[o],
        s = a.Util.convertPosition(i, t.parent);
      t.position = s;
      t.width = i.width;
      t.height = i.height;
      t.off(n.default.CLICK, this.onBtnTap, this);
      t.on(n.default.CLICK, this.onBtnTap, this);
    });
  }
  hide() {
    this.node.active = !1;
  }
  onBtnTap(e) {
    let t = e.target.getSiblingIndex();
    this.data.call(t);
    this.hide();
  }
};
i([r(n.default)], l.prototype, "btn", void 0);
l = i([s], l);
exports.default = l;