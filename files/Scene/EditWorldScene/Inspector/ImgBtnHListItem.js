"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/ScrollList"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.scrollList = null;
    this._onSelectItemCall = null;
  }
  onLoad() {
    this.scrollList.node.on(n.default.SELECT_ITEM, this.onSelectItem, this);
  }
  setData(e, t, o, i) {
    this._onSelectItemCall = i;
    this.nameLabel.string = e;
    this.scrollList.setDataArr(t);
    this.scrollList.selectByIdx(o);
  }
  onSelectItem(e, t, o) {
    this._onSelectItemCall && this._onSelectItemCall(e, t, o);
  }
};
i([s(cc.Label)], r.prototype, "nameLabel", void 0);
i([s(n.default)], r.prototype, "scrollList", void 0);
r = i([a], r);
exports.default = r;