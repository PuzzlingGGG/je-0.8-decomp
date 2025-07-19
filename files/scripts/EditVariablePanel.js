"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../CustomUI/Toggle"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Game/Player/Mng"),
  p = e("../../GameScript/index"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends l.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.dropDownBox = null;
    this.valueEditBox = null;
    this.valueToggle = null;
    this.okBtn = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onClick, this);
    this.dropDownBox.setDataArr([{
      str: "数字",
      type: p.GSValueType.FLOAT
    }, {
      str: "开关",
      type: p.GSValueType.BOOL
    }]);
    this.valueEditBox.string = "0";
    this.valueToggle.node.on(r.default.STATE_CHANGE, this.onToggleChange, this);
  }
  setData(e) {
    this._vid = e;
    let t = p.GSVariableMng.instance.getVariable(this._vid),
      o = 0;
    for (let e = 0; e < this.dropDownBox.dataArr.length; ++e) if (this.dropDownBox.dataArr[e].type == t.valueType) {
      o = e;
      break;
    }
    this.dropDownBox.selectByIdx(o);
    this.valueToggle.node.active = t.valueType == p.GSValueType.BOOL;
    this.valueEditBox.node.active = t.valueType == p.GSValueType.FLOAT;
    this.nameEditBox.string = t.name;
    t.valueType == p.GSValueType.BOOL ? this.valueToggle.isChecked = "1" == t.defaultValue : t.valueType == p.GSValueType.FLOAT && (this.valueEditBox.string = t.defaultValue);
  }
  onToggleChange(e) {
    this.valueToggle.label.string = e ? "开" : "关";
    this.valueToggle.background.node.color = e ? d.UIColor.blue : d.UIColor.white;
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      let e = p.GSVariableMng.instance.getVariable(this._vid);
      e.name = this.nameEditBox.string;
      e.name.length > 20 && (e.name = e.name.substr(0, 20));
      if (!p.GSVariableMng.instance.changeName(this._vid, e.name)) {
        c.default.showToast("变量名已经存在");
        return;
      }
      this.closePanel();
      let t = e.valueType;
      if (t == p.GSValueType.FLOAT) {
        let t = Number.parseFloat(this.valueEditBox.string);
        Number.isNaN(t) && (t = 0);
        e.defaultValue = t + "";
      }
      t == p.GSValueType.BOOL && (e.defaultValue = this.valueToggle.isChecked ? "1" : "0");
      let o = p.GSVariableMng.instance.getVariableData(e.idstr);
      o && (yield h.Mng.Ins.variableMng.save(e.idstr, o));
      cc.game.emit("editVaribleComplete");
    });
  }
};
i([m(cc.EditBox)], f.prototype, "nameEditBox", void 0);
i([m(s.default)], f.prototype, "dropDownBox", void 0);
i([m(cc.EditBox)], f.prototype, "valueEditBox", void 0);
i([m(r.default)], f.prototype, "valueToggle", void 0);
i([m(a.default)], f.prototype, "okBtn", void 0);
f = i([u], f);
exports.default = f;