"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/DropDownBox"),
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Top"),
  c = e("../../GameScript/index"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends r.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.dropDownBox = null;
    this.valueEditBox = null;
    this.valueToggle = null;
    this.okBtn = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.onClick, this);
    this.valueToggle.node.on(s.default.STATE_CHANGE, this.onToggleChange, this);
    this.dropDownBox.node.on(a.default.SELECT_CHANGE, this.onTypeChange, this);
    this.dropDownBox.setDataArr([{
      str: "数字",
      type: c.GSValueType.FLOAT
    }, {
      str: "开关",
      type: c.GSValueType.BOOL
    }]);
    this.dropDownBox.selectByIdx(0);
    this.valueEditBox.string = "0";
    let e = c.GSVariableMng.instance.getDefaultNameNum();
    this.nameEditBox.textLabel.string = "变量" + e;
  }
  onTypeChange(e, t, o) {
    this.valueToggle.node.active = t.type == c.GSValueType.BOOL;
    this.valueEditBox.node.active = t.type == c.GSValueType.FLOAT;
  }
  onToggleChange(e) {
    this.valueToggle.label.string = e ? "开" : "关";
  }
  onClick() {
    let e = this.dropDownBox.getCurData().type,
      t = {
        id: "",
        idx: 0,
        name: this.nameEditBox.textLabel.string,
        desc: "",
        valueType: e,
        defaultValue: "0"
      };
    t.name.length > 20 && (t.name = t.name.substr(0, 20));
    if (c.GSVariableMng.instance.hasName(t.name)) l.default.showToast("变量名已经存在");else {
      this.closePanel();
      if (e == c.GSValueType.FLOAT) {
        let e = Number.parseFloat(this.valueEditBox.string);
        Number.isNaN(e) && (e = 0);
        t.defaultValue = e + "";
      }
      e == c.GSValueType.BOOL && (t.defaultValue = this.valueToggle.isChecked ? "1" : "0");
      this.call && this.call(t);
    }
  }
};
i([h(cc.EditBox)], p.prototype, "nameEditBox", void 0);
i([h(a.default)], p.prototype, "dropDownBox", void 0);
i([h(cc.EditBox)], p.prototype, "valueEditBox", void 0);
i([h(s.default)], p.prototype, "valueToggle", void 0);
i([h(n.default)], p.prototype, "okBtn", void 0);
p = i([d], p);
exports.default = p;