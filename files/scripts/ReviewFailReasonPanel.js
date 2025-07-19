"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../CustomUI/ToggleGroup"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Util"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends r.default {
  constructor() {
    super(...arguments);
    this.scrollList = null;
    this.toggleGroup = null;
    this.okBtn = null;
  }
  onLoad() {
    super.onLoad();
    this.toggleGroup.node.on(s.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.scrollList.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd10, this);
    this.scrollList.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd10, this);
    this.okBtn.node.on(n.default.CLICK, this.closePanel, this);
  }
  onToggleChange(e) {
    this.scrollList.centerToIdx(e, .3);
    this.scrollList.selectByIdx(e);
  }
  setData(e) {
    l.Util.makeBro(this.toggleGroup.node.children[0], e.length);
    this.scrollList.setDataArr(e);
  }
  onTouchEnd10(e) {
    let t = e.target,
      o = t.convertToWorldSpaceAR(e.getStartLocation()),
      i = t.convertToWorldSpaceAR(e.getLocation()).sub(o),
      n = this.scrollList.curSelectIdx;
    i.x > 50 && n > 0 ? this.toggleGroup.selectIdx(n - 1) : i.x < -50 && n < this.scrollList.getDataArr().length - 1 && this.toggleGroup.selectIdx(n + 1);
  }
};
i([d(a.default)], h.prototype, "scrollList", void 0);
i([d(s.default)], h.prototype, "toggleGroup", void 0);
i([d(n.default)], h.prototype, "okBtn", void 0);
h = i([c], h);
exports.default = h;