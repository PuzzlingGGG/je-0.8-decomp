"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/ScrollList"),
  a = e("../../../CustomUI/ToggleGroup"),
  s = e("../../../Frame/Util"),
  r = e("./GameBanner"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.toggleGroup = null;
    this.scrollList = null;
  }
  onLoad() {
    this.toggleGroup.node.on(a.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.scrollList.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd10, this);
    this.scrollList.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd10, this);
    this.node.on(n.default.SET_DATA, this.setData, this);
    this.schedule(this.shift, 5, cc.macro.REPEAT_FOREVER);
  }
  shift() {
    let e = this.scrollList.curSelectIdx;
    e = (e + 1) % this.scrollList.getDataArr().length;
    this.toggleGroup.selectIdx(e);
  }
  setData(e) {
    this.setDataArr(e.games);
  }
  setDataArr(e) {
    s.Util.makeBro(this.toggleGroup.node.children[0], e.length);
    this.scrollList.setDataArr(e);
    this.toggleGroup.selectIdx(s.Util.randomIdx(e.length));
  }
  onToggleChange(e) {
    this.scrollList.centerToIdx(e, .3);
    this.scrollList.selectByIdx(e);
  }
  onTouchEnd10(e) {
    let t = e.target,
      o = t.convertToWorldSpaceAR(e.getStartLocation()),
      i = t.convertToWorldSpaceAR(e.getLocation()).sub(o),
      n = this.scrollList.curSelectIdx;
    if (i.x > 50 && n > 0) this.toggleGroup.selectIdx(n - 1);else if (i.x < -50 && n < this.scrollList.getDataArr().length - 1) this.toggleGroup.selectIdx(n + 1);else {
      this.onToggleChange(n);
      if (i.magSqr() < 10) {
        let e = this.scrollList.getExtraData(n);
        if (e && e.item) {
          let t = e.item.getComponent(r.default);
          t && t.onClick();
        }
      }
    }
  }
};
i([c(a.default)], d.prototype, "toggleGroup", void 0);
i([c(n.default)], d.prototype, "scrollList", void 0);
d = i([l], d);
exports.default = d;