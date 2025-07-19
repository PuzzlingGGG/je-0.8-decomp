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
  s = e("../../Frame/SceneManager"),
  r = e("../../Frame/UIColor"),
  l = e("../../GameScript/index"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.typeLabel = null;
    this.nameLabel = null;
    this.valueLabel = null;
    this.valueSwitch = null;
    this.btnEdit = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
    this.node.on(a.default.ITEM_STATE_CHANGE, this.stateChange, this);
    this.btnEdit.node.on(n.default.CLICK, this.onClickEdit, this);
  }
  setData(e) {
    this._vid = e;
    let t = l.GSVariableMng.instance.getVariable(e);
    this.valueLabel.node.active = !1;
    this.valueSwitch.node.active = !1;
    this.nameLabel.string = t.name;
    if (t.valueType == l.GSValueType.BOOL) {
      this.typeLabel.string = "开关";
      this.valueSwitch.node.active = !0;
      this.valueSwitch.string = "1" == t.defaultValue ? "开" : "关";
    } else if (t.valueType == l.GSValueType.FLOAT) {
      this.typeLabel.string = "数字";
      this.valueLabel.node.active = !0;
      this.valueLabel.string = t.defaultValue;
    }
  }
  stateChange(e) {
    this.node.color = e ? r.UIColor.blue : r.UIColor.white;
  }
  onClickEdit() {
    s.default.ins.OpenPanelByName("EditVariablePanel", e => {
      e.setData(this._vid);
    });
  }
};
i([d(cc.Label)], h.prototype, "typeLabel", void 0);
i([d(cc.Label)], h.prototype, "nameLabel", void 0);
i([d(cc.Label)], h.prototype, "valueLabel", void 0);
i([d(cc.Label)], h.prototype, "valueSwitch", void 0);
i([d(n.default)], h.prototype, "btnEdit", void 0);
h = i([c], h);
exports.default = h;