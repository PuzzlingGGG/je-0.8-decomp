"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../TypeScript/Frame/Panel"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Config"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends n.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.list.node.on(a.default.CLICK_ITEM, this.onClickCell, this);
    let e = s.Config.deviceConfs.filter(e => !e.forbidCustomCreate);
    this.list.setDataArr(e);
  }
  closeAnim(e) {
    e();
  }
  onClickCell(e, t) {
    this.closePanel();
    this.call && this.call(t);
  }
};
i([l(a.default)], c.prototype, "list", void 0);
c = i([r], c);
exports.default = c;