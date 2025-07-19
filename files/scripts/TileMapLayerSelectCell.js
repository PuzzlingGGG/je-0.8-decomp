"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../CustomUI/ScrollList"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.btnVisable = null;
    this.iconVisable = null;
    this.iconInVisable = null;
    this.label = null;
    this._data = null;
  }
  onLoad() {
    this.btnVisable.node.on(n.default.CLICK, this.onClickVisable, this);
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this._data = e;
    this.label.string = e.str;
    this.onRefreshVisable();
  }
  onRefreshVisable() {
    let e = this._data.delIsVisable(this._data.layerIdx);
    this.iconVisable.node.active = e;
    this.iconInVisable.node.active = !e;
  }
  onClickVisable() {
    let e = this._data.delIsVisable(this._data.layerIdx);
    e = !e;
    this._data.delSetVisable(this._data.layerIdx, e);
    this.onRefreshVisable();
  }
};
i([r(n.default)], l.prototype, "btnVisable", void 0);
i([r(cc.Sprite)], l.prototype, "iconVisable", void 0);
i([r(cc.Sprite)], l.prototype, "iconInVisable", void 0);
i([r(cc.Label)], l.prototype, "label", void 0);
l = i([s], l);
exports.default = l;