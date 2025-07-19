"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Frame/Panel"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends a.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.emptyNode = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.list.node.on(n.default.CLICK_ITEM, this.onClickItem, this);
  }
  setData(e, t) {
    this.list.setDataArr(e);
    this.emptyNode.active = 0 == e.length;
    let o = e.indexOf(t);
    o < 0 && (o = 0);
    this.list.selectByIdx(o);
  }
  onClickItem(e, t) {
    this.closePanel();
    let o = this.list.getCurData();
    this.call && this.call(o);
  }
};
i([r(n.default)], l.prototype, "list", void 0);
i([r(cc.Node)], l.prototype, "emptyNode", void 0);
l = i([s], l);
exports.default = l;