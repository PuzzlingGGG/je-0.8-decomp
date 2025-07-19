"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../GameScript/index"),
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = i = class extends r.default {
  constructor() {
    super(...arguments);
    this.btnVariable = null;
    this.btnItem = null;
  }
  static openConditionEditPanel(e, t, o) {
    switch (e) {
      case a.GSSelectValueType.Variable:
        l.default.ins.OpenPanelByName("GSConditionSelectVariablePanel", e => {
          e.setData(t, o);
        });
        break;
      case a.GSSelectValueType.Item:
        l.default.ins.OpenPanelByName("GSConditionSelectItemPanel", e => {
          e.setData(t, o);
        });
    }
  }
  onLoad() {
    super.onLoad();
    this.btnVariable.node.on(s.default.CLICK, this.onClickVariable, this);
    this.btnItem.node.on(s.default.CLICK, this.onClickItem, this);
  }
  setData(e) {
    this._opCallBack = e;
  }
  onClickVariable() {
    i.openConditionEditPanel(a.GSSelectValueType.Variable, null, this._opCallBack);
  }
  onClickItem() {
    i.openConditionEditPanel(a.GSSelectValueType.Item, null, this._opCallBack);
  }
};
n([d(s.default)], h.prototype, "btnVariable", void 0);
n([d(s.default)], h.prototype, "btnItem", void 0);
h = i = n([c], h);
exports.default = h;